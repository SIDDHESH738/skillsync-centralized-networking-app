"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Hash } from "lucide-react"

const trendingTopics = [
  { tag: "ReactJS", posts: 1247, growth: "+12%" },
  { tag: "AI", posts: 892, growth: "+25%" },
  { tag: "WebDev", posts: 756, growth: "+8%" },
  { tag: "TypeScript", posts: 634, growth: "+15%" },
  { tag: "NextJS", posts: 523, growth: "+18%" },
  { tag: "DevOps", posts: 445, growth: "+6%" },
]

const suggestedConnections = [
  {
    name: "Tech Innovators",
    members: "12.5k",
    description: "Latest trends in technology and innovation",
  },
  {
    name: "Frontend Developers",
    members: "8.2k",
    description: "React, Vue, Angular and modern frontend",
  },
  {
    name: "Startup Founders",
    members: "5.7k",
    description: "Entrepreneurship and startup insights",
  },
]

export function TrendingTopics() {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">#{topic.tag}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {topic.growth}
              </Badge>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Groups */}
      <Card className="fade-up">
        <CardHeader>
          <CardTitle className="text-lg font-display font-semibold">Suggested Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedConnections.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground text-sm">{group.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {group.members}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{group.description}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Join Group
              </motion.button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
