import { Effect } from "effect";
import {
  useAnimate
} from "framer-motion";
import { useCallback, useReducer, useRef } from "react";

export type ButtonState = "idle" | "adding";

type Action = { type: "START" } | { type: "FINISH" };

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
} as const;

function buttonReducer(state: ButtonState, action: Action): ButtonState {
  switch (action.type) {
    case "START":
      return "adding";
    case "FINISH":
      return "idle";
    default:
      return state;
  }
}

// Helper to wrap framer-motion animate in an Effect
const animateFx = (
  animate: AnimateFunction,
  selector: string,
  keyframes: Keyframes,
  options?: AnimationOptions
) => Effect.tryPromise(() => animate(selector, keyframes, options));

export function useAddToCartAnimation() {
  const [buttonState, dispatch] = useReducer(buttonReducer, "idle");
  const [scope, animate] = useAnimate();
  const isRunning = useRef(false);

  const runAnimation = useCallback(
    (
      currentScope: React.RefObject<HTMLElement | null>,
      currentAnimate: AnimateFunction
    ) =>
      Effect.gen(function* (_) {
        // Initial setup
        yield* _(
          animateFx(currentAnimate, ".atc-item", { y: -24 }, { duration: 0 })
        );

        const dummy = currentScope.current?.querySelector(".atc-dummy");
        const cart = currentScope.current?.querySelector(".atc-cart");

        if (!(dummy && cart)) {
          return;
        }

        const dummyRect = dummy.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();
        const distanceX = dummyRect.left - cartRect.left;

        // Animation sequence
        yield* _(
          Effect.all(
            [
              // Move cart to center
              animateFx(
                animate,
                ".atc-cart",
                { x: distanceX },
                { duration: ANIMATION_CONFIG.duration.normal, ease: "easeOut" }
              ),
              // Wiggle cart
              animateFx(
                animate,
                ".atc-cart",
                { rotate: [0, ANIMATION_CONFIG.rotation.wiggle, 0] },
                {
                  duration: ANIMATION_CONFIG.duration.wiggle * 2,
                  ease: "easeInOut",
                }
              ),
              // Fade out text
              animateFx(
                animate,
                ".atc-text",
                {
                  opacity: 0,
                  x: distanceX,
                  filter: `blur(${ANIMATION_CONFIG.blur}px)`,
                },
                { duration: ANIMATION_CONFIG.duration.normal, ease: "easeOut" }
              ),
              // Drop item into cart
              animateFx(
                animate,
                ".atc-item",
                { y: 0 },
                {
                  duration: ANIMATION_CONFIG.duration.fast,
                  delay: ANIMATION_CONFIG.delay.drop,
                }
              ),
              // Show static border
              animateFx(
                animate,
                ".atc-border--static",
                { opacity: 1 },
                {
                  duration: ANIMATION_CONFIG.duration.fast,
                  delay: ANIMATION_CONFIG.delay.drop,
                }
              ),
              // Hide animated border
              animateFx(
                animate,
                ".atc-border--animated",
                { opacity: 0 },
                { duration: 0, delay: ANIMATION_CONFIG.delay.drop }
              ),
            ],
            { concurrency: "unbounded" }
          )
        );

        // Move cart off screen
        yield* _(
          Effect.all(
            [
              animateFx(
                animate,
                ".atc-cart",
                { x: distanceX * 4, rotate: ANIMATION_CONFIG.rotation.move },
                { duration: ANIMATION_CONFIG.duration.slow, ease: "easeIn" }
              ),
              // Show complete border
              animateFx(
                animate,
                ".atc-border--complete",
                { opacity: 1 },
                { duration: ANIMATION_CONFIG.duration.normal }
              ),
              // Show check icon
              animateFx(
                animate,
                ".atc-check",
                { opacity: 1, scale: [0, ANIMATION_CONFIG.scale.check, 1] },
                { duration: ANIMATION_CONFIG.duration.check }
              ),
            ],
            { concurrency: "unbounded" }
          )
        );

        // Reset positions (fade out borders, fade in text)
        yield* _(
          Effect.all(
            [
              animateFx(
                animate,
                ".atc-border--static, .atc-border--complete",
                { opacity: 0 },
                {
                  duration: ANIMATION_CONFIG.duration.base,
                  delay: ANIMATION_CONFIG.delay.fade,
                }
              ),
              animateFx(
                animate,
                ".atc-text",
                { x: 0, opacity: 1, filter: "blur(0px)" },
                {
                  duration: ANIMATION_CONFIG.duration.normal,
                  delay: ANIMATION_CONFIG.delay.fade,
                }
              ),
              animateFx(
                animate,
                ".atc-check",
                { opacity: 0 },
                {
                  duration: ANIMATION_CONFIG.duration.fast,
                  delay: ANIMATION_CONFIG.delay.fade,
                }
              ),
              animateFx(
                animate,
                ".atc-cart",
                { x: -100, rotate: 0 },
                { duration: 0 }
              ),
              animateFx(animate, ".atc-item", { y: -24 }, { duration: 0 }),
            ],
            { concurrency: "unbounded" }
          )
        );

        // Final reset
        yield* _(
          Effect.all(
            [
              animateFx(
                animate,
                ".atc-cart",
                { x: 0 },
                { duration: ANIMATION_CONFIG.duration.normal }
              ),
              animateFx(
                animate,
                ".atc-border--animated",
                { opacity: 1 },
                { duration: ANIMATION_CONFIG.duration.reset, ease: "easeIn" }
              ),
            ],
            { concurrency: "unbounded" }
          )
        );
      }),
    [animate]
  );

  const handleAnimate = useCallback(
    (onComplete?: () => void) => {
      if (isRunning.current) {
        return;
      }

      isRunning.current = true;
      dispatch({ type: "START" });

      Effect.runPromise(runAnimation(scope, animate)).then(() => {
        isRunning.current = false;
        dispatch({ type: "FINISH" });
        onComplete?.();
      });
    },
    [animate, scope, runAnimation]
  );

  return { scope, animate: handleAnimate, buttonState };
}
