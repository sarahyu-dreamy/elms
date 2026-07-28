import { CEFR_LEVELS, LEXICAL_ITEM_TYPES, GRAMMAR_CATEGORIES } from './cefr'
import { mapHeaders, parseDelimited } from './csv'

export type ImportKind = 'vocab' | 'grammar'

export interface ImportSpec {
  kind: ImportKind
  label: string
  table: string
  /** 표준 컬럼명 → 허용 헤더 표기 */
  aliases: Record<string, string[]>
  required: string[]
  template: string
}

export const IMPORT_SPECS: Record<ImportKind, ImportSpec> = {
  vocab: {
    kind: 'vocab',
    label: '단어·관용어구',
    table: 'lexical_items',
    aliases: {
      headword: ['headword', '표제어', '단어', 'word'],
      cefr_level: ['cefr_level', 'level', '레벨', 'cefr'],
      meaning_ko: ['meaning_ko', 'meaning', '뜻', '의미'],
      item_type: ['item_type', 'type', '유형'],
      pos: ['pos', '품사'],
      example_en: ['example_en', 'example', '예문', '영어예문'],
      example_ko: ['example_ko', '예문해석', '한국어예문'],
      tags: ['tags', '태그'],
    },
    required: ['headword', 'cefr_level', 'meaning_ko'],
    template:
      'headword\tcefr_level\tmeaning_ko\titem_type\tpos\texample_en\texample_ko\ttags\n' +
      'resilient\tB2\t회복력 있는\tword\tadjective\tShe is remarkably resilient.\t그는 놀랄 만큼 회복력이 좋다.\t1학기,성격\n' +
      'take after\tB1\t~를 닮다\tphrasal_verb\tverb\tHe takes after his mother.\t그는 어머니를 닮았다.\t가족',
  },
  grammar: {
    kind: 'grammar',
    label: '문법',
    table: 'grammar_points',
    aliases: {
      title: ['title', '항목', '문법항목', 'name'],
      cefr_level: ['cefr_level', 'level', '레벨', 'cefr'],
      category: ['category', '분류'],
      can_do: ['can_do', 'cando', 'candostatement', '성취기준'],
      explanation_md: ['explanation_md', 'explanation', '설명'],
      order_index: ['order_index', 'order', '순서'],
    },
    required: ['title', 'cefr_level'],
    template:
      'title\tcefr_level\tcategory\tcan_do\torder_index\n' +
      '현재완료 — 경험 용법\tA2\ttense\t과거의 경험을 묻고 답할 수 있다.\t10\n' +
      '가정법 과거완료\tB2\tclause\t실현되지 않은 과거를 가정해 말할 수 있다.\t20',
  },
}

export interface ParsedRow {
  line: number
  values: Record<string, string>
  error: string | null
}

export interface ParseOutcome {
  headers: string[]
  missingHeaders: string[]
  rows: ParsedRow[]
  validCount: number
}

const LEVELS = CEFR_LEVELS as readonly string[]
const ITEM_TYPES = LEXICAL_ITEM_TYPES.map((t) => t.value) as string[]
const CATEGORIES = GRAMMAR_CATEGORIES.map((c) => c.value) as string[]

/**
 * 붙여넣은 표를 검증된 행 목록으로 바꿉니다.
 * 미리보기 화면과 서버 저장이 같은 함수를 쓰므로, 화면에서 통과한 것만 저장됩니다.
 */
export function parseImport(text: string, kind: ImportKind): ParseOutcome {
  const spec = IMPORT_SPECS[kind]
  const table = parseDelimited(text)

  if (table.length === 0) {
    return { headers: [], missingHeaders: spec.required, rows: [], validCount: 0 }
  }

  const [headerRow, ...dataRows] = table
  const columns = mapHeaders(headerRow, spec.aliases)
  const missingHeaders = spec.required.filter((r) => !(r in columns))

  if (missingHeaders.length > 0) {
    return { headers: headerRow, missingHeaders, rows: [], validCount: 0 }
  }

  const rows: ParsedRow[] = dataRows.map((cells, i) => {
    const values: Record<string, string> = {}
    for (const [key, index] of Object.entries(columns)) {
      values[key] = (cells[index] ?? '').trim()
    }

    let error: string | null = null

    for (const key of spec.required) {
      if (!values[key]) error ??= `${key} 값이 비어 있습니다`
    }

    if (!error && !LEVELS.includes(values.cefr_level)) {
      error = `레벨 값이 올바르지 않습니다: "${values.cefr_level}" (A1~C2)`
    }

    if (!error && kind === 'vocab' && values.item_type && !ITEM_TYPES.includes(values.item_type)) {
      error = `유형 값이 올바르지 않습니다: "${values.item_type}" (${ITEM_TYPES.join(', ')})`
    }

    if (!error && kind === 'grammar' && values.category && !CATEGORIES.includes(values.category)) {
      error = `분류 값이 올바르지 않습니다: "${values.category}" (${CATEGORIES.join(', ')})`
    }

    // 헤더가 1행이므로 실제 파일 기준 줄 번호는 +2
    return { line: i + 2, values, error }
  })

  return {
    headers: headerRow,
    missingHeaders: [],
    rows,
    validCount: rows.filter((r) => !r.error).length,
  }
}

/** 검증을 통과한 행을 DB 컬럼 형태로 바꿉니다. */
export function toDbRow(
  row: ParsedRow,
  kind: ImportKind,
  publish: boolean,
  createdBy: string,
): Record<string, unknown> {
  const v = row.values

  if (kind === 'vocab') {
    return {
      headword: v.headword,
      cefr_level: v.cefr_level,
      meaning_ko: v.meaning_ko,
      item_type: v.item_type || 'word',
      pos: v.pos || null,
      example_en: v.example_en || null,
      example_ko: v.example_ko || null,
      tags: v.tags || null,
      is_published: publish,
      created_by: createdBy,
    }
  }

  const order = Number(v.order_index)
  return {
    title: v.title,
    cefr_level: v.cefr_level,
    category: v.category || null,
    can_do: v.can_do || null,
    explanation_md: v.explanation_md || null,
    order_index: Number.isFinite(order) ? Math.trunc(order) : 0,
    is_published: publish,
    created_by: createdBy,
  }
}
