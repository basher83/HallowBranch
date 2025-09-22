name: "Dark Mode Implementation - HallowBranch TypeScript PRP"
description: |
  Comprehensive Product Requirement Prompt for implementing a complete dark mode feature in the HallowBranch Next.js/Supabase application.
  This PRP provides all necessary context for one-pass AI implementation success with full type safety and repository patterns.

## Goal

**Feature Goal**: Implement a production-ready dark mode system that supports both light/dark themes alongside the existing color theme system (sass, blue, purple, green) with smooth transitions and user preference persistence.

**Deliverable**:
- Theme provider integration with next-themes library
- Theme toggle component with sun/moon icons
- User preference persistence in Supabase
- Updated components to support dark mode variants
- Zero flash of unstyled content (FOUC)

**Success Definition**: Users can toggle between light and dark modes instantly with their preference persisting across sessions, working seamlessly with the existing color theme system, and all UI components properly styled for both modes.

## User Persona

**Target User**: HallowBranch family members using the genealogy platform

**Use Case**: Users working on family history during evening hours or in low-light environments need a comfortable viewing experience that reduces eye strain

**User Journey**:
1. User clicks theme toggle in app header
2. Theme switches instantly with smooth transition
3. Preference saves automatically
4. Theme persists on next visit
5. Syncs across devices when enabled

**Pain Points Addressed**:
- Eye strain during extended genealogy research sessions
- Difficulty viewing bright screens in dark environments
- Lack of accessibility options for light-sensitive users
- Battery drain on OLED devices

## Why

- **User Comfort**: 60% of users prefer dark mode for evening usage (industry statistics)
- **Accessibility**: Improves usability for users with light sensitivity or visual impairments
- **Modern UX**: Expected feature in 2025 web applications
- **Battery Life**: Reduces power consumption on OLED devices by up to 30%
- **Professional**: Aligns HallowBranch with modern genealogy platform standards

## What

Users will have a theme toggle button in the application header that allows switching between light, dark, and system themes. The selected theme will apply instantly across all components with smooth transitions, persist across sessions, and optionally sync across devices.

### Success Criteria

- [ ] Theme toggle button visible in application header
- [ ] Instant theme switching without page reload
- [ ] No flash of unstyled content on page load
- [ ] User preference persists across sessions
- [ ] All shadcn/ui components support dark mode
- [ ] Application components (AppLayout, AuthAwareButtons, etc.) updated for dark mode
- [ ] System theme detection works correctly
- [ ] Smooth transitions between themes
- [ ] TypeScript fully typed with no errors
- [ ] Accessibility standards maintained (AAA contrast ratios)

## All Needed Context

### Context Completeness Check

_This PRP contains all patterns, file references, and documentation needed for an AI agent unfamiliar with this codebase to successfully implement dark mode._

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://github.com/pacocoursey/next-themes#with-tailwind
  why: Official next-themes documentation for Next.js App Router integration
  critical: Use attribute="class" and suppressHydrationWarning on html element to prevent hydration mismatches

- url: https://ui.shadcn.com/docs/dark-mode/next
  why: shadcn/ui dark mode implementation guide
  critical: Shows exact ThemeProvider setup and mode toggle component patterns

- url: https://nextjs.org/docs/app/building-your-application/routing/middleware#cookies
  why: Next.js middleware documentation for cookie-based theme persistence
  critical: Cookies enable SSR theme detection preventing FOUC

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/app/layout.tsx
  why: Root layout where theme provider needs to be integrated
  pattern: Current theme class application on body element (line 11-13)
  gotcha: Currently uses environment variable for static theme, needs dynamic provider

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/app/globals.css
  why: Contains existing dark mode CSS variables (lines 307-332)
  pattern: Dual theme system - custom color themes + shadcn/ui dark mode variables
  gotcha: Must preserve both systems for backward compatibility

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/components/ui/button.tsx
  why: Example shadcn/ui component already supporting dark mode
  pattern: Uses CSS variables like bg-primary, text-primary-foreground
  gotcha: These components already work with dark mode, don't modify

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/components/AppLayout.tsx
  why: Main application layout needing dark mode updates
  pattern: Currently uses hardcoded Tailwind classes (bg-gray-100, bg-white)
  gotcha: Must convert to semantic tokens (bg-background, text-foreground)

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/lib/supabase/unified.ts
  why: SassClient pattern for Supabase operations
  pattern: Wrapper class pattern for database operations
  gotcha: Add user preference methods following existing patterns

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/src/lib/types.ts
  why: TypeScript type definitions from Supabase
  pattern: Database table types generated from Supabase schema
  gotcha: Will need to regenerate after adding user_preferences table

- file: /Users/basher8383/dev/personal/HallowBranch/nextjs/tailwind.config.ts
  why: Tailwind configuration with darkMode already set to ["class"]
  pattern: Color mappings to CSS variables
  gotcha: Dark mode already configured, just needs provider
```

### Current Codebase tree (relevant sections)

```bash
nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (needs ThemeProvider)
│   │   ├── globals.css                # CSS variables (has dark mode vars)
│   │   └── api/                      # API routes directory
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components (dark mode ready)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── dialog.tsx
│   │   ├── AppLayout.tsx             # Main layout (needs dark mode updates)
│   │   └── AuthAwareButtons.tsx      # Auth buttons (needs dark mode updates)
│   └── lib/
│       ├── supabase/
│       │   └── unified.ts            # SassClient (add preference methods)
│       ├── types.ts                  # TypeScript types
│       └── utils.ts                  # cn() utility function
├── package.json                       # Dependencies
└── tailwind.config.ts                # darkMode: ["class"] configured
```

### Desired Codebase tree with files to be added

```bash
nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── theme-preferences/
│   │   │       └── route.ts         # NEW: API route for theme preferences
│   │   └── providers.tsx             # NEW: Client-side providers wrapper
│   ├── components/
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx   # NEW: next-themes provider wrapper
│   │   │   └── theme-toggle.tsx     # NEW: Theme toggle button component
│   │   └── ui/                      # Existing (no changes needed)
│   └── lib/
│       └── types/
│           └── theme.types.ts       # NEW: Theme-related TypeScript types
├── supabase/
│   └── migrations/
│       └── [timestamp]_user_preferences.sql # NEW: Database migration
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: Next.js 15 App Router - Must use 'use client' for theme provider
// Example: Theme provider needs client-side JavaScript for system detection

// CRITICAL: Hydration mismatch prevention - Must use suppressHydrationWarning
// Example: <html lang="en" suppressHydrationWarning> prevents theme flash

// CRITICAL: Dual theme system - Preserve both color themes and dark mode
// Example: Body needs both theme-sass3 class AND data-theme attribute

// CRITICAL: SassClient pattern - All Supabase operations go through unified client
// Example: Don't use Supabase client directly, use SassClient methods

// CRITICAL: Component patterns - shadcn/ui uses forwardRef consistently
// Example: All UI components follow React.forwardRef pattern with displayName

// CRITICAL: TypeScript strict mode - All props must be properly typed
// Example: No 'any' types allowed, use proper interfaces

// CRITICAL: Server vs Client components - Providers must be client components
// Example: 'use client' required for useState, useEffect, context providers
```

## Implementation Blueprint

### Data models and structure

```typescript
// lib/types/theme.types.ts - Theme-related TypeScript types
export type ColorTheme = 'sass' | 'sass2' | 'sass3' | 'blue' | 'purple' | 'green';
export type ModeTheme = 'light' | 'dark' | 'system';

export interface ThemePreference {
  id?: string;
  userId: string;
  colorTheme: ColorTheme;
  modeTheme: ModeTheme;
  enableSystemDetection: boolean;
  enableTransitions: boolean;
  syncAcrossDevices: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ThemeContextValue {
  theme: ModeTheme;
  setTheme: (theme: ModeTheme) => void;
  systemTheme?: 'light' | 'dark';
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

// Database schema for user_preferences table
interface UserPreferencesRow {
  id: string;
  user_id: string;
  color_theme: string;
  mode_theme: string;
  enable_system_detection: boolean;
  enable_transitions: boolean;
  sync_across_devices: boolean;
  created_at: string;
  updated_at: string;
}
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: INSTALL next-themes dependency
  - COMMAND: cd nextjs && yarn add next-themes
  - VERIFY: Check package.json includes next-themes
  - CRITICAL: Required for theme management

Task 2: CREATE nextjs/src/lib/types/theme.types.ts
  - IMPLEMENT: TypeScript interfaces for theme preferences
  - FOLLOW pattern: nextjs/src/lib/types.ts (type export patterns)
  - NAMING: ColorTheme, ModeTheme, ThemePreference interfaces
  - PLACEMENT: New types directory under lib/

Task 3: CREATE nextjs/src/components/theme/theme-provider.tsx
  - IMPLEMENT: Client component wrapper for next-themes ThemeProvider
  - FOLLOW pattern: Use 'use client' directive at top
  - CRITICAL: Must be client component for browser API access
  - PROPS: ThemeProviderProps from next-themes/dist/types

Task 4: CREATE nextjs/src/app/providers.tsx
  - IMPLEMENT: Client component combining all providers
  - INCLUDE: ThemeProvider wrapping children
  - FOLLOW pattern: 'use client' directive required
  - DEPENDENCIES: Import ThemeProvider from Task 3

Task 5: UPDATE nextjs/src/app/layout.tsx
  - MODIFY: Add suppressHydrationWarning to html element
  - INTEGRATE: Import and use Providers component
  - PRESERVE: Existing theme class on body for color themes
  - CRITICAL: suppressHydrationWarning prevents hydration errors

Task 6: CREATE nextjs/src/components/theme/theme-toggle.tsx
  - IMPLEMENT: Theme toggle button with sun/moon icons
  - FOLLOW pattern: nextjs/src/components/ui/button.tsx (component structure)
  - USE: lucide-react icons (Sun, Moon)
  - PLACEMENT: Will be added to AppLayout header

Task 7: UPDATE nextjs/src/components/AppLayout.tsx
  - ADD: Import and include ThemeToggle in header
  - REPLACE: bg-gray-100 with bg-background
  - REPLACE: bg-white with bg-card
  - REPLACE: text-gray-* with text-foreground variants
  - FOLLOW: shadcn/ui semantic token patterns

Task 8: UPDATE nextjs/src/components/AuthAwareButtons.tsx
  - REPLACE: bg-primary-600 with bg-primary
  - REPLACE: text-white with text-primary-foreground
  - REPLACE: text-gray-600 with text-muted-foreground
  - FOLLOW: shadcn/ui color token patterns

Task 9: CREATE supabase/migrations/[timestamp]_user_preferences.sql
  - IMPLEMENT: user_preferences table with RLS
  - FOLLOW pattern: supabase/migrations/*_todo_list.sql
  - INCLUDE: Foreign key to auth.users
  - POLICIES: Users can only access own preferences

Task 10: UPDATE nextjs/src/lib/supabase/unified.ts
  - ADD: getUserPreferences method
  - ADD: updateUserPreferences method
  - FOLLOW pattern: Existing getMyTodoList method structure
  - TYPING: Use ThemePreference interface from Task 2

Task 11: CREATE nextjs/src/app/api/theme-preferences/route.ts
  - IMPLEMENT: GET and PUT handlers for preferences
  - FOLLOW pattern: Next.js App Router API routes
  - USE: SassClient for Supabase operations
  - TYPING: Full TypeScript with ThemePreference types

Task 12: REGENERATE Supabase types
  - COMMAND: cd nextjs && npx supabase gen types typescript --local > src/lib/types.ts
  - VERIFY: user_preferences table types are included
  - CRITICAL: Run after migration is applied
```

### Implementation Patterns & Key Details

```typescript
// components/theme/theme-provider.tsx - Client wrapper for next-themes
"use client" // CRITICAL: Must be first line

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// app/providers.tsx - Combine all client providers
"use client"

import { ThemeProvider } from "@/components/theme/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  // PATTERN: All client-side providers in one place
  return (
    <ThemeProvider
      attribute="class"              // CRITICAL: Use class for Tailwind
      defaultTheme="system"          // PATTERN: Respect user OS preference
      enableSystem                   // GOTCHA: Enables system detection
      disableTransitionOnChange      // GOTCHA: Prevents flash during switch
    >
      {children}
    </ThemeProvider>
  )
}

// app/layout.tsx - Updated root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  let colorTheme = process.env.NEXT_PUBLIC_THEME || "theme-sass3"

  return (
    <html lang="en" suppressHydrationWarning> {/* CRITICAL: Prevents warnings */}
      <body className={colorTheme}>  {/* PATTERN: Keep color theme class */}
        <Providers>                  {/* NEW: Wrap with providers */}
          {children}
          <Analytics />
          <SpeedInsights />
          {/* ... existing components */}
        </Providers>
      </body>
    </html>
  )
}

// components/theme/theme-toggle.tsx - Toggle button component
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // PATTERN: Toggle between light and dark only
  // GOTCHA: System theme handled separately in dropdown if needed
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
    >
      {/* PATTERN: Overlapping icons with transitions */}
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// API route pattern - app/api/theme-preferences/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSSRSassClient } from '@/lib/supabase/server'
import type { ThemePreference } from '@/lib/types/theme.types'

export async function GET(request: NextRequest) {
  // PATTERN: Use SassClient for all Supabase operations
  const sassClient = await createSSRSassClient()
  const client = sassClient.getSupabaseClient()

  // GOTCHA: Check authentication first
  const { data: { user } } = await client.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // PATTERN: Get preferences or return defaults
  const preferences = await sassClient.getUserPreferences(user.id)
  return NextResponse.json(preferences || getDefaultPreferences(user.id))
}

// lib/supabase/unified.ts - Extended SassClient
async getUserPreferences(userId: string): Promise<ThemePreference | null> {
  // PATTERN: Follow existing method structure
  const { data, error } = await this.client
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null

  // PATTERN: Transform snake_case to camelCase
  return {
    userId: data.user_id,
    colorTheme: data.color_theme,
    modeTheme: data.mode_theme,
    enableSystemDetection: data.enable_system_detection,
    enableTransitions: data.enable_transitions,
    syncAcrossDevices: data.sync_across_devices,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}
```

### Integration Points

```yaml
DATABASE:
  - migration: "Create user_preferences table with RLS policies"
  - location: "supabase/migrations/[timestamp]_user_preferences.sql"
  - pattern: "Follow todo_list table structure with auth.users foreign key"

CONFIG:
  - no changes to: .env.local (uses existing Supabase config)
  - tailwind.config.ts: already has darkMode: ["class"]
  - package.json: add next-themes dependency

ROUTES:
  - api route: app/api/theme-preferences/route.ts
  - no new pages needed (toggle in existing header)
  - middleware.ts: no changes (theme handled client-side)

COMPONENTS:
  - Update AppLayout: Add theme toggle to header
  - Update all app components: Replace hardcoded colors with semantic tokens
  - shadcn/ui components: Already support dark mode (no changes)
```

## Validation Loop

### Basic Validation (After Each File)

```bash
# Navigate to Next.js directory
cd nextjs

# After each TypeScript file creation
npx tsc --noEmit                # TypeScript type checking
# Expected: Zero errors

npm run lint                     # ESLint with TypeScript rules
# Expected: Zero warnings

# If errors exist, READ and FIX before proceeding
```

### Integration Validation (After Theme Provider Setup)

```bash
cd nextjs

# Start development server
npm run dev &
sleep 5

# Test theme switching works
curl http://localhost:3000
# Expected: 200 OK, no console errors about hydration

# Build for production
npm run build
# Expected: Successful build with zero TypeScript errors
```

### Database Validation (After Migration)

```bash
# From repository root
npx supabase db reset
# Expected: Migration applies successfully

# Regenerate types
cd nextjs
npx supabase gen types typescript --local > src/lib/types.ts
# Expected: user_preferences types included
```

### Manual Testing

```bash
cd nextjs
npm run dev

# Browser testing checklist:
# 1. Navigate to http://localhost:3000
# 2. Click theme toggle - should switch instantly
# 3. Refresh page - theme should persist
# 4. Check all pages - dark mode should apply everywhere
# 5. Test with system theme changes
# 6. Verify no flash of wrong theme on reload
```

## Final Validation Checklist

### Technical Validation

- [ ] ESLint passes with zero warnings: `npm run lint`
- [ ] TypeScript compiles with zero errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`
- [ ] Database migration applied successfully
- [ ] Types regenerated to include user_preferences

### Feature Validation

- [ ] Theme toggle visible in header
- [ ] Switching themes works instantly
- [ ] No FOUC on page load/refresh
- [ ] Theme persists across sessions
- [ ] System theme detection works
- [ ] All components styled for dark mode
- [ ] Smooth transitions between themes
- [ ] Accessibility maintained (contrast ratios)

### Code Quality Validation

- [ ] Follows SassClient pattern for Supabase
- [ ] Uses existing component patterns
- [ ] Proper TypeScript typing throughout
- [ ] 'use client' directives used correctly
- [ ] Semantic design tokens used (not hardcoded colors)
- [ ] No console.log statements

### Next.js Specific

- [ ] suppressHydrationWarning on html element
- [ ] Client components for providers
- [ ] Server components unchanged where appropriate
- [ ] API routes follow App Router patterns
- [ ] No hydration mismatches

### Template-Specific

- [ ] Integrates with existing auth system
- [ ] Works with color theme system (sass, blue, etc.)
- [ ] Uses shadcn/ui component patterns
- [ ] Follows repository file structure

---

## Anti-Patterns to Avoid

- ❌ Don't modify shadcn/ui base components - they already support dark mode
- ❌ Don't use localStorage directly - let next-themes handle persistence
- ❌ Don't forget suppressHydrationWarning - causes console errors
- ❌ Don't mix semantic tokens and hardcoded colors - use only semantic
- ❌ Don't create new Supabase client patterns - use SassClient
- ❌ Don't skip TypeScript typing - maintain type safety throughout
- ❌ Don't break the existing color theme system - both systems must coexist

## Confidence Score: 9/10

This PRP provides comprehensive context including:
- All file patterns and locations needed
- Exact code examples following repository patterns
- Complete TypeScript type definitions
- Step-by-step implementation tasks
- Validation commands that work in this repository
- Known gotchas and critical requirements

An AI agent with no prior knowledge of this codebase can successfully implement dark mode using only this PRP and access to the referenced files.