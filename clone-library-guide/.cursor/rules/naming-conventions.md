# File and Code Naming Conventions

## File Naming

### Components (React/TypeScript)
- **Format**: `kebab-case.tsx` or `kebab-case.ts`
- **Examples**:
  - ✅ `header.tsx`, `hero.tsx`, `feature-showcase.tsx`
  - ❌ `Header.tsx`, `Hero.tsx`, `FeatureShowcase.tsx`

### Layouts
- **Format**: `kebab-case-layout.tsx`
- **Examples**:
  - ✅ `main-layout.tsx`, `auth-layout.tsx`
  - ❌ `MainLayout.tsx`, `AuthLayout.tsx`

### Pages/Routes
- **Format**: `kebab-case.tsx`
- **Examples**:
  - ✅ `home.tsx`, `user-profile.tsx`
  - ❌ `Home.tsx`, `UserProfile.tsx`

### Hooks
- **Format**: `use-feature-name.ts`
- **Examples**:
  - ✅ `use-auth.ts`, `use-local-storage.ts`
  - ❌ `useAuth.ts`, `UseAuth.ts`

### Utilities
- **Format**: `kebab-case.ts`
- **Examples**:
  - ✅ `format-date.ts`, `api-client.ts`
  - ❌ `formatDate.ts`, `ApiClient.ts`

## Code Naming

### Components (Export Names)
- **Format**: `PascalCase`
- **Examples**:
  ```tsx
  // file: header.tsx
  export const Header: React.FC = () => { ... }
  
  // file: feature-showcase.tsx
  export const FeatureShowcase: React.FC = () => { ... }
  ```

### Functions & Variables
- **Regular functions/variables**: `camelCase`
  ```ts
  const userName = "John";
  function calculateTotal() { ... }
  ```

- **Constants**: `UPPER_SNAKE_CASE`
  ```ts
  const MAX_RETRIES = 3;
  const API_BASE_URL = "https://api.example.com";
  ```

- **React Hooks**: `use` + `PascalCase`
  ```ts
  // file: use-auth.ts
  export function useAuth() { ... }
  ```

### Types & Interfaces
- **Format**: `PascalCase`
- **Examples**:
  ```ts
  interface UserProfile { ... }
  type ButtonVariant = "primary" | "secondary";
  ```

## Why kebab-case for Files?

1. **URL-friendly**: Works well in routing systems
2. **Case-insensitive filesystems**: Avoids issues on Windows/macOS
3. **Consistency**: Aligns with web standards (CSS files, HTML attributes)
4. **Readability**: Easy to read and scan in file trees
5. **Industry standard**: Common in modern frameworks (Next.js App Router, etc.)

## Migration Checklist

When renaming files:
- [ ] Rename the file from PascalCase to kebab-case
- [ ] Update all imports in other files
- [ ] Keep component export name in PascalCase
- [ ] Test to ensure no broken imports





