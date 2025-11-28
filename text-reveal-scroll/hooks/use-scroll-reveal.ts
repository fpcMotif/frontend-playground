"use client"

import { useEffect, useState, type RefObject } from "react"

interface ScrollRevealOptions {
  start?: number // 0-1, where in viewport to start (0 = top, 1 = bottom)
  end?: number // 0-1, where in viewport to end
}

export function useScrollReveal(ref: RefObject<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const { start = 0.2, end = 0.8 } = options
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Calculate how far through the element we've scrolled
      const startTrigger = windowHeight * (1 - start)
      const endTrigger = windowHeight * (1 - end)

      // Element top relative to viewport
      const elementTop = rect.top
      const elementBottom = rect.bottom

      // Progress calculation
      if (elementBottom < endTrigger) {
        // Element has passed the end trigger
        setProgress(1)
      } else if (elementTop > startTrigger) {
        // Element hasn't reached start trigger yet
        setProgress(0)
      } else {
        // Element is in the reveal zone
        const totalDistance = elementHeight + (startTrigger - endTrigger)
        const currentPosition = startTrigger - elementTop
        const calculatedProgress = currentPosition / totalDistance
        setProgress(Math.min(1, Math.max(0, calculatedProgress)))
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [ref, start, end])

  return progress
}
