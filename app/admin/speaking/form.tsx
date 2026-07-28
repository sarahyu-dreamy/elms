'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { CEFR_LEVELS, CEFR_BAND, SPEAKING_TASK_TYPES, SPEAKING_RUBRIC_AXES } from '@/lib/cefr'
import type { SpeakingTask, ActionResult } from '@/lib/types'
import { Field, ErrorNote } from '@/components/ui'
import { SubmitButton } from '@/components/submit-button'
import { saveSpeakingTask, deleteSpeakingTask } from './actions'

export default function SpeakingForm({ item }: { item?: SpeakingTask }) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(saveSpeakingTask, null)

  return (
    <>
      {state && !state.ok && <ErrorNote message={state.error} />}

      <form action={formAction} className="card space-y-5 p-6">
        {item && <input type="hidden" name="id" value={item.id} />}

        <Field label="과제 이름" required>
          <input name="title" defaultValue={item?.title ?? ''} required autoFocus className="field-input" />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="과제 유형" required hint="공인 시험 형식을 차용했습니다.">
            <select name="task_type" defaultValue={item?.task_type ?? 'self_intro'} className="field-input">
              {SPEAKING_TASK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label} ({t.hint})
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
        </div>

        <Field label="과제 지시문" required hint="학생에게 그대로 보여집니다.">
          <textarea name="prompt" defaultValue={item?.prompt ?? ''} rows={4} required className="field-input" />
        </Field>

        <Field label="이미지 URL" hint="그림 묘사 과제에서 사용합니다.">
          <input
            name="image_url"
            type="url"
            defaultValue={item?.image_url ?? ''}
            placeholder="https://…"
            className="field-input"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="준비 시간 (초)">
            <input
              name="prep_seconds"
              type="number"
              min={0}
              defaultValue={item?.prep_seconds ?? 30}
              className="field-input"
            />
          </Field>
          <Field label="발화 시간 (초)" required>
            <input
              name="speak_seconds"
              type="number"
              min={10}
              defaultValue={item?.speak_seconds ?? 60}
              className="field-input"
            />
          </Field>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="font-medium text-slate-800">채점 기준</p>
          <p className="mt-1">
            제출된 녹음은 CEFR 스피킹 공식 6축으로 채점됩니다. AI 가 1차 채점하고 교사가 확인·보정하는
            구조이며, 채점 기능은 다음 단계에서 붙습니다.
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {SPEAKING_RUBRIC_AXES.map((axis) => (
              <li key={axis.value}>
                <span className="font-medium">{axis.label}</span>
                <span className="ml-1 text-slate-500">{axis.ko}</span>
              </li>
            ))}
          </ul>
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
            <span className="ml-2 text-slate-500">체크를 해제하면 초안으로 둡니다.</span>
          </span>
        </label>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
          <SubmitButton>{item ? '저장' : '등록'}</SubmitButton>
          <Link href="/admin/speaking" className="btn-secondary">
            목록
          </Link>
        </div>
      </form>

      {item && (
        <form action={deleteSpeakingTask} className="mt-4">
          <input type="hidden" name="id" value={item.id} />
          <SubmitButton
            className="btn-danger"
            pendingLabel="삭제 중…"
            confirm={`"${item.title}" 과제를 삭제할까요? 되돌릴 수 없습니다.`}
          >
            삭제
          </SubmitButton>
        </form>
      )}
    </>
  )
}
