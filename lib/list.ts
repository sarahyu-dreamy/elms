export const PAGE_SIZE = 50

/**
 * PostgREST 의 or() 필터는 쉼표·괄호로 조건을 구분하므로,
 * 사용자 입력이 그대로 들어가면 필터 구문이 깨지거나 조작될 수 있습니다.
 */
export function ilikeTerm(raw: string): string {
  return raw.replace(/[,()%\\]/g, ' ').trim()
}

export function pageFrom(params: { page?: string }): number {
  const n = Number(params.page ?? '1')
  return Number.isFinite(n) && n >= 1 ? Math.trunc(n) : 1
}

export function range(page: number): [number, number] {
  const from = (page - 1) * PAGE_SIZE
  return [from, from + PAGE_SIZE - 1]
}

/** 목록 화면 공통 — 발행 상태 필터를 쿼리에 적용 */
export function applyStatus<T>(query: T, status: string | undefined): T {
  const q = query as any
  if (status === 'published') return q.eq('is_published', true)
  if (status === 'draft') return q.eq('is_published', false)
  return query
}
