export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type CefrLevel = (typeof CEFR_LEVELS)[number]

/** CEFR 3구분 — 기초 / 자립 / 숙달 사용자 */
export const CEFR_BAND: Record<CefrLevel, string> = {
  A1: '기초 사용자',
  A2: '기초 사용자',
  B1: '자립 사용자',
  B2: '자립 사용자',
  C1: '숙달 사용자',
  C2: '숙달 사용자',
}

/** 레벨 배지 색 — 밴드별로 묶어서 한눈에 구분되게 */
export const CEFR_BADGE: Record<CefrLevel, string> = {
  A1: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  A2: 'bg-emerald-100 text-emerald-800 ring-emerald-700/20',
  B1: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  B2: 'bg-sky-100 text-sky-800 ring-sky-700/20',
  C1: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  C2: 'bg-violet-100 text-violet-800 ring-violet-700/20',
}

export function isCefrLevel(v: unknown): v is CefrLevel {
  return typeof v === 'string' && (CEFR_LEVELS as readonly string[]).includes(v)
}

/**
 * 학습 트랙 — 학생은 단일 레벨이 아니라 트랙별 레벨을 가집니다.
 * CEFR 의 "영역별 프로필" 원칙을 이 시스템의 기능 구조에 맞춰 3축으로 잡은 것입니다.
 */
export const TRACKS = [
  { value: 'vocab', label: '어휘' },
  { value: 'grammar', label: '문법' },
  { value: 'speaking', label: '스피킹' },
] as const
export type Track = (typeof TRACKS)[number]['value']

export const LEXICAL_ITEM_TYPES = [
  { value: 'word', label: '단어' },
  { value: 'collocation', label: '연어' },
  { value: 'phrasal_verb', label: '구동사' },
  { value: 'idiom', label: '관용구' },
] as const
export type LexicalItemType = (typeof LEXICAL_ITEM_TYPES)[number]['value']

export const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'pronoun',
  'determiner',
  'phrase',
] as const

export const GRAMMAR_CATEGORIES = [
  { value: 'tense', label: '시제' },
  { value: 'modal', label: '조동사' },
  { value: 'clause', label: '절·접속' },
  { value: 'article', label: '관사·한정사' },
  { value: 'voice', label: '태' },
  { value: 'comparison', label: '비교' },
  { value: 'question', label: '의문·부정' },
  { value: 'nonfinite', label: '준동사' },
  { value: 'discourse', label: '담화·연결' },
  { value: 'other', label: '기타' },
] as const

export const QUESTION_TYPES = [
  { value: 'mcq_meaning', label: '뜻 고르기', autoGraded: true },
  { value: 'cloze', label: '빈칸 채우기', autoGraded: true },
  { value: 'match', label: '예문 매칭', autoGraded: true },
  { value: 'dictation', label: '받아쓰기', autoGraded: true },
  { value: 'write', label: '영작', autoGraded: false },
] as const
export type QuestionType = (typeof QUESTION_TYPES)[number]['value']

/** 보기(choices)가 필요한 문항 유형 */
export const CHOICE_BASED_TYPES: QuestionType[] = ['mcq_meaning', 'match']

/**
 * 스피킹 과제 유형 — 공인 시험 형식을 차용했고, 괄호는 주로 쓰이는 레벨대입니다.
 */
export const SPEAKING_TASK_TYPES = [
  { value: 'self_intro', label: '자기소개', hint: 'A1–A2' },
  { value: 'picture_desc', label: '그림 묘사', hint: 'A2–B1' },
  { value: 'opinion', label: '의견 진술', hint: 'B1–B2' },
  { value: 'discussion', label: '추상 주제 토론', hint: 'C1' },
] as const
export type SpeakingTaskType = (typeof SPEAKING_TASK_TYPES)[number]['value']

/**
 * CEFR 스피킹 공식 평가 6축. 마일스톤 2 의 채점 루브릭이자
 * speaking_submissions 테이블의 점수 컬럼이 됩니다.
 */
export const SPEAKING_RUBRIC_AXES = [
  { value: 'range', label: 'Range', ko: '표현 폭' },
  { value: 'accuracy', label: 'Accuracy', ko: '정확성' },
  { value: 'fluency', label: 'Fluency', ko: '유창성' },
  { value: 'interaction', label: 'Interaction', ko: '상호작용' },
  { value: 'coherence', label: 'Coherence', ko: '응집성' },
  { value: 'phonology', label: 'Phonology', ko: '음운' },
] as const

export function labelOf<T extends readonly { value: string; label: string }[]>(
  options: T,
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? value ?? '—'
}
