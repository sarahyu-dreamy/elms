/** 수업 운영 도메인 상수 — 화면·검증·DB 값의 단일 출처 */

export const PROGRAMS = [
  { value: 'EEP', label: 'EEP' },
  { value: 'CEP', label: 'CEP' },
] as const
export type Program = (typeof PROGRAMS)[number]['value']

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
