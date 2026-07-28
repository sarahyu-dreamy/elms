import Link from 'next/link'
import type { SessionUser } from '@/lib/auth'
import { NavTabs, type NavLink } from './nav-tabs'

/** 교사·학생 화면 공통 껍데기. 모바일에서는 탭이 가로 스크롤됩니다. */
export function AppShell({
  user,
  homeHref,
  links,
  children,
}: {
  user: SessionUser
  homeHref: string
  links: NavLink[]
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href={homeHref} className="text-sm font-semibold tracking-tight text-slate-900">
            드리미 영어 LMS
            {user.role === 'admin' && <span className="ml-1.5 font-normal text-slate-400">교사</span>}
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-slate-600 sm:inline">{user.name ?? user.email ?? user.sub}</span>
            <Link
              href="/auth/logout"
              prefetch={false}
              className="text-slate-500 hover:text-slate-900"
            >
              로그아웃
            </Link>
          </div>
        </div>
        <NavTabs links={links} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  )
}
