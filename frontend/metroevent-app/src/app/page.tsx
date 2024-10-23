import Image from 'next/image'
import backimg1 from '../../components/img/backimg1.png'
import backimg2 from '../../components/img/backimg2.png'
import backimg3 from '../../components/img/backimg3.png'

export default function Page() {
  // Array de imágenes importadas
  const backgroundImages = [
    backimg1,
    backimg2,
    backimg3,
  ]

  return (
    <div className="relative min-h-screen">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-screen bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image.src})`,
            top: `${index * 100}vh`,
            backgroundSize: '100% 75%', // Puedes cambiar esto a 'contain', '50%', '100px 200px', etc.
            backgroundPosition: 'top', // Puedes ajustar esto según necesites
          }}
        />
      ))}
      <div className="relative z-10 flex flex-col gap-8 items-center justify-start min-h-screen">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-2xl w-full mx-4">
          <h1 className="text-4xl font-bold mb-6">Título Principal</h1>
          <p className="text-lg mb-4">
            Este es el contenido principal que se muestra sobre todas las imágenes de fondo.
            Puedes desplazarte hacia abajo para ver cómo cambia el fondo mientras este contenido
            permanece en su lugar.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Botón de Acción
          </button>
        </div>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-2xl w-full mx-4">
        </div>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-2xl w-full mx-4">
        </div>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg max-w-2xl w-full mx-4">
        </div>
      </div>
    </div>
  )
}