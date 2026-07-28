import type { SeedLevel } from './types'

function q(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

/**
 * 원안을 DB 적재용 SQL 로 바꿉니다.
 *
 * 단원을 먼저 넣고, 성취기준·문법·어휘는 (level_code, order_index) 로 단원을 찾아
 * 붙입니다. 그래서 단원 id 를 미리 알 필요가 없고, 콘솔에 그대로 붙여넣으면 됩니다.
 *
 * 전체가 하나의 트랜잭션이라 중간에 실패하면 아무것도 남지 않습니다.
 */
export function generateSeedSql(level: SeedLevel, schema = 'app_6'): string {
  const lc = q(level.levelCode)

  const unitRows = level.units
    .map((u) => {
      const overview = [
        u.grammar.length ? `문법: ${u.grammar.map((g) => g.title).join(', ')}` : '',
        u.vocabulary.length ? `신규 어휘 ${u.vocabulary.length}개` : '통합·복습 단원 (신규 어휘 없음)',
      ]
        .filter(Boolean)
        .join('\n')

      return `  (${lc}, ${u.order}, ${q(u.title)}, ${q(u.titleKo)}, ${q(u.theme ?? '')}, 1, ${q(overview)}, true)`
    })
    .join(',\n')

  const canDoRows = level.units
    .flatMap((u) =>
      u.canDo.map((c, i) => `  (${u.order}, ${q(c.skill)}, ${q(c.statement)}, ${i + 1})`),
    )
    .join(',\n')

  const grammarRows = level.units
    .flatMap((u) =>
      u.grammar.map(
        (g, i) =>
          `  (${u.order}, ${q(g.title)}, ${g.canDo ? q(g.canDo) : 'null'}, ${u.order * 10 + i})`,
      ),
    )
    .join(',\n')

  const vocabRows = level.units
    .flatMap((u) =>
      u.vocabulary.map(
        (v) =>
          `  (${u.order}, ${q(v.en)}, ${q(v.ko)}, ${q(v.pos)}, ${q(v.type ?? 'word')}, ${q(v.ex)}, ${q(v.exKo)})`,
      ),
    )
    .join(',\n')

  const textUnits = level.units.filter((u) => u.text)
  const materialRows = textUnits
    .map((u) => {
      const t = u.text!
      const body = `${t.body}\n\n---\n\n${t.bodyKo}`
      return `  (${u.order}, ${q(t.title)}, ${q(t.kind === 'dialogue' ? 'reading' : 'reading')}, ${q(body)})`
    })
    .join(',\n')

  return `-- ${level.levelCode} 교육과정 원안 적재
--
-- lib/seed/${level.levelCode.toLowerCase().replace('.', '-')}.ts 에서 생성된 SQL 입니다.
-- 이 파일을 직접 고치지 말고 원본 TS 를 고친 뒤 다시 생성하세요.
--
-- 사전 조건: docs/tables.sql 로 units · can_do_statements · grammar_points ·
--            lexical_items 테이블이 만들어져 있어야 합니다.
--
-- 두 번 실행하면 중복 적재됩니다. 한 번만 실행하세요.

begin;

-- 1. 단원 ${level.units.length}개
insert into ${schema}.units
  (level_code, order_index, title, title_ko, theme, weeks, overview, is_published)
values
${unitRows};

-- 2. 성취기준
insert into ${schema}.can_do_statements (unit_id, skill, statement_ko, order_index)
select u.id, v.skill, v.statement, v.ord
from (values
${canDoRows}
) as v(unit_order, skill, statement, ord)
join ${schema}.units u
  on u.level_code = ${lc} and u.order_index = v.unit_order;

-- 3. 문법 항목 (설명 포함)
insert into ${schema}.grammar_points
  (unit_id, title, can_do, explanation_md, cefr_level, order_index, is_published)
select u.id, v.title, v.can_do, v.explanation, ${q(level.levelCode.slice(0, 2))}, v.ord, true
from (values
${grammarRows}
) as v(unit_order, title, can_do, explanation, ord)
join ${schema}.units u
  on u.level_code = ${lc} and u.order_index = v.unit_order;

-- 4. 어휘 (예문 포함)
insert into ${schema}.lexical_items
  (unit_id, headword, meaning_ko, pos, item_type, example_en, example_ko, cefr_level, is_published)
select u.id, v.headword, v.meaning_ko, v.pos, v.item_type, v.example_en, v.example_ko,
       ${q(level.levelCode.slice(0, 2))}, true
from (values
${vocabRows}
) as v(unit_order, headword, meaning_ko, pos, item_type, example_en, example_ko)
join ${schema}.units u
  on u.level_code = ${lc} and u.order_index = v.unit_order;

-- 5. 단원 지문 (class_id 가 비어 있으면 모든 반이 공유하는 표준 자료)
insert into ${schema}.materials
  (unit_id, class_id, title, material_type, week, body, is_published)
select u.id, null, v.title, v.kind, u.order_index, v.body, true
from (values
${materialRows}
) as v(unit_order, title, kind, body)
join ${schema}.units u
  on u.level_code = ${lc} and u.order_index = v.unit_order;

commit;
`
}
