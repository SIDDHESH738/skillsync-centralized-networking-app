"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Video, Phone } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/professional-woman-diverse.png",
    lastMessage: "Thanks for the design feedback! I'll implement those changes.",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "/professional-man.png",
    lastMessage: "The React component library looks great. When can we schedule a review?",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Lisa Wang",
    avatar: "/professional-asian-woman.png",
    lastMessage: "Perfect! Let's move forward with the product roadmap.",
    timestamp: "3h ago",
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/professional-asian-man.png",
    lastMessage: "The deployment went smoothly. All systems are green!",
    timestamp: "1d ago",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    avatar: "/hispanic-professional-woman.png",
    lastMessage: "I'd love to collaborate on the frontend architecture.",
    timestamp: "2d ago",
    unread: 0,
    online: true,
  },
]

export function MessagesList() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Messages
        </h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setSelectedConversation(conversation.id)}
            className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
              selectedConversation === conversation.id ? "bg-muted/50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">{conversation.name}</h3>
                  <div className="flex items-center gap-2">
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unread}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            <Video className="w-4 h-4" />
            Video Call
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            Voice Call
          </motion.button>
        </div>
      </div>
    </div>
  )
}
