'use server'

import { revalidatePath } from 'next/cache'
import { requireEditor } from '@/lib/auth'
import { supabaseWrite } from '@/lib/db-write'
import { IMPORT_SPECS, parseImport, toDbRow, type ImportKind } from '@/lib/import-spec'
import { bool, dbErrorMessage, str } from '@/lib/form'

export interface ImportResult {
  ok: boolean
  error?: string
  inserted?: number
  skipped?: number
  /** 저장에 실패한 묶음의 사유 (행 번호 범위와 함께) */
  failures?: string[]
}

const CHUNK_SIZE = 200

export async function runImport(_prev: ImportResult | null, fd: FormData): Promise<ImportResult> {
  const user = await requireEditor()

  const kind = str(fd, 'kind') as ImportKind
  if (!(kind in IMPORT_SPECS)) return { ok: false, error: '가져올 대상이 올바르지 않습니다.' }

  const text = String(fd.get('text') ?? '')
  if (!text.trim()) return { ok: false, error: '붙여넣은 내용이 없습니다.' }

  const publish = bool(fd, 'publish')

  // 화면에서 이미 검증했더라도 서버에서 다시 파싱합니다.
  const outcome = parseImport(text, kind)

  if (outcome.missingHeaders.length > 0) {
    return {
      ok: false,
      error: `필수 열이 없습니다: ${outcome.missingHeaders.join(', ')}. 첫 줄에 열 이름이 있어야 합니다.`,
    }
  }

  const valid = outcome.rows.filter((r) => !r.error)
  const skipped = outcome.rows.length - valid.length

  if (valid.length === 0) {
    return { ok: false, error: '저장할 수 있는 행이 없습니다. 오류를 먼저 수정해 주세요.', skipped }
  }

  const table = IMPORT_SPECS[kind].table
  const failures: string[] = []
  let inserted = 0

  for (let i = 0; i < valid.length; i += CHUNK_SIZE) {
    const chunk = valid.slice(i, i + CHUNK_SIZE)
    const { error } = await supabaseWrite
      .from(table)
      .insert(chunk.map((row) => toDbRow(row, kind, publish, user.sub)))

    if (error) {
      failures.push(`${chunk[0].line}–${chunk[chunk.length - 1].line}행: ${dbErrorMessage(error)}`)
    } else {
      inserted += chunk.length
    }
  }

  revalidatePath(kind === 'vocab' ? '/admin/vocab' : '/admin/grammar')
  revalidatePath('/admin')

  return {
    ok: failures.length === 0,
    error: failures.length > 0 ? '일부 묶음을 저장하지 못했습니다.' : undefined,
    inserted,
    skipped,
    failures: failures.length > 0 ? failures : undefined,
  }
}
