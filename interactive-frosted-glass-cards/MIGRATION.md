# Migration: TanStack Start → Ripple

This project has been successfully migrated from **TanStack Start** to **[Ripple](https://ripplejs.com)** - "the elegant TypeScript UI framework".

## Migration Summary

### Framework Changes
- **From**: TanStack Start (v1.132.0) with React Router
- **To**: Ripple (v0.11.0) - TypeScript-first reactive UI framework

### Architecture Differences

| Feature | TanStack Start | Ripple |
|---------|---------------|--------|
| **File Extension** | `.tsx` | `.ripple` |
| **Reactivity** | React hooks (useState, useEffect) | `track()` + `@` operator |
| **Components** | React components | `component` keyword |
| **Routing** | File-based routing | SPA (future file routing) |
| **Build Tool** | Custom TanStack + Vite | Vite + Ripple plugin |
| **Reactiveness** | Virtual DOM | Fine-grained reactivity |

### What Changed

#### 1. Component System
```diff
- export const Card = forwardRef<...>(props => { ... })
+ export component FrostedCard(props: FrostedCardProps) { ... }
```

#### 2. State Management
```diff
- const [loaded, setLoaded] = useState(false)
+ const loaded = track(false)
+ 
+ setTimeout(() => { @loaded = true }, 100)
```

#### 3. Computed Values
```diff
- const transform = useMemo(() => compute(), [deps])
+ const transform = track(() => compute())
```

#### 4. Conditional Rendering
```diff
- {loaded && <Component />}
+ if (@loaded) { <Component /> }
```

#### 5. Lists
```diff
- {cards.map((card, i) => <Card key={...} />)}
+ for (const card of @cards; index i) { <FrostedCard /> }
```

### Preserved Features

All frosted glass card features remain intact:
- ✅ Frosted glass visual effects (blur, saturate, brightness, contrast)
- ✅ Mouse tracking parallax effect
- ✅ Card fan-out animation on load
- ✅ CSS custom properties
- ✅ Interactive hover/press states
- ✅ Responsive grid layout
- ✅ All image assets

### New Files

```
interactive-frosted-glass-cards/
├── src/
│   ├── main.ripple              # Application entry point
│   ├── app.ripple               # Main app component
│   ├── global.css               # Global styles
│   └── components/
│       └── frosted-card.ripple  # Frosted card component
├── vite.config.ts               # Vite config with Ripple plugin
├── tsconfig.json                # TypeScript config
├── ripple.config.ts             # Ripple framework config
└── package.json                 # Dependencies
```

### Dependencies

**Removed:**
- @tanstack/react-router
- @tanstack/react-start
- react
- react-dom

**Added:**
- ripple (^0.11.0)
- @ripple-ts/vite-plugin
- tailwindcss
- @tailwindcss/vite

### Build Commands

```bash
# Development
bun dev

# Production build  
bun build

# Preview production
bun preview
```

### Performance Benefits

1. **No Virtual DOM**: Direct DOM updates via fine-grained reactivity
2. **Smaller bundle**: Ripple runtime is significantly smaller than React
3. **TypeScript-native**: Full type safety with `.ripple` files
4. **Better DX**: Cleaner syntax, less boilerplate

### Future Enhancements

Ripple is adding:
- File-based routing (like TanStack)
- SSR support
- More dev tools

This migration future-proofs the project while maintaining all existing functionality.
