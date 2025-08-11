'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface Photo {
  filename: string
  width: number
  height: number
  orientation: 'horizontal' | 'vertical'
  alt?: string
}

interface GalleryProps {
  photos: Photo[]
  showAllPhotosLink?: boolean
}

export default function Gallery({ photos, showAllPhotosLink = true }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [imageLoadStates, setImageLoadStates] = useState<{ [key: string]: boolean }>({})

  const handleImageLoad = useCallback((filename: string) => {
    setImageLoadStates(prev => ({ ...prev, [filename]: true }))
  }, [])

  // Preload all images when component mounts
  useEffect(() => {
    const preloadImages = () => {
      photos.forEach((photo, index) => {
        const img = document.createElement('img')
        img.onload = () => handleImageLoad(photo.filename)
        img.src = `/photos/${photo.filename}`
        
        // For high priority images, also decode them
        if (index < 8) {
          img.decode().catch(() => {
            // Silent fail - image will still load normally
          })
        }
      })
    }

    if (photos.length > 0) {
      // Start preloading after a short delay to not block initial render
      const timer = setTimeout(preloadImages, 100)
      return () => clearTimeout(timer)
    }
  }, [photos, handleImageLoad])

  const openLightbox = (index: number) => {
    setSelectedPhoto(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'unset'
  }

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1)
    }
  }

  // Keyboard navigation and touch events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          nextPhoto()
          break
        case 'ArrowLeft':
          prevPhoto()
          break
      }
    }

    if (selectedPhoto !== null) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto])

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextPhoto()
    } else if (isRightSwipe) {
      prevPhoto()
    }
  }

  return (
    <section id="galeria" className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Galería
          </h2>
          <p className="font-inter text-lg text-primary-600 max-w-2xl mx-auto mb-6">
            Deja que las fotos hablen por sí solas.
          </p>
          
          {showAllPhotosLink && (
            <Link 
              href="/galeria"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Ver galería completa</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.filename}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="relative cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openLightbox(index)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
                aria-label={`Ver foto ${index + 1} en tamaño completo`}
              >
                {!imageLoadStates[photo.filename] && (
                  <div className="absolute inset-0 bg-primary-200 animate-pulse rounded-lg" 
                       style={{ aspectRatio: `${photo.width}/${photo.height}` }} />
                )}
                
                <Image
                  src={`/photos/${photo.filename}`}
                  alt={photo.alt || `Citroën DS 23 Pallas Tiburón en boda — foto ${index + 1} (${photo.orientation})`}
                  width={photo.width}
                  height={photo.height}
                  className={`w-full h-auto transition-all duration-300 group-hover:scale-105 ${
                    imageLoadStates[photo.filename] ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  priority={index < 8}
                  onLoad={() => handleImageLoad(photo.filename)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  draggable={false}
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Overlay with zoom indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                    <svg className="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={`/photos/${photos[selectedPhoto].filename}`}
                alt={photos[selectedPhoto].alt || `Citroën DS 23 Pallas Tiburón en boda — foto ${selectedPhoto + 1}`}
                width={photos[selectedPhoto].width}
                height={photos[selectedPhoto].height}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
                quality={95}
              />

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label="Cerrar galería"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* Navigation buttons - hide on very small screens */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm hidden sm:block"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeftIcon className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm hidden sm:block"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Photo counter and mobile navigation hints */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="text-center">
                  <div className="font-semibold">
                    {selectedPhoto + 1} de {photos.length}
                  </div>
                  {photos.length > 1 && (
                    <div className="text-xs mt-1 opacity-75 sm:hidden">
                      Desliza para navegar
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile swipe indicators */}
              {photos.length > 1 && (
                <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-center sm:hidden">
                  <div className="opacity-0 hover:opacity-100 bg-gradient-to-r from-black/20 to-transparent h-full w-full flex items-center justify-start pl-4">
                    <ChevronLeftIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              
              {photos.length > 1 && (
                <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-center sm:hidden">
                  <div className="opacity-0 hover:opacity-100 bg-gradient-to-l from-black/20 to-transparent h-full w-full flex items-center justify-end pr-4">
                    <ChevronRightIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}