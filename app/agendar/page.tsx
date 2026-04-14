import FadeIn from "@/components/FadeIn"
import Link from 'next/link'

export default function Agendar() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <FadeIn>
        <section className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">
            AGENDA TU CITA
          </h1>
          <p className="text-zinc-500 text-lg mb-16 max-w-2xl">
            El primer paso para llevar tu visión al lienzo de tu piel.
            Reserva tu consulta gratuita y hablemos de tu proyecto.
          </p>

          <div className="space-y-6">
            <Link href="/reservar">
              <button className="bg-white text-black px-16 py-6 font-black text-xl hover:bg-zinc-200 transition-all duration-300 rounded-full shadow-2xl hover:scale-105 active:scale-95 block mx-auto">
                RESERVAR AHORA
              </button>
            </Link>
            <br></br>
            <p className="text-zinc-600 text-sm">
              Consulta gratuita • Sin compromiso • Diseño personalizado
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="py-32 bg-zinc-950">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-12">¿Qué incluye tu consulta?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-zinc-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Evaluación</h3>
                <p className="text-zinc-400">
                  Analizamos tu idea, ubicación y estilo para determinar viabilidad y presupuesto.
                </p>
              </div>

              <div className="p-6 border border-zinc-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Diseño</h3>
                <p className="text-zinc-400">
                  Creamos bocetos preliminares y discutimos modificaciones según tus preferencias.
                </p>
              </div>

              <div className="p-6 border border-zinc-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Planificación</h3>
                <p className="text-zinc-400">
                  Coordinamos fecha, tiempo estimado y preparación necesaria para tu sesión.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Footer */}
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