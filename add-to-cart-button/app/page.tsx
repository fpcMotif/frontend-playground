"use client"

import { useState } from "react"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default function Home() {
  const [cartCount, setCartCount] = useState(0)

  const handleAddComplete = () => {
    setCartCount((prev) => prev + 1)
  }

  return (
    <main className="dark flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      {/* Grid background decoration */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
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
        <p className="text-sm text-muted-foreground">Items in cart</p>
        <p className="text-4xl font-bold text-foreground">{cartCount}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="scale-150">
        <AddToCartButton onAddComplete={handleAddComplete} />
      </div>

      {/* Usage examples */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <h2 className="text-sm font-medium text-muted-foreground">Variants</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AddToCartButton text="Buy Now" onAddComplete={handleAddComplete} />
          <AddToCartButton text="Add Item" onAddComplete={handleAddComplete} />
          <AddToCartButton text="Add to Cart" disabled />
        </div>
      </div>
    </main>
  )
}
