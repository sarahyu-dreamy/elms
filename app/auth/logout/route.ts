import { NextResponse } from 'next/server'
import { SESSION_COOKIE, appBaseUrl } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function handle() {
  const res = NextResponse.redirect(appBaseUrl())
  res.cookies.delete(SESSION_COOKIE)
  return res
}

export const GET = handle
export const POST = handle
