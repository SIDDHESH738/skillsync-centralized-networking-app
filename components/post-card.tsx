"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from "lucide-react"
import * as AnimeNS from "animejs"
const anime: any = (AnimeNS as any).default ?? (AnimeNS as any)

interface Post {
  id: number
  author: {
    name: string
    title: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  image?: string
  liked: boolean
}

interface PostCardProps {
  post: Post
  onLike: (postId: number) => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [showFullContent, setShowFullContent] = useState(false)
  const likeButtonRef = useRef<HTMLButtonElement>(null)

  const handleLike = () => {
    onLike(post.id)

    // Anime.js heart particle burst animation
    if (likeButtonRef.current) {
      const button = likeButtonRef.current
      const rect = button.getBoundingClientRect()

      // Create particles
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div")
        particle.className = "fixed w-2 h-2 bg-red-500 rounded-full pointer-events-none z-50"
        particle.style.left = `${rect.left + rect.width / 2}px`
        particle.style.top = `${rect.top + rect.height / 2}px`
        document.body.appendChild(particle)

        anime({
          targets: particle,
          translateX: anime.random(-50, 50),
          translateY: anime.random(-50, 50),
          scale: [1, 0],
          opacity: [1, 0],
          duration: 800,
          easing: "easeOutCubic",
          complete: () => {
            document.body.removeChild(particle)
          },
        })
      }

      // Button scale animation
      anime({
        targets: button,
        scale: [1, 1.2, 1],
        duration: 300,
        easing: "easeOutBack",
      })
    }
  }

  const truncatedContent = post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                {post.author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{post.author.title}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed">{showFullContent ? post.content : truncatedContent}</p>

          {post.content.length > 200 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-primary hover:underline text-sm mt-1"
            >
              {showFullContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Image */}
        {post.image && (
          <motion.div
            className="mb-4 rounded-lg overflow-hidden cursor-zoom-in"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={post.image || "/placeholder.svg?height=300&width=500"}
              alt="Post content"
              className="w-full h-64 object-cover"
            />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-6">
            <motion.button
              ref={likeButtonRef}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center gap-2 text-sm transition-colors ${
                post.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`} />
              {post.likes}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {post.comments}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <Share className="w-5 h-5" />
              {post.shares}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </motion.button>
        </div>
      </CardContent>
    </Card>
  )
}
