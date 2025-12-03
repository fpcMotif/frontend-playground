"use client"

import { useRef, useEffect, useState } from "react"
import { MaterialIcon } from "@/components/icons/material-icon"

const iconNames = [
  "keyboard_return",
  "keyboard_tab",
  "merge",
  "folder",
  "deployed_code",
  "dashboard_customize",
  "commit",
  "chat_add_on",
  "device_hub",
  "refresh",
  "code",
  "file_copy",
  "code_blocks",
  "keyboard_command_key",
  "upload",
  "terminal",
  "swap_horiz",
  "last_page",
  "apps_outage",
  "keyboard_option_key",
  "recenter",
  "power_settings_new",
  "design_services",
  "widgets",
]

interface Feature {
  title: string
  description: string
  image: string
}

const features: Feature[] = [
  {
    title: "An AI IDE Core",
    description:
      "Google Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.",
    image: "https://antigravity.google/assets/image/landing/editor_suggestions.png",
  },
  {
    title: "Higher-level Abstractions",
    description:
      "A more intuitive task-based approach to monitoring agent activity, presenting you with essential artifacts and verification results to build trust.",
    image: "https://antigravity.google/assets/image/landing/task_based.png",
  },
  {
    title: "Cross-surface Agents",
    description:
      "Synchronized agentic control across your editor, terminal, and browser for powerful development workflows.",
    image: "https://antigravity.google/assets/image/landing/browser_use.png",
  },
  {
    title: "User Feedback",
    description: "Intuitively integrate feedback across surfaces and artifacts to guide and refine the agent's work.",
    image: "https://antigravity.google/assets/image/landing/implementation_comment.png",
  },
  {
    title: "An Agent-First Experience",
    description:
      "Manage multiple agents at the same time, across any workspace, from one central mission control view.",
    image: "https://antigravity.google/assets/image/landing/inbox.png",
  },
]

function IconBubble({ name, index }: { name: string; index: number }) {
  const delay = (index % 5) * -1

  return (
    <div
      className="flex-shrink-0 w-16 md:w-20 lg:w-24 aspect-square rounded-full bg-[#b7bfd917] border border-outline-variant backdrop-blur-sm flex items-center justify-center animate-wobble"
      style={{ animationDelay: `${delay}s` }}
    >
      <MaterialIcon name={name} className="!text-3xl md:!text-4xl text-on-surface-variant" />
    </div>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="lg:py-[15vh] lg:grid lg:place-content-center">
      <div className="pb-8 lg:pb-0">
        <h3
          className={`font-light text-xl leading-tight mb-4 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-30"
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`font-light leading-relaxed text-on-surface-variant lg:w-3/5 max-w-[60ch] text-pretty transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-30"
          }`}
        >
          {feature.description}
        </p>
      </div>

      {/* Mobile image */}
      <div className="lg:hidden">
        <img src={feature.image || "/placeholder.svg"} alt={feature.title} className="rounded-3xl w-full" />
      </div>
    </div>
  )
}

export function ProductSection() {
  const [typewriterActive, setTypewriterActive] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypewriterActive(true)
        }
      },
      { threshold: 0.3 },
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="product" className="min-h-screen">
      <div ref={headingRef} className="px-6 lg:px-12 mb-4">
        <h2 className="text-3xl md:text-4xl font-light leading-tight lg:w-1/2 max-w-[25ch]">
          <span className={`typewriter ${typewriterActive ? "typewriter-animate" : ""}`}>
            Antigravity is our agentic development platform, evolving the IDE into the agent-first era.
          </span>
        </h2>
      </div>

      {/* Icon strip */}
      <div className="h-64 md:h-80 lg:h-96 flex items-center gap-2 overflow-x-hidden animate-slide-in">
        {iconNames.map((name, index) => (
          <IconBubble key={name} name={name} index={index} />
        ))}
      </div>

      {/* Features */}
      <div id="features" className="px-6 lg:px-12 relative">
        {/* Desktop sticky images */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
          {features.map((feature, index) => (
            <img
              key={feature.title}
              src={feature.image || "/placeholder.svg"}
              alt={feature.title}
              className="sticky top-1/4 w-full rounded-3xl"
              style={{ zIndex: index }}
            />
          ))}
        </div>

        <div className="lg:w-1/2">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
