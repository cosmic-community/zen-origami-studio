'use client'

import { useState, useEffect } from 'react'
import { OrigamiTutorial } from '@/types'
import TutorialCard from './TutorialCard'
import Loading from './Loading'

export default function TutorialSection() {
  const [tutorials, setTutorials] = useState<OrigamiTutorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const response = await fetch('/api/tutorials')
        const data = await response.json()
        setTutorials(data)
      } catch (error) {
        console.error('Error fetching tutorials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6">
          Mindful Tutorials
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Begin your origami journey with our carefully crafted tutorials. 
          Each lesson is designed to bring peace and focus to your practice.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  )
}