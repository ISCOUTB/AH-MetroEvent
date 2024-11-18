"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function Crear() {
  const router = useRouter();
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    city: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8020/events/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    fetchCategories();

    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("Usuario no autenticado: no se encontró user_id.");
    }
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) {
      console.error("No se puede crear el evento sin un user_id.");
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      city: formData.city,
      event_category: selectedCategory,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      organizer_id: parseInt(userId),
      attendees: 0,
    };

    try {
      const response = await fetch("http://localhost:8020/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el evento");
      }

      const data = await response.json();
      console.log("Evento creado exitosamente:", data);
      
      // Show success message
     

      // Redirect to home page
      router.push('/homeu');
    } catch (error) {
      console.error("Error al enviar los datos del evento:", error);
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
            Crear Nuevo Evento
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Nombre del Evento
              </Label>
              <Input type="text" id="title" placeholder="Ej: Concierto de Rock" className="mt-1" value={formData.title} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Ciudad
              </Label>
              <Input type="text" id="city" placeholder="Ej: Barcelona" className="mt-1" value={formData.city} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Ubicación Exacta
              </Label>
              <Input type="text" id="location" placeholder="Ej: Palau Sant Jordi, Passeig Olímpic, 5-7" className="mt-1" value={formData.location} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                Categoría
              </Label>
              <select
                id="categoria"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </Label>
              <Input type="datetime-local" id="start_date" className="mt-1" value={formData.start_date} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                Fecha de Fin
              </Label>
              <Input type="datetime-local" id="end_date" className="mt-1" value={formData.end_date} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción del Evento
              </Label>
              <Textarea id="description" placeholder="Describe tu evento aquí..." className="mt-1" rows={4} value={formData.description} onChange={handleInputChange} />
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
              Crear Evento
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Crear;