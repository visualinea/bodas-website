'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ShareButton from '@/components/ShareButton'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

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

export default function GaleriaPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Force scroll to top on component mount
  useEffect(() => {
    // Override scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Multiple methods to ensure scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Also try after a tiny delay in case of timing issues
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 10)
  }, [])

  useEffect(() => {
    // Load photos manifest
    fetch('/photos.manifest.json')
      .then(res => res.json())
      .then((manifest: Photo[]) => {
        // Add alt text to photos
        const photosWithAlt = manifest.map((photo, index) => ({
          ...photo,
          alt: `Citroën DS 23 Pallas Tiburón en boda — foto ${index + 1} (${photo.orientation})`
        }))
        
        setPhotos(photosWithAlt)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error loading photos manifest:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="font-inter text-primary-600">Cargando galería...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      
      {/* Header */}
      <div className="bg-white pt-20 lg:pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-black font-medium"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-inter">Volver al inicio</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
                Galería Completa
              </h1>
              <p className="font-inter text-lg text-primary-600 max-w-2xl">
                Descubre todas las fotos de nuestro Citroën DS 23 Pallas 'Tiburón' en bodas. 
                Cada imagen cuenta la historia de momentos únicos e inolvidables.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <ShareButton 
                text="Mira estas increíbles fotos del Citroën DS 23 Pallas 'Tiburón' para bodas en Madrid"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="bg-primary-50">
        <Gallery photos={photos} showAllPhotosLink={false} />
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </>
  )
}