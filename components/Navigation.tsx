"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/home', label: 'Inicio' },
    { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { href: '/faq', label: 'Preguntas Frecuentes' },
    { href: '/seguridad', label: 'Seguridad Sanitaria' },
    { href: '/agendar', label: 'Agendar Cita' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="text-2xl font-black italic tracking-tighter">
            ATHENA <span className="text-zinc-700">STUDIO</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  pathname === item.href
                    ? 'text-white border-b border-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-zinc-500 hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}