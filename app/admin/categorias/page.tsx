import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { createCategory, updateCategory, deleteCategory } from "./actions"

export const dynamic = 'force-dynamic'

export default async function AdminCategoriasPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: { works: { select: { id: true } } }, // Para contar obras
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight italic">Administrar Categorías</h1>
            <p className="mt-2 text-zinc-500 text-sm uppercase tracking-[0.35em]">
              Crear, editar y eliminar categorías para las obras.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10">
              Volver al panel
            </Link>
            <Link href="/admin/obras" className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10">
              Ver obras
            </Link>
          </div>
        </header>

        {/* Formulario para crear nueva categoría */}
        <section className="mb-10 rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Crear nueva categoría</h2>
          <form action={createCategory} className="flex gap-4">
            <input
              name="name"
              required
              placeholder="Nombre de la categoría"
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200"
            >
              Crear
            </button>
          </form>
        </section>

        {/* Lista de categorías */}
        <div className="grid gap-6">
          {categories.length === 0 && (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-12 text-center text-zinc-400">
              No hay categorías registradas. Crea la primera arriba.
            </div>
          )}

          {categories.map((category) => (
            <article key={category.id} className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{category.name}</h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    {category.works.length} obra{category.works.length !== 1 ? 's' : ''} asignada{category.works.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <form action={deleteCategory} className="inline-flex">
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-red-300 transition hover:bg-red-500/20 hover:text-white"
                      disabled={category.works.length > 0}
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>

              {/* Formulario para editar */}
              <div className="mt-6 rounded-3xl border border-zinc-900 bg-black/30 p-5">
                <p className="text-zinc-400 text-sm mb-4">Editar nombre de la categoría.</p>
                <form action={updateCategory} className="flex gap-4">
                  <input type="hidden" name="id" value={category.id} />
                  <input
                    name="name"
                    defaultValue={category.name}
                    className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200"
                  >
                    Actualizar
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}