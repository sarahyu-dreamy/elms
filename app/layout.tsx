import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '드리미 영어 LMS',
    template: '%s · 드리미 영어 LMS',
  },
  description: 'CEFR 기반 레벨별 영어 교육과정 시스템 — 드리미학교',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
