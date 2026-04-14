import AdminNavigation from './AdminNavigation'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavigation />
      <div className="pt-24">{children}</div>
    </div>
  )
}
