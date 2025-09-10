"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Text, Line, OrbitControls } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Filter, Search } from "lucide-react"
import type * as THREE from "three"

interface Connection {
  id: number
  name: string
  title: string
  company: string
  avatar: string
  position: [number, number, number]
  connections: number[]
  skills: string[]
  strength: number
}

const connections: Connection[] = [
  {
    id: 0,
    name: "You",
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    avatar: "/professional-headshot.png",
    position: [0, 0, 0],
    connections: [1, 2, 3, 4],
    skills: ["React", "Node.js", "TypeScript"],
    strength: 100,
  },
  {
    id: 1,
    name: "Sarah Chen",
    title: "UX Designer",
    company: "Google",
    avatar: "/professional-woman-diverse.png",
    position: [3, 1, -1],
    connections: [0, 2, 5],
    skills: ["Design", "Figma", "Research"],
    strength: 85,
  },
  {
    id: 2,
    name: "Mike Johnson",
    title: "DevOps Engineer",
    company: "Microsoft",
    avatar: "/professional-man.png",
    position: [-2, -1, 2],
    connections: [0, 1, 4],
    skills: ["AWS", "Docker", "Kubernetes"],
    strength: 92,
  },
  {
    id: 3,
    name: "Lisa Wang",
    title: "Product Manager",
    company: "Meta",
    avatar: "/professional-asian-woman.png",
    position: [1, -2, 1],
    connections: [0, 4, 5],
    skills: ["Strategy", "Analytics", "Leadership"],
    strength: 78,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Scientist",
    company: "Netflix",
    avatar: "/professional-asian-man.png",
    position: [-3, 2, -2],
    connections: [0, 2, 3],
    skills: ["Python", "ML", "Statistics"],
    strength: 88,
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    title: "Frontend Developer",
    company: "Spotify",
    avatar: "/hispanic-professional-woman.png",
    position: [2, 2, 1],
    connections: [1, 3],
    skills: ["React", "Vue", "CSS"],
    strength: 75,
  },
]

function ConnectionNode({
  connection,
  isHovered,
  onHover,
}: {
  connection: Connection
  isHovered: boolean
  onHover: (connection: Connection | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = connection.position[1] + Math.sin(state.clock.elapsedTime + connection.id) * 0.1

      if (isHovered) {
        meshRef.current.scale.setScalar(1.3)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }

    if (glowRef.current) {
      glowRef.current.visible = isHovered
      if (isHovered) {
        glowRef.current.scale.setScalar(2 + Math.sin(state.clock.elapsedTime * 3) * 0.2)
      }
    }
  })

  const handlePointerEnter = () => onHover(connection)
  const handlePointerLeave = () => onHover(null)

  const radius = 0.3 + (connection.strength / 100) * 0.2
  const color = connection.id === 0 ? "#4CAF50" : "#2196F3"

  return (
    <group position={connection.position}>
      {/* Glow ring */}
      <mesh ref={glowRef} visible={false}>
        <ringGeometry args={[radius + 0.1, radius + 0.3, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Main node */}
      <Sphere
        ref={meshRef}
        args={[radius, 32, 32]}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </Sphere>

      <Text position={[0, -radius - 0.4, 0]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">
        {connection.name}
      </Text>

      <Text position={[0, -radius - 0.6, 0]} fontSize={0.08} color="#888" anchorX="center" anchorY="middle">
        {connection.title}
      </Text>
    </group>
  )
}

function ConnectionLines({ connections }: { connections: Connection[] }) {
  const lines = []

  connections.forEach((connection) => {
    connection.connections.forEach((connectionId) => {
      const connectedNode = connections.find((c) => c.id === connectionId)
      if (connectedNode) {
        const strength = Math.min(connection.strength, connectedNode.strength) / 100
        lines.push(
          <Line
            key={`${connection.id}-${connectionId}`}
            points={[connection.position, connectedNode.position]}
            color="#4CAF50"
            opacity={0.2 + strength * 0.3}
            lineWidth={1 + strength * 2}
          />,
        )
      }
    })
  })

  return <>{lines}</>
}

export function ConnectionsGraph() {
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(null)
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Stagger animation for connection info
      if (hoveredConnection) {
        gsap.fromTo(".connection-info", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 })
      }
    }

    loadGSAP()
  }, [hoveredConnection])

  return (
    <Card className="fade-up">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-display font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Network Graph
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="h-96 w-full">
            <Canvas camera={{ position: [6, 6, 6], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} color="#4CAF50" intensity={0.3} />

              <ConnectionLines connections={connections} />

              {connections.map((connection) => (
                <ConnectionNode
                  key={connection.id}
                  connection={connection}
                  isHovered={hoveredConnection?.id === connection.id}
                  onHover={setHoveredConnection}
                />
              ))}

              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>

          {/* Connection Info Overlay */}
          {hoveredConnection && (
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg max-w-xs">
              <div className="connection-info flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={hoveredConnection.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{hoveredConnection.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="connection-info font-semibold text-foreground">{hoveredConnection.name}</h4>
                  <p className="connection-info text-sm text-muted-foreground">{hoveredConnection.title}</p>
                  <p className="connection-info text-sm text-muted-foreground">{hoveredConnection.company}</p>
                  <div className="connection-info flex flex-wrap gap-1 mt-2">
                    {hoveredConnection.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="connection-info mt-2">
                    <div className="text-xs text-muted-foreground">Connection Strength</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${hoveredConnection.strength}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Drag to rotate • Scroll to zoom • Hover over nodes for details • Node size indicates connection strength
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
