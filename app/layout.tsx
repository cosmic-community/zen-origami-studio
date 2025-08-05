import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import AudioControls from '@/components/AudioControls'
import SakuraPetals from '@/components/SakuraPetals'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zen Origami Studio - Meditative Paper Folding Experience',
  description: 'Discover the ancient art of origami through peaceful, step-by-step tutorials in a serene, Japanese-inspired environment. Each fold is a meditation, each crease a moment of mindfulness.',
  keywords: ['origami', 'meditation', 'mindfulness', 'paper folding', 'Japanese art', 'zen', 'tutorials', 'interactive'],
  authors: [{ name: 'Zen Origami Studio' }],
  openGraph: {
    title: 'Zen Origami Studio - Meditative Paper Folding Experience',
    description: 'Experience the ancient art of origami through interactive 3D tools, peaceful tutorials, and mindful practice.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-sage-50 to-bamboo-50 min-h-screen`}>
        {/* Navigation */}
        <Navigation />
        
        {/* Floating sakura petals */}
        <SakuraPetals />
        
        {/* Audio controls */}  
        <AudioControls />
        
        {/* Main content */}
        {children}
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}