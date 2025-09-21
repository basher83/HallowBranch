---
description: Perform a comprehensive code review of the current changes or specified files
model: claude-sonnet-4-20250514
---

# Code Review

Please perform a comprehensive code review of the current changes or specified files in the Next.js/Supabase repository.

## Review Scope

$ARGUMENTS

## Review Process

1. **Understand Changes**
   - If reviewing staged changes: `git diff --staged`
   - If reviewing specific files: Read the specified files in `nextjs/src/`
   - If reviewing a PR: `gh pr view $ARGUMENTS --json files,additions,deletions`
   - If reviewing a local directory: `git diff $ARGUMENTS`
   - If reviewing the entire codebase: `git diff origin/main`

## Review Focus Areas

1. **TypeScript & Type Safety**

   - Proper TypeScript types and interfaces
   - No `any` types (use specific types)
   - Proper use of generic types
   - Type safety for props and state
   - Database types from Supabase schema

2. **Next.js App Router Patterns**

   - Proper Server vs Client Component usage
   - Correct use of Next.js 15 App Router patterns
   - Proper loading.tsx and error.tsx boundaries
   - Efficient data fetching (Server Components preferred)
   - Proper use of `useEffect` vs direct server-side rendering

3. **React Best Practices**

   - Component composition and reusability
   - Proper state management (local vs global)
   - Custom hooks for shared logic
   - Proper prop drilling vs Context API usage
   - Component lifecycle and side effects
   - Accessibility patterns (ARIA labels, keyboard navigation)

4. **Supabase Integration**

   - Proper use of SassClient wrapper pattern
   - Efficient database queries (avoiding N+1)
   - Real-time subscriptions properly managed
   - Row Level Security considerations
   - Error handling for database operations

5. **Performance & Optimization**

   - Server Components for static content
   - Proper image optimization with Next.js Image
   - Efficient re-renders (useMemo, useCallback)
   - Bundle size considerations
   - Database query optimization

6. **Security**

   - Environment variables properly configured
   - No hardcoded secrets or API keys
   - Proper authentication flow implementation
   - Input validation and sanitization
   - XSS prevention measures

7. **Code Organization**

   - Components follow single responsibility principle
   - Proper file and folder structure in `nextjs/src/`
   - shadcn/ui components used consistently
   - Utility functions properly organized
   - API routes follow RESTful patterns

8. **Linting & Validation**

   - ESLint rules followed
   - TypeScript compilation without errors
   - Consistent code formatting (Prettier)
   - Import organization and unused imports

9. **Error Handling & User Experience**

   - Proper error boundaries in React
   - Loading states for async operations
   - User feedback for failed operations
   - Proper error messages and recovery flows

10. **Testing & Documentation**

    - Unit tests for components and utilities
    - Integration tests for API routes
    - Proper JSDoc comments for functions
    - README updates for new features
    - CLAUDE.md updates for new patterns

## Repository-Specific Patterns

### Next.js App Router Structure

```
nextjs/src/app/
├── [feature]/
│   ├── page.tsx          # Server Component (preferred)
│   ├── loading.tsx       # Loading UI
│   ├── error.tsx         # Error boundary
│   └── components/       # Feature-specific components
```

### Supabase Integration

- Use SassClient wrapper for all database operations
- Prefer Server Components for data fetching
- Real-time subscriptions only when necessary
- Proper TypeScript types from database schema

### Component Patterns

- shadcn/ui components as base for consistent UI
- Custom components in `components/` directory
- Server Components for static content, Client Components for interactivity
- Proper TypeScript interfaces for all props

## Review Output

Create a concise review report with:

```markdown
# Code Review #[number]

## Summary

[2-3 sentence overview]

## Issues Found

### 🔴 Critical (Must Fix)

- [Issue with file:line and suggested fix]

### 🟡 Important (Should Fix)

- [Issue with file:line and suggested fix]

### 🟢 Minor (Consider)

- [Improvement suggestions]

## Good Practices

- [What was done well]

## Performance Impact

- [Bundle size, loading performance, database efficiency]

## Security Considerations

- [Authentication, data validation, environment variables]

## Accessibility

- [ARIA labels, keyboard navigation, screen reader support]

## Next.js Patterns

- [Server/Client Component usage, App Router patterns]

Save report to PRPs/code_reviews/review[#].md (check existing files first)
```

## Repository-Specific Commands

```bash
# Type checking
cd nextjs && npx tsc --noEmit

# Linting
cd nextjs && yarn lint

# Build validation
cd nextjs && yarn build

# Test patterns
cd nextjs && find src -name "*.test.*" -o -name "*.spec.*"
```
