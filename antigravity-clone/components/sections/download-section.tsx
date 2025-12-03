"use client"

import { useRef, useEffect, useState } from "react"
import { PillButton } from "@/components/ui/pill-button"

export function DownloadSection() {
  const [typewriterActive, setTypewriterActive] = useState(false)
  const [scale, setScale] = useState(0.85)
  const cardRef = useRef<HTMLDivElement>(null)
  const [ringX, setRingX] = useState(70)
  const [ringY, setRingY] = useState(50)

  useEffect(() => {
    if (typeof window !== "undefined" && "paintWorklet" in CSS) {
      ;(CSS as any).paintWorklet.addModule("https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js")
    }
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setRingX(x)
      setRingY(y)
    }

    const handleMouseLeave = () => {
      // Reset to default position
      setRingX(70)
      setRingY(50)
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypewriterActive(true)
          const ratio = entry.intersectionRatio
          setScale(0.85 + ratio * 0.15)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="beforeyougo" className="px-6 lg:px-12 pb-12">
      <div
        ref={cardRef}
        className="ring-particles-dark bg-primary text-on-primary rounded-3xl w-full aspect-[4/3] max-h-[80vh] p-8 lg:p-16 flex flex-col justify-center gap-4 transition-transform duration-300 overflow-hidden relative"
        style={{
          transform: `scale(${scale})`,
          // Ring particles custom properties for dark card
          ["--ring-radius" as string]: 200,
          ["--ring-thickness" as string]: 500,
          ["--particle-count" as string]: 80,
          ["--particle-rows" as string]: 25,
          ["--particle-size" as string]: 3,
          ["--particle-color" as string]: "#3b82f6",
          ["--particle-min-alpha" as string]: 0.3,
          ["--particle-max-alpha" as string]: 1.0,
          ["--seed" as string]: 150,
          ["--ring-x" as string]: ringX,
          ["--ring-y" as string]: ringY,
        }}
      >
        <p className="text-2xl lg:text-4xl xl:text-5xl text-pretty max-w-[20ch] m-0 relative z-10">
          <span className={`typewriter ${typewriterActive ? "typewriter-animate" : ""}`}>
            Download Google Antigravity for macOS
          </span>
        </p>

        <div className="flex flex-col lg:flex-row gap-2 text-lg relative z-10">
          <PillButton className="bg-on-primary text-primary hover:bg-surface-container-higher">
            Download for Apple Silicon
          </PillButton>
          <PillButton
            variant="secondary"
            className="bg-[rgba(170,177,204,0.3)] text-on-primary border-0 hover:bg-[rgba(170,177,204,0.4)]"
          >
            Download for Intel
          </PillButton>
        </div>
      </div>
    </section>
  )
}
