'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
  { href: '/admin', label: 'Galería' },
  { href: '/admin/obras', label: 'Obras' },
  { href: '/admin/citas', label: 'Citas' },
]

export default function AdminNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    // Eliminar la cookie de autenticación
    document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    // Redirigir al login
    router.push('/login')
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/admin" className="text-lg font-black uppercase tracking-[0.35em] text-white">
          ADMIN
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-wrap items-center gap-3 md:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.25em] transition-all ${{
                true: 'border border-white bg-white text-black',
              }[pathname === item.href ? 'true' : '']} ${pathname !== item.href ? 'text-zinc-400 hover:text-white' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-red-300 transition hover:bg-red-500/20 hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`block rounded-full px-4 py-3 text-sm uppercase tracking-[0.25em] transition-all ${
                  pathname === item.href
                    ? 'border border-white bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => {
                closeMenu()
                handleLogout()
              }}
              className="w-full text-left rounded-full border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm uppercase tracking-[0.25em] text-red-300 transition hover:bg-red-500/20 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
