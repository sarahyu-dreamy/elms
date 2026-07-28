/**
 * 2026-1 EEP 반 편성 명단.
 *
 * 학생 sub 는 그 학생이 처음 로그인할 때 생깁니다. 그래서 명단은 이름으로 먼저
 * 넣어 두고, 학생이 로그인하면 이름으로 찾아 sub 를 채웁니다.
 * (enrollments.student_sub 를 필수로 두면 안 되는 이유입니다)
 *
 * 동명이인은 학교 표기(박세은A / 박세은B)를 그대로 씁니다. 임의로 바꾸면
 * 나중에 출석부와 대조가 안 됩니다.
 */
export interface RosterGroup {
  name: string
  program: 'EEP' | 'CEP'
  /** 배정된 레벨. 아직 안 정했으면 null */
  level: string | null
  students: string[]
}

export const ROSTER_2026_1: RosterGroup[] = [
  {
    name: 'EEP Group 1',
    program: 'EEP',
    level: 'A1.1',
    students: [
      '고다현', '김승연', '김시영', '황샤론', '최찬규', '박세은B',
      '윤드림', '전서연', '전수빈', '조현서', '홍승표', '김은우',
    ],
  },
  {
    name: 'EEP Group 2',
    program: 'EEP',
    level: null,
    students: [
      '김가율', '김승하', '김찬송', '박세은A', '박지원', '유승호',
      '윤민지', '윤진아', '이경흔', '이예은', '이하윤', '임선우',
      '임하진', '전지원',
    ],
  },
  {
    name: 'EEP Group 3',
    program: 'EEP',
    level: null,
    students: [
      '김가현', '김정원', '김현성', '노온유', '박기쁨', '박소망',
      '신규담', '이로은', '이지아', '이한결', '이효린', '장나라',
      '정선호', '조사무엘', '허은휼',
    ],
  },
]

export function rosterByName(name: string): RosterGroup | undefined {
  return ROSTER_2026_1.find((g) => g.name === name)
}

export const TOTAL_STUDENTS = ROSTER_2026_1.reduce((n, g) => n + g.students.length, 0)
