import { Effect } from "effect";
import type { AnimationOptions, MotionKeyframesDefinition } from "motion";
import { animate } from "motion";
import { createSignal } from "solid-js";

export type ButtonState = "idle" | "adding";

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

const animateEffect = (
  elements: NodeListOf<Element>,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptions
) => Effect.promise(() => animate(elements, keyframes, options).finished);

export function useAddToCartAnimation() {
  const [buttonState, setButtonState] = createSignal<ButtonState>("idle");
  let scope: HTMLElement | undefined;
  let isRunning = false;

  const setScope = (el: HTMLButtonElement | null) => {
    if (el) {
      scope = el;
    }
  };

  const createAnimation = (currentScope: HTMLElement) =>
    Effect.gen(function* () {
      const $ = (selector: string) => currentScope.querySelectorAll(selector);

      // Initial setup
      yield* animateEffect($(".atc-item"), { y: -24 }, { duration: 0 });

      // Click effect: Scale cart
      yield* animateEffect(
        $(".atc-cart"),
        { scale: [1, 0.8, 1] },
        { duration: 0.15 }
      );

      const dummy = currentScope.querySelector(".atc-dummy");
      const cart = currentScope.querySelector(".atc-cart");

      if (!(dummy && cart)) {
        return;
      }

      const dummyRect = dummy.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();
      const distanceX = dummyRect.left - cartRect.left;

      // Animation sequence
      yield* Effect.all(
        [
          animateEffect(
            $(".atc-cart"),
            { x: distanceX },
            { duration: ANIMATION_CONFIG.duration.normal, easing: "ease-out" }
          ),
          animateEffect(
            $(".atc-cart"),
            { rotate: [0, ANIMATION_CONFIG.rotation.wiggle, 0] },
            {
              duration: ANIMATION_CONFIG.duration.wiggle * 2,
              easing: "ease-in-out",
            }
          ),
          animateEffect(
            $(".atc-item"),
            { y: 0 },
            {
              duration: ANIMATION_CONFIG.duration.fast,
              delay: ANIMATION_CONFIG.delay.drop,
            }
          ),
          animateEffect(
            $(".atc-border--static"),
            { opacity: 1 },
            {
              duration: ANIMATION_CONFIG.duration.fast,
              delay: ANIMATION_CONFIG.delay.drop,
            }
          ),
          animateEffect(
            $(".atc-border--animated"),
            { opacity: 0 },
            { duration: 0, delay: ANIMATION_CONFIG.delay.drop }
          ),
        ],
        { concurrency: "unbounded" }
      );

      // Move cart off screen
      yield* Effect.all(
        [
          animateEffect(
            $(".atc-cart"),
            {
              x: Math.max(distanceX * 4, 150),
              rotate: ANIMATION_CONFIG.rotation.move,
            },
            { duration: ANIMATION_CONFIG.duration.slow, easing: "ease-in" }
          ),
          animateEffect(
            $(".atc-border--complete"),
            { opacity: 1 },
            { duration: ANIMATION_CONFIG.duration.normal }
          ),
          animateEffect(
            $(".atc-check"),
            { opacity: 1, scale: [0, ANIMATION_CONFIG.scale.check, 1] },
            { duration: ANIMATION_CONFIG.duration.check }
          ),
        ],
        { concurrency: "unbounded" }
      );

      // Reset positions
      yield* Effect.all(
        [
          animateEffect(
            $(".atc-border--static, .atc-border--complete"),
            { opacity: 0 },
            {
              duration: ANIMATION_CONFIG.duration.base,
              delay: ANIMATION_CONFIG.delay.fade,
            }
          ),
          animateEffect(
            $(".atc-check"),
            { opacity: 0 },
            {
              duration: ANIMATION_CONFIG.duration.fast,
              delay: ANIMATION_CONFIG.delay.fade,
            }
          ),
          animateEffect(
            $(".atc-cart"),
            { x: -100, rotate: 0 },
            { duration: 0 }
          ),
          animateEffect($(".atc-item"), { y: -24 }, { duration: 0 }),
        ],
        { concurrency: "unbounded" }
      );

      // Final reset
      yield* Effect.all(
        [
          animateEffect(
            $(".atc-cart"),
            { x: 0 },
            { duration: ANIMATION_CONFIG.duration.normal }
          ),
          animateEffect(
            $(".atc-border--animated"),
            { opacity: 1 },
            { duration: ANIMATION_CONFIG.duration.reset, easing: "ease-in" }
          ),
        ],
        { concurrency: "unbounded" }
      );
    });

  const runAnimation = () => {
    const currentScope = scope;
    if (isRunning || !currentScope) {
      return;
    }

    isRunning = true;
    setButtonState("adding");

    const program = createAnimation(currentScope).pipe(
      Effect.ensuring(
        Effect.sync(() => {
          isRunning = false;
          setButtonState("idle");
        })
      )
    );

    return Effect.runPromise(program);
  };

  const handleAnimate = async (onComplete?: () => void) => {
    await runAnimation();
    onComplete?.();
  };

  return { setScope, animate: handleAnimate, buttonState };
}
