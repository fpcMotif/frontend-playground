"use client"

import { useRef, useState, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

type EffectType = "blur" | "fade" | "color" | "scale" | "stagger" | "randomScale" | "overscale" | "slide"

interface EffectSectionProps {
  number: string
  title: string
  description: string
  effect: EffectType
}

export function EffectSection({ number, title, description, effect }: EffectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollReveal(containerRef, { start: 0.2, end: 0.8 })

  const words = description.split(" ")

  const [randomDelays, setRandomDelays] = useState<number[]>([])
  const [randomScales, setRandomScales] = useState<number[]>([])

  useEffect(() => {
    setRandomDelays(words.map(() => Math.random()))
    setRandomScales(words.map(() => 0.5 + Math.random() * 0.5))
  }, [words.length])

  const getWordStyle = (index: number) => {
    const wordProgress = Math.min(1, Math.max(0, progress * words.length * 1.5 - index))

    switch (effect) {
      case "blur":
        return {
          filter: `blur(${(1 - wordProgress) * 8}px)`,
          opacity: 0.3 + wordProgress * 0.7,
          color: "#1e1e1e",
        }
      case "fade":
        return {
          opacity: 0.1 + wordProgress * 0.9,
          color: "#1e1e1e",
        }
      case "color":
        return {
          color: wordProgress > 0.5 ? "#1e1e1e" : "#c4c4c4",
          transition: "color 0.3s ease",
        }
      case "scale":
        return {
          transform: `scale(${0.8 + wordProgress * 0.2})`,
          opacity: 0.3 + wordProgress * 0.7,
          color: "#1e1e1e",
        }
      case "stagger": {
        const delay = randomDelays[index] ?? 0
        const staggerProgress = Math.min(1, Math.max(0, progress * 2 - delay))
        return {
          opacity: 0.1 + staggerProgress * 0.9,
          color: "#1e1e1e",
        }
      }
      case "randomScale": {
        const delay = randomDelays[index] ?? 0
        const targetScale = randomScales[index] ?? 1
        const scaleProgress = Math.min(1, Math.max(0, progress * 2 - delay))
        return {
          transform: `scale(${targetScale + scaleProgress * (1 - targetScale)})`,
          opacity: 0.3 + scaleProgress * 0.7,
          color: "#1e1e1e",
        }
      }
      case "overscale":
        return {
          transform: `scale(${1.3 - wordProgress * 0.3})`,
          opacity: 0.3 + wordProgress * 0.7,
          color: "#1e1e1e",
        }
      case "slide":
        return {
          transform: `translateY(${(1 - wordProgress) * 20}px)`,
          opacity: 0.1 + wordProgress * 0.9,
          color: "#1e1e1e",
        }
      default:
        return { color: "#1e1e1e" }
    }
  }

  return (
    <section className="border-t border-[#d4d4d4]">
      <div className="px-6 md:px-12 lg:px-16 py-8">
        <p className="text-base font-semibold text-[#1e1e1e]">
          {number} {title}
        </p>
      </div>
      <div ref={containerRef} className="min-h-[150vh] relative">
        <div className="sticky top-0 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16">
          <p className="max-w-4xl text-[clamp(1.25rem,4vw,3rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-center">
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block mr-[0.3em] transition-all duration-150"
                style={getWordStyle(index)}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
