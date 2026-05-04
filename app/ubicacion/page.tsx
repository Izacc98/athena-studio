import FadeIn from "@/components/FadeIn"

export default function UbicacionPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
              UBICACIÓN <span className="text-zinc-700">&</span> CONTACTO
            </h1>
            <p className="text-zinc-500 tracking-[0.4em] uppercase text-sm max-w-2xl mx-auto">
              Encuentra nuestro estudio y agenda tu visita
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Información de contacto */}
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                  Visítanos
                </h2>
                <div className="space-y-4 text-zinc-400">
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">📍</span>
                    Calle Principal 123, Centro Histórico
                    <br />
                    Ciudad de México, CDMX
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">📞</span>
                    +52 55 1234 5678
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">📧</span>
                    info@athenastudio.mx
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">🕒</span>
                    Lunes a Viernes: 10:00 - 20:00
                    <br />
                    Sábado: 10:00 - 18:00
                    <br />
                    Domingo: Cerrado
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">
                  Transporte Público
                </h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li>• Metro: Estación Centro Médico (Línea 3)</li>
                  <li>• Metrobús: Línea 1 - Plaza de la República</li>
                  <li>• Estacionamiento gratuito disponible</li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Mapa */}
          <FadeIn>
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 overflow-hidden">
              <div className="aspect-square bg-zinc-900 flex items-center justify-center">
                <div className="text-center text-zinc-600">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-lg">Mapa Interactivo</p>
                  <p className="text-sm mt-2">
                    Próximamente con ubicación exacta
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* CTA para agendar */}
        <FadeIn>
          <div className="mt-20 text-center">
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                ¿Listo para tu transformación?
              </h3>
              <p className="text-zinc-500 mb-8">
                Agenda tu consulta inicial y conoce nuestro espacio
              </p>
              <a
                href="/agendar"
                className="inline-block px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors rounded-full"
              >
                Agendar Cita
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}