import { Navigation } from "@/components/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { SkillOrbitGraph } from "@/components/skill-orbit-graph"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="fade-up">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Welcome back, Alex</h1>
            <p className="text-muted-foreground">Here's what's happening with your professional network today.</p>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Skill Graph */}
            <div className="lg:col-span-2 space-y-8">
              <SkillOrbitGraph />
              <RecentActivity />
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-8">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
