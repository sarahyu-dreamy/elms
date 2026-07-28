/**
 * 엑셀·구글 시트에서 복사해 붙여넣는 것을 1순위로 가정한 파서입니다.
 * 그 경우 구분자가 탭이라 CSV 파서로는 깨지므로, 첫 줄을 보고 구분자를 정합니다.
 */
export function detectDelimiter(text: string): string {
  const firstLine = text.split('\n')[0] ?? ''
  const tabs = (firstLine.match(/\t/g) ?? []).length
  const commas = (firstLine.match(/,/g) ?? []).length
  return tabs >= commas && tabs > 0 ? '\t' : ','
}

/** 따옴표로 감싼 필드와 그 안의 줄바꿈·이스케이프("")를 처리합니다. */
export function parseDelimited(text: string, delimiter = detectDelimiter(text)): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i]

    if (inQuotes) {
      if (ch === '"') {
        if (normalized[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === delimiter) {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += ch
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

/** 헤더 이름을 비교용으로 정규화 — 공백·언더바·대소문자 차이를 무시합니다. */
export function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/[\s_-]+/g, '')
}

/**
 * 헤더 행을 컬럼 인덱스 맵으로 바꿉니다.
 * aliases: 표준 컬럼명 → 허용할 표기들 (한글 헤더도 받습니다)
 */
export function mapHeaders(
  headerRow: string[],
  aliases: Record<string, string[]>,
): Record<string, number> {
  const found: Record<string, number> = {}

  headerRow.forEach((raw, index) => {
    const key = normalizeHeader(raw)
    for (const [canonical, names] of Object.entries(aliases)) {
      if (canonical in found) continue
      if (names.some((n) => normalizeHeader(n) === key)) {
        found[canonical] = index
        return
      }
    }
  })

  return found
}
