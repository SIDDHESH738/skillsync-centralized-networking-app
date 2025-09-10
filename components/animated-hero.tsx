"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
const ThreeSkillOrbs = dynamic(() => import("./three-skill-orbs").then((m) => m.ThreeSkillOrbs), {
  ssr: false,
})
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP scroll animations will be added here
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Parallax background animation
      gsap.to(".hero-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Staggered text animations
      gsap.fromTo(
        ".hero-text",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
      )
    }

    loadGSAP()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Professional Networking Reimagined
          </motion.div>

          <div className="space-y-4">
            <h1 className="hero-text text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
              Connect.
            </h1>
            <h1 className="hero-text text-5xl md:text-7xl font-display font-bold text-primary leading-tight">
              Collaborate.
            </h1>
            <h1 className="hero-text text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
              Grow.
            </h1>
          </div>

          <p className="hero-text text-xl text-muted-foreground max-w-lg leading-relaxed">
            Join the next generation of professional networking with immersive 3D skill visualization, real-time
            collaboration, and AI-powered connections.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-4">
            <Link href="/auth/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/auth/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-text flex gap-8 pt-8">
            <div>
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Skills Tracked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Right side - 3D Skill Orbs */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ThreeSkillOrbs />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
