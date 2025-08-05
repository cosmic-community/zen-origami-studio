'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Play, Pause, RotateCcw } from 'lucide-react'

// Dynamically import Canvas with no SSR to avoid React batching issues
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
)

const Environment = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Environment),
  { ssr: false }
)

const PaperMesh = dynamic(() => import('./PaperMesh'), { ssr: false })

export default function InteractivePaperTool() {
  const [foldAngle, setFoldAngle] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationFrame, setAnimationFrame] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Use effect to check if we're on client side
  useState(() => {
    setIsClient(true)
  })

  const handleAnimate = () => {
    if (isAnimating) {
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)
    let frame = 0
    const animate = () => {
      if (frame < 100) {
        setFoldAngle((frame / 100) * 180)
        setAnimationFrame(frame)
        frame++
        setTimeout(() => requestAnimationFrame(animate), 50)
      } else {
        setIsAnimating(false)
      }
    }
    animate()
  }

  const handleReset = () => {
    setIsAnimating(false)
    setFoldAngle(0)
    setAnimationFrame(0)
  }

  if (!isClient) {
    return (
      <div className="zen-card p-8 max-w-4xl mx-auto">
        <div className="h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-zen-sage/10 to-zen-cream/20 flex items-center justify-center">
          <div className="animate-pulse text-zen-sage">Loading 3D experience...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="zen-card p-8 max-w-4xl mx-auto">
      {/* 3D Canvas */}
      <div className="h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-zen-sage/10 to-zen-cream/20">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-zen-sage">Loading 3D experience...</div>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            shadows
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <PaperMesh foldAngle={foldAngle} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
            />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Manual Control */}
        <div>
          <label className="block zen-text text-sm font-medium mb-3">
            Fold Angle: {Math.round(foldAngle)}°
          </label>
          <input
            type="range"
            min="0"
            max="180"
            value={foldAngle}
            onChange={(e) => setFoldAngle(Number(e.target.value))}
            className="w-full h-2 bg-zen-sage/20 rounded-lg appearance-none cursor-pointer slider"
            disabled={isAnimating}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleAnimate}
            disabled={isAnimating}
            className="zen-button flex items-center gap-2 px-6 py-3"
          >
            {isAnimating ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Animation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Animate Fold
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="zen-button-outline flex items-center gap-2 px-6 py-3"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Progress indicator */}
        {isAnimating && (
          <div className="text-center">
            <div className="zen-text-secondary text-sm mb-2">
              Animation Progress: {animationFrame}%
            </div>
            <div className="w-full bg-zen-sage/20 rounded-full h-2">
              <div
                className="bg-zen-sage h-2 rounded-full transition-all duration-100"
                style={{ width: `${animationFrame}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-zen-cream/30 rounded-xl">
        <h3 className="zen-heading text-lg mb-3">How to Use</h3>
        <ul className="zen-text-secondary space-y-2 text-sm">
          <li>• Drag the slider to manually fold the paper</li>
          <li>• Click "Animate Fold" to watch an automatic folding sequence</li>
          <li>• Use your mouse to rotate and zoom the 3D view</li>
          <li>• Click "Reset" to return to the flat position</li>
        </ul>
      </div>
    </div>
  )
}