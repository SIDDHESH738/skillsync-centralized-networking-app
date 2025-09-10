"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, MessageCircle, Users, Calendar, Bell } from "lucide-react"

const suggestions = [
  {
    name: "David Kim",
    title: "Senior Frontend Developer",
    company: "Google",
    avatar: "/professional-asian-man.png",
    mutualConnections: 12,
  },
  {
    name: "Emma Rodriguez",
    title: "UX Designer",
    company: "Figma",
    avatar: "/hispanic-professional-woman.png",
    mutualConnections: 8,
  },
  {
    name: "James Wilson",
    title: "Product Manager",
    company: "Microsoft",
    avatar: "/professional-man.png",
    mutualConnections: 15,
  },
]

export function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Find Connections
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Connection Suggestions */}
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
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={person.avatar || "/placeholder.svg"} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm truncate">{person.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {person.title} at {person.company}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {person.mutualConnections} mutual
                  </Badge>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">3 new profile views today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">New job match available</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Weekly network summary ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
