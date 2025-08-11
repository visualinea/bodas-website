'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface FormData {
  name: string
  email: string
  phone: string
  eventDate: string
  location: string
  route: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission - replace with actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
            Cuéntanos vuestra fecha
          </h2>
          <p className="font-inter text-lg text-primary-600 max-w-2xl mx-auto">
            Te respondemos rápido con una propuesta a medida (sin compromiso).
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-playfair text-2xl font-bold text-primary-900 mb-6">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-full">
                    <PhoneIcon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary-900 mb-1">
                      WhatsApp
                    </h4>
                    <p className="font-inter text-primary-600">
                      +34 669 772 166
                    </p>
                    <button
                      onClick={() => {
                        const message = "Hola, me interesa el Citroën DS 23 Pallas para nuestra boda. Fecha: ____ Ubicación: ____"
                        const encodedMessage = encodeURIComponent(message)
                        window.open(`https://wa.me/34669772166?text=${encodedMessage}`, '_blank')
                      }}
                      className="text-accent-600 hover:text-accent-700 font-medium text-sm mt-1"
                    >
                      Enviar mensaje →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-full">
                    <MapPinIcon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary-900 mb-1">
                      Área de servicio
                    </h4>
                    <p className="font-inter text-primary-600">
                      Madrid y alrededores<br />
                      Comunidad de Madrid
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 p-3 rounded-full">
                    <CalendarDaysIcon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary-900 mb-1">
                      Disponibilidad
                    </h4>
                    <p className="font-inter text-primary-600">
                      Consulta tu fecha<br />
                      Respuesta en 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h4 className="font-inter font-semibold text-primary-900 mb-3">
                ¿Por qué no mostramos precios?
              </h4>
              <p className="font-inter text-primary-600 text-sm leading-relaxed">
                Cada boda es única y tiene necesidades diferentes. Horarios, ubicaciones, 
                tiempo de servicio... Todo influye. Preferimos conocer vuestros planes 
                para crear una propuesta que se ajuste perfectamente a vuestra celebración.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-inter font-medium text-primary-900 mb-2">
                    Nombre *
                  </label>
                  <input
                    {...register('name', { required: 'El nombre es obligatorio' })}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                    placeholder="Vuestros nombres"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-inter font-medium text-primary-900 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email no válido'
                      }
                    })}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block font-inter font-medium text-primary-900 mb-2">
                    Teléfono
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                    placeholder="600 123 456"
                  />
                </div>

                <div>
                  <label htmlFor="eventDate" className="block font-inter font-medium text-primary-900 mb-2">
                    Fecha del evento *
                  </label>
                  <input
                    {...register('eventDate', { required: 'La fecha es obligatoria' })}
                    type="date"
                    id="eventDate"
                    className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                  />
                  {errors.eventDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="location" className="block font-inter font-medium text-primary-900 mb-2">
                  Localización (recogida/ceremonia) *
                </label>
                <input
                  {...register('location', { required: 'La localización es obligatoria' })}
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                  placeholder="Ej: Desde hotel en Chamberí hasta iglesia en Retiro"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="route" className="block font-inter font-medium text-primary-900 mb-2">
                  Detalles del recorrido
                </label>
                <input
                  {...register('route')}
                  type="text"
                  id="route"
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200"
                  placeholder="Horarios, paradas adicionales, tiempo para fotos..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block font-inter font-medium text-primary-900 mb-2">
                  Mensaje
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200 resize-vertical"
                  placeholder="Contadnos más detalles sobre vuestra boda..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                >
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <p className="font-inter text-green-800">
                    ¡Gracias! Te contactamos en breve.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
                >
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  <p className="font-inter text-red-800">
                    Error al enviar. Inténtalo de nuevo o contáctanos por WhatsApp.
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-accent-500 hover:bg-accent-600 disabled:bg-primary-300 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar propuesta'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}