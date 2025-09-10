import { Navigation } from "@/components/navigation"
import { MessagesList } from "@/components/messages-list"
import { ChatWindow } from "@/components/chat-window"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 h-screen flex">
        <div className="flex-1 flex">
          {/* Messages List */}
          <div className="w-80 border-r border-border">
            <MessagesList />
          </div>

          {/* Chat Window */}
          <div className="flex-1">
            <ChatWindow />
          </div>
        </div>
      </main>
    </div>
  )
}
