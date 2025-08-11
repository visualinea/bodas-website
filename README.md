# 🚗 Citroën DS 23 Pallas 'Tiburón' - Landing Page para Bodas

Landing page de alto rendimiento para un servicio de alquiler de coche clásico para bodas en Madrid. Construida con Next.js 14, TypeScript, Tailwind CSS y Framer Motion.

## ✨ Características principales

- **Diseño elegante y moderno** con fotografía de alta calidad
- **Galería masonry responsiva** con lightbox interactivo
- **Optimización de imágenes automática** (AVIF/WebP)
- **Formulario de contacto** con validación y envío
- **Botón flotante de WhatsApp** con mensaje pre-rellenado
- **SEO completo** con JSON-LD, Open Graph y meta tags
- **Accesibilidad AA** con navegación por teclado y ARIA
- **Rendimiento optimizado** (objetivo: Lighthouse 95+)
- **Animaciones sutiles** con Framer Motion

## 🚀 Inicio rápido

### 1. Instalación

```bash
# Instalar dependencias
npm install

# Procesar fotos y generar manifest
npm run process-photos

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Configuración de fotos

Las fotos deben estar en la carpeta `/photos` en la raíz del proyecto:

```
/Users/david/Documents/Dynatec/Dynatec/bodas/photos/
```

El script `process-photos.js` automáticamente:
- Copia todas las fotos `.jpeg` a `public/photos/`
- Genera metadatos (dimensiones, orientación, fechas)
- Crea `photos.manifest.json` para la galería
- Optimiza el orden por fecha de creación

### 3. Variables de entorno

Copia `env.example` a `.env.local` y configura:

```env
# WhatsApp (obligatorio)
WHATSAPP_NUMBER=34669772166

# Email (opcional)
CONTACT_EMAIL=tu-email@ejemplo.com

# CRM (opcional)  
CRM_WEBHOOK_URL=https://tu-crm.com/webhook

# Analytics (opcional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 📱 Funcionalidades

### Hero Section
- Imagen de fondo automática (primera foto horizontal)
- Botones de CTA principales
- Animaciones de entrada

### Galería
- Layout masonry responsivo
- Lazy loading con placeholders blur
- Lightbox con navegación por teclado
- Zoom y swipe en móvil
- Alt text automático

### Formulario de contacto
- Validación client-side y server-side
- Campos: nombre, email, teléfono, fecha, ubicación
- Estado de envío con feedback visual
- API endpoint en `/api/contact`

### WhatsApp
- Botón flotante que aparece al hacer scroll
- Mensaje pre-rellenado personalizable
- Tooltip informativo

## 🛠 Desarrollo

### Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run process-photos # Procesar fotos y generar manifest
```

### Estructura del proyecto

```
├── app/                 # Next.js App Router
│   ├── api/contact/     # API endpoint del formulario
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal con SEO
│   ├── page.tsx         # Página principal
│   └── sitemap.ts       # Sitemap automático
├── components/          # Componentes React
│   ├── Hero.tsx         # Sección hero
│   ├── Gallery.tsx      # Galería masonry
│   ├── ContactForm.tsx  # Formulario de contacto
│   ├── WhatsAppFloat.tsx # Botón flotante
│   └── ...
├── photos/              # Fotos originales (no versionadas)
├── public/              # Archivos estáticos
│   ├── photos/          # Fotos procesadas
│   └── photos.manifest.json # Metadatos de fotos
└── scripts/             # Utilidades
    └── process-photos.js # Procesador de imágenes
```

## 📸 Gestión de fotos

### Añadir nuevas fotos

1. Coloca archivos `.jpeg` en `/photos`
2. Ejecuta `npm run process-photos`
3. Las fotos aparecerán automáticamente en la galería

### Metadatos automáticos

Cada foto incluye:
- Dimensiones (ancho/alto)
- Orientación (horizontal/vertical)  
- Tamaño de archivo
- Fechas de creación/modificación
- Alt text descriptivo

### Optimización

- Next.js genera automáticamente AVIF/WebP
- Lazy loading para todas las imágenes
- Placeholders blur durante la carga
- Prioridad alta para imagen hero

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para cambiar la paleta:

```js
colors: {
  primary: { /* Grises principales */ },
  accent: { /* Dorados/amarillos */ }
}
```

### Tipografías
- **Títulos**: Playfair Display (serif)
- **Texto**: Inter (sans-serif)

### Animaciones
Configurables en `globals.css` y componentes con Framer Motion.

## 🔧 Integración CRM

El formulario está preparado para integrar con CRMs:

```js
// En app/api/contact/route.ts
if (process.env.CRM_WEBHOOK_URL) {
  await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}
```

Compatible con Pipedrive, HubSpot, etc.

## 📊 Analytics y SEO

### SEO incluido
- Meta tags optimizados
- Open Graph y Twitter Cards
- JSON-LD structured data
- Sitemap automático
- Robots.txt

### Performance
- Next.js Image optimization
- Code splitting automático
- Preload de recursos críticos
- Lazy loading de componentes

## 🚀 Despliegue

### Vercel (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Configurar proyecto
vercel

# Desplegar
vercel --prod
```

### Variables en producción

Configura en tu plataforma:
- `WHATSAPP_NUMBER`
- `CONTACT_EMAIL` (opcional)
- `CRM_WEBHOOK_URL` (opcional)

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch optimizado para galería y navegación
- Botones y áreas de toque accesibles

## ♿ Accesibilidad

- Navegación por teclado completa
- ARIA labels y roles
- Contraste AA compliant
- Focus visible
- Screen reader friendly

## 🧪 Testing

### Lighthouse scores objetivo
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

### Test manual
- [ ] Galería funciona en móvil/desktop
- [ ] Formulario envía correctamente
- [ ] WhatsApp abre con mensaje correcto
- [ ] Navegación smooth scroll
- [ ] Imágenes cargan con lazy loading

## 📞 Soporte

Para preguntas sobre implementación o personalización, consulta la documentación de Next.js 14 y Tailwind CSS.

## 📄 Licencia

Proyecto privado para Bodas Citroën DS.

---

*Construido con ❤️ para bodas inolvidables*