# CLAUDE.md

This file provides comprehensive guidance to Claude Code when working with Next.js 15 applications with React 19 and TypeScript.

## Core Development Philosophy

### KISS (Keep It Simple, Silly)

Simplicity should be a key goal in design. Choose straightforward solutions over complex ones whenever possible. Simple solutions are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)

Avoid building functionality on speculation. Implement features only when they are needed, not when you anticipate they might be useful in the future.

### Design Principles

- **Single Responsibility**: Each function, class, and module should have one clear purpose
- **Dependency Inversion**: High-level modules should not depend on low-level modules. Both should depend on abstractions.
- **Open/Closed Principle**: Software entities should be open for extension but closed for modification.
- **Vertical Slice Architecture**: Organize by features, not layers
- **Component-First**: Build with reusable, composable components with single responsibility
- **Fail Fast**: Validate inputs early, throw errors immediately
- **Performance by Default**: With React 19's compiler, focus on clean code and let the compiler handle optimizations

## 🤖 AI Assistant Guidelines

### Context Awareness

- When implementing features, always check existing patterns first
- Prefer composition over inheritance in all designs
- Use existing utilities before creating new ones
- Check for similar functionality in other domains/features

### Common Pitfalls to Avoid

- Creating duplicate functionality
- Overwriting existing tests
- Modifying core frameworks without explicit instruction
- Adding dependencies without checking existing alternatives

### Workflow Patterns

- Preferably create tests BEFORE implementation (TDD)
- Use "think hard" for architecture decisions
- Break complex tasks into smaller, testable units
- Validate understanding before implementation

### Search Command Requirements

**CRITICAL**: Always use `rg` (ripgrep) and `fd` (fd-find) instead of traditional `grep` and `find` commands:

```bash
# ❌ Don't use grep for content search
grep -r "useState" src/

# ✅ Use rg instead - faster and respects .gitignore
rg "useState" src/

# ❌ Don't use find for file discovery
find . -name "*.tsx" -type f

# ✅ Use fd instead - faster with better defaults
fd "\.tsx$"

# ❌ Don't use grep for file listing
find . -name "*.tsx" | grep -v node_modules

# ✅ Use rg for file filtering - respects .gitignore
rg --files -g "*.tsx"

# ✅ Use fd for file discovery with ignore patterns
fd "\.tsx$" --exclude node_modules --exclude .next
```

**Enforcement Rules (Example Configuration):**

```javascript
// Example: Custom ESLint rules to enforce modern tooling
const searchCommandRules = [
  {
    pattern: /^grep\b(?!.*\|)/,
    message:
      "Use 'rg' (ripgrep) instead of 'grep' for better performance and features",
  },
  {
    pattern: /^find\s+\S+\s+-name\b/,
    message:
      "Use 'rg --files | rg pattern' or 'rg --files -g pattern' instead of 'find -name' for better performance",
  },
];
```

## 🧱 Code Structure & Modularity

### File and Component Limits

- **Never create a file longer than 500 lines of code.** If approaching this limit, refactor by splitting into modules or helper files.
- **Components should be under 200 lines** for better maintainability.
- **Functions should be short and focused sub 50 lines** and have a single responsibility.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.

## 🚀 Next.js 15 & React 19 Key Features

### Next.js 15 Core Features

- **Turbopack**: Fast bundler for development (stable)
- **App Router**: File-system based router with layouts and nested routing
- **Server Components**: React Server Components for performance
- **Server Actions**: Type-safe server functions
- **Parallel Routes**: Concurrent rendering of multiple pages
- **Intercepting Routes**: Modal-like experiences

### React 19 Features

- **React Compiler**: Eliminates need for `useMemo`, `useCallback`, and `React.memo`
- **Actions**: Handle async operations with built-in pending states
- **use() API**: Simplified data fetching and context consumption
- **Document Metadata**: Native support for SEO tags
- **Enhanced Suspense**: Better loading states and error boundaries

### TypeScript Integration

- **Use `ReactElement` instead of `JSX.Element`** for return types
- **Import types from 'react'** explicitly when needed
- **Use React types directly** - avoid JSX namespace

```typescript
// Recommended: Modern React 19 typing
import { ReactElement } from "react";

function MyComponent(): ReactElement {
  return <div>Content</div>;
}

// Avoid: Legacy JSX namespace
// function MyComponent(): JSX.Element { return <div>Content</div>; }
```

## 🏗️ Project Structure

### Repository Root Structure

```text
HallowBranch/
├── nextjs/              # Next.js application
├── supabase/            # Supabase configuration and migrations
│   ├── config.toml
│   └── migrations/
├── PRPs/                # Project Requirements & Planning
├── claude_md_files/     # AI assistant documentation
└── README.md
```

### Next.js App Structure (within nextjs/)

```text
nextjs/
├── public/               # Static assets
│   ├── terms/            # Legal documents
│   │   ├── privacy-notice.md
│   │   ├── refund-policy.md
│   │   └── terms-of-service.md
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    ├── app/              # Next.js App Router
    │   ├── api/          # API routes
    │   ├── globals.css   # Global styles
    │   ├── layout.tsx    # Root layout
    │   └── page.tsx      # Home page
    ├── components/       # Shared UI components
    │   ├── ui/           # Base components (shadcn/ui)
    │   └── [feature]/    # Feature-specific components
    ├── lib/              # Core utilities and configurations
    │   ├── supabase/     # Supabase client setup
    │   ├── utils.ts      # Utility functions
    │   └── types.ts      # TypeScript types
    └── middleware.ts     # Next.js middleware
```

## 🎯 TypeScript Configuration

### Recommended Compiler Options

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### TypeScript Best Practices

- **Avoid `any` type** - use `unknown` when type is truly unknown
- **Use explicit return types** for public APIs and complex functions
- **Leverage type inference** for simple functions and internal code
- **Fix type issues properly** rather than using `@ts-ignore`
- **Use branded types** for domain-specific values when needed

## 📦 Package Management & Dependencies

### Essential Next.js 15 Dependencies

```json
{
  "dependencies": {
    "next": "15.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.47.10",
    "@radix-ui/react-slot": "^1.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "15.1.3",
    "tailwindcss": "^3.4.1",
    "postcss": "^8"
  }
}
```

### Recommended Additional Dependencies

```bash
# Additional UI Components (as needed)
npm install @radix-ui/react-dialog @radix-ui/react-alert-dialog

# Form Handling and Validation (when needed)
npm install react-hook-form @hookform/resolvers zod

# Additional Icons (when needed)
npm install @radix-ui/react-icons

# Development Tools (when needed)
npm install -D @testing-library/react @testing-library/jest-dom
```

## 🛡️ Data Validation (Optional)

### Current Implementation

This project uses **Supabase** for backend data validation through:

- Database constraints and triggers
- Row Level Security (RLS) policies
- Built-in authentication validation
- PostgreSQL data types and constraints

### Optional Zod Integration (When Needed)

```typescript
import { z } from "zod";

// Optional: Install when needed
npm install zod react-hook-form @hookform/resolvers/zod

// Example form validation
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
});

type FormData = z.infer<typeof formSchema>;
```

### Environment Variables

```typescript
// Optional validation for sensitive env vars
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "PRIVATE_SUPABASE_SERVICE_KEY",
];

// Runtime check
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

## 🧪 Testing Strategy (Optional)

### Current State

This project currently has **no tests** implemented. For a production SaaS application, consider adding:

- **Component tests** for critical user interactions
- **Integration tests** for authentication flows
- **E2E tests** for key user journeys

### Optional Testing Setup

```typescript
// Optional: Add when ready to implement tests
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

### Testing Recommendations

- **Start with critical flows** - Auth, payments, data mutations
- **Use React Testing Library** for component behavior testing
- **Mock Supabase client** for isolated unit tests
- **Test user interactions** not implementation details
- **Consider Playwright** for E2E browser testing

## 🎨 Component Guidelines

### Current Component Patterns

The codebase follows clean, functional component patterns:

```typescript
// Clean, functional component (actual pattern used)
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = "medium", onClick, children, disabled = false }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
```

### Component Best Practices

- **Keep interfaces simple** - Define only necessary props
- **Use functional components** - Clean and straightforward
- **Focus on functionality** - Prioritize working code over extensive documentation
- **Consistent naming** - Use clear, descriptive prop names
- **TypeScript first** - Leverage TypeScript for type safety

### Shadcn/UI Component Pattern (RECOMMENDED)

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## 🔄 State Management

### State Management Approach

1. **Local State**: `useState` for component-specific state
2. **URL State**: Use search params for shareable state when needed
3. **Server State**: Use Supabase client for database operations
4. **Global State**: Context API for cross-component state when needed

### Simple Client Wrapper Pattern

```typescript
// lib/supabase/unified.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types";

export class SassClient {
  private client: SupabaseClient<Database>;
  private clientType: ClientType;

  constructor(client: SupabaseClient, clientType: ClientType) {
    this.client = client;
    this.clientType = clientType;
  }

  async loginEmail(email: string, password: string) {
    return this.client.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async getMyTodoList(page: number = 1, pageSize: number = 100) {
    return this.client
      .from("todo_list")
      .select("*")
      .range(page * pageSize - pageSize, page * pageSize - 1)
      .order("created_at");
  }
}
```

## 🔐 Security Implementation

### Current Security Approach

This project relies on **Supabase** for most security concerns:

- **Authentication**: Supabase Auth handles user authentication and sessions
- **Database Security**: Row Level Security (RLS) policies protect data access
- **File Storage**: Supabase Storage with RLS policies for file access
- **API Security**: Middleware handles route protection

### Environment Variables (Runtime Validation)

```typescript
// Runtime environment variable validation
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "PRIVATE_SUPABASE_SERVICE_KEY",
];

// Simple runtime check
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### Security Best Practices

- **Use Supabase Auth** for all authentication needs
- **Leverage RLS policies** for data access control
- **Store sensitive data** in Supabase, not client-side
- **Use HTTPS** in production environments
- **Keep dependencies updated** for security patches

## 🚀 Performance Guidelines

### Current Implementation

The project uses practical performance patterns:

- **Server Components** for static content (root layout)
- **Client Components** for interactive features (`"use client"`)
- **Minimal bundle** with essential dependencies only
- **Static asset optimization** through Supabase Storage

### Performance Best Practices

```typescript
// Current minimal Next.js config (appropriate for this project)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### Optional Optimizations (When Needed)

- **Image optimization**: Consider `next/image` for uploaded images
- **Dynamic imports**: Use for heavy components when bundle grows
- **Font optimization**: Use `next/font` when custom fonts are added
- **Bundle analysis**: Add when optimizing for production scale

### React 19 Actions API (Optional)

For form handling with built-in state management:

```typescript
// Optional: Modern React 19 Actions pattern
import { useActionState } from "react";

function ContactForm() {
  const [state, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      // Handle form submission with built-in pending state
      const email = formData.get("email");
      const message = formData.get("message");

      // Process the form
      await sendEmail({ email, message });
      return { success: true };
    },
    null
  );

  return (
    <form action={submitAction}>
      <button disabled={isPending}>{isPending ? "Sending..." : "Send"}</button>
    </form>
  );
}
```

## 💅 Code Style & Quality

### ESLint Configuration

```javascript
// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

## 📋 Development Commands

### Current Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Optional Additional Scripts (When Needed)

```bash
# Type checking
npm run tsc --noEmit

# Format checking
npm run prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}"

# Format files
npm run prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"

# Build and lint
npm run build && npm run lint
```

## ⚠️ IMPORTANT GUIDELINES

1. **Use proper TypeScript typing** - Avoid `any` type, use `unknown` when needed
2. **Handle component states** - Loading, error, and success states for user-facing features
3. **Keep components focused** - Under 200 lines when possible
4. **Use semantic HTML** - Proper accessibility attributes and structure
5. **Follow project patterns** - Consistent with existing codebase conventions
6. **Use Supabase for data operations** - Leverage built-in validation and security
7. **Handle errors gracefully** - For database operations and API calls
8. **Test critical functionality** - Before deploying to production

## 📋 Development Checklist

- [ ] TypeScript compiles with ZERO errors (`npx tsc --noEmit`)
- [ ] ESLint passes with ZERO warnings (`npm run lint`)
- [ ] Components handle loading, error, and success states
- [ ] Authentication and authorization work correctly
- [ ] Database operations use proper Supabase patterns
- [ ] No console.log statements in production code
- [ ] Environment variables are properly configured

### Best Practices

- **Leverage Supabase features** - Use built-in auth, storage, and database features
- **Implement proper loading states** - Show user feedback during async operations
- **Use consistent naming** - Follow established patterns in the codebase
- **Write self-documenting code** - Use clear variable and function names
- **Prefer composition over inheritance** - Use React's composition model for component design
- **Opt-in complexity** - Add complexity only when proven necessary, with clear justification
- **Keep it simple** - This is a template project, not an enterprise application

---

_This guide is optimized for Next.js 15 with React 19. Keep it updated as frameworks evolve._
_Focus on type safety, performance, and maintainability in all development decisions._
_Last updated: September 2024_
