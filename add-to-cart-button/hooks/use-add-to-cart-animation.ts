import { useRef, useCallback, useReducer, useEffect } from "react"
import gsap from "gsap"

export type AnimationRefs = {
    cartRef: React.RefObject<HTMLSpanElement | null>
    itemRef: React.RefObject<HTMLSpanElement | null>
    textRef: React.RefObject<HTMLSpanElement | null>
    checkRef: React.RefObject<HTMLSpanElement | null>
    staticBorderRef: React.RefObject<HTMLSpanElement | null>
    completeBorderRef: React.RefObject<HTMLSpanElement | null>
    animatedBorderRef: React.RefObject<HTMLSpanElement | null>
    dummyRef: React.RefObject<HTMLSpanElement | null>
}

export type ButtonState = "idle" | "adding"

type Action = { type: "START" } | { type: "FINISH" }

const ANIMATION_CONFIG = {
    duration: {
        base: 0.5,
        fast: 0.1,
        normal: 0.22,
        slow: 0.6,
        check: 0.25,
        reset: 1,
        wiggle: 0.11,
    },
    rotation: {
        wiggle: -20,
        move: -30,
    },
    scale: {
        check: 1.5,
    },
    delay: {
        drop: 0.1,
        fade: 0.125,
    },
    blur: 6,
} as const

function buttonReducer(state: ButtonState, action: Action): ButtonState {
    switch (action.type) {
        case "START":
            return "adding"
        case "FINISH":
            return "idle"
        default:
            return state
    }
}

export function useAddToCartAnimation(itemRef: React.RefObject<HTMLSpanElement | null>) {
    const [buttonState, dispatch] = useReducer(buttonReducer, "idle")
    const isRunning = useRef(false)
    const timeline = useRef<gsap.core.Timeline | null>(null)

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

    // Cleanup GSAP timeline on unmount
    useEffect(() => {
        return () => {
            timeline.current?.kill()
        }
    }, [])

    // Initialize item position
    useEffect(() => {
        if (itemRef.current) {
            gsap.set(itemRef.current, { y: -24 })
        }
    }, [itemRef])

    const animate = useCallback(
        async (onComplete?: () => void) => {
            if (isRunning.current) return
            if (!cartRef.current || !dummyRef.current) return

            isRunning.current = true
            dispatch({ type: "START" })

            const dummyRect = dummyRef.current.getBoundingClientRect()
            const cartRect = cartRef.current.getBoundingClientRect()
            const distanceX = dummyRect.left - cartRect.left

            timeline.current = gsap
                .timeline({
                    defaults: { duration: ANIMATION_CONFIG.duration.base, ease: "power2.out" },
                    onComplete: () => {
                        isRunning.current = false
                        dispatch({ type: "FINISH" })
                        onComplete?.()
                    },
                })
                // Move cart to center
                .to(cartRef.current, {
                    x: distanceX,
                    duration: ANIMATION_CONFIG.duration.normal,
                })
                // Wiggle cart
                .to(
                    cartRef.current,
                    {
                        rotate: ANIMATION_CONFIG.rotation.wiggle,
                        yoyo: true,
                        repeat: 1,
                        duration: ANIMATION_CONFIG.duration.wiggle,
                    },
                    0,
                )
                // Fade out text
                .to(
                    textRef.current,
                    {
                        opacity: 0,
                        x: distanceX,
                        duration: ANIMATION_CONFIG.duration.normal,
                        filter: `blur(${ANIMATION_CONFIG.blur}px)`,
                    },
                    0,
                )
                // Drop item into cart
                .to(itemRef.current, {
                    y: 0,
                    duration: ANIMATION_CONFIG.duration.fast,
                    delay: ANIMATION_CONFIG.delay.drop,
                })
                // Show static border
                .to(
                    staticBorderRef.current,
                    {
                        opacity: 1,
                        duration: ANIMATION_CONFIG.duration.fast,
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
                    duration: ANIMATION_CONFIG.duration.slow,
                    delay: ANIMATION_CONFIG.delay.drop,
                })
                .to(
                    cartRef.current,
                    {
                        rotate: ANIMATION_CONFIG.rotation.move,
                        duration: ANIMATION_CONFIG.duration.fast,
                    },
                    "<",
                )
                // Show complete border
                .to(
                    completeBorderRef.current,
                    {
                        opacity: 1,
                        duration: ANIMATION_CONFIG.duration.normal,
                    },
                    "<",
                )
                // Show check icon
                .to(
                    checkRef.current,
                    {
                        opacity: 1,
                        yoyo: true,
                        scale: ANIMATION_CONFIG.scale.check,
                        duration: ANIMATION_CONFIG.duration.check,
                        repeatDelay: ANIMATION_CONFIG.delay.fade,
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
                    duration: ANIMATION_CONFIG.duration.base,
                    delay: ANIMATION_CONFIG.delay.fade,
                })
                // Fade in text
                .to(textRef.current, {
                    xPercent: 0,
                    opacity: 1,
                    duration: ANIMATION_CONFIG.duration.normal,
                    filter: "blur(0px)",
                })
                // Reset cart position
                .to(cartRef.current, {
                    x: 0,
                })
                // Show animated border again
                .to(animatedBorderRef.current, {
                    opacity: 1,
                    duration: ANIMATION_CONFIG.duration.reset,
                    ease: "power2.in",
                })
        },
        [itemRef],
    )

    return { refs, animate, buttonState }
}
