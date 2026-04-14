"use client"
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { saveWork } from './actions'
import Swal from 'sweetalert2' // <-- Importamos SweetAlert

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

      // --- SWEET ALERT DE ÉXITO ---
      Swal.fire({
        title: '¡Publicado!',
        text: 'El diseño ya está en la galería principal.',
        icon: 'success',
        background: '#09090b', // zinc-950
        color: '#fff',
        confirmButtonColor: '#fff',
        confirmButtonText: '<span style="color:black">GENIAL</span>',
      })

      form.reset()
    } catch (error) {
      console.error(error)
      
      // --- SWEET ALERT DE ERROR ---
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
    <main className="min-h-screen bg-black text-white p-12">
      <div className="max-w-xl mx-auto border border-zinc-800 p-8 rounded-lg bg-zinc-950">
        <h1 className="text-3xl font-black mb-8 italic">ADMIN PANEL_</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-2">Título del Diseño</label>
            <input name="title" required className="w-full bg-black border border-zinc-800 p-3 rounded focus:border-white outline-none" placeholder="Ej: Cráneo Blackwork" />
          </div>

          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-2">Imagen del Tatuaje</label>
            <input name="image" type="file" accept="image/*" required className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer" />
          </div>

          <div>
            <label className="block text-xs uppercase text-zinc-500 mb-2">Categoría</label>
            <select name="category" required className="w-full bg-black border border-zinc-800 p-3 rounded text-white outline-none focus:border-white">
              <option value="Blackwork">Blackwork</option>
              <option value="Fine Line">Fine Line</option>
              <option value="Realismo">Realismo</option>
              <option value="Tradicional">Tradicional</option>
            </select>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-white text-black font-black py-4 hover:invert transition-all disabled:opacity-50"
          >
            {loading ? "PROCESANDO..." : "SUBIR A GALERÍA"}
          </button>
        </form>
      </div>
    </main>
  )
}