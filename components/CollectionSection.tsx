'use client'

import { useState, useEffect } from 'react'
import { Collection } from '@/types'
import CollectionCard from './CollectionCard'
import Loading from './Loading'

export default function CollectionSection() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch('/api/collections')
        const data = await response.json()
        setCollections(data)
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6">
          Seasonal Collections
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Discover curated collections inspired by nature's cycles and special occasions. 
          Each collection tells a story through the art of paper folding.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}