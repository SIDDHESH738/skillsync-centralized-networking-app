"use client"

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { ChatWindow } from '@/components/chat-window'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useChat } from '@/contexts/ChatContext'
import { useUser } from '@clerk/nextjs'
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Filter,
  Users,
  Clock,
  Send
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Input } from '@/components/ui/input'

export default function ChatPage() {
  const { user, isSignedIn } = useUser()
  const { conversations, startConversation, isConnected } = useChat()
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')

  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access chat</h1>
          <p className="text-muted-foreground">You need to be signed in to use the messaging feature.</p>
        </div>
      </div>
    )
  }

  const filteredConversations = conversations.filter(conv => 
    conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    'User'.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartChat = (conversationId: string) => {
    setSelectedConversationId(conversationId)
    setShowChatWindow(true)
  }

  const handleNewChat = () => {
    // In a real app, this would open a user selection dialog
    const newUserId = `user-${Date.now()}`
    startConversation(newUserId)
    setShowChatWindow(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Messages</h1>
                <p className="text-muted-foreground">
                  Connect and chat with other professionals
                  {isConnected && (
                    <span className="ml-2 text-green-500 text-sm">• Online</span>
                  )}
                </p>
              </div>
              <Button onClick={handleNewChat} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {/* Conversations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => handleStartChat(conversation.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        {isConnected && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">User</h3>
                        <p className="text-sm text-muted-foreground">Professional</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {conversation.lastMessage?.content || 'No messages yet'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {conversation.lastMessage 
                        ? formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })
                        : 'No activity'
                      }
                    </span>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{conversation.unreadCount > 0 ? 'Unread' : 'Read'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* New Chat Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-dashed border-2 border-muted-foreground/25 hover:border-primary/50"
              onClick={handleNewChat}
            >
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-semibold mb-2">Start New Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with other professionals and start a conversation
                </p>
              </CardContent>
            </Card>
          </div>

          {filteredConversations.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No conversations found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or start a new conversation
              </p>
              <Button onClick={handleNewChat}>
                <Plus className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          )}

          {conversations.length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-4">
                Start connecting with other professionals by sending your first message
              </p>
              <Button onClick={handleNewChat}>
                <Plus className="w-4 h-4 mr-2" />
                Start Your First Chat
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Chat Window */}
      <ChatWindow
        isOpen={showChatWindow}
        onClose={() => setShowChatWindow(false)}
        conversationId={selectedConversationId}
      />
    </div>
  )
}
