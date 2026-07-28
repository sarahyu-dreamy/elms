import { supabase } from '@/lib/supabase'
import { originOf } from '@/lib/auth'
import { TABLES } from '@/lib/types'
import { headers } from 'next/headers'
import { PageHeader } from '@/components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: '연결 진단' }

/** 반 운영에 필요한 테이블 (1부) */
const CORE = [
  { table: TABLES.profiles, note: '로그인 사용자' },
  { table: TABLES.terms, note: '학기' },
  { table: TABLES.classes, note: '반' },
  { table: TABLES.enrollments, note: '반-학생 배정' },
]

/** 자료·과제 단계에서 쓰는 테이블 (2부) */
const LATER = [
  { table: TABLES.materials, note: '수업 자료' },
  { table: TABLES.assignments, note: '과제' },
  { table: TABLES.submissions, note: '제출·피드백' },
  { table: TABLES.progress, note: '레벨테스트·출석·성취' },
]

async function probe(table: string) {
  const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true })
  if (error) return { ok: false, detail: error.message }
  return { ok: true, detail: `${count ?? 0}행` }
}

export default async function DiagnosticsPage() {
  const h = await headers()
  const request = new Request('https://placeholder.invalid', { headers: h })

  const [core, later] = await Promise.all([
    Promise.all(CORE.map(async (t) => ({ ...t, ...(await probe(t.table)) }))),
    Promise.all(LATER.map(async (t) => ({ ...t, ...(await probe(t.table)) }))),
  ])

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const host = supabaseUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA ?? '(미설정 — public 사용)'
  const adminCount = (process.env.ADMIN_SUBS ?? '').split(',').filter((s) => s.trim()).length

  const env = [
    { label: 'Supabase 호스트', value: host || '(미설정)', ok: Boolean(host) },
    { label: '사용 스키마', value: schema, ok: true },
    { label: 'anon 키', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '주입됨' : '없음', ok: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) },
    { label: 'DREAMI_CLIENT_ID', value: process.env.DREAMI_CLIENT_ID ? '주입됨' : '없음', ok: Boolean(process.env.DREAMI_CLIENT_ID) },
    { label: 'DREAMI_CLIENT_SECRET', value: process.env.DREAMI_CLIENT_SECRET ? '주입됨' : '없음', ok: Boolean(process.env.DREAMI_CLIENT_SECRET) },
    { label: 'ADMIN_SUBS (환경변수)', value: adminCount ? `${adminCount}명` : '비어 있음 (코드 목록 사용 중)', ok: true },
    { label: '앱 외부 주소', value: originOf(request), ok: true },
  ]

  const missing = core.filter((t) => !t.ok)

  return (
    <>
      <PageHeader
        title="연결 진단"
        description="배포된 앱이 실제로 어떤 백엔드를 보고 있는지, 어떤 테이블이 준비됐는지 확인합니다."
      />

      {missing.length > 0 && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">아직 만들어지지 않은 필수 테이블 {missing.length}개</p>
          <p className="mt-1">
            드리미 개발자 콘솔 → 백엔드 카드 → 테이블에서 만들어 주세요. 컬럼 정의는 저장소의{' '}
            <code>docs/schema.md</code>, SQL 은 <code>docs/tables.sql</code> 에 있습니다.
          </p>
        </div>
      )}

      <section className="card mb-6 overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">환경 설정</h2>
        </div>
        <dl className="divide-y divide-slate-100 text-sm">
          {env.map((e) => (
            <div key={e.label} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
              <dt className="w-48 shrink-0 text-slate-500">{e.label}</dt>
              <dd className={`break-all font-mono text-xs ${e.ok ? 'text-slate-900' : 'text-red-600'}`}>
                {e.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <TableSection title="필수 테이블 (반 운영)" rows={core} />
      <div className="h-6" />
      <TableSection title="이후 필요한 테이블 (자료·과제)" rows={later} />
    </>
  )
}

function TableSection({
  title,
  rows,
}: {
  title: string
  rows: { table: string; note: string; ok: boolean; detail: string }[]
}) {
  return (
    <section className="card overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      <table className="w-full text-sm">
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.table}>
              <td className="px-4 py-2.5">
                <code className="font-mono text-xs text-slate-900">{r.table}</code>
                <span className="ml-2 text-xs text-slate-400">{r.note}</span>
              </td>
              <td className="px-4 py-2.5 text-right">
                {r.ok ? (
                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    있음 · {r.detail}
                  </span>
                ) : (
                  <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                    없음
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
