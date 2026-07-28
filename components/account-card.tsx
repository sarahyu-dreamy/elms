import type { SessionUser } from '@/lib/auth'
import { CopyText } from './copy-text'

/**
 * 내 계정 정보. sub 를 화면에서 바로 확인할 수 있게 두는 것이 핵심입니다.
 *
 * 관리자 지정에 sub 가 필요한데, profiles 테이블이 아직 없으면 그 값을 볼 방법이
 * 없어서 관리자를 영영 지정하지 못하는 상황이 생깁니다.
 */
export function AccountCard({ user }: { user: SessionUser }) {
  return (
    <section className="card overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">내 계정</h2>
      </div>

      <dl className="divide-y divide-slate-100 text-sm">
        <Row label="이름" value={user.name} />
        <Row label="이메일" value={user.email} />
        <Row label="소속" value={user.cohort} />
        <Row label="포탈 역할" value={user.portalRole} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
          <dt className="w-20 shrink-0 text-slate-500">이 앱 권한</dt>
          <dd>
            {user.role === 'admin' ? (
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                관리자(교사)
              </span>
            ) : (
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                학생
              </span>
            )}
          </dd>
        </div>
        <div className="px-4 py-2.5">
          <dt className="mb-1.5 text-slate-500">sub (고유 식별자)</dt>
          <dd>
            <CopyText value={user.sub} />
          </dd>
        </div>
      </dl>

      {user.role !== 'admin' && (
        <div className="border-t border-slate-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">교사 화면이 필요하신가요?</p>
          <p className="mt-1">
            위 <code className="font-mono text-xs">sub</code> 값을 관리자에게 전달하면 교사 권한을
            받을 수 있습니다.
          </p>
        </div>
      )}
    </section>
  )
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
      <dt className="w-20 shrink-0 text-slate-500">{label}</dt>
      <dd className="text-slate-900">{value ?? <span className="text-slate-300">—</span>}</dd>
    </div>
  )
}
