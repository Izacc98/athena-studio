"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from 'lucide-react' // Usaremos este icono de Lucide
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  // Aparece solo cuando el usuario baja 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link href="/reservar">
            <button className="group flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:bg-zinc-200 transition-all active:scale-95">
              <span className="text-xs font-black uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
                Agendar Cita
              </span>
              <Calendar size={20} strokeWidth={2.5} />
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}