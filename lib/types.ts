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
  role: 'admin' | 'teacher' | 'student'
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

export const TABLES = {
  profiles: 'profiles',
  lexicalItems: 'lexical_items',
  grammarPoints: 'grammar_points',
  questions: 'questions',
  speakingTasks: 'speaking_tasks',
} as const

/** Server Action 의 공통 반환 형태 */
export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string }
