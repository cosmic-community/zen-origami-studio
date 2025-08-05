'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import PaperMesh from '@/components/PaperMesh'
import AudioControls from '@/components/AudioControls'
import Loading from '@/components/Loading'

export default function InteractiveTool() {
  const [foldAngle, setFoldAngle] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zen-50 to-sage-50">
      {/* Audio Controls */}
      <AudioControls
        isPlaying={isPlaying}
        volume={volume}
        onTogglePlay={handleTogglePlay}
        onVolumeChange={handleVolumeChange}
      />

      {/* Header */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="zen-heading text-4xl sm:text-5xl lg:text-6xl zen-text-primary mb-6">
              Interactive Paper Folding
            </h1>
            <p className="zen-text-secondary text-lg sm:text-xl max-w-3xl mx-auto">
              Experience the meditative art of origami through interactive 3D visualization. 
              Watch as virtual paper transforms with your guidance, just like in traditional folding.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[600px] relative z-10">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Suspense fallback={<Loading />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="w-full h-full min-h-[400px] lg:min-h-[600px]"
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <PaperMesh foldAngle={foldAngle} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <Environment preset="studio" />
            </Canvas>
          </Suspense>
        </div>

        {/* Controls Panel */}
        <div className="lg:w-80 bg-white/90 backdrop-blur-md border-l border-zen-200/50 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="zen-heading text-xl zen-text-primary mb-4">Paper Controls</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block zen-text text-sm font-medium mb-2">
                    Fold Angle: {foldAngle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={foldAngle}
                    onChange={(e) => setFoldAngle(Number(e.target.value))}
                    className="w-full h-2 bg-zen-200 rounded-lg appearance-none cursor-pointer zen-focus"
                  />
                  <div className="flex justify-between text-xs zen-text-secondary mt-1">
                    <span>Flat</span>
                    <span>Folded</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFoldAngle(0)}
                    className="zen-button-secondary text-sm py-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setFoldAngle(90)}
                    className="zen-button-primary text-sm py-2"
                  >
                    90° Fold
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-zen-200 pt-6">
              <h4 className="zen-text font-medium mb-3">Meditation Tips</h4>
              <div className="space-y-3 text-sm zen-text-secondary">
                <p className="bg-zen-50 rounded-lg p-3">
                  🧘 <strong>Breathe mindfully</strong> as you adjust the fold. Each movement is a meditation.
                </p>
                <p className="bg-sage-50 rounded-lg p-3">
                  🌸 <strong>Observe transformation</strong> - notice how simple movements create beauty.
                </p>
                <p className="bg-sakura-50 rounded-lg p-3">
                  ✨ <strong>Practice patience</strong> - origami teaches us that art takes time.
                </p>
              </div>
            </div>

            <div className="border-t border-zen-200 pt-6">
              <h4 className="zen-text font-medium mb-3">Camera Controls</h4>
              <div className="text-sm zen-text-secondary space-y-2">
                <p><strong>Rotate:</strong> Click and drag</p>
                <p><strong>Zoom:</strong> Mouse wheel or pinch</p>
                <p><strong>Pan:</strong> Right-click and drag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}