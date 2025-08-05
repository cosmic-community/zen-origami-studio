'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, PlaneGeometry, MeshPhongMaterial } from 'three'

interface PaperMeshProps {
  foldAngle: number
}

export default function PaperMesh({ foldAngle }: PaperMeshProps) {
  const groupRef = useRef<Group>(null)
  const leftHalfRef = useRef<Group>(null)
  const rightHalfRef = useRef<Group>(null)

  // Create geometry for the paper halves
  const geometry = useMemo(() => new PlaneGeometry(1, 2, 10, 10), [])
  
  // Create material with paper-like properties
  const material = useMemo(() => new MeshPhongMaterial({ 
    color: '#f8f6f0',
    transparent: true,
    opacity: 0.95,
    side: 2, // DoubleSide
  }), [])

  // Convert fold angle to radians and apply rotation
  useFrame(() => {
    if (leftHalfRef.current && rightHalfRef.current) {
      const radians = (foldAngle * Math.PI) / 180
      
      // Rotate left half
      leftHalfRef.current.rotation.z = radians
      leftHalfRef.current.position.x = -0.5 * Math.cos(radians)
      leftHalfRef.current.position.y = 0.5 * Math.sin(radians)
      
      // Rotate right half in opposite direction
      rightHalfRef.current.rotation.z = -radians
      rightHalfRef.current.position.x = 0.5 * Math.cos(radians)
      rightHalfRef.current.position.y = 0.5 * Math.sin(radians)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Left half of the paper */}
      <group ref={leftHalfRef}>
        <mesh
          geometry={geometry}
          material={material}
          position={[-0.5, 0, 0]}
          scale={[0.5, 1, 1]}
          castShadow
          receiveShadow
        />
      </group>
      
      {/* Right half of the paper */}
      <group ref={rightHalfRef}>
        <mesh
          geometry={geometry}
          material={material}
          position={[0.5, 0, 0]}
          scale={[0.5, 1, 1]}
          castShadow
          receiveShadow
        />
      </group>
      
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
        <lineBasicMaterial color="#8da568" linewidth={2} />
      </line>
    </group>
  )
}