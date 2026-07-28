import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'

/**
 * 드리미 학교 계정 OAuth. client_secret 은 이 파일을 import 하는 서버 코드에서만 쓰이며
 * 클라이언트 번들에 들어가지 않습니다.
 */
export const SESSION_COOKIE = 'dreami_access_token'
export const STATE_COOKIE = 'dreami_oauth_state'

export const ISSUER = process.env.DREAMI_ISSUER ?? 'https://stu.dreamyedu.net'
export const AUTHORIZE_URL = `${ISSUER}/oauth/authorize`
export const TOKEN_URL = `${ISSUER}/api/oauth/token`
export const USERINFO_URL = `${ISSUER}/api/oauth/userinfo`

export function appBaseUrl(): string {
  return (
    process.env.APP_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  )
}

export function redirectUri(): string {
  return `${appBaseUrl()}/auth/callback`
}

export type Role = 'admin' | 'teacher' | 'student'

export interface SessionUser {
  sub: string
  email: string | null
  name: string | null
  cohort: string | null
  /** 포탈 role(student/teacher/admin) + ADMIN_SUBS allowlist 를 반영한 최종 역할 */
  role: Role
  /** 포탈이 준 원본 role — allowlist 로 승격된 경우 구분용 */
  portalRole: string | null
}

function adminSubs(): string[] {
  return (process.env.ADMIN_SUBS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * 포탈 role 은 student / teacher / admin 세 값입니다.
 *
 * 다만 포탈의 role 은 "교사 일반"까지만 구분하므로, 이 LMS 의 관리자는
 * ADMIN_SUBS allowlist 로 지정합니다. allowlist 에 있으면 포탈 role 과 무관하게 admin 입니다.
 */
export function normalizeRole(portalRole: unknown, sub: string): Role {
  if (adminSubs().includes(sub)) return 'admin'

  const v = String(portalRole ?? '').trim().toLowerCase()
  if (v === 'admin') return 'admin'
  if (v === 'teacher') return 'teacher'
  return 'student'
}

/**
 * 현재 로그인 사용자. userinfo 호출은 React cache 로 감싸서
 * 한 요청 안에서 여러 번 불러도 한 번만 나갑니다.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const res = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null

    const info = (await res.json()) as Record<string, unknown>
    const sub = typeof info.sub === 'string' ? info.sub : null
    if (!sub) return null

    const str = (k: string) => (typeof info[k] === 'string' ? (info[k] as string) : null)

    return {
      sub,
      email: str('email'),
      name: str('name'),
      cohort: str('cohort'),
      portalRole: str('role'),
      role: normalizeRole(info.role, sub),
    }
  } catch {
    // 포탈이 잠시 응답하지 않는 경우 — 로그아웃 상태로 취급합니다.
    return null
  }
})

/** 콘텐츠(단어·문법·문항)를 편집할 수 있는 역할인가 — 교사와 관리자 */
export function canEdit(user: SessionUser | null): boolean {
  return user?.role === 'admin' || user?.role === 'teacher'
}

/** ADMIN_SUBS 로 지정된 관리자인가 — 계정·학생 데이터 등 상위 권한용 */
export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === 'admin'
}

/**
 * 콘텐츠 편집 가드. 비로그인은 로그인으로, 권한 없는 로그인 사용자는 홈으로 보냅니다.
 *
 * 공유 스키마라 DB 레벨 방어가 없으므로, 모든 쓰기 경로는 반드시 이 가드를 먼저 통과해야 합니다.
 * (docs/security.md 참고)
 */
export async function requireEditor(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')
  if (!canEdit(user)) redirect('/?denied=1')
  return user
}

/** 관리자 전용 가드 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')
  if (!isAdmin(user)) redirect('/?denied=1')
  return user
}
