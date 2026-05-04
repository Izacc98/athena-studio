import { prisma } from "@/lib/prisma"
import FadeIn from "@/components/FadeIn"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function ColaboradoresPage() {
  const collaborators = await prisma.artist.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
              NUESTROS <span className="text-zinc-700">COLABORADORES</span>
            </h1>
            <p className="text-zinc-500 tracking-[0.4em] uppercase text-sm max-w-2xl mx-auto">
              Conoce al equipo de artistas que dan vida a tus ideas
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {collaborators.map((collaborator, index) => (
            <FadeIn key={collaborator.id} delay={index * 0.1}>
              <div className="group">
                <div className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 shadow-sm shadow-black/20 mb-6">
                  {collaborator.imageUrl ? (
                    <Image
                      src={collaborator.imageUrl}
                      alt={collaborator.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-80 bg-zinc-900 flex items-center justify-center">
                      <span className="text-zinc-600 text-6xl">👨‍🎨</span>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                    {collaborator.name}
                  </h3>
                  <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">
                    {collaborator.specialty}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">
                    {collaborator.bio}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {collaborators.length === 0 && (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">
                Próximamente conocerás a nuestro talentoso equipo.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  )
}