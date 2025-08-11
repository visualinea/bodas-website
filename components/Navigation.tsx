'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Check if we're on gallery page - if so, always use dark theme
    const isGalleryPage = window.location.pathname === '/galeria'
    if (isGalleryPage) {
      setIsScrolled(true)
    } else {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the gallery page
    const isGalleryPage = window.location.pathname === '/galeria'
    
    if (isGalleryPage) {
      // Navigate to main page with hash
      window.location.href = `/#${sectionId}`
    } else {
      // Scroll to section on current page
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const openWhatsApp = () => {
    const message = "Hola, me interesa el Citroën DS 23 Pallas para nuestra boda. Fecha: ____ Ubicación: ____"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/34669772166?text=${encodedMessage}`, '_blank')
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'El coche', href: 'el-coche', isSection: true },
    { label: 'Servicio', href: 'servicio', isSection: true },
    { label: 'Galería', href: 'galeria', isSection: true },
    { label: 'FAQ', href: 'faq', isSection: true },
    { label: 'Contacto', href: 'contacto', isSection: true },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => {
              if (window.location.pathname === '/galeria') {
                window.location.href = '/'
              } else {
                scrollToSection('hero')
              }
            }}
          >
            <h2 className={`font-playfair text-xl lg:text-2xl font-bold ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}>
              DS 23 Pallas
            </h2>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`font-inter font-medium transition-colors duration-200 hover:text-accent-500 ${
                  isScrolled ? 'text-primary-700' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openWhatsApp}
              className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200"
            >
              WhatsApp
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left font-inter font-medium text-primary-700 hover:text-accent-500 transition-colors duration-200 py-2"
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={openWhatsApp}
                className="w-full bg-accent-500 hover:bg-accent-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 mt-4"
              >
                WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}