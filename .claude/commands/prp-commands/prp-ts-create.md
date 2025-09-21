---
description: Create a Next.js/React/TypeScript PRP for feature implementation within the Supabase SaaS Template repository
model: claude-opus-4-1-20250805
---

# Create TypeScript PRP

## Feature: $ARGUMENTS

## PRP Creation Mission

Create a comprehensive Next.js/React/TypeScript PRP that enables **one-pass implementation success** through systematic research and context curation within the Supabase SaaS Template repository.

**Critical Understanding**: The executing AI agent only receives:

- Start by reading and understanding the prp concepts PRPs/README.md
- The PRP content you create
- Its training data knowledge
- Access to codebase files (but needs guidance on which ones)

**Therefore**: Your research and context curation directly determines implementation success. Incomplete context = implementation failure. Focus on Next.js App Router patterns, Supabase integration, and shadcn/ui component usage.

## Research Process

> During the research process, create clear tasks and spawn as many agents and subagents as needed using the batch tools. The deeper research we do here the better the PRP will be. we optminize for chance of success and not for speed.

1. **Next.js/Supabase Codebase Analysis in depth**

   - Create clear todos and spawn subagents to search the codebase for similar features/patterns Think hard and plan your approach
   - Identify all the necessary Next.js/React files to reference in the PRP (nextjs/src/components/, nextjs/src/app/, nextjs/src/lib/)
   - Note all existing Next.js/Supabase conventions to follow (SassClient pattern, shadcn/ui components, App Router structure)
   - Check existing component patterns in nextjs/src/components/ui/ and custom components
   - Analyze TypeScript interface definitions in nextjs/src/lib/types.ts and type usage patterns
   - Check existing validation approach (ESLint, TypeScript compilation, build validation)
   - Use the batch tools to spawn subagents to search the codebase for similar features/patterns

2. **Next.js/Supabase External Research at scale**

   - Create clear todos and spawn with instructions subagents to do deep research for similar features/patterns online and include urls to documentation and examples
   - Next.js documentation (include specific URLs for App Router, Server Components, API routes)
   - React documentation (include specific URLs for hooks, component patterns, TypeScript integration)
   - Supabase documentation (include specific URLs for client setup, auth, real-time subscriptions)
   - shadcn/ui documentation (include specific URLs for component usage and customization)
   - For critical pieces of documentation add a .md file to PRPs/ai_docs and reference it in the PRP with clear reasoning and instructions
   - Implementation examples (GitHub/StackOverflow/blogs) specific to Next.js/Supabase integration
   - Best practices and common pitfalls found during research (TypeScript compilation issues, React hydration, Next.js App Router gotchas, Supabase RLS patterns)
   - Use the batch tools to spawn subagents to search for similar features/patterns online and include urls to documentation and examples

3. **User Clarification**
   - Ask for clarification if you need it

## PRP Generation Process

### Step 1: Choose Template

Use `PRPs/templates/prp_base_typescript.md` as your template structure - it contains all necessary sections and formatting specific to Next.js/Supabase development within our repository.

### Step 2: Context Completeness Validation

Before writing, apply the **"No Prior Knowledge" test** from the template:
_"If someone knew nothing about this Next.js/Supabase codebase, would they have everything needed to implement this successfully? Do they know about SassClient patterns, shadcn/ui components, and Next.js App Router conventions?"_

### Step 3: Research Integration

Transform your research findings into the template sections:

**Goal Section**: Use research to define specific, measurable Feature Goal and concrete Deliverable (Next.js page, React component, Supabase integration, API route, etc.)
**Context Section**: Populate YAML structure with your research findings - specific Next.js/Supabase URLs, repository file patterns (nextjs/src/components/, nextjs/src/lib/supabase/), gotchas
**Implementation Tasks**: Create dependency-ordered tasks using information-dense keywords from Next.js/Supabase codebase analysis (types → components → pages → validation)
**Validation Gates**: Use repository-specific validation commands that you've verified work (`cd nextjs && yarn lint`, `cd nextjs && npx tsc --noEmit`, `cd nextjs && yarn build`)

### Step 4: TypeScript/React Information Density Standards

Ensure every reference is **specific and actionable** for Next.js/Supabase development:

- URLs include section anchors, not just domain names (Next.js App Router docs, Supabase client setup, shadcn/ui components)
- File references include specific repository patterns to follow (nextjs/src/lib/types.ts for interfaces, nextjs/src/components/ui/ for component patterns, nextjs/src/lib/supabase/unified.ts for SassClient pattern)
- Task specifications include exact Next.js/Supabase naming conventions and placement (PascalCase components, camelCase props, App Router structure in nextjs/src/app/, etc.)
- Validation commands are repository-specific and executable (`cd nextjs && yarn lint`, `cd nextjs && npx tsc --noEmit`, `cd nextjs && yarn build`)

### Step 5: ULTRATHINK Before Writing

After research completion, create comprehensive PRP writing plan using TodoWrite tool:

- Plan how to structure each template section with your Next.js/Supabase research findings
- Identify gaps that need additional Next.js/Supabase research
- Create systematic approach to filling template with actionable repository-specific context
- Consider Next.js App Router dependencies, Supabase integration patterns, and shadcn/ui component hierarchies

## Output

Save as: `PRPs/{feature-name}.md`

## TypeScript PRP Quality Gates

### Context Completeness Check

- [ ] Passes "No Prior Knowledge" test from repository template
- [ ] All YAML references are specific and accessible (Next.js/Supabase docs, shadcn/ui components, repository file examples)
- [ ] Implementation tasks include exact Next.js/Supabase naming and placement guidance
- [ ] Validation commands are repository-specific and verified working (`cd nextjs && yarn` commands)
- [ ] Next.js/Supabase integration patterns and component prop types are specified

### Template Structure Compliance

- [ ] All required repository template sections completed
- [ ] Goal section has specific Feature Goal, Deliverable, Success Definition
- [ ] Implementation Tasks follow Next.js dependency ordering (types → components → pages → validation)
- [ ] Final Validation Checklist includes repository-specific validation commands

### Next.js/Supabase Information Density Standards

- [ ] No generic references - all are specific to Next.js/Supabase patterns
- [ ] File patterns include specific repository examples to follow (nextjs/src/lib/types.ts, nextjs/src/components/ui/, nextjs/src/lib/supabase/unified.ts)
- [ ] URLs include section anchors for exact Next.js/Supabase/shadcn/ui guidance
- [ ] Task specifications use information-dense keywords from Next.js/Supabase codebase
- [ ] Component patterns specify Server vs Client component usage and shadcn/ui integration
- [ ] Supabase integration patterns are comprehensive and follow SassClient pattern

## Success Metrics

**Confidence Score**: Rate 1-10 for one-pass Next.js/Supabase implementation success likelihood

**Quality Standard**: Minimum 8/10 required before PRP approval

**Validation**: The completed PRP should enable an AI agent unfamiliar with the Next.js/Supabase codebase to implement the feature successfully using only the PRP content and codebase access, with full type safety, Next.js App Router best practices, and proper Supabase integration patterns.
