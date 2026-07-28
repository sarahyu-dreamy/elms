'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireEditor } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { TABLES, type ActionResult } from '@/lib/types'
import { bool, dbErrorMessage, int, level, optStr, str } from '@/lib/form'

export async function saveSpeakingTask(
  _prev: ActionResult | null,
  fd: FormData,
): Promise<ActionResult> {
  const user = await requireEditor()

  const id = str(fd, 'id')
  const title = str(fd, 'title')
  const prompt = str(fd, 'prompt')
  const cefr = level(fd)

  if (!title) return { ok: false, error: '과제 이름을 입력해 주세요.' }
  if (!cefr) return { ok: false, error: 'CEFR 레벨을 선택해 주세요.' }
  if (!prompt) return { ok: false, error: '과제 지시문을 입력해 주세요.' }

  const prepSeconds = int(fd, 'prep_seconds', 30)
  const speakSeconds = int(fd, 'speak_seconds', 60)
  if (speakSeconds < 10) return { ok: false, error: '발화 시간은 최소 10초 이상이어야 합니다.' }

  const row = {
    title,
    cefr_level: cefr,
    task_type: str(fd, 'task_type') || 'self_intro',
    prompt,
    image_url: optStr(fd, 'image_url'),
    prep_seconds: Math.max(0, prepSeconds),
    speak_seconds: speakSeconds,
    is_published: bool(fd, 'is_published'),
  }

  if (id) {
    const { error } = await supabaseWrite.from(TABLES.speakingTasks).update(row).eq('id', id)
    if (error) return { ok: false, error: dbErrorMessage(error) }
    revalidatePath('/admin/speaking')
    redirect('/admin/speaking?saved=1')
  }

  const { error } = await supabaseWrite
    .from(TABLES.speakingTasks)
    .insert({ ...row, created_by: user.sub })
  if (error) return { ok: false, error: dbErrorMessage(error) }

  revalidatePath('/admin/speaking')
  redirect('/admin/speaking?saved=1')
}

export async function deleteSpeakingTask(fd: FormData): Promise<void> {
  await requireEditor()
  const id = str(fd, 'id')
  if (id) await supabaseWrite.from(TABLES.speakingTasks).delete().eq('id', id)
  revalidatePath('/admin/speaking')
  redirect('/admin/speaking?deleted=1')
}
