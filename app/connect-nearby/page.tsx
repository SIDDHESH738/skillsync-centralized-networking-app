"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, MessageCircle, UserPlus } from "lucide-react"

interface NearbyUser {
  id: string
  name: string
  title: string
  company: string
  skills: string[]
  distance: string
  avatar: string
  isOnline: boolean
}

const mockNearbyUsers: NearbyUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    skills: ["React", "TypeScript", "UI/UX"],
    distance: "0.2 km",
    avatar: "/professional-woman-diverse.png",
    isOnline: true,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    title: "Product Manager",
    company: "StartupXYZ",
    skills: ["Product Strategy", "Agile", "Analytics"],
    distance: "0.5 km",
    avatar: "/professional-man.png",
    isOnline: true,
  },
  {
    id: "3",
    name: "Emily Johnson",
    title: "Data Scientist",
    company: "DataFlow Inc",
    skills: ["Python", "Machine Learning", "SQL"],
    distance: "0.8 km",
    avatar: "/professional-woman-diverse.png",
    isOnline: false,
  },
]

export default function ConnectNearbyPage() {
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(false)

  useEffect(() => {
    // Simulate location permission check
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationEnabled(true)
          setNearbyUsers(mockNearbyUsers)
        },
        () => {
          setLocationEnabled(false)
        },
      )
    }
  }, [])

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false)
      setNearbyUsers(mockNearbyUsers)
    }, 2000)
  }

  const handleConnect = (userId: string) => {
    console.log("[v0] Connecting to user:", userId)
    // Add connection logic here
  }

  const handleMessage = (userId: string) => {
    console.log("[v0] Messaging user:", userId)
    // Add messaging logic here
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 md:ml-64">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Connect Nearby</h1>
          <p className="text-muted-foreground text-lg">Discover and connect with professionals in your area</p>
        </motion.div>

        {/* Location Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${locationEnabled ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm">{locationEnabled ? "Location enabled" : "Location disabled"}</span>
              </div>
              <Button onClick={handleScan} disabled={!locationEnabled || isScanning} className="gap-2">
                <Wifi className={`h-4 w-4 ${isScanning ? "animate-pulse" : ""}`} />
                {isScanning ? "Scanning..." : "Scan for Users"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Users */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nearbyUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                            user.isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.title}</p>
                        <p className="text-xs text-muted-foreground">{user.company}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {user.distance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleConnect(user.id)} className="flex-1 gap-1">
                      <UserPlus className="h-3 w-3" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleMessage(user.id)} className="gap-1">
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {!locationEnabled && (
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <MapPin className="h-8 w-8 text-yellow-600 mx-auto" />
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Location Access Required</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please enable location services to discover nearby professionals
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
