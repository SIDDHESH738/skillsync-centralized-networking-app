"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useFrame } from "@react-three/fiber"
import { Sphere, Text, Line, OrbitControls } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import type * as THREE from "three"

interface Skill {
  name: string
  level: number
  position: [number, number, number]
  color: string
  connections: number[]
}

const skills: Skill[] = [
  { name: "React", level: 90, position: [0, 0, 0], color: "#61DAFB", connections: [1, 2] },
  { name: "Node.js", level: 85, position: [3, 1, -1], color: "#68A063", connections: [0, 3] },
  { name: "Python", level: 80, position: [-2, -1, 2], color: "#3776AB", connections: [0, 4] },
  { name: "TypeScript", level: 88, position: [1, -2, 1], color: "#3178C6", connections: [1] },
  { name: "GraphQL", level: 75, position: [-3, 2, -2], color: "#E10098", connections: [2] },
]

function SkillNode({ skill, index, onHover }: { skill: Skill; index: number; onHover: (skill: Skill | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = skill.position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1

      if (hovered) {
        meshRef.current.scale.setScalar(1.2)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const handlePointerEnter = () => {
    setHovered(true)
    onHover(skill)
  }

  const handlePointerLeave = () => {
    setHovered(false)
    onHover(null)
  }

  const radius = 0.3 + (skill.level / 100) * 0.3

  return (
    <group position={skill.position}>
      <Sphere
        ref={meshRef}
        args={[radius, 32, 32]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          emissive={hovered ? skill.color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>

      <Text position={[0, -radius - 0.3, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>

      <Text position={[0, -radius - 0.5, 0]} fontSize={0.1} color="#888" anchorX="center" anchorY="middle">
        {skill.level}%
      </Text>
    </group>
  )
}

function ConnectionLines({ skills }: { skills: Skill[] }) {
  const lines: JSX.Element[] = []

  skills.forEach((skill, index) => {
    skill.connections.forEach((connectionIndex) => {
      if (connectionIndex < skills.length) {
        const connectedSkill = skills[connectionIndex]
        lines.push(
          <Line
            key={`${index}-${connectionIndex}`}
            points={[skill.position, connectedSkill.position]}
            color="#4CAF50"
            opacity={0.3}
            lineWidth={1}
          />,
        )
      }
    })
  })

  return <>{lines}</>
}

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false })

export function SkillOrbitGraph() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)

  return (
    <Card className="fade-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-display font-semibold">Skill Network</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="h-96 w-full">
            <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} color="#4CAF50" intensity={0.3} />

              <ConnectionLines skills={skills} />

              {skills.map((skill, index) => (
                <SkillNode key={skill.name} skill={skill} index={index} onHover={setHoveredSkill} />
              ))}

              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>

          {hoveredSkill && (
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-foreground">{hoveredSkill.name}</h4>
              <p className="text-sm text-muted-foreground">Proficiency: {hoveredSkill.level}%</p>
              <p className="text-sm text-muted-foreground">Connections: {hoveredSkill.connections.length}</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Drag to rotate • Scroll to zoom • Hover over nodes for details</p>
        </div>
      </CardContent>
    </Card>
  )
}
