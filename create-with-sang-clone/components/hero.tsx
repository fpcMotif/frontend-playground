"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { AnimatedText } from "./animated-text"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Animated gradient mesh
    let animationId: number
    let time = 0

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      time += 0.005
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw gradient orbs
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.4 + Math.cos(time * 0.7) * 80,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        400,
      )
      gradient1.addColorStop(0, "rgba(142, 231, 232, 0.08)")
      gradient1.addColorStop(0.5, "rgba(74, 115, 128, 0.03)")
      gradient1.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.8) * 120,
        canvas.height * 0.6 + Math.sin(time * 0.6) * 100,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        350,
      )
      gradient2.addColorStop(0, "rgba(142, 231, 232, 0.05)")
      gradient2.addColorStop(0.5, "rgba(74, 115, 128, 0.02)")
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(142, 231, 232, ${p.opacity})`
        ctx.fill()
      })

      // Mouse follow effect
      if (mousePos.x > 0 && mousePos.y > 0) {
        const mouseGradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 200)
        mouseGradient.addColorStop(0, "rgba(142, 231, 232, 0.06)")
        mouseGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = mouseGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[#3a3a40]"
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col gap-8">
          {/* Top section with availability badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a3a40] bg-black/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#8ee7e8] animate-pulse" />
              <span className="text-xs text-[#696a6d] font-mono tracking-wide">Available for work</span>
            </div>
          </div>

          {/* Main headline */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1] tracking-[-0.06em] text-white">
              <AnimatedText text="Create" className="text-white" />
            </h1>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1] tracking-[-0.06em]">
              <AnimatedText text="more value" className="text-[#b4cdcf]" />
            </h1>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1] tracking-[-0.06em]">
              <AnimatedText text="through design" className="text-[#8ee7e8]" />
            </h1>
          </div>

          {/* Subtext */}
          <div className="max-w-xl mt-8">
            <p className="text-[#696a6d] text-base md:text-lg leading-relaxed">
              Product designer focused on creating meaningful digital experiences. Currently available for freelance
              projects and collaborations.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#work"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-[#8ee7e8] transition-colors duration-300"
            >
              View work
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 border border-[#3a3a40] text-white rounded-full font-medium text-sm hover:border-[#8ee7e8] hover:text-[#8ee7e8] transition-colors duration-300"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[#696a6d] text-xs font-mono">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8ee7e8] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
