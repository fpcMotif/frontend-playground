---

# Frontend Playground Agent Guide

This is a monorepo containing multiple frontend mini-projects and experiments. Each project is self-contained with its own tech stack and configuration.

## Repository Structure

```
frontend-playground/
├── clone-library-guide/     # Next.js + Tailwind v4 design system showcase
├── react-project-conversion/ # Next.js + Tailwind v4 project (similar to clone-library)
├── chromatic-ai-studio/     # Vite + React + Tailwind v4 color palette generator
├── interactive-frosted-glass-cards/ # Ripple (migrated from TanStack) with frosted glass effects
└── AGENTS.md               # This file
```

## Project Overview

### clone-library-guide
**Purpose**: Full design system showcase with comprehensive UI components
**Tech Stack**: Next.js 16, React 19, Tailwind CSS v4, TypeScript, Biome
**Key Features**: 
- Extensive component library in `components/ui/`
- Theme switching with `next-themes`
- Vercel Analytics integration
- Uses App Router architecture

### react-project-conversion  
**Purpose**: Color picker/converter application focused on color tools
**Tech Stack**: Next.js 16, React 19, Tailwind CSS v4, TypeScript, Biome
**Key Features**:
- HDR color input components
- Similar setup to clone-library-guide but specialized for color manipulation
- Uses `hdr-color-input` package for advanced color controls

### chromatic-ai-studio
**Purpose**: AI-powered color palette generator using Gemini API
**Tech Stack**: Vite, React 19, Tailwind CSS v4, TypeScript, Biome
**Key Features**:
- Gemini API integration for AI color generation
- Professional color manipulation with OKLCH support
- Export to Tailwind v3/v4 formats
- Vite-based for fast development

### interactive-frosted-glass-cards
**Purpose**: Ripple-based frosted glass cards with interactive effects
**Tech Stack**: Ripple v0.2.93, TypeScript, Tailwind CSS v4, Vite
**Key Features**:
- Interactive card components with mouse tracking
- Frosted glass visual effects (blur, saturate, brightness, contrast)
- Card fan-out animations
- **Migrated from**: TanStack Start (see `MIGRATION.md`)
- Glassmorphism visual effects
- Angular signals for state management
- Python script for asset management

## Technology Stack Details

### Package Manager
All projects use **Bun** (not npm/yarn) for package management and script execution.

### Core Dependencies
- **UI Components**: Radix UI primitives across React projects
- **Styling**: Tailwind CSS v4 with custom theme tokens via `@theme` directive
- **Icons**: Lucide React icon library
- **Fonts**: Geist font family from Next.js
- **Analytics**: Vercel Analytics in Next.js projects
- **Code Quality**: Ultracite (Biome preset) for consistent formatting/linting

### Build Tools
- **Next.js Projects**: Next.js 16 with App Router, Turbopack
- **Vite Project**: Vite 6 with React plugin and Tailwind CSS v4 integration
- **Angular Project**: Angular CLI 21 with modern build system

## Development Commands

### Universal Commands (All Projects)
```bash
# Navigate to project directory first
cd [project-name]

# Install dependencies
bun install

# Development server
bun dev

# Production build
bun build

# Code Quality (uses Ultracite + Biome)
bunx ultracite fix   # Auto-fix linting and formatting issues
bunx ultracite check # Check for issues without fixing
```

### Project-Specific Commands

#### clone-library-guide & react-project-conversion
```bash
bun start            # Start production server (Next.js only)
```

#### chromatic-ai-studio
```bash
bun preview          # Preview production build (Vite)
```

#### interactive-frosted-glass-cards
```bash
bun preview          # Preview production build (ng serve --configuration=production)
bun lint             # Run ESLint (Angular project doesn't use Ultracite)
```

## Code Standards & Conventions

### Universal Patterns (All Projects)

1. **File Naming**: Use `kebab-case` for all files
   - ✅ `button.tsx`, `use-auth.ts`, `color-utils.ts`
   - ❌ `Button.tsx`, `useAuth.ts`, `colorUtils.ts`

2. **Component Export Names**: Use `PascalCase`
   ```tsx
   // file: button.tsx
   export const Button: React.FC = () => { ... }
   ```

3. **TypeScript**: Always use explicit types for function parameters and return values

4. **React Patterns**:
   - Function components only (no class components)
   - Hooks at top level, never conditionally
   - Use semantic HTML and ARIA attributes
   - Remove console.log/debugger from production code

### Tailwind CSS v4 Specific (Most Projects)

1. **Configuration**: Use CSS-first approach with `@theme` directive
   ```css
   @import "tailwindcss";
   
   @theme {
     --font-display: "Satoshi", "sans-serif";
     --color-avocado-500: oklch(0.84 0.18 117.33);
   }
   ```

2. **New Utilities**:
   - Container queries: `@sm:`, `@md:`, `@max-md:`
   - 3D transforms: `rotate-x-*`, `rotate-y-*`, `translate-z-*`
   - Enhanced gradients: `bg-linear-45`, `bg-conic`, `bg-radial`

3. **Breaking Changes**:
   - `shadow-sm` → `shadow-xs`
   - `bg-opacity-*` → `bg-black/50`
   - Default border color is now `currentColor`

### Code Quality Tools

All projects use **Ultracite** (Biome preset) for consistent formatting/linting:
- **Purpose**: Zero-config code quality enforcement
- **Speed**: Rust-based, extremely fast
- **Auto-fix**: Most issues are automatically fixable

Pre-commit hooks run `bunx ultracite fix` automatically via Husky.

## Project-Specific Notes

### clone-library-guide
- Full design system with comprehensive UI components
- Uses Next.js App Router
- Implements theme switching with `next-themes`
- Has extensive component library in `components/ui/`

### react-project-conversion
- Color picker/converter application
- Uses HDR color input components
- Similar setup to clone-library-guide but focused on color tools

### chromatic-ai-studio
- AI-powered color palette generator
- Uses Gemini API for color generation
- Vite-based for fast development
- Has Playwright MCP screenshots in `.playwright-mcp/`

### interactive-frosted-glass-cards
- Angular-based glassmorphism demo
- Uses modern Angular 21
- Has Python script `download_icons.py` for asset management
- ESLint for code quality (no Biome/Ultracite)

## Development Workflow

1. Navigate to specific project directory
2. Run `bun install` if dependencies needed
3. Use `bun dev` for development
4. Before committing: `bunx ultracite fix` (except Angular project)
5. Check project-specific README for additional setup

## Key Dependencies

- **UI Components**: Radix UI primitives across React projects
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Icons**: Lucide React icon library
- **Fonts**: Geist font family from Next.js
- **Analytics**: Vercel Analytics in Next.js projects

## Common Gotchas

1. **Tailwind v4 Changes**: Many projects migrated from v3 to v4 - be aware of utility name changes
2. **React 19**: Projects use latest React with new features like ref as prop
3. **Next.js 16**: Uses latest Next.js with App Router patterns
4. **Package Manager**: All projects use Bun (not npm/yarn)
5. **Import Paths**: Most use `@/` alias for imports from `lib/`, `components/`, etc.

## Environment Variables

Projects may require environment variables:
- `GEMINI_API_KEY`: For AI features in chromatic-ai-studio
- Create `.env.local` files in project directories as needed

## Testing Strategies

Current projects focus on development and demonstration rather than comprehensive testing:
- No formal test suites are configured
- Code quality is enforced through Ultracite/Biome
- Manual testing during development
- Pre-commit hooks ensure code quality

## Deployment Processes

Projects are configured for deployment to various platforms:
- **Vercel**: Next.js projects (clone-library-guide, react-project-conversion)
- **Static Hosting**: Vite project (chromatic-ai-studio) can be built to static files
- **Angular CLI**: interactive-frosted-glass-cards uses standard Angular deployment

Build outputs:
- Next.js: `.next/` directory
- Vite: `dist/` directory  
- Angular: `dist/` directory

## Security Considerations

- All projects use modern security practices
- Environment variables for sensitive data
- No hardcoded API keys in source code
- Proper CORS configuration for development servers
- Secure headers configured in Next.js projects

---

This guide should be updated as projects evolve and new patterns emerge. Each project maintains its own specific documentation in their respective directories.