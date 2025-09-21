---
description: Review all files in the staging area, both staged and unstaged changes
model: claude-sonnet-4-20250514
---

List and review any files in the staging area, both staged and unstaged in the Next.js/Supabase repository.
Ensure you look at both new files and modified files in the `nextjs/src/` directory.

Check the diff of each file to see what has changed.

Previous review report: $ARGUMENTS

May or may not be added, ignore the previous review if not specified.

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

8. **Documentation**
   - Clear README with setup instructions
   - CLAUDE.md is up to date with any new important utils, dependencies etc for future cluade code instances

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

## Test Coverage

Current: X% | Required: 80%
Missing tests: [list]
Save report to PRPs/code_reviews/review[#].md (check existing files first)
```
