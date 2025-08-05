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
    <div id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 rice-paper-bg opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-zen-300 rounded-full opacity-40 floating" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-sage-300 rounded-full opacity-30 floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-sakura-300 rounded-full opacity-35 floating" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Welcome message */}
          <div className="mb-12">
            <h1 className="zen-heading text-5xl md:text-7xl lg:text-8xl mb-8 meditation-fade zen-text-primary">
              Fold with intention.
              <br />
              <span className="text-zen-600">Learn with calm.</span>
            </h1>
            
            <p className="zen-text-secondary text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed gentle-slide">
              Discover the ancient art of origami through peaceful, step-by-step tutorials 
              in a serene, Japanese-inspired environment. Each fold is a meditation, 
              each crease a moment of mindfulness.
            </p>

            {/* Meditative quote */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-zen-200/50 max-w-3xl mx-auto gentle-slide" style={{ animationDelay: '0.5s' }}>
              <p className="font-calligraphy text-zen-700 italic text-lg md:text-xl leading-relaxed">
                "In the art of paper folding, we discover not just beauty in form, but peace in process. 
                Every crease teaches patience, every fold reveals mindfulness."
              </p>
              <div className="text-zen-500 text-sm mt-3">— Ancient Origami Wisdom</div>
            </div>
          </div>
          
          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 gentle-slide" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => scrollToSection('#interactive')}
              className="zen-button text-lg px-8 py-4 zen-focus"
            >
              🎨 Try Interactive Tool
            </button>
            <button
              onClick={() => scrollToSection('#tutorials')}
              className="zen-button-secondary text-lg px-8 py-4 zen-focus"
            >
              📖 Browse Tutorials
            </button>
            <button
              onClick={() => scrollToSection('#collections')}
              className="zen-button-outline text-lg px-8 py-4 zen-focus"
            >
              🌸 Explore Collections
            </button>
          </div>
          
          {/* Featured tutorial card */}
          {!loading && featuredTutorial && (
            <div className="meditation-fade" style={{ animationDelay: '1.5s' }}>
              <h2 className="zen-heading text-2xl md:text-3xl mb-8 zen-text-primary">
                ✨ Begin Your Journey Here
              </h2>
              <div className="max-w-lg mx-auto">
                <FeaturedTutorialCard tutorial={featuredTutorial} />
              </div>
            </div>
          )}

          {/* Feature highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 meditation-fade" style={{ animationDelay: '2s' }}>
            <div className="text-center">
              <div className="w-16 h-16 bg-zen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="zen-heading text-lg zen-text-primary mb-2">Meditative Learning</h3>
              <p className="zen-text-secondary text-sm">Peaceful interface designed for mindful practice</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="zen-heading text-lg zen-text-primary mb-2">3D Interactive Tool</h3>
              <p className="zen-text-secondary text-sm">Virtual paper manipulation with real-time controls</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="zen-heading text-lg zen-text-primary mb-2">Ambient Soundscape</h3>
              <p className="zen-text-secondary text-sm">Calming background music with Japanese instruments</p>
            </div>
          </div>
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