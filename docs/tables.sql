-- 드리미 영어 LMS — 테이블 생성
-- lib/seed/tables.ts 에서 생성된 SQL 입니다. 이 파일을 직접 고치지 마세요.
--
-- 드리미 콘솔에는 SQL 실행 기능이 없어서, 실제 생성은 콘솔 폼으로 합니다.
-- 이 파일은 참고용이며 다른 환경에서 쓸 때를 위한 것입니다.

-- 로그인 사용자
create table if not exists app_6.profiles (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sub text not null unique  -- 드리미 고유 식별자,
  email text,
  name text,
  cohort text,
  portal_role text  -- 포탈 원본 role,
  is_admin bool default false  -- 기록용. 권한 판정에는 안 씁니다,
  last_login_at timestamptz
);

-- 학기
create table if not exists app_6.terms (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name text not null  -- 2026-1학기,
  starts_on date,
  ends_on date,
  is_current bool default false
);

-- 반
create table if not exists app_6.classes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  term_id uuid  -- terms.id,
  name text not null,
  program text  -- EEP / CEP,
  teacher_sub text,
  level text  -- A1.1 ~ C2.3,
  schedule text,
  syllabus text,
  is_active bool default true
);

-- 반-학생 배정
create table if not exists app_6.enrollments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  class_id uuid not null,
  student_name text not null  -- 명단의 이름,
  student_sub text  -- 로그인 후 연결. 처음엔 비어 있습니다,
  cohort text,
  status text default 'active'  -- active / dropped
);

-- 단원
create table if not exists app_6.units (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  level_code text not null  -- A1.1 ~ C2.3,
  order_index int4 default 0  -- = 주차,
  title text not null,
  title_ko text,
  theme text,
  weeks int4,
  overview text,
  is_published bool default false,
  created_by text
);

-- 성취기준
create table if not exists app_6.can_do_statements (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  unit_id uuid not null,
  skill text not null default 'speaking'  -- listening/reading/speaking/writing,
  statement_ko text not null,
  statement_en text,
  order_index int4 default 0
);

-- 어휘
create table if not exists app_6.lexical_items (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  unit_id uuid,
  headword text not null,
  item_type text default 'word'  -- word/collocation/phrasal_verb/idiom,
  pos text,
  cefr_level text not null,
  meaning_ko text not null,
  example_en text,
  example_ko text,
  audio_url text,
  tags text,
  is_published bool default false,
  created_by text
);

-- 문법 항목
create table if not exists app_6.grammar_points (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  unit_id uuid,
  title text not null,
  cefr_level text not null,
  category text,
  can_do text,
  explanation_md text,
  order_index int4 default 0,
  is_published bool default false,
  created_by text
);

-- 수업 자료
create table if not exists app_6.materials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  class_id uuid  -- 비우면 표준 자료,
  unit_id uuid,
  title text not null,
  material_type text default 'reading'  -- reading/grammar/audio/slide/link,
  week int4,
  body text,
  url text,
  is_published bool default false,
  created_by text
);

-- 차시
create table if not exists app_6.sessions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  unit_id uuid not null,
  order_index int4 not null  -- 1~4,
  mode text not null default 'onsite'  -- onsite / online,
  title text,
  note text  -- 교사용 메모,
  unique (unit_id, order_index)
);

-- 학습 활동
create table if not exists app_6.activities (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  session_id uuid not null,
  class_id uuid  -- 비우면 모든 반 공통,
  activity_type text not null default 'vocab_drill'  -- vocab_drill/text_read/quiz/speaking/writing,
  title text not null,
  instructions text,
  target_id uuid  -- 지문·문항 등 대상,
  is_required bool default true  -- ★ 다음 단원 진입 조건,
  due_at timestamptz  -- 비우면 마감 없음,
  max_score int4,
  order_index int4 default 0,
  is_published bool default false,
  created_by text
);

-- 학생별 활동 진행
create table if not exists app_6.activity_progress (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  activity_id uuid not null,
  status text default 'not_started'  -- not_started/in_progress/completed,
  score numeric  -- 자동 채점 결과,
  attempts int4 default 0,
  started_at timestamptz,
  completed_at timestamptz,
  unique (student_sub, activity_id)
);

-- 제출·피드백
create table if not exists app_6.submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  activity_id uuid not null,
  student_sub text not null,
  content text,
  audio_url text,
  submitted_at timestamptz,
  feedback text,
  score numeric,
  graded_by text,
  graded_at timestamptz,
  pronunciation_score numeric  -- 발음 API 점수. 학생도 봅니다,
  unique (activity_id, student_sub)
);

-- 학생별 성취 기록
create table if not exists app_6.student_can_do (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  can_do_id uuid not null,
  class_id uuid,
  status text default 'not_yet'  -- achieved / partial / not_yet,
  assessed_on date,
  assessed_by text,
  note text,
  unique (student_sub, can_do_id)
);

-- 기능별 현재 레벨
create table if not exists app_6.skill_profiles (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  skill text not null  -- listening/reading/speaking/writing,
  level_code text not null,
  updated_at timestamptz,
  note text,
  unique (student_sub, skill)
);

-- 레벨테스트·출석·성취
create table if not exists app_6.progress (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  class_id uuid not null,
  student_sub text not null,
  record_type text not null  -- level_test / attendance / achievement,
  recorded_on date,
  level text,
  value numeric,
  note text,
  created_by text
);

grant usage on schema app_6 to anon, authenticated;
grant all on all tables in schema app_6 to anon, authenticated;
grant all on all sequences in schema app_6 to anon, authenticated;
