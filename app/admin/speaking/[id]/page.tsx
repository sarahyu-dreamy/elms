import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TABLES, type SpeakingTask } from '@/lib/types'
import { PageHeader } from '@/components/ui'
import SpeakingForm from '../form'

export const dynamic = 'force-dynamic'
export const metadata = { title: '스피킹 과제 수정' }

export default async function EditSpeakingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase
    .from(TABLES.speakingTasks)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) notFound()
  const item = data as SpeakingTask

  return (
    <>
      <PageHeader title={item.title} description="스피킹 과제 수정" />
      <SpeakingForm item={item} />
    </>
  )
}
