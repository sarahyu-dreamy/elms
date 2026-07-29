import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getSessionUser } from '@/lib/auth'
import { TABLES, type ClassRow } from '@/lib/types'
import { labelFor, PROGRAMS } from '@/lib/lms'
import { EmptyState, PageHeader, StatCard, WarnNote } from '@/components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: '교사 대시보드' }

export default async function TeacherDashboard() {
  const user = await getSessionUser()

  const [classesRes, enrollRes, assignRes] = await Promise.all([
    supabase.from(TABLES.classes).select('*').eq('is_active', true).order('name'),
    supabase.from(TABLES.enrollments).select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from(TABLES.activities).select('id', { count: 'exact', head: true }),
  ])

  const classes = (classesRes.data ?? []) as ClassRow[]
  const setupNeeded = Boolean(classesRes.error)

  return (
    <>
      <PageHeader
        title={`안녕하세요, ${user?.name ?? '선생님'}`}
        description="반과 학생을 배정하고, 자료·과제·진도를 관리합니다."
        action={
          !setupNeeded ? (
            <Link href="/teacher/classes" className="btn-primary">
              반 관리
            </Link>
          ) : undefined
        }
      />

      {setupNeeded && (
        <div className="mb-6">
          <WarnNote>
            <p className="font-semibold">아직 테이블이 만들어지지 않았습니다.</p>
            <p className="mt-1">
              드리미 개발자 콘솔 → 백엔드 카드 → 테이블에서{' '}
              <code>terms</code>, <code>classes</code>, <code>enrollments</code>,{' '}
              <code>materials</code>, <code>sessions</code>, <code>activities</code>,{' '}
              <code>progress</code> 를 만들어 주세요. 컬럼 정의는 저장소의{' '}
              <code>docs/schema.md</code> 에 있습니다.
            </p>
          </WarnNote>
        </div>
      )}

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <StatCard label="운영 중인 반" value={setupNeeded ? '—' : classes.length} href="/teacher/classes" />
        <StatCard label="수강 중인 학생" value={enrollRes.error ? '—' : (enrollRes.count ?? 0)} />
        <StatCard label="학습 활동" value={assignRes.error ? '—' : (assignRes.count ?? 0)} />
      </div>

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">내 반</h2>
        </div>

        {classes.length === 0 ? (
          <EmptyState
            message={setupNeeded ? '테이블을 먼저 만들어 주세요.' : '아직 개설된 반이 없습니다.'}
            action={
              !setupNeeded ? (
                <Link href="/teacher/classes" className="btn-secondary">
                  반 관리로 이동
                </Link>
              ) : undefined
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {classes.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/teacher/classes/${c.id}`}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 transition hover:bg-slate-50/60"
                >
                  <div>
                    <p className="font-medium text-slate-900">{c.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {[labelFor(PROGRAMS, c.program), c.level, c.schedule]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
