"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react"

interface Message {
  id: number
  content: string
  sender: "me" | "other"
  timestamp: string
  type: "text" | "image" | "file"
}

const mockMessages: Message[] = [
  {
    id: 1,
    content: "Hey! How's the new project coming along?",
    sender: "other",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: 2,
    content: "It's going great! Just finished the authentication system. The animations turned out really smooth.",
    sender: "me",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: 3,
    content: "That's awesome! I'd love to see a demo when you have a chance.",
    sender: "other",
    timestamp: "10:33 AM",
    type: "text",
  },
  {
    id: 4,
    content: "How about we schedule a call for tomorrow afternoon?",
    sender: "me",
    timestamp: "10:35 AM",
    type: "text",
  },
  {
    id: 5,
    content: "Perfect! Looking forward to it. The design system integration sounds really interesting.",
    sender: "other",
    timestamp: "10:36 AM",
    type: "text",
  },
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const response: Message = {
        id: messages.length + 2,
        content: "Thanks for sharing! That looks really impressive.",
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages((prev) => [...prev, response])

      // GSAP bounce animation for new message alert
      const loadGSAP = async () => {
        const { gsap } = await import("gsap")
        gsap.fromTo(
          ".new-message",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        )
      }
      loadGSAP()
    }, 2000)
  }

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 p-3 mb-4"
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src="/professional-woman-diverse.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-lg px-4 py-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-muted-foreground rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/professional-woman-diverse.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground">Senior UX Designer • Online</p>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} new-message`}
          >
            <div className={`flex gap-2 max-w-xs lg:max-w-md ${message.sender === "me" ? "flex-row-reverse" : ""}`}>
              {message.sender === "other" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/professional-woman-diverse.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
          </motion.div>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-10"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-4 h-4" />
            </motion.button>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
