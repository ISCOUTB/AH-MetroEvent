

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import backimg1 from '../../../components/img/backimg1.png'
import backimg2 from '../../../components/img/backimg2.png'
import backimg3 from '../../../components/img/backimg3.png'
import logo from '../../../components/img/logoM.png'
import musica from '../../../components/img/musica.png'
import arte from '../../../components/img/arte.png'
import vidanoc from '../../../components/img/vidanoc.png'
import negocios from '../../../components/img/negocios.png'
import conferencia from '../../../components/img/conferencia.png'
import comida from '../../../components/img/comida.png'
import deportivo from '../../../components/img/deportivo.png'
import sociales from '../../../components/img/sociales.png'

interface Event {
  event_id: number
  title: string
  description: string
  location: string
  city: string
  event_category: string
  start_date: string
  end_date: string
  organizer_id: number
  attendees: number
}

interface User {
  username: string
}

function Homeu() {
  const [popularEvents, setPopularEvents] = useState<Event[]>([])
  const [newEvents, setNewEvents] = useState<Event[]>([])
  const [organizers, setOrganizers] = useState<{ [key: number]: User }>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('title')
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8020/events/');
        const events: Event[] = await response.json();
  
        const sortedByAttendees = [...events].sort((a, b) => b.attendees - a.attendees);
        const sortedByDate = [...events].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  
        const popular = sortedByAttendees.filter(event => event.attendees > 5).slice(0, 4);
        const recent = sortedByDate.slice(0, 4);
  
        setPopularEvents(popular);
        setNewEvents(recent);
  
        const organizerIds = Array.from(new Set([...popular, ...recent].map(event => event.organizer_id)));
        
        const organizerPromises = organizerIds.map(async (id) => {
          const userResponse = await fetch(`http://localhost:8020/auth/user/${id}`);
          const userData: User = await userResponse.json();
          return { id, username: userData.username };
        });
  
        const organizersData = await Promise.all(organizerPromises);
        
        const organizersMap = organizersData.reduce((acc, { id, username }) => {
          acc[id] = { username };
          return acc;
        }, {} as { [key: number]: User });
        
        setOrganizers(organizersMap);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents()
  }, [])

  const backgroundImages = [
    { id: "img1", src: backimg1 },
    { id: "img2", src: backimg2 },
    { id: "img3", src: backimg3 },
  ]

  const categorias = [
    { id: 1, nombre: "Música", img: musica },
    { id: 2, nombre: "Artes", img: arte },
    { id: 3, nombre: "Vida Nocturna", img: vidanoc },
    { id: 4, nombre: "Negocios", img: negocios },
    { id: 5, nombre: "Conferencias y charlas", img: conferencia },
    { id: 6, nombre: "Comida y Bebidas", img: comida },
    { id: 7, nombre: "Deportivo", img: deportivo },
    { id: 8, nombre: "Sociales", img: sociales },
  ]

  const EventCard = ({ event }: { event: Event })=>(
    <button
      onClick={() => router.push(`/event/${event.event_id}`)}
      className='w-[27vw] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col hover:shadow-lg transition-shadow duration-300'
    >
      <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
        <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
        <span className="ml-2">{organizers[event.organizer_id]?.username || 'Loading...'}</span>
      </div>
      <div className='w-full h-[48%]' style={{ height: '48%' }}>
       
      </div>
      <div className='h-[13%] flex items-center justify-start text-black mx-4 text-[1.2vw]'>
        {event.title}
      </div>
      <div className='h-[13%] flex items-center justify-start text-black mx-4 text-[1.2vw]'>
        {event.city}
      </div>
      <div className='h-[13%] flex items-center justify-start text-black mx-4 text-[1.2vw]'>
        {new Date(event.start_date).toLocaleString()}
      </div>
    </button>
  )

  return (
    <div className="relative w-full">
      {backgroundImages.map((image) => (
        <div
          key={image.id}
          className="w-full h-[85vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${image.src.src})`,
          }}
        />
      ))}

      <div className="pt-9 absolute top-0 left-0 w-full flex flex-col items-center justify-start min-h-screen gap-24">
      <div className="bg-white p-[0.5vw] rounded-2xl w-[95vw] flex gap-8 h-[12] items-center">
          <Image className="ml-4 my-3 w-[10vw] h-[5vw]" src={logo} alt="Logo" priority />
          <div className="flex gap-4 items-center">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="rounded-3xl border-4 border-black items-center justify-center flex w-[18vw] text-black h-[7vh] px-4"
            >
              <option value="title">Evento</option>
              <option value="city">Ciudad</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchType === 'title' ? 'Buscar evento' : 'Buscar ciudad'}
              className="rounded-3xl border-4 border-black items-center justify-center flex w-[26vw] text-black h-[7vh] px-4"
            />
            <button
              onClick={() => router.push(`/search?type=${searchType}&query=${encodeURIComponent(searchQuery)}`)}
              className=" ml-4 rounded-2xl bg-[#7101FF] border-black items-center justify-center flex w-[4vw] text-white h-[7vh] cursor-pointer oxygen-bold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </div>
          <Link href="/new" passHref>
            <div className="rounded-2xl bg-[#7101FF] border-black items-center justify-center flex w-[18vw] text-white h-[7vh] cursor-pointer oxygen-bold">
              CREAR EVENTO
            </div>
          </Link>
          <div className="relative">
            <button onClick={toggleMenu} className="w-[5vw] h-[5vw] rounded-full bg-gray-300 flex items-center justify-center">
              <Image src={logo} alt="Usuario" width={50} height={50} className="rounded-full" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuración</Link>
                <Link href="/my-events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mis Eventos</Link>
                <button onClick={() => {/* Lógica para cerrar sesión */}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
        <div className='w-[75vw] h-[30vh] flex-col items-center text-white text-[5vw] protest-strike-regular'>
          <div>
            Descubre y&nbsp;<span className="text-[#7101FF]">crea</span>&nbsp;momentos
          </div>
          <div>
            inolvidables
          </div>
        </div>

        <div className='w-[75vw] bg-white rounded-lg p-4'>
          <div className='flex justify-between items-center mx-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Categorías
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 justify-center justify-items-center oxygen-regular text-black pt-4'>
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => router.push(`/search?category=${encodeURIComponent(categoria.nombre)}`)}
                className="w-[17vw] h-[15vh] rounded-lg bg-white border-2 border-[#979797] hover:bg-[#7101FF] hover:border-black transition-colors duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-center">{categoria.nombre}</div>
                <Image
                  src={categoria.img.src}
                  alt={categoria.nombre}
                  width={50}
                  height={50}
                  className="mt-2"
                />
              </button>
            ))}
          </div>

          <div className='flex justify-between items-center mx-4 py-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Populares
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              
            </div>
          </div>
          <div className='flex mx-2 gap-4 overflow-x-auto'>
            {popularEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>

          <div className='flex justify-between items-center mx-4 py-4'>
            <div className='text-black text-[2vw] oxygen-bold'>
              Nuevos eventos
            </div>
            <div className='text-black oxygen-regular text-[1vw]'>
              
            </div>
          </div>
          <div className='flex mx-2 gap-4 overflow-x-auto'>
            {newEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homeu
