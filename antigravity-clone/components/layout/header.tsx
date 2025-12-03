"use client"

import { useState, useEffect } from "react"
import { AntigravityLogo } from "@/components/icons/antigravity-logo"
import { MaterialIcon } from "@/components/icons/material-icon"
import { PillButton } from "@/components/ui/pill-button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Use Cases", href: "#developers" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Resources", href: "#" },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 bg-surface z-50 transition-transform duration-300",
        hidden && !menuOpen && "-translate-y-full",
      )}
    >
      <header className="flex items-center gap-8 px-6 lg:px-12 py-2">
        <AntigravityLogo height={21} />

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden ml-auto w-14 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-nav-button-hover"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          <MaterialIcon name={menuOpen ? "close" : "dehaze"} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-5 py-2 rounded-full text-on-surface-variant whitespace-nowrap transition-colors hover:text-on-surface hover:bg-nav-button-hover"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <PillButton icon="download" className="hidden lg:flex ml-auto">
          Download
        </PillButton>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden fixed inset-0 top-14 bg-surface animate-in fade-in duration-150">
          <ul className="border-t border-surface-container-higher">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-surface-container-higher">
                <a
                  href={link.href}
                  className="block px-12 py-6 text-3xl font-light text-on-surface hover:bg-nav-button-hover transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
