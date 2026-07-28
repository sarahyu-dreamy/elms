import { CEFR_LEVELS, type CefrLevel } from './cefr'

/**
 * 레벨 체계 — CEFR 6단계를 상·중·하로 쪼갠 18단계.
 *
 * 표기는 A1.1 / A1.2 / A1.3 (1이 하, 3이 상). 숫자가 커질수록 상위라
 * 문자열 정렬만으로 순서가 맞고, 공인 시험의 A1/A2 표기와도 섞이지 않습니다.
 *
 * ★ 승급은 트랙별(어휘·문법·스피킹)로 따로 일어납니다.
 *   어휘 B1.2 · 스피킹 A2.3 인 학생이 정상입니다. CEFR 이 영역별 프로필을
 *   전제하는 체계라, 단일 레벨로 묶으면 오히려 기준에서 벗어납니다.
 */
export interface LevelSpec {
  /** A1.1 — 데이터에 저장하는 값 */
  code: string
  band: CefrLevel
  /** 1=하, 2=중, 3=상 */
  step: 1 | 2 | 3
  /** 화면 표시용 — 'A1 하' */
  labelKo: string
  /** 이 단계까지의 누적 어휘 목표 */
  vocabTarget: number
  /** 이 단계에서 다루는 문법 초점 */
  grammar: string[]
  /** 대표 스피킹 과제 */
  speaking: string
  /** 성취 기준 — "무엇을 할 수 있는가" */
  canDo: string
}

const STEP_KO: Record<1 | 2 | 3, string> = { 1: '하', 2: '중', 3: '상' }

function spec(
  band: CefrLevel,
  step: 1 | 2 | 3,
  vocabTarget: number,
  canDo: string,
  grammar: string[],
  speaking: string,
): LevelSpec {
  return {
    code: `${band}.${step}`,
    band,
    step,
    labelKo: `${band} ${STEP_KO[step]}`,
    vocabTarget,
    grammar,
    speaking,
    canDo,
  }
}

export const LEVELS: LevelSpec[] = [
  spec('A1', 1, 200, '이름·나이·사는 곳을 묻고 답할 수 있다.',
    ['be동사', '인칭대명사', '관사 a/an/the', '명사 복수형'],
    '이름·나이·가족 말하기'),
  spec('A1', 2, 400, '하루 일과와 좋아하는 것을 간단한 문장으로 말할 수 있다.',
    ['현재시제', '기본 의문문(do/does)', '장소 전치사', '빈도부사'],
    '일과·좋아하는 것 말하기'),
  spec('A1', 3, 600, '자기소개를 서너 문장으로 이어서 할 수 있다.',
    ['can', '명령문', '시간 전치사', 'and / but / because'],
    '자기소개 (연결된 3–4문장)'),

  spec('A2', 1, 850, '지난 일을 시간 순서대로 이야기할 수 있다.',
    ['과거시제(규칙)', '과거시제(불규칙)', 'there was/were', '시간 표현'],
    '지난 주말 이야기하기'),
  spec('A2', 2, 1100, '두 가지를 비교하고 앞으로의 계획을 말할 수 있다.',
    ['will / be going to', '비교급·최상급', '수량 표현', '현재진행(미래)'],
    '그림 묘사 (기초)'),
  spec('A2', 3, 1400, '익숙한 주제에 대해 경험을 주고받을 수 있다.',
    ['현재완료(경험)', 'should / must / have to', '부정사 기초', '접속사 so/when'],
    '계획·경험 교환하기'),

  spec('B1', 1, 1800, '그림이나 상황을 구체적으로 묘사할 수 있다.',
    ['관계대명사', '조건문 1형', '동명사', '과거진행'],
    '그림 묘사 (상세)'),
  spec('B1', 2, 2200, '자기 의견을 근거 하나와 함께 말할 수 있다.',
    ['수동태', '부정사 vs 동명사', '의견 표현 구문', '연결어(however 등)'],
    '의견 말하기 (근거 1개)'),
  spec('B1', 3, 2600, '준비 없이 익숙한 주제의 대화에 참여하고 경험을 설명할 수 있다.',
    ['과거완료', '간접화법', '조건문 2형', '관계부사'],
    '경험 설명 + 이유 전개'),

  spec('B2', 1, 3100, '찬반을 비교해 자기 입장을 논증할 수 있다.',
    ['현재완료진행', '관계부사 심화', '분사 형용사', '대조·양보 연결어'],
    '의견 진술 (찬반 비교)'),
  spec('B2', 2, 3600, '시사 주제에 대해 견해를 전개하고 뒷받침할 수 있다.',
    ['가정법 과거완료', '분사구문', '복합 명사구', 'It 강조'],
    '시사 주제 논증'),
  spec('B2', 3, 4200, '반론에 즉석에서 대응하며 논의를 이어갈 수 있다.',
    ['도치', '복합관계사', '담화표지', '완료부정사'],
    '반론에 대응하기'),

  spec('C1', 1, 4900, '추상적 주제를 체계적으로 구성해 발표할 수 있다.',
    ['강조구문', '명사화', '양보구문', '고급 수동 표현'],
    '추상 주제 발표'),
  spec('C1', 2, 5600, '표현을 크게 고민하지 않고 유창하게 토론할 수 있다.',
    ['생략', '고급 연결어', '미묘한 modality', '가정 표현 확장'],
    '구조화된 토론'),
  spec('C1', 3, 6400, '준비 없이 복잡한 논지를 전개할 수 있다.',
    ['복합 종속절', '문체 변주', '전치사구 심화'],
    '즉흥 논증'),

  spec('C2', 1, 7200, '미묘한 의미 차이를 구별해 정확하게 표현할 수 있다.',
    ['관용적 통사', '사용역(register) 조절', '함축 표현'],
    '뉘앙스 구별해 말하기'),
  spec('C2', 2, 8000, '상황과 상대에 맞춰 문체를 조절할 수 있다.',
    ['문체 전환', '수사적 장치', '고급 담화 구조'],
    '학술적 토론'),
  spec('C2', 3, 9000, '매우 유창하고 정밀하게, 원어민 수준으로 상호작용할 수 있다.',
    ['정밀도·자연스러움 중심 (신규 문법 항목 없음)'],
    '원어민 수준 상호작용'),
]

export const LEVEL_CODES = LEVELS.map((l) => l.code)

export function levelByCode(code: string | null | undefined): LevelSpec | undefined {
  return LEVELS.find((l) => l.code === code)
}

/** 밴드(A1, A2 …)별로 묶어서 반환 — 커리큘럼 화면용 */
export function levelsByBand(): { band: CefrLevel; levels: LevelSpec[] }[] {
  return CEFR_LEVELS.map((band) => ({
    band,
    levels: LEVELS.filter((l) => l.band === band),
  }))
}

/** 다음 단계 (승급 대상). 최상위면 undefined */
export function nextLevel(code: string): LevelSpec | undefined {
  const i = LEVELS.findIndex((l) => l.code === code)
  return i >= 0 ? LEVELS[i + 1] : undefined
}

/** 이 단계에서 새로 익혀야 하는 어휘 수 (이전 단계와의 차이) */
export function vocabDelta(code: string): number {
  const i = LEVELS.findIndex((l) => l.code === code)
  if (i < 0) return 0
  return LEVELS[i].vocabTarget - (i > 0 ? LEVELS[i - 1].vocabTarget : 0)
}
