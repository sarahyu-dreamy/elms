'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavLink {
  href: string
  label: string
  /** 정확히 일치할 때만 활성 (대개 목록 최상위 경로) */
  exact?: boolean
}

export function NavTabs({ links }: { links: NavLink[] }) {
  const pathname = usePathname()

  return (
    <nav className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
      <ul className="flex gap-1">
        {links.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
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
