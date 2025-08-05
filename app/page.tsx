import HeroSection from '@/components/HeroSection'
import InteractivePaperTool from '@/components/InteractivePaperTool'
import TutorialSection from '@/components/TutorialSection'
import CollectionSection from '@/components/CollectionSection'
import PaperSection from '@/components/PaperSection'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Interactive Tool Section */}
      <section id="interactive" className="py-20 bg-gradient-to-br from-bamboo-50 to-zen-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-6">
              🎨 Interactive Paper Tool
            </h2>
            <p className="zen-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Experience the meditative art of virtual origami. Practice folding techniques, 
              explore paper properties, and find your center through digital mindfulness.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <InteractivePaperTool />
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <TutorialSection />

      {/* Collections Section */}
      <CollectionSection />

      {/* Paper Types Section */}
      <PaperSection />

      {/* Final inspirational section */}
      <section className="py-20 bg-gradient-to-br from-zen-50 to-sage-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-8">
              💭 Begin Your Mindful Journey
            </h2>
            <p className="zen-text-secondary text-xl leading-relaxed mb-12">
              Origami is more than paper folding—it's a meditation in motion, 
              a practice of presence, and a pathway to inner peace.
            </p>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200/50">
              <blockquote className="font-calligraphy text-zen-700 italic text-2xl leading-relaxed mb-6">
                "In every fold, find stillness.<br />
                In every crease, discover calm.<br />
                In every creation, touch the infinite."
              </blockquote>
              <cite className="zen-text-secondary text-lg">— The Way of Paper Zen</cite>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}