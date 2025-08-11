interface Photo {
  filename: string
  width: number
  height: number
  orientation: 'horizontal' | 'vertical'
}

class ImagePreloader {
  private static instance: ImagePreloader
  private preloadedImages: Set<string> = new Set()
  private loadingImages: Map<string, Promise<void>> = new Map()

  static getInstance(): ImagePreloader {
    if (!ImagePreloader.instance) {
      ImagePreloader.instance = new ImagePreloader()
    }
    return ImagePreloader.instance
  }

  async preloadImage(src: string): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve()
    }

    if (this.loadingImages.has(src)) {
      return this.loadingImages.get(src)!
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = document.createElement('img')
      
      img.onload = () => {
        this.preloadedImages.add(src)
        this.loadingImages.delete(src)
        resolve()
      }
      
      img.onerror = () => {
        this.loadingImages.delete(src)
        reject(new Error(`Failed to load image: ${src}`))
      }
      
      img.src = src
    })

    this.loadingImages.set(src, promise)
    return promise
  }

  async preloadPhotos(photos: Photo[], batchSize: number = 4): Promise<void> {
    // Process photos in batches to avoid overwhelming the browser
    for (let i = 0; i < photos.length; i += batchSize) {
      const batch = photos.slice(i, i + batchSize)
      const promises = batch.map(photo => 
        this.preloadImage(`/photos/${photo.filename}`)
          .catch(error => {
            console.warn(`Failed to preload image: ${photo.filename}`, error)
          })
      )
      
      await Promise.all(promises)
      
      // Small delay between batches to keep the UI responsive
      if (i + batchSize < photos.length) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
  }

  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src)
  }
}

export default ImagePreloader