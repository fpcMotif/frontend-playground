"use client"

import { useRef } from "react"

interface Developer {
  type: string
  title: string
  description: string
  image: string
}

const developers: Developer[] = [
  {
    type: "Frontend Developer",
    title: "Frontend developer",
    description: "Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-frontend.jpg",
  },
  {
    type: "Full stack developer",
    title: "Full stack developer",
    description:
      "Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-fullstack.jpg",
  },
  {
    type: "Enterprise Developer",
    title: "Enterprise Developer",
    description:
      "Streamline operations and reduce context switching by orchestrating agents across workspaces using the Agent Manager.",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-enterprise.jpg",
  },
]

function DeveloperCard({ developer }: { developer: Developer }) {
  return (
    <article className="flex-shrink-0 w-[calc(100%-1rem)] lg:w-[60vw] overflow-hidden snap-start">
      <figure className="relative grid place-items-center">
        <img
          src={developer.image || "/placeholder.svg"}
          alt={developer.title}
          className="rounded-3xl w-full col-start-1 row-start-1"
        />
        <figcaption className="col-start-1 row-start-1 text-white text-2xl md:text-3xl typewriter">
          {developer.type}
        </figcaption>
      </figure>

      <h3 className="font-light text-xl leading-tight mt-4 mb-2">{developer.title}</h3>

      <p className="w-2/5 text-pretty text-on-surface-variant tracking-wide font-light text-sm">
        {developer.description}
      </p>

      <a
        href="#"
        className="inline-flex items-center gap-1 text-on-surface-variant font-light mt-3 hover:gap-2 transition-all duration-150 group"
      >
        View case
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </article>
  )
}

export function DevelopersSection() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return
    const scrollAmount = carouselRef.current.offsetWidth * 0.6
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section id="developers" className="w-full border-t border-outline-variant mt-8 pt-8">
      <div className="px-6 lg:px-12 lg:flex lg:justify-between lg:items-start mb-8">
        <h2 className="text-3xl md:text-4xl font-light leading-tight lg:w-1/2 max-w-[25ch]">
          Built for developers for the agent-first era
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed font-light mt-4 lg:mt-0 lg:w-[30vw]">
          Google Antigravity is built for user trust, whether you&apos;re a professional developer working in a large
          enterprise codebase, a hobbyist vibe-coding in their spare time, or anyone in between.
        </p>
      </div>

      <div className="relative">
        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 lg:px-12 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {developers.map((developer) => (
            <DeveloperCard key={developer.type} developer={developer} />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4 mt-6 lg:absolute lg:left-[60vw] lg:top-[calc(60vw*9/16+1rem)] lg:-translate-x-1/2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  )
}
