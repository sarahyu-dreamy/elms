import Link from 'next/link'
import { CEFR_LEVELS } from '@/lib/cefr'

interface Option {
  value: string
  label: string
}

/**
 * 목록 화면 공통 필터. 링크 기반이라 자바스크립트 없이도 동작하고,
 * 필터 상태가 URL 에 남아 교사끼리 링크를 공유할 수 있습니다.
 */
export function FilterBar({
  basePath,
  params,
  typeOptions,
  typeKey = 'type',
  typeLabel = '유형',
}: {
  basePath: string
  params: Record<string, string | undefined>
  typeOptions?: readonly Option[]
  typeKey?: string
  typeLabel?: string
}) {
  // 필터를 바꾸면 결과 집합이 달라지므로 페이지 번호는 항상 1로 되돌립니다.
  const href = (patch: Record<string, string | undefined>) => {
    const next = { ...params, ...patch, page: undefined }
    const qs = new URLSearchParams()
    for (const [k, v] of Object.entries(next)) if (v) qs.set(k, v)
    const s = qs.toString()
    return s ? `${basePath}?${s}` : basePath
  }

  const chip = (active: boolean) =>
    `rounded-md px-2 py-1 text-xs transition ${
      active ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
    }`

  return (
    <div className="mb-4 space-y-2">
      <form action={basePath} className="flex gap-2">
        {Object.entries(params).map(([k, v]) =>
          k === 'q' || k === 'page' || !v ? null : (
            <input key={k} type="hidden" name={k} value={v} />
          ),
        )}
        <input
          type="search"
          name="q"
          defaultValue={params.q ?? ''}
          placeholder="검색어"
          className="field-input max-w-xs"
        />
        <button type="submit" className="btn-secondary">
          검색
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-medium text-slate-500">레벨</span>
        <Link href={href({ level: undefined })} className={chip(!params.level)}>
          전체
        </Link>
        {CEFR_LEVELS.map((l) => (
          <Link key={l} href={href({ level: l })} className={chip(params.level === l)}>
            {l}
          </Link>
        ))}
      </div>

      {typeOptions && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-slate-500">{typeLabel}</span>
          <Link href={href({ [typeKey]: undefined })} className={chip(!params[typeKey])}>
            전체
          </Link>
          {typeOptions.map((o) => (
            <Link
              key={o.value}
              href={href({ [typeKey]: o.value })}
              className={chip(params[typeKey] === o.value)}
            >
              {o.label}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-medium text-slate-500">발행</span>
        <Link href={href({ status: undefined })} className={chip(!params.status)}>
          전체
        </Link>
        <Link href={href({ status: 'published' })} className={chip(params.status === 'published')}>
          발행됨
        </Link>
        <Link href={href({ status: 'draft' })} className={chip(params.status === 'draft')}>
          초안
        </Link>
      </div>
    </div>
  )
}
