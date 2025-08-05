import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import TutorialSection from '@/components/TutorialSection'
import CollectionSection from '@/components/CollectionSection'
import PaperSection from '@/components/PaperSection'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import SakuraPetals from '@/components/SakuraPetals'
import Loading from '@/components/Loading'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <SakuraPetals />
      <Navigation />
      
      <HeroSection />
      
      <Suspense fallback={<Loading />}>
        <TutorialSection />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <CollectionSection />
      </Suspense>
      
      <Suspense fallback={<Loading />}>
        <PaperSection />
      </Suspense>
      
      <Footer />
    </main>
  )
}