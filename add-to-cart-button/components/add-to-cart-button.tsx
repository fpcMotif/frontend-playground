"use client";

import { Check, ShoppingCart } from "lucide-react";
import { forwardRef } from "react";
import { useAddToCartAnimation } from "@/hooks/use-add-to-cart-animation";
import { cn } from "@/lib/utils";

// ============================================================================
// Animation Hook
// ============================================================================

// Moved to hooks/use-add-to-cart-animation.ts

// ============================================================================
// Main Component
// ============================================================================

export type AddToCartButtonProps = {
  /** Text displayed on the button */
  text?: string;
  /** Callback fired when animation completes */
  onAddComplete?: () => void;
  /** Additional class names */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
};

export const AddToCartButton = forwardRef<
  HTMLButtonElement,
  AddToCartButtonProps
>(
  (
    { text = "Add to cart", onAddComplete, className, disabled = false },
    _ref
  ) => {
    const { scope, animate, buttonState } = useAddToCartAnimation();

    const handleClick = async () => {
      if (buttonState === "adding" || disabled) {
        return;
      }

      await animate(() => {
        onAddComplete?.();
      });
    };

    return (
      <button
        aria-label={text}
        className={cn("atc-button", className)}
        data-adding={buttonState === "adding"}
        disabled={disabled || buttonState === "adding"}
        onClick={handleClick}
        ref={scope}
        type="button"
      >
        {/* Button content */}
        <span className="atc-content">
          {/* Animated cart with item */}
          <span className="atc-cart">
            <ShoppingCart className="atc-icon" />
            <span className="atc-item" />
          </span>

          {/* Dummy cart for position reference */}
          <span className="atc-dummy">
            <ShoppingCart className="atc-icon" />
          </span>

          {/* Check icon */}
          <span className="atc-check">
            <Check className="atc-icon atc-icon--check" />
          </span>

          {/* Button text */}
          <span className="atc-text">{text}</span>
        </span>

        {/* Animated gradient border */}
        <span className="atc-border atc-border--animated" />

        {/* Static border */}
        <span className="atc-border atc-border--static" />

        {/* Complete border */}
        <span className="atc-border atc-border--complete" />
      </button>
    );
  }
);

AddToCartButton.displayName = "AddToCartButton";
