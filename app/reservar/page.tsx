"use client"
import { useState, useEffect } from 'react'
import { createAppointment } from "./actions"
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReservarPage() {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [selectedHour, setSelectedHour] = useState("")

  // Efecto para cargar horarios cuando cambia la fecha
  useEffect(() => {
    if (selectedDate) {
      setAvailableHours([]) // Limpiar mientras carga
      setSelectedHour("")   // Resetear hora seleccionada
      
      // Enviar la fecha como string para parsearla correctamente en el servidor
      fetch(`/api/available-slots?date=${selectedDate}`)
        .then(res => res.json())
        .then(data => setAvailableHours(data.slots || []))
        .catch(error => {
          console.error("Error al cargar horarios:", error)
          setAvailableHours([])
        })
    }
  }, [selectedDate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedHour) {
      Swal.fire({ title: 'Atención', text: 'Por favor selecciona una hora', icon: 'warning', background: '#09090b', color: '#fff' })
      return
    }

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    // Combinamos fecha + hora para enviar al servidor
    formData.append("fullDateTime", `${selectedDate}T${selectedHour}`)
    
    try {
      await createAppointment(formData)
      await Swal.fire({
        title: '¡SOLICITUD ENVIADA!',
        text: 'Tu cita ha sido registrada para el ' + selectedDate + ' a las ' + selectedHour,
        icon: 'success',
        background: '#09090b',
        color: '#fff',
        confirmButtonColor: '#fff',
        confirmButtonText: '<span style="color:black; font-weight:bold">ENTENDIDO</span>',
        customClass: { popup: 'border border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]' }
      })
      window.location.href = "/"
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No pudimos procesar tu cita.'
      
      // Si el error es por horario ocupado, recargamos los horarios disponibles
      if (errorMessage.includes('ya está ocupado')) {
        setSelectedHour("") // Limpiar la selección
        
        // Recargar horarios disponibles
        fetch(`/api/available-slots?date=${selectedDate}`)
          .then(res => res.json())
          .then(data => setAvailableHours(data.slots || []))
          .catch(error => console.error("Error al recargar horarios:", error))
      }
      
      Swal.fire({
        title: 'ERROR',
        text: errorMessage,
        icon: 'error',
        background: '#09090b',
        color: '#fff',
        confirmButtonColor: '#fff',
        confirmButtonText: 'Intentar de nuevo'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-zinc-950/50 backdrop-blur-xl border border-zinc-900 p-10 rounded-3xl shadow-2xl z-10"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter italic">Agendar Sesión_</h2>
          <div className="h-1 w-12 bg-white mb-4" />
          <p className="text-zinc-500 text-sm">Reserva tu espacio. Los horarios mostrados son los disponibles actualmente.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* NOMBRE */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2 group-focus-within:text-white transition-colors">Nombre Completo</label>
              <input type="text" name="name" required className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl focus:border-white transition-all text-white outline-none" placeholder="Tu nombre" />
            </div>

            {/* FECHA */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Paso 1: Elige el día</label>
              <input 
                type="date" 
                required
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-white scheme-dark"
              />
            </div>

            {/* HORARIOS (SOLO SI HAY FECHA) */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500">Paso 2: Horarios Libres</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableHours.length > 0 ? (
                      availableHours.map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => {
                            // Si ya está seleccionado el mismo horario, mostrar alerta
                            if (selectedHour === hour) {
                              Swal.fire({
                                title: 'Hora ya seleccionada',
                                text: 'Este horario ya está seleccionado. Elige otro horario disponible.',
                                icon: 'info',
                                background: '#09090b',
                                color: '#fff',
                                confirmButtonColor: '#fff',
                                confirmButtonText: 'De acuerdo'
                              })
                              return
                            }
                            setSelectedHour(hour)
                          }}
                          className={`py-3 rounded-lg border text-xs font-bold transition-all ${
                            selectedHour === hour 
                            ? 'bg-white text-black border-white cursor-not-allowed opacity-80' 
                            : 'border-zinc-900 text-zinc-500 hover:border-zinc-500 hover:bg-zinc-900/50'
                          }`}
                          disabled={selectedHour === hour}
                        >
                          {hour}
                        </button>
                      ))
                    ) : (
                      <p className="col-span-3 text-zinc-700 italic text-xs text-center py-4">Cargando espacios o día sin disponibilidad...</p>
                    )}
                  </div>
                  {selectedHour && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-500 text-center pt-2"
                    >
                      ✓ Horario seleccionado: {selectedHour}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* DESCRIPCIÓN */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Idea del Tatuaje</label>
              <textarea name="description" required className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl h-32 focus:border-white transition-all text-white resize-none" placeholder="Describe tu idea..." />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading || !selectedHour}
            className="w-full bg-white text-black font-black py-5 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-30 uppercase tracking-widest text-sm"
          >
            {loading ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
          </motion.button>
        </form>
      </motion.div>

      <button onClick={() => window.location.href = "/"} className="mt-8 z-10 text-zinc-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
        ← Volver al inicio
      </button>
    </main>
  )
}