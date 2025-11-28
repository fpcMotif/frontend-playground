"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 py-12 md:py-16">
      <div className="flex-1 flex items-start pt-8 md:pt-12">
        <h1 className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.9] tracking-[-0.05em] text-[#1e1e1e]">
          <span className="block">Text Reveal</span>
          <span className="block">on Scroll.</span>
        </h1>
      </div>
      <div className="flex justify-end pb-8">
        <div className="transition-opacity duration-300" style={{ opacity: Math.max(0, 1 - scrollY / 300) }}>
          <ArrowDown className="w-10 h-10 md:w-12 md:h-12 text-[#1e1e1e]" strokeWidth={2.5} />
        </div>
      </div>
    </section>
  )
}
