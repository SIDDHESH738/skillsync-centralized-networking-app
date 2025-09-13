"use client"

import { Navigation } from "@/components/navigation"
import { CreatePost } from "@/components/create-post"
import { PostFeedAPI } from "@/components/post-feed-api"
import { TrendingTopics } from "@/components/trending-topics"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              <CreatePost />
              <PostFeedAPI />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TrendingTopics />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
