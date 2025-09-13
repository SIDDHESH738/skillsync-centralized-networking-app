"use client"

import { Navigation } from "@/components/navigation"
import { ScrollAnimations } from "@/components/scroll-animations"
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, MapPin, Globe, Mail, Phone, Calendar, Save, X, Plus, Trash2, Settings, Bell, Shield, Users, Star, Award, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    bio: '',
    location: '',
    website: '',
    phone: '',
    skills: [] as string[]
  })
  const [newSkill, setNewSkill] = useState('')
  const [userStats, setUserStats] = useState({
    posts: 0,
    connections: 0,
    likes: 0
  })

  useEffect(() => {
    if (user) {
      setEditData({
        bio: (user.publicMetadata?.bio as string) || '',
        location: (user.publicMetadata?.location as string) || '',
        website: (user.publicMetadata?.website as string) || '',
        phone: (user.publicMetadata?.phone as string) || '',
        skills: (user.publicMetadata?.skills as string[]) || []
      })
      
      // Calculate user stats from localStorage
      const storedPosts = localStorage.getItem('skillsync-posts')
      if (storedPosts) {
        const allPosts = JSON.parse(storedPosts)
        const userPosts = allPosts.filter((post: any) => post.author._id === 'current-user')
        const totalLikes = userPosts.reduce((sum: number, post: any) => sum + post.likes.length, 0)
        
        setUserStats({
          posts: userPosts.length,
          connections: 156, // Mock data
          likes: totalLikes
        })
      }
    }
  }, [user])

  const handleSave = async () => {
    try {
      // In a real app, you'd update the user's metadata via Clerk API
      // For now, we'll just update local state
      setIsEditing(false)
      alert('Profile updated successfully! (Note: This is a demo - changes are not persisted)')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    }
  }

  const handleCancel = () => {
    if (user) {
      setEditData({
        bio: (user.publicMetadata?.bio as string) || '',
        location: (user.publicMetadata?.location as string) || '',
        website: (user.publicMetadata?.website as string) || '',
        phone: (user.publicMetadata?.phone as string) || '',
        skills: (user.publicMetadata?.skills as string[]) || []
      })
    }
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="md:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="md:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Please sign in to view your profile</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.imageUrl || "/placeholder-user.jpg"} />
                  <AvatarFallback className="text-2xl">
                    {(user.fullName || user.firstName || 'U').split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground">
                    {user.fullName || `${user.firstName} ${user.lastName}`.trim() || 'User'}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {user.publicMetadata?.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {user.publicMetadata.location as string}
                      </div>
                    )}
                    {user.publicMetadata?.website && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <a href={user.publicMetadata.website as string} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bio</label>
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <Input
                        value={editData.location}
                        onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Website</label>
                      <Input
                        value={editData.website}
                        onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.publicMetadata?.bio && (
                    <p className="text-muted-foreground leading-relaxed">
                      {user.publicMetadata.bio as string}
                    </p>
                  )}
                  {!user.publicMetadata?.bio && (
                    <p className="text-muted-foreground italic">No bio added yet. Click "Edit Profile" to add one.</p>
                  )}
            </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
            </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">{userStats.posts}</span>
                <p className="text-sm text-muted-foreground">Total posts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">{userStats.connections}</span>
                <p className="text-sm text-muted-foreground">Professional network</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Likes Received</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold">{userStats.likes}</span>
                <p className="text-sm text-muted-foreground">Total likes</p>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skills & Expertise</CardTitle>
                {isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Skills
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {editData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} disabled={!newSkill.trim()}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {editData.skills.length > 0 ? (
                    editData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.primaryEmailAddress?.emailAddress}</span>
              </div>
              {editData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{editData.phone}</span>
                </div>
              )}
              {editData.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href={editData.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {editData.website}
                  </a>
                </div>
              )}
              {editData.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{editData.location}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Preferences
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Connections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
