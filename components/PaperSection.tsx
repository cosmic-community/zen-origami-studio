'use client'

import { useState, useEffect } from 'react'
import { PaperType } from '@/types'
import PaperTypeCard from './PaperTypeCard'
import Loading from './Loading'

export default function PaperSection() {
  const [paperTypes, setPaperTypes] = useState<PaperType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPaperTypes() {
      try {
        const response = await fetch('/api/paper-types')
        const data = await response.json()
        setPaperTypes(data)
      } catch (error) {
        console.error('Error fetching paper types:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaperTypes()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6">
          Traditional Papers
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Choose the perfect paper for your origami practice. Each type offers 
          unique qualities that enhance different folding techniques and experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paperTypes.map((paperType) => (
          <PaperTypeCard key={paperType.id} paperType={paperType} />
        ))}
      </div>
    </div>
  )
}