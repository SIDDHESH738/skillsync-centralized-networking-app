"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, MapPin, Calendar, Globe, Mail } from "lucide-react"

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="fade-up overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
          animate={{
            background: [
              "linear-gradient(to right, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))",
              "linear-gradient(to right, rgba(33, 150, 243, 0.1), rgba(76, 175, 80, 0.1))",
              "linear-gradient(to right, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.1))",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }} className="relative">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback className="text-2xl">AJ</AvatarFallback>
            </Avatar>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">Alex Johnson</h1>
                <p className="text-xl text-muted-foreground">Senior Full Stack Developer</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">San Francisco, CA</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">342</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1.2k</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">95%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
              </div>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "Python", "AWS"].map((skill) => (
                <motion.div key={skill} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Badge variant="secondary">{skill}</Badge>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                alex.johnson@email.com
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                alexjohnson.dev
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined March 2022
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">
            Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized
            in React, Node.js, and cloud architecture. Love mentoring junior developers and contributing to open-source
            projects. Always excited about new technologies and best practices.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
