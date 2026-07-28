'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireEditor } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { TABLES, type ActionResult } from '@/lib/types'
import { bool, dbErrorMessage, level, optStr, str } from '@/lib/form'

export async function saveLexicalItem(
  _prev: ActionResult | null,
  fd: FormData,
): Promise<ActionResult> {
  const user = await requireEditor()

  const id = str(fd, 'id')
  const headword = str(fd, 'headword')
  const cefr = level(fd)
  const meaning = str(fd, 'meaning_ko')

  if (!headword) return { ok: false, error: '표제어를 입력해 주세요.' }
  if (!cefr) return { ok: false, error: 'CEFR 레벨을 선택해 주세요.' }
  if (!meaning) return { ok: false, error: '뜻을 입력해 주세요.' }

  const row = {
    headword,
    item_type: str(fd, 'item_type') || 'word',
    pos: optStr(fd, 'pos'),
    cefr_level: cefr,
    meaning_ko: meaning,
    example_en: optStr(fd, 'example_en'),
    example_ko: optStr(fd, 'example_ko'),
    audio_url: optStr(fd, 'audio_url'),
    tags: optStr(fd, 'tags'),
    is_published: bool(fd, 'is_published'),
  }

  if (id) {
    const { error } = await supabaseWrite.from(TABLES.lexicalItems).update(row).eq('id', id)
    if (error) return { ok: false, error: dbErrorMessage(error) }
    revalidatePath('/admin/vocab')
    redirect('/admin/vocab?saved=1')
  }

  const { error } = await supabaseWrite
    .from(TABLES.lexicalItems)
    .insert({ ...row, created_by: user.sub })
  if (error) return { ok: false, error: dbErrorMessage(error) }

  revalidatePath('/admin/vocab')
  // 연속 입력을 위해 등록 화면에 머무릅니다.
  redirect(`/admin/vocab/new?saved=${encodeURIComponent(headword)}`)
}

export async function deleteLexicalItem(fd: FormData): Promise<void> {
  await requireEditor()
  const id = str(fd, 'id')
  if (id) await supabaseWrite.from(TABLES.lexicalItems).delete().eq('id', id)
  revalidatePath('/admin/vocab')
  redirect('/admin/vocab?deleted=1')
}

export async function toggleLexicalPublish(fd: FormData): Promise<void> {
  await requireEditor()
  const id = str(fd, 'id')
  if (id) {
    await supabaseWrite
      .from(TABLES.lexicalItems)
      .update({ is_published: !bool(fd, 'current') })
      .eq('id', id)
  }
  revalidatePath('/admin/vocab')
}
