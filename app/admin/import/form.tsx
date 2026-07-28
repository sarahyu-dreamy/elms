'use client'

import { useActionState, useMemo, useState } from 'react'
import { IMPORT_SPECS, parseImport, type ImportKind } from '@/lib/import-spec'
import { ErrorNote } from '@/components/ui'
import { SubmitButton } from '@/components/submit-button'
import { runImport, type ImportResult } from './actions'

export default function ImportForm({ initialKind }: { initialKind: ImportKind }) {
  const [state, formAction] = useActionState<ImportResult | null, FormData>(runImport, null)
  const [kind, setKind] = useState<ImportKind>(initialKind)
  const [text, setText] = useState('')

  const spec = IMPORT_SPECS[kind]
  const outcome = useMemo(() => (text.trim() ? parseImport(text, kind) : null), [text, kind])
  const errorRows = outcome?.rows.filter((r) => r.error) ?? []

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="kind" value={kind} />

      {state && !state.ok && state.error && <ErrorNote message={state.error} />}

      {state?.failures && (
        <ul className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.failures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      {state?.ok && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <strong className="font-semibold">{state.inserted}개</strong> 항목을 등록했습니다.
          {state.skipped ? ` 오류가 있는 ${state.skipped}개 행은 건너뛰었습니다.` : ''}
        </div>
      )}

      <div className="card p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-700">가져올 대상</span>
          {(Object.keys(IMPORT_SPECS) as ImportKind[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                kind === k
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {IMPORT_SPECS[k].label}
            </button>
          ))}
        </div>

        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
          <p className="font-medium text-slate-800">첫 줄에 열 이름이 있어야 합니다.</p>
          <p className="mt-1 text-slate-600">
            필수 열: <code className="font-mono text-xs">{spec.required.join(', ')}</code>
          </p>
          <p className="mt-1 text-slate-600">
            선택 열:{' '}
            <code className="font-mono text-xs">
              {Object.keys(spec.aliases)
                .filter((k) => !spec.required.includes(k))
                .join(', ')}
            </code>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            열 이름은 한글로 써도 됩니다(표제어, 레벨, 뜻 …). 엑셀·구글 시트에서 그대로 복사해 붙여넣으세요.
          </p>
          <button
            type="button"
            onClick={() => setText(spec.template)}
            className="mt-2 text-xs font-medium text-sky-700 hover:underline"
          >
            예시 채워 넣기
          </button>
        </div>

        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="여기에 붙여넣으세요"
          className="field-input font-mono text-xs"
        />

        <label className="mt-4 flex items-start gap-2.5">
          <input type="checkbox" name="publish" className="mt-0.5 size-4 rounded border-slate-300" />
          <span className="text-sm">
            <span className="font-medium text-slate-800">바로 발행</span>
            <span className="ml-2 text-slate-500">
              체크하지 않으면 초안으로 저장됩니다. 검토 후 발행하는 쪽을 권합니다.
            </span>
          </span>
        </label>
      </div>

      {outcome && (
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">미리보기</h2>
            {outcome.missingHeaders.length > 0 ? (
              <span className="text-sm text-red-600">
                필수 열 없음: {outcome.missingHeaders.join(', ')}
              </span>
            ) : (
              <span className="text-sm text-slate-500">
                등록 가능 <strong className="text-slate-900">{outcome.validCount}</strong>
                {errorRows.length > 0 && (
                  <span className="text-red-600"> · 오류 {errorRows.length}</span>
                )}
              </span>
            )}
          </div>

          {errorRows.length > 0 && (
            <ul className="divide-y divide-red-100 border-b border-slate-100 bg-red-50/50 text-sm">
              {errorRows.slice(0, 20).map((r) => (
                <li key={r.line} className="px-4 py-2 text-red-700">
                  <span className="mr-2 font-mono text-xs text-red-500">{r.line}행</span>
                  {r.error}
                </li>
              ))}
              {errorRows.length > 20 && (
                <li className="px-4 py-2 text-xs text-red-500">
                  … 외 {errorRows.length - 20}개 행에 오류가 있습니다.
                </li>
              )}
            </ul>
          )}

          {outcome.rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                    <th className="px-3 py-2 font-medium text-slate-500">행</th>
                    {Object.keys(spec.aliases).map((col) => (
                      <th key={col} className="whitespace-nowrap px-3 py-2 font-medium text-slate-600">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {outcome.rows.slice(0, 30).map((r) => (
                    <tr key={r.line} className={r.error ? 'bg-red-50/40' : undefined}>
                      <td className="px-3 py-2 font-mono text-xs text-slate-400">{r.line}</td>
                      {Object.keys(spec.aliases).map((col) => (
                        <td key={col} className="max-w-[14rem] truncate px-3 py-2 text-slate-700">
                          {r.values[col] || <span className="text-slate-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {outcome.rows.length > 30 && (
                <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
                  전체 {outcome.rows.length}행 중 30행만 표시합니다. 저장은 전체가 대상입니다.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton pendingLabel="등록 중…">
          {outcome?.validCount ? `${outcome.validCount}개 등록` : '등록'}
        </SubmitButton>
        {errorRows.length > 0 && (
          <span className="text-sm text-slate-500">오류가 있는 행은 건너뜁니다.</span>
        )}
      </div>
    </form>
  )
}
