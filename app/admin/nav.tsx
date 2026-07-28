'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/admin', label: '현황' },
  { href: '/admin/vocab', label: '단어·관용어구' },
  { href: '/admin/grammar', label: '문법' },
  { href: '/admin/questions', label: '문항' },
  { href: '/admin/speaking', label: '스피킹 과제' },
  { href: '/admin/import', label: '일괄 등록' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="mx-auto max-w-6xl overflow-x-auto px-6">
      <ul className="flex items-center gap-1">
        {/* 콘텐츠 은행은 교사 화면과 탭 구성이 달라서, 돌아가는 길을 명시적으로 둡니다 */}
        <li className="flex items-center">
          <Link
            href="/teacher"
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <span aria-hidden>←</span> 교사 화면
          </Link>
          <span className="mx-2 h-4 w-px bg-slate-200" />
        </li>

        {LINKS.map((link) => {
          const active =
            link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-block whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition ${
                  active
                    ? 'border-slate-900 font-medium text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
