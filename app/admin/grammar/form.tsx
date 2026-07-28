'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { CEFR_LEVELS, CEFR_BAND, GRAMMAR_CATEGORIES } from '@/lib/cefr'
import type { GrammarPoint, ActionResult } from '@/lib/types'
import { Field, ErrorNote } from '@/components/ui'
import { SubmitButton } from '@/components/submit-button'
import { saveGrammarPoint, deleteGrammarPoint } from './actions'

export default function GrammarForm({ item }: { item?: GrammarPoint }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(saveGrammarPoint, null)

  return (
    <>
      {state && !state.ok && <ErrorNote message={state.error} />}

      <form action={formAction} className="card space-y-5 p-6">
        {item && <input type="hidden" name="id" value={item.id} />}

        <Field label="문법 항목" required hint="예: 현재완료 — 경험 용법, 가정법 과거완료">
          <input name="title" defaultValue={item?.title ?? ''} required autoFocus className="field-input" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
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

          <Field label="분류">
            <select name="category" defaultValue={item?.category ?? ''} className="field-input">
              <option value="">—</option>
              {GRAMMAR_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="커리큘럼 순서" hint="같은 레벨 안에서 가르치는 순서">
            <input
              name="order_index"
              type="number"
              defaultValue={item?.order_index ?? 0}
              className="field-input"
            />
          </Field>
        </div>

        <Field
          label="Can-do 기술"
          hint="CEFR 은 '무엇을 아는가'가 아니라 '무엇을 할 수 있는가'로 성취를 기술합니다. 학생이 이 항목을 익히면 할 수 있게 되는 일을 한 문장으로 적어 주세요."
        >
          <textarea
            name="can_do"
            defaultValue={item?.can_do ?? ''}
            rows={2}
            placeholder="예: 과거의 경험을 묻고 답할 수 있다."
            className="field-input"
          />
        </Field>

        <Field label="설명" hint="마크다운을 쓸 수 있습니다.">
          <textarea
            name="explanation_md"
            defaultValue={item?.explanation_md ?? ''}
            rows={10}
            className="field-input font-mono text-xs"
          />
        </Field>

        <label className="flex items-start gap-2.5">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={item?.is_published ?? false}
            className="mt-0.5 size-4 rounded border-slate-300"
          />
          <span className="text-sm">
            <span className="font-medium text-slate-800">발행</span>
            <span className="ml-2 text-slate-500">체크를 해제하면 초안으로 둡니다.</span>
          </span>
        </label>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <SubmitButton>{item ? '저장' : '등록'}</SubmitButton>
          <Link href="/admin/grammar" className="btn-secondary">
            목록
          </Link>
        </div>
      </form>

      {item && (
        <form action={deleteGrammarPoint} className="mt-4">
          <input type="hidden" name="id" value={item.id} />
          <SubmitButton
            className="btn-danger"
            pendingLabel="삭제 중…"
            confirm={`"${item.title}" 항목을 삭제할까요? 되돌릴 수 없습니다.`}
          >
            삭제
          </SubmitButton>
        </form>
      )}
    </>
  )
}
