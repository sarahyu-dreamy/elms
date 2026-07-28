'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { supabase } from '@/lib/supabase'
import { fetchTableColumns, keepExistingColumns } from '@/lib/seed/columns'
import { rosterByName, type RosterGroup } from '@/lib/seed/roster'
import { bool, dbErrorMessage, optStr, str } from '@/lib/form'
import type { ActionResult } from '@/lib/types'

export interface ClassResult extends Record<string, unknown> {
  ok: boolean
  error?: string
  message?: string
  skipped?: string[]
}

/**
 * 명단을 반으로 만듭니다.
 *
 * 학생 sub 는 그 학생이 처음 로그인할 때 생기므로, 여기서는 이름만 넣습니다.
 * 로그인 시 이름으로 찾아 sub 를 채우는 방식입니다. (lib/auth 의 콜백 참고)
 */
async function createClassWithRoster(group: RosterGroup, level: string | null): Promise<ClassResult> {
  const user = await requireAdmin()

  const { data: existing, error: checkError } = await supabase
    .from('classes')
    .select('id')
    .eq('name', group.name)
    .limit(1)

  if (checkError) return { ok: false, error: dbErrorMessage(checkError) }
  if (existing && existing.length > 0) {
    return { ok: false, error: `"${group.name}" 반이 이미 있습니다.` }
  }

  const columns = await fetchTableColumns()
  const skipped = new Set<string>()
  const fit = (table: string, rows: Record<string, unknown>[]) => {
    const r = keepExistingColumns(rows, columns[table])
    r.dropped.forEach((d) => skipped.add(`${table}.${d}`))
    return r.rows
  }

  const { data: created, error: classError } = await supabaseWrite
    .from('classes')
    .insert(
      fit('classes', [
        {
          name: group.name,
          program: group.program,
          level,
          teacher_sub: user.sub,
          is_active: true,
        },
      ]),
    )
    .select('id')
    .single()

  if (classError) return { ok: false, error: dbErrorMessage(classError) }

  const classId = created?.id as string
  const rows = fit(
    'enrollments',
    group.students.map((name) => ({
      class_id: classId,
      student_name: name,
      student_sub: null,
      status: 'active',
    })),
  )

  const { error: enrollError } = await supabaseWrite.from('enrollments').insert(rows)
  if (enrollError) {
    return {
      ok: false,
      error: `${dbErrorMessage(enrollError)}\n반은 만들어졌습니다. 반을 지우고 다시 시도해 주세요.`,
    }
  }

  revalidatePath('/teacher/classes')
  revalidatePath('/teacher')

  return {
    ok: true,
    message: `"${group.name}" 개설 · 학생 ${group.students.length}명 배정${level ? ` · 레벨 ${level}` : ''}`,
    skipped: skipped.size > 0 ? [...skipped] : undefined,
  }
}

export async function createFromRoster(
  _prev: ClassResult | null,
  fd: FormData,
): Promise<ClassResult> {
  const name = str(fd, 'group')
  const group = rosterByName(name)
  if (!group) return { ok: false, error: '명단을 찾을 수 없습니다.' }

  const level = optStr(fd, 'level') ?? group.level
  return createClassWithRoster(group, level)
}

/** 반 하나를 직접 만듭니다 (명단 없이) */
export async function createClass(_prev: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const user = await requireAdmin()

  const name = str(fd, 'name')
  if (!name) return { ok: false, error: '반 이름을 입력해 주세요.' }

  const columns = await fetchTableColumns()
  const rows = keepExistingColumns(
    [
      {
        name,
        program: optStr(fd, 'program'),
        level: optStr(fd, 'level'),
        schedule: optStr(fd, 'schedule'),
        syllabus: optStr(fd, 'syllabus'),
        teacher_sub: user.sub,
        is_active: bool(fd, 'is_active'),
      },
    ],
    columns['classes'],
  ).rows

  const { error } = await supabaseWrite.from('classes').insert(rows)
  if (error) return { ok: false, error: dbErrorMessage(error) }

  revalidatePath('/teacher/classes')
  return { ok: true, message: `"${name}" 반을 만들었습니다.` }
}

export async function deleteClass(fd: FormData): Promise<void> {
  await requireAdmin()
  const id = str(fd, 'id')
  if (id) {
    await supabaseWrite.from('enrollments').delete().eq('class_id', id)
    await supabaseWrite.from('classes').delete().eq('id', id)
  }
  revalidatePath('/teacher/classes')
}
