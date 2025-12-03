import { Check, ShoppingCart } from "lucide-solid";
import { useAddToCartAnimation } from "../hooks/use-add-to-cart-animation";
import { cn } from "../lib/utils";

export type AddToCartButtonProps = {
  /** Text displayed on the button */
  text?: string;
  /** Callback fired when animation completes */
  onAddComplete?: () => void;
  /** Additional class names */
  class?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Current cart count */
  count?: number;
};

export function AddToCartButton(props: AddToCartButtonProps) {
  const { setScope, animate, buttonState } = useAddToCartAnimation();

  const handleClick = async () => {
    if (buttonState() === "adding" || props.disabled) {
      return;
    }

    await animate(() => {
      props.onAddComplete?.();
    });
  };

  return (
    <button
      aria-label={props.text || "Add to cart"}
      class={cn("atc-button group", props.class)}
      data-adding={buttonState() === "adding"}
      disabled={props.disabled || buttonState() === "adding"}
      onClick={handleClick}
      ref={setScope}
      type="button"
    >
      {/* Button content */}
      <span class="atc-content">
        {/* Animated cart with item */}
        <span class="atc-cart">
          <ShoppingCart class="atc-icon" />
          <span class="atc-item" />
          {props.count !== undefined && props.count > 0 && (
            <span class="atc-count">{props.count}</span>
          )}
        </span>

        {/* Dummy cart for position reference */}
        <span class="atc-dummy">
          <ShoppingCart class="atc-icon" />
        </span>

        {/* Check icon */}
        <span class="atc-check">
          <Check class="atc-icon atc-icon--check" />
        </span>
      </span>

      {/* Tooltip */}
      <span class="atc-tooltip">{props.text || "Add to cart"}</span>

      {/* Animated gradient border */}
      <span class="atc-border atc-border--animated" />

      {/* Static border */}
      <span class="atc-border atc-border--static" />

      {/* Complete border */}
      <span class="atc-border atc-border--complete" />
    </button>
  );
}
