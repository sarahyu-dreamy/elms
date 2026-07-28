import { NextResponse } from 'next/server'
import { AUTHORIZE_URL, STATE_COOKIE, redirectUri } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // from 이 없으면 콜백에서 역할에 따라 /teacher 또는 /me 로 보냅니다.
  const from = new URL(request.url).searchParams.get('from') ?? ''

  // CSRF 방어용 state. 로그인 후 돌아갈 경로를 같이 실어 보냅니다.
  const nonce = crypto.randomUUID()
  const state = `${nonce}:${Buffer.from(from).toString('base64url')}`

  const authorize = new URL(AUTHORIZE_URL)
  authorize.searchParams.set('response_type', 'code')
  authorize.searchParams.set('client_id', process.env.DREAMI_CLIENT_ID!)
  authorize.searchParams.set('redirect_uri', redirectUri())
  authorize.searchParams.set('scope', 'openid profile email')
  authorize.searchParams.set('state', state)

  const res = NextResponse.redirect(authorize)
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  })
  return res
}
