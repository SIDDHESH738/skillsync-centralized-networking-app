"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, UserPlus, Briefcase, Heart } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "connection",
    icon: UserPlus,
    user: "Sarah Chen",
    avatar: "/professional-woman-diverse.png",
    action: "connected with you",
    time: "2 hours ago",
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "message",
    icon: MessageCircle,
    user: "Mike Johnson",
    avatar: "/professional-man.png",
    action: "sent you a message about React project",
    time: "4 hours ago",
    color: "text-green-500",
  },
  {
    id: 3,
    type: "opportunity",
    icon: Briefcase,
    user: "TechCorp",
    avatar: "/generic-company-logo.png",
    action: "viewed your profile for Senior Developer role",
    time: "6 hours ago",
    color: "text-orange-500",
  },
  {
    id: 4,
    type: "endorsement",
    icon: Heart,
    user: "Lisa Wang",
    avatar: "/professional-asian-woman.png",
    action: "endorsed your React skills",
    time: "1 day ago",
    color: "text-red-500",
  },
]

export function RecentActivity() {
  return (
    <Card className="fade-up">
      <CardHeader>
        <CardTitle className="text-xl font-display font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-full bg-muted/20`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground text-sm">{activity.user}</span>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
