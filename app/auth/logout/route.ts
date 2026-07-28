import { NextResponse } from 'next/server'
import { SESSION_COOKIE, originOf } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function handle(request: Request) {
  const res = NextResponse.redirect(originOf(request))
  res.cookies.delete(SESSION_COOKIE)
  return res
}

export const GET = handle
export const POST = handle
