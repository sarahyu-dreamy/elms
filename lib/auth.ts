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

export type Role = 'admin' | 'student'

export interface SessionUser {
  sub: string
  email: string | null
  name: string | null
  cohort: string | null
  /** 이 앱에서의 역할 — ADMIN_SUBS 에 있으면 admin, 나머지는 전부 student */
  role: Role
  /** 포탈이 준 원본 role (student/teacher/admin). 화면 표시용 */
  portalRole: string | null
}

function adminSubs(): string[] {
  return (process.env.ADMIN_SUBS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * 이 LMS 의 관리자는 오직 ADMIN_SUBS allowlist 로 정합니다.
 *
 * 포탈 role 을 쓰지 않는 이유: 포탈의 'teacher' 는 학교 전체의 교직원을 뜻해서,
 * 이 앱의 반·성적을 만질 수 있는 사람과 범위가 다릅니다. 반 개설·학생 배정·성취 입력은
 * 명시적으로 등록된 sub 만 할 수 있어야 합니다.
 */
export function isAdminSub(sub: string): boolean {
  return adminSubs().includes(sub)
}

/**
 * 현재 로그인 사용자. userinfo 호출은 React cache 로 감싸서
 * 한 요청 안에서 여러 번 불러도 한 번만 나갑니다.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const token = await getAccessToken()
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
      role: isAdminSub(sub) ? 'admin' : 'student',
    }
  } catch {
    // 포탈이 잠시 응답하지 않는 경우 — 로그아웃 상태로 취급합니다.
    return null
  }
})

/**
 * 드리미 플랫폼 API(음성 토큰, AI 생성)를 호출할 때 Bearer 로 쓸 액세스 토큰.
 * 서버에서만 꺼내 쓰고 클라이언트로 내보내지 않습니다.
 */
export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null
}

export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === 'admin'
}

/** 로그인만 요구 (학생 화면) */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')
  return user
}

/**
 * 관리자 전용 가드. 반 개설·학생 배정·자료·과제·성취 입력은 전부 이걸 통과해야 합니다.
 *
 * 공유 스키마라 DB 레벨 방어가 없으므로, 이 가드가 유일한 방어선입니다.
 * (docs/security.md 참고)
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) redirect('/auth/login')
  if (user.role !== 'admin') redirect('/me?denied=1')
  return user
}

/** 로그인 후 역할에 맞는 첫 화면 */
export function homePathFor(user: SessionUser): string {
  return user.role === 'admin' ? '/teacher' : '/me'
}
