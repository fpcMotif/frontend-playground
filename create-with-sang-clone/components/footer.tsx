"use client"

import { AnimatedText } from "./animated-text"

export function Footer() {
  return (
    <footer id="contact" className="relative bg-black border-t border-[#3a3a40]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Main CTA */}
        <div className="space-y-8 mb-20">
          <span className="text-[#8ee7e8] text-sm font-mono uppercase tracking-widest">Let&apos;s work together</span>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em]">
            <AnimatedText text="Have a project" className="text-white" />
          </h2>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em]">
            <AnimatedText text="in mind?" className="text-[#8ee7e8]" />
          </h2>

          <a
            href="mailto:hello@createwithsang.com"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-[#8ee7e8] transition-colors duration-300 group"
          >
            Start a conversation
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-[#3a3a40]">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <span className="text-xl font-medium">Create with Sang</span>
            <p className="text-[#696a6d] text-sm max-w-xs">
              Creating more value through design in every project. Available for freelance and collaboration.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <span className="text-[#696a6d] text-xs font-mono uppercase tracking-widest">Connect</span>
            <div className="flex flex-col gap-3">
              {["Twitter", "LinkedIn", "Dribbble", "Instagram"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white text-sm hover:text-[#8ee7e8] transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="text-[#696a6d] text-xs font-mono uppercase tracking-widest">Contact</span>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@createwithsang.com"
                className="text-white text-sm hover:text-[#8ee7e8] transition-colors duration-300"
              >
                hello@createwithsang.com
              </a>
              <span className="text-[#696a6d] text-sm">Based in Vietnam</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-12 mt-12 border-t border-[#3a3a40]">
          <span className="text-[#696a6d] text-xs font-mono">© 2025 Create with Sang. All rights reserved.</span>
          <span className="text-[#696a6d] text-xs font-mono">For commercial and personal use</span>
        </div>
      </div>
    </footer>
  )
}
