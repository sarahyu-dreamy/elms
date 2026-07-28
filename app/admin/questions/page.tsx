import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TABLES, type Question } from '@/lib/types'
import { QUESTION_TYPES, labelOf } from '@/lib/cefr'
import { applyStatus, ilikeTerm, pageFrom, range } from '@/lib/list'
import { EmptyState, ErrorNote, LevelBadge, PageHeader, PublishBadge } from '@/components/ui'
import { FilterBar } from '@/components/filter-bar'
import { Pagination } from '@/components/pagination'

export const dynamic = 'force-dynamic'
export const metadata = { title: '문항' }

type Params = { level?: string; type?: string; status?: string; q?: string; page?: string }

export default async function QuestionListPage({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const params = await searchParams
  const page = pageFrom(params)
  const [from, to] = range(page)

  let query = supabase
    .from(TABLES.questions)
    .select('*', { count: 'exact' })
    .order('cefr_level', { ascending: true })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (params.level) query = query.eq('cefr_level', params.level)
  if (params.type) query = query.eq('question_type', params.type)
  query = applyStatus(query, params.status)

  const term = ilikeTerm(params.q ?? '')
  if (term) query = query.ilike('prompt', `%${term}%`)

  const { data, count, error } = await query
  const items = (data ?? []) as Question[]

  return (
    <>
      <PageHeader
        title="문항"
        description="단어·문법 항목에 연결되는 연습 문항입니다. 객관식·빈칸은 자동 채점되고, 영작은 이후 LLM 채점 단계에서 다룹니다."
        action={
          <Link href="/admin/questions/new" className="btn-primary">
            새 문항
          </Link>
        }
      />

      {error && <ErrorNote message={`목록을 불러오지 못했습니다: ${error.message}`} />}

      <FilterBar
        basePath="/admin/questions"
        params={params}
        typeOptions={QUESTION_TYPES}
        typeLabel="유형"
      />

      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <EmptyState
            message={error ? '테이블이 아직 없거나 조회할 수 없습니다.' : '조건에 맞는 문항이 없습니다.'}
            action={
              !error ? (
                <Link href="/admin/questions/new" className="btn-secondary">
                  첫 문항 등록하기
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
                    <th className="px-4 py-2 font-medium text-slate-600">지문</th>
                    <th className="px-4 py-2 font-medium text-slate-600">유형</th>
                    <th className="px-4 py-2 font-medium text-slate-600">레벨</th>
                    <th className="px-4 py-2 font-medium text-slate-600">연결</th>
                    <th className="px-4 py-2 font-medium text-slate-600">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="max-w-md px-4 py-2.5">
                        <Link
                          href={`/admin/questions/${item.id}`}
                          className="line-clamp-1 font-medium text-slate-900 hover:underline"
                        >
                          {item.prompt}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {labelOf(QUESTION_TYPES, item.question_type)}
                      </td>
                      <td className="px-4 py-2.5">
                        <LevelBadge level={item.cefr_level} />
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">
                        {item.target_id
                          ? item.target_type === 'grammar'
                            ? '문법'
                            : '단어'
                          : <span className="text-slate-300">없음</span>}
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
              basePath="/admin/questions"
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
