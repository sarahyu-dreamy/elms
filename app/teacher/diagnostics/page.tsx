import { supabase } from '@/lib/supabase'
import { originOf } from '@/lib/auth'
import { headers } from 'next/headers'
import { PageHeader } from '@/components/ui'
import { TABLE_SPECS } from '@/lib/seed/tables'
import { Setup } from './setup'

export const dynamic = 'force-dynamic'
export const metadata = { title: '연결 진단' }

/** 테이블 목록은 lib/seed/tables.ts 한 곳에서 옵니다 */
const CORE = TABLE_SPECS.filter((t) => t.group === 'core' || t.group === 'curriculum').map((t) => ({
  table: t.name,
  note: t.label,
}))
const LATER = TABLE_SPECS.filter((t) => t.group === 'classwork' || t.group === 'progress').map(
  (t) => ({ table: t.name, note: t.label }),
)

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

  const missing = [...core, ...later].filter((t) => !t.ok)
  const missingTables = missing.map((t) => t.table)

  return (
    <>
      <PageHeader
        title="설치·진단"
        description="배포된 앱이 실제로 어떤 백엔드를 보고 있는지, 어떤 테이블이 준비됐는지 확인합니다."
      />

      <Setup missing={missingTables} seeded={Boolean(unitCount && unitCount > 0)} />

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

      <TableSection title="테이블 상태 — 로그인·수업·교육과정" rows={core} />
      <div className="h-6" />
      <TableSection title="테이블 상태 — 자료·과제·성취" rows={later} />
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
