"use client"
import { motion } from 'framer-motion'
import { MapPin, Award, Users } from 'lucide-react'

export default function AboutSection({ team }: { team: any[] }) {
  return (
    <section id="sobre-nosotros" className="bg-black text-white py-32 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. CABECERA Y EXPERIENCIA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-8 italic">La Esencia_</h2>
            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase mb-8">
              Arte que trasciende <br /> la piel.
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              En Athena Studio, combinamos la precisión técnica con una visión artística única. 
              Contamos con **más de 10 años de trayectoria colectiva** en la escena del tatuaje en Puebla, 
              especializándonos en estilos que requieren una mano experta y un ojo crítico.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 border border-zinc-900 bg-zinc-950/50 rounded-2xl">
              <Award className="text-white mb-4" size={32} strokeWidth={1} />
              <p className="text-3xl font-black italic">+10</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Años de Exp.</p>
            </div>
            <div className="p-8 border border-zinc-900 bg-zinc-950/50 rounded-2xl">
              <Users className="text-white mb-4" size={32} strokeWidth={1} />
              <p className="text-3xl font-black italic">1.5k</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Clientes Satisfechos</p>
            </div>
          </div>
        </div>

        {/* 2. LOS INTEGRANTES (EL EQUIPO) */}
        <div className="mb-32">
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-16 text-center italic">Nuestro Equipo_</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center bg-zinc-950/30 p-8 rounded-3xl border border-zinc-900 hover:border-zinc-700 transition-colors"
              >
                <div className="w-48 h-48 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-zinc-800">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold italic uppercase">{member.name}</h4>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-4">{member.specialty}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. DIRECCIÓN Y MAPA */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white text-black rounded-full">
                <MapPin size={24} />
              </div>
              <h4 className="text-3xl font-black italic uppercase">Visítanos_</h4>
            </div>
            <p className="text-xl text-zinc-300">Puebla, México</p>
            <p className="text-zinc-500 mt-2 uppercase text-xs tracking-[0.3em]">Av 17 Pte 1113, Barrio de Santiago, 72410 Heroica Puebla de Zaragoza, Pue.</p>
          </div>
          
          <div className="w-full md:w-1/2 h-64 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
             {/* Aquí puedes insertar un Iframe de Google Maps */}
             <div className="w-full h-full flex items-center justify-center text-zinc-700 italic text-sm">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4838306841793!2d-98.2130543241038!3d19.042453582155222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc1002d758389%3A0x5ce6244bc6928262!2sATHENA%20STUDIO!5e0!3m2!1ses!2smx!4v1776122963511!5m2!1ses!2smx" // Tu URL de Google Maps
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} // <--- CAMBIO AQUÍ: 'allowFullScreen' con mayúsculas y valor booleano
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale invert contrast-125 opacity-50" // Tip: esto hace que el mapa se vea oscuro/minimalista
                ></iframe>
                {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}