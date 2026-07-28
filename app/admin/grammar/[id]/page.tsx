import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TABLES, type GrammarPoint } from '@/lib/types'
import { PageHeader } from '@/components/ui'
import GrammarForm from '../form'

export const dynamic = 'force-dynamic'
export const metadata = { title: '문법 수정' }

export default async function EditGrammarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase
    .from(TABLES.grammarPoints)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) notFound()
  const item = data as GrammarPoint

  return (
    <>
      <PageHeader title={item.title} description="문법 항목 수정" />
      <GrammarForm item={item} />
    </>
  )
}
