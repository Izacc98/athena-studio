import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Definimos qué rutas queremos proteger
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // 2. Obtenemos la cookie de sesión
  const authCookie = request.cookies.get('admin_auth')?.value

  // 3. Lógica de protección
  if (isAdminPage && authCookie !== 'true') {
    // Si intenta entrar a admin sin estar logueado, lo mandamos al login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoginPage && authCookie === 'true') {
    // Si ya está logueado e intenta ir al login, lo mandamos al panel
    return NextResponse.redirect(new URL('/admin/citas', request.url))
  }

  return NextResponse.next()
}

// Solo ejecutamos el middleware en estas rutas para no afectar el rendimiento
export const config = {
  matcher: ['/admin/:path*', '/login'],
}