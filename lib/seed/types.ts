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
}

export interface SeedGrammar {
  /** 화면과 grammar_points.title 에 쓰는 이름 */
  title: string
  /** 이 문법으로 무엇을 할 수 있게 되는가 (CEFR can-do 형식) */
  canDo?: string
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
  /** 통합·복습 단원인가 (새 어휘 없음) */
  isReview?: boolean
}

export interface SeedLevel {
  levelCode: string
  units: SeedUnit[]
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
