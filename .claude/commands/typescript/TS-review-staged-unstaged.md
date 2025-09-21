---
description: Review all staged and unstaged files with Next.js/React/TypeScript focus and Supabase integration best practices
model: claude-opus-4-1-20250805
---

List and review any files in the staging area, both staged and unstaged.
Ensure you look at both new files and modified files.

Check the diff of each file to see what has changed.

Previous review report: $ARGUMENTS

May or may not be added, ignore the previous review if not specified.

## Review Focus Areas

1. **TypeScript Code Quality**

   - Strict TypeScript usage with explicit types
   - No `any` types - use `unknown` if type is truly unknown
   - Proper type imports with `import type { }` syntax
   - Component props interfaces defined
   - Supabase generated types used properly
   - Following TypeScript strict mode compliance

2. **Next.js-Specific Patterns**

   - Proper Server vs Client Component usage ('use client' directives)
   - App Router conventions and file structure
   - React component patterns with shadcn/ui integration
   - Proper use of React props and TypeScript interfaces
   - SassClient wrapper pattern for Supabase operations
   - Environment variable typing with proper Next.js patterns

3. **Performance & Bundle Optimization**

   - No unnecessary 'use client' directives
   - Appropriate Server vs Client Component choices
   - Image optimization with Next.js Image component
   - Bundle size considerations
   - Build optimization and static generation

4. **Security & Validation**

   - Input validation with proper TypeScript types
   - Environment variables properly typed
   - Supabase Row Level Security implementation
   - No hardcoded secrets in client-side code
   - API route validation with proper error handling

5. **Supabase Integration**

   - SassClient wrapper pattern usage
   - Proper Supabase type integration
   - Authentication flow implementation
   - Database query optimization
   - Real-time subscription patterns

6. **Package Management**

   - Using yarn (repository standard)
   - Proper dependency management
   - No unused dependencies
   - Correct dev vs runtime dependencies

7. **Code Structure & Architecture**

   - Components follow reasonable size limits
   - Functions under 50 lines with single responsibility
   - Proper separation of concerns
   - Feature-based organization in App Router
   - Next.js best practices followed

8. **Repository Standards**

   - ESLint compliance with zero warnings
   - TypeScript strict mode compliance
   - Repository-specific patterns adherence
   - Component naming conventions
   - Import path consistency

9. **Build & Development**

   - `npx tsc --noEmit` passes with zero errors
   - ESLint compliance with zero warnings
   - Prettier formatting applied
   - Production build succeeds
   - No hydration mismatches

10. **Documentation & Maintenance**
    - Clear component interfaces
    - Proper prop descriptions
    - CLAUDE.md updates for new patterns/dependencies
    - README updates if needed

## Review Output

Create a concise review report with:

```markdown
# Next.js/Supabase Code Review #[number]

## Summary

[2-3 sentence overview focusing on Next.js/Supabase patterns and TypeScript quality]

## Issues Found

### 🔴 Critical (Must Fix)

- [Issue with file:line and suggested fix - focus on type safety, Supabase integration, Next.js patterns]

### 🟡 Important (Should Fix)

- [Issue with file:line and suggested fix - focus on performance, patterns]

### 🟢 Minor (Consider)

- [Improvement suggestions for optimization, maintainability]

## Good Practices

- [What was done well - highlight proper Next.js patterns, Supabase integration, TypeScript usage]

## Next.js/Supabase Findings

- [Server vs Client Component usage assessment]
- [Bundle size impact]
- [Supabase integration quality]
- [Performance optimizations]

## TypeScript Quality

- [Type safety assessment]
- [Strict mode compliance]
- [Interface definitions]
- [Supabase type integration]

## Validation Status

Current: X% | Target: 100%
Missing validation: [list with focus on build success and TypeScript compilation]

## Build Validation (Repository-Specific)

- [ ] `npx tsc --noEmit` passes
- [ ] `yarn lint` passes
- [ ] `yarn build` succeeds
- [ ] All validation commands pass
```

Save report to PRPs/code_reviews/review[#].md (check existing files first)
