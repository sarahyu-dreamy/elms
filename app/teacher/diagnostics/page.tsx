import { supabase } from '@/lib/supabase'
import { originOf } from '@/lib/auth'
import { TABLES } from '@/lib/types'
import { headers } from 'next/headers'
import { PageHeader } from '@/components/ui'
import { CopyText } from '@/components/copy-text'
import { generateDdl } from '@/lib/seed/ddl'
import { generateSeedSql } from '@/lib/seed/sql'
import { A1_1 } from '@/lib/seed/a1-1'

export const dynamic = 'force-dynamic'
export const metadata = { title: '연결 진단' }

/** 반 운영과 교육과정에 필요한 테이블 */
const CORE = [
  { table: TABLES.profiles, note: '로그인 사용자' },
  { table: TABLES.terms, note: '학기' },
  { table: TABLES.classes, note: '반' },
  { table: TABLES.enrollments, note: '반-학생 배정' },
  { table: 'units', note: '단원' },
  { table: 'can_do_statements', note: '성취기준' },
  { table: TABLES.lexicalItems, note: '어휘' },
  { table: TABLES.grammarPoints, note: '문법 항목' },
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

  const [core, later, unitProbe] = await Promise.all([
    Promise.all(CORE.map(async (t) => ({ ...t, ...(await probe(t.table)) }))),
    Promise.all(LATER.map(async (t) => ({ ...t, ...(await probe(t.table)) }))),
    supabase.from('units').select('id', { count: 'exact', head: true }),
  ])
  const unitCount = unitProbe.error ? null : (unitProbe.count ?? 0)

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
            아래 <strong>설치</strong>의 SQL 을 드리미 개발자 콘솔에 붙여넣어 실행해 주세요.
          </p>
        </div>
      )}

      <Setup
        schema={process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'app_6'}
        seeded={Boolean(unitCount && unitCount > 0)}
      />

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

/**
 * 설치 절차. 콘솔이 브라우저에 있으므로 SQL 도 브라우저에서 복사할 수 있어야 합니다.
 * 저장소에서 파일을 찾아 여는 단계를 없애는 것이 목적입니다.
 */
function Setup({ schema, seeded }: { schema: string; seeded: boolean }) {
  const ddl = generateDdl(schema)
  const seed = generateSeedSql(A1_1, schema)

  return (
    <section className="card mb-8 overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">설치</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          드리미 개발자 콘솔 → 백엔드 카드에서 아래 SQL 을 순서대로 실행합니다.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        <Step
          n={1}
          title="테이블 만들기"
          note="여러 번 실행해도 안전합니다 (create table if not exists)."
          sql={ddl}
        />
        <Step
          n={2}
          title="A1.1 교육과정 적재"
          note={
            seeded
              ? '이미 단원이 들어가 있습니다. 다시 실행하면 중복되니 주의하세요.'
              : '단원 14개 · 성취기준 112개 · 문법 30개 · 어휘 200개. 한 번만 실행하세요.'
          }
          sql={seed}
          warn={seeded}
        />
      </div>
    </section>
  )
}

function Step({
  n,
  title,
  note,
  sql,
  warn,
}: {
  n: number
  title: string
  note: string
  sql: string
  warn?: boolean
}) {
  return (
    <div className="px-4 py-4">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          {n}
        </span>
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className={`text-xs ${warn ? 'text-amber-700' : 'text-slate-500'}`}>{note}</p>
        </div>
      </div>
      <CopyText value={sql} />
    </div>
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
