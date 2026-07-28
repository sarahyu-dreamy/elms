'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { supabase } from '@/lib/supabase'
import { A1_1 } from '@/lib/seed/a1-1'
import type { SeedLevel } from '@/lib/seed/types'
import { dbErrorMessage } from '@/lib/form'

export interface SeedResult {
  ok: boolean
  error?: string
  counts?: { units: number; canDo: number; grammar: number; lexical: number; materials: number }
}

const CHUNK = 100

async function insertChunked(table: string, rows: Record<string, unknown>[]): Promise<string | null> {
  for (let i = 0; i < rows.length; i += CHUNK) {
    const { error } = await supabaseWrite.from(table).insert(rows.slice(i, i + CHUNK))
    if (error) return `${table}: ${dbErrorMessage(error)}`
  }
  return null
}

/**
 * 교육과정 원안을 DB 에 넣습니다.
 *
 * 콘솔에 SQL 실행 기능이 없어서 SQL 로는 적재할 수 없습니다. 대신 앱에서
 * 넣습니다. 단원을 먼저 넣고 돌려받은 id 로 나머지를 붙입니다.
 *
 * SQL 과 달리 트랜잭션이 없으므로, 중간에 실패하면 그때까지 들어간 것이 남습니다.
 * 그래서 먼저 이미 적재됐는지 확인하고, 실패 시 되돌릴 수 있게 지우기를 함께 둡니다.
 */
async function seedLevel(level: SeedLevel): Promise<SeedResult> {
  await requireAdmin()

  const { data: existing, error: checkError } = await supabase
    .from('units')
    .select('id')
    .eq('level_code', level.levelCode)
    .limit(1)

  if (checkError) return { ok: false, error: dbErrorMessage(checkError) }
  if (existing && existing.length > 0) {
    return {
      ok: false,
      error: `${level.levelCode} 단원이 이미 있습니다. 다시 넣으려면 먼저 지워 주세요.`,
    }
  }

  // 1. 단원 — id 를 돌려받아야 나머지를 붙일 수 있습니다
  const { data: units, error: unitError } = await supabaseWrite
    .from('units')
    .insert(
      level.units.map((u) => ({
        level_code: level.levelCode,
        order_index: u.order,
        title: u.title,
        title_ko: u.titleKo,
        theme: u.theme ?? null,
        weeks: 1,
        overview: [
          u.grammar.length ? `문법: ${u.grammar.map((g) => g.title).join(', ')}` : '',
          u.vocabulary.length ? `신규 어휘 ${u.vocabulary.length}개` : '통합·복습 단원',
        ]
          .filter(Boolean)
          .join('\n'),
        is_published: true,
      })),
    )
    .select('id, order_index')

  if (unitError) return { ok: false, error: dbErrorMessage(unitError) }

  const idOf = new Map<number, string>()
  for (const u of units ?? []) idOf.set(u.order_index as number, u.id as string)

  const band = level.levelCode.slice(0, 2)

  const canDoRows = level.units.flatMap((u) =>
    u.canDo.map((c, i) => ({
      unit_id: idOf.get(u.order),
      skill: c.skill,
      statement_ko: c.statement,
      order_index: i + 1,
    })),
  )

  const grammarRows = level.units.flatMap((u) =>
    u.grammar.map((g, i) => ({
      unit_id: idOf.get(u.order),
      title: g.title,
      can_do: g.canDo ?? null,
      explanation_md: g.explanation ?? null,
      cefr_level: band,
      order_index: u.order * 10 + i,
      is_published: true,
    })),
  )

  const lexicalRows = level.units.flatMap((u) =>
    u.vocabulary.map((v) => ({
      unit_id: idOf.get(u.order),
      headword: v.en,
      meaning_ko: v.ko,
      pos: v.pos,
      item_type: v.type ?? 'word',
      example_en: v.ex,
      example_ko: v.exKo,
      cefr_level: band,
      is_published: true,
    })),
  )

  const materialRows = level.units
    .filter((u) => u.text)
    .map((u) => ({
      unit_id: idOf.get(u.order),
      class_id: null,
      title: u.text!.title,
      material_type: 'reading',
      week: u.order,
      body: `${u.text!.body}\n\n---\n\n${u.text!.bodyKo}`,
      is_published: true,
    }))

  for (const [table, rows] of [
    ['can_do_statements', canDoRows],
    ['grammar_points', grammarRows],
    ['lexical_items', lexicalRows],
    ['materials', materialRows],
  ] as const) {
    const err = await insertChunked(table, rows as Record<string, unknown>[])
    if (err) return { ok: false, error: `${err}\n단원은 이미 들어갔습니다. 지우고 다시 시도해 주세요.` }
  }

  revalidatePath('/teacher/diagnostics')
  revalidatePath('/admin')

  return {
    ok: true,
    counts: {
      units: level.units.length,
      canDo: canDoRows.length,
      grammar: grammarRows.length,
      lexical: lexicalRows.length,
      materials: materialRows.length,
    },
  }
}

export async function seedA11(_prev: SeedResult | null, _fd: FormData): Promise<SeedResult> {
  return seedLevel(A1_1)
}

/**
 * 적재한 것을 지웁니다. 단원을 지우면 성취기준은 함께 사라지지만(cascade),
 * 어휘·문법·자료는 unit_id 만 비워지므로 직접 지웁니다.
 */
export async function clearA11(_prev: SeedResult | null, _fd: FormData): Promise<SeedResult> {
  await requireAdmin()

  const { data: units, error } = await supabase
    .from('units')
    .select('id')
    .eq('level_code', A1_1.levelCode)

  if (error) return { ok: false, error: dbErrorMessage(error) }
  const ids = (units ?? []).map((u) => u.id as string)
  if (ids.length === 0) return { ok: false, error: '지울 A1.1 데이터가 없습니다.' }

  for (const table of ['materials', 'lexical_items', 'grammar_points', 'can_do_statements']) {
    const { error: delError } = await supabaseWrite.from(table).delete().in('unit_id', ids)
    if (delError) return { ok: false, error: `${table}: ${dbErrorMessage(delError)}` }
  }

  const { error: unitError } = await supabaseWrite.from('units').delete().in('id', ids)
  if (unitError) return { ok: false, error: dbErrorMessage(unitError) }

  revalidatePath('/teacher/diagnostics')
  revalidatePath('/admin')
  return { ok: true }
}
