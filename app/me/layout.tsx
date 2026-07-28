import { requireUser } from '@/lib/auth'
import { AppShell } from '@/components/app-shell'
import type { NavLink } from '@/components/nav-tabs'

export const metadata = { title: '내 학습' }

const LINKS: NavLink[] = [{ href: '/me', label: '내 반', exact: true }]

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()

  return (
    <AppShell user={user} homeHref="/me" links={LINKS}>
      {children}
    </AppShell>
  )
}
