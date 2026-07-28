/**
 * 실제 DB 에 어떤 컬럼이 있는지 알아냅니다.
 *
 * 테이블을 콘솔 폼으로 손수 만들다 보면 컬럼이 빠지거나 이름이 어긋나기 쉽습니다.
 * 그대로 적재하면 "column ... does not exist" 로 전부 실패합니다.
 * 그래서 넣기 전에 실제 컬럼을 확인하고, 없는 컬럼은 빼고 넣습니다.
 *
 * PostgREST 루트가 OpenAPI 스펙을 돌려주는데 거기에 테이블별 컬럼이 들어 있습니다.
 */
export async function fetchTableColumns(): Promise<Record<string, Set<string>>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const schema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA

  const res = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(schema ? { 'Accept-Profile': schema } : {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) return {}

  const spec = (await res.json()) as {
    definitions?: Record<string, { properties?: Record<string, unknown> }>
  }

  const out: Record<string, Set<string>> = {}
  for (const [table, def] of Object.entries(spec.definitions ?? {})) {
    out[table] = new Set(Object.keys(def.properties ?? {}))
  }
  return out
}

/**
 * 실제로 존재하는 컬럼만 남깁니다.
 * 무엇이 빠졌는지 함께 돌려주어 화면에서 알릴 수 있게 합니다.
 */
export function keepExistingColumns(
  rows: Record<string, unknown>[],
  available: Set<string> | undefined,
): { rows: Record<string, unknown>[]; dropped: string[] } {
  if (!available || available.size === 0) return { rows, dropped: [] }

  const dropped = new Set<string>()
  const filtered = rows.map((row) => {
    const next: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(row)) {
      if (available.has(k)) next[k] = v
      else dropped.add(k)
    }
    return next
  })

  return { rows: filtered, dropped: [...dropped] }
}
