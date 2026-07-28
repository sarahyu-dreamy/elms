import { loadTargetOptions } from '@/lib/targets'
import { PageHeader } from '@/components/ui'
import QuestionForm from '../form'

export const dynamic = 'force-dynamic'
export const metadata = { title: '문항 등록' }

export default async function NewQuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const [{ saved }, targets] = await Promise.all([searchParams, loadTargetOptions()])

  return (
    <>
      <PageHeader title="문항 등록" />

      {saved && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          문항을 등록했습니다. 이어서 입력하세요.
        </div>
      )}

      <QuestionForm targets={targets} />
    </>
  )
}
