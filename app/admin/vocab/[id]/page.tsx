import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { TABLES, type LexicalItem } from '@/lib/types'
import { PageHeader } from '@/components/ui'
import VocabForm from '../form'

export const dynamic = 'force-dynamic'
export const metadata = { title: '단어 수정' }

export default async function EditVocabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data, error } = await supabase
    .from(TABLES.lexicalItems)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) notFound()
  const item = data as LexicalItem

  return (
    <>
      <PageHeader title={item.headword} description="단어·관용어구 수정" />
      <VocabForm item={item} />
    </>
  )
}
