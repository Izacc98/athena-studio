import FadeIn from "@/components/FadeIn"
import AboutSection from '@/components/AboutSection'

export default function SobreNosotros() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <FadeIn>
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">
              SOBRE NOSOTROS
            </h1>
            <p className="text-zinc-500 text-lg mb-16">
              Conoce la historia y filosofía detrás de Athena Studio
            </p>
          </div>
        </section>
      </FadeIn>

      <AboutSection />

      {/* Footer */}
      <footer className="py-16 text-center border-t border-zinc-900 mt-32">
        <p className="text-zinc-800 text-[10px] tracking-[0.6em] uppercase mb-4">
          Athena Studio — Arte Eterno
        </p>
        <p className="text-zinc-900 text-[9px] uppercase tracking-widest">
          Puebla, México — MMXXVI
        </p>
      </footer>
    </main>
  )
}