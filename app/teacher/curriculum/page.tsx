import Link from 'next/link'
import { CEFR_BAND, SKILLS } from '@/lib/cefr'
import { seedFor } from '@/lib/seed/a1-1'
import { EEP_LEVELS, CEP_LEVELS, vocabDelta, type LevelSpec } from '@/lib/levels'
import {
  PROGRAMS,
  TERM_WEEKS,
  SESSIONS_PER_WEEK,
  SESSIONS_PER_TERM,
  UNITS_PER_LEVEL,
  WEEKS_PER_UNIT,
  SESSIONS_PER_UNIT,
} from '@/lib/lms'
import { LevelBadge, PageHeader, StatCard } from '@/components/ui'

export const metadata = { title: '커리큘럼' }

export default function CurriculumPage() {
  const eep = PROGRAMS.find((p) => p.value === 'EEP')!
  const cep = PROGRAMS.find((p) => p.value === 'CEP')!

  return (
    <>
      <PageHeader
        title="커리큘럼"
        description="CEFR 레벨 체계와 한 학기 운영 구조입니다."
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-4">
        <StatCard label="한 학기" value={`${TERM_WEEKS}주`} sub={`주 ${SESSIONS_PER_WEEK}회 · 총 ${SESSIONS_PER_TERM}차시`} />
        <StatCard label="레벨당 단원" value={`${UNITS_PER_LEVEL}개`} sub={`단원당 ${WEEKS_PER_UNIT}주 · ${SESSIONS_PER_UNIT}차시`} />
        <StatCard label="EEP 레벨" value={`${EEP_LEVELS.length}단계`} sub="A1.1 – B1.3 · 레벨별 수업" />
        <StatCard label="CEP 레벨" value={`${CEP_LEVELS.length}단계`} sub="B2.1 – C2.3 · 주제별 수업" />
      </div>

      <section className="card mb-8 p-5">
        <h2 className="text-sm font-semibold text-slate-900">한 학기 = 한 레벨</h2>
        <p className="mt-1 text-sm text-slate-600">
          {UNITS_PER_LEVEL}단원 × {WEEKS_PER_UNIT}주 = {UNITS_PER_LEVEL * WEEKS_PER_UNIT}주,
          여기에 중간 점검 1주와 기말 평가·발표 1주를 더해 {TERM_WEEKS}주입니다.
          차시로는 {UNITS_PER_LEVEL * SESSIONS_PER_UNIT}차시 + 8차시 = {SESSIONS_PER_TERM}차시로
          주 {SESSIONS_PER_WEEK}회에 맞습니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {Array.from({ length: UNITS_PER_LEVEL }, (_, i) => (
            <span
              key={i}
              className="rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800 ring-1 ring-inset ring-sky-600/20"
            >
              Unit {i + 1}
              <span className="ml-1 font-normal text-sky-600">
                {i * WEEKS_PER_UNIT + 1}–{(i + 1) * WEEKS_PER_UNIT}주
              </span>
            </span>
          ))}
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            중간 점검 13주
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            기말 평가 14주
          </span>
        </div>
      </section>

      <section className="card mb-8 p-5">
        <h2 className="text-sm font-semibold text-slate-900">승급은 기능별로 따로</h2>
        <p className="mt-1 text-sm text-slate-600">
          CEFR 은 듣기·읽기·말하기·쓰기의 레벨이 서로 다를 수 있음을 전제합니다. 읽기 B1.1 ·
          말하기 A2.3 인 학생이 정상이고, 성취기준도 이 네 축으로 태깅합니다. 어휘와 문법은 그
          자체가 목표가 아니라 네 기능을 떠받치는 수단이라 별도 축으로 두지 않습니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span key={s.value} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
              {s.label} <span className="text-slate-400">{s.en}</span>
            </span>
          ))}
        </div>
      </section>

      <ProgramSection
        title={`${eep.label} — ${eep.fullName}`}
        description="CEFR A1–B1. 레벨별로 수업이 열리고, 아래 단원 구조를 따릅니다."
        levels={EEP_LEVELS}
        showUnits
      />

      <div className="h-8" />

      <ProgramSection
        title={`${cep.label} — ${cep.fullName}`}
        description="CEFR B2–C2. 레벨이 아니라 주제로 수업이 열리므로 단원 구조를 쓰지 않습니다. 레벨 자체는 배치·승급 판정에 계속 쓰입니다."
        levels={CEP_LEVELS}
      />

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p className="font-medium text-slate-800">EEP → CEP 전환</p>
        <p className="mt-1">
          EEP 학생은 매 학기 시작 전 level-up 테스트에서 <strong>CEFR B2 이상</strong>으로 판정되면
          CEP 그룹 수업을 수강합니다. 졸업 전 전원이 CEP 도달을 목표로 합니다.
        </p>
      </div>
    </>
  )
}

function ProgramSection({
  title,
  description,
  levels,
  showUnits = false,
}: {
  title: string
  description: string
  levels: LevelSpec[]
  showUnits?: boolean
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
                <th className="w-24 px-4 py-2 font-medium text-slate-500">단계</th>
                <th className="px-4 py-2 font-medium text-slate-500">성취 기준 (can-do)</th>
                <th className="px-4 py-2 font-medium text-slate-500">문법 초점</th>
                <th className="px-4 py-2 font-medium text-slate-500">말하기 과제</th>
                <th className="w-28 px-4 py-2 text-right font-medium text-slate-500">누적 어휘</th>
                {showUnits && <th className="w-20 px-4 py-2 text-right font-medium text-slate-500">단원</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {levels.map((l) => (
                <tr key={l.code} className="align-top">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <LevelBadge level={l.band} />
                      <span className="font-mono text-xs font-semibold text-slate-900">.{l.step}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {l.labelKo} · {CEFR_BAND[l.band]}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{l.canDo}</td>
                  <td className="px-4 py-3">
                    <ul className="flex flex-wrap gap-1">
                      {l.grammar.map((g) => (
                        <li key={g} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
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
                  {showUnits && (
                    <td className="px-4 py-3 text-right">
                      {seedFor(l.code) ? (
                        <Link
                          href={`/teacher/curriculum/${l.code.replace('.', '-')}`}
                          className="text-xs font-medium text-sky-700 hover:underline"
                        >
                          {UNITS_PER_LEVEL}단원 보기
                        </Link>
                      ) : (
                        <span className="text-xs text-slate-300">미작성</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
