'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { CEFR_LEVELS, CEFR_BAND, LEXICAL_ITEM_TYPES, PARTS_OF_SPEECH } from '@/lib/cefr'
import type { LexicalItem, ActionResult } from '@/lib/types'
import { Field, ErrorNote } from '@/components/ui'
import { SubmitButton } from '@/components/submit-button'
import { saveLexicalItem, deleteLexicalItem } from './actions'

export default function VocabForm({ item }: { item?: LexicalItem }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(saveLexicalItem, null)

  return (
    <>
      {state && !state.ok && <ErrorNote message={state.error} />}

      <form action={formAction} className="card space-y-5 p-6">
        {item && <input type="hidden" name="id" value={item.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="표제어" required hint="예: take after, be about to, resilient">
            <input
              name="headword"
              defaultValue={item?.headword ?? ''}
              required
              autoFocus
              className="field-input"
            />
          </Field>

          <Field label="유형" required>
            <select name="item_type" defaultValue={item?.item_type ?? 'word'} className="field-input">
              {LEXICAL_ITEM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="CEFR 레벨" required>
            <select name="cefr_level" defaultValue={item?.cefr_level ?? ''} required className="field-input">
              <option value="">선택하세요</option>
              {CEFR_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l} — {CEFR_BAND[l]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="품사">
            <select name="pos" defaultValue={item?.pos ?? ''} className="field-input">
              <option value="">—</option>
              {PARTS_OF_SPEECH.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="뜻" required>
          <input name="meaning_ko" defaultValue={item?.meaning_ko ?? ''} required className="field-input" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="예문 (영어)">
            <textarea
              name="example_en"
              defaultValue={item?.example_en ?? ''}
              rows={2}
              className="field-input"
            />
          </Field>
          <Field label="예문 (한국어)">
            <textarea
              name="example_ko"
              defaultValue={item?.example_ko ?? ''}
              rows={2}
              className="field-input"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="발음 오디오 URL">
            <input
              name="audio_url"
              type="url"
              defaultValue={item?.audio_url ?? ''}
              placeholder="https://…"
              className="field-input"
            />
          </Field>
          <Field label="태그" hint="쉼표로 구분합니다. 예: 1학기, 3단원, 학교생활">
            <input name="tags" defaultValue={item?.tags ?? ''} className="field-input" />
          </Field>
        </div>

        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={item?.is_published ?? false}
            className="mt-0.5 size-4 rounded border-slate-300"
          />
          <span className="text-sm">
            <span className="font-medium text-slate-800">발행</span>
            <span className="ml-2 text-slate-500">체크를 해제하면 초안으로 두고 학생에게 노출되지 않습니다.</span>
          </span>
        </label>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <SubmitButton>{item ? '저장' : '등록'}</SubmitButton>
          <Link href="/admin/vocab" className="btn-secondary">
            목록
          </Link>
        </div>
      </form>

      {item && (
        <form action={deleteLexicalItem} className="mt-4">
          <input type="hidden" name="id" value={item.id} />
          <SubmitButton
            className="btn-danger"
            pendingLabel="삭제 중…"
            confirm={`"${item.headword}" 항목을 삭제할까요? 되돌릴 수 없습니다.`}
          >
            삭제
          </SubmitButton>
        </form>
      )}
    </>
  )
}
