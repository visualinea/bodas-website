export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="text-center">
        <h1 className="font-playfair text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="font-inter text-2xl font-semibold text-primary-700 mb-6">
          Página no encontrada
        </h2>
        <p className="font-inter text-primary-600 mb-8">
          La página que buscas no existe. Regresa a la página principal para ver nuestro servicio.
        </p>
        <a
          href="/"
          className="bg-accent-500 hover:bg-accent-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}