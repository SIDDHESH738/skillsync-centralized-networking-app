"use client"

import { motion } from "framer-motion"
import { Plus, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    duration: "2022 - Present",
    type: "Full-time",
    description:
      "Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.",
    skills: ["React", "TypeScript", "GraphQL", "AWS"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Remote",
    duration: "2020 - 2022",
    type: "Full-time",
    description:
      "Built responsive web applications and collaborated with design teams to create exceptional user experiences.",
    skills: ["React", "JavaScript", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "WebSolutions Ltd.",
    location: "New York, NY",
    duration: "2019 - 2020",
    type: "Full-time",
    description: "Developed and maintained client websites using modern frontend frameworks and best practices.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ProfileExperience() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experience</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={itemVariants} className="border-l-2 border-muted pl-4 pb-6 last:pb-0">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="outline">{exp.type}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
