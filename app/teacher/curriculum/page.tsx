import { CEFR_BAND } from '@/lib/cefr'
import { levelsByBand, vocabDelta, LEVELS } from '@/lib/levels'
import { LevelBadge, PageHeader } from '@/components/ui'

export const metadata = { title: '커리큘럼' }

export default function CurriculumPage() {
  const bands = levelsByBand()
  const total = LEVELS[LEVELS.length - 1].vocabTarget

  return (
    <>
      <PageHeader
        title="커리큘럼 아웃라인"
        description={`CEFR 6단계를 상·중·하로 나눈 18단계. 최종 누적 어휘 ${total.toLocaleString()}개.`}
      />

      <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
        <p className="font-semibold">승급은 트랙별로 따로 일어납니다.</p>
        <p className="mt-1">
          어휘는 B1.2인데 스피킹은 A2.3인 학생이 정상입니다. CEFR 은 영역마다 레벨이 다를 수 있음을
          전제하는 체계라, 하나의 레벨로 묶으면 오히려 기준에서 벗어납니다.
        </p>
      </div>

      <div className="space-y-6">
        {bands.map(({ band, levels }) => (
          <section key={band} className="card overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3">
              <LevelBadge level={band} />
              <span className="text-sm font-medium text-slate-700">{CEFR_BAND[band]}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="w-20 px-4 py-2 font-medium text-slate-500">단계</th>
                    <th className="px-4 py-2 font-medium text-slate-500">성취 기준 (can-do)</th>
                    <th className="px-4 py-2 font-medium text-slate-500">문법 초점</th>
                    <th className="px-4 py-2 font-medium text-slate-500">스피킹 과제</th>
                    <th className="w-28 px-4 py-2 text-right font-medium text-slate-500">누적 어휘</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {levels.map((l) => (
                    <tr key={l.code} className="align-top">
                      <td className="px-4 py-3">
                        <p className="font-mono font-semibold text-slate-900">{l.code}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{l.labelKo}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{l.canDo}</td>
                      <td className="px-4 py-3">
                        <ul className="flex flex-wrap gap-1">
                          {l.grammar.map((g) => (
                            <li
                              key={g}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600"
                            >
                              {g}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{l.speaking}</td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-medium tabular-nums text-slate-900">
                          {l.vocabTarget.toLocaleString()}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">+{vocabDelta(l.code)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        누적 어휘 목표는 Oxford 3000/5000 · English Vocabulary Profile 등 공개 자료의 통상 범위에
        맞춘 값입니다. 운영하면서 학생 수준에 맞게 조정할 수 있습니다.
      </p>
    </>
  )
}
