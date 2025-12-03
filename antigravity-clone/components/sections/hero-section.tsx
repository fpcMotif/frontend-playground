"use client"

import { useRef } from "react"
import { AntigravityLogo } from "@/components/icons/antigravity-logo"
import { PillButton } from "@/components/ui/pill-button"
import { useRingParticles } from "@/hooks/use-ring-particles"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useRingParticles(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="ring-particles min-h-screen flex flex-col items-center justify-center px-6 pt-20"
    >
      <h1 className="animate-fade-up [animation-delay:0ms]">
        <span className="sr-only">Google Antigravity</span>
        <AntigravityLogo height={24} className="mx-auto" />
      </h1>

      <p className="text-center mt-8 animate-fade-up [animation-delay:100ms]">
        <span className="block text-4xl md:text-6xl lg:text-7xl font-medium text-on-surface">Experience liftoff</span>
        <span className="block text-2xl md:text-4xl lg:text-5xl font-medium text-on-surface-variant mt-2">
          with the next-generation IDE
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-10 w-full max-w-lg animate-fade-up [animation-delay:200ms]">
        <PillButton icon="keyboard_command_key" iconPosition="left" className="text-lg">
          Download for macOS
        </PillButton>
        <PillButton variant="secondary" className="text-lg">
          Explore use cases
        </PillButton>
      </div>
    </section>
  )
}
