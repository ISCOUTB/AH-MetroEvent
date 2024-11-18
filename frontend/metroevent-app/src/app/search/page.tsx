'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '../../../components/img/logoM.png'

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

function SearchResultsContent() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const category = searchParams.get('category')
  const query = searchParams.get('query')
  const searchType = searchParams.get('type')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        let url = 'http://localhost:8020/events'
        if (category) {
          url += `/category/${category}`
        } else if (query) {
          url += `/a/search?${searchType}=${query}`
        }
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [category, query, searchType])

  const EventCard = ({ event }: { event: Event }) => (
    <button
      onClick={() => router.push(`/event/${event.event_id}`)}
      className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] h-[50vh] rounded-xl bg-white border-2 border-[#979797] oxygen-bold flex flex-col hover:shadow-lg transition-shadow duration-300 mb-4'
    >
      <div className='flex items-center h-[13%] p-2 text-black text-[1.2vw]'>
        <Image src={logo} alt="Usuario" width={30} height={30} className="rounded-full bg-white" />
        <span className="ml-2">Organizer</span>
      </div>
      <div className='w-full h-[48%] relative'>
        <Image src="/placeholder.svg?height=200&width=400" alt="Imagen del Evento" layout="fill" objectFit="cover" />
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
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        {category ? `Events in ${category}` : `Search Results for "${query}"`}
      </h1>
      {loading ? (
        <div className="text-center text-xl">Loading events...</div>
      ) : events.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl">No events found.</div>
      )}
    </div>
  )
}

export default function SearchResults() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8">
      <Suspense fallback={<div className="text-center text-xl text-white">Loading search results...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  )
}