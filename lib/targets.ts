import { supabase } from './supabase'
import { TABLES } from './types'

export interface TargetOption {
  id: string
  label: string
  level: string
}

/**
 * 문항을 붙일 대상(단어 / 문법) 목록.
 * 폼에서 클라이언트 필터링을 하므로 id·이름·레벨만 가볍게 가져옵니다.
 */
export async function loadTargetOptions(): Promise<{
  lexical: TargetOption[]
  grammar: TargetOption[]
}> {
  const [lex, gram] = await Promise.all([
    supabase
      .from(TABLES.lexicalItems)
      .select('id, headword, cefr_level')
      .order('headword')
      .limit(2000),
    supabase
      .from(TABLES.grammarPoints)
      .select('id, title, cefr_level')
      .order('cefr_level')
      .order('order_index')
      .limit(2000),
  ])

  return {
    lexical: (lex.data ?? []).map((r: any) => ({
      id: r.id,
      label: r.headword,
      level: r.cefr_level,
    })),
    grammar: (gram.data ?? []).map((r: any) => ({
      id: r.id,
      label: r.title,
      level: r.cefr_level,
    })),
  }
}
