import type { Skill } from '../cefr'

/**
 * 레벨별 교육과정 원안.
 *
 * 여기가 단일 출처입니다. 이 데이터에서
 *   - 교사용 미리보기 화면
 *   - DB 적재용 SQL (scripts/gen-seed-sql.mjs)
 * 가 함께 나옵니다. 손으로 두 벌 관리하면 반드시 어긋납니다.
 *
 * 적재 이후의 수정은 DB(단원 CMS)에서 합니다. 이 파일은 최초 원안입니다.
 */
export interface SeedCanDo {
  skill: Skill
  /** "가족 구성원을 세 명 이상 소개할 수 있다." — 관찰 가능한 행동 하나 */
  statement: string
}

export interface SeedUnit {
  /** 레벨 안에서의 순번 (1~14) */
  order: number
  /** Hello! */
  title: string
  /** 인사와 이름 */
  titleKo: string
  theme?: string
  /** 이 단원에서 새로 익히는 어휘 수. 복습 단원은 0 */
  vocabCount: number
  grammar: string[]
  /** 대표 어휘 (전체 목록이 아니라 범위를 보여주는 예시) */
  vocabulary: string[]
  canDo: SeedCanDo[]
  /** 통합·복습 단원인가 */
  isReview?: boolean
}

export interface SeedLevel {
  levelCode: string
  units: SeedUnit[]
}

export function totalVocab(level: SeedLevel): number {
  return level.units.reduce((sum, u) => sum + u.vocabCount, 0)
}

export function totalCanDo(level: SeedLevel): number {
  return level.units.reduce((sum, u) => sum + u.canDo.length, 0)
}
