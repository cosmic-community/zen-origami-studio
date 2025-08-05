'use client'

import { useState, useEffect } from 'react'
import { OrigamiTutorial } from '@/types'
import TutorialCard from './TutorialCard'

export default function TutorialSection() {
  const [tutorials, setTutorials] = useState<OrigamiTutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

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

  const filteredTutorials = tutorials.filter(tutorial => {
    if (filter === 'all') return true
    const difficulty = tutorial.metadata?.difficulty_level?.value?.toLowerCase()
    return difficulty === filter
  })

  const filterButtons = [
    { key: 'all', label: 'All Tutorials', icon: '📖' },
    { key: 'beginner', label: 'Beginner', icon: '🌱' },
    { key: 'intermediate', label: 'Intermediate', icon: '🌿' },
    { key: 'advanced', label: 'Advanced', icon: '🌳' },
  ] as const

  return (
    <section id="tutorials" className="py-20 bg-gradient-to-br from-zen-50 to-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-6">
            📖 Step-by-Step Tutorials
          </h2>
          <p className="zen-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Clear instructions with smooth transitions between folding steps. 
            Each tutorial is crafted to guide you through a meditative journey of creation.
          </p>

          {/* Inspirational quote */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-zen-200/50 max-w-2xl mx-auto">
            <p className="font-calligraphy text-zen-700 italic text-lg leading-relaxed">
              "Patience is not the ability to wait, but how you behave while you're folding."
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all zen-focus ${
                filter === key
                  ? 'zen-button'
                  : 'zen-button-secondary hover:bg-zen-100 hover:border-zen-300'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="zen-spinner mx-auto mb-4"></div>
            <p className="zen-text-secondary">Loading peaceful tutorials...</p>
          </div>
        )}

        {/* Tutorials grid */}
        {!loading && filteredTutorials.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                className="meditation-fade"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TutorialCard tutorial={tutorial} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredTutorials.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🧘</div>
            <h3 className="zen-heading text-2xl zen-text-primary mb-4">
              No tutorials found for this level
            </h3>
            <p className="zen-text-secondary max-w-md mx-auto">
              Try selecting a different difficulty level or check back later for new content.
            </p>
          </div>
        )}

        {/* Call to action */}
        {!loading && filteredTutorials.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-zen-200/50 max-w-2xl mx-auto">
              <h3 className="zen-heading text-2xl zen-text-primary mb-4">
                Ready to Begin Your Practice?
              </h3>
              <p className="zen-text-secondary mb-6">
                Start with our interactive 3D paper tool to understand the fundamentals of folding.
              </p>
              <button
                onClick={() => {
                  const element = document.querySelector('#interactive')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="zen-button px-8 py-3"
              >
                🎨 Try Interactive Tool
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}