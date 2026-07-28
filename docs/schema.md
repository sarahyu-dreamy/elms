# 테이블 정의

드리미 개발자 콘솔 → 백엔드 카드 → 테이블에서 만듭니다.
스키마는 `app_6` 이고, `id`(uuid)와 `created_at`(timestamptz)은 자동 생성되므로 직접 만들지 않습니다.

---

# 1부. 수업 운영 (지금 필요한 것)

## `profiles` — 로그인 사용자

드리미 OAuth 로 로그인할 때마다 `sub` 기준으로 갱신됩니다.

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `sub` | text | ✓ | | **unique**. 드리미 userinfo 의 고유 식별자 |
| `email` | text | | | |
| `name` | text | | | |
| `cohort` | text | | | 학년·기수 |
| `portal_role` | text | | | 포탈이 준 원본 role (student/teacher/admin) |
| `is_admin` | bool | | `false` | 이 LMS 의 관리자 여부. `ADMIN_SUBS` 로 결정 |
| `last_login_at` | timestamptz | | | |

`sub` 에 unique 제약을 꼭 걸어 주세요. 로그인할 때 `onConflict: 'sub'` 로 upsert 하므로,
제약이 없으면 로그인할 때마다 행이 쌓입니다.

> `is_admin` 은 기록용입니다. 실제 권한 판정은 항상 `ADMIN_SUBS` 환경변수로 합니다.
> DB 값을 믿으면, DB 를 쓸 수 있는 사람이 스스로를 관리자로 만들 수 있습니다.

## `terms` — 학기

| 컬럼 | 타입 | 필수 | 기본값 |
|---|---|:--:|---|
| `name` | text | ✓ | 예: 2026-1학기 |
| `starts_on` | date | | |
| `ends_on` | date | | |
| `is_current` | bool | | `false` |

## `classes` — 반

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `term_id` | uuid | | | `terms.id` |
| `name` | text | ✓ | | 반 이름 |
| `program` | text | | | `EEP` / `CEP`. **`group` 은 SQL 예약어라 이 이름을 씁니다** |
| `teacher_sub` | text | | | 담당 교사 `sub` |
| `level` | text | | | 반 레벨 |
| `schedule` | text | | | 수업 시간 |
| `syllabus` | text | | | 실러버스 |
| `is_active` | bool | | `true` | |

## `enrollments` — 반-학생 배정

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `class_id` | uuid | ✓ | | |
| `student_sub` | text | ✓ | | |
| `student_name` | text | | | 명단 표시용 캐시 |
| `cohort` | text | | | |
| `status` | text | | `active` | `active` / `dropped` |

**`(class_id, student_sub)` 에 unique 제약**을 걸어 주세요. 중복 배정을 막습니다.

## `materials` — 수업 자료

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `class_id` | uuid | ✓ | | |
| `title` | text | ✓ | | |
| `material_type` | text | ✓ | `reading` | `reading` / `grammar` / `audio` / `slide` / `link` |
| `week` | int4 | | | 주차 |
| `body` | text | | | 본문 |
| `url` | text | | | 외부 링크·파일 |
| `is_published` | bool | | `false` | 학생 노출 여부 |
| `created_by` | text | | | |

## `assignments` — 과제

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `class_id` | uuid | ✓ | | |
| `title` | text | ✓ | | |
| `assignment_type` | text | ✓ | `writing` | `writing` / `reading` / `speaking` |
| `instructions` | text | | | |
| `due_at` | timestamptz | | | 마감 |
| `max_score` | int4 | | `100` | |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

## `submissions` — 제출·피드백

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `assignment_id` | uuid | ✓ | | |
| `student_sub` | text | ✓ | | |
| `content` | text | | | 쓰기 답안 |
| `audio_url` | text | | | 말하기 녹음 |
| `submitted_at` | timestamptz | | | |
| `feedback` | text | | | 교사 피드백 |
| `score` | numeric | | | |
| `graded_by` | text | | | |
| `graded_at` | timestamptz | | | |

**`(assignment_id, student_sub)` 에 unique 제약**을 걸어 주세요. 재제출은 갱신으로 처리합니다.

## `progress` — 레벨테스트·출석·성취

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `class_id` | uuid | ✓ | | |
| `student_sub` | text | ✓ | | |
| `record_type` | text | ✓ | | `level_test` / `attendance` / `achievement` |
| `recorded_on` | date | | | |
| `level` | text | | | 레벨테스트 결과 |
| `value` | numeric | | | 점수·출석값 |
| `note` | text | | | |
| `created_by` | text | | | |

기록을 한 테이블로 합친 이유는 진도 화면이 세 가지를 시간순 한 줄로 보여주기 때문입니다.
분리하면 화면마다 세 번 조회하고 다시 합쳐야 합니다.

---

# 2부. CEFR 콘텐츠 은행 (`/admin`)

수업 운영과 별개로, 레벨별 단어·문법·문항을 쌓아 두는 영역입니다.
반 운영이 자리잡은 뒤에 자료·과제와 연결할 예정이라 지금 당장 만들 필요는 없습니다.

<details>
<summary>테이블 4개 펼쳐 보기</summary>

## `lexical_items` — 단어·관용어구

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `headword` | text | ✓ | | 표제어 |
| `item_type` | text | ✓ | `word` | `word` / `collocation` / `phrasal_verb` / `idiom` |
| `pos` | text | | | 품사 |
| `cefr_level` | text | ✓ | | `A1`~`C2` |
| `meaning_ko` | text | ✓ | | 뜻 |
| `example_en` | text | | | |
| `example_ko` | text | | | |
| `audio_url` | text | | | |
| `tags` | text | | | 쉼표 구분 |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

## `grammar_points` — 문법 항목

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `title` | text | ✓ | | |
| `cefr_level` | text | ✓ | | |
| `category` | text | | | `tense` / `modal` / `clause` / `article` / `voice` / `comparison` / `question` / `nonfinite` / `discourse` / `other` |
| `can_do` | text | | | **CEFR can-do 문장** |
| `explanation_md` | text | | | |
| `order_index` | int4 | | `0` | |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

## `questions` — 문항

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `target_type` | text | | | `lexical` / `grammar` |
| `target_id` | uuid | | | |
| `question_type` | text | ✓ | `mcq_meaning` | `mcq_meaning` / `cloze` / `match` / `dictation` / `write` |
| `cefr_level` | text | ✓ | | |
| `prompt` | text | ✓ | | |
| `choices` | jsonb | | | `["A","B","C","D"]` |
| `answer` | text | ✓ | | |
| `explanation` | text | | | |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

> **`answer` 주의** — anon 키로 읽을 수 있습니다. `docs/security.md` 참고.

## `speaking_tasks` — 스피킹 과제

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `title` | text | ✓ | | |
| `cefr_level` | text | ✓ | | |
| `task_type` | text | ✓ | `self_intro` | `self_intro` / `picture_desc` / `opinion` / `discussion` |
| `prompt` | text | ✓ | | |
| `image_url` | text | | | |
| `prep_seconds` | int4 | | `30` | |
| `speak_seconds` | int4 | | `60` | |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

</details>
