'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({
  children,
  className = 'btn-primary',
  pendingLabel = '저장 중…',
  confirm,
}: {
  children: React.ReactNode
  className?: string
  pendingLabel?: string
  confirm?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault()
      }}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
