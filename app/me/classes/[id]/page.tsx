import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { requireUser } from '@/lib/auth'
import { TABLES, type ClassRow } from '@/lib/types'
import { labelFor, PROGRAMS } from '@/lib/lms'
import { PageHeader, EmptyState } from '@/components/ui'

export const dynamic = 'force-dynamic'

export default async function StudentClassPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, user] = await Promise.all([params, requireUser()])

  // 자기가 배정된 반인지 먼저 확인합니다. URL 로 남의 반에 들어올 수 없게.
  const { data: enrollment } = await supabase
    .from(TABLES.enrollments)
    .select('id')
    .eq('class_id', id)
    .eq('student_sub', user.sub)
    .eq('status', 'active')
    .maybeSingle()

  if (!enrollment) notFound()

  const { data } = await supabase.from(TABLES.classes).select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  const klass = data as ClassRow

  return (
    <>
      <PageHeader
        title={klass.name}
        description={[labelFor(PROGRAMS, klass.program), klass.level, klass.schedule]
          .filter(Boolean)
          .join(' · ')}
      />
      <div className="card">
        <EmptyState message="자료·과제·진도는 3단계에서 구현합니다." />
      </div>
    </>
  )
}
