'use client'

import { useActionState, useState } from 'react'
import { TABLE_SPECS, GROUP_LABELS, type TableSpec } from '@/lib/seed/tables'
import { SubmitButton } from '@/components/submit-button'
import { CopyText } from '@/components/copy-text'
import { seedA11, clearA11, type SeedResult } from './actions'

/**
 * 설치 절차.
 *
 * 콘솔에 SQL 실행 기능이 없어서 테이블은 폼으로 만들어야 합니다.
 * 그래서 컬럼을 하나씩 옮겨 적기 좋은 형태로 보여주고,
 * 데이터 적재는 앱이 대신 합니다 (수백 건을 손으로 넣을 수는 없으니까요).
 */
export function Setup({
  missing,
  seeded,
}: {
  missing: string[]
  seeded: boolean
}) {
  const [seedState, seedAction] = useActionState<SeedResult | null, FormData>(seedA11, null)
  const [clearState, clearAction] = useActionState<SeedResult | null, FormData>(clearA11, null)
  const [openTable, setOpenTable] = useState<string | null>(null)

  const groups = (['core', 'curriculum', 'classwork', 'progress'] as const).map((g) => ({
    key: g,
    label: GROUP_LABELS[g],
    tables: TABLE_SPECS.filter((t) => t.group === g),
  }))

  return (
    <section className="card mb-8 overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">설치</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          콘솔에 SQL 실행 기능이 없으므로, 테이블은 콘솔 폼으로 만들고 데이터는 여기서 넣습니다.
        </p>
      </div>

      {/* 1단계 — 테이블 만들기 */}
      <div className="border-b border-slate-100 px-4 py-4">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            1
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">콘솔에서 테이블 만들기</p>
            <p className="text-xs text-slate-500">
              드리미 개발자 콘솔 → 백엔드 카드 → 테이블. <code>id</code> 와{' '}
              <code>created_at</code> 은 자동 생성되니 넣지 마세요.
            </p>
          </div>
        </div>

        {missing.length === 0 ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            필요한 테이블이 모두 있습니다.
          </p>
        ) : (
          <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            아직 없는 테이블 {missing.length}개: <code className="text-xs">{missing.join(', ')}</code>
          </p>
        )}

        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.key}>
              <p className="mb-1.5 text-xs font-semibold text-slate-500">{g.label}</p>
              <ul className="space-y-1">
                {g.tables.map((t) => (
                  <TableRow
                    key={t.name}
                    spec={t}
                    missing={missing.includes(t.name)}
                    open={openTable === t.name}
                    onToggle={() => setOpenTable(openTable === t.name ? null : t.name)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 2단계 — 데이터 적재 */}
      <div className="px-4 py-4">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            2
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">A1.1 교육과정 넣기</p>
            <p className="text-xs text-slate-500">
              단원 14 · 성취기준 112 · 문법 30 · 어휘 200 · 지문 14. 버튼 한 번이면 됩니다.
            </p>
          </div>
        </div>

        {seedState?.ok && seedState.counts && (
          <p className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            넣었습니다 — 단원 {seedState.counts.units} · 성취기준 {seedState.counts.canDo} · 문법{' '}
            {seedState.counts.grammar} · 어휘 {seedState.counts.lexical} · 지문{' '}
            {seedState.counts.materials}
          </p>
        )}
        {seedState && !seedState.ok && seedState.error && (
          <pre className="mb-3 whitespace-pre-wrap rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {seedState.error}
          </pre>
        )}
        {clearState?.ok && (
          <p className="mb-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            A1.1 데이터를 지웠습니다. 다시 넣을 수 있습니다.
          </p>
        )}
        {clearState && !clearState.ok && clearState.error && (
          <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {clearState.error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <form action={seedAction}>
            <SubmitButton pendingLabel="넣는 중…">
              {seeded ? 'A1.1 다시 넣기' : 'A1.1 넣기'}
            </SubmitButton>
          </form>
          {seeded && (
            <form action={clearAction}>
              <SubmitButton
                className="btn-danger"
                pendingLabel="지우는 중…"
                confirm="A1.1 단원·성취기준·어휘·문법·지문을 모두 지웁니다. 계속할까요?"
              >
                A1.1 지우기
              </SubmitButton>
            </form>
          )}
          {missing.length > 0 && (
            <span className="text-xs text-amber-700">테이블을 먼저 만들어야 합니다.</span>
          )}
        </div>
      </div>
    </section>
  )
}

function TableRow({
  spec,
  missing,
  open,
  onToggle,
}: {
  spec: TableSpec
  missing: boolean
  open: boolean
  onToggle: () => void
}) {
  // 콘솔 폼에 옮겨 적기 좋은 한 줄 요약
  const summary = spec.columns
    .map((c) => `${c.name} ${c.type}${c.required ? ' 필수' : ''}${c.default ? ` 기본값=${c.default}` : ''}${c.unique ? ' unique' : ''}`)
    .join('\n')

  return (
    <li className="rounded-lg border border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left"
      >
        <span className="flex min-w-0 items-center gap-2">
          <code className="font-mono text-xs font-medium text-slate-900">{spec.name}</code>
          <span className="truncate text-xs text-slate-500">{spec.label}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {missing ? (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700">
              없음
            </span>
          ) : (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
              있음
            </span>
          )}
          <span className="text-xs text-slate-400">{open ? '접기' : `컬럼 ${spec.columns.length}`}</span>
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-3 py-3">
          <p className="mb-2 text-xs text-slate-500">{spec.neededFor}에 필요합니다.</p>
          {spec.note && (
            <p className="mb-2 rounded border border-amber-200 bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
              {spec.note}
            </p>
          )}
          {spec.compositeUnique && (
            <p className="mb-2 text-xs text-slate-600">
              복합 unique: <code className="text-xs">{spec.compositeUnique.join(' + ')}</code>
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="py-1 pr-3 font-medium">컬럼</th>
                  <th className="py-1 pr-3 font-medium">타입</th>
                  <th className="py-1 pr-3 font-medium">필수</th>
                  <th className="py-1 pr-3 font-medium">기본값</th>
                  <th className="py-1 font-medium">설명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {spec.columns.map((c) => (
                  <tr key={c.name}>
                    <td className="py-1 pr-3 font-mono font-medium text-slate-800">{c.name}</td>
                    <td className="py-1 pr-3 font-mono text-slate-600">{c.type}</td>
                    <td className="py-1 pr-3 text-slate-600">{c.required ? '✓' : ''}</td>
                    <td className="py-1 pr-3 font-mono text-slate-600">{c.default ?? ''}</td>
                    <td className="py-1 text-slate-500">
                      {c.unique ? 'unique. ' : ''}
                      {c.note ?? ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <CopyText value={summary} label="컬럼 목록" />
          </div>
        </div>
      )}
    </li>
  )
}
