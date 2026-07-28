# 테이블 정의

드리미 개발자 콘솔 → 백엔드 카드 → 테이블에서 아래 5개를 만듭니다.
스키마는 `app_6` 이고, `id`(uuid)와 `created_at`(timestamptz)은 자동 생성되므로 직접 만들지 않습니다.

> 마일스톤 1(콘텐츠 CMS)에 필요한 것은 이 5개가 전부입니다.
> 학습 기록·성적 테이블은 마일스톤 2에서 추가합니다. 문서 맨 아래를 보세요.

---

## 1. `profiles` — 로그인 사용자

드리미 OAuth 로 로그인할 때마다 `sub` 기준으로 갱신됩니다.

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `sub` | text | ✓ | | **unique**. 드리미 userinfo 의 고유 식별자. 이메일이 바뀌어도 유지됩니다 |
| `email` | text | | | |
| `name` | text | | | |
| `role` | text | | `student` | `admin` / `teacher` / `student` |
| `cohort` | text | | | 학년·기수 |
| `last_login_at` | timestamptz | | | |

`sub` 에 unique 제약을 꼭 걸어 주세요. 로그인할 때 `onConflict: 'sub'` 로 upsert 하므로,
제약이 없으면 로그인할 때마다 행이 쌓입니다.

---

## 2. `lexical_items` — 단어·관용어구

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `headword` | text | ✓ | | 표제어 |
| `item_type` | text | ✓ | `word` | `word` / `collocation` / `phrasal_verb` / `idiom` |
| `pos` | text | | | 품사 |
| `cefr_level` | text | ✓ | | `A1`~`C2` |
| `meaning_ko` | text | ✓ | | 뜻 |
| `example_en` | text | | | 예문 |
| `example_ko` | text | | | 예문 해석 |
| `audio_url` | text | | | 발음 오디오 |
| `tags` | text | | | 쉼표 구분 (단원·주제) |
| `is_published` | bool | | `false` | 초안/발행 |
| `created_by` | text | | | `profiles.sub` |

---

## 3. `grammar_points` — 문법 항목

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `title` | text | ✓ | | 예: 현재완료 — 경험 용법 |
| `cefr_level` | text | ✓ | | |
| `category` | text | | | `tense` / `modal` / `clause` / `article` / `voice` / `comparison` / `question` / `nonfinite` / `discourse` / `other` |
| `can_do` | text | | | **CEFR can-do 문장.** "무엇을 할 수 있는가"로 쓴 성취 기준 |
| `explanation_md` | text | | | 설명(마크다운) |
| `order_index` | int4 | | `0` | 같은 레벨 안에서의 교수 순서 |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

---

## 4. `questions` — 문항

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `target_type` | text | | | `lexical` / `grammar` — 아래 `target_id` 가 어느 테이블을 가리키는지 |
| `target_id` | uuid | | | `lexical_items.id` 또는 `grammar_points.id` |
| `question_type` | text | ✓ | `mcq_meaning` | `mcq_meaning` / `cloze` / `match` / `dictation` / `write` |
| `cefr_level` | text | ✓ | | |
| `prompt` | text | ✓ | | 문제 지문 |
| `choices` | jsonb | | | 객관식 보기 배열. 예: `["A","B","C","D"]` |
| `answer` | text | ✓ | | 정답 (영작 문항은 모범 답안) |
| `explanation` | text | | | 해설 |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

`target_type` + `target_id` 는 두 테이블 중 하나를 가리키는 구조라 외래키를 걸 수 없습니다.
연결이 끊긴 문항이 생길 수 있으니, 단어를 지울 때는 붙은 문항을 먼저 확인하세요.

> **`answer` 컬럼 주의** — anon 키로 읽을 수 있는 위치에 정답이 있습니다. `docs/security.md` 참고.

---

## 5. `speaking_tasks` — 스피킹 과제

| 컬럼 | 타입 | 필수 | 기본값 | 설명 |
|---|---|:--:|---|---|
| `title` | text | ✓ | | |
| `cefr_level` | text | ✓ | | |
| `task_type` | text | ✓ | `self_intro` | `self_intro`(A1–A2) / `picture_desc`(A2–B1) / `opinion`(B1–B2) / `discussion`(C1) |
| `prompt` | text | ✓ | | 과제 지시문 |
| `image_url` | text | | | 그림 묘사용 |
| `prep_seconds` | int4 | | `30` | 준비 시간 |
| `speak_seconds` | int4 | | `60` | 발화 시간 |
| `is_published` | bool | | `false` | |
| `created_by` | text | | | |

---

## 마일스톤 2 이후 (아직 만들지 마세요)

학생 데이터가 들어가는 테이블입니다. `docs/security.md` 의 문제가 정리된 뒤에 만듭니다.

| 테이블 | 역할 |
|---|---|
| `skill_profiles` | 학생 × 트랙(어휘·문법·스피킹) → 현재 CEFR 레벨. **영역별 프로필의 핵심** |
| `review_states` | 학생 × 항목 → SM-2 간격 반복 상태 (ease, interval, due_at) |
| `attempts` | 문항 응답 기록 (정오답, 소요 시간) |
| `speaking_submissions` | 오디오 URL, 전사, 발음 점수, CEFR 6축 점수, **AI 점수와 교사 보정값을 나란히** |
| `level_changes` | 승급 이력 — 언제 어느 트랙이 왜 올라갔는지 |

`speaking_submissions` 에 AI 점수와 교사 보정값을 함께 두는 것은 제안서의 운영 원칙
("AI 1차 채점 + 교사 확인, 도입 초기에 교사 채점과 비교해 일관성 검증") 때문입니다.
나중에 컬럼을 덧붙이면 검증 이전 데이터가 비어 버리므로 처음부터 같이 만듭니다.
