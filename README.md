# 드리미 영어 LMS

CEFR 기반 레벨별 영어 교육과정 시스템. 드리미학교 전용.

- 배포: https://dreamy-english-lms-6.vercel.app
- 저장소: https://github.com/YuNamuk/english-lms-6 (main 에 push 하면 1~2분 뒤 자동 배포)

## 지금 어디까지 왔나

**마일스톤 1 — 스키마 + 관리자 CMS** ✅

- 드리미 계정 OAuth 로그인 (교사·관리자만 관리자 화면 접근)
- 단어·관용어구 / 문법 / 문항 / 스피킹 과제 등록·수정·삭제
- CEFR 레벨·유형·발행 상태 필터, 검색, 페이지네이션
- 엑셀 붙여넣기 일괄 등록 (검증 미리보기 후 저장)
- 레벨별 콘텐츠 분포 대시보드

**다음 (마일스톤 2)** — 학생 학습 화면, SM-2 간격 반복, 배치고사, 스피킹 채점.
착수 전에 [docs/security.md](docs/security.md) 의 3번 항목이 해결돼야 합니다.

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # 값을 채웁니다
npm run dev
```

처음 실행하면 테이블이 없어 관리자 화면에 안내가 뜹니다.
[docs/schema.md](docs/schema.md) 를 보고 드리미 개발자 콘솔에서 테이블 5개를 먼저 만드세요.

### 환경변수

Vercel 에는 이미 주입돼 있습니다. 로컬에서만 `.env.local` 에 채우면 됩니다.

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | |
| `NEXT_PUBLIC_SUPABASE_SCHEMA` | `app_6` — 앱 전용 공간 |
| `DREAMI_ISSUER` | `https://stu.dreamyedu.net` |
| `DREAMI_CLIENT_ID` | |
| `DREAMI_CLIENT_SECRET` | **서버 전용.** 절대 `NEXT_PUBLIC_` 을 붙이지 않습니다 |
| `APP_BASE_URL` | OAuth redirect_uri 를 만드는 기준 주소 |
| `ADMIN_SUBS` | 관리자로 지정할 `sub` 목록 (쉼표 구분) |

`ADMIN_SUBS` 는 **Vercel 환경변수에도 직접 넣어야 합니다.** 자동 주입 대상이 아닙니다.
값은 한 번 로그인한 뒤 `profiles` 테이블에서 본인 `sub` 를 확인해 넣으면 됩니다.

## 구조

```
app/
  auth/            드리미 OAuth (login → callback → logout)
  admin/           교사·관리자 CMS
    vocab/ grammar/ questions/ speaking/    각 폴더에 actions·form·목록·등록·수정
    import/        엑셀 붙여넣기 일괄 등록
lib/
  supabase.ts      읽기 클라이언트 (app_6 스키마 고정)
  db-write.ts      ★ 모든 쓰기가 지나는 단일 통로
  auth.ts          세션·역할·가드
  cefr.ts          CEFR 레벨/트랙/문항 유형/스피킹 6축 — 도메인 상수의 단일 출처
  import-spec.ts   일괄 등록 열 정의와 검증
docs/
  schema.md        테이블 정의 (콘솔에서 만들 때 보는 문서)
  security.md      ★ 보안 모델과 남아 있는 위험 — 읽어야 합니다
```

## 설계 근거

CEFR 세 가지 특징이 구조를 결정했습니다.

- **Can-do 기술 중심** → `grammar_points.can_do` 에 성취 기준을 행동 목표로 저장합니다.
- **영역별 프로필** → 학생은 단일 레벨이 아니라 트랙별(어휘·문법·스피킹) 레벨을 가집니다.
  마일스톤 2 의 `skill_profiles` 가 이 원칙을 구현하고, 승급도 트랙별로 일어납니다.
- **스피킹 6축 루브릭** → `lib/cefr.ts` 의 `SPEAKING_RUBRIC_AXES` 가 그대로 채점 축이 됩니다.

## 보안

공유 백엔드라 **DB 레벨 방어가 없습니다.** 앱 서버가 유일한 방어선이고,
정답 노출처럼 코드로 막을 수 없는 위험이 남아 있습니다.
기능을 추가하기 전에 [docs/security.md](docs/security.md) 를 반드시 읽으세요.
