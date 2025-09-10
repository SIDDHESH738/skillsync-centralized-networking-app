"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Global scroll animations
      gsap.utils.toArray(".fade-up").forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
            },
          },
        )
      })

      // Stagger animations
      gsap.utils.toArray(".stagger-item").forEach((element: any, index) => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
            },
          },
        )
      })

      // Parallax elements
      gsap.utils.toArray(".parallax").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }

    loadGSAP()
  }, [])

  return null
}
