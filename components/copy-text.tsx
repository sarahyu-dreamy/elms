'use client'

import { useState } from 'react'

/** 값과 복사 버튼. sub 처럼 손으로 옮겨 적기 번거로운 값에 씁니다. */
export function CopyText({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <code className="min-w-0 flex-1 break-all rounded-md bg-slate-100 px-2 py-1.5 font-mono text-xs text-slate-800">
        {value}
      </code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } catch {
            // 클립보드 권한이 없으면 직접 선택해 복사하면 됩니다.
          }
        }}
        className="btn-secondary shrink-0 px-2.5 py-1 text-xs"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  )
}
