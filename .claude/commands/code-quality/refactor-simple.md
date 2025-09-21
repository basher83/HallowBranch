---
description: Perform quick refactoring check for Next.js/Supabase code focusing on component complexity, TypeScript safety, and Next.js patterns
model: claude-opus-4-1-20250805
---

Quick refactoring check for Next.js/Supabase TypeScript code focusing on:

- Component complexity and decomposition
- TypeScript type safety and inference
- Next.js App Router patterns
- React best practices and hooks
- Supabase integration patterns

Scan for:

1. Components >50 lines that need decomposition
2. Large files that violate single responsibility
3. Missing or incorrect TypeScript types
4. Inefficient use of Next.js App Router patterns
5. Improper Server vs Client Component usage
6. Missing error boundaries and loading states
7. Inefficient Supabase queries or real-time subscriptions
8. shadcn/ui component misuse or duplication
9. Missing accessibility patterns
10. Inefficient re-renders or state management

Desired architecture:

- Proper Server/Client Component boundaries
- Single responsibility principle
- TypeScript strict type safety
- Next.js App Router best practices
- React performance patterns
- Supabase integration patterns

For each issue found, provide:

- Location (file path and line numbers)
- Why it's a problem (performance, maintainability, type safety)
- Specific fix with TypeScript/React code example
- Implementation priority (high/medium/low)
- Estimated time to fix (<15min, 15-30min, 30-60min)

Focus on actionable items that improve code quality, performance, or maintainability.

Repository-Specific Context:

- Next.js 15 App Router structure
- TypeScript with strict mode
- Supabase client integration via SassClient pattern
- shadcn/ui component library usage
- Tailwind CSS styling patterns

Save a `refactor_plan.md` in the `PRPs/ai_docs/` folder with prioritized refactoring recommendations.
