"use client";

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

function Crear() {
  const [imagenPreview, setImagenPreview] = useState<string | null>(null)

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Crear Nuevo Evento</h1>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
                Imagen del Evento
              </Label>
              <div className="flex items-center justify-center">
                <label htmlFor="imagen" className="cursor-pointer">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors">
                    {imagenPreview ? (
                      <img src={imagenPreview} alt="Vista previa" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </label>
                <input id="imagen" type="file" accept="image/*" className="hidden" onChange={handleImagenChange} />
              </div>
            </div>

            <div>
              <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre del Evento
              </Label>
              <Input type="text" id="nombre" placeholder="Ej: Concierto de Rock" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                Ciudad
              </Label>
              <Input type="text" id="ciudad" placeholder="Ej: Barcelona" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
                Ubicación Exacta
              </Label>
              <Input type="text" id="ubicacion" placeholder="Ej: Palau Sant Jordi, Passeig Olímpic, 5-7" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                Fecha y Hora
              </Label>
              <div className="mt-1 relative">
                <Input type="datetime-local" id="fecha" className="pl-10" />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción del Evento
              </Label>
              <Textarea id="descripcion" placeholder="Describe tu evento aquí..." className="mt-1" rows={4} />
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
              Crear Evento
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Crear;