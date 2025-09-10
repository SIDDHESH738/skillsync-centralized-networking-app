"use client"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Star, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const marketplaceItems = [
  {
    id: 1,
    title: "React Development Mentorship",
    type: "service",
    price: "$50/hour",
    rating: 4.9,
    reviews: 127,
    seller: "Sarah Chen",
    location: "San Francisco, CA",
    image: "/professional-woman-diverse.png",
    tags: ["React", "JavaScript", "Mentoring"],
    description: "1-on-1 React mentorship sessions with senior developer",
  },
  {
    id: 2,
    title: "Senior Frontend Developer",
    type: "job",
    price: "$120k - $150k",
    company: "TechCorp",
    location: "Remote",
    image: "/generic-company-logo.png",
    tags: ["React", "TypeScript", "Remote"],
    description: "Join our team building next-generation web applications",
  },
  {
    id: 3,
    title: "UI/UX Design Course",
    type: "course",
    price: "$299",
    rating: 4.8,
    reviews: 89,
    instructor: "Alex Rodriguez",
    location: "Online",
    image: "/design-mockup.png",
    tags: ["Design", "Figma", "UX"],
    description: "Complete UI/UX design course from beginner to advanced",
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

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Discover opportunities, services, and skill exchanges</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search jobs, services, courses..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post Listing
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {["All", "Jobs", "Services", "Courses", "Mentorship", "Freelance"].map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Marketplace Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {marketplaceItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-foreground">{item.price}</span>
                      </div>
                      {item.rating && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                          <span className="text-muted-foreground">({item.reviews})</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
