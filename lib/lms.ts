/** 수업 운영 도메인 상수 — 화면·검증·DB 값의 단일 출처 */

/**
 * 드리미학교 영어 수업은 CEFR 레벨에 따라 두 그룹으로 나뉩니다.
 *
 * EEP — CEFR A1~B1. 레벨별 수업. 이 시스템의 레벨·단원 커리큘럼이 적용되는 대상입니다.
 * CEP — CEFR B2~C2. 주제별 수업. 레벨 단원이 아니라 주제로 개설하므로 별도 세팅입니다.
 *
 * 학생은 입학 시 Placement Test 로 배정되고, EEP 학생은 매 학기 시작 전
 * level-up 테스트에서 B2 이상으로 판정되면 CEP 로 넘어갑니다.
 * 졸업 전 전원이 CEP 도달을 목표로 합니다.
 */
export const PROGRAMS = [
  {
    value: 'EEP',
    label: 'EEP',
    fullName: 'Essential English Project',
    bands: ['A1', 'A2', 'B1'],
    /** 레벨·단원 커리큘럼을 쓰는가 */
    levelBased: true,
    description: 'CEFR A1–B1 · 레벨별 수업',
  },
  {
    value: 'CEP',
    label: 'CEP',
    fullName: 'Creative English Project',
    bands: ['B2', 'C1', 'C2'],
    levelBased: false,
    description: 'CEFR B2–C2 · 주제별 수업',
  },
] as const
export type Program = (typeof PROGRAMS)[number]['value']

export function programOf(band: string): Program | undefined {
  return PROGRAMS.find((p) => (p.bands as readonly string[]).includes(band))?.value
}

/** 한 학기 운영 기준 — 14주 · 주 4회 */
export const TERM_WEEKS = 14
export const SESSIONS_PER_WEEK = 4
export const SESSIONS_PER_TERM = TERM_WEEKS * SESSIONS_PER_WEEK // 56

/**
 * 한 레벨을 한 학기에 끝내는 구성 — 주당 한 단원.
 *   14단원 × 1주 = 14주, 단원당 4차시.
 *
 * 별도의 평가 주차를 빼지 않고, 7단원과 14단원을 통합·복습 단원으로 둡니다.
 * 중간 점검과 기말 평가가 그 두 단원 안에서 이뤄지므로 진도와 평가가 분리되지 않습니다.
 */
export const UNITS_PER_LEVEL = 14
export const WEEKS_PER_UNIT = 1
export const SESSIONS_PER_UNIT = WEEKS_PER_UNIT * SESSIONS_PER_WEEK // 4

/** 통합·복습 단원의 순번 (중간 점검 / 기말 평가) */
export const REVIEW_UNIT_ORDERS = [7, 14]

export const MATERIAL_TYPES = [
  { value: 'reading', label: '읽기' },
  { value: 'grammar', label: '문법' },
  { value: 'audio', label: '듣기' },
  { value: 'slide', label: '슬라이드' },
  { value: 'link', label: '링크' },
] as const
export type MaterialType = (typeof MATERIAL_TYPES)[number]['value']

export const ASSIGNMENT_TYPES = [
  { value: 'writing', label: '쓰기' },
  { value: 'reading', label: '읽기' },
  { value: 'speaking', label: '말하기' },
] as const
export type AssignmentType = (typeof ASSIGNMENT_TYPES)[number]['value']

export const PROGRESS_TYPES = [
  { value: 'level_test', label: '레벨테스트' },
  { value: 'attendance', label: '출석' },
  { value: 'achievement', label: '성취' },
] as const
export type ProgressType = (typeof PROGRESS_TYPES)[number]['value']

export const ENROLLMENT_STATUS = [
  { value: 'active', label: '수강중' },
  { value: 'dropped', label: '중단' },
] as const

export function labelFor<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}
