'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { RotateCcw, Info } from 'lucide-react'
import PaperMesh from '@/components/PaperMesh'
import Loading from '@/components/Loading'

export default function InteractivePaperTool() {
  const [foldAngle, setFoldAngle] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)

  const resetPaper = () => {
    setFoldAngle(0)
  }

  const handleFold = () => {
    setFoldAngle(prev => Math.min(prev + 15, 180))
  }

  return (
    <div className="zen-card max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="zen-heading text-2xl zen-text-primary">
            3D Paper Folding Simulator
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="p-2 zen-text-secondary hover:text-zen-600 transition-colors"
              aria-label="Toggle instructions"
            >
              <Info size={20} />
            </button>
            <button
              onClick={resetPaper}
              className="p-2 zen-text-secondary hover:text-zen-600 transition-colors"
              aria-label="Reset paper"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
        
        {showInstructions && (
          <div className="bg-zen-50/50 rounded-xl p-4 mb-6 border border-zen-200/50">
            <p className="zen-text-secondary text-sm leading-relaxed">
              <strong>Instructions:</strong> Click the "Fold" button to create a valley fold. 
              Use your mouse to rotate and zoom the 3D view. This simulator demonstrates 
              the basic mechanics of paper folding in a virtual environment.
            </p>
          </div>
        )}
      </div>

      <div className="relative">
        {/* 3D Canvas */}
        <div className="w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-zen-50 to-sage-50 border border-zen-200/50">
          <Suspense fallback={<Loading />}>
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
              />
              
              {/* Lighting */}
              <ambientLight intensity={0.6} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <pointLight position={[-5, 5, 5]} intensity={0.4} />
              
              {/* Paper mesh component */}
              <PaperMesh foldAngle={foldAngle} />
            </Canvas>
          </Suspense>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleFold}
              disabled={foldAngle >= 180}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                foldAngle >= 180
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'zen-button transform hover:scale-105'
              }`}
            >
              Fold Paper
            </button>
            
            <div className="zen-text-secondary text-sm">
              Fold Angle: {foldAngle}°
            </div>
          </div>
          
          <div className="zen-text-secondary text-sm text-center sm:text-right">
            <div>Click and drag to rotate • Scroll to zoom</div>
            <div className="text-xs mt-1 italic">
              Experience the meditative flow of paper folding
            </div>
          </div>
        </div>
      </div>
      
      {/* Inspirational quote */}
      <div className="mt-8 text-center">
        <p className="font-calligraphy text-lg zen-text-primary italic">
          "In the folding of paper, we find the unfolding of patience."
        </p>
      </div>
    </div>
  )
}