"use client"

import Image from "next/image"

interface PortfolioCardProps {
  image: string
  isActive: boolean
}

export function PortfolioCard({ image, isActive }: PortfolioCardProps) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#1e1e1e]">
      <div
        className={`absolute inset-0 transition-all duration-700 ${isActive ? "brightness-[0.7]" : "brightness-50"}`}
      >
        <Image src={image || "/placeholder.svg"} alt="Portfolio project" fill className="object-cover" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${
          isActive ? "border-[#8ee7e8]/20" : "border-transparent"
        }`}
      />
    </div>
  )
}
