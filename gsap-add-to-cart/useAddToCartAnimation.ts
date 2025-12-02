import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import type { AnimationConfig, AnimationRefs } from '../types';

const DEFAULT_CONFIG: AnimationConfig = {
  slideDuration: 0.22,
  rotateDuration: 0.11,
  fadeDuration: 0.22,
  exitDuration: 0.6,
  ease: 'power2.out',
};

interface UseAddToCartAnimationOptions {
  scale?: number;
  onComplete?: () => void;
  config?: Partial<AnimationConfig>;
}

interface UseAddToCartAnimationReturn {
  refs: {
    buttonRef: React.RefObject<HTMLButtonElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    textRef: React.RefObject<HTMLSpanElement | null>;
    cartRef: React.RefObject<HTMLSpanElement | null>;
    cartItemRef: React.RefObject<SVGRectElement | null>;
    animatedBorderRef: React.RefObject<HTMLSpanElement | null>;
    staticBorderRef: React.RefObject<HTMLSpanElement | null>;
    completeBorderRef: React.RefObject<HTMLSpanElement | null>;
    dummyCartRef: React.RefObject<HTMLSpanElement | null>;
    checkIconRef: React.RefObject<HTMLSpanElement | null>;
  };
  triggerAnimation: () => void;
  isAnimating: React.RefObject<boolean>;
}

/**
 * Custom hook encapsulating all GSAP animation logic for the Add to Cart button
 * Handles animation setup, execution, and cleanup
 */
export function useAddToCartAnimation({
  scale = 1,
  onComplete,
  config: userConfig = {},
}: UseAddToCartAnimationOptions = {}): UseAddToCartAnimationReturn {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  
  // Element refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cartRef = useRef<HTMLSpanElement>(null);
  const cartItemRef = useRef<SVGRectElement>(null);
  const animatedBorderRef = useRef<HTMLSpanElement>(null);
  const staticBorderRef = useRef<HTMLSpanElement>(null);
  const completeBorderRef = useRef<HTMLSpanElement>(null);
  const dummyCartRef = useRef<HTMLSpanElement>(null);
  const checkIconRef = useRef<HTMLSpanElement>(null);
  
  // Animation state
  const isAnimating = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Set initial state for cart item
  useEffect(() => {
    if (cartItemRef.current) {
      gsap.set(cartItemRef.current, { y: -24 });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const triggerAnimation = useCallback(() => {
    if (isAnimating.current) return;
    
    const button = buttonRef.current;
    const container = containerRef.current;
    const text = textRef.current;
    const cart = cartRef.current;
    const cartItem = cartItemRef.current;
    const animatedBorder = animatedBorderRef.current;
    const staticBorder = staticBorderRef.current;
    const completeBorder = completeBorderRef.current;
    const dummyCart = dummyCartRef.current;
    const checkIcon = checkIconRef.current;

    if (!button || !container || !text || !cart || !cartItem || 
        !animatedBorder || !staticBorder || !completeBorder || 
        !dummyCart || !checkIcon) {
      return;
    }

    isAnimating.current = true;
    button.dataset.adding = 'true';

    // Calculate distance for cart to travel to center
    const dummyRect = dummyCart.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const distanceX = (dummyRect.left - cartRect.left) / scale;

    // Kill any existing timeline
    timelineRef.current?.kill();

    // Create animation timeline
    const tl = gsap.timeline({
      defaults: { ease: config.ease },
      onComplete: () => {
        isAnimating.current = false;
        button.dataset.adding = 'false';
        onComplete?.();
      },
    });

    timelineRef.current = tl;

    tl
      // Phase 1: Slide cart to center, hide text
      .set(container, { '--complete': 1 })
      .to(cart, {
        x: distanceX,
        duration: config.slideDuration,
      })
      .to(cart, {
        rotate: -20,
        yoyo: true,
        repeat: 1,
        duration: config.rotateDuration,
      }, 0)
      .to(text, {
        opacity: 0,
        x: distanceX,
        filter: 'blur(6px)',
        duration: config.slideDuration,
      }, 0)
      
      // Phase 2: Drop item into cart
      .to(cartItem, {
        y: 0,
        duration: 0.1,
        delay: 0.1,
      })
      .to(staticBorder, {
        opacity: 1,
        duration: 0.1,
      }, '<')
      
      // Phase 3: Cart exits, show success
      .set(container, { '--complete': 0 })
      .set(animatedBorder, { opacity: 0 })
      .to(cart, {
        x: distanceX * 4,
        duration: config.exitDuration,
        delay: 0.1,
      })
      .to(cart, {
        rotate: -30,
        duration: 0.1,
      }, '<')
      .to(completeBorder, {
        opacity: 1,
        duration: config.fadeDuration,
      }, '<')
      .to(checkIcon, {
        opacity: 1,
        scale: 1.5,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.125,
        duration: 0.25,
      }, '<')
      
      // Phase 4: Reset and bring cart back
      .set(text, { x: 0, xPercent: 0 })
      .set(cart, { x: -100, rotate: 0 })
      .set(cartItem, { y: -24 })
      .to([staticBorder, completeBorder], {
        opacity: 0,
        duration: 0.5,
        delay: 0.125,
      })
      .to(text, {
        xPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: config.fadeDuration,
      })
      .to(cart, { x: 0 })
      .to(animatedBorder, {
        opacity: 1,
        duration: 1,
        ease: 'power2.in',
      });
  }, [scale, onComplete, config]);

  return {
    refs: {
      buttonRef,
      containerRef,
      textRef,
      cartRef,
      cartItemRef,
      animatedBorderRef,
      staticBorderRef,
      completeBorderRef,
      dummyCartRef,
      checkIconRef,
    },
    triggerAnimation,
    isAnimating,
  };
}
