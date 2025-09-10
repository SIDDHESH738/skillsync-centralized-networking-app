"use client"

import { motion } from "framer-motion"
import { Plus, ExternalLink, Github, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    image: "/design-mockup.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    stars: 124,
    status: "Completed",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/kubernetes-dashboard.png",
    technologies: ["React", "TypeScript", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/example/taskapp",
    liveUrl: "https://taskapp-demo.com",
    stars: 89,
    status: "In Progress",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with interactive maps, forecasts, and location-based weather data visualization.",
    image: "/design-mockup.png",
    technologies: ["Vue.js", "D3.js", "Weather API", "Tailwind"],
    githubUrl: "https://github.com/example/weather",
    liveUrl: "https://weather-demo.com",
    stars: 67,
    status: "Completed",
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

export function ProfileProjects() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full md:w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="text-xs">
                          {project.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{project.stars}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
