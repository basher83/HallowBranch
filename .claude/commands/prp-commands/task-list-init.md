---
description: Create a comprehensive task list in PRPs/checklist.md for PRP implementation within the Next.js/Supabase repository
model: claude-opus-4-1-20250805
---

# Create Task List for PRP Implementation

## PRP Task: $ARGUMENTS

## Mission: Comprehensive Task Planning

Create a detailed task list in `PRPs/checklist.md` that enables successful PRP implementation through systematic planning and validation within the Next.js/Supabase repository.

**Process**: Ingest the information, dig deep into our Next.js/Supabase codebase and PRP context, then ULTRATHINK about the implementation plan.

## Analysis Phase

1. **Repository Context Analysis**

   - Analyze existing Next.js/Supabase patterns in the codebase
   - Identify relevant files in nextjs/src/components/, nextjs/src/lib/, nextjs/src/app/
   - Check existing TypeScript interfaces and component patterns
   - Review Supabase integration patterns (SassClient, authentication flows)

2. **PRP Requirements Breakdown**

   - Extract all requirements and success criteria from the PRP
   - Identify dependencies and implementation order
   - Map requirements to existing codebase patterns
   - Consider Next.js App Router structure requirements

3. **Risk Assessment**
   - Identify potential TypeScript compilation issues
   - Consider Supabase integration complexities
   - Evaluate component integration challenges
   - Assess validation and testing requirements

## Task List Generation

Generate comprehensive task list using information-dense keywords:

### Task Structure

- Use action keywords: ADD, CREATE, MODIFY, MIRROR, FIND, EXECUTE, KEEP, PRESERVE, etc.
- Mark completed tasks with: STATUS [DONE]
- Include specific file paths and patterns
- Add validation commands for each task
- Consider dependencies and execution order

### Repository-Specific Examples

```yaml
Task 1:
STATUS [ ]
READ nextjs/src/lib/types.ts:
  - UNDERSTAND: Existing TypeScript interface patterns
  - FIND: Database type definitions and Supabase integration patterns
  - NOTE: Follow existing type safety conventions

STATUS [ ]
CREATE nextjs/src/lib/types/feature.types.ts:
  - MIRROR pattern from: nextjs/src/lib/types.ts
  - ADD: Feature-specific TypeScript interfaces
  - ENSURE: Proper Supabase type integration
  - VALIDATE: cd nextjs && npx tsc --noEmit

STATUS [ ]
CREATE nextjs/src/components/FeatureComponent.tsx:
  - COPY_PATTERN: nextjs/src/components/ui/button.tsx
  - IMPLEMENT: Feature component with TypeScript props
  - ADD: 'use client' directive for interactivity
  - USE: Existing shadcn/ui components where applicable
  - VALIDATE: cd nextjs && yarn lint src/components/FeatureComponent.tsx

STATUS [ ]
UPDATE nextjs/src/app/feature/page.tsx:
  - FIND: Existing page structure
  - ADD: Feature page using new component
  - ENSURE: Proper Next.js App Router conventions
  - VALIDATE: cd nextjs && yarn build

Task N:
...
```

## Task List Standards

**Each task must include**:

- ✅ Specific file paths (nextjs/src/... format)
- ✅ Information-dense action keywords
- ✅ Validation commands using repository tools (`cd nextjs && yarn lint`, `cd nextjs && npx tsc --noEmit`)
- ✅ Dependencies and execution order considerations
- ✅ Repository-specific patterns (SassClient, shadcn/ui, App Router)

**Repository Context to Consider**:

- Next.js App Router structure in nextjs/src/app/
- shadcn/ui components in nextjs/src/components/ui/
- SassClient pattern in nextjs/src/lib/supabase/unified.ts
- TypeScript interfaces in nextjs/src/lib/types.ts
- Environment variable patterns and Supabase configuration

## Validation Approach

Each task should be validatable using our repository's available tools:

- TypeScript compilation: `cd nextjs && npx tsc --noEmit`
- ESLint validation: `cd nextjs && yarn lint`
- Build validation: `cd nextjs && yarn build`
- Manual testing through development server

## Output Format

Save comprehensive task list to `PRPs/checklist.md` with:

- Clear task ordering and dependencies
- Repository-specific file paths and patterns
- Executable validation commands
- Progress tracking with STATUS markers
- Implementation guidance and gotchas
