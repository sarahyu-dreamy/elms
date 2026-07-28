import { PageHeader } from '@/components/ui'
import type { ImportKind } from '@/lib/import-spec'
import ImportForm from './form'

export const metadata = { title: '일괄 등록' }

export default async function ImportPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const initialKind: ImportKind = type === 'grammar' ? 'grammar' : 'vocab'

  return (
    <>
      <PageHeader
        title="일괄 등록"
        description="엑셀이나 구글 시트에서 복사해 붙여넣으면 검증 결과를 미리 보고 한 번에 등록합니다."
      />
      <ImportForm initialKind={initialKind} />
    </>
  )
}
