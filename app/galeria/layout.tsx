import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Galería Completa - Citroën DS 23 Pallas 'Tiburón' para bodas",
  description: "Descubre todas las fotos de nuestro Citroën DS 23 Pallas 'Tiburón' en bodas reales. Momentos únicos e inolvidables capturados con elegancia en Madrid.",
  keywords: ['galería fotos boda', 'citroën ds fotos', 'coche boda madrid', 'ds 23 pallas galería', 'fotos bodas elegantes'],
  openGraph: {
    title: "Galería Completa - Citroën DS 23 Pallas 'Tiburón' para bodas",
    description: "Descubre todas las fotos de nuestro Citroën DS 23 Pallas 'Tiburón' en bodas reales",
    type: 'website',
    locale: 'es_ES',
    url: 'https://bodas-citroen-ds.vercel.app/galeria',
    siteName: "Bodas Citroën DS",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Galería Completa - Citroën DS 23 Pallas 'Tiburón' para bodas",
    description: "Descubre todas las fotos de nuestro Citroën DS 23 Pallas 'Tiburón' en bodas reales",
  },
  alternates: {
    canonical: 'https://bodas-citroen-ds.vercel.app/galeria',
  },
}

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}