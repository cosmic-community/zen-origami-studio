'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PaperMeshProps {
  foldAngle: number
}

export default function PaperMesh({ foldAngle }: PaperMeshProps) {
  const leftHalfRef = useRef<THREE.Mesh>(null)
  const rightHalfRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Create geometry for paper halves
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 2, 10, 10), [])
  
  // Create paper material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f8faf8',
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.1,
    })
  }, [])

  // Create fold line geometry
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const points = new Float32Array([0, -1, 0, 0, 1, 0])
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3))
    return geometry
  }, [])

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: '#7fa67f' })
  }, [])

  // Animate the fold
  useFrame((state) => {
    if (leftHalfRef.current && rightHalfRef.current && groupRef.current) {
      // Convert angle to radians
      const radians = (foldAngle * Math.PI) / 180
      
      // Rotate left half around the center line
      leftHalfRef.current.rotation.y = -radians
      rightHalfRef.current.rotation.y = radians
      
      // Slight floating animation
      const float = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      groupRef.current.position.y = float
    }
  })

  return (
    <group ref={groupRef}>
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
      <primitive object={new THREE.Line(lineGeometry, lineMaterial)} position={[0, 0, 0.01]} />
    </group>
  )
}