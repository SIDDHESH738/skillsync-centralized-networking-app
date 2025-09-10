"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, MessageCircle } from "lucide-react"

const suggestions = [
  {
    name: "James Wilson",
    title: "Senior Product Manager",
    company: "Apple",
    avatar: "/professional-man.png",
    mutualConnections: 15,
    skills: ["Product Strategy", "Analytics"],
    reason: "Works at Apple",
  },
  {
    name: "Maria Garcia",
    title: "Lead Designer",
    company: "Adobe",
    avatar: "/hispanic-professional-woman.png",
    mutualConnections: 8,
    skills: ["UI/UX", "Prototyping"],
    reason: "Similar skills",
  },
  {
    name: "Alex Chen",
    title: "Engineering Manager",
    company: "Tesla",
    avatar: "/professional-asian-man.png",
    mutualConnections: 12,
    skills: ["Leadership", "React"],
    reason: "Mutual connections",
  },
]

const recentConnections = [
  {
    name: "Sophie Turner",
    title: "Frontend Developer",
    avatar: "/professional-woman-diverse.png",
    connectedAt: "2 days ago",
  },
  {
    name: "Robert Kim",
    title: "DevOps Engineer",
    avatar: "/professional-asian-man.png",
    connectedAt: "1 week ago",
  },
  {
    name: "Elena Rodriguez",
    title: "Data Analyst",
    avatar: "/hispanic-professional-woman.png",
    connectedAt: "2 weeks ago",
  },
]

export function ConnectionsSidebar() {
  const [connectingIds, setConnectingIds] = useState<string[]>([])

  const handleConnect = async (name: string) => {
    setConnectingIds((prev) => [...prev, name])

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setConnectingIds((prev) => prev.filter((id) => id !== name))
  }

  return (
    <div className="space-y-6">
      {/* Network Stats */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold">Network Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Connections</span>
            <span className="font-semibold text-primary">342</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="font-semibold text-green-500">+23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Profile Views</span>
            <span className="font-semibold text-secondary">1,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network Reach</span>
            <span className="font-semibold text-orange-500">15.2k</span>
          </div>
        </CardContent>
      </Card>

      {/* People You May Know */}
      <Card className="fade-up">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display font-semibold">People You May Know</CardTitle>
          <Button variant="ghost" size="sm">
            See All
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="stagger-item p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">{person.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {person.title} at {person.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{person.mutualConnections} mutual connections</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {person.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleConnect(person.name)}
                    disabled={connectingIds.includes(person.name)}
                  >
                    {connectingIds.includes(person.name) ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-3 h-3 border border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </motion.div>
              </div>

              <p className="text-xs text-muted-foreground mt-2 italic">{person.reason}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Connections */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold">Recent Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentConnections.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={person.avatar || "/placeholder.svg"} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{person.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{person.title}</p>
              </div>

              <div className="text-xs text-muted-foreground">{person.connectedAt}</div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
