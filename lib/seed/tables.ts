/**
 * 테이블 정의 — 단일 출처.
 *
 * 드리미 개발자 콘솔에는 SQL 실행 기능이 없고 테이블 생성 폼만 있습니다.
 * 그래서 이 정의에서
 *   - 콘솔 폼에 그대로 입력할 수 있는 컬럼 목록 (설치 화면)
 *   - 참고용 SQL (docs/tables.sql)
 * 을 함께 만듭니다.
 *
 * id 와 created_at 은 콘솔이 자동으로 만들어 주므로 여기에 넣지 않습니다.
 */
export interface ColumnSpec {
  name: string
  /** 콘솔 폼에서 고르는 타입 */
  type: 'text' | 'uuid' | 'int4' | 'bool' | 'timestamptz' | 'date' | 'numeric'
  required?: boolean
  default?: string
  unique?: boolean
  note?: string
}

export interface TableSpec {
  name: string
  label: string
  note?: string
  columns: ColumnSpec[]
  /** 복합 unique 제약 — 콘솔에서 지원하면 걸어 주세요 */
  compositeUnique?: string[]
  /** 이 테이블이 없으면 앱의 어떤 기능이 막히는가 */
  neededFor: string
  group: 'core' | 'curriculum' | 'progress' | 'classwork'
}

export const TABLE_SPECS: TableSpec[] = [
  {
    name: 'profiles',
    label: '로그인 사용자',
    group: 'core',
    neededFor: '로그인 기록, 학생 sub 확인',
    note: 'sub 에 unique 를 꼭 거세요. 없으면 로그인할 때마다 행이 쌓입니다.',
    columns: [
      { name: 'sub', type: 'text', required: true, unique: true, note: '드리미 고유 식별자' },
      { name: 'email', type: 'text' },
      { name: 'name', type: 'text' },
      { name: 'cohort', type: 'text' },
      { name: 'portal_role', type: 'text', note: '포탈 원본 role' },
      { name: 'is_admin', type: 'bool', default: 'false', note: '기록용. 권한 판정에는 안 씁니다' },
      { name: 'last_login_at', type: 'timestamptz' },
    ],
  },
  {
    name: 'terms',
    label: '학기',
    group: 'core',
    neededFor: '반을 학기에 묶기',
    columns: [
      { name: 'name', type: 'text', required: true, note: '2026-1학기' },
      { name: 'starts_on', type: 'date' },
      { name: 'ends_on', type: 'date' },
      { name: 'is_current', type: 'bool', default: 'false' },
    ],
  },
  {
    name: 'classes',
    label: '반',
    group: 'core',
    neededFor: '반 개설',
    columns: [
      { name: 'term_id', type: 'uuid', note: 'terms.id' },
      { name: 'name', type: 'text', required: true },
      { name: 'program', type: 'text', note: 'EEP / CEP' },
      { name: 'teacher_sub', type: 'text' },
      { name: 'level', type: 'text', note: 'A1.1 ~ C2.3' },
      { name: 'schedule', type: 'text' },
      { name: 'syllabus', type: 'text' },
      { name: 'is_active', type: 'bool', default: 'true' },
    ],
  },
  {
    name: 'enrollments',
    label: '반-학생 배정',
    group: 'core',
    neededFor: '학생 배정, 학생 홈',
    compositeUnique: ['class_id', 'student_sub'],
    columns: [
      { name: 'class_id', type: 'uuid', required: true },
      { name: 'student_sub', type: 'text', required: true },
      { name: 'student_name', type: 'text', note: '명단 표시용 캐시' },
      { name: 'cohort', type: 'text' },
      { name: 'status', type: 'text', default: 'active', note: 'active / dropped' },
    ],
  },

  {
    name: 'units',
    label: '단원',
    group: 'curriculum',
    neededFor: 'A1.1 교육과정 적재',
    columns: [
      { name: 'level_code', type: 'text', required: true, note: 'A1.1 ~ C2.3' },
      { name: 'order_index', type: 'int4', default: '0', note: '= 주차' },
      { name: 'title', type: 'text', required: true },
      { name: 'title_ko', type: 'text' },
      { name: 'theme', type: 'text' },
      { name: 'weeks', type: 'int4' },
      { name: 'overview', type: 'text' },
      { name: 'is_published', type: 'bool', default: 'false' },
      { name: 'created_by', type: 'text' },
    ],
  },
  {
    name: 'can_do_statements',
    label: '성취기준',
    group: 'curriculum',
    neededFor: 'A1.1 교육과정 적재, 성취 평가',
    columns: [
      { name: 'unit_id', type: 'uuid', required: true },
      { name: 'skill', type: 'text', required: true, default: 'speaking', note: 'listening/reading/speaking/writing' },
      { name: 'statement_ko', type: 'text', required: true },
      { name: 'statement_en', type: 'text' },
      { name: 'order_index', type: 'int4', default: '0' },
    ],
  },
  {
    name: 'lexical_items',
    label: '어휘',
    group: 'curriculum',
    neededFor: '콘텐츠 현황, 어휘 학습',
    columns: [
      { name: 'unit_id', type: 'uuid' },
      { name: 'headword', type: 'text', required: true },
      { name: 'item_type', type: 'text', default: 'word', note: 'word/collocation/phrasal_verb/idiom' },
      { name: 'pos', type: 'text' },
      { name: 'cefr_level', type: 'text', required: true },
      { name: 'meaning_ko', type: 'text', required: true },
      { name: 'example_en', type: 'text' },
      { name: 'example_ko', type: 'text' },
      { name: 'audio_url', type: 'text' },
      { name: 'tags', type: 'text' },
      { name: 'is_published', type: 'bool', default: 'false' },
      { name: 'created_by', type: 'text' },
    ],
  },
  {
    name: 'grammar_points',
    label: '문법 항목',
    group: 'curriculum',
    neededFor: '콘텐츠 현황, 문법 학습',
    columns: [
      { name: 'unit_id', type: 'uuid' },
      { name: 'title', type: 'text', required: true },
      { name: 'cefr_level', type: 'text', required: true },
      { name: 'category', type: 'text' },
      { name: 'can_do', type: 'text' },
      { name: 'explanation_md', type: 'text' },
      { name: 'order_index', type: 'int4', default: '0' },
      { name: 'is_published', type: 'bool', default: 'false' },
      { name: 'created_by', type: 'text' },
    ],
  },

  {
    name: 'materials',
    label: '수업 자료',
    group: 'classwork',
    neededFor: '단원 지문, 반별 자료',
    note: 'class_id 를 비워 두면 모든 반이 공유하는 표준 자료입니다. 필수로 두지 마세요.',
    columns: [
      { name: 'class_id', type: 'uuid', note: '비우면 표준 자료' },
      { name: 'unit_id', type: 'uuid' },
      { name: 'title', type: 'text', required: true },
      { name: 'material_type', type: 'text', default: 'reading', note: 'reading/grammar/audio/slide/link' },
      { name: 'week', type: 'int4' },
      { name: 'body', type: 'text' },
      { name: 'url', type: 'text' },
      { name: 'is_published', type: 'bool', default: 'false' },
      { name: 'created_by', type: 'text' },
    ],
  },
  {
    name: 'assignments',
    label: '과제',
    group: 'classwork',
    neededFor: '과제 부여',
    columns: [
      { name: 'class_id', type: 'uuid', required: true },
      { name: 'unit_id', type: 'uuid' },
      { name: 'title', type: 'text', required: true },
      { name: 'assignment_type', type: 'text', default: 'writing', note: 'writing/reading/speaking' },
      { name: 'instructions', type: 'text' },
      { name: 'due_at', type: 'timestamptz' },
      { name: 'max_score', type: 'int4', default: '100' },
      { name: 'is_published', type: 'bool', default: 'false' },
      { name: 'created_by', type: 'text' },
    ],
  },
  {
    name: 'submissions',
    label: '제출·피드백',
    group: 'classwork',
    neededFor: '과제 제출과 채점',
    compositeUnique: ['assignment_id', 'student_sub'],
    columns: [
      { name: 'assignment_id', type: 'uuid', required: true },
      { name: 'student_sub', type: 'text', required: true },
      { name: 'content', type: 'text' },
      { name: 'audio_url', type: 'text' },
      { name: 'submitted_at', type: 'timestamptz' },
      { name: 'feedback', type: 'text' },
      { name: 'score', type: 'numeric' },
      { name: 'graded_by', type: 'text' },
      { name: 'graded_at', type: 'timestamptz' },
    ],
  },

  {
    name: 'student_can_do',
    label: '학생별 성취 기록',
    group: 'progress',
    neededFor: '승급 판정 근거',
    compositeUnique: ['student_sub', 'can_do_id'],
    columns: [
      { name: 'student_sub', type: 'text', required: true },
      { name: 'can_do_id', type: 'uuid', required: true },
      { name: 'class_id', type: 'uuid' },
      { name: 'status', type: 'text', default: 'not_yet', note: 'achieved / partial / not_yet' },
      { name: 'assessed_on', type: 'date' },
      { name: 'assessed_by', type: 'text' },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'skill_profiles',
    label: '기능별 현재 레벨',
    group: 'progress',
    neededFor: '영역별 프로필 — 이 시스템의 핵심',
    note: '학생 한 명이 듣기·읽기·말하기·쓰기마다 다른 레벨을 가집니다.',
    compositeUnique: ['student_sub', 'skill'],
    columns: [
      { name: 'student_sub', type: 'text', required: true },
      { name: 'skill', type: 'text', required: true, note: 'listening/reading/speaking/writing' },
      { name: 'level_code', type: 'text', required: true },
      { name: 'updated_at', type: 'timestamptz' },
      { name: 'note', type: 'text' },
    ],
  },
  {
    name: 'progress',
    label: '레벨테스트·출석·성취',
    group: 'progress',
    neededFor: '진도 기록',
    columns: [
      { name: 'class_id', type: 'uuid', required: true },
      { name: 'student_sub', type: 'text', required: true },
      { name: 'record_type', type: 'text', required: true, note: 'level_test / attendance / achievement' },
      { name: 'recorded_on', type: 'date' },
      { name: 'level', type: 'text' },
      { name: 'value', type: 'numeric' },
      { name: 'note', type: 'text' },
      { name: 'created_by', type: 'text' },
    ],
  },
]

export const GROUP_LABELS: Record<TableSpec['group'], string> = {
  core: '로그인·수업 운영',
  curriculum: '교육과정',
  classwork: '자료·과제',
  progress: '학생 성취',
}

/** 참고용 SQL. 콘솔에 SQL 실행 기능이 생기면 이걸 쓰면 됩니다. */
export function generateDdl(schema = 'app_6'): string {
  const tables = TABLE_SPECS.map((t) => {
    const cols = [
      '  id          uuid primary key default gen_random_uuid()',
      '  created_at  timestamptz not null default now()',
      ...t.columns.map((c) => {
        const parts = [`  ${c.name}`, c.type]
        if (c.required) parts.push('not null')
        if (c.default) parts.push(`default ${c.type === 'text' ? `'${c.default}'` : c.default}`)
        if (c.unique) parts.push('unique')
        return parts.join(' ') + (c.note ? `  -- ${c.note}` : '')
      }),
    ]
    if (t.compositeUnique) cols.push(`  unique (${t.compositeUnique.join(', ')})`)
    return `-- ${t.label}\ncreate table if not exists ${schema}.${t.name} (\n${cols.join(',\n')}\n);`
  })

  return `-- 드리미 영어 LMS — 테이블 생성
-- lib/seed/tables.ts 에서 생성된 SQL 입니다. 이 파일을 직접 고치지 마세요.
--
-- 드리미 콘솔에는 SQL 실행 기능이 없어서, 실제 생성은 콘솔 폼으로 합니다.
-- 이 파일은 참고용이며 다른 환경에서 쓸 때를 위한 것입니다.

${tables.join('\n\n')}

grant usage on schema ${schema} to anon, authenticated;
grant all on all tables in schema ${schema} to anon, authenticated;
grant all on all sequences in schema ${schema} to anon, authenticated;
`
}
