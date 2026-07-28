import Link from 'next/link'
import { PAGE_SIZE } from '@/lib/list'

export function Pagination({
  basePath,
  params,
  page,
  total,
}: {
  basePath: string
  params: Record<string, string | undefined>
  page: number
  total: number
}) {
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE))
  if (lastPage <= 1) return null

  const href = (p: number) => {
    const qs = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) if (v && k !== 'page') qs.set(k, v)
    if (p > 1) qs.set('page', String(p))
    const s = qs.toString()
    return s ? `${basePath}?${s}` : basePath
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm">
      <span className="text-slate-500">
        {total.toLocaleString()}개 중 {((page - 1) * PAGE_SIZE + 1).toLocaleString()}–
        {Math.min(page * PAGE_SIZE, total).toLocaleString()}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <Link href={href(page - 1)} className="btn-secondary">
            이전
          </Link>
        )}
        {page < lastPage && (
          <Link href={href(page + 1)} className="btn-secondary">
            다음
          </Link>
        )}
      </div>
    </div>
  )
}
