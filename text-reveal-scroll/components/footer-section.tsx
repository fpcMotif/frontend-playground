"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollReveal(containerRef, { start: 0.2, end: 0.6 })

  const title1 = "Text Reveal"
  const title2 = "on Scroll."

  return (
    <footer ref={containerRef} className="min-h-screen relative border-t border-[#d4d4d4]">
      <div className="sticky top-0 min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12">
        <div className="flex-1 flex items-center">
          <h2 className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            {title1.split("").map((char, index) => {
              const charProgress = Math.min(1, Math.max(0, progress * title1.length * 2 - index))
              return (
                <span
                  key={index}
                  className="inline-block transition-colors duration-100"
                  style={{
                    color: charProgress > 0.5 ? "#1e1e1e" : "#c4c4c4",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              )
            })}
            <br />
            {title2.split("").map((char, index) => {
              const charProgress = Math.min(1, Math.max(0, progress * title2.length * 2 - index - title1.length))
              return (
                <span
                  key={index}
                  className="inline-block transition-colors duration-100"
                  style={{
                    color: charProgress > 0.5 ? "#1e1e1e" : "#c4c4c4",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              )
            })}
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-8">
          <p className="text-sm text-[#1e1e1e]">
            <span className="font-semibold">MADE BY SANG DO</span>
            <br />
            <span className="text-[#666]">BUILT WITH FRAMER</span>
          </p>
          <p className="text-sm text-[#666] max-w-md text-right">
            Create a free website with Framer, the website builder loved by startups, designers and agencies.
          </p>
        </div>
      </div>
    </footer>
  )
}
