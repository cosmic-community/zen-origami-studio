'use client'

import { useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

interface PaperMeshProps {
  foldAngle?: number
  color?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  interactive?: boolean
}

export default function PaperMesh({ 
  foldAngle = 0,
  color = '#f8f4e6', 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  interactive = true 
}: PaperMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Create origami paper geometry
  const geometry = new THREE.PlaneGeometry(2, 2, 8, 8)
  
  // Create subtle fold effect with proper null checks
  const positions = geometry.attributes.position
  if (positions) {
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = Math.sin(x * Math.PI) * Math.cos(y * Math.PI) * 0.1 + (foldAngle / 180) * Math.sin(x * Math.PI * 2) * 0.3
      positions.setZ(i, z)
    }
    positions.needsUpdate = true
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setHovered(true)
  }

  const handlePointerOut = () => setHovered(false)
  const handleClick = () => setClicked(!clicked)

  return (
    <group position={position}>
      {/* Main paper mesh */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={scale * (hovered ? 1.05 : 1)}
        onPointerOver={interactive ? handlePointerOver : undefined}
        onPointerOut={interactive ? handlePointerOut : undefined}
        onClick={interactive ? handleClick : undefined}
      >
        <meshLambertMaterial 
          color={hovered ? '#f0e6d2' : color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Shadow mesh */}
      <mesh
        geometry={geometry}
        position={[0.1, -0.1, -0.01]}
        scale={scale}
      >
        <meshBasicMaterial 
          color="#d0c4b0"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Fold lines */}
      <primitive 
        object={new THREE.EdgesGeometry(geometry)} 
      />
    </group>
  )
}