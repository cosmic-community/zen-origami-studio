'use client'

import { useState, useEffect } from 'react'
import { Collection } from '@/types'
import CollectionCard from './CollectionCard'

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

  return (
    <section id="collections" className="py-20 bg-gradient-to-br from-sage-50 to-bamboo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-6">
            🌿 Seasonal Collections
          </h2>
          <p className="zen-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Curated origami projects organized by themes and occasions. 
            Each collection tells a story through the ancient art of paper folding.
          </p>

          {/* Inspirational quote */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-zen-200/50 max-w-2xl mx-auto">
            <p className="font-calligraphy text-zen-700 italic text-lg leading-relaxed">
              "Like the changing seasons, each fold brings transformation and new beauty."
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="zen-spinner mx-auto mb-4"></div>
            <p className="zen-text-secondary">Gathering seasonal inspirations...</p>
          </div>
        )}

        {/* Collections grid */}
        {!loading && collections.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="meditation-fade"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CollectionCard collection={collection} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && collections.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🌸</div>
            <h3 className="zen-heading text-2xl zen-text-primary mb-4">
              Collections are being curated
            </h3>
            <p className="zen-text-secondary max-w-md mx-auto">
              Beautiful seasonal collections are coming soon. Each will offer a unique journey through the art of origami.
            </p>
          </div>
        )}

        {/* Features highlight */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white/50 rounded-2xl p-6 border border-zen-200/50">
            <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌸</span>
            </div>
            <h3 className="zen-heading text-lg zen-text-primary mb-2">Seasonal Themes</h3>
            <p className="zen-text-secondary text-sm">Projects inspired by the beauty of each season</p>
          </div>
          
          <div className="text-center bg-white/50 rounded-2xl p-6 border border-zen-200/50">
            <div className="w-16 h-16 bg-zen-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎋</span>
            </div>
            <h3 className="zen-heading text-lg zen-text-primary mb-2">Cultural Significance</h3>
            <p className="zen-text-secondary text-sm">Learn the meaning behind each traditional model</p>
          </div>
          
          <div className="text-center bg-white/50 rounded-2xl p-6 border border-zen-200/50">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧘</span>
            </div>
            <h3 className="zen-heading text-lg zen-text-primary mb-2">Meditative Practice</h3>
            <p className="zen-text-secondary text-sm">Each collection offers a mindful creative journey</p>
          </div>
        </div>
      </div>
    </section>
  )
}