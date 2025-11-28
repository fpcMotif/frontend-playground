"use client"

import { useEffect, useRef } from "react"

export function MarqueeSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let animationId: number
    let position = 0

    const animate = () => {
      position -= 0.5
      if (position <= -50) {
        position = 0
      }
      marquee.style.transform = `translateX(${position}%)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  const items = [
    "Product Design",
    "Brand Identity",
    "UI/UX Design",
    "Web Development",
    "Motion Design",
    "Design Systems",
  ]

  return (
    <section className="py-8 border-b border-[#3a3a40] overflow-hidden bg-black">
      <div className="relative">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-8 px-8">
              <span className="text-[#696a6d] text-sm font-mono uppercase tracking-widest">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ee7e8]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
