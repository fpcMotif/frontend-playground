import React, { useCallback } from 'react';
import { useAddToCartAnimation } from '../hooks/useAddToCartAnimation';
import { CartIcon, CartIconPlain, CheckIcon } from '../icons';
import type { AddToCartButtonProps } from '../types';

/**
 * Animated Add to Cart Button Component
 * 
 * A polished, accessible button with GSAP-powered animations showing
 * item being added to cart with success confirmation.
 * 
 * @example
 * ```tsx
 * <AddToCartButton 
 *   label="Add to cart"
 *   onAddComplete={() => console.log('Added!')}
 * />
 * ```
 */
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  label = 'Add to cart',
  onAddComplete,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const { refs, triggerAnimation, isAnimating } = useAddToCartAnimation({
    scale: 1.5, // Match the CSS scale
    onComplete: onAddComplete,
  });

  const handleClick = useCallback(() => {
    onClick?.();
    triggerAnimation();
  }, [onClick, triggerAnimation]);

  const handleActiveStyles = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isAnimating.current) {
        const button = e.currentTarget;
        if (e.type === 'mousedown') {
          button.style.transform = 'translateY(1px) scale(0.99)';
        } else {
          button.style.transform = '';
        }
      }
    },
    [isAnimating]
  );

  return (
    <button
      ref={refs.buttonRef}
      type="button"
      className={`atc-button ${className}`}
      onClick={handleClick}
      onMouseDown={handleActiveStyles}
      onMouseUp={handleActiveStyles}
      onMouseLeave={handleActiveStyles}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      data-adding="false"
    >
      {/* Button content wrapper */}
      <span ref={refs.containerRef} className="atc-content">
        {/* Animated cart icon */}
        <span ref={refs.cartRef} className="atc-cart">
          <CartIcon ref={refs.cartItemRef} className="atc-icon" />
        </span>

        {/* Dummy cart for position reference (invisible) */}
        <span ref={refs.dummyCartRef} className="atc-cart-dummy">
          <CartIconPlain className="atc-icon" />
        </span>

        {/* Success checkmark */}
        <span ref={refs.checkIconRef} className="atc-check">
          <CheckIcon className="atc-icon" />
        </span>

        {/* Button text */}
        <span ref={refs.textRef} className="atc-text">
          {label}
        </span>
      </span>

      {/* Border layers for animation effects */}
      <span
        ref={refs.animatedBorderRef}
        className="atc-border atc-border--animated"
      />
      <span
        ref={refs.staticBorderRef}
        className="atc-border atc-border--static"
      />
      <span
        ref={refs.completeBorderRef}
        className="atc-border atc-border--complete"
      />
    </button>
  );
};

export default AddToCartButton;
