"use client"
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { saveWork } from './actions'
import Swal from 'sweetalert2'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)

    const formData = new FormData(form)
    const file = formData.get('image') as File
    const title = formData.get('title') as string
    const category = formData.get('category') as string

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('tattoos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('tattoos')
        .getPublicUrl(fileName)

      await saveWork(title, publicUrl, category)

      Swal.fire({
        title: '¡Publicado!',
        text: 'El diseño ya está en la galería principal.',
        icon: 'success',
        background: '#09090b',
        color: '#fff',
        confirmButtonColor: '#fff',
        confirmButtonText: '<span style="color:black">GENIAL</span>',
      })

      form.reset()
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al subir la imagen.',
        icon: 'error',
        background: '#09090b',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 sm:p-12">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_320px]">
        <section className="rounded-3xl border border-zinc-900 bg-zinc-950 p-10 shadow-sm shadow-black/20">
          <div className="mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight italic">Panel de administración</h1>
            <p className="mt-3 text-zinc-500 text-sm uppercase tracking-[0.35em]">
              Sube nuevas obras y gestiona la galería de forma rápida.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-2">Título del diseño</label>
              <input
                name="title"
                required
                className="w-full rounded-3xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none transition focus:border-white"
                placeholder="Ej: Cráneo Blackwork"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-2">Imagen del tatuaje</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className="block w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-zinc-500 mb-2">Categoría</label>
              <select
                name="category"
                required
                className="w-full rounded-3xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none transition focus:border-white"
              >
                <option value="Blackwork">Blackwork</option>
                <option value="Fine Line">Fine Line</option>
                <option value="Realismo">Realismo</option>
                <option value="Tradicional">Tradicional</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-3xl bg-white py-4 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'PROCESANDO...' : 'SUBIR A GALERÍA'}
            </button>
          </form>
        </section>

        <aside className="space-y-6 rounded-3xl border border-zinc-900 bg-zinc-950 p-8 shadow-sm shadow-black/20">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Navegación administrativa</h2>
            <p className="mt-2 text-zinc-500 text-sm">Accede rápidamente a la gestión de obras y a la agenda de citas.</p>
          </div>

          <div className="space-y-4">
            <Link
              href="/admin/obras"
              className="block rounded-full border border-zinc-800 bg-white/5 px-5 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10"
            >
              Ver y editar obras
            </Link>
            <Link
              href="/admin/citas"
              className="block rounded-full border border-zinc-800 bg-white/5 px-5 py-4 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10"
            >
              Administrar citas
            </Link>
          </div>

          <div className="rounded-3xl border border-zinc-900 bg-black/40 p-5 text-sm text-zinc-400">
            <p className="uppercase tracking-[0.35em] text-zinc-500">Consejo rápido</p>
            <p className="mt-3 leading-6">
              Usa la sección "Obras" para actualizar títulos, categorías e incluso cambiar las imágenes. Para borrar una imagen, selecciona el botón "Eliminar" en la lista.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}
