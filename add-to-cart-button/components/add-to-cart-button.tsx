"use client"

import type React from "react"

import { useRef, forwardRef } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation"

// ============================================================================
// Animation Hook
// ============================================================================

// Moved to hooks/use-add-to-cart-animation.ts

// ============================================================================
// Main Component
// ============================================================================

export type AddToCartButtonProps = {
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
    const itemRef = useRef<HTMLSpanElement>(null)
    const { refs, animate, buttonState } = useAddToCartAnimation(itemRef)

    // Initialize item position
    // Initialize item position - Moved to hook

    const handleClick = async () => {
      if (buttonState === "adding" || disabled) return

      await animate(() => {
        onAddComplete?.()
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-label={text}
        disabled={disabled || buttonState === "adding"}
        onClick={handleClick}
        data-adding={buttonState === "adding"}
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
          <span ref={refs.cartRef} className="atc-cart relative inline-block size-[18px] origin-bottom-left">
            <ShoppingCart className="atc-icon size-full" />
            <span
              ref={itemRef}
              className="absolute left-[9px] -top-[1px] size-[10px] rounded-sm bg-emerald-500"
            />
          </span>

          {/* Dummy cart for position reference */}
          <span
            ref={refs.dummyRef}
            className="atc-dummy absolute left-1/2 top-1/2 inline-block size-[18px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <ShoppingCart className="atc-icon size-full" />
          </span>

          {/* Check icon */}
          <span
            ref={refs.checkRef}
            className="atc-check absolute left-1/2 top-1/2 inline-block size-[18px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <Check className="atc-icon size-full stroke-emerald-500 stroke-[3]" />
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
