"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Video, FileText, Smile, Send } from "lucide-react"
import { useUser } from '@clerk/nextjs'

export function CreatePost() {
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const { user, isSignedIn } = useUser()

  // Don't render if user is not authenticated
  if (!isSignedIn || !user) {
    return null
  }

  const handlePost = async () => {
    if (!content.trim()) return

    setIsPosting(true)

    try {
      // Create new post object
      const newPost = {
        _id: Date.now().toString(),
        author: {
          _id: 'current-user',
          name: user.fullName || user.firstName || 'User',
          email: user.primaryEmailAddress?.emailAddress || '',
          avatar: user.imageUrl || '/placeholder-user.jpg'
        },
        content: content.trim(),
        images: [],
        videos: [],
        documents: [],
        likes: [],
        comments: [],
        shares: [],
        tags: content.match(/#\w+/g)?.map(tag => tag.slice(1)) || [],
        visibility: 'public',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Save to localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      const allPosts = storedPosts ? JSON.parse(storedPosts) : []
      allPosts.unshift(newPost) // Add to beginning
      localStorage.setItem('skillsync-posts', JSON.stringify(allPosts))
      
      setContent("")
      setIsExpanded(false)
      setIsPosting(false)
      
      // Trigger a refresh of the post feed
      window.dispatchEvent(new CustomEvent('postCreated', { detail: newPost }))
      
      alert('Post created successfully!')
    } catch (error: any) {
      setIsPosting(false)
      console.error('Error creating post:', error)
      alert(error.message)
    }
  }

  return (
    <Card className="fade-up">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.imageUrl || "/placeholder-user.jpg"} />
            <AvatarFallback>
              {(user.fullName || user.firstName || 'U').split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <motion.div layout className="relative">
              <Textarea
                placeholder="Share your thoughts, insights, or achievements..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                className={`resize-none transition-all duration-300 ${isExpanded ? "min-h-[120px]" : "min-h-[60px]"}`}
              />
            </motion.div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Media Options */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Photo
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      Video
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Document
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <Smile className="w-4 h-4" />
                      Emoji
                    </motion.button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">{content.length}/500 characters</div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsExpanded(false)
                          setContent("")
                        }}
                      >
                        Cancel
                      </Button>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handlePost} disabled={!content.trim() || isPosting} className="group">
                          {isPosting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              Post
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
