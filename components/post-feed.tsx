"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { PostCard } from "./post-card"

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      title: "Senior UX Designer",
      avatar: "/professional-woman-diverse.png",
    },
    content:
      "Just completed an amazing project redesigning the user onboarding flow. The new design increased conversion rates by 40%! 🎉 Always exciting to see data-driven design improvements make such a big impact.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    image: "/design-mockup.png",
    liked: false,
  },
  {
    id: 2,
    author: {
      name: "Mike Johnson",
      title: "Full Stack Developer",
      avatar: "/professional-man.png",
    },
    content:
      "Excited to share that I just open-sourced my React component library! It includes 50+ customizable components with TypeScript support and comprehensive documentation. Link in comments 👇",
    timestamp: "4 hours ago",
    likes: 156,
    comments: 23,
    shares: 12,
    liked: true,
  },
  {
    id: 3,
    author: {
      name: "Lisa Wang",
      title: "Product Manager",
      avatar: "/professional-asian-woman.png",
    },
    content:
      "Key learnings from launching our AI-powered feature: 1) User feedback is invaluable 2) Start with MVP and iterate 3) Cross-functional collaboration is everything. What's your biggest product launch lesson?",
    timestamp: "6 hours ago",
    likes: 89,
    comments: 34,
    shares: 7,
    liked: false,
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      title: "DevOps Engineer",
      avatar: "/professional-asian-man.png",
    },
    content:
      "Successfully migrated our entire infrastructure to Kubernetes! Deployment time reduced from 30 minutes to 2 minutes. The team is thrilled with the improved developer experience.",
    timestamp: "8 hours ago",
    likes: 67,
    comments: 15,
    shares: 5,
    image: "/kubernetes-dashboard.png",
    liked: true,
  },
  {
    id: 5,
    author: {
      name: "Emma Rodriguez",
      title: "Data Scientist",
      avatar: "/hispanic-professional-woman.png",
    },
    content:
      "Fascinating insights from our latest ML model: customer behavior patterns are more predictable than we thought. The model achieved 94% accuracy in predicting user churn. Data science never ceases to amaze me!",
    timestamp: "12 hours ago",
    likes: 112,
    comments: 28,
    shares: 9,
    liked: false,
  },
]

export function PostFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading])

  const loadMorePosts = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add more posts (in real app, this would be from API)
    const newPosts = mockPosts.map((post) => ({
      ...post,
      id: post.id + posts.length,
    }))

    setPosts((prev) => [...prev, ...newPosts])
    setLoading(false)

    // Simulate end of posts after a few loads
    if (posts.length > 20) {
      setHasMore(false)
    }
  }

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index < 5 ? index * 0.1 : 0,
            ease: "easeOut",
          }}
          className="stagger-item"
        >
          <PostCard post={post} onLike={handleLike} />
        </motion.div>
      ))}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Intersection observer target */}
      <div ref={observerRef} className="h-4" />

      {/* End of posts message */}
      {!hasMore && <div className="text-center py-8 text-muted-foreground">You've reached the end of your feed</div>}
    </div>
  )
}
