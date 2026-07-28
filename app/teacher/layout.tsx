import { requireAdmin } from '@/lib/auth'
import { AppShell } from '@/components/app-shell'
import type { NavLink } from '@/components/nav-tabs'

export const metadata = { title: '교사' }

const LINKS: NavLink[] = [
  { href: '/teacher', label: '대시보드', exact: true },
  { href: '/teacher/classes', label: '반' },
  { href: '/teacher/terms', label: '학기' },
  { href: '/admin', label: '콘텐츠 은행' },
]

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <AppShell user={user} homeHref="/teacher" links={LINKS}>
      {children}
    </AppShell>
  )
}
