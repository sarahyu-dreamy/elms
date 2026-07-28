import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SKILLS, type Skill } from '@/lib/cefr'
import { levelByCode } from '@/lib/levels'
import { seedFor } from '@/lib/seed/a1-1'
import { generateSeedSql } from '@/lib/seed/sql'
import { totalCanDo, totalVocab, type SeedUnit } from '@/lib/seed/types'
import { SESSIONS_PER_UNIT, UNITS_PER_LEVEL } from '@/lib/lms'
import { LevelBadge, PageHeader, StatCard } from '@/components/ui'
import { CopyText } from '@/components/copy-text'

export const metadata = { title: '레벨 교육과정' }

/** 경로에는 A1-1 로 쓰고 데이터에는 A1.1 로 저장합니다. URL 에 점을 넣지 않으려고요. */
function toLevelCode(slug: string): string {
  return decodeURIComponent(slug).replace('-', '.').toUpperCase()
}

export default async function LevelCurriculumPage({
  params,
}: {
  params: Promise<{ level: string }>
}) {
  const { level: slug } = await params
  const code = toLevelCode(slug)

  const spec = levelByCode(code)
  const seed = seedFor(code)
  if (!spec || !seed) notFound()

  const sql = generateSeedSql(seed)

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-2">
            <LevelBadge level={spec.band} />
            <span>{code}</span>
            <span className="text-base font-normal text-slate-400">{spec.labelKo}</span>
          </span>
        }
        description={spec.canDo}
        action={
          <Link href="/teacher/curriculum" className="btn-secondary">
            레벨 목록
          </Link>
        }
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-4">
        <StatCard label="단원" value={`${seed.units.length}개`} sub={`주당 1단원 · ${SESSIONS_PER_UNIT}차시`} />
        <StatCard label="성취기준" value={`${totalCanDo(seed)}개`} sub="기능별 2개씩" />
        <StatCard label="신규 어휘" value={totalVocab(seed)} sub={`누적 목표 ${spec.vocabTarget}`} />
        <StatCard label="통합 단원" value="7 · 14" sub="중간 점검 · 기말 평가" />
      </div>

      {seed.units.length !== UNITS_PER_LEVEL && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          단원이 {seed.units.length}개입니다. 학기 구성은 {UNITS_PER_LEVEL}단원 기준입니다.
        </div>
      )}

      <div className="space-y-4">
        {seed.units.map((unit) => (
          <UnitCard key={unit.order} unit={unit} />
        ))}
      </div>

      <section className="card mt-8 p-5">
        <h2 className="text-sm font-semibold text-slate-900">DB 적재용 SQL</h2>
        <p className="mt-1 mb-3 text-sm text-slate-600">
          이 원안을 <code>units</code> · <code>can_do_statements</code> 테이블에 넣는 SQL 입니다.
          테이블을 먼저 만든 뒤 콘솔에서 한 번만 실행하세요. 적재 후에는 화면에서 수정합니다.
        </p>
        <CopyText value={sql} />
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-800">
            SQL 전체 보기
          </summary>
          <pre className="mt-2 max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
            {sql}
          </pre>
        </details>
      </section>
    </>
  )
}

function UnitCard({ unit }: { unit: SeedUnit }) {
  const bySkill = (skill: Skill) => unit.canDo.filter((c) => c.skill === skill)

  return (
    <section className={`card overflow-hidden ${unit.isReview ? 'border-sky-200' : ''}`}>
      <div
        className={`flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-3 ${
          unit.isReview ? 'border-sky-100 bg-sky-50/60' : 'border-slate-100 bg-slate-50/60'
        }`}
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">
            <span className="mr-2 font-mono text-slate-400">{unit.order}주</span>
            {unit.title}
            <span className="ml-2 font-normal text-slate-500">{unit.titleKo}</span>
          </p>
          {unit.grammar.length > 0 && (
            <p className="mt-1 text-xs text-slate-500">문법 · {unit.grammar.join(' / ')}</p>
          )}
        </div>
        <p className="text-xs text-slate-500">
          {unit.vocabCount > 0 ? `신규 어휘 ${unit.vocabCount}개` : '통합·복습'}
        </p>
      </div>

      <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
        {SKILLS.map((s) => (
          <div key={s.value} className="bg-white px-4 py-3">
            <p className="mb-1.5 text-xs font-semibold text-slate-500">
              {s.label} <span className="font-normal text-slate-400">{s.en}</span>
            </p>
            <ul className="space-y-1">
              {bySkill(s.value).map((c) => (
                <li key={c.statement} className="flex gap-1.5 text-sm text-slate-700">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-slate-300" />
                  <span>{c.statement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {unit.vocabulary.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-2.5">
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">대표 어휘</span> · {unit.vocabulary.join(', ')}
          </p>
        </div>
      )}
    </section>
  )
}
