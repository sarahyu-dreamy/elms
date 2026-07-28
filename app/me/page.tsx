import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { requireUser } from '@/lib/auth'
import { TABLES, type ClassRow, type Enrollment } from '@/lib/types'
import { labelFor, PROGRAMS } from '@/lib/lms'
import { EmptyState, ErrorNote, PageHeader } from '@/components/ui'

export const dynamic = 'force-dynamic'
export const metadata = { title: '내 반' }

export default async function StudentHome({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>
}) {
  const [{ denied }, user] = await Promise.all([searchParams, requireUser()])

  // 배정된 반만 조회합니다. 자기 sub 로만 조회하므로 남의 반은 보이지 않습니다.
  const { data: enrollData } = await supabase
    .from(TABLES.enrollments)
    .select('*')
    .eq('student_sub', user.sub)
    .eq('status', 'active')

  const enrollments = (enrollData ?? []) as Enrollment[]
  const classIds = enrollments.map((e) => e.class_id)

  let classes: ClassRow[] = []
  if (classIds.length > 0) {
    const { data } = await supabase.from(TABLES.classes).select('*').in('id', classIds).order('name')
    classes = (data ?? []) as ClassRow[]
  }

  return (
    <>
      <PageHeader
        title={`안녕하세요, ${user.name ?? '학생'}`}
        description={user.cohort ? `${user.cohort}` : undefined}
      />

      {denied && <ErrorNote message="교사 화면은 관리자만 이용할 수 있습니다." />}

      <section className="card overflow-hidden">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">내 반</h2>
        </div>

        {classes.length === 0 ? (
          <EmptyState message="아직 배정된 반이 없습니다. 선생님이 반에 배정하면 여기에 표시됩니다." />
        ) : (
          <ul className="divide-y divide-slate-100">
            {classes.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/me/classes/${c.id}`}
                  className="block px-4 py-3 transition hover:bg-slate-50/60"
                >
                  <p className="font-medium text-slate-900">{c.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {[labelFor(PROGRAMS, c.program), c.level, c.schedule].filter(Boolean).join(' · ')}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
