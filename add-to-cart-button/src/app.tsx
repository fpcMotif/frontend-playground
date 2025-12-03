import { createEffect, createSignal } from "solid-js";
import { Moon, Sun } from "lucide-solid";
import { AddToCartButton } from "./components/add-to-cart-button";

function App() {
  const [count, setCount] = createSignal(0);
  const [isDark, setIsDark] = createSignal(false);

  createEffect(() => {
    if (isDark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div class="flex min-h-screen items-center justify-center bg-background p-8 text-foreground transition-colors duration-300">
      <button
        type="button"
        onClick={() => setIsDark(!isDark())}
        class="absolute top-4 right-4 rounded-full p-2 text-foreground hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {isDark() ? <Sun class="size-6" /> : <Moon class="size-6" />}
      </button>

      <div class="w-full max-w-md space-y-4">
        <h1 class="text-center font-bold text-2xl">
          Add to Cart Button Demo
        </h1>
        <p class="text-center text-muted-foreground">
          Click the button to see the animation in action
        </p>
        <div class="flex justify-center">
          <AddToCartButton
            count={count()}
            onAddComplete={() => setCount((c) => c + 1)}
            text="Add to cart"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
