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
                    Av 17 Pte 1113, Barrio de Santiago
                    <br />
                    72410 Heroica Puebla de Zaragoza, Pue.
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">📞</span>
                    +52 1 221 128 4038
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-zinc-600">📧</span>
                    arthur.rommero@gmail.com
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
            </div>
          </FadeIn>

          {/* Mapa */}
          <FadeIn>
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4838306841793!2d-98.21305432410385!3d19.042453582155222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc1002d758389%3A0x5ce6244bc6928262!2sATHENA%20STUDIO!5e0!3m2!1ses-419!2smx!4v1777930972179!5m2!1ses-419!2smx" 
                width="600" 
                height="450" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px]"
              ></iframe>
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