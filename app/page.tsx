import { getUser } from '@/lib/session';
import { supabase, supabaseReady } from '@/lib/supabase';
import { addNote } from './actions';

export const dynamic = 'force-dynamic';

interface Note {
  id: number;
  body: string;
  created_at: string;
}

export default async function Home() {
  const user = await getUser();

  // Supabase 데모 — `notes` 테이블(컬럼: body 텍스트)이 있으면 목록을 보여준다.
  let notes: Note[] | null = null;
  let notesError: string | null = null;
  if (supabaseReady && supabase) {
    const { data, error } = await supabase
      .from('notes')
      .select('id, body, created_at')
      .order('id', { ascending: false })
      .limit(20);
    if (error) notesError = error.message;
    else notes = data as Note[];
  }

  return (
    <main>
      <h1>내 드리미 앱</h1>
      <p className="muted">이 페이지를 마음대로 바꾸면서 시작하세요 — app/page.tsx</p>

      <section className="card">
        <h2 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>드리미로 로그인</h2>
        {user ? (
          <>
            <p style={{ margin: '0 0 12px' }}>
              <strong>{user.name ?? user.email}</strong> 님, 안녕하세요!
              {user.role && <span className="muted"> ({user.role}{user.cohort ? ` · ${user.cohort}` : ''})</span>}
            </p>
            <form action="/api/auth/logout" method="post">
              <button className="btn secondary" type="submit">로그아웃</button>
            </form>
          </>
        ) : (
          <>
            <p className="muted" style={{ margin: '0 0 12px' }}>아직 로그인하지 않았어요.</p>
            <a className="btn" href="/api/auth/login">드리미로 로그인</a>
          </>
        )}
      </section>

      <section className="card">
        <h2 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>내 데이터베이스 데모 — notes</h2>
        {!supabaseReady && (
          <p className="muted">
            Supabase 키가 아직 없어요. 로컬이면 .env.example 을 .env.local 로 복사해 백엔드 카드 값을 채우세요.
            (배포에는 포털이 자동 주입합니다.)
          </p>
        )}
        {supabaseReady && notesError && (
          <p className="muted">
            notes 테이블을 읽지 못했어요: {notesError}
            <br />
            포털 백엔드 카드 → 테이블에서 <code>notes</code> 테이블(컬럼 <code>body</code> 텍스트)을 만들면 동작합니다.
          </p>
        )}
        {supabaseReady && !notesError && (
          <>
            <form action={addNote} style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="body" placeholder="메모를 남겨보세요" required maxLength={200} />
              <button className="btn" type="submit">추가</button>
            </form>
            <ul className="notes">
              {(notes ?? []).map((n) => (
                <li key={n.id}>{n.body}</li>
              ))}
              {(notes ?? []).length === 0 && <li className="muted">아직 메모가 없어요.</li>}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
