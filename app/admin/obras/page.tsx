import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteWork, updateWork } from "./actions"

export const dynamic = 'force-dynamic'

export default async function AdminObrasPage() {
  const works = await prisma.tattooWork.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight italic">Administrar Obras</h1>
            <p className="mt-2 text-zinc-500 text-sm uppercase tracking-[0.35em]">
              Ver, actualizar o borrar imágenes, títulos y categorías.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10">
              Subir nueva obra
            </Link>
            <Link href="/admin/citas" className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10">
              Ir a citas
            </Link>
          </div>
        </header>

        <div className="grid gap-6">
          {works.length === 0 && (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-12 text-center text-zinc-400">
              No hay obras registradas todavía. Usa el enlace "Subir nueva obra" para agregar la primera.
            </div>
          )}

          {works.map((work) => (
            <article key={work.id} className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6 shadow-sm shadow-black/20 sm:grid sm:grid-cols-[280px_1fr] sm:gap-6">
              <div className="overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900">
                <img src={work.imageUrl} alt={work.title} className="h-full w-full object-cover" />
              </div>

              <div className="mt-6 sm:mt-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{work.title}</h2>
                    <p className="text-zinc-500 text-sm uppercase tracking-[0.3em] mt-1">{work.category || 'Sin categoría'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={deleteWork} className="inline-flex">
                      <input type="hidden" name="id" value={work.id} />
                      <button type="submit" className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-red-300 transition hover:bg-red-500/20 hover:text-white">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-zinc-900 bg-black/30 p-5">
                  <p className="text-zinc-400 text-sm mb-4">Editar título, categoría o imagen de esta obra.</p>
                  <form action={updateWork} className="grid gap-4 sm:grid-cols-2">
                    <input type="hidden" name="id" value={work.id} />

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                      Título
                      <input
                        name="title"
                        defaultValue={work.title}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                      />
                    </label>

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                      Categoría
                      <select
                        name="category"
                        defaultValue={work.category ?? ''}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                      >
                        <option value="Blackwork">Blackwork</option>
                        <option value="Fine Line">Fine Line</option>
                        <option value="Realismo">Realismo</option>
                        <option value="Tradicional">Tradicional</option>
                      </select>
                    </label>

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:col-span-2">
                      Nueva imagen (opcional)
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
                      />
                      <p className="text-xs text-zinc-600 mt-1">Deja vacío para mantener la imagen actual</p>
                    </label>

                    <button type="submit" className="rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200 sm:col-span-2">
                      Actualizar obra
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
