'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: '¿Incluye chófer?',
      answer: 'Sí, el servicio es con chófer. Nuestro conductor profesional se encarga de todo el trayecto para que vosotros podáis disfrutar del momento sin preocupaciones.'
    },
    {
      question: '¿Cuánto dura el servicio?',
      answer: 'Aproximadamente 5 horas, ajustable según la planificación del día. Nos adaptamos a vuestros horarios y necesidades específicas.'
    },
    {
      question: '¿Podemos hacer fotos con el coche?',
      answer: 'Sí, reservamos un momento para que os podáis llevar un recuerdo precioso. El DS 23 Pallas luce espectacular en las fotografías de boda.'
    },
    {
      question: '¿Dónde trabajáis?',
      answer: 'Principalmente en Madrid y alrededores. Cubrimos toda la Comunidad de Madrid y localidades cercanas. Consultanos para ubicaciones específicas.'
    },
    {
      question: '¿Cómo reservo?',
      answer: 'Escríbenos por WhatsApp o completa el formulario con vuestra fecha, lugar y horarios; te enviaremos una propuesta personalizada sin compromiso.'
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
            Preguntas frecuentes
          </h2>
          <p className="font-inter text-lg text-primary-600">
            Resolvemos las dudas más comunes sobre nuestro servicio
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-primary-50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary-100 transition-colors duration-200"
                aria-expanded={openItem === index}
              >
                <h3 className="font-inter font-semibold text-primary-900 pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDownIcon className="w-5 h-5 text-primary-600" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="font-inter text-primary-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-accent-50 rounded-2xl p-8">
            <h3 className="font-playfair text-xl font-bold text-primary-900 mb-4">
              ¿Tienes alguna otra pregunta?
            </h3>
            <p className="font-inter text-primary-600 mb-6">
              Estamos aquí para ayudarte. Contáctanos y te responderemos rápidamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const message = "Hola, tengo una pregunta sobre el servicio del Citroën DS 23 Pallas para bodas."
                  const encodedMessage = encodeURIComponent(message)
                  window.open(`https://wa.me/34669772166?text=${encodedMessage}`, '_blank')
                }}
                className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                WhatsApp
              </button>
              <button
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-primary-300 text-primary-700 hover:bg-primary-100 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Formulario de contacto
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}