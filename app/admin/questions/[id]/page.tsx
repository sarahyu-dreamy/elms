import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { loadTargetOptions } from '@/lib/targets'
import { TABLES, type Question } from '@/lib/types'
import { PageHeader } from '@/components/ui'
import QuestionForm from '../form'

export const dynamic = 'force-dynamic'
export const metadata = { title: '문항 수정' }

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [{ data, error }, targets] = await Promise.all([
    supabase.from(TABLES.questions).select('*').eq('id', id).maybeSingle(),
    loadTargetOptions(),
  ])

  if (error || !data) notFound()
  const item = data as Question

  return (
    <>
      <PageHeader title="문항 수정" description={item.prompt} />
      <QuestionForm item={item} targets={targets} />
    </>
  )
}
