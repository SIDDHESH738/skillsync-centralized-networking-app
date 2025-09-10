"use client"

import { motion } from "framer-motion"
import { Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const skills = [
  { name: "React", level: 95, endorsements: 24 },
  { name: "TypeScript", level: 90, endorsements: 18 },
  { name: "Node.js", level: 85, endorsements: 15 },
  { name: "Python", level: 80, endorsements: 12 },
  { name: "GraphQL", level: 75, endorsements: 8 },
  { name: "AWS", level: 70, endorsements: 6 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function ProfileSkills() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills & Endorsements</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {skill.endorsements}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
