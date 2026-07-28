import { PageHeader, EmptyState } from '@/components/ui'

export const metadata = { title: '학기' }

export default function TermsPlaceholder() {
  return (
    <>
      <PageHeader title="학기" description="학기를 만들고 현재 학기를 지정합니다." />
      <div className="card">
        <EmptyState message="2단계에서 구현합니다." />
      </div>
    </>
  )
}
