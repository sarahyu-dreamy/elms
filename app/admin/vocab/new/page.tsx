import { PageHeader } from '@/components/ui'
import VocabForm from '../form'

export const metadata = { title: '단어 등록' }

export default async function NewVocabPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams

  return (
    <>
      <PageHeader title="단어·관용어구 등록" description="등록 후에도 이 화면에 남아 연속으로 입력할 수 있습니다." />

      {saved && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <strong className="font-semibold">{saved}</strong> 항목을 등록했습니다. 이어서 입력하세요.
        </div>
      )}

      <VocabForm />
    </>
  )
}
