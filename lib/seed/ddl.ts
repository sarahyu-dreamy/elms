/**
 * 테이블 생성 SQL.
 *
 * 여기가 단일 출처입니다. docs/tables.sql 은 이 파일에서 생성되고,
 * 설치 화면의 복사 버튼도 같은 문자열을 씁니다.
 *
 * 드리미 개발자 콘솔에 SQL 실행 기능이 있으면 그대로 붙여넣으면 되고,
 * 폼으로만 만들 수 있다면 docs/schema.md 의 표를 보고 컬럼을 하나씩 넣습니다.
 */
export function generateDdl(schema = 'app_6'): string {
  return `-- 드리미 영어 LMS — 테이블 생성
-- lib/seed/ddl.ts 에서 생성된 SQL 입니다. 이 파일을 직접 고치지 마세요.
--
-- 여러 번 실행해도 안전합니다 (create table if not exists).

-- ════════ 로그인·수업 운영 ════════

create table if not exists ${schema}.profiles (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  sub           text not null unique,          -- 드리미 userinfo 고유 식별자
  email         text,
  name          text,
  cohort        text,
  portal_role   text,                          -- 포탈 원본 role
  is_admin      boolean not null default false,-- 기록용. 권한 판정에는 쓰지 않음
  last_login_at timestamptz
);

create table if not exists ${schema}.terms (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,                    -- 2026-1학기
  starts_on  date,
  ends_on    date,
  is_current boolean not null default false
);

create table if not exists ${schema}.classes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  term_id     uuid references ${schema}.terms(id) on delete set null,
  name        text not null,
  program     text,                            -- EEP / CEP
  teacher_sub text,
  level       text,                            -- A1.1 ~ C2.3
  schedule    text,
  syllabus    text,
  is_active   boolean not null default true
);

create table if not exists ${schema}.enrollments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  class_id     uuid not null references ${schema}.classes(id) on delete cascade,
  student_sub  text not null,
  student_name text,
  cohort       text,
  status       text not null default 'active',
  unique (class_id, student_sub)
);

-- ════════ 교육과정 ════════

create table if not exists ${schema}.units (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  level_code   text not null,                  -- A1.1 ~ C2.3
  order_index  integer not null default 0,     -- = 주차
  title        text not null,
  title_ko     text,
  theme        text,
  weeks        integer,
  overview     text,
  is_published boolean not null default false,
  created_by   text
);

create table if not exists ${schema}.can_do_statements (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  unit_id      uuid not null references ${schema}.units(id) on delete cascade,
  skill        text not null default 'speaking', -- listening/reading/speaking/writing
  statement_ko text not null,
  statement_en text,
  order_index  integer not null default 0
);

create table if not exists ${schema}.lexical_items (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  unit_id      uuid references ${schema}.units(id) on delete set null,
  headword     text not null,
  item_type    text not null default 'word',   -- word/collocation/phrasal_verb/idiom
  pos          text,
  cefr_level   text not null,
  meaning_ko   text not null,
  example_en   text,
  example_ko   text,
  audio_url    text,
  tags         text,
  is_published boolean not null default false,
  created_by   text
);

create table if not exists ${schema}.grammar_points (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  unit_id        uuid references ${schema}.units(id) on delete set null,
  title          text not null,
  cefr_level     text not null,
  category       text,
  can_do         text,
  explanation_md text,
  order_index    integer not null default 0,
  is_published   boolean not null default false,
  created_by     text
);

-- ════════ 학생 성취 ════════

create table if not exists ${schema}.student_can_do (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  can_do_id   uuid not null references ${schema}.can_do_statements(id) on delete cascade,
  class_id    uuid references ${schema}.classes(id) on delete set null,
  status      text not null default 'not_yet', -- achieved / partial / not_yet
  assessed_on date,
  assessed_by text,
  note        text,
  unique (student_sub, can_do_id)
);

-- ★ "영역별 프로필"의 실체. 학생 한 명이 기능마다 다른 레벨을 가집니다.
create table if not exists ${schema}.skill_profiles (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  skill       text not null,                   -- listening/reading/speaking/writing
  level_code  text not null,
  updated_at  timestamptz not null default now(),
  note        text,
  unique (student_sub, skill)
);

-- ════════ 자료·과제 ════════

create table if not exists ${schema}.materials (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  class_id      uuid not null references ${schema}.classes(id) on delete cascade,
  unit_id       uuid references ${schema}.units(id) on delete set null,
  title         text not null,
  material_type text not null default 'reading', -- reading/grammar/audio/slide/link
  week          integer,
  body          text,
  url           text,
  is_published  boolean not null default false,
  created_by    text
);

create table if not exists ${schema}.assignments (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  class_id        uuid not null references ${schema}.classes(id) on delete cascade,
  unit_id         uuid references ${schema}.units(id) on delete set null,
  title           text not null,
  assignment_type text not null default 'writing', -- writing/reading/speaking
  instructions    text,
  due_at          timestamptz,
  max_score       integer default 100,
  is_published    boolean not null default false,
  created_by      text
);

create table if not exists ${schema}.submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  assignment_id uuid not null references ${schema}.assignments(id) on delete cascade,
  student_sub   text not null,
  content       text,
  audio_url     text,
  submitted_at  timestamptz,
  feedback      text,
  score         numeric,
  graded_by     text,
  graded_at     timestamptz,
  unique (assignment_id, student_sub)
);

create table if not exists ${schema}.progress (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  class_id    uuid not null references ${schema}.classes(id) on delete cascade,
  student_sub text not null,
  record_type text not null,                   -- level_test / attendance / achievement
  recorded_on date,
  level       text,
  value       numeric,
  note        text,
  created_by  text
);

-- ════════ 조회 속도 ════════

create index if not exists units_level_idx         on ${schema}.units (level_code, order_index);
create index if not exists can_do_unit_idx         on ${schema}.can_do_statements (unit_id, order_index);
create index if not exists lexical_unit_idx        on ${schema}.lexical_items (unit_id);
create index if not exists grammar_unit_idx        on ${schema}.grammar_points (unit_id);
create index if not exists student_can_do_idx      on ${schema}.student_can_do (student_sub);
create index if not exists skill_profiles_idx      on ${schema}.skill_profiles (student_sub);
create index if not exists enrollments_student_idx on ${schema}.enrollments (student_sub);
create index if not exists enrollments_class_idx   on ${schema}.enrollments (class_id);
create index if not exists materials_class_idx     on ${schema}.materials (class_id);
create index if not exists assignments_class_idx   on ${schema}.assignments (class_id);
create index if not exists submissions_student_idx on ${schema}.submissions (student_sub);
create index if not exists progress_student_idx    on ${schema}.progress (student_sub, class_id);

-- ════════ 권한 ════════
-- 콘솔의 테이블 생성 기능을 쓰면 자동으로 부여됩니다. SQL 로 직접 만들 때만 필요합니다.

grant usage on schema ${schema} to anon, authenticated;
grant all on all tables in schema ${schema} to anon, authenticated;
grant all on all sequences in schema ${schema} to anon, authenticated;
`
}
