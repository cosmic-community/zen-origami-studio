'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, PlaneGeometry, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

interface PaperMeshProps {
  foldAngle: number
}

export default function PaperMesh({ foldAngle }: PaperMeshProps) {
  const leftHalfRef = useRef<Mesh>(null)
  const rightHalfRef = useRef<Mesh>(null)

  // Create geometry for paper halves
  const geometry = useMemo(() => new PlaneGeometry(1, 2, 10, 10), [])
  
  // Create paper material
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: '#f8faf8',
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1,
    })
  }, [])

  // Animate the fold
  useFrame((state) => {
    if (leftHalfRef.current && rightHalfRef.current) {
      // Convert angle to radians
      const radians = (foldAngle * Math.PI) / 180
      
      // Rotate left half around the center line
      leftHalfRef.current.rotation.y = -radians
      rightHalfRef.current.rotation.y = radians
      
      // Slight floating animation
      const float = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      leftHalfRef.current.position.y = float
      rightHalfRef.current.position.y = float
    }
  })

  return (
    <group>
      {/* Left half of paper */}
      <mesh
        ref={leftHalfRef}
        geometry={geometry}
        material={material}
        position={[-0.5, 0, 0]}
        castShadow
        receiveShadow
      />
      
      {/* Right half of paper */}
      <mesh
        ref={rightHalfRef}
        geometry={geometry}
        material={material}
        position={[0.5, 0, 0]}
        castShadow
        receiveShadow
      />
      
      {/* Fold line indicator */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -1, 0.01, 0, 1, 0.01])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7fa67f" />
      </line>
    </group>
  )
}