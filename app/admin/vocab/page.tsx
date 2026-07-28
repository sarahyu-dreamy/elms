import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TABLES, type LexicalItem } from '@/lib/types'
import { LEXICAL_ITEM_TYPES, labelOf } from '@/lib/cefr'
import { applyStatus, ilikeTerm, pageFrom, range } from '@/lib/list'
import { EmptyState, ErrorNote, LevelBadge, PageHeader, PublishBadge } from '@/components/ui'
import { FilterBar } from '@/components/filter-bar'
import { Pagination } from '@/components/pagination'

export const dynamic = 'force-dynamic'
export const metadata = { title: '단어·관용어구' }

type Params = { level?: string; type?: string; status?: string; q?: string; page?: string }

export default async function VocabListPage({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const params = await searchParams
  const page = pageFrom(params)
  const [from, to] = range(page)

  let query = supabase
    .from(TABLES.lexicalItems)
    .select('*', { count: 'exact' })
    .order('cefr_level', { ascending: true })
    .order('headword', { ascending: true })
    .range(from, to)

  if (params.level) query = query.eq('cefr_level', params.level)
  if (params.type) query = query.eq('item_type', params.type)
  query = applyStatus(query, params.status)

  const term = ilikeTerm(params.q ?? '')
  if (term) query = query.or(`headword.ilike.%${term}%,meaning_ko.ilike.%${term}%`)

  const { data, count, error } = await query
  const items = (data ?? []) as LexicalItem[]

  return (
    <>
      <PageHeader
        title="단어·관용어구"
        description="CEFR 레벨과 유형을 태깅해 관리합니다. 초안 상태에서는 학생에게 노출되지 않습니다."
        action={
          <div className="flex gap-2">
            <Link href="/admin/import?type=vocab" className="btn-secondary">
              일괄 등록
            </Link>
            <Link href="/admin/vocab/new" className="btn-primary">
              새 항목
            </Link>
          </div>
        }
      />

      {error && <ErrorNote message={`목록을 불러오지 못했습니다: ${error.message}`} />}

      <FilterBar
        basePath="/admin/vocab"
        params={params}
        typeOptions={LEXICAL_ITEM_TYPES}
        typeLabel="유형"
      />

      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <EmptyState
            message={
              error
                ? '테이블이 아직 없거나 조회할 수 없습니다.'
                : '조건에 맞는 항목이 없습니다.'
            }
            action={
              !error ? (
                <Link href="/admin/vocab/new" className="btn-secondary">
                  첫 항목 등록하기
                </Link>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                    <th className="px-4 py-2 font-medium text-slate-600">표제어</th>
                    <th className="px-4 py-2 font-medium text-slate-600">뜻</th>
                    <th className="px-4 py-2 font-medium text-slate-600">레벨</th>
                    <th className="px-4 py-2 font-medium text-slate-600">유형</th>
                    <th className="px-4 py-2 font-medium text-slate-600">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/admin/vocab/${item.id}`}
                          className="font-medium text-slate-900 hover:underline"
                        >
                          {item.headword}
                        </Link>
                        {item.pos && <span className="ml-2 text-xs text-slate-400">{item.pos}</span>}
                      </td>
                      <td className="max-w-xs truncate px-4 py-2.5 text-slate-600">
                        {item.meaning_ko}
                      </td>
                      <td className="px-4 py-2.5">
                        <LevelBadge level={item.cefr_level} />
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {labelOf(LEXICAL_ITEM_TYPES, item.item_type)}
                      </td>
                      <td className="px-4 py-2.5">
                        <PublishBadge published={item.is_published} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              basePath="/admin/vocab"
              params={params}
              page={page}
              total={count ?? items.length}
            />
          </>
        )}
      </div>
    </>
  )
}
