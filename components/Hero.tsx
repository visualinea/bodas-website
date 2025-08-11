'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Photo {
  filename: string
  width: number
  height: number
  orientation: 'horizontal' | 'vertical'
  format: string
  size: number
  created: string
  modified: string
  alt?: string
}

interface HeroProps {
  heroImage?: Photo | null
}

export default function Hero({ heroImage }: HeroProps) {
  const scrollToGallery = () => {
    document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openWhatsApp = () => {
    const message = "Hola, me interesa el Citroën DS 23 Pallas para nuestra boda. Fecha: ____ Ubicación: ____"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/34669772166?text=${encodedMessage}`, '_blank')
  }

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {heroImage ? (
          <Image
            src={`/photos/${heroImage.filename}`}
            alt={heroImage.alt || 'Citroën DS 23 Pallas Tiburón — coche de boda elegante y atemporal'}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Title Section - Upper Part */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
        >
          Citroën DS 23 Pallas
          <br />
          <span className="text-accent-400">'Tiburón'</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-inter text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Elegante y atemporal para tu gran día
        </motion.p>
      </div>

      {/* Buttons Section - Bottom Part */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={scrollToGallery}
            className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-10 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            Ver galería
          </button>
          
          <button
            onClick={openWhatsApp}
            className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-10 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
          >
            WhatsApp
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white cursor-pointer"
          onClick={scrollToGallery}
        >
          <ChevronDownIcon className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
}