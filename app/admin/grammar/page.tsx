import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TABLES, type GrammarPoint } from '@/lib/types'
import { GRAMMAR_CATEGORIES, labelOf } from '@/lib/cefr'
import { applyStatus, ilikeTerm, pageFrom, range } from '@/lib/list'
import { EmptyState, ErrorNote, LevelBadge, PageHeader, PublishBadge } from '@/components/ui'
import { FilterBar } from '@/components/filter-bar'
import { Pagination } from '@/components/pagination'

export const dynamic = 'force-dynamic'
export const metadata = { title: '문법' }

type Params = { level?: string; type?: string; status?: string; q?: string; page?: string }

export default async function GrammarListPage({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const params = await searchParams
  const page = pageFrom(params)
  const [from, to] = range(page)

  let query = supabase
    .from(TABLES.grammarPoints)
    .select('*', { count: 'exact' })
    .order('cefr_level', { ascending: true })
    .order('order_index', { ascending: true })
    .range(from, to)

  if (params.level) query = query.eq('cefr_level', params.level)
  if (params.type) query = query.eq('category', params.type)
  query = applyStatus(query, params.status)

  const term = ilikeTerm(params.q ?? '')
  if (term) query = query.or(`title.ilike.%${term}%,can_do.ilike.%${term}%`)

  const { data, count, error } = await query
  const items = (data ?? []) as GrammarPoint[]

  return (
    <>
      <PageHeader
        title="문법"
        description="문법 항목을 CEFR 레벨에 매핑한 커리큘럼 테이블입니다. 같은 레벨 안에서는 순서 값으로 정렬됩니다."
        action={
          <Link href="/admin/grammar/new" className="btn-primary">
            새 항목
          </Link>
        }
      />

      {error && <ErrorNote message={`목록을 불러오지 못했습니다: ${error.message}`} />}

      <FilterBar
        basePath="/admin/grammar"
        params={params}
        typeOptions={GRAMMAR_CATEGORIES}
        typeLabel="분류"
      />

      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <EmptyState
            message={error ? '테이블이 아직 없거나 조회할 수 없습니다.' : '조건에 맞는 항목이 없습니다.'}
            action={
              !error ? (
                <Link href="/admin/grammar/new" className="btn-secondary">
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
                    <th className="px-4 py-2 font-medium text-slate-600">항목</th>
                    <th className="px-4 py-2 font-medium text-slate-600">Can-do</th>
                    <th className="px-4 py-2 font-medium text-slate-600">레벨</th>
                    <th className="px-4 py-2 font-medium text-slate-600">분류</th>
                    <th className="px-4 py-2 text-right font-medium text-slate-600">순서</th>
                    <th className="px-4 py-2 font-medium text-slate-600">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/admin/grammar/${item.id}`}
                          className="font-medium text-slate-900 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="max-w-sm truncate px-4 py-2.5 text-slate-600">
                        {item.can_do ?? <span className="text-slate-300">미작성</span>}
                      </td>
                      <td className="px-4 py-2.5">
                        <LevelBadge level={item.cefr_level} />
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {labelOf(GRAMMAR_CATEGORIES, item.category)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-500">
                        {item.order_index}
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
              basePath="/admin/grammar"
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
