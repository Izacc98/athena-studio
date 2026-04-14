import FadeIn from "@/components/FadeIn"
import Link from 'next/link'

export default function FAQ() {
  const faqs = [
    {
      question: "¿Cuánto cuesta un tatuaje?",
      answer: "El precio depende del tamaño, complejidad y tiempo estimado. Ofrecemos consultas gratuitas para presupuestos personalizados."
    },
    {
      question: "¿Es doloroso hacerse un tatuaje?",
      answer: "El dolor varía según la persona y la zona del cuerpo. Generalmente es tolerable, y nuestros artistas son expertos en minimizar el discomfort."
    },
    {
      question: "¿Cuál es la edad mínima para tatuarse?",
      answer: "La edad mínima es 18 años con identificación oficial. Para menores de edad, requerimos consentimiento parental."
    },
    {
      question: "¿Cuánto tiempo tarda en sanar un tatuaje?",
      answer: "El proceso de sanación toma aproximadamente 2-4 semanas. Te proporcionamos instrucciones detalladas para el cuidado post-tatuaje."
    },
    {
      question: "¿Puedo donar sangre después de un tatuaje?",
      answer: "No puedes donar sangre durante 6 meses después de un tatuaje, según las regulaciones sanitarias mexicanas."
    },
    {
      question: "¿Ofrecen garantía en los tatuajes?",
      answer: "Ofrecemos retoques gratuitos dentro de los primeros 30 días si hay problemas con la sanación. La calidad del tatuaje depende también del cuidado del cliente."
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <FadeIn>
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">
              PREGUNTAS FRECUENTES
            </h1>
            <p className="text-zinc-500 text-lg mb-16">
              Resolvemos tus dudas sobre nuestros servicios
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-zinc-800 pb-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-zinc-500 mb-8">
                ¿Tienes más preguntas? No dudes en contactarnos.
              </p>
              <Link href="/reservar">
                <button className="bg-white text-black px-12 py-4 font-bold text-lg hover:bg-zinc-200 transition-all duration-300 rounded-full">
                  AGENDAR CONSULTA
                </button>
              </Link>
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