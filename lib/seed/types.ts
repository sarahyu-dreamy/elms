import type { Skill } from '../cefr'
import type { LexicalItemType } from '../cefr'

/**
 * 레벨별 교육과정 원안.
 *
 * 여기가 단일 출처입니다. 이 데이터에서
 *   - 교사용 미리보기 화면
 *   - DB 적재용 SQL (lib/seed/sql.ts)
 * 이 함께 나옵니다. 손으로 두 벌 관리하면 반드시 어긋납니다.
 *
 * 적재 이후의 수정은 DB(단원 CMS)에서 합니다. 이 파일은 최초 원안입니다.
 */
export interface SeedCanDo {
  skill: Skill
  /** "가족 구성원을 세 명 이상 소개할 수 있다." — 관찰 가능한 행동 하나 */
  statement: string
}

export interface SeedVocab {
  en: string
  ko: string
  /** noun / verb / adjective / adverb / preposition / phrase … */
  pos: string
  /** 기본값 word. good morning 같은 표현은 collocation, get up 은 phrasal_verb */
  type?: LexicalItemType
  /**
   * 예문. 그 단원까지 배운 단어로만 만드는 것을 원칙으로 합니다.
   * 아직 안 배운 단어가 섞이면 예문이 오히려 장벽이 됩니다.
   */
  ex: string
  exKo: string
}

export interface SeedGrammar {
  /** 화면과 grammar_points.title 에 쓰는 이름 */
  title: string
  /** 이 문법으로 무엇을 할 수 있게 되는가 (CEFR can-do 형식) */
  canDo?: string
  /** 학생용 설명 (마크다운) */
  explanation?: string
}

/** 단원별 학습 지문. 대화문이나 짧은 읽기 글 */
export interface SeedText {
  kind: 'dialogue' | 'reading'
  title: string
  body: string
  bodyKo: string
}

export interface SeedUnit {
  /** 레벨 안에서의 순번 (1~14) = 주차 */
  order: number
  /** Hello! */
  title: string
  /** 인사와 이름 */
  titleKo: string
  theme?: string
  grammar: SeedGrammar[]
  /** 이 단원에서 새로 익히는 어휘 전체 */
  vocabulary: SeedVocab[]
  canDo: SeedCanDo[]
  /** 수업에서 함께 읽는 지문 */
  text?: SeedText
  /** 통합·복습 단원인가 (새 어휘 없음) */
  isReview?: boolean
}

export interface SeedLevel {
  levelCode: string
  units: SeedUnit[]
  /** 예문·지문에 등장하는 사람 이름. 어휘로 치지 않습니다. */
  names?: string[]
}

export function totalVocab(level: SeedLevel): number {
  return level.units.reduce((sum, u) => sum + u.vocabulary.length, 0)
}

export function totalCanDo(level: SeedLevel): number {
  return level.units.reduce((sum, u) => sum + u.canDo.length, 0)
}

export function totalGrammar(level: SeedLevel): number {
  return level.units.reduce((sum, u) => sum + u.grammar.length, 0)
}

/**
 * 어휘 목록에 없어도 예문에 써도 되는 말 — 기능어와 기본 인사 표현.
 * 이런 말까지 "안 배운 단어"로 치면 예문을 만들 수가 없습니다.
 */
const FREE_WORDS = new Set(
  `a an the is are am be was were i you he she it we they me him her us them
   my your his its our their this that these those and but or so to of at in on for with from
   not no yes do does don dont doesn what who how where when why too very here there
   thank thanks welcome please ok sure let lets`.split(/\s+/),
)

/**
 * "그 단원까지 배운 단어로만 예문을 만든다"는 원칙이 지켜졌는지 검사합니다.
 *
 * A1.1 학생에게는 예문 속 모르는 단어 하나가 예문 전체를 무용지물로 만듭니다.
 * 사람 이름(문장 중간의 대문자)과 대화 화자 표시는 걸러 냅니다.
 */
/** 불규칙 활용 — 원형을 배웠으면 이 형태도 통과시킵니다 */
const IRREGULAR: Record<string, string> = {
  has: 'have',
  does: 'do',
  goes: 'go',
}

export function outOfVocabWords(level: SeedLevel): string[] {
  const known = new Set<string>((level.names ?? []).map((n) => n.toLowerCase()))
  const problems: string[] = []

  const scan = (unitOrder: number, label: string, text: string) => {
    for (const sentence of text.split('\n')) {
      // 대화 화자 표시(A:, B:) 제거
      const line = sentence.replace(/^[A-Z]:\s*/, '')
      const tokens = line.match(/[A-Za-z][A-Za-z’']*/g) ?? []

      tokens.forEach((raw, i) => {
        const w = raw.toLowerCase().replace(/[’'].*$/, '')
        if (!w || FREE_WORDS.has(w) || known.has(w)) return
        // 불규칙 활용은 원형을 배웠으면 통과 (have → has)
        if (IRREGULAR[w] && known.has(IRREGULAR[w])) return
        // 규칙 변화형은 원형이 있으면 통과
        if (w.endsWith('s') && known.has(w.slice(0, -1))) return
        if (w.endsWith('es') && known.has(w.slice(0, -2))) return
        if (w.endsWith('ing') && known.has(w.slice(0, -3))) return
        problems.push(`${unitOrder}단원 ${label}: "${raw}"`)
      })
    }
  }

  for (const unit of level.units) {
    for (const v of unit.vocabulary) {
      v.en.toLowerCase().split(/\s+/).forEach((w) => known.add(w))
    }
    for (const v of unit.vocabulary) scan(unit.order, v.en, v.ex)
    if (unit.text) scan(unit.order, '지문', unit.text.body)
  }

  return problems
}

/** 같은 단어가 여러 단원에 중복으로 들어갔는지 검사 */
export function duplicateWords(level: SeedLevel): string[] {
  const seen = new Map<string, number>()
  const dups: string[] = []
  for (const unit of level.units) {
    for (const v of unit.vocabulary) {
      const key = v.en.toLowerCase()
      if (seen.has(key)) dups.push(`${v.en} (${seen.get(key)}단원 · ${unit.order}단원)`)
      else seen.set(key, unit.order)
    }
  }
  return dups
}
