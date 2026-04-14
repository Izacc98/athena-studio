import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { deleteCollaborator, updateCollaborator, createCollaborator } from "./actions"

export const dynamic = 'force-dynamic'

export default async function AdminColaboradoresPage() {
  const collaborators = await prisma.artist.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight italic">Administrar Colaboradores</h1>
            <p className="mt-2 text-zinc-500 text-sm uppercase tracking-[0.35em]">
              Ver, actualizar o borrar colaboradores del equipo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className="rounded-full border border-zinc-700 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10">
              Ir al panel
            </Link>
          </div>
        </header>

        {/* SECCIÓN DE AGREGAR NUEVO COLABORADOR */}
        <section className="mb-12 rounded-3xl border border-zinc-900 bg-zinc-950 p-10 shadow-sm shadow-black/20">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Agregar nuevo colaborador</h2>
          
          <form action={createCollaborator} className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Nombre
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                placeholder="Ej: Juan Pérez"
              />
            </label>

            <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
              Especialidad
              <input
                name="specialty"
                required
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                placeholder="Ej: Blackwork & Dark Art"
              />
            </label>

            <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:col-span-2">
              Biografía
              <textarea
                name="bio"
                required
                rows={3}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                placeholder="Cuéntanos sobre este colaborador..."
              />
            </label>

            <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:col-span-2">
              Foto
              <input
                name="image"
                type="file"
                accept="image/*"
                required
                className="block w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
              />
            </label>

            <button type="submit" className="rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200 sm:col-span-2">
              Agregar colaborador
            </button>
          </form>
        </section>

        {/* LISTA DE COLABORADORES */}
        <div className="grid gap-6">
          {collaborators.length === 0 && (
            <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-12 text-center text-zinc-400">
              No hay colaboradores registrados todavía. Usa el formulario anterior para agregar el primero.
            </div>
          )}

          {collaborators.map((collaborator) => (
            <article key={collaborator.id} className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6 shadow-sm shadow-black/20 sm:grid sm:grid-cols-[200px_1fr] sm:gap-6">
              <div className="overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900">
                {collaborator.imageUrl ? (
                  <img src={collaborator.imageUrl} alt={collaborator.name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                ) : (
                  <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-sm">Sin foto</div>
                )}
              </div>

              <div className="mt-6 sm:mt-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">{collaborator.name}</h2>
                    <p className="text-zinc-500 text-sm uppercase tracking-[0.3em] mt-1">{collaborator.specialty}</p>
                  </div>
                  <form action={deleteCollaborator} className="inline-flex">
                    <input type="hidden" name="id" value={collaborator.id} />
                    <button type="submit" className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-red-300 transition hover:bg-red-500/20 hover:text-white">
                      Eliminar
                    </button>
                  </form>
                </div>

                <p className="text-sm text-zinc-400 mb-6">{collaborator.bio}</p>

                <div className="rounded-3xl border border-zinc-900 bg-black/30 p-5">
                  <p className="text-zinc-400 text-sm mb-4">Editar información del colaborador.</p>
                  <form action={updateCollaborator} className="grid gap-4 sm:grid-cols-2">
                    <input type="hidden" name="id" value={collaborator.id} />

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                      Nombre
                      <input
                        name="name"
                        defaultValue={collaborator.name}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                      />
                    </label>

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                      Especialidad
                      <input
                        name="specialty"
                        defaultValue={collaborator.specialty}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                      />
                    </label>

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:col-span-2">
                      Biografía
                      <textarea
                        name="bio"
                        defaultValue={collaborator.bio || ''}
                        rows={3}
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
                      />
                    </label>

                    <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-zinc-500 sm:col-span-2">
                      Nueva foto (opcional)
                      <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 cursor-pointer"
                      />
                      <p className="text-xs text-zinc-600 mt-1">Deja vacío para mantener la foto actual</p>
                    </label>

                    <button type="submit" className="rounded-2xl border border-white/10 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.35em] text-black transition hover:bg-zinc-200 sm:col-span-2">
                      Actualizar colaborador
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
