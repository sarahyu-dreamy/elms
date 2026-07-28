import { CEFR_LEVELS, type CefrLevel } from './cefr'

export function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? '').trim()
}

export function optStr(fd: FormData, key: string): string | null {
  return str(fd, key) || null
}

export function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key)
  return v === 'on' || v === 'true' || v === '1'
}

export function int(fd: FormData, key: string, fallback: number): number {
  const n = Number(str(fd, key))
  return Number.isFinite(n) ? Math.trunc(n) : fallback
}

export function level(fd: FormData, key = 'cefr_level'): CefrLevel | null {
  const v = str(fd, key)
  return (CEFR_LEVELS as readonly string[]).includes(v) ? (v as CefrLevel) : null
}

/** 한 줄에 하나씩 입력받는 목록 (문항 보기 등) */
export function lines(fd: FormData, key: string): string[] {
  return str(fd, key)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Supabase 에러를 사용자에게 보여줄 문장으로 바꿉니다. */
export function dbErrorMessage(error: { message: string; code?: string }): string {
  if (error.code === '42P01' || /does not exist/i.test(error.message)) {
    return '테이블이 아직 만들어지지 않았습니다. 드리미 개발자 콘솔에서 테이블을 먼저 생성해 주세요.'
  }
  if (error.code === '23505') return '이미 등록된 항목입니다.'
  if (error.code === '42501' || /row-level security/i.test(error.message)) {
    return '쓰기 권한이 없습니다. RLS 정책 또는 service_role 키 설정을 확인해 주세요.'
  }
  return `저장에 실패했습니다: ${error.message}`
}
