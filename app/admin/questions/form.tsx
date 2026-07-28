'use client'

import { useActionState, useMemo, useState } from 'react'
import Link from 'next/link'
import { CEFR_LEVELS, CEFR_BAND, QUESTION_TYPES, CHOICE_BASED_TYPES, type QuestionType } from '@/lib/cefr'
import type { Question, ActionResult } from '@/lib/types'
import type { TargetOption } from '@/lib/targets'
import { Field, ErrorNote } from '@/components/ui'
import { SubmitButton } from '@/components/submit-button'
import { saveQuestion, deleteQuestion } from './actions'

export default function QuestionForm({
  item,
  targets,
}: {
  item?: Question
  targets: { lexical: TargetOption[]; grammar: TargetOption[] }
}) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(saveQuestion, null)

  const [questionType, setQuestionType] = useState<QuestionType>(item?.question_type ?? 'mcq_meaning')
  const [targetType, setTargetType] = useState<'lexical' | 'grammar'>(item?.target_type ?? 'lexical')
  const [targetFilter, setTargetFilter] = useState('')

  const needsChoices = CHOICE_BASED_TYPES.includes(questionType)
  const autoGraded = QUESTION_TYPES.find((t) => t.value === questionType)?.autoGraded ?? true

  const options = useMemo(() => {
    const list = targetType === 'lexical' ? targets.lexical : targets.grammar
    const f = targetFilter.trim().toLowerCase()
    const filtered = f ? list.filter((o) => o.label.toLowerCase().includes(f)) : list
    return filtered.slice(0, 300)
  }, [targets, targetType, targetFilter])

  return (
    <>
      {state && !state.ok && <ErrorNote message={state.error} />}

      <form action={formAction} className="card space-y-5 p-6">
        {item && <input type="hidden" name="id" value={item.id} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="문항 유형" required>
            <select
              name="question_type"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="field-input"
            >
              {QUESTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                  {t.autoGraded ? '' : ' (자동 채점 불가)'}
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

        {!autoGraded && (
          <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
            영작 문항은 규칙 기반으로 채점할 수 없습니다. 여기 적는 정답은 <strong>모범 답안</strong>으로
            저장되고, 실제 채점은 이후 단계에서 붙일 LLM 채점 + 교사 확인으로 이뤄집니다.
          </div>
        )}

        <fieldset className="rounded-lg border border-slate-200 p-4">
          <legend className="px-1.5 text-sm font-medium text-slate-700">연결 대상</legend>
          <p className="mb-3 text-xs text-slate-500">
            어떤 단어 또는 문법 항목을 묻는 문항인지 연결합니다. 연결해 두면 간격 반복 복습이 그 항목의
            학습 상태를 따라갑니다. 비워 둬도 됩니다.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <select
              name="target_type"
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as 'lexical' | 'grammar')}
              className="field-input"
            >
              <option value="lexical">단어·관용어구</option>
              <option value="grammar">문법</option>
            </select>

            <input
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
              placeholder="목록 검색"
              className="field-input"
            />

            <select name="target_id" defaultValue={item?.target_id ?? ''} className="field-input">
              <option value="">연결 안 함</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  [{o.level}] {o.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <Field label="문제 지문" required>
          <textarea name="prompt" defaultValue={item?.prompt ?? ''} rows={3} required className="field-input" />
        </Field>

        {needsChoices && (
          <Field label="보기" required hint="한 줄에 하나씩 입력합니다. 정답은 아래에 그대로 한 번 더 적어 주세요.">
            <textarea
              name="choices"
              defaultValue={(item?.choices ?? []).join('\n')}
              rows={5}
              className="field-input"
            />
          </Field>
        )}

        <Field label={autoGraded ? '정답' : '모범 답안'} required>
          <input name="answer" defaultValue={item?.answer ?? ''} required className="field-input" />
        </Field>

        <Field label="해설">
          <textarea name="explanation" defaultValue={item?.explanation ?? ''} rows={3} className="field-input" />
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
          <Link href="/admin/questions" className="btn-secondary">
            목록
          </Link>
        </div>
      </form>

      {item && (
        <form action={deleteQuestion} className="mt-4">
          <input type="hidden" name="id" value={item.id} />
          <SubmitButton className="btn-danger" pendingLabel="삭제 중…" confirm="이 문항을 삭제할까요? 되돌릴 수 없습니다.">
            삭제
          </SubmitButton>
        </form>
      )}
    </>
  )
}
