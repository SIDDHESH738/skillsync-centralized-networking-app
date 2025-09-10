import { Navigation } from "@/components/navigation"
import { ConnectionsGraph } from "@/components/connections-graph"
import { ConnectionsSidebar } from "@/components/connections-sidebar"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function ConnectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 fade-up">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Your Network</h1>
            <p className="text-muted-foreground">
              Explore your professional connections and discover new opportunities through your network.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Graph */}
            <div className="lg:col-span-3">
              <ConnectionsGraph />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ConnectionsSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
