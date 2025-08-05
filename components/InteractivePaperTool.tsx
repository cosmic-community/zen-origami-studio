'use client'

import { useState, Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'

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
  const [animationSpeed, setAnimationSpeed] = useState(50)

  // Use effect to check if we're on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnimate = () => {
    if (isAnimating) {
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)
    let frame = 0
    const totalFrames = 100
    const animate = () => {
      if (frame < totalFrames && isAnimating) {
        const progress = frame / totalFrames
        // Use easing function for more natural animation
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setFoldAngle(easedProgress * 180)
        setAnimationFrame(frame)
        frame++
        setTimeout(() => requestAnimationFrame(animate), 101 - animationSpeed)
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
          <div className="zen-spinner"></div>
          <span className="ml-3 zen-text-secondary">Loading 3D experience...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 3D Canvas */}
      <div className="h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-sage-50 to-bamboo-50 shadow-inner">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="zen-spinner"></div>
            <span className="ml-3 zen-text-secondary">Loading 3D experience...</span>
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
            <pointLight position={[-10, -10, -5]} intensity={0.2} />
            <PaperMesh foldAngle={foldAngle} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              autoRotate={false}
              enableDamping={true}
              dampingFactor={0.05}
            />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Manual Control */}
        <div className="bg-white/50 rounded-xl p-6">
          <label className="block zen-text text-sm font-medium mb-3">
            Fold Angle: {Math.round(foldAngle)}°
          </label>
          <input
            type="range"
            min="0"
            max="180"
            value={foldAngle}
            onChange={(e) => !isAnimating && setFoldAngle(Number(e.target.value))}
            className="w-full h-2 bg-zen-200 rounded-lg appearance-none cursor-pointer slider zen-focus"
            disabled={isAnimating}
          />
          <div className="flex justify-between text-xs zen-text-secondary mt-2">
            <span>Flat (0°)</span>
            <span>Half Fold (90°)</span>
            <span>Complete Fold (180°)</span>
          </div>
        </div>

        {/* Animation Speed Control */}
        <div className="bg-white/50 rounded-xl p-6">
          <label className="block zen-text text-sm font-medium mb-3">
            Animation Speed: {animationSpeed}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer slider zen-focus"
          />
          <div className="flex justify-between text-xs zen-text-secondary mt-2">
            <span>Slow & Mindful</span>
            <span>Quick Practice</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleAnimate}
            disabled={isAnimating}
            className="zen-button flex items-center gap-2 px-6 py-3 zen-focus disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="zen-button-outline flex items-center gap-2 px-6 py-3 zen-focus"
            disabled={isAnimating}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Progress indicator */}
        {isAnimating && (
          <div className="bg-white/50 rounded-xl p-4">
            <div className="text-center mb-3">
              <div className="zen-text-secondary text-sm mb-2">
                Folding Progress: {animationFrame}%
              </div>
              <div className="w-full bg-zen-200 rounded-full h-2">
                <div
                  className="bg-zen-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${animationFrame}%` }}
                />
              </div>
            </div>
            <p className="text-xs zen-text-secondary text-center italic">
              "Breathe slowly and observe each movement..."
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white/50 rounded-xl p-6">
        <h3 className="zen-heading text-lg mb-4 zen-text-primary">How to Use the Virtual Paper</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium zen-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-zen-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Interactive Controls
            </h4>
            <ul className="zen-text-secondary space-y-1 text-sm ml-8">
              <li>• Drag the fold slider to practice manual folding</li>
              <li>• Use mouse to rotate and examine the paper</li>
              <li>• Scroll to zoom in for detailed observation</li>
              <li>• Adjust animation speed for your learning pace</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium zen-text mb-2 flex items-center gap-2">
              <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Mindful Practice
            </h4>
            <ul className="zen-text-secondary space-y-1 text-sm ml-8">
              <li>• Take deep breaths with each fold</li>
              <li>• Focus on the paper's transformation</li>
              <li>• Notice how light plays on the surfaces</li>
              <li>• Practice patience with slow animations</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-zen-100 rounded-lg border-l-4 border-zen-400">
          <p className="zen-text italic text-center font-calligraphy text-lg">
            "In the stillness of practice, we find the rhythm of creation. Each fold teaches patience, each crease reveals beauty."
          </p>
        </div>
      </div>
    </div>
  )
}