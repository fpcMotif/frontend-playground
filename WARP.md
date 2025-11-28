# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Structure

This is a **monorepo** containing independent frontend mini-projects. Each project is self-contained with its own dependencies, build tooling, and framework.

| Project | Framework | Build Tool |
|---------|-----------|------------|
| `chromatic-ai-studio/` | React 19 + Vite | `npm run dev` |
| `clone-library-guide/` | Next.js 16 (App Router) | `npm run dev` |
| `interactive-frosted-glass-cards/` | Angular 21 | `ng serve` |
| `react-project-conversion/` | Next.js 16 | `npm run dev` |

## Development Commands

Navigate to the specific project folder before running commands:

```powershell
cd chromatic-ai-studio  # or any project folder
npm install             # install dependencies
npm run dev             # start dev server
npm run build           # production build
```

### Linting & Formatting

Most projects use **Ultracite** (Biome preset) for linting/formatting:
- Fix issues: `npx ultracite fix` or `bunx ultracite fix`
- Check issues: `npx ultracite check`

Some projects also have ESLint: `npm run lint`

Pre-commit hooks (Husky + lint-staged) run Ultracite automatically in projects that have it configured.

## Code Standards (from Ultracite)

Projects using Ultracite enforce these patterns:
- **TypeScript**: Prefer `unknown` over `any`, use const assertions, leverage type narrowing
- **React**: Function components only, hooks at top level, proper dependency arrays
- **React 19+**: Use ref as prop instead of `React.forwardRef`
- **Next.js**: Use `<Image>` component, App Router metadata API, prefer Server Components
- **Angular**: Use standalone components with signals
- **Loops**: Prefer `for...of` over `.forEach()` and indexed loops
- **Async**: Use `async/await` over promise chains

## Environment Variables

Projects may require a `GEMINI_API_KEY` in `.env.local` for AI features.
