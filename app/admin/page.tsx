import Link from 'next/link'
import { getTableStat } from '@/lib/queries'
import { TABLES } from '@/lib/types'
import { CEFR_LEVELS } from '@/lib/cefr'
import { LevelBadge, PageHeader, StatCard, WarnNote } from '@/components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: '현황' }

export default async function AdminDashboard() {
  const stats = await Promise.all([
    getTableStat(TABLES.lexicalItems, '단어·관용어구', '/admin/vocab'),
    getTableStat(TABLES.grammarPoints, '문법 항목', '/admin/grammar'),
    getTableStat(TABLES.questions, '문항', '/admin/questions'),
    getTableStat(TABLES.speakingTasks, '스피킹 과제', '/admin/speaking'),
  ])

  const missing = stats.filter((s) => s.error)

  return (
    <>
      <PageHeader
        title="콘텐츠 현황"
        description="레벨별로 콘텐츠가 얼마나 채워져 있는지 확인합니다."
      />

      {missing.length > 0 && (
        <div className="mb-6">
          <WarnNote>
            <p className="font-semibold">아직 만들어지지 않은 테이블이 있습니다.</p>
            <p className="mt-1">
              드리미 개발자 콘솔 → 백엔드 카드 → 테이블에서 아래 테이블을 만들어 주세요. 컬럼 정의는
              저장소의 <code>docs/schema.md</code> 에 정리해 두었습니다.
            </p>
            <ul className="mt-2 list-inside list-disc font-mono text-xs">
              {missing.map((s) => (
                <li key={s.table}>{s.table}</li>
              ))}
            </ul>
          </WarnNote>
        </div>
      )}

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard
            key={s.table}
            label={s.label}
            value={s.total ?? '—'}
            href={s.href}
            sub={
              s.error
                ? '테이블 없음'
                : `발행 ${s.published ?? 0} · 초안 ${(s.total ?? 0) - (s.published ?? 0)}`
            }
          />
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">레벨별 분포</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            비어 있는 레벨이 곧 커리큘럼의 구멍입니다. 배치고사를 붙이기 전에 채워야 합니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                <th className="px-4 py-2 font-medium text-slate-600">항목</th>
                {CEFR_LEVELS.map((level) => (
                  <th key={level} className="px-4 py-2 text-center font-medium text-slate-600">
                    <LevelBadge level={level} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((s) => (
                <tr key={s.table}>
                  <td className="px-4 py-2.5">
                    <Link href={s.href} className="font-medium text-slate-900 hover:underline">
                      {s.label}
                    </Link>
                  </td>
                  {CEFR_LEVELS.map((level) => {
                    const n = s.byLevel?.[level]
                    return (
                      <td
                        key={level}
                        className={`px-4 py-2.5 text-center tabular-nums ${
                          n ? 'text-slate-900' : 'text-slate-300'
                        }`}
                      >
                        {s.byLevel ? n : '—'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
