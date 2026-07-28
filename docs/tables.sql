-- 드리미 영어 LMS — 테이블 생성
--
-- 드리미 개발자 콘솔의 백엔드 카드에 SQL 실행 기능이 있으면 이 파일을 그대로 붙여넣으세요.
-- 폼으로만 만들 수 있다면 docs/schema.md 의 표를 보고 컬럼을 하나씩 넣으면 됩니다.
--
-- 스키마는 app_6 입니다. 콘솔이 이미 app_6 안에서 실행한다면 접두사를 빼세요.
--
-- ── 순서 ──
-- 1부(profiles, terms, classes, enrollments)만 있으면 반 개설·학생 배정까지 됩니다.
-- 2부(materials, assignments, submissions, progress)는 자료·과제 단계에서 필요합니다.

-- ════════ 1부. 지금 필요한 것 ════════

create table if not exists app_6.profiles (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  sub         text not null unique,          -- 드리미 userinfo 고유 식별자
  email       text,
  name        text,
  cohort      text,
  portal_role text,                          -- 포탈 원본 role (student/teacher/admin)
  is_admin    boolean not null default false,-- 기록용. 권한 판정에는 쓰지 않음
  last_login_at timestamptz
);

create table if not exists app_6.terms (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,                  -- 2026-1학기
  starts_on  date,
  ends_on    date,
  is_current boolean not null default false
);

create table if not exists app_6.classes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  term_id     uuid references app_6.terms(id) on delete set null,
  name        text not null,
  program     text,                          -- EEP / CEP  ("group" 은 SQL 예약어라 못 씀)
  teacher_sub text,
  level       text,                          -- A1.1 ~ C2.3
  schedule    text,
  syllabus    text,
  is_active   boolean not null default true
);

create table if not exists app_6.enrollments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  class_id     uuid not null references app_6.classes(id) on delete cascade,
  student_sub  text not null,
  student_name text,                         -- 명단 표시용 캐시
  cohort       text,
  status       text not null default 'active', -- active / dropped
  unique (class_id, student_sub)             -- 중복 배정 방지
);

-- ════════ 1.5부. 교육과정 (docs/curriculum.md 참고) ════════

create table if not exists app_6.units (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  level_code  text not null,                 -- A1.1 ~ C2.3 (lib/levels.ts 의 값)
  order_index integer not null default 0,    -- 레벨 안에서의 순서
  title       text not null,                 -- Hello
  title_ko    text,                          -- 인사와 이름
  theme       text,
  weeks       integer,                       -- 권장 주차 수
  overview    text,
  is_published boolean not null default false,
  created_by  text
);

create table if not exists app_6.can_do_statements (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  unit_id      uuid not null references app_6.units(id) on delete cascade,
  skill        text not null default 'speaking', -- listening / reading / speaking / writing
  statement_ko text not null,                -- "가족 구성원을 세 명 이상 소개할 수 있다."
  statement_en text,
  order_index  integer not null default 0
);

-- 학생별 성취기준 달성 기록. 승급 판정의 근거가 됩니다.
create table if not exists app_6.student_can_do (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  can_do_id   uuid not null references app_6.can_do_statements(id) on delete cascade,
  class_id    uuid references app_6.classes(id) on delete set null,
  status      text not null default 'not_yet', -- achieved / partial / not_yet
  assessed_on date,
  assessed_by text,
  note        text,
  unique (student_sub, can_do_id)
);

-- ★ "영역별 프로필"의 실체. 학생 한 명이 기능마다 다른 레벨을 가집니다.
--   (읽기 B1.1 · 말하기 A2.3 인 학생이 정상)
create table if not exists app_6.skill_profiles (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  student_sub text not null,
  skill       text not null,                 -- listening / reading / speaking / writing
  level_code  text not null,                 -- A1.1 ~ C2.3
  updated_at  timestamptz not null default now(),
  note        text,                          -- 배치고사 결과 · 승급 사유
  unique (student_sub, skill)
);

-- ════════ 2부. 자료·과제 단계에서 ════════

create table if not exists app_6.materials (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  class_id      uuid not null references app_6.classes(id) on delete cascade,
  title         text not null,
  material_type text not null default 'reading', -- reading/grammar/audio/slide/link
  week          integer,
  body          text,
  url           text,
  is_published  boolean not null default false,
  created_by    text
);

create table if not exists app_6.assignments (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  class_id        uuid not null references app_6.classes(id) on delete cascade,
  title           text not null,
  assignment_type text not null default 'writing', -- writing/reading/speaking
  instructions    text,
  due_at          timestamptz,
  max_score       integer default 100,
  is_published    boolean not null default false,
  created_by      text
);

create table if not exists app_6.submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  assignment_id uuid not null references app_6.assignments(id) on delete cascade,
  student_sub   text not null,
  content       text,
  audio_url     text,
  submitted_at  timestamptz,
  feedback      text,
  score         numeric,
  graded_by     text,
  graded_at     timestamptz,
  unique (assignment_id, student_sub)        -- 재제출은 갱신으로 처리
);

create table if not exists app_6.progress (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  class_id    uuid not null references app_6.classes(id) on delete cascade,
  student_sub text not null,
  record_type text not null,                 -- level_test / attendance / achievement
  recorded_on date,
  level       text,
  value       numeric,
  note        text,
  created_by  text
);

-- ════════ 조회 속도 ════════

create index if not exists units_level_idx         on app_6.units (level_code, order_index);
create index if not exists can_do_unit_idx         on app_6.can_do_statements (unit_id, order_index);
create index if not exists student_can_do_idx      on app_6.student_can_do (student_sub);
create index if not exists skill_profiles_idx      on app_6.skill_profiles (student_sub);
create index if not exists enrollments_student_idx on app_6.enrollments (student_sub);
create index if not exists enrollments_class_idx   on app_6.enrollments (class_id);
create index if not exists materials_class_idx     on app_6.materials (class_id);
create index if not exists assignments_class_idx   on app_6.assignments (class_id);
create index if not exists submissions_student_idx on app_6.submissions (student_sub);
create index if not exists progress_student_idx    on app_6.progress (student_sub, class_id);

-- ════════ 권한 ════════
-- 플랫폼이 테이블 생성 시 anon 에 권한을 자동 부여합니다. 아래는 SQL 로 직접 만들 때만 필요합니다.

grant usage on schema app_6 to anon, authenticated;
grant all on all tables in schema app_6 to anon, authenticated;
grant all on all sequences in schema app_6 to anon, authenticated;
