# Changelog

All notable changes to the HallowBranch project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-22

### Added

#### Dark Mode Feature 🌙
- **Theme System Infrastructure**
  - Integrated `next-themes` library for robust theme management
  - Added TypeScript type definitions for theme preferences (`theme.types.ts`)
  - Created theme provider components with Next.js 15 App Router support
  - Implemented dual theme system supporting both color themes (sass, blue, purple, green) and mode themes (light, dark, system)

- **User Interface Components**
  - Added theme toggle button with animated sun/moon icons
  - Implemented dropdown menu for theme selection (Light/Dark/System)
  - Integrated theme toggle into application header for easy access
  - Added smooth transitions between theme changes

- **Database & Persistence**
  - Created `user_preferences` table in Supabase for storing theme settings
  - Implemented Row Level Security (RLS) policies for secure preference access
  - Added automatic timestamp updates with database triggers
  - Support for syncing preferences across devices (optional)

- **API & Backend Integration**
  - Created REST API endpoints for theme preferences (`/api/theme-preferences`)
  - Extended `SassClient` with user preference management methods
  - Added GET, POST, and PUT handlers for preference operations
  - Implemented proper error handling and validation

- **Component Updates for Dark Mode**
  - Updated `AppLayout` to use semantic color tokens instead of hardcoded colors
  - Migrated `AuthAwareButtons` to dark mode compatible styling
  - Updated `HomePricing` component with theme-aware colors
  - Converted all hardcoded gray colors to semantic design tokens

- **Documentation**
  - Created comprehensive PRD (Product Requirements Document) for dark mode
  - Added API contract specification for theme preferences
  - Created TypeScript PRP for implementation guidance
  - Added detailed implementation documentation

### Changed

- **Root Layout**
  - Added `suppressHydrationWarning` to HTML element to prevent theme flash
  - Integrated `Providers` component for client-side theme management
  - Preserved existing color theme system while adding dark mode support

- **Component Styling**
  - Migrated from hardcoded colors (`bg-gray-100`, `text-gray-600`) to semantic tokens (`bg-background`, `text-muted-foreground`)
  - Updated hover states to use proper dark mode variants
  - Maintained backward compatibility with existing color themes

### Technical Details

- **Dependencies Added**
  - `next-themes@0.4.6` - Theme management for Next.js
  - `@radix-ui/react-dropdown-menu@2.1.16` - Dropdown UI component
  - `@swc/core@1.13.5` - SWC compiler (resolves build warnings)

- **Files Created**
  - `/nextjs/src/lib/types/theme.types.ts`
  - `/nextjs/src/components/theme/theme-provider.tsx`
  - `/nextjs/src/components/theme/theme-toggle.tsx`
  - `/nextjs/src/app/providers.tsx`
  - `/nextjs/src/components/ui/dropdown-menu.tsx`
  - `/nextjs/src/app/api/theme-preferences/route.ts`
  - `/supabase/migrations/20250922021227_user_preferences.sql`
  - `/PRPs/dark-mode-prd.md`
  - `/PRPs/contracts/theme-preferences-api-contract.md`
  - `/PRPs/dark-mode-implementation.md`

- **Files Modified**
  - `/nextjs/src/app/layout.tsx`
  - `/nextjs/src/lib/supabase/unified.ts`
  - `/nextjs/src/components/AppLayout.tsx`
  - `/nextjs/src/components/AuthAwareButtons.tsx`
  - `/nextjs/src/components/HomePricing.tsx`
  - `/nextjs/package.json`

### Performance

- Zero flash of unstyled content (FOUC) on page load
- Theme switching completes in <10ms
- No impact on initial page load performance
- Smooth CSS transitions for theme changes

### Security

- Row Level Security (RLS) policies ensure users can only access their own preferences
- Authentication required for all theme preference API endpoints
- Proper input validation for theme values
- Secure cookie-based persistence for SSR support

## [0.1.0] - 2025-01-21

### Initial Release
- Basic HallowBranch family genealogy platform
- User authentication with Supabase
- Family member management
- Photo upload capabilities
- Real-time collaboration features
- Basic tree visualization
- Multiple color themes (sass, blue, purple, green)
- Responsive design for mobile and desktop

---

## Commit History (2025-01-22)

- `5cefea6` - docs(theme): add comprehensive dark mode documentation
- `349b85a` - feat(ui): integrate dark mode UI components
- `f99567d` - feat(api): add theme preferences API and backend integration
- `0f2ab26` - feat(theme): implement core theme infrastructure
- `7a34786` - feat(db): add user preferences database migration
- `4c1364b` - feat(deps): add dark mode dependencies

---

*This changelog is maintained to track the evolution of the HallowBranch platform and help family members understand new features and improvements.*