"use client"

import { AnimatedHero } from "@/components/animated-hero"
import { FeaturesSection } from "@/components/features-section"
import { ParticleSystem } from "@/components/particle-system"
import { ScrollAnimations } from "@/components/scroll-animations"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-6 right-6 z-50 flex gap-3">
        <Link href="/auth/login">
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            Login
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
        </Link>
      </div>

      <ParticleSystem />
      <ScrollAnimations />

      <main className="relative z-10">
        <AnimatedHero />
        <FeaturesSection />

        {/* Enhanced CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          {/* Background animation elements */}
          <div className="absolute inset-0 parallax">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="fade-up text-4xl md:text-5xl font-display font-bold text-foreground">
              Ready to Transform Your Network?
            </h2>
            <p className="fade-up text-xl text-muted-foreground">
              Join thousands of professionals already using SkillSync to accelerate their careers.
            </p>
            <div className="fade-up flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                  Get Started Free
                </button>
              </Link>
              <Link href="/auth/demo">
                <button className="px-8 py-4 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-all duration-300 text-lg hover:scale-105">
                  Schedule Demo
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Additional sections for scroll animations */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="fade-up text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="fade-up text-xl text-muted-foreground">
                See how top companies are using SkillSync to build stronger teams
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[
                "TechCorp",
                "InnovateLab",
                "FutureWorks",
                "SkillForge",
                "ConnectPro",
                "NetworkHub",
                "TalentSync",
                "ProLink",
              ].map((company, index) => (
                <div key={company} className="stagger-item text-center">
                  <div className="h-16 bg-muted/20 rounded-lg flex items-center justify-center">
                    <span className="font-display font-semibold text-muted-foreground">{company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
