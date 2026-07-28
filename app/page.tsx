import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser, homePathFor } from '@/lib/auth'
import { ErrorNote } from '@/components/ui'

export const dynamic = 'force-dynamic'

const AUTH_ERRORS: Record<string, string> = {
  state_mismatch: '로그인 요청이 만료되었거나 위조되었습니다. 다시 시도해 주세요.',
  token_exchange_failed: '드리미 포탈에서 토큰을 받지 못했습니다. 잠시 후 다시 시도해 주세요.',
  token_request_error: '드리미 포탈에 연결하지 못했습니다.',
  no_access_token: '포탈 응답에 액세스 토큰이 없습니다.',
  missing_code: '인증 코드가 전달되지 않았습니다.',
  access_denied: '로그인을 취소했습니다.',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ auth_error?: string }>
}) {
  const params = await searchParams
  const user = await getSessionUser()

  // 로그인 상태면 역할에 맞는 화면으로 바로 보냅니다.
  if (user) redirect(homePathFor(user))

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-sky-600">드리미학교</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">영어 LMS</h1>
          <p className="mt-3 text-sm text-slate-600">
            수업·자료·과제·진도를 한곳에서 관리합니다.
          </p>
        </div>

        {params.auth_error && (
          <ErrorNote
            message={AUTH_ERRORS[params.auth_error] ?? `로그인에 실패했습니다 (${params.auth_error})`}
          />
        )}

        <div className="card p-6 text-center">
          <Link href="/auth/login" prefetch={false} className="btn-primary w-full">
            드리미로 로그인
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            학교에 등록된 구성원만 이용할 수 있습니다.
          </p>
        </div>
      </div>
    </main>
  )
}
