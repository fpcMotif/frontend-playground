"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const lines = [
  "A motion system crafted for",
  "modern typography.",
  "Animations that guide the eyes",
  "and elevate your storytelling.",
  "Each preset is built from the",
  "same Text Reveal engine,",
  "ensuring consistent timing,",
  "easing, and behavior.",
  "Perfect for hero intros, section",
  "transitions, case studies, and",
  "long-form content.",
]

export function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollReveal(containerRef, { start: 0.1, end: 0.9 })

  return (
    <section ref={containerRef} className="min-h-[200vh] relative">
      <div className="sticky top-0 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-5xl w-full">
          {lines.map((line, index) => {
            const lineProgress = Math.min(1, Math.max(0, progress * lines.length - index))
            return (
              <p
                key={index}
                className="text-[clamp(1.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em] transition-colors duration-100"
                style={{
                  color: lineProgress > 0.5 ? "#1e1e1e" : "#c4c4c4",
                }}
              >
                {line}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
