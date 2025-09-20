"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'image' | 'file'
}

interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  updatedAt: string
}

interface ChatContextType {
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  isConnected: boolean
  sendMessage: (receiverId: string, content: string, type?: 'text' | 'image' | 'file') => void
  selectConversation: (conversationId: string) => void
  markAsRead: (conversationId: string) => void
  startConversation: (userId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Load conversations and messages from localStorage
  useEffect(() => {
    if (!isSignedIn || !user) return

    const storedConversations = localStorage.getItem(`chat-conversations-${user.id}`)
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations))
    } else {
      // Create some sample conversations
      const sampleConversations: Conversation[] = [
        {
          id: 'conv-1',
          participants: [user.id, 'user-2'],
          unreadCount: 2,
          updatedAt: new Date().toISOString(),
          lastMessage: {
            id: 'msg-1',
            senderId: 'user-2',
            receiverId: user.id,
            content: 'Hey! How are you doing?',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            read: false,
            type: 'text'
          }
        },
        {
          id: 'conv-2',
          participants: [user.id, 'user-3'],
          unreadCount: 0,
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          lastMessage: {
            id: 'msg-2',
            senderId: user.id,
            receiverId: 'user-3',
            content: 'Thanks for the opportunity!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            read: true,
            type: 'text'
          }
        }
      ]
      setConversations(sampleConversations)
      localStorage.setItem(`chat-conversations-${user.id}`, JSON.stringify(sampleConversations))
    }
  }, [isSignedIn, user])

  // Load messages for current conversation
  useEffect(() => {
    if (!currentConversation || !user) return

    const storedMessages = localStorage.getItem(`chat-messages-${currentConversation.id}`)
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      // Create some sample messages
      const sampleMessages: Message[] = [
        {
          id: 'msg-1',
          senderId: 'user-2',
          receiverId: user.id,
          content: 'Hey! How are you doing?',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false,
          type: 'text'
        },
        {
          id: 'msg-2',
          senderId: user.id,
          receiverId: 'user-2',
          content: 'I\'m doing great! Thanks for asking. How about you?',
          timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          read: true,
          type: 'text'
        },
        {
          id: 'msg-3',
          senderId: 'user-2',
          receiverId: user.id,
          content: 'I\'m good too! Just working on some exciting projects.',
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          read: false,
          type: 'text'
        }
      ]
      setMessages(sampleMessages)
      localStorage.setItem(`chat-messages-${currentConversation.id}`, JSON.stringify(sampleMessages))
    }
  }, [currentConversation, user])

  // Simulate real-time connection
  useEffect(() => {
    if (!isSignedIn || !user) return

    setIsConnected(true)
    
    // Simulate receiving messages
    const interval = setInterval(() => {
      // In a real app, this would be WebSocket or Server-Sent Events
      // For now, we'll simulate occasional new messages
      if (Math.random() > 0.95) { // 5% chance every second
        const randomConv = conversations[Math.floor(Math.random() * conversations.length)]
        if (randomConv && randomConv.id !== currentConversation?.id) {
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: randomConv.participants.find(p => p !== user.id) || 'user-2',
            receiverId: user.id,
            content: 'New message received!',
            timestamp: new Date().toISOString(),
            read: false,
            type: 'text'
          }

          // Update conversation
          setConversations(prev => prev.map(conv => 
            conv.id === randomConv.id 
              ? { ...conv, lastMessage: newMessage, unreadCount: conv.unreadCount + 1, updatedAt: newMessage.timestamp }
              : conv
          ))

          // Update messages if this is the current conversation
          if (currentConversation?.id === randomConv.id) {
            setMessages(prev => [...prev, newMessage])
            localStorage.setItem(`chat-messages-${randomConv.id}`, JSON.stringify([...messages, newMessage]))
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isSignedIn, user, conversations, currentConversation, messages])

  const sendMessage = useCallback((receiverId: string, content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!user) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: true,
      type
    }

    // Find or create conversation
    let conversation = conversations.find(conv => 
      conv.participants.includes(user.id) && conv.participants.includes(receiverId)
    )

    if (!conversation) {
      conversation = {
        id: `conv-${Date.now()}`,
        participants: [user.id, receiverId],
        unreadCount: 0,
        updatedAt: message.timestamp
      }
      setConversations(prev => [...prev, conversation!])
    }

    // Update conversation
    const updatedConversation = {
      ...conversation,
      lastMessage: message,
      updatedAt: message.timestamp
    }

    setConversations(prev => prev.map(conv => 
      conv.id === conversation!.id ? updatedConversation : conv
    ))

    // Update messages
    setMessages(prev => [...prev, message])

    // Save to localStorage
    localStorage.setItem(`chat-conversations-${user.id}`, JSON.stringify(conversations))
    localStorage.setItem(`chat-messages-${conversation.id}`, JSON.stringify([...messages, message]))

    // Simulate real-time delivery
    setTimeout(() => {
      // In a real app, this would be handled by the server
      console.log('Message sent:', message)
    }, 100)
  }, [user, conversations, messages])

  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId)
    if (conversation) {
      setCurrentConversation(conversation)
      markAsRead(conversationId)
    }
  }, [conversations])

  const markAsRead = useCallback((conversationId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ))

    setMessages(prev => prev.map(msg => 
      msg.receiverId === user?.id ? { ...msg, read: true } : msg
    ))

    if (user) {
      localStorage.setItem(`chat-conversations-${user.id}`, JSON.stringify(conversations))
    }
  }, [user, conversations])

  const startConversation = useCallback((userId: string) => {
    if (!user) return

    let conversation = conversations.find(conv => 
      conv.participants.includes(user.id) && conv.participants.includes(userId)
    )

    if (!conversation) {
      conversation = {
        id: `conv-${Date.now()}`,
        participants: [user.id, userId],
        unreadCount: 0,
        updatedAt: new Date().toISOString()
      }
      setConversations(prev => [...prev, conversation!])
      localStorage.setItem(`chat-conversations-${user.id}`, JSON.stringify([...conversations, conversation!]))
    }

    selectConversation(conversation.id)
  }, [user, conversations, selectConversation])

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      messages,
      isConnected,
      sendMessage,
      selectConversation,
      markAsRead,
      startConversation
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
