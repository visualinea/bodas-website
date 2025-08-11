'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const openWhatsApp = () => {
    const message = "Hola, me interesa el Citroën DS 23 Pallas para nuestra boda."
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/34669772166?text=${encodedMessage}`, '_blank')
  }

  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-2xl font-bold mb-4">
              DS 23 Pallas 'Tiburón'
            </h3>
            <p className="font-inter text-primary-300 leading-relaxed mb-6">
              Elegante, atemporal y espectacular en fotos. Tu coche de boda 
              perfecto en Madrid y alrededores.
            </p>
            <button
              onClick={openWhatsApp}
              className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              WhatsApp: +34 669 772 166
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-inter font-semibold text-lg mb-4">
              Enlaces rápidos
            </h4>
            <nav className="space-y-3">
              {[
                { label: 'El coche', href: 'el-coche' },
                { label: 'Nuestro servicio', href: 'servicio' },
                { label: 'Galería de fotos', href: 'galeria' },
                { label: 'Preguntas frecuentes', href: 'faq' },
                { label: 'Contacto', href: 'contacto' },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => document.getElementById(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block font-inter text-primary-300 hover:text-accent-400 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact & Service Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-inter font-semibold text-lg mb-4">
              Información de servicio
            </h4>
            <div className="space-y-3 font-inter text-primary-300">
              <p>
                <strong className="text-white">Área:</strong><br />
                Madrid y alrededores
              </p>
              <p>
                <strong className="text-white">Servicio:</strong><br />
                Con chófer profesional
              </p>
              <p>
                <strong className="text-white">Contacto:</strong><br />
                WhatsApp preferido
              </p>
              <p className="text-sm italic text-accent-300">
                * No mostramos precios en la web pública. 
                Cada boda es única y merece una propuesta personalizada.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-primary-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-inter text-primary-400 text-sm">
              © {currentYear} Bodas Citroën DS. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6">
              <button
                onClick={() => console.log('Política de privacidad - placeholder')}
                className="font-inter text-primary-400 hover:text-accent-400 text-sm transition-colors duration-200"
              >
                Política de privacidad
              </button>
              <button
                onClick={() => console.log('Aviso legal - placeholder')}
                className="font-inter text-primary-400 hover:text-accent-400 text-sm transition-colors duration-200"
              >
                Aviso legal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}