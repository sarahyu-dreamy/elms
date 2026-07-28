import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TABLES, type ClassRow } from '@/lib/types'
import { labelFor, PROGRAMS } from '@/lib/lms'
import { levelByCode } from '@/lib/levels'
import { ROSTER_2026_1 } from '@/lib/seed/roster'
import { EmptyState, PageHeader, WarnNote } from '@/components/ui'
import { RosterPanel } from './roster-panel'

export const dynamic = 'force-dynamic'
export const metadata = { title: '반' }

export default async function ClassesPage() {
  const [classesRes, enrollRes] = await Promise.all([
    supabase.from(TABLES.classes).select('*').order('name'),
    supabase.from(TABLES.enrollments).select('class_id, student_sub'),
  ])

  const tablesReady = !classesRes.error && !enrollRes.error
  const classes = (classesRes.data ?? []) as ClassRow[]

  // 반별 인원과, 아직 로그인하지 않아 sub 가 비어 있는 인원
  const counts = new Map<string, { total: number; linked: number }>()
  for (const e of enrollRes.data ?? []) {
    const id = e.class_id as string
    const c = counts.get(id) ?? { total: 0, linked: 0 }
    c.total += 1
    if (e.student_sub) c.linked += 1
    counts.set(id, c)
  }

  return (
    <>
      <PageHeader title="반" description="반을 개설하고 학생을 배정합니다." />

      {!tablesReady && (
        <div className="mb-6">
          <WarnNote>
            <p className="font-semibold">
              <code>classes</code> 또는 <code>enrollments</code> 테이블이 없습니다.
            </p>
            <p className="mt-1">
              <Link href="/teacher/diagnostics" className="font-medium underline">
                설치·진단
              </Link>{' '}
              화면에서 먼저 만들어 주세요. 만들고 나면 아래 명단으로 한 번에 개설됩니다.
            </p>
          </WarnNote>
        </div>
      )}

      <RosterPanel
        groups={ROSTER_2026_1}
        existingNames={classes.map((c) => c.name)}
        tablesReady={tablesReady}
      />

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">개설된 반</h2>
        </div>

        {classes.length === 0 ? (
          <EmptyState message={tablesReady ? '아직 개설된 반이 없습니다.' : '테이블을 먼저 만들어 주세요.'} />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                <th className="px-4 py-2 font-medium text-slate-600">반</th>
                <th className="px-4 py-2 font-medium text-slate-600">과정</th>
                <th className="px-4 py-2 font-medium text-slate-600">레벨</th>
                <th className="px-4 py-2 text-right font-medium text-slate-600">인원</th>
                <th className="px-4 py-2 text-right font-medium text-slate-600">계정 연결</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.map((c) => {
                const n = counts.get(c.id) ?? { total: 0, linked: 0 }
                const spec = levelByCode(c.level ?? '')
                return (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-2.5 font-medium text-slate-900">{c.name}</td>
                    <td className="px-4 py-2.5 text-slate-600">{labelFor(PROGRAMS, c.program)}</td>
                    <td className="px-4 py-2.5">
                      {c.level ? (
                        <span className="font-mono text-xs text-slate-900">
                          {c.level}
                          {spec && <span className="ml-1.5 text-slate-400">{spec.labelKo}</span>}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">미정</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{n.total}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span
                        className={`text-xs tabular-nums ${
                          n.linked === n.total ? 'text-emerald-700' : 'text-slate-400'
                        }`}
                      >
                        {n.linked} / {n.total}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        {classes.length > 0 && (
          <p className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
            계정 연결은 학생이 처음 로그인할 때 이름으로 자동 연결됩니다.
          </p>
        )}
      </section>
    </>
  )
}
