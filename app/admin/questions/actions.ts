'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { TABLES, type ActionResult } from '@/lib/types'
import { CHOICE_BASED_TYPES, type QuestionType } from '@/lib/cefr'
import { bool, dbErrorMessage, level, lines, optStr, str } from '@/lib/form'

export async function saveQuestion(
  _prev: ActionResult | null,
  fd: FormData,
): Promise<ActionResult> {
  const user = await requireAdmin()

  const id = str(fd, 'id')
  const prompt = str(fd, 'prompt')
  const answer = str(fd, 'answer')
  const cefr = level(fd)
  const questionType = (str(fd, 'question_type') || 'mcq_meaning') as QuestionType
  const choices = lines(fd, 'choices')

  if (!prompt) return { ok: false, error: '문제 지문을 입력해 주세요.' }
  if (!cefr) return { ok: false, error: 'CEFR 레벨을 선택해 주세요.' }
  if (!answer) return { ok: false, error: '정답을 입력해 주세요.' }

  if (CHOICE_BASED_TYPES.includes(questionType)) {
    if (choices.length < 2) {
      return { ok: false, error: '보기를 두 개 이상 입력해 주세요. (한 줄에 하나씩)' }
    }
    if (!choices.includes(answer)) {
      return { ok: false, error: '정답이 보기 목록에 없습니다. 보기 중 하나와 정확히 일치해야 합니다.' }
    }
  }

  const targetId = optStr(fd, 'target_id')
  const row = {
    target_type: targetId ? (str(fd, 'target_type') || null) : null,
    target_id: targetId,
    question_type: questionType,
    cefr_level: cefr,
    prompt,
    choices: CHOICE_BASED_TYPES.includes(questionType) ? choices : null,
    answer,
    explanation: optStr(fd, 'explanation'),
    is_published: bool(fd, 'is_published'),
  }

  if (id) {
    const { error } = await supabaseWrite.from(TABLES.questions).update(row).eq('id', id)
    if (error) return { ok: false, error: dbErrorMessage(error) }
    revalidatePath('/admin/questions')
    redirect('/admin/questions?saved=1')
  }

  const { error } = await supabaseWrite
    .from(TABLES.questions)
    .insert({ ...row, created_by: user.sub })
  if (error) return { ok: false, error: dbErrorMessage(error) }

  revalidatePath('/admin/questions')
  redirect('/admin/questions/new?saved=1')
}

export async function deleteQuestion(fd: FormData): Promise<void> {
  await requireAdmin()
  const id = str(fd, 'id')
  if (id) await supabaseWrite.from(TABLES.questions).delete().eq('id', id)
  revalidatePath('/admin/questions')
  redirect('/admin/questions?deleted=1')
}
