"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChat } from '@/contexts/ChatContext'
import { useUser } from '@clerk/nextjs'
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  ArrowLeft,
  Online,
  Clock
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  conversationId?: string
}

export function ChatWindow({ isOpen, onClose, conversationId }: ChatWindowProps) {
  const { user } = useUser()
  const { 
    conversations, 
    currentConversation, 
    messages, 
    sendMessage, 
    selectConversation,
    isConnected 
  } = useChat()
  
  const [messageInput, setMessageInput] = useState('')
  const [showConversations, setShowConversations] = useState(!conversationId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (conversationId) {
      selectConversation(conversationId)
      setShowConversations(false)
    }
  }, [conversationId, selectConversation])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversation || !user) return

    const receiverId = currentConversation.participants.find(p => p !== user.id)
    if (receiverId) {
      sendMessage(receiverId, messageInput.trim())
      setMessageInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getOtherParticipant = () => {
    if (!currentConversation || !user) return null
    return currentConversation.participants.find(p => p !== user.id)
  }

  const formatMessageTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!showConversations && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConversations(true)}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {currentConversation ? 'U' : 'C'}
                    </AvatarFallback>
                  </Avatar>
                  {isConnected && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {currentConversation ? 'Chat' : 'Messages'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isConnected ? 'Online' : 'Connecting...'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <AnimatePresence>
            {showConversations && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-r bg-muted/20 flex-shrink-0"
              >
                <div className="p-4">
                  <h4 className="font-semibold mb-4">Conversations</h4>
                  <ScrollArea className="h-[calc(80vh-120px)]">
                    <div className="space-y-2">
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => {
                            selectConversation(conversation.id)
                            setShowConversations(false)
                          }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            currentConversation?.id === conversation.id
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src="/placeholder-user.jpg" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">User</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageTime(conversation.updatedAt)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage?.content || 'No messages yet'}
                              </p>
                            </div>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-2 max-w-[70%] ${message.senderId === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className={`rounded-lg px-3 py-2 ${
                            message.senderId === user?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.senderId === user?.id
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'
                            }`}>
                              {formatMessageTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}