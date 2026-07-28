'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

/** notes 테이블에 한 줄 추가 — 서버 액션 데모. */
export async function addNote(formData: FormData) {
  const body = String(formData.get('body') ?? '').trim();
  if (!body || !supabase) return;
  await supabase.from('notes').insert({ body: body.slice(0, 200) });
  revalidatePath('/');
}
