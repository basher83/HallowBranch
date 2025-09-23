name: "Fix Dark Mode Issues in File Storage and Cookie Banner"
description: |
This PRP provides comprehensive guidance for fixing dark mode issues in the HallowBranch application, specifically targeting the file storage components and cookie consent banner that currently have hardcoded colors breaking the dark theme.

## **NOTE**: This PRP targets specific UI components with existing dark mode infrastructure in place.

## Goal

**Feature Goal**: Fix all hardcoded colors in file storage page and cookie banner to properly support dark mode using semantic design tokens

**Deliverable**: Updated React components with proper dark mode support using existing shadcn/ui patterns and semantic CSS variables

**Success Definition**: All components properly render in both light and dark modes with appropriate contrast ratios, no hardcoded colors, and consistent theming across the application

## User Persona (if applicable)

**Target User**: All authenticated users of HallowBranch application

**Use Case**: Users who prefer dark mode for reduced eye strain, especially during evening usage

**User Journey**: User toggles dark mode → All UI components including file upload area, file list, and cookie banner properly adapt to dark theme → Consistent visual experience

**Pain Points Addressed**:
- White backgrounds in file upload area cause eye strain in dark mode
- Cookie banner remains bright white at bottom of dark pages
- Inconsistent theming breaks immersion and user experience

## Why

- **Accessibility**: Proper dark mode support reduces eye strain and improves usability for users in low-light environments
- **Consistency**: Currently broken dark mode in specific components creates jarring visual inconsistencies
- **Professional Quality**: Complete dark mode support is expected in modern web applications
- **User Preference**: Respects user's system-wide theme preferences for better UX

## What

Fix dark mode rendering issues in:
1. File storage page upload area (white background)
2. File list items (white backgrounds and hardcoded colors)
3. Cookie consent banner (white background and hardcoded text colors)

### Success Criteria

- [ ] File upload area uses semantic `bg-card` instead of hardcoded `bg-white`
- [ ] File list items properly themed with semantic tokens
- [ ] Cookie banner adapts to dark mode using `bg-background` and proper text colors
- [ ] All interactive elements maintain proper contrast ratios (WCAG AA compliance)
- [ ] No visual regressions in light mode after changes
- [ ] Smooth theme transitions without flicker or layout shifts

## All Needed Context

### Context Completeness Check

_This PRP contains all file paths, line numbers, current code, and replacement code needed to implement dark mode fixes without prior knowledge of the codebase._

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://ui.shadcn.com/docs/dark-mode/next
  why: Official shadcn/ui dark mode implementation guide for Next.js
  critical: Shows proper ThemeProvider setup and semantic token usage patterns

- url: https://github.com/pacocoursey/next-themes#api
  why: next-themes library API documentation for theme management
  critical: Explains useTheme hook usage and hydration mismatch prevention

- url: https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  why: Tailwind CSS dark mode configuration and usage patterns
  critical: Shows dark: variant usage and CSS variable approach

- file: nextjs/src/components/ui/button.tsx
  why: Reference implementation showing proper semantic token usage
  pattern: Uses bg-primary, text-primary-foreground, hover states with semantic tokens
  gotcha: Already properly implements dark mode - use as reference pattern

- file: nextjs/src/app/globals.css
  why: Contains all available semantic CSS variables for theming
  pattern: Lines 280-343 define semantic tokens like --background, --foreground, --card
  gotcha: Dual system exists - legacy color tokens (lines 5-261) and modern semantic tokens

- file: nextjs/src/components/theme/theme-provider.tsx
  why: Existing ThemeProvider setup with next-themes
  pattern: Already configured with attribute="class" for Tailwind integration
  gotcha: Provider already handles theme persistence and FOUC prevention
```

### Current Codebase tree (relevant files only)

```bash
nextjs/
├── src/
│   ├── app/
│   │   ├── app/
│   │   │   └── storage/
│   │   │       └── page.tsx  # File storage page with hardcoded colors
│   │   ├── globals.css       # CSS variables and theme definitions
│   │   ├── layout.tsx        # Root layout with Cookies component
│   │   └── providers.tsx     # ThemeProvider setup
│   ├── components/
│   │   ├── Cookies.tsx       # Cookie banner with hardcoded colors
│   │   ├── theme/
│   │   │   ├── theme-provider.tsx  # next-themes provider
│   │   │   └── theme-toggle.tsx    # Theme switcher component
│   │   └── ui/
│   │       ├── button.tsx    # Properly themed button component
│   │       ├── card.tsx      # Properly themed card component
│   │       ├── input.tsx     # Properly themed input component
│   │       └── alert.tsx     # Properly themed alert component
│   └── lib/
│       └── utils.ts          # cn() utility for className merging
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
# No new files needed - only modifications to existing files:
nextjs/
├── src/
│   ├── app/
│   │   └── app/
│   │       └── storage/
│   │           └── page.tsx  # MODIFIED: Use semantic tokens instead of hardcoded colors
│   └── components/
│       └── Cookies.tsx       # MODIFIED: Use semantic tokens for dark mode support
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: next-themes requires hydration mismatch prevention
// Always check mounted state before rendering theme-dependent content
// Example: if (!mounted) return null;

// CRITICAL: Tailwind CSS dark mode uses 'selector' strategy
// Configured in tailwind.config.ts with darkMode: ['selector']
// Use dark: variants for conditional styling

// CRITICAL: Semantic tokens vs Legacy color system
// Use modern semantic tokens (bg-card, text-foreground) NOT legacy (bg-white, text-gray-600)
// Semantic tokens automatically adapt to theme changes

// CRITICAL: shadcn/ui components already support dark mode
// Import and use Button, Card, Input components instead of custom styled elements
// These components use semantic tokens internally

// CRITICAL: CSS variable naming convention
// All semantic tokens use -- prefix: --background, --foreground, --card
// Access via Tailwind classes: bg-background, text-foreground, bg-card
```

## Implementation Blueprint

### Data models and structure

No new data models needed - this is a pure UI theming fix using existing TypeScript interfaces and components.

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: FIX nextjs/src/app/app/storage/page.tsx upload area
  - LINE 198: Replace bg-white with bg-card
  - LINES 200-201: Replace border-primary-500 bg-primary-50 with border-primary bg-accent
  - LINES 200-201: Replace border-primary-600 hover:bg-primary-50 with border-input hover:bg-accent
  - ADD IMPORT: Import Button component from @/components/ui/button
  - ADD IMPORT: Import Input component from @/components/ui/input
  - VALIDATION: Ensure upload area properly themes in both light/dark modes

Task 2: FIX nextjs/src/app/app/storage/page.tsx file list
  - LINE 232: Replace text-gray-500 with text-muted-foreground
  - LINE 237: Replace bg-white with bg-card
  - LINE 240: Replace text-gray-400 with text-muted-foreground
  - LINES 244-267: Replace custom button elements with Button component
  - PATTERN: Use variant="ghost" size="icon" for action buttons
  - VALIDATION: Ensure file list items properly theme

Task 3: FIX nextjs/src/app/app/storage/page.tsx dialog elements
  - LINE 291: Replace custom input with Input component
  - LINE 295: Replace text-primary-600 hover:bg-primary-50 with text-primary hover:bg-accent
  - LINE 300: Replace bg-black text-white with bg-popover text-popover-foreground border border-border
  - VALIDATION: Ensure dialogs properly theme

Task 4: FIX nextjs/src/components/Cookies.tsx container
  - LINE 47: Replace bg-white with bg-background border-t with border-border
  - LINE 51: Replace text-blue-600 with text-primary
  - LINE 53: Replace text-gray-600 with text-foreground
  - LINE 57: Replace text-gray-500 with text-muted-foreground
  - VALIDATION: Ensure cookie banner background adapts to theme

Task 5: FIX nextjs/src/components/Cookies.tsx interactive elements
  - LINES 59, 63: Replace text-blue-600 hover:text-blue-700 with text-primary hover:text-primary/80
  - LINE 75: Remove custom colors from Decline button (let Button component handle)
  - LINE 82: Remove custom colors from Accept button (let Button component handle)
  - LINE 88: Replace hover:bg-gray-100 with hover:bg-accent
  - LINE 91: Replace text-gray-500 with text-muted-foreground
  - VALIDATION: Ensure all buttons and links properly theme
```

### Implementation Patterns & Key Details

```typescript
// PATTERN: File Upload Area Fix (storage/page.tsx line 198)
// BEFORE:
className={`w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border-2 cursor-pointer transition-colors ${
    isDragging
        ? 'border-primary-500 border-dashed bg-primary-50'
        : 'border-primary-600 hover:bg-primary-50'
}`}

// AFTER:
className={`w-full flex flex-col items-center px-4 py-6 bg-card rounded-lg shadow-lg tracking-wide border-2 cursor-pointer transition-colors ${
    isDragging
        ? 'border-primary border-dashed bg-accent'
        : 'border-input hover:bg-accent'
}`}

// PATTERN: Replace Custom Buttons with shadcn/ui Button (storage/page.tsx lines 244-267)
// BEFORE:
<button
    onClick={() => handleDownload(file.name)}
    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
    title="Download"
>
    <Download className="h-5 w-5"/>
</button>

// AFTER:
<Button
    variant="ghost"
    size="icon"
    onClick={() => handleDownload(file.name)}
    className="h-8 w-8"
    title="Download"
>
    <Download className="h-4 w-4"/>
</Button>

// PATTERN: Cookie Banner Container (Cookies.tsx line 47)
// BEFORE:
<div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 transform transition-transform duration-500 ease-in-out">

// AFTER:
<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 transform transition-transform duration-500 ease-in-out">

// PATTERN: Semantic Text Colors (Cookies.tsx)
// Replace all hardcoded grays with semantic tokens:
// text-gray-600 → text-foreground
// text-gray-500 → text-muted-foreground
// text-blue-600 → text-primary
```

### Integration Points

```yaml
IMPORTS_TO_ADD:
  storage/page.tsx:
    - import { Button } from '@/components/ui/button'
    - import { Input } from '@/components/ui/input'

CSS_VARIABLES_USED:
  from globals.css (lines 280-343):
    - bg-background: Main page background
    - bg-card: Card/container backgrounds
    - text-foreground: Primary text color
    - text-muted-foreground: Secondary text color
    - bg-accent: Hover states
    - border-input: Form element borders
    - border-border: General borders
    - text-primary: Primary brand color

THEME_SYSTEM:
  provider: nextjs/src/app/providers.tsx
  toggle: nextjs/src/components/theme/theme-toggle.tsx
  persistence: localStorage via next-themes
```

## Validation Loop (Simple Template Edition)

### Basic Validation (After Each Change)

```bash
# Navigate to Next.js directory
cd nextjs

# Run after each file modification - fix before proceeding
yarn lint                    # ESLint checks with TypeScript rules
npx tsc --noEmit            # TypeScript type checking

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Integration Validation (System Check)

```bash
# Development server validation
cd nextjs
yarn dev &
sleep 5  # Allow Next.js startup time

# Visual testing checklist:
# 1. Navigate to http://localhost:3001
# 2. Login to access app area
# 3. Toggle dark mode using theme switcher
# 4. Check /app/storage page - upload area should use dark background
# 5. Check file list items - should use dark backgrounds
# 6. Check cookie banner - should adapt to dark theme
# 7. Verify all text is readable with proper contrast
# 8. Switch back to light mode and verify no regressions

# Production build validation
yarn build
# Expected: Successful build with no TypeScript errors or warnings
```

### Manual Testing (Required for UI changes)

```bash
# Browser testing protocol:
# 1. Test in Chrome, Firefox, Safari
# 2. Toggle between light/dark/system modes
# 3. Verify no flash of unstyled content on page refresh
# 4. Check contrast ratios using browser DevTools
# 5. Test with system dark mode preference
# 6. Verify smooth transitions between themes
# 7. Check cookie banner appears correctly in both themes
# 8. Upload a file and verify UI remains properly themed
```

## Final Validation Checklist (Simple Template Edition)

### Technical Validation

- [ ] ESLint passes with zero warnings: `yarn lint`
- [ ] TypeScript compiles with zero errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `yarn build`
- [ ] No hydration mismatch errors in console

### Feature Validation

- [ ] File upload area properly themes in dark mode
- [ ] File list items use semantic colors
- [ ] Cookie banner adapts to theme changes
- [ ] All text maintains readable contrast ratios
- [ ] No hardcoded colors remain (no bg-white, text-gray-*, etc.)
- [ ] Theme transitions are smooth without flicker

### Code Quality Validation

- [ ] Uses existing shadcn/ui Button component instead of custom buttons
- [ ] Uses semantic tokens (bg-card, text-foreground) not hardcoded colors
- [ ] Follows existing component patterns from ui/ directory
- [ ] No console.log statements added
- [ ] Import statements properly added for Button and Input components

### Dark Mode Specific

- [ ] No white backgrounds in dark mode
- [ ] Proper contrast ratios (4.5:1 for normal text)
- [ ] Hover states visible in both themes
- [ ] Focus indicators properly themed
- [ ] No color meaning lost (errors still red, success still green)

### Accessibility

- [ ] WCAG AA contrast compliance in both themes
- [ ] Interactive elements maintain 3:1 contrast ratio
- [ ] Focus indicators visible in both themes
- [ ] Screen reader compatibility maintained

---

## Anti-Patterns to Avoid (Dark Mode Edition)

- ❌ Don't use hardcoded colors (bg-white, text-gray-600) - use semantic tokens
- ❌ Don't create new color variables - use existing semantic tokens
- ❌ Don't skip mounted state checks for theme-dependent rendering
- ❌ Don't override shadcn/ui component colors with inline styles
- ❌ Don't use legacy color tokens - use modern semantic variables
- ❌ Don't forget to test in production build for FOUC issues
- ❌ Don't ignore contrast ratio requirements for accessibility

## Confidence Score: 9/10

This PRP provides exact line numbers, current code, and replacement code for all dark mode fixes. The implementation is straightforward as it leverages existing infrastructure (next-themes, shadcn/ui, semantic tokens) already in place in the codebase.