import { supabase } from './supabase'

/**
 * 쓰기 전용 클라이언트 — 서버(Server Action / Route Handler)에서만 import 하세요.
 *
 * 플랫폼 구조상 알아둘 것:
 *   공유 Supabase 프로젝트 안의 app_6 스키마를 쓰고, 테이블 생성 시 anon 에 CRUD 권한이
 *   자동으로 부여됩니다. 콘솔에 테이블별 RLS 설정이 노출되지 않으므로
 *   **DB 레벨 방어는 존재하지 않습니다.** 보안은 전적으로 앱 서버에서 잡습니다.
 *
 * 그래서 규칙은 하나입니다:
 *   쓰기는 이 파일의 supabaseWrite 로만 하고, 호출 직전에 반드시 requireAdmin() 으로
 *   sub 을 검증한다. 클라이언트 컴포넌트에서는 절대 쓰지 않는다.
 *
 * 쓰기 경로를 이 한 파일로 좁혀 둔 이유는, 나중에 진짜 RLS 나 service_role 키가
 * 생겼을 때 여기만 바꾸면 전체가 따라오도록 하기 위해서입니다.
 *
 * 자세한 내용과 남아 있는 위험은 docs/security.md 를 보세요.
 */
export const supabaseWrite = supabase
