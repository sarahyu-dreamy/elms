import { PageHeader } from '@/components/ui'
import GrammarForm from '../form'

export const metadata = { title: '문법 등록' }

export default async function NewGrammarPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams

  return (
    <>
      <PageHeader title="문법 항목 등록" />

      {saved && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <strong className="font-semibold">{saved}</strong> 항목을 등록했습니다.
        </div>
      )}

      <GrammarForm />
    </>
  )
}
