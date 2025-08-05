'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import AudioControls from '@/components/AudioControls'
import SakuraPetals from '@/components/SakuraPetals'
import Footer from '@/components/Footer'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  // Audio controls state
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
  }

  return (
    <div className={`${inter.className} bg-gradient-to-br from-sage-50 to-bamboo-50 min-h-screen`}>
      {/* Navigation */}
      <Navigation />
      
      {/* Floating sakura petals */}
      <SakuraPetals />
      
      {/* Audio controls */}  
      <AudioControls 
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlay={handleTogglePlay}
        onVolumeChange={handleVolumeChange}
      />
      
      {/* Main content */}
      {children}
      
      {/* Footer */}
      <Footer />
    </div>
  )
}