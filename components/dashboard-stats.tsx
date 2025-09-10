"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, MessageCircle, Briefcase } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    label: "Profile Views",
    value: 1247,
    change: "+12%",
    color: "text-primary",
  },
  {
    icon: Users,
    label: "Connections",
    value: 342,
    change: "+5%",
    color: "text-secondary",
  },
  {
    icon: MessageCircle,
    label: "Messages",
    value: 28,
    change: "+18%",
    color: "text-green-500",
  },
  {
    icon: Briefcase,
    label: "Opportunities",
    value: 7,
    change: "+2%",
    color: "text-orange-500",
  },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * value)

      setCount(currentCount)
      countRef.current = currentCount

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    updateCount()
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="stagger-item"
        >
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} />
                    </h3>
                    <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-muted/20`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
