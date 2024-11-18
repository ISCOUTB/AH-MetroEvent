'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react'

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

export default function EventDetails() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:8020/events/${id}`)
          if (!response.ok) throw new Error('Failed to fetch event details')
          const data = await response.json()
          setEvent(data)
        } catch (error) {
          console.error('Error fetching event details:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchEventDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
        <div className="text-white text-2xl font-bold">Loading event details...</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
        <div className="text-white text-2xl font-bold">Event not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative h-64 bg-indigo-600">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center px-4">{event.title}</h1>
          </div>
        </div>
        
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <p className="text-gray-600">{event.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Calendar className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-semibold">Start Date</p>
                <p>{new Date(event.start_date).toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Clock className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-semibold">End Date</p>
                <p>{new Date(event.end_date).toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <MapPin className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-semibold">Location</p>
                <p>{event.location}, {event.city}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Tag className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-semibold">Category</p>
                <p>{event.event_category}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Users className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-semibold">Attendees</p>
                <p>{event.attendees}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8"
          >
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300">
              Register for Event
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}