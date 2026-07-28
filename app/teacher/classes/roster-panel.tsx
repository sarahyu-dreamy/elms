'use client'

import { useActionState } from 'react'
import { EEP_LEVELS } from '@/lib/levels'
import type { RosterGroup } from '@/lib/seed/roster'
import { SubmitButton } from '@/components/submit-button'
import { createFromRoster, type ClassResult } from './actions'

/**
 * 학교 편성 명단으로 반을 한 번에 만듭니다.
 * 이름 40여 개를 손으로 옮겨 적는 일을 없애는 것이 목적입니다.
 */
export function RosterPanel({
  groups,
  existingNames,
  tablesReady,
}: {
  groups: RosterGroup[]
  existingNames: string[]
  tablesReady: boolean
}) {
  const [state, action] = useActionState<ClassResult | null, FormData>(createFromRoster, null)

  return (
    <section className="card mb-6 overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">2026-1 편성 명단</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          학생 sub 는 그 학생이 처음 로그인할 때 생깁니다. 지금은 이름으로 넣어 두고, 로그인하면
          자동으로 연결됩니다.
        </p>
      </div>

      {state?.ok && state.message && (
        <p className="border-b border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
          {state.message}
        </p>
      )}
      {state && !state.ok && state.error && (
        <pre className="whitespace-pre-wrap border-b border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {state.error}
        </pre>
      )}
      {state?.skipped && (
        <p className="border-b border-amber-100 bg-amber-50 px-4 py-2.5 text-xs text-amber-900">
          테이블에 없어서 건너뛴 컬럼: {state.skipped.join(', ')}
        </p>
      )}

      <ul className="divide-y divide-slate-100">
        {groups.map((g) => {
          const done = existingNames.includes(g.name)
          return (
            <li key={g.name} className="px-4 py-3">
              <form action={action} className="flex flex-wrap items-center gap-3">
                <input type="hidden" name="group" value={g.name} />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">
                    {g.name}
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      {g.students.length}명
                    </span>
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                    {g.students.join(' · ')}
                  </p>
                </div>

                <select
                  name="level"
                  defaultValue={g.level ?? ''}
                  disabled={done}
                  className="field-input w-32 shrink-0 py-1.5 text-sm"
                >
                  <option value="">레벨 미정</option>
                  {EEP_LEVELS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.code}
                    </option>
                  ))}
                </select>

                {done ? (
                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    개설됨
                  </span>
                ) : (
                  <SubmitButton className="btn-secondary shrink-0 py-1.5 text-sm" pendingLabel="만드는 중…">
                    반 만들기
                  </SubmitButton>
                )}
              </form>
            </li>
          )
        })}
      </ul>

      {!tablesReady && (
        <p className="border-t border-amber-100 bg-amber-50 px-4 py-2.5 text-xs text-amber-900">
          <code>classes</code> · <code>enrollments</code> 테이블이 아직 없습니다. 설치·진단 화면에서
          먼저 만들어 주세요.
        </p>
      )}
    </section>
  )
}
