"use client";

import { useEffect, useRef } from "react";
// import  { animate } from "animejs"; 

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className =
        "particle absolute w-1 h-1 bg-primary/20 rounded-full pointer-events-none";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
    }

    // // Animate particles
    // anime({
    //   targets: ".particle",
    //   translateX: () => anime.random(-100, 100),
    //   translateY: () => anime.random(-100, 100),
    //   scale: [0, 1, 0],
    //   opacity: [0, 0.6, 0],
    //   duration: () => anime.random(3000, 6000),
    //   delay: () => anime.random(0, 2000),
    //   loop: true,
    //   easing: "easeInOutSine",
    // });

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
}

