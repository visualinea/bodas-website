'use client'

import { useState } from 'react'
import { ShareIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ShareButtonProps {
  url?: string
  title?: string
  text?: string
}

export default function ShareButton({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = "Citroën DS 23 Pallas 'Tiburón' para bodas",
  text = "Mira estas increíbles fotos del Citroën DS 23 Pallas 'Tiburón' para bodas"
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    // Check if Web Share API is available (mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackCopyToClipboard()
      }
    } else {
      fallbackCopyToClipboard()
    }
  }

  const fallbackCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        copied 
          ? 'bg-green-100 text-green-700 border border-green-200' 
          : 'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50'
      }`}
      aria-label="Compartir galería"
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" />
          <span className="text-sm font-medium">¡Copiado!</span>
        </>
      ) : (
        <>
          <ShareIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Compartir</span>
        </>
      )}
    </button>
  )
}