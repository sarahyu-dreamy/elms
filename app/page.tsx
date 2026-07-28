import Link from 'next/link'
import { getSessionUser, canEdit } from '@/lib/auth'
import { CEFR_LEVELS, CEFR_BAND, TRACKS } from '@/lib/cefr'
import { LevelBadge, ErrorNote } from '@/components/ui'

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
  searchParams: Promise<{ auth_error?: string; denied?: string }>
}) {
  const params = await searchParams
  const user = await getSessionUser()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm font-medium text-sky-600">드리미학교</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">영어 LMS</h1>
        <p className="mt-3 text-slate-600">
          CEFR 기준에 따라 어휘·문법·스피킹을 레벨별로 학습하고 평가하는 시스템입니다.
        </p>
      </header>

      {params.auth_error && (
        <ErrorNote message={AUTH_ERRORS[params.auth_error] ?? `로그인에 실패했습니다 (${params.auth_error})`} />
      )}
      {params.denied && (
        <ErrorNote message="관리자 화면은 교사·관리자 계정만 이용할 수 있습니다." />
      )}

      <section className="card mb-8 p-6">
        {user ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900">
                {user.name ?? user.email ?? user.sub}
                <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                  {user.role === 'admin' ? '관리자' : user.role === 'teacher' ? '교사' : '학생'}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-slate-500">
                {user.cohort ? `${user.cohort} · ` : ''}
                {user.email ?? ''}
              </p>
            </div>
            <div className="flex gap-2">
              {canEdit(user) && (
                <Link href="/admin" className="btn-primary">
                  관리자 화면
                </Link>
              )}
              <Link href="/auth/logout" prefetch={false} className="btn-secondary">
                로그아웃
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900">드리미 계정으로 로그인</p>
              <p className="mt-0.5 text-sm text-slate-500">학교에 등록된 구성원만 이용할 수 있습니다.</p>
            </div>
            <Link href="/auth/login" prefetch={false} className="btn-primary">
              드리미로 로그인
            </Link>
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">CEFR 레벨</h2>
        <div className="card divide-y divide-slate-100">
          {CEFR_LEVELS.map((level) => (
            <div key={level} className="flex items-center gap-3 px-4 py-2.5">
              <LevelBadge level={level} />
              <span className="text-sm text-slate-600">{CEFR_BAND[level]}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">학습 트랙</h2>
        <p className="mb-3 text-sm text-slate-600">
          CEFR 은 영역마다 레벨이 다를 수 있음을 전제합니다. 이 시스템도 학생을 단일 레벨이 아니라
          트랙별 레벨로 관리합니다.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TRACKS.map((track) => (
            <div key={track.value} className="card p-4">
              <p className="font-medium text-slate-900">{track.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
