/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel deployment and prevent micromatch stack overflow
  swcMinify: true,
  compress: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    // Critical: Reduce file tracing to prevent stack overflow
    outputFileTracingRoot: process.cwd(),
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/**',
        'node_modules/@esbuild/**', 
        'node_modules/@next/swc-*/**',
        'node_modules/sharp/vendor/**',
        'photos/**',
        '.git/**',
        '**/*.md',
        '**/*.map',
        'scripts/**',
        '.vercel/**',
        '.next/cache/**',
      ],
    },
    // Disable some experimental features that may cause issues
    optimizePackageImports: ['framer-motion'],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Reduce bundle complexity to prevent tracing issues
    if (!dev && isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          maxSize: 244 * 1024, // 244kb max chunk size
          cacheGroups: {
            default: false,
            vendors: false,
            // Group all vendor dependencies
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10,
            },
          },
        },
      }
    }
    
    // Exclude problematic modules from bundling
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        'sharp': 'commonjs sharp',
        'canvas': 'commonjs canvas',
      })
    }
    
    return config
  },
  
  async headers() {
    return [
      {
        source: '/photos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig