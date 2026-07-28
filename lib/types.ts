import type {
  CefrLevel,
  LexicalItemType,
  QuestionType,
  SpeakingTaskType,
} from './cefr'

/** 모든 테이블 공통 — id 와 created_at 은 Supabase 가 자동 생성합니다. */
interface BaseRow {
  id: string
  created_at: string
}

export interface Profile extends BaseRow {
  sub: string
  email: string | null
  name: string | null
  /** 포탈이 준 원본 role — student / teacher / admin */
  portal_role: string | null
  /** 이 LMS 의 관리자 여부. ADMIN_SUBS allowlist 로 결정됩니다 */
  is_admin: boolean
  cohort: string | null
  last_login_at: string | null
}

export interface LexicalItem extends BaseRow {
  headword: string
  item_type: LexicalItemType
  pos: string | null
  cefr_level: CefrLevel
  meaning_ko: string
  example_en: string | null
  example_ko: string | null
  audio_url: string | null
  tags: string | null
  is_published: boolean
  created_by: string | null
}

export interface GrammarPoint extends BaseRow {
  title: string
  cefr_level: CefrLevel
  category: string | null
  can_do: string | null
  explanation_md: string | null
  order_index: number
  is_published: boolean
  created_by: string | null
}

export interface Question extends BaseRow {
  target_type: 'lexical' | 'grammar' | null
  target_id: string | null
  question_type: QuestionType
  cefr_level: CefrLevel
  prompt: string
  choices: string[] | null
  answer: string
  explanation: string | null
  is_published: boolean
  created_by: string | null
}

export interface SpeakingTask extends BaseRow {
  title: string
  cefr_level: CefrLevel
  task_type: SpeakingTaskType
  prompt: string
  image_url: string | null
  prep_seconds: number
  speak_seconds: number
  is_published: boolean
  created_by: string | null
}

// ── 수업 운영 ────────────────────────────────────────────────

export interface Term extends BaseRow {
  name: string
  starts_on: string | null
  ends_on: string | null
  is_current: boolean
}

export interface ClassRow extends BaseRow {
  term_id: string | null
  name: string
  /** EEP / CEP. group 은 SQL 예약어라 program 으로 둡니다 */
  program: string | null
  teacher_sub: string | null
  level: string | null
  schedule: string | null
  syllabus: string | null
  is_active: boolean
}

export interface Enrollment extends BaseRow {
  class_id: string
  student_sub: string
  /** 명단을 띄울 때마다 포탈을 조회하지 않으려고 캐시해 둡니다 */
  student_name: string | null
  cohort: string | null
  status: string
}

export interface Material extends BaseRow {
  class_id: string
  title: string
  material_type: string
  week: number | null
  body: string | null
  url: string | null
  is_published: boolean
  created_by: string | null
}

export interface Assignment extends BaseRow {
  class_id: string
  title: string
  assignment_type: string
  instructions: string | null
  due_at: string | null
  max_score: number | null
  is_published: boolean
  created_by: string | null
}

export interface Submission extends BaseRow {
  assignment_id: string
  student_sub: string
  content: string | null
  audio_url: string | null
  submitted_at: string | null
  feedback: string | null
  score: number | null
  graded_by: string | null
  graded_at: string | null
}

export interface ProgressRecord extends BaseRow {
  class_id: string
  student_sub: string
  record_type: string
  recorded_on: string | null
  level: string | null
  value: number | null
  note: string | null
  created_by: string | null
}

export const TABLES = {
  profiles: 'profiles',
  terms: 'terms',
  classes: 'classes',
  enrollments: 'enrollments',
  materials: 'materials',
  assignments: 'assignments',
  submissions: 'submissions',
  progress: 'progress',
  // 마일스톤 1 의 CEFR 콘텐츠 은행 (/admin)
  lexicalItems: 'lexical_items',
  grammarPoints: 'grammar_points',
  questions: 'questions',
  speakingTasks: 'speaking_tasks',
} as const

/** Server Action 의 공통 반환 형태 */
export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string }
