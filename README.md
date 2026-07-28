# 드리미 영어 LMS

드리미학교 영어 교과 학습관리 시스템. 수업(반)·학생·자료·과제·진도를 한곳에서 관리합니다.

- 배포: https://dreamy-english-lms-6.vercel.app
- 저장소: https://github.com/YuNamuk/english-lms-6 (main 에 push 하면 1~2분 뒤 자동 배포)

## 진행 상황

| 단계 | 내용 | 상태 |
|---|---|:--:|
| 1 | 드리미 OAuth 로그인 + 관리자 게이트 | ✅ |
| 2 | 반 개설 · 학생 배정 → 학생 홈 | 다음 |
| 3 | 자료 · 과제 · 제출 · 피드백 · 진도 | |
| 4 | 음성(STT/TTS) · AI 생성 기능 | |

별도로 CEFR 콘텐츠 은행(`/admin` — 단어·문법·문항·스피킹 과제 CMS)이 먼저 만들어져 있습니다.
반 운영이 자리잡으면 자료·과제와 연결할 예정입니다.

## 역할

| 역할 | 판정 기준 | 할 수 있는 일 |
|---|---|---|
| 관리자(교사) | `ADMIN_SUBS` 에 `sub` 가 있음 | 반 개설, 학생 배정, 자료·과제 등록, 성취 입력 |
| 학생 | 그 외 전부 | 자기 반의 자료·과제·진도 조회, 과제 제출 |

포탈의 `role: 'teacher'` 를 그대로 쓰지 않습니다. 포탈의 교사는 학교 전체 교직원을 뜻해서
이 앱의 반·성적을 만질 수 있는 범위와 다릅니다. 관리자는 명시적으로 등록된 `sub` 만입니다.

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # 값을 채웁니다
npm run dev
```

처음 실행하면 테이블이 없어 교사 대시보드에 안내가 뜹니다.
[docs/schema.md](docs/schema.md) 를 보고 드리미 개발자 콘솔에서 테이블을 먼저 만드세요.

### 환경변수

Vercel 에는 대부분 이미 주입돼 있습니다.

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | |
| `NEXT_PUBLIC_SUPABASE_SCHEMA` | `app_6` — 앱 전용 공간 |
| `DREAMI_ISSUER` | `https://stu.dreamyedu.net` |
| `DREAMI_CLIENT_ID` | |
| `DREAMI_CLIENT_SECRET` | **서버 전용.** 절대 `NEXT_PUBLIC_` 을 붙이지 않습니다 |
| `APP_BASE_URL` | OAuth redirect_uri 를 만드는 기준 주소 |
| `ADMIN_SUBS` | 관리자 `sub` 목록 (쉼표 구분) |

**`ADMIN_SUBS` 는 Vercel 환경변수에 직접 넣어야 합니다.** 자동 주입 대상이 아닙니다.
비어 있으면 아무도 교사 화면에 들어갈 수 없습니다.

처음 설정하는 순서:
1. 배포 후 한 번 로그인 → `/me` 로 떨어집니다
2. `profiles` 테이블에서 본인 `sub` 확인
3. Vercel 환경변수 `ADMIN_SUBS` 에 넣고 재배포
4. 다시 로그인하면 `/teacher` 로 들어갑니다

## 드리미 플랫폼 API (4단계에서 사용)

서버에서 `Bearer = 사용자 access_token` 으로 호출합니다. `getAccessToken()` 으로 꺼냅니다.

| 엔드포인트 | 용도 |
|---|---|
| `POST /api/platform/speech/token` | Azure 음성 토큰(~10분). 브라우저 speech-sdk 로 STT/TTS |
| `POST /api/platform/ai/text` | 예문·해설 생성 |
| `POST /api/platform/ai/image` | 삽화 생성 (과금 커서 필요할 때만) |

## 구조

```
app/
  auth/            드리미 OAuth (login → callback → logout)
  teacher/         관리자 전용 — 반·학기·대시보드
  me/              학생 — 내 반·자료·과제·진도
  admin/           CEFR 콘텐츠 은행 (단어·문법·문항·스피킹)
lib/
  supabase.ts      읽기 클라이언트 (app_6 스키마 고정)
  db-write.ts      ★ 모든 쓰기가 지나는 단일 통로
  auth.ts          세션·관리자 게이트·플랫폼 API 토큰
  lms.ts           수업 운영 도메인 상수
  cefr.ts          CEFR 레벨·트랙·스피킹 6축
docs/
  schema.md        테이블 정의 (콘솔에서 만들 때 보는 문서)
  security.md      ★ 보안 모델과 남아 있는 위험 — 읽어야 합니다
```

## 보안

공유 백엔드라 **DB 레벨 방어가 없습니다.** anon 키는 브라우저에 노출되고 테이블에 CRUD 권한이
자동 부여되므로, 앱 서버가 유일한 방어선입니다. 규칙은 두 가지입니다.

- 쓰기는 `supabaseWrite` 로만, 직전에 `requireAdmin()` 통과
- 학생 데이터 조회는 반드시 본인 `sub` 로 좁힌다

성적·제출물이 들어가면 코드로 막을 수 없는 위험이 생깁니다.
기능을 추가하기 전에 [docs/security.md](docs/security.md) 를 반드시 읽으세요.
