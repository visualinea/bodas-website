import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Citroën DS 23 Pallas 'Tiburón' para bodas en Madrid | Con chófer",
  description: "Un clásico elegante y atemporal para vuestro gran día. Servicio con chófer, recogida, trayecto y fotos con el coche. Madrid y alrededores. Consultad disponibilidad.",
  keywords: ['citroën ds', 'coche boda', 'alquiler coche boda madrid', 'ds 23 pallas', 'tiburón', 'chófer boda'],
  authors: [{ name: 'Bodas Citroën DS' }],
  openGraph: {
    title: "Citroën DS 23 Pallas 'Tiburón' para bodas en Madrid",
    description: "Un clásico elegante y atemporal para vuestro gran día. Servicio con chófer en Madrid y alrededores.",
    type: 'website',
    locale: 'es_ES',
    url: 'https://bodas-citroen-ds.vercel.app',
    siteName: "Bodas Citroën DS",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Citroën DS 23 Pallas Tiburón para bodas",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Citroën DS 23 Pallas 'Tiburón' para bodas en Madrid",
    description: "Un clásico elegante y atemporal para vuestro gran día. Servicio con chófer en Madrid y alrededores.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: "Bodas Citroën DS 23 Pallas",
    description: "Servicio de alquiler con chófer de Citroën DS 23 Pallas 'Tiburón' para bodas en Madrid y alrededores",
    url: 'https://bodas-citroen-ds.vercel.app',
    telephone: '+34669772166',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Madrid',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
    },
    serviceType: 'Alquiler de coche con chófer para bodas',
    priceRange: 'Consultar',
  }

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://bodas-citroen-ds.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}