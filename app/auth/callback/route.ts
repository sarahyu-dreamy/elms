import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  SESSION_COOKIE,
  STATE_COOKIE,
  TOKEN_URL,
  USERINFO_URL,
  appBaseUrl,
  isAdminSub,
  redirectUri,
} from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { TABLES } from '@/lib/types'

export const dynamic = 'force-dynamic'

function fail(reason: string) {
  return NextResponse.redirect(`${appBaseUrl()}/?auth_error=${encodeURIComponent(reason)}`)
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const oauthError = url.searchParams.get('error')

  if (oauthError) return fail(oauthError)
  if (!code || !state) return fail('missing_code')

  const jar = await cookies()
  const expected = jar.get(STATE_COOKIE)?.value
  if (!expected || expected !== state) return fail('state_mismatch')

  // state 뒷부분에 담아 보낸 복귀 경로 — 열린 리다이렉트를 막으려 내부 경로만 허용합니다.
  let next = ''
  try {
    const decoded = Buffer.from(state.split(':')[1] ?? '', 'base64url').toString()
    if (decoded.startsWith('/') && !decoded.startsWith('//')) next = decoded
  } catch {
    // 기본값 유지
  }

  // 1) code → access_token (client_secret 은 여기서만 쓰입니다)
  let accessToken: string
  let expiresIn = 60 * 60 * 8
  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri(),
        client_id: process.env.DREAMI_CLIENT_ID!,
        client_secret: process.env.DREAMI_CLIENT_SECRET!,
      }),
      cache: 'no-store',
    })
    if (!tokenRes.ok) return fail('token_exchange_failed')

    const token = (await tokenRes.json()) as { access_token?: string; expires_in?: number }
    if (!token.access_token) return fail('no_access_token')
    accessToken = token.access_token
    if (typeof token.expires_in === 'number') expiresIn = token.expires_in
  } catch {
    return fail('token_request_error')
  }

  // 2) userinfo → profiles 반영 (sub 를 고유키로 씁니다. 이메일은 바뀔 수 있으므로)
  let landing = '/me'
  try {
    const infoRes = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    })
    if (infoRes.ok) {
      const info = (await infoRes.json()) as Record<string, unknown>
      const sub = typeof info.sub === 'string' ? info.sub : null
      if (sub) {
        if (isAdminSub(sub)) landing = '/teacher'

        const str = (k: string) => (typeof info[k] === 'string' ? (info[k] as string) : null)
        await supabaseWrite.from(TABLES.profiles).upsert(
          {
            sub,
            email: str('email'),
            name: str('name'),
            cohort: str('cohort'),
            portal_role: str('role'),
            is_admin: isAdminSub(sub),
            last_login_at: new Date().toISOString(),
          },
          { onConflict: 'sub' },
        )
      }
    }
  } catch {
    // 프로필 기록 실패가 로그인 자체를 막을 이유는 없습니다.
  }

  const res = NextResponse.redirect(`${appBaseUrl()}${next || landing}`)
  res.cookies.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: expiresIn,
  })
  res.cookies.delete(STATE_COOKIE)
  return res
}
