"use client"

import type React from "react"

import { useRef, useCallback, useEffect, useState, forwardRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

// ============================================================================
// Icon Components
// ============================================================================

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    </svg>
  )
}

function CartIconWithItem({
  className,
  itemClassName,
  itemRef,
}: {
  className?: string
  itemClassName?: string
  itemRef?: React.RefObject<SVGRectElement | null>
}) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <rect ref={itemRef} className={itemClassName} x="9" y="-1" width="10" height="10" rx="2" />
      <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

// ============================================================================
// Animation Hook
// ============================================================================

interface AnimationRefs {
  cartRef: React.RefObject<HTMLSpanElement | null>
  itemRef: React.RefObject<SVGRectElement | null>
  textRef: React.RefObject<HTMLSpanElement | null>
  checkRef: React.RefObject<HTMLSpanElement | null>
  staticBorderRef: React.RefObject<HTMLSpanElement | null>
  completeBorderRef: React.RefObject<HTMLSpanElement | null>
  animatedBorderRef: React.RefObject<HTMLSpanElement | null>
  dummyRef: React.RefObject<HTMLSpanElement | null>
}

function useAddToCartAnimation(itemRef: React.RefObject<SVGRectElement | null>) {
  const isRunning = useRef(false)

  const cartRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const checkRef = useRef<HTMLSpanElement>(null)
  const staticBorderRef = useRef<HTMLSpanElement>(null)
  const completeBorderRef = useRef<HTMLSpanElement>(null)
  const animatedBorderRef = useRef<HTMLSpanElement>(null)
  const dummyRef = useRef<HTMLSpanElement>(null)

  const refs: AnimationRefs = {
    cartRef,
    itemRef,
    textRef,
    checkRef,
    staticBorderRef,
    completeBorderRef,
    animatedBorderRef,
    dummyRef,
  }

  const animate = useCallback(
    async (onComplete?: () => void) => {
      if (isRunning.current) return
      if (!cartRef.current || !dummyRef.current) return

      isRunning.current = true

      const dummyRect = dummyRef.current.getBoundingClientRect()
      const cartRect = cartRef.current.getBoundingClientRect()
      const distanceX = dummyRect.left - cartRect.left

      gsap
        .timeline({
          defaults: { duration: 0.5, ease: "power2.out" },
          onComplete: () => {
            isRunning.current = false
            onComplete?.()
          },
        })
        // Move cart to center
        .to(cartRef.current, {
          x: distanceX,
          duration: 0.22,
        })
        // Wiggle cart
        .to(
          cartRef.current,
          {
            rotate: -20,
            yoyo: true,
            repeat: 1,
            duration: 0.11,
          },
          0,
        )
        // Fade out text
        .to(
          textRef.current,
          {
            opacity: 0,
            x: distanceX,
            duration: 0.22,
            filter: "blur(6px)",
          },
          0,
        )
        // Drop item into cart
        .to(itemRef.current, {
          y: 0,
          duration: 0.1,
          delay: 0.1,
        })
        // Show static border
        .to(
          staticBorderRef.current,
          {
            opacity: 1,
            duration: 0.1,
          },
          "<",
        )
        // Hide animated border
        .set(animatedBorderRef.current, {
          opacity: 0,
        })
        // Move cart off screen
        .to(cartRef.current, {
          x: distanceX * 4,
          duration: 0.6,
          delay: 0.1,
        })
        .to(
          cartRef.current,
          {
            rotate: -30,
            duration: 0.1,
          },
          "<",
        )
        // Show complete border
        .to(
          completeBorderRef.current,
          {
            opacity: 1,
            duration: 0.22,
          },
          "<",
        )
        // Show check icon
        .to(
          checkRef.current,
          {
            opacity: 1,
            yoyo: true,
            scale: 1.5,
            duration: 0.25,
            repeatDelay: 0.125,
            repeat: 1,
          },
          "<",
        )
        // Reset positions
        .set(textRef.current, {
          x: 0,
          xPercent: 0,
        })
        .set(cartRef.current, {
          x: -100,
          rotate: 0,
        })
        .set(itemRef.current, {
          y: -24,
        })
        // Fade out borders
        .to([staticBorderRef.current, completeBorderRef.current], {
          opacity: 0,
          duration: 0.5,
          delay: 0.125,
        })
        // Fade in text
        .to(textRef.current, {
          xPercent: 0,
          opacity: 1,
          duration: 0.22,
          filter: "blur(0px)",
        })
        // Reset cart position
        .to(cartRef.current, {
          x: 0,
        })
        // Show animated border again
        .to(animatedBorderRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
        })
    },
    [itemRef],
  )

  return { refs, animate, isRunning }
}

// ============================================================================
// Main Component
// ============================================================================

export interface AddToCartButtonProps {
  /** Text displayed on the button */
  text?: string
  /** Callback fired when animation completes */
  onAddComplete?: () => void
  /** Additional class names */
  className?: string
  /** Disabled state */
  disabled?: boolean
}

export const AddToCartButton = forwardRef<HTMLButtonElement, AddToCartButtonProps>(
  ({ text = "Add to cart", onAddComplete, className, disabled = false }, ref) => {
    const itemRef = useRef<SVGRectElement>(null)
    const { refs, animate, isRunning } = useAddToCartAnimation(itemRef)
    const [isAdding, setIsAdding] = useState(false)

    // Initialize item position
    useEffect(() => {
      if (itemRef.current) {
        gsap.set(itemRef.current, { y: -24 })
      }
    }, [])

    const handleClick = async () => {
      if (isRunning.current || disabled) return

      setIsAdding(true)
      await animate(() => {
        setIsAdding(false)
        onAddComplete?.()
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-label={text}
        disabled={disabled || isAdding}
        onClick={handleClick}
        data-adding={isAdding}
        className={cn(
          "atc-button group relative cursor-pointer select-none",
          "rounded-full border-2 border-border bg-background",
          "text-sm font-light text-foreground/90",
          "transition-[translate,scale] duration-150 ease-out",
          "active:translate-y-px active:scale-[0.99]",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        {/* Button content */}
        <span className="atc-content relative z-10 flex items-center gap-1.5 overflow-hidden rounded-[inherit] px-3.5 py-2 pr-4">
          {/* Animated cart with item */}
          <span ref={refs.cartRef} className="atc-cart inline-block size-[18px] origin-bottom-left">
            <CartIconWithItem
              className="atc-icon size-full overflow-visible"
              itemClassName="fill-emerald-500"
              itemRef={itemRef}
            />
          </span>

          {/* Dummy cart for position reference */}
          <span
            ref={refs.dummyRef}
            className="atc-dummy absolute left-1/2 top-1/2 inline-block size-[18px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <CartIcon className="atc-icon size-full" />
          </span>

          {/* Check icon */}
          <span
            ref={refs.checkRef}
            className="atc-check absolute left-1/2 top-1/2 inline-block size-[18px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <CheckIcon className="atc-icon size-full stroke-emerald-500" />
          </span>

          {/* Button text */}
          <span ref={refs.textRef} className="atc-text text-sm">
            {text}
          </span>
        </span>

        {/* Animated gradient border */}
        <span
          ref={refs.animatedBorderRef}
          className="atc-border atc-border--animated pointer-events-none absolute inset-[-2px] rounded-[inherit]"
        />

        {/* Static border */}
        <span
          ref={refs.staticBorderRef}
          className="atc-border atc-border--static pointer-events-none absolute inset-[-2px] rounded-[inherit] border-2 border-foreground opacity-0"
        />

        {/* Complete border */}
        <span
          ref={refs.completeBorderRef}
          className="atc-border atc-border--complete pointer-events-none absolute inset-[-2px] rounded-[inherit] border-2 border-emerald-500 opacity-0"
        />
      </button>
    )
  },
)

AddToCartButton.displayName = "AddToCartButton"
