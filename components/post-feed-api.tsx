"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Trash2, Edit, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useUser } from '@clerk/nextjs'
import { useState } from "react"
import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  _id: string
  author: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  content: string
  images?: string[]
  videos?: string[]
  documents?: string[]
  likes: any[]
  comments: any[]
  shares: any[]
  tags: string[]
  visibility: string
  createdAt: string
  updatedAt: string
}

interface PostFeedProps {
  userId?: string
  limit?: number
}

export function PostFeedAPI({ userId, limit = 10 }: PostFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const { isSignedIn, user } = useUser()

  const fetchPosts = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true)
      setError(null)

      // Get posts from localStorage or create initial mock posts
      const storedPosts = localStorage.getItem('skillsync-posts')
      let allPosts: Post[] = storedPosts ? JSON.parse(storedPosts) : []

      // If no posts exist, create some initial mock posts
      if (allPosts.length === 0) {
        allPosts = [
          {
            _id: '1',
            author: {
              _id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: '/professional-headshot.png'
            },
            content: 'Just finished an amazing project! Excited to share the results with the community. 🚀',
            images: [],
            videos: [],
            documents: [],
            likes: [],
            comments: [],
            shares: [],
            tags: ['project', 'excited', 'community'],
            visibility: 'public',
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
          },
          {
            _id: '2',
            author: {
              _id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              avatar: '/professional-woman.png'
            },
            content: 'Learning new technologies is always exciting! Currently diving deep into React and Next.js. What are you learning?',
            images: [],
            videos: [],
            documents: [],
            likes: [],
            comments: [],
            shares: [],
            tags: ['learning', 'react', 'nextjs', 'technology'],
            visibility: 'public',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
          },
          {
            _id: '3',
            author: {
              _id: '3',
              name: 'Alex Chen',
              email: 'alex@example.com',
              avatar: '/professional-asian-man.png'
            },
            content: 'Just launched my new startup! Looking for talented developers to join our team. DM me if you\'re interested in working on cutting-edge AI projects!',
            images: [],
            videos: [],
            documents: [],
            likes: [],
            comments: [],
            shares: [],
            tags: ['startup', 'hiring', 'ai', 'opportunity'],
            visibility: 'public',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
          }
        ]
        localStorage.setItem('skillsync-posts', JSON.stringify(allPosts))
      }

      // Filter posts by user if specified
      const filteredPosts = userId ? allPosts.filter(post => post.author._id === userId) : allPosts

      // Sort by creation date (newest first)
      const sortedPosts = filteredPosts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      // Pagination
      const startIndex = (pageNum - 1) * limit
      const endIndex = startIndex + limit
      const pagePosts = sortedPosts.slice(startIndex, endIndex)

      if (reset) {
        setPosts(pagePosts)
      } else {
        setPosts(prev => [...prev, ...pagePosts])
      }

      setHasMore(endIndex < sortedPosts.length)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(1, true)
  }, [userId])

  useEffect(() => {
    const handlePostCreated = () => {
      fetchPosts(1, true)
    }

    window.addEventListener('postCreated', handlePostCreated)
    return () => window.removeEventListener('postCreated', handlePostCreated)
  }, [])

  const handleLike = async (postId: string) => {
    try {
      if (!isSignedIn) {
        throw new Error('Please log in to like posts')
      }

      // Update posts in state
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          const isLiked = post.likes.some((like: any) => like._id === 'current-user')
          return {
            ...post,
            likes: isLiked 
              ? post.likes.filter((like: any) => like._id !== 'current-user')
              : [...post.likes, { _id: 'current-user', name: 'You' }]
          }
        }
        return post
      }))

      // Update localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      if (storedPosts) {
        const allPosts: Post[] = JSON.parse(storedPosts)
        const updatedPosts = allPosts.map(post => {
          if (post._id === postId) {
            const isLiked = post.likes.some((like: any) => like._id === 'current-user')
            return {
              ...post,
              likes: isLiked 
                ? post.likes.filter((like: any) => like._id !== 'current-user')
                : [...post.likes, { _id: 'current-user', name: 'You' }]
            }
          }
          return post
        })
        localStorage.setItem('skillsync-posts', JSON.stringify(updatedPosts))
      }
    } catch (error: any) {
      console.error('Error liking post:', error)
      alert(error.message)
    }
  }

  const handleComment = async (postId: string, commentText: string) => {
    try {
      if (!isSignedIn) {
        throw new Error('Please log in to comment on posts')
      }

      const newComment = {
        _id: Date.now().toString(),
        user: { _id: 'current-user', name: 'You', email: 'you@example.com' },
        content: commentText,
        createdAt: new Date().toISOString()
      }

      // Update posts in state
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          }
        }
        return post
      }))

      // Update localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      if (storedPosts) {
        const allPosts: Post[] = JSON.parse(storedPosts)
        const updatedPosts = allPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment]
            }
          }
          return post
        })
        localStorage.setItem('skillsync-posts', JSON.stringify(updatedPosts))
      }
    } catch (error: any) {
      console.error('Error commenting on post:', error)
      alert(error.message)
    }
  }

  const handleShare = async (postId: string) => {
    try {
      if (!isSignedIn) {
        throw new Error('Please log in to share posts')
      }

      // Update posts in state
      setPosts(prev => prev.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            shares: [...post.shares, { _id: 'current-user', name: 'You' }]
          }
        }
        return post
      }))

      // Update localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      if (storedPosts) {
        const allPosts: Post[] = JSON.parse(storedPosts)
        const updatedPosts = allPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              shares: [...post.shares, { _id: 'current-user', name: 'You' }]
            }
          }
          return post
        })
        localStorage.setItem('skillsync-posts', JSON.stringify(updatedPosts))
      }

      // Show success message
      alert('Post shared successfully!')
    } catch (error: any) {
      console.error('Error sharing post:', error)
      alert(error.message)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      if (!isSignedIn) {
        throw new Error('Please log in to delete posts')
      }

      if (!confirm('Are you sure you want to delete this post?')) {
        return
      }

      // Update posts in state
      setPosts(prev => prev.filter(post => post._id !== postId))

      // Update localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      if (storedPosts) {
        const allPosts: Post[] = JSON.parse(storedPosts)
        const updatedPosts = allPosts.filter(post => post._id !== postId)
        localStorage.setItem('skillsync-posts', JSON.stringify(updatedPosts))
      }

      alert('Post deleted successfully!')
    } catch (error: any) {
      console.error('Error deleting post:', error)
      alert(error.message)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchPosts(nextPage, false)
    }
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button 
          onClick={() => fetchPosts(1, true)} 
          variant="outline" 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.author.avatar || "/placeholder-user.jpg"} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">{post.author.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isSignedIn && user && post.author._id === 'current-user' && (
                          <>
                            <DropdownMenuItem onClick={() => handleDeletePost(post._id)} className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Post
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Post
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => handleShare(post._id)}>
                          <Share className="w-4 h-4 mr-2" />
                          Share Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">{post.content}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post._id)}
                          className={`flex items-center gap-2 ${
                            post.likes.some((like: any) => like._id === 'current-user')
                              ? 'text-red-500'
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${
                            post.likes.some((like: any) => like._id === 'current-user') ? 'fill-current' : ''
                          }`} />
                          <span className="text-xs">{post.likes.length}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowComments(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
                          className="flex items-center gap-2 text-muted-foreground hover:text-blue-500"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{post.comments.length}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post._id)}
                          className="flex items-center gap-2 text-muted-foreground hover:text-green-500"
                        >
                          <Share className="w-4 h-4" />
                          <span className="text-xs">{post.shares.length}</span>
                        </Button>
                      </div>

                      <Badge variant="outline" className="text-xs">
                        {post.visibility}
                      </Badge>
                    </div>

                    {/* Comments Section */}
                    {showComments[post._id] && (
                      <div className="space-y-3 pt-3 border-t">
                        {/* Comment Input */}
                        {isSignedIn && (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Write a comment..."
                              value={commentInputs[post._id] || ''}
                              onChange={(e) => setCommentInputs(prev => ({ ...prev, [post._id]: e.target.value }))}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                if (commentInputs[post._id]?.trim()) {
                                  handleComment(post._id, commentInputs[post._id])
                                  setCommentInputs(prev => ({ ...prev, [post._id]: '' }))
                                }
                              }}
                              disabled={!commentInputs[post._id]?.trim()}
                            >
                              <Reply className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        {/* Comments List */}
                        {post.comments.length > 0 && (
                          <div className="space-y-2">
                            {post.comments.map((comment: any) => (
                              <div key={comment._id} className="flex gap-2 p-2 bg-muted/30 rounded-lg">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {comment.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium">{comment.user.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </span>
                                  </div>
                                  <p className="text-xs text-foreground mt-1">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && hasMore && (
        <div className="text-center">
          <Button onClick={loadMore} variant="outline">
            Load More Posts
          </Button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts found. Be the first to share something!</p>
        </div>
      )}
    </div>
  )
}
