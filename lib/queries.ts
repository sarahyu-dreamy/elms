import { supabase } from './supabase'
import { CEFR_LEVELS, type CefrLevel } from './cefr'

export interface TableStat {
  table: string
  label: string
  href: string
  /** 테이블이 아직 만들어지지 않았거나 조회에 실패한 경우 null */
  total: number | null
  published: number | null
  byLevel: Record<CefrLevel, number> | null
  error: string | null
}

async function count(table: string, apply?: (q: any) => any): Promise<number | null> {
  let query: any = supabase.from(table).select('id', { count: 'exact', head: true })
  if (apply) query = apply(query)
  const { count: n, error } = await query
  if (error) return null
  return n ?? 0
}

/** 대시보드용 집계. 테이블이 없으면 error 를 채워서 안내 화면을 띄웁니다. */
export async function getTableStat(
  table: string,
  label: string,
  href: string,
): Promise<TableStat> {
  const { count: total, error } = await supabase
    .from(table)
    .select('id', { count: 'exact', head: true })

  if (error) {
    return { table, label, href, total: null, published: null, byLevel: null, error: error.message }
  }

  const published = await count(table, (q) => q.eq('is_published', true))

  const levelCounts = await Promise.all(
    CEFR_LEVELS.map((level) => count(table, (q) => q.eq('cefr_level', level))),
  )
  const byLevel = CEFR_LEVELS.reduce(
    (acc, level, i) => {
      acc[level] = levelCounts[i] ?? 0
      return acc
    },
    {} as Record<CefrLevel, number>,
  )

  return { table, label, href, total: total ?? 0, published, byLevel, error: null }
}
