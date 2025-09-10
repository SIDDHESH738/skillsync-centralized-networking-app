"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Text } from "@react-three/drei"
import type * as THREE from "three"

function SkillOrb({ position, skill, color }: { position: [number, number, number]; skill: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Sphere>
      <Text position={[0, -0.8, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {skill}
      </Text>
    </group>
  )
}

export function ThreeSkillOrbs() {
  const skills = [
    { name: "React", color: "#61DAFB", position: [-2, 0, 0] as [number, number, number] },
    { name: "Node.js", color: "#68A063", position: [2, 1, -1] as [number, number, number] },
    { name: "Python", color: "#3776AB", position: [0, -1, 1] as [number, number, number] },
    { name: "Design", color: "#FF6B6B", position: [-1, 2, -2] as [number, number, number] },
    { name: "AI/ML", color: "#4CAF50", position: [1.5, -0.5, 0.5] as [number, number, number] },
  ]

  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#4CAF50" intensity={0.3} />

        {skills.map((skill, index) => (
          <SkillOrb key={skill.name} position={skill.position} skill={skill.name} color={skill.color} />
        ))}
      </Canvas>
    </div>
  )
}
