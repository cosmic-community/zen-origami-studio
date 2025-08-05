'use client'

import { useEffect, useState } from 'react'
import { SakuraPetal } from '@/types'

export default function SakuraPetals() {
  const [petals, setPetals] = useState<SakuraPetal[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    // Create initial petals
    const initialPetals: SakuraPetal[] = Array.from({ length: 8 }, (_, i) => ({
      id: `petal-${i}`,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 200,
      rotation: Math.random() * 360,
      size: 0.6 + Math.random() * 0.8,
      speed: 0.3 + Math.random() * 0.7,
    }))
    
    setPetals(initialPetals)

    // Add new petals periodically and clean up old ones
    const interval = setInterval(() => {
      setPetals(prev => {
        // Remove petals that have fallen off screen
        const activePetals = prev.filter(petal => petal.y < window.innerHeight + 100)
        
        // Add new petal occasionally
        if (Math.random() < 0.4 && activePetals.length < 12) {
          const newPetal: SakuraPetal = {
            id: `petal-${Date.now()}-${Math.random()}`,
            x: Math.random() * window.innerWidth,
            y: -50 - Math.random() * 100,
            rotation: Math.random() * 360,
            size: 0.6 + Math.random() * 0.8,
            speed: 0.3 + Math.random() * 0.7,
          }
          return [...activePetals, newPetal]
        }
        
        return activePetals
      })
    }, 4000)

    // Handle window resize
    const handleResize = () => {
      setPetals(prev => prev.map(petal => ({
        ...petal,
        x: Math.min(petal.x, window.innerWidth - 40)
      })))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-60 animate-drift"
          style={{
            left: `${petal.x}px`,
            transform: `rotate(${petal.rotation}deg) scale(${petal.size})`,
            animationDuration: `${20 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          {/* Sakura petal SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-sm"
          >
            <path
              d="M12 2C12 2 10 6 8 8C6 10 2 12 2 12C2 12 6 14 8 16C10 18 12 22 12 22C12 22 14 18 16 16C18 14 22 12 22 12C22 12 18 10 16 8C14 6 12 2 12 2Z"
              fill="rgba(249, 168, 212, 0.7)"
              stroke="rgba(244, 114, 182, 0.5)"
              strokeWidth="0.5"
            />
            {/* Inner petal detail */}
            <path
              d="M12 4C12 4 11 7 9.5 8.5C8 10 5 11 5 11C5 11 8 12 9.5 13.5C11 15 12 18 12 18C12 18 13 15 14.5 13.5C16 12 19 11 19 11C19 11 16 10 14.5 8.5C13 7 12 4 12 4Z"
              fill="rgba(253, 186, 116, 0.4)"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}