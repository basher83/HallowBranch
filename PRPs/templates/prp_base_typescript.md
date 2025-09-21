name: "TypeScript PRP Template - Simple SaaS Template Edition"
description: |
This PRP template is designed for the Supabase Next.js SaaS Template - a simple, clean project for quick startup.
Focus on basic functionality and validation rather than enterprise-level complexity.

## **NOTE**: This is the template-specific version. For enterprise projects with extensive testing and tooling, use the full PRP template.

## Goal

**Feature Goal**: [Specific, measurable end state of what needs to be built]

**Deliverable**: [Concrete artifact - React component, API route, integration, etc.]

**Success Definition**: [How you'll know this is complete and working]

## User Persona (if applicable)

**Target User**: [Specific user type - developer, end user, admin, etc.]

**Use Case**: [Primary scenario when this feature will be used]

**User Journey**: [Step-by-step flow of how user interacts with this feature]

**Pain Points Addressed**: [Specific user frustrations this feature solves]

## Why

- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What

[User-visible behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable outcomes]

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: [Complete URL with section anchor]
  why: [Specific methods/concepts needed for implementation]
  critical: [Key insights that prevent common implementation errors]

- file: [exact/path/to/pattern/file.tsx]
  why: [Specific pattern to follow - component structure, hook usage, etc.]
  pattern: [Brief description of what pattern to extract]
  gotcha: [Known constraints or limitations to avoid]

- docfile: [PRPs/ai_docs/typescript_specific.md]
  why: [Custom documentation for complex TypeScript/Next.js patterns]
  section: [Specific section if document is large]
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash

```

### Desired Codebase tree with files to be added and responsibility of file

```bash

```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: [Library name] requires [specific setup]
// Example: Next.js 15 App Router - Route handlers must export named functions
// Example: 'use client' directive must be at top of file, affects entire component tree
// Example: Server Components can't use browser APIs or event handlers
// Example: We use TypeScript strict mode and require proper typing
```

## Implementation Blueprint

### Data models and structure

Create the core data models, we ensure type safety and consistency.

```typescript
Examples:
 - Zod schemas for validation
 - TypeScript interfaces/types
 - Database schema types
 - API response types
 - Component prop types

```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: CREATE lib/types/{domain}.types.ts
  - IMPLEMENT: TypeScript interfaces and types for domain models
  - FOLLOW pattern: lib/types.ts (interface structure, export patterns)
  - NAMING: PascalCase for interfaces, camelCase for properties
  - PLACEMENT: Type definitions in lib/types/

Task 2: CREATE components/{ComponentName}.tsx
  - IMPLEMENT: React component with proper TypeScript props interface
  - FOLLOW pattern: components/existing/ExistingComponent.tsx (component structure, props typing)
  - NAMING: PascalCase for components, camelCase for props
  - DEPENDENCIES: Import types from Task 1
  - PLACEMENT: Component layer in components/

Task 3: CREATE app/api/{resource}/route.ts
  - IMPLEMENT: Next.js API route handlers (GET, POST, etc.)
  - FOLLOW pattern: app/api/existing/route.ts (request/response handling, error patterns)
  - NAMING: Named exports (GET, POST, PUT, DELETE), proper TypeScript typing
  - DEPENDENCIES: Import types from Task 1
  - PLACEMENT: API routes in app/api/{resource}/

Task 4: CREATE app/{feature}/page.tsx
  - IMPLEMENT: Next.js page component using domain components
  - FOLLOW pattern: app/existing-page/page.tsx (page structure, metadata, error boundaries)
  - NAMING: Default export, proper metadata export, TypeScript page props
  - DEPENDENCIES: Import components from Task 2, types from Task 1
  - PLACEMENT: Page routes in app/{feature}/

Task 5: CREATE lib/{domain}Client.ts (Optional)
  - IMPLEMENT: Custom client wrapper for Supabase operations
  - FOLLOW pattern: lib/supabase/unified.ts (client structure, error handling)
  - NAMING: {Domain}Client class with proper TypeScript typing
  - DEPENDENCIES: Import types from Task 1
  - PLACEMENT: Client wrappers in lib/
```

### Implementation Patterns & Key Details

```typescript
// Show critical patterns and gotchas - keep concise, focus on non-obvious details

// Example: Component pattern
interface {Domain}Props {
  // PATTERN: Strict TypeScript interfaces (follow lib/types/existing.types.ts)
  data: {Domain}Data;
  onAction?: (id: string) => void;
}

export function {Domain}Component({ data, onAction }: {Domain}Props) {
  // PATTERN: Client/Server component patterns (check existing components)
  // GOTCHA: 'use client' needed for event handlers, useState, useEffect
  // CRITICAL: Server Components for data fetching, Client Components for interactivity

  return (
    // PATTERN: Consistent styling approach (see components/ui/)
    <div className="existing-class-pattern">
      {/* Follow existing component composition patterns */}
    </div>
  );
}

// Example: API route pattern
export async function GET(request: Request): Promise<Response> {
  // PATTERN: Request validation and error handling (see app/api/existing/route.ts)
  // GOTCHA: [TypeScript-specific constraint or Next.js requirement]
  // RETURN: Response object with proper TypeScript typing
}

// Example: Custom hook pattern
export function use{Domain}Action(): {Domain}ActionResult {
  // PATTERN: Hook structure with TypeScript generics (see hooks/useExisting.ts)
  // GOTCHA: [React hook rules and TypeScript typing requirements]
}
```

### Integration Points

```yaml
DATABASE:
  - migration: "Add table 'feature_data' with proper indexes"
  - client: "@/lib/database/client"
  - pattern: "createClient() for client components, createServerClient() for server components"

CONFIG:
  - add to: .env.local
  - pattern: "NEXT_PUBLIC_* for client-side env vars"
  - pattern: "FEATURE_TIMEOUT = process.env.FEATURE_TIMEOUT || '30000'"

ROUTES:
  - file structure: app/feature-name/page.tsx
  - api routes: app/api/feature-name/route.ts
  - middleware: middleware.ts (root level)
```

## Validation Loop (Simple Template Edition)

### Basic Validation (After Each Change)

```bash
# Run after each file creation - fix before proceeding
npm run lint                    # ESLint checks with TypeScript rules
npx tsc --noEmit               # TypeScript type checking (no JS output)

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Integration Validation (System Check)

```bash
# Development server validation
npm run dev &
sleep 5  # Allow Next.js startup time

# Basic functionality check
curl -I http://localhost:3000
# Expected: 200 OK response

# Production build validation
npm run build
# Expected: Successful build with no TypeScript errors or warnings

# Expected: Basic functionality working, proper responses, no build errors
```

### Manual Testing (Optional)

```bash
# Development server validation
npm run dev &
sleep 5  # Allow Next.js startup time

# Manual browser testing:
# 1. Navigate to http://localhost:3000
# 2. Test the new feature manually
# 3. Verify authentication flows work
# 4. Check responsive design
# 5. Test error handling

# Expected: Feature works as expected in browser
```

## Final Validation Checklist (Simple Template Edition)

### Technical Validation

- [ ] ESLint passes with zero warnings: `npm run lint`
- [ ] TypeScript compiles with zero errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`

### Feature Validation

- [ ] All success criteria from "What" section met
- [ ] Manual browser testing successful
- [ ] Error cases handled gracefully
- [ ] Integration points work as specified
- [ ] User persona requirements satisfied (if applicable)

### Code Quality Validation

- [ ] Follows existing TypeScript/React patterns and naming conventions
- [ ] File placement matches repository structure
- [ ] Uses existing component patterns (check components/ directory)
- [ ] Leverages Supabase patterns for data operations
- [ ] No console.log statements in production code

### Next.js Specific

- [ ] Server/Client component patterns followed correctly
- [ ] 'use client' directives used appropriately
- [ ] API routes follow Next.js App Router patterns
- [ ] No hydration mismatches between server/client rendering

### Template-Specific

- [ ] Uses SassClient pattern for Supabase operations
- [ ] Follows existing UI component patterns
- [ ] Integrates with existing authentication system
- [ ] Works with existing theme system

---

## Anti-Patterns to Avoid (Template Edition)

- ❌ Don't create new patterns when existing ones work (follow components/ patterns)
- ❌ Don't skip validation because "it should work" (run lint and build)
- ❌ Don't use 'use client' unnecessarily - embrace Server Components
- ❌ Don't hardcode values that should be config (use environment variables)
- ❌ Don't ignore TypeScript errors - fix them before committing
- ❌ Don't add complex dependencies without clear need (keep it simple)
- ❌ Don't break existing functionality when adding new features
