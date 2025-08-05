import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import TutorialSection from '@/components/TutorialSection'
import CollectionSection from '@/components/CollectionSection'
import PaperSection from '@/components/PaperSection'
import InteractivePaperTool from '@/components/InteractivePaperTool'
import AudioControls from '@/components/AudioControls'
import SakuraPetals from '@/components/SakuraPetals'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Floating sakura petals animation */}
      <SakuraPetals />
      
      {/* Fixed navigation */}
      <Navigation />
      
      {/* Audio controls */}
      <AudioControls />
      
      {/* Hero section with welcome message */}
      <section id="home" className="min-h-screen">
        <Suspense fallback={<Loading />}>
          <HeroSection />
        </Suspense>
      </section>
      
      {/* Interactive 3D paper folding tool */}
      <section id="interactive" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 meditation-fade">
            <h2 className="zen-heading text-4xl md:text-5xl mb-6">
              Interactive Paper Folding
            </h2>
            <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the magic of origami through our 3D interactive tool. 
              Manipulate virtual paper with your cursor and follow along in real-time.
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <InteractivePaperTool />
          </Suspense>
        </div>
      </section>
      
      {/* Tutorial section */}
      <section id="tutorials" className="py-20">
        <Suspense fallback={<Loading />}>
          <TutorialSection />
        </Suspense>
      </section>
      
      {/* Collection section */}
      <section id="collections" className="py-20 zen-gradient">
        <Suspense fallback={<Loading />}>
          <CollectionSection />
        </Suspense>
      </section>
      
      {/* Paper types section */}
      <section id="papers" className="py-20">
        <Suspense fallback={<Loading />}>
          <PaperSection />
        </Suspense>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}