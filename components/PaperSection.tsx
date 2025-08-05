'use client'

import { useState, useEffect } from 'react'
import { PaperType } from '@/types'
import PaperTypeCard from './PaperTypeCard'

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

  return (
    <section id="papers" className="py-20 bg-gradient-to-br from-bamboo-50 to-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-6">
            📜 Paper Type Guidance
          </h2>
          <p className="zen-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Learn about traditional kami and handmade washi papers. 
            Understanding your medium is the first step toward mastery.
          </p>

          {/* Inspirational quote */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-zen-200/50 max-w-2xl mx-auto">
            <p className="font-calligraphy text-zen-700 italic text-lg leading-relaxed">
              "The paper whispers its secrets to those who listen with patient hands."
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="zen-spinner mx-auto mb-4"></div>
            <p className="zen-text-secondary">Learning about traditional papers...</p>
          </div>
        )}

        {/* Paper types grid */}
        {!loading && paperTypes.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paperTypes.map((paperType, index) => (
              <div
                key={paperType.id}
                className="meditation-fade"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <PaperTypeCard paperType={paperType} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && paperTypes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📜</div>
            <h3 className="zen-heading text-2xl zen-text-primary mb-4">
              Paper guides are being prepared
            </h3>
            <p className="zen-text-secondary max-w-md mx-auto">
              Detailed information about traditional papers and their properties is coming soon.
            </p>
          </div>
        )}

        {/* Paper knowledge section */}
        <div className="mt-20">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-zen-200/50 max-w-4xl mx-auto">
            <h3 className="zen-heading text-2xl zen-text-primary mb-6 text-center">
              The Art of Paper Selection
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium zen-text mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-zen-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Understanding Weight
                </h4>
                <p className="zen-text-secondary text-sm leading-relaxed mb-4">
                  Paper weight (GSM) affects how easily it folds and holds creases. 
                  Lighter papers are forgiving for beginners, while heavier papers create crisp, lasting forms.
                </p>
                
                <h4 className="font-medium zen-text mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Texture Matters
                </h4>
                <p className="zen-text-secondary text-sm leading-relaxed">
                  Smooth papers slide easily for complex models, while textured papers 
                  like washi add character and hold folds naturally.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium zen-text mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-bamboo-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Color & Spirit
                </h4>
                <p className="zen-text-secondary text-sm leading-relaxed mb-4">
                  In Japanese tradition, colors carry meaning. White represents purity and new beginnings, 
                  while colored papers bring specific energies to your creations.
                </p>
                
                <h4 className="font-medium zen-text mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-sakura-500 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Size & Proportion
                </h4>
                <p className="zen-text-secondary text-sm leading-relaxed">
                  Standard kami squares range from 6" to 10". Larger papers are easier for learning, 
                  while smaller papers challenge precision and focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}