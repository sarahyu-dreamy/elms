import { PageHeader, EmptyState } from '@/components/ui'

export const metadata = { title: '반' }

export default function ClassesPlaceholder() {
  return (
    <>
      <PageHeader title="반" description="반 개설과 학생 배정" />
      <div className="card">
        <EmptyState message="2단계에서 구현합니다 — 반 개설, 학생 배정, 반 상세." />
      </div>
    </>
  )
}
