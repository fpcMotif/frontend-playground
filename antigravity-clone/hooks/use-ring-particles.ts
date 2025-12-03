"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function useRingParticles(elementRef: React.RefObject<HTMLElement | null>) {
  const isInteractiveRef = useRef(false)

  useEffect(() => {
    // Check if CSS Paint API is supported
    if (typeof CSS === "undefined" || !("paintWorklet" in CSS)) {
      console.log("[v0] CSS Paint API not supported, skipping ring particles")
      return
    }

    // Register the PaintWorklet
    // @ts-expect-error - paintWorklet is not in the TS types
    CSS.paintWorklet.addModule("https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js")

    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractiveRef.current) {
        element.classList.add("interactive")
        isInteractiveRef.current = true
      }
      element.style.setProperty("--ring-x", String((e.clientX / window.innerWidth) * 100))
      element.style.setProperty("--ring-y", String((e.clientY / window.innerHeight) * 100))
    }

    const handleMouseOut = () => {
      element.classList.remove("interactive")
      isInteractiveRef.current = false
      element.style.setProperty("--ring-x", "50")
      element.style.setProperty("--ring-y", "50")
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseout", handleMouseOut)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseout", handleMouseOut)
    }
  }, [elementRef])
}
