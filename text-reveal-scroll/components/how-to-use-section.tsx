"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface ContentBlock {
  title: string
  content: string[]
}

const sections: ContentBlock[] = [
  {
    title: "How to use",
    content: [],
  },
  {
    title: "Edit Content & Font Settings",
    content: [
      "Change the text directly inside the Text field.",
      "Font Setting",
      "Choose any font using Framer's Font control.",
      "You can customize: Font family, Weight, Size, Line height, Letter spacing.",
    ],
  },
  {
    title: "Color control",
    content: [
      "Base Color",
      "This is the starting color of each line, word, or character before it animates.",
      "Reveal Color",
      "This is the final color the text transitions to when fully revealed.",
      "It should represent the intended, readable state of your typography.",
    ],
  },
  {
    title: "Reveal Mode",
    content: [
      "Choose animation level:",
      "Per Lines. Animates each line as a block.",
      "Per Words. Animates each word individually.",
      "Per Chars. Animates every single character for expressive effects.",
    ],
  },
  {
    title: "Trigger reveal",
    content: [
      "Choose trigger to reveal:",
      "Viewport-Based Triggering",
      "Animations start when the component layer enters the viewport.",
      "Section-Based Triggering",
      "Animations start exactly when a section enters the viewport by using Scroll Section and assigning its Section ID.",
    ],
  },
  {
    title: "Viewport Position",
    content: [
      "Choose where the reveal starts:",
      "Viewport Anchor (Top / Center / Bottom)",
      "Animation triggers the moment the component crosses your chosen viewport position.",
      "Custom Viewport Position",
      "Set a precise trigger position anywhere from 0–100% of viewport height.",
      "Useful for fine-tuning staggered reveals or syncing with other scroll effects.",
    ],
  },
  {
    title: "Replay Animation",
    content: [
      "Choose Replay Animation:",
      "Replay = Yes",
      "Animation follows scroll direction both forward and backward.",
      "Replay = No",
      "Animation plays once when revealed and does not rewind on scroll-up.",
    ],
  },
  {
    title: "Duration & Ease",
    content: [
      "Duration",
      "Controls how long the reveal animation takes for each fragment.",
      "Short durations feel snappy and modern; longer durations feel smooth.",
      "Ease",
      "Determines how the animation accelerates and decelerates over time.",
      "Smooth: a gentle, natural ease suitable for most text animations.",
      "Back: creates a slight overshoot for a punchier, energetic motion.",
      "Elastic: bouncy and expressive; great for playful or creative moments.",
      "Linear: no easing, creating uniform motion from start to finish.",
    ],
  },
  {
    title: "Masking & Overflow",
    content: [
      "Overflow Behavior",
      "Overflow is applied per fragment according to your selected mode — Lines, Words, or Chars — ensuring only those individual units are clipped during the reveal.",
    ],
  },
  {
    title: "Motion Controls",
    content: [
      "These settings define how each fragment (line, word, or character) behaves before and during the reveal animation.",
      "Opacity",
      "Sets the starting transparency of each fragment before it animates.",
      "Lower opacity creates a smoother fade-in; higher opacity produces a sharper, more instant reveal.",
      "Blur",
      "Applies a pre-reveal blur value.",
      "Useful for soft, atmospheric transitions or more dramatic, depth-like effects.",
      "Scale",
      "Defines the starting scale of each fragment.",
      "Use values slightly under 1 for a smooth pop-in effect, or values above 1 for a zoom-down reveal.",
      "Offset X/ Offset Y",
      "Moves each fragment in a specific direction before the reveal.",
      "Perfect for directional motion such as sliding up, drifting sideways, or dropping down.",
      "Random Order",
      "Random Stagger",
      "Enable to animate fragments in a randomized sequence.",
      "Random Amount",
      "Control how chaotic or subtle the randomness should feel.",
    ],
  },
]

function RevealText({ text, progress }: { text: string; progress: number }) {
  const words = text.split(" ")

  return (
    <span>
      {words.map((word, index) => {
        const wordProgress = Math.min(1, Math.max(0, progress * words.length * 1.5 - index))
        return (
          <span
            key={index}
            className="inline-block mr-[0.25em] transition-colors duration-150"
            style={{
              color: wordProgress > 0.5 ? "#1e1e1e" : "#c4c4c4",
            }}
          >
            {word}
          </span>
        )
      })}
    </span>
  )
}

function ContentSection({ section, index }: { section: ContentBlock; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollReveal(containerRef, { start: 0.3, end: 0.7 })

  const isMainTitle = index === 0

  return (
    <div
      ref={containerRef}
      className={`border-t border-[#d4d4d4] ${isMainTitle ? "min-h-[50vh]" : "min-h-[80vh]"} relative`}
    >
      <div className={`sticky top-0 ${isMainTitle ? "min-h-[50vh]" : "min-h-[80vh]"} flex items-center`}>
        <div className="px-6 md:px-12 lg:px-16 py-12 w-full">
          {isMainTitle ? (
            <h2 className="text-[clamp(2rem,8vw,6rem)] font-bold tracking-[-0.04em] text-[#1e1e1e]">
              <RevealText text={section.title} progress={progress} />
            </h2>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1e1e1e]">
                <RevealText text={section.title} progress={progress} />
              </h3>
              <div className="space-y-4">
                {section.content.map((line, lineIndex) => {
                  const lineProgress = Math.min(1, Math.max(0, progress * (section.content.length + 1) - lineIndex - 1))
                  const isBold = !line.includes(".") && line.length < 30
                  return (
                    <p
                      key={lineIndex}
                      className={`text-base md:text-lg leading-relaxed ${isBold ? "font-semibold" : ""}`}
                    >
                      <RevealText text={line} progress={lineProgress} />
                    </p>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function HowToUseSection() {
  return (
    <section>
      {sections.map((section, index) => (
        <ContentSection key={index} section={section} index={index} />
      ))}
    </section>
  )
}
