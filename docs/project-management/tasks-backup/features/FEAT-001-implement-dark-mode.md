---
Task: Implement comprehensive dark mode system with hybrid theme support
Task ID: FEAT-001
Priority: P1
Estimated Time: 4 hours
Dependencies: None
Status: 🔄 Ready
Created: 2025-01-22
Updated: 2025-09-22
---

## Objective

Implement a sophisticated dark mode system that preserves existing color themes (sass, blue, purple, green) while adding interactive dark mode support. This creates a hybrid theme system where users can choose their preferred color theme AND toggle between light/dark variants, significantly enhancing user experience and accessibility.

## Prerequisites

- [ ] Access to project codebase with Razikus template
- [ ] Basic familiarity with Next.js, React, and CSS variables
- [ ] Understanding of existing shadcn/ui theme system

## Implementation Steps

### 1. **Install next-themes dependency**

Install the theme management library:

```bash
cd nextjs
npm install next-themes
```

### 2. **Create theme provider with hybrid support**

Create `src/lib/providers/theme-provider.tsx`:

```typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 3. **Update root layout with hybrid theme system**

Modify `src/app/layout.tsx` to include theme provider:

```typescript
import { ThemeProvider } from "@/lib/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. **Create theme toggle component**

Create `src/components/ui/theme-toggle.tsx`:

```typescript
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### 5. **Add toggle to AppLayout header**

Update `src/components/AppLayout.tsx` to include theme toggle:

```typescript
import { ThemeToggle } from "@/components/ui/theme-toggle";

// In the header section, add the theme toggle next to the user dropdown:
<div className="relative ml-auto flex items-center space-x-4">
  <ThemeToggle />

  <button
    onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
    className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
  >
    {/* existing user dropdown code */}
  </button>
</div>;
```

### 6. **Enhance CSS dark mode variables for all themes**

Update `src/app/globals.css` to include dark mode variants for each color theme:

```css
/* Sass theme dark mode */
.theme-sass.dark {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
  --color-primary-50: #1e1b4b;
  --color-primary-900: #fce7f3;
}

/* Blue theme dark mode */
.theme-blue.dark {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
}

/* Purple theme dark mode */
.theme-purple.dark {
  --color-background: #1a1625;
  --color-foreground: #f8fafc;
}

/* Green theme dark mode */
.theme-green.dark {
  --color-background: #0f1419;
  --color-foreground: #f8fafc;
}
```

### 7. **Create hybrid theme hook**

Create `src/lib/hooks/use-app-theme.ts`:

```typescript
import { useTheme } from "next-themes";

export const useAppTheme = () => {
  const { theme } = useTheme(); // light/dark
  const colorTheme = process.env.NEXT_PUBLIC_THEME || "sass"; // sass/blue/purple/green

  return {
    isDark: theme === "dark",
    colorTheme,
    combinedTheme: `theme-${colorTheme} ${theme === "dark" ? "dark" : ""}`,
  };
};
```

### 8. **Update components to use semantic classes**

Update `src/components/AppLayout.tsx` to use dark mode-aware classes:

```typescript
<div className="min-h-screen bg-background text-foreground">
  <div className="fixed inset-y-0 left-0 w-64 bg-card shadow-lg transform transition-transform duration-200 ease-in-out z-30">
    {/* Use semantic color classes instead of hardcoded grays */}
  </div>
</div>
```

### 9. **Test comprehensive implementation**

Start development server and verify hybrid theme functionality:

```bash
cd nextjs
npm run dev
```

## Success Criteria

- [ ] Dark mode toggle button appears in the header
- [ ] Clicking toggle switches between light and dark themes smoothly
- [ ] Existing color themes (sass, blue, purple, green) are preserved
- [ ] Each color theme has appropriate dark mode variants
- [ ] Theme preference persists across browser sessions
- [ ] System theme detection works (respects OS setting)
- [ ] No build errors or TypeScript errors
- [ ] Existing functionality remains unaffected
- [ ] Components use semantic color classes (bg-background, text-foreground, etc.)

## Validation

Test the implementation by running these commands:

```bash
cd nextjs
npm run build        # Ensure no build errors
npm run dev          # Start development server
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript types
```

Expected output:

- Build completes successfully without errors
- Development server starts on localhost:3000
- Dark mode toggle appears in the top-right header
- All color themes display correctly in both light and dark modes
- Theme switching works smoothly with transitions
- No console errors in browser developer tools
- All semantic color classes render correctly

## Notes

- **Hybrid Theme System**: This implementation preserves existing color themes while adding dark mode support
- **CSS Variables**: Leverages existing shadcn/ui dark mode variables plus custom theme-specific variants
- **Progressive Enhancement**: Dark mode is additive - existing functionality remains unchanged
- **Performance**: Theme switching uses CSS transitions for smooth user experience
- **Accessibility**: Toggle includes proper ARIA labels and keyboard support

## References

- [Dark Mode Implementation Strategy](../../tmp/dark-mode.md)
- [Next.js Themes Documentation](https://github.com/pacocoursey/next-themes)
- [shadcn/ui Dark Mode](https://ui.shadcn.com/docs/dark-mode)
- [CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
