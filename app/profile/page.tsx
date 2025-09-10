import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileSkills } from "@/components/profile-skills"
import { ProfileExperience } from "@/components/profile-experience"
import { ProfileProjects } from "@/components/profile-projects"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollAnimations />

      <main className="md:ml-64 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProfileExperience />
              <ProfileProjects />
            </div>
            <div className="space-y-8">
              <ProfileSkills />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
