'use client'

import { useEffect, useState } from 'react'
import { SakuraPetal } from '@/types'

export default function SakuraPetals() {
  const [petals, setPetals] = useState<SakuraPetal[]>([])

  useEffect(() => {
    // Create initial petals
    const initialPetals: SakuraPetal[] = Array.from({ length: 6 }, (_, i) => ({
      id: `petal-${i}`,
      x: Math.random() * window.innerWidth,
      y: -50,
      rotation: Math.random() * 360,
      size: 0.8 + Math.random() * 0.4,
      speed: 0.5 + Math.random() * 0.5,
    }))
    
    setPetals(initialPetals)

    // Add new petals periodically
    const interval = setInterval(() => {
      setPetals(prev => {
        // Remove petals that have fallen off screen
        const activePetals = prev.filter(petal => petal.y < window.innerHeight + 100)
        
        // Add new petal occasionally
        if (Math.random() < 0.3 && activePetals.length < 8) {
          const newPetal: SakuraPetal = {
            id: `petal-${Date.now()}`,
            x: Math.random() * window.innerWidth,
            y: -50,
            rotation: Math.random() * 360,
            size: 0.8 + Math.random() * 0.4,
            speed: 0.5 + Math.random() * 0.5,
          }
          return [...activePetals, newPetal]
        }
        
        return activePetals
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-40 animate-drift"
          style={{
            left: `${petal.x}px`,
            transform: `rotate(${petal.rotation}deg) scale(${petal.size})`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2 10 6 8 8C6 10 2 12 2 12C2 12 6 14 8 16C10 18 12 22 12 22C12 22 14 18 16 16C18 14 22 12 22 12C22 12 18 10 16 8C14 6 12 2 12 2Z"
              fill="rgba(246, 138, 138, 0.6)"
              stroke="rgba(246, 138, 138, 0.8)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}