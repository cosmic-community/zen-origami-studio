'use client'

import { useState, useEffect } from 'react'
import { OrigamiTutorial } from '@/types'
import FeaturedTutorialCard from '@/components/FeaturedTutorialCard'

export default function HeroSection() {
  const [featuredTutorial, setFeaturedTutorial] = useState<OrigamiTutorial | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const response = await fetch('/api/tutorials')
        const tutorials = await response.json()
        if (tutorials.length > 0) {
          setFeaturedTutorial(tutorials[0])
        }
      } catch (error) {
        console.error('Error fetching tutorials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [])

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 rice-paper-bg opacity-30"></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Welcome message */}
          <h1 className="zen-heading text-5xl md:text-7xl lg:text-8xl mb-8 meditation-fade">
            Fold with intention.
            <br />
            <span className="text-zen-600">Learn with calm.</span>
          </h1>
          
          <p className="zen-text-secondary text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed gentle-slide">
            Discover the ancient art of origami through peaceful, step-by-step tutorials 
            in a serene, Japanese-inspired environment. Each fold is a meditation, 
            each crease a moment of mindfulness.
          </p>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 gentle-slide">
            <button
              onClick={() => scrollToSection('#interactive')}
              className="zen-button text-lg px-8 py-4"
            >
              Try Interactive Tool
            </button>
            <button
              onClick={() => scrollToSection('#tutorials')}
              className="zen-button-secondary text-lg px-8 py-4"
            >
              Browse Tutorials
            </button>
          </div>
          
          {/* Featured tutorial card */}
          {!loading && featuredTutorial && (
            <div className="meditation-fade">
              <h2 className="zen-heading text-2xl md:text-3xl mb-8 zen-text-primary">
                Featured Tutorial
              </h2>
              <div className="max-w-md mx-auto">
                <FeaturedTutorialCard tutorial={featuredTutorial} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zen-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zen-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}