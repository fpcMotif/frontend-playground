"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddComplete = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <main className="dark flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      {/* Grid background decoration */}
      <div
        className="-z-10 pointer-events-none fixed inset-0"
        style={{
          background: `
            linear-gradient(90deg, var(--border) 1px, transparent 1px 45px) calc(45px * 0.36) 50% / 45px 45px,
            linear-gradient(var(--border) 1px, transparent 1px 45px) 0% calc(45px * 0.32) / 45px 45px
          `,
          mask: "linear-gradient(-20deg, transparent 50%, white)",
        }}
      />

      {/* Cart count display */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">Items in cart</p>
        <p className="font-bold text-4xl text-foreground">{cartCount}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="scale-150">
        <AddToCartButton onAddComplete={handleAddComplete} />
      </div>

      {/* Usage examples */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <h2 className="font-medium text-muted-foreground text-sm">Variants</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AddToCartButton onAddComplete={handleAddComplete} text="Buy Now" />
          <AddToCartButton onAddComplete={handleAddComplete} text="Add Item" />
          <AddToCartButton disabled text="Add to Cart" />
        </div>
      </div>
    </main>
  );
}
