'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import CarSection from '@/components/CarSection'
import ServiceSection from '@/components/ServiceSection'
import Gallery from '@/components/Gallery'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ImagePreloader from '@/utils/imagePreloader'

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

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [heroImage, setHeroImage] = useState<Photo | null>(null)

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
        
        // Select specific hero image
        const heroCandidate = photosWithAlt.find(photo => photo.filename === 'WhatsApp Image 2025-08-06 at 14.09.44 (4).jpeg') || 
                             photosWithAlt.find(photo => photo.orientation === 'horizontal') || 
                             photosWithAlt[0]
        if (heroCandidate) {
          setHeroImage({
            ...heroCandidate,
            alt: 'Citroën DS 23 Pallas Tiburón — coche de boda elegante y atemporal'
          })
        }

        // Start preloading all images immediately
        const preloader = ImagePreloader.getInstance()
        preloader.preloadPhotos(photosWithAlt, 6).catch(error => {
          console.warn('Some images failed to preload:', error)
        })
      })
      .catch(error => {
        console.error('Error loading photos manifest:', error)
      })
  }, [])

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1) // Remove #
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100) // Small delay to ensure page is loaded
      }
    }

    // Handle initial hash
    handleHashNavigation()

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    return () => window.removeEventListener('hashchange', handleHashNavigation)
  }, [])

  return (
    <>
      <Navigation />
      <main>
        <section id="hero">
          <Hero heroImage={heroImage} />
        </section>
        <CarSection />
        <ServiceSection />
        <Gallery photos={photos} />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}