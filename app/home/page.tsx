import { prisma } from "@/lib/prisma"
import Link from 'next/link'
import FadeIn from "@/components/FadeIn"
import PortfolioGallery from "@/components/PortfolioGallery"
import AboutSection from '@/components/AboutSection'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // 1. Traemos todos los trabajos de la base de datos
  const works = await prisma.tattooWork.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // 2. Traemos colaboradores
  const collaborators = await prisma.artist.findMany({
    orderBy: { createdAt: 'asc' }
  })

  // 3. Extraemos las categorías únicas
  const rawCategories = works.map(w => w.category).filter((c): c is string => !!c)
  const categories = Array.from(new Set(rawCategories))

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-20">

      {/* 1. HERO - Impacto Visual */}
      <FadeIn>
        <section className="h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
          <h1 className="text-7xl md:text-[10rem] font-black italic tracking-tighter mb-4 leading-none">
            ATHENA <span className="text-zinc-700">STUDIO</span>
          </h1>
          <p className="text-zinc-500 tracking-[0.8em] uppercase text-xs md:text-sm mb-12">
            Fine Line & Dark Art Portfolio
          </p>

          {/* NUEVO BOTÓN PARA IR A "SOBRE NOSOTROS" */}
          <Link href="#sobre-nosotros" scroll={true}>
            <button className="px-8 py-3 border border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 rounded-full italic font-bold">
              Conoce al Estudio ↓
            </button>
          </Link>
        </section>
      </FadeIn>

      {/* 2. PORTAFOLIO FILTRABLE */}
      <PortfolioGallery works={works} categories={categories} />

      {/* 3. SOBRE NOSOTROS - El alma del estudio */}
      <FadeIn>
        <AboutSection team={collaborators} />
      </FadeIn>

      {/* 4. REDES SOCIALES - Vinculación */}
      <FadeIn>
        <section className="bg-zinc-950 py-32 border-y border-zinc-900">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-[10px] text-zinc-500 mb-16 uppercase tracking-[0.5em]">Conecta con nuestro arte</h2>

            <div className="flex justify-center items-center gap-12 md:gap-24">
              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/athena.tatt/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="p-5 rounded-full border border-zinc-800 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Instagram</span>
              </a>

              {/* FACEBOOK */}
              <a href="https://www.facebook.com/athenastudio" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="p-5 rounded-full border border-zinc-800 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Facebook</span>
              </a>

              {/* TIKTOK */}
              <a href="https://www.tiktok.com/@athena.studio55" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <div className="p-5 rounded-full border border-zinc-800 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </div>
                <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">TikTok</span>
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 5. CTA - Apartado de Cita */}
      <FadeIn>
        <section className="py-48 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">¿LISTO PARA TU PIEZA?</h2>
            <Link href="/reservar">
              <button className="bg-white text-black px-20 py-8 font-black text-2xl hover:bg-zinc-200 transition-all duration-300 rounded-full shadow-2xl hover:scale-105 active:scale-95">
                SOLICITAR CONSULTA
              </button>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Footer Pro */}
      <footer className="py-16 text-center border-t border-zinc-900">
        <p className="text-zinc-800 text-[10px] tracking-[0.6em] uppercase mb-4">
          Athena Studio — Arte Eterno <br></br>
          - © MonOS
        </p>
        <p className="text-zinc-900 text-[9px] uppercase tracking-widest">
          Puebla, México — MMXXVI
        </p>
      </footer>
    </main>
  )
}