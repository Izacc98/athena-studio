"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react' // Usamos X de lucide o el SVG manual que ya tenemos

export default function PortfolioGallery({ works, categories }: { works: any[], categories: string[] }) {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Bloquear el scroll del cuerpo cuando el Lightbox está abierto
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  // Filtrar trabajos por categoría
  const filteredWorks = selectedCategory === 'all'
    ? works
    : works.filter(work => work.category === selectedCategory)

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* FILTROS DE CATEGORÍA */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 text-sm uppercase tracking-widest border transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'border-white text-white bg-white/10'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-400'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 text-sm uppercase tracking-widest border transition-all duration-300 ${
              selectedCategory === category
                ? 'border-white text-white bg-white/10'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de Imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work) => (
          <motion.div
            key={work.id}
            layoutId={`image-${work.id}`}
            onClick={() => setSelectedImage(work)}
            className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-900 cursor-zoom-in rounded-sm"
          >
            <img 
              src={work.imageUrl} 
              alt={work.title}
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold italic">Ver detalle_</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            {/* Botón Cerrar */}
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <motion.div 
              layoutId={`image-${selectedImage.id}`}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar la foto
            >
              <img 
                src={selectedImage.imageUrl} 
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(255,255,255,0.05)] border border-zinc-800"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">{selectedImage.title}</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] mt-2">{selectedImage.category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}