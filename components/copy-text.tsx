'use client'

import { useState } from 'react'

/**
 * 값과 복사 버튼.
 *
 * SQL 처럼 긴 값은 접어서 보여줍니다. 화면을 채우는 것이 목적이 아니라
 * 복사하는 것이 목적이라, 기본 상태에서는 크기만 알려주고 내용은 숨깁니다.
 */
export function CopyText({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const isLong = value.length > 200 || value.includes('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 권한이 없으면 펼쳐서 직접 선택해 복사하면 됩니다.
    }
  }

  if (!isLong) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <code className="min-w-0 flex-1 break-all rounded-md bg-slate-100 px-2 py-1.5 font-mono text-xs text-slate-800">
          {value}
        </code>
        <button type="button" onClick={copy} className="btn-secondary shrink-0 px-2.5 py-1 text-xs">
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
    )
  }

  const lines = value.split('\n').length

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={copy} className="btn-primary px-3 py-1.5 text-xs">
          {copied ? '복사됨 ✓' : `${label ?? 'SQL'} 복사`}
        </button>
        <span className="text-xs text-slate-400">
          {lines.toLocaleString()}줄 · {value.length.toLocaleString()}자
        </span>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-800">
          내용 보기
        </summary>
        <pre className="mt-2 max-h-80 overflow-auto rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
          {value}
        </pre>
      </details>
    </div>
  )
}
