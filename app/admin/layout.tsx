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
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            <Link href="/teacher" className="hover:underline">
              드리미 영어 LMS
            </Link>
            <span className="mx-1.5 font-normal text-slate-300">/</span>
            <Link href="/admin" className="font-normal text-slate-500 hover:underline">
              콘텐츠 은행
            </Link>
          </p>
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
