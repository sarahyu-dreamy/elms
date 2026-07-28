'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { TABLES, type ActionResult } from '@/lib/types'
import { bool, dbErrorMessage, int, level, optStr, str } from '@/lib/form'

export async function saveGrammarPoint(
  _prev: ActionResult | null,
  fd: FormData,
): Promise<ActionResult> {
  const user = await requireAdmin()

  const id = str(fd, 'id')
  const title = str(fd, 'title')
  const cefr = level(fd)

  if (!title) return { ok: false, error: '문법 항목 이름을 입력해 주세요.' }
  if (!cefr) return { ok: false, error: 'CEFR 레벨을 선택해 주세요.' }

  const row = {
    title,
    cefr_level: cefr,
    category: optStr(fd, 'category'),
    can_do: optStr(fd, 'can_do'),
    explanation_md: optStr(fd, 'explanation_md'),
    order_index: int(fd, 'order_index', 0),
    is_published: bool(fd, 'is_published'),
  }

  if (id) {
    const { error } = await supabaseWrite.from(TABLES.grammarPoints).update(row).eq('id', id)
    if (error) return { ok: false, error: dbErrorMessage(error) }
    revalidatePath('/admin/grammar')
    redirect('/admin/grammar?saved=1')
  }

  const { error } = await supabaseWrite
    .from(TABLES.grammarPoints)
    .insert({ ...row, created_by: user.sub })
  if (error) return { ok: false, error: dbErrorMessage(error) }

  revalidatePath('/admin/grammar')
  redirect(`/admin/grammar/new?saved=${encodeURIComponent(title)}`)
}

export async function deleteGrammarPoint(fd: FormData): Promise<void> {
  await requireAdmin()
  const id = str(fd, 'id')
  if (id) await supabaseWrite.from(TABLES.grammarPoints).delete().eq('id', id)
  revalidatePath('/admin/grammar')
  redirect('/admin/grammar?deleted=1')
}
