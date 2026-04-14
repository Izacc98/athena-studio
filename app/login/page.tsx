"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Llamamos a un API route o Server Action para validar
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/citas')
      router.refresh()
    } else {
      setError(true)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth', { method: 'DELETE' })
      if (res.ok) {
        setLogoutMessage('Sesión cerrada correctamente. Ahora puedes iniciar sesión de nuevo.')
        router.push('/home')
      }
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-zinc-950 border border-zinc-900 p-10 rounded-3xl text-center"
      >
        <h1 className="text-2xl font-black italic mb-8 tracking-tighter uppercase">Acceso Privado_</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Contraseña"
            className={`w-full bg-black border ${error ? 'border-red-500' : 'border-zinc-800'} p-4 rounded-xl outline-none focus:border-white transition-all text-center`}
          />
          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">Contraseña Incorrecta</p>}
          <button className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all uppercase tracking-widest text-xs">
            Entrar al Panel
          </button>
        </form>
        {logoutMessage && (
          <p className="mt-4 text-emerald-500 text-[10px] uppercase tracking-widest">{logoutMessage}</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded-xl border border-red-500/40 bg-red-500/10 py-4 text-sm uppercase tracking-widest text-red-300 transition hover:bg-red-500/20 hover:text-white"
        >
          Cerrar sesión
        </button>
      </motion.div>
    </main>
  )
}