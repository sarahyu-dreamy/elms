import type { SeedLevel } from './types'

function q(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

/**
 * 원안을 DB 적재용 SQL 로 바꿉니다.
 *
 * 단원과 성취기준을 따로 넣되, 성취기준은 (level_code, order_index) 로 단원을 찾아
 * 붙입니다. 그래서 단원 id 를 미리 알 필요가 없고, 콘솔에 그대로 붙여넣으면 됩니다.
 */
export function generateSeedSql(level: SeedLevel, schema = 'app_6'): string {
  const lc = q(level.levelCode)

  const unitRows = level.units
    .map((u) => {
      const overview = [
        u.grammar.length ? `문법: ${u.grammar.join(', ')}` : '',
        u.vocabulary.length ? `대표 어휘: ${u.vocabulary.join(', ')}` : '',
        u.vocabCount ? `신규 어휘 ${u.vocabCount}개` : '통합·복습 단원 (신규 어휘 없음)',
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

  return `-- ${level.levelCode} 교육과정 원안 적재
-- lib/seed/${level.levelCode.toLowerCase().replace('.', '-')}.ts 에서 생성된 SQL 입니다.
-- 이 파일을 직접 고치지 말고 원본 TS 를 고친 뒤 다시 생성하세요.
--
-- 먼저 docs/tables.sql 로 units / can_do_statements 테이블을 만들어야 합니다.
-- 두 번 실행하면 중복 적재되니 한 번만 실행하세요.

begin;

insert into ${schema}.units
  (level_code, order_index, title, title_ko, theme, weeks, overview, is_published)
values
${unitRows};

insert into ${schema}.can_do_statements (unit_id, skill, statement_ko, order_index)
select u.id, v.skill, v.statement, v.ord
from (values
${canDoRows}
) as v(unit_order, skill, statement, ord)
join ${schema}.units u
  on u.level_code = ${lc} and u.order_index = v.unit_order;

commit;
`
}
