"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const updateCursor = () => {
      // Smooth cursor following with lag
      cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.15
      cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.15

      cursor.style.transform = `translate(${cursorPos.current.x - 6}px, ${cursorPos.current.y - 6}px)`
      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX
      targetPos.current.y = e.clientY
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        cursor?.classList.add("hover")
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        cursor?.classList.remove("hover")
      }
    }

    const handleMouseDown = () => {
      cursor?.classList.add("click")
    }

    const handleMouseUp = () => {
      cursor?.classList.remove("click")
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    updateCursor()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}
