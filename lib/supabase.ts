import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA!

/**
 * 읽기용 클라이언트.
 *
 * ★ 공유 백엔드입니다. schema 를 지정해야 우리 전용 공간(app_6)에만 접근합니다.
 *   이 클라이언트는 anon 키를 쓰므로 브라우저에서도 그대로 노출됩니다.
 *   쓰기는 절대 이걸로 하지 말고 lib/db-write.ts 를 쓰세요.
 */
export const supabase = createClient(url, anonKey, {
  db: { schema },
  auth: { persistSession: false },
})
