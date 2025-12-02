# Add to Cart Button

A polished, animated "Add to Cart" button component built with React, TypeScript, GSAP, and Tailwind CSS v4.

## ✨ Features

- **Clean TypeScript** - Fully typed with strict mode
- **GSAP Animations** - Smooth, professional cart animations
- **Tailwind CSS v4** - CSS-first configuration with `@theme` directive
- **Accessible** - Proper ARIA labels and keyboard support
- **Reusable** - Clean component architecture with custom hooks
- **Theme Support** - Light/dark mode with system preference detection

## 📁 Project Structure

```
src/
├── components/
│   ├── AddToCartButton.tsx   # Main button component
│   └── index.ts              # Barrel export
├── hooks/
│   ├── useAddToCartAnimation.ts  # GSAP animation logic
│   └── index.ts
├── icons/
│   └── index.tsx             # SVG icon components
├── styles/
│   └── main.css              # Tailwind v4 CSS-first config
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Demo application
└── main.tsx                  # Entry point
```

## 🚀 Usage

### Basic Usage

```tsx
import { AddToCartButton } from './components';

function MyComponent() {
  return (
    <AddToCartButton
      label="Add to cart"
      onAddComplete={() => console.log('Item added!')}
    />
  );
}
```

### With Custom Options

```tsx
<AddToCartButton
  label="Add to bag"
  onAddComplete={() => updateCart()}
  onClick={() => trackEvent('add_to_cart')}
  disabled={isOutOfStock}
  ariaLabel="Add item to shopping bag"
  className="my-custom-class"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `'Add to cart'` | Button text |
| `onAddComplete` | `() => void` | - | Callback when animation completes |
| `onClick` | `() => void` | - | Callback when button is clicked |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | - | Custom aria-label |

## 🎨 Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4's CSS-first configuration approach:

```css
@import "tailwindcss";

@theme {
  --color-success: oklch(0.72 0.19 142.5);
  --ease-button: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 0.16s;
  /* ... */
}
```

Key features used:
- `@theme` directive for design tokens
- CSS custom properties for runtime theming
- `@property` for animatable custom properties
- Native CSS layers (`@layer`)
- Modern color functions (`oklch`, `color-mix`)

## 🎬 Animation Architecture

The animation logic is encapsulated in `useAddToCartAnimation` hook:

```ts
const { refs, triggerAnimation, isAnimating } = useAddToCartAnimation({
  scale: 1.5,
  onComplete: handleComplete,
});
```

Animation phases:
1. Cart slides to center, text fades
2. Item drops into cart with bounce
3. Cart exits with rotation
4. Success checkmark appears
5. Elements reset to initial state

## 🛠 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

## 📦 Dependencies

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **GSAP 3** - Animation library
- **Tailwind CSS 4** - Styling
- **Vite 5** - Build tool

## License

MIT
