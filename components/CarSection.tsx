'use client'

import { motion } from 'framer-motion'
import { SparklesIcon, CameraIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function CarSection() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'Elegancia atemporal',
      description: 'Un diseño clásico que nunca pasa de moda y llama la atención donde vaya.'
    },
    {
      icon: CameraIcon,
      title: 'Espectacular en fotos',
      description: 'Su línea única y estilo icónico crea imágenes inolvidables para vuestro álbum.'
    },
    {
      icon: ClockIcon,
      title: 'Cuidado con mimo',
      description: 'Mantenimiento impecable para que llegue perfecto el día de vuestra boda.'
    }
  ]

  return (
    <section id="el-coche" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              Un icono elegante y atemporal
            </h2>
            
            <p className="font-inter text-lg text-primary-600 mb-8 leading-relaxed">
              Nuestro Citroën DS 23 Pallas 'Tiburón' está cuidado con mimo para que llegue 
              impecable el día de la boda. Su diseño clásico llama la atención y luce 
              espectacular en las fotografías.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 bg-accent-100 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-primary-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-primary-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image placeholder or car details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 lg:p-12"
          >
            <div className="text-center">
              <h3 className="font-playfair text-2xl font-bold text-primary-900 mb-6">
                Citroën DS 23 Pallas
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between border-b border-primary-200 pb-2">
                  <span className="font-inter font-medium text-primary-700">Año:</span>
                  <span className="font-inter text-primary-900">Clásico</span>
                </div>
                
                <div className="flex justify-between border-b border-primary-200 pb-2">
                  <span className="font-inter font-medium text-primary-700">Apodo:</span>
                  <span className="font-inter text-primary-900">'Tiburón'</span>
                </div>
                
                <div className="flex justify-between border-b border-primary-200 pb-2">
                  <span className="font-inter font-medium text-primary-700">Estado:</span>
                  <span className="font-inter text-primary-900">Impecable</span>
                </div>
                
                <div className="flex justify-between border-b border-primary-200 pb-2">
                  <span className="font-inter font-medium text-primary-700">Servicio:</span>
                  <span className="font-inter text-primary-900">Con chófer</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-inter font-medium text-primary-700">Zona:</span>
                  <span className="font-inter text-primary-900">Madrid y alrededores</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <p className="font-inter text-sm text-primary-600 italic">
                  "Un coche que cuenta historias y crea recuerdos únicos"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}