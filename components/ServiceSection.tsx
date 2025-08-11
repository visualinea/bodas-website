'use client'

import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  UserGroupIcon, 
  CameraIcon, 
  GlobeEuropeAfricaIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

export default function ServiceSection() {
  const services = [
    {
      icon: MapPinIcon,
      title: 'Recogida y traslado a la ceremonia',
      description: 'Servicio puerta a puerta para que no tengáis que preocuparos por nada.'
    },
    {
      icon: UserGroupIcon,
      title: 'Acompañamiento con chófer',
      description: 'Chófer profesional que conoce Madrid y cuida cada detalle del trayecto.'
    },
    {
      icon: CameraIcon,
      title: 'Tiempo para fotos con el coche si lo deseáis',
      description: 'Momentos especiales para inmortalizar vuestra boda con el DS 23 Pallas.'
    },
    {
      icon: GlobeEuropeAfricaIcon,
      title: 'Cobertura en Madrid y alrededores',
      description: 'Servicio en toda la Comunidad de Madrid y localidades cercanas.'
    },
    {
      icon: ClockIcon,
      title: 'Coordinación previa para ajustar horarios y recorrido',
      description: 'Planificamos juntos cada detalle para que todo sea perfecto.'
    }
  ]

  return (
    <section id="servicio" className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
            Cómo trabajamos en tu gran día
          </h2>
          <p className="font-inter text-lg text-primary-600 max-w-3xl mx-auto">
            Preparamos una propuesta a medida según vuestra agenda y localización.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-accent-600" />
              </div>
              
              <h3 className="font-inter font-semibold text-primary-900 mb-3 leading-tight">
                {service.title}
              </h3>
              
              <p className="font-inter text-primary-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-primary-900 mb-4">
              Propuesta personalizada
            </h3>
            <p className="font-inter text-primary-600 mb-6">
              Cada boda es única. Por eso no mostramos precios fijos. Preferimos conocer 
              vuestros planes y crear una propuesta que se adapte perfectamente a vuestra 
              celebración.
            </p>
            <button
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Solicitar propuesta
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}