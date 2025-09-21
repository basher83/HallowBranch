---
description: Execute a Next.js/Supabase PRP for complete feature implementation within the SaaS Template repository
model: claude-opus-4-1-20250805
---

# Execute TypeScript PRP

## PRP File: $ARGUMENTS

## Mission: One-Pass Next.js/Supabase Implementation Success

PRPs enable working Next.js/Supabase code on the first attempt through:

- **Context Completeness**: Everything needed, nothing guessed (SassClient patterns, shadcn/ui components, App Router structure)
- **Progressive Validation**: Repository-specific gates catch errors early
- **Pattern Consistency**: Follow existing Next.js/Supabase codebase approaches
- **Type Safety**: Leverage TypeScript's compile-time error detection with Supabase types
- Read PRPs/README.md to understand PRP concepts

**Your Goal**: Transform the PRP into working Next.js/Supabase code that passes all validation gates and maintains type safety within the SaaS Template repository.

## Execution Process

1. **Load PRP**

   - Read the specified TypeScript PRP file completely
   - Absorb all context, patterns, requirements and gather codebase intelligence
   - Use the provided documentation references and file patterns, consume the right documentation before the appropriate todo/task
   - Trust the PRP's context and guidance - it's designed for one-pass success within the Next.js/Supabase repository
   - If needed do additional codebase exploration and research as needed
   - Pay special attention to Next.js App Router structure (nextjs/src/app/), shadcn/ui components (nextjs/src/components/ui/), and SassClient patterns (nextjs/src/lib/supabase/unified.ts)

2. **ULTRATHINK & Plan**

   - Create comprehensive implementation plan following the PRP's task order
   - Break down into clear todos using TodoWrite tool
   - Use subagents for parallel work when beneficial (always create prp inspired prompts for subagents when used)
   - Follow the Next.js/Supabase patterns referenced in the PRP
   - Use specific file paths, interface names, component names, and type definitions from PRP context (nextjs/src/lib/types.ts, nextjs/src/components/ui/, nextjs/src/app/)
   - Never guess - always verify the repository patterns and examples referenced in the PRP yourself
   - Consider Next.js/Supabase compilation dependencies (types before components, components before pages, Supabase integration)

3. **Execute Implementation**

   - Follow the PRP's Implementation Tasks sequence, add more detail as needed, especially when using subagents
   - Use the Next.js/Supabase patterns and examples referenced in the PRP
   - Create files in locations specified by the repository structure (nextjs/src/lib/ for types, nextjs/src/components/ for components, nextjs/src/app/ for pages)
   - Apply TypeScript naming conventions from the repository patterns and existing codebase
   - Ensure proper TypeScript typing throughout (interfaces in nextjs/src/lib/types/, component props, Supabase return types)
   - Follow Next.js App Router patterns for file-based routing in nextjs/src/app/

4. **Progressive Validation**

   **Execute the repository-specific validation system from the PRP:**

   - **Level 1**: Run TypeScript syntax & style validation commands (`cd nextjs && yarn lint`, `cd nextjs && npx tsc --noEmit`)
   - **Level 2**: Execute integration validation commands from PRP (development server, build validation)
   - **Level 3**: Run manual testing validation (browser testing, functionality verification)
   - **Level 4**: Execute repository-specific validation from PRP (Next.js patterns, Supabase integration, component consistency)

   **Each level must pass before proceeding to the next.**

5. **Completion Verification**
   - Work through the Final Validation Checklist in the PRP
   - Verify all Success Criteria from the "What" section are met
   - Confirm all Anti-Patterns were avoided (especially Next.js/Supabase-specific ones)
   - Verify TypeScript compilation is successful with no errors (`cd nextjs && npx tsc --noEmit`)
   - Ensure proper Server/Client component separation with appropriate 'use client' directives
   - Verify Supabase integration follows SassClient pattern correctly
   - Ensure shadcn/ui components are used consistently where appropriate
   - Implementation is ready and working with full type safety

**Failure Protocol**: When validation fails, use the Next.js/Supabase patterns and gotchas from the PRP to fix issues, then re-run validation until passing. Pay special attention to:

- TypeScript compilation errors and Supabase type mismatches
- Next.js App Router specific requirements (file structure in nextjs/src/app/)
- Component prop interface violations and shadcn/ui component usage
- SassClient wrapper pattern implementation for Supabase operations
- Server vs Client Component separation with proper 'use client' directives
- Import path resolution issues with @/ aliases (check tsconfig.json paths)
