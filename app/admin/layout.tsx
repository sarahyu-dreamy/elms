import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import AdminNav from './nav'

export const metadata = { title: '관리자' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/admin" className="text-sm font-semibold tracking-tight text-slate-900">
            드리미 영어 LMS <span className="font-normal text-slate-400">관리자</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">
              {user.name ?? user.email ?? user.sub}
              <span className="ml-1.5 text-slate-400">
                {user.role === 'admin' ? '관리자' : '교사'}
              </span>
            </span>
            <Link href="/auth/logout" prefetch={false} className="text-slate-500 hover:text-slate-900">
              로그아웃
            </Link>
          </div>
        </div>
        <AdminNav />
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
