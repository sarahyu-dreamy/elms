import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { TABLES, type SpeakingTask } from '@/lib/types'
import { SPEAKING_TASK_TYPES, labelOf } from '@/lib/cefr'
import { applyStatus, ilikeTerm, pageFrom, range } from '@/lib/list'
import { EmptyState, ErrorNote, LevelBadge, PageHeader, PublishBadge } from '@/components/ui'
import { FilterBar } from '@/components/filter-bar'
import { Pagination } from '@/components/pagination'

export const dynamic = 'force-dynamic'
export const metadata = { title: '스피킹 과제' }

type Params = { level?: string; type?: string; status?: string; q?: string; page?: string }

export default async function SpeakingListPage({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const params = await searchParams
  const page = pageFrom(params)
  const [from, to] = range(page)

  let query = supabase
    .from(TABLES.speakingTasks)
    .select('*', { count: 'exact' })
    .order('cefr_level', { ascending: true })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (params.level) query = query.eq('cefr_level', params.level)
  if (params.type) query = query.eq('task_type', params.type)
  query = applyStatus(query, params.status)

  const term = ilikeTerm(params.q ?? '')
  if (term) query = query.or(`title.ilike.%${term}%,prompt.ilike.%${term}%`)

  const { data, count, error } = await query
  const items = (data ?? []) as SpeakingTask[]

  return (
    <>
      <PageHeader
        title="스피킹 과제"
        description="학생이 녹음으로 응답하는 과제입니다. 자기소개부터 추상 주제 토론까지 레벨대별로 갖춰 두면 배치고사에 그대로 쓸 수 있습니다."
        action={
          <Link href="/admin/speaking/new" className="btn-primary">
            새 과제
          </Link>
        }
      />

      {error && <ErrorNote message={`목록을 불러오지 못했습니다: ${error.message}`} />}

      <FilterBar
        basePath="/admin/speaking"
        params={params}
        typeOptions={SPEAKING_TASK_TYPES}
        typeLabel="유형"
      />

      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <EmptyState
            message={error ? '테이블이 아직 없거나 조회할 수 없습니다.' : '조건에 맞는 과제가 없습니다.'}
            action={
              !error ? (
                <Link href="/admin/speaking/new" className="btn-secondary">
                  첫 과제 등록하기
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
                    <th className="px-4 py-2 font-medium text-slate-600">과제</th>
                    <th className="px-4 py-2 font-medium text-slate-600">유형</th>
                    <th className="px-4 py-2 font-medium text-slate-600">레벨</th>
                    <th className="px-4 py-2 text-right font-medium text-slate-600">준비/발화</th>
                    <th className="px-4 py-2 font-medium text-slate-600">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="max-w-md px-4 py-2.5">
                        <Link
                          href={`/admin/speaking/${item.id}`}
                          className="font-medium text-slate-900 hover:underline"
                        >
                          {item.title}
                        </Link>
                        <p className="line-clamp-1 text-xs text-slate-500">{item.prompt}</p>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {labelOf(SPEAKING_TASK_TYPES, item.task_type)}
                      </td>
                      <td className="px-4 py-2.5">
                        <LevelBadge level={item.cefr_level} />
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-500">
                        {item.prep_seconds}초 / {item.speak_seconds}초
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
              basePath="/admin/speaking"
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
