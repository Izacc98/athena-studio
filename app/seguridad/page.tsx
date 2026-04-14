import FadeIn from "@/components/FadeIn"

export default function Seguridad() {
  const protocolos = [
    {
      titulo: "Equipo Estéril",
      descripcion: "Utilizamos agujas, tubos y guantes desechables nuevos para cada cliente. Todo el equipo es esterilizado según normas sanitarias."
    },
    {
      titulo: "Desinfección del Área",
      descripcion: "Cada estación de trabajo se desinfecta completamente antes y después de cada sesión con productos hospitalarios."
    },
    {
      titulo: "Lavado de Manos",
      descripcion: "Lavado riguroso de manos y uso de gel antibacterial antes de cada procedimiento."
    },
    {
      titulo: "Tatuadores Certificados",
      descripcion: "Nuestros artistas están capacitados en protocolos de bioseguridad y primeros auxilios."
    },
    {
      titulo: "Control de Infecciones",
      descripcion: "Seguimos estrictamente las normas COFEPRIS para prevención de infecciones cruzadas."
    },
    {
      titulo: "Materiales de Calidad",
      descripcion: "Utilizamos tintas certificadas y equipos de marcas reconocidas con estándares de calidad."
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <FadeIn>
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">
              SEGURIDAD SANITARIA
            </h1>
            <p className="text-zinc-500 text-lg mb-16">
              Tu salud y seguridad son nuestra prioridad máxima
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="pb-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {protocolos.map((protocolo, index) => (
                <div key={index} className="border border-zinc-800 p-8 rounded-lg hover:border-zinc-600 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {protocolo.titulo}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {protocolo.descripcion}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg">
              <h3 className="text-3xl font-bold mb-6 text-center">
                Compromiso con tu Salud
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                En Athena Studio cumplimos con todas las normativas sanitarias mexicanas (COFEPRIS).
                Nuestra prioridad es proporcionar un ambiente seguro y higiénico para que puedas
                disfrutar de tu experiencia de tatuaje con total tranquilidad.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Si tienes alguna condición médica especial o preocupación sobre alergias,
                por favor infórmanos durante tu consulta para adaptar nuestros protocolos
                según tus necesidades específicas.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-zinc-900">
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