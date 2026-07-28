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
      <ul className="flex gap-1">
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
