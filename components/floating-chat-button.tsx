"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChatWindow } from '@/components/chat-window'
import { useChat } from '@/contexts/ChatContext'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { conversations } = useChat()
  
  const totalUnreadCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative"
          size="icon"
        >
          <AnimatePresence>
            {totalUnreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  {totalUnreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
