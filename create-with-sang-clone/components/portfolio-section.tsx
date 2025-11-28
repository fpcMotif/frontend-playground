"use client"

import { useEffect, useRef, useState } from "react"
import { PortfolioCard } from "./portfolio-card"

const portfolioItems = [
  {
    title: "Design System",
    description: "Component library for enterprise applications",
    category: "UI Design",
    year: "2024",
    image: "/dark-modern-design-system-dashboard-interface.jpg",
  },
  {
    title: "Brand Identity",
    description: "Visual identity for tech startup",
    category: "Branding",
    year: "2024",
    image: "/minimal-dark-brand-identity-logo-design-abstract.jpg",
  },
  {
    title: "Mobile App",
    description: "iOS app for personal finance management",
    category: "Product Design",
    year: "2023",
    image: "/dark-mobile-app-ui-design-finance-dashboard.jpg",
  },
  {
    title: "E-commerce Platform",
    description: "Full shopping experience redesign",
    category: "Web Design",
    year: "2023",
    image: "/dark-e-commerce-website-luxury-fashion-photography.jpg",
  },
]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate scroll progress through the section
      const scrolled = -rect.top
      const totalScrollable = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      // Determine which card should be active
      const cardIndex = Math.floor(progress * portfolioItems.length)
      setActiveIndex(Math.min(cardIndex, portfolioItems.length - 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-black"
      style={{ minHeight: `${portfolioItems.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#8ee7e8] text-sm font-mono uppercase tracking-widest">Selected Work</span>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.04em]">
                  Featured projects
                </h2>
              </div>

              {/* Project info */}
              <div className="space-y-6">
                {portfolioItems.map((item, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 absolute pointer-events-none"
                    }`}
                    style={{ position: index === activeIndex ? "relative" : "absolute" }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-[#696a6d]">
                        <span className="font-mono">{item.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[#3a3a40]" />
                        <span className="font-mono">{item.year}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-medium text-white">{item.title}</h3>
                      <p className="text-[#696a6d] max-w-md">{item.description}</p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-[#8ee7e8] text-sm font-medium hover:gap-3 transition-all"
                      >
                        View project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {portfolioItems.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "w-8 bg-[#8ee7e8]" : "w-2 bg-[#3a3a40]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <PortfolioCard image={item.image} isActive={index === activeIndex} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
