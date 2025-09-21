---
Intended for Jira/GitHub tasks or other task management systems to break down and plan the implementation.
---

# Task Template v2 - Next.js Implementation with Validation Loops

> Concise, executable tasks with embedded context and validation commands for Next.js Supabase SaaS Template repository

## Format

```
[ACTION] path/to/file:
  - [OPERATION]: [DETAILS]
  - VALIDATE: [COMMAND]
  - IF_FAIL: [DEBUG_HINT]
```

## Actions keywords to use when creating tasks for concise and meaningful descriptions

- **READ**: Understand existing patterns
- **CREATE**: New file with specific content
- **UPDATE**: Modify existing file
- **DELETE**: Remove file/code
- **FIND**: Search for patterns
- **TEST**: Verify behavior
- **FIX**: Debug and repair

## Critical Context Section (Next.js Repository)

```yaml
# Include these BEFORE tasks when context is crucial
context:
  docs:
    - file: nextjs/src/components/ui/button.tsx
      focus: Component pattern structure
    - file: nextjs/src/lib/supabase/unified.ts
      focus: SassClient wrapper pattern

  patterns:
    - file: nextjs/src/lib/types.ts
      copy: TypeScript interface patterns
    - file: nextjs/src/app/auth/login/page.tsx
      copy: Authentication flow patterns

  gotchas:
    - issue: "Client Components need 'use client' directive"
      fix: "Add 'use client' at top of interactive components"
    - issue: "TypeScript errors with @/ imports"
      fix: "Check tsconfig.json path mappings"
    - issue: "Supabase client initialization"
      fix: "Use SassClient wrapper pattern from existing codebase"
```

## Task Examples with Validation

### Setup Tasks

```
READ nextjs/src/lib/types.ts:
  - UNDERSTAND: Current type definition structure
  - FIND: Database type patterns
  - NOTE: Uses Supabase generated types

READ nextjs/src/components/ui/button.tsx:
  - UNDERSTAND: Component pattern structure
  - FIND: Props interface patterns
  - NOTE: Uses shadcn/ui with TypeScript
```

### Implementation Tasks

````
UPDATE nextjs/src/lib/types/user.types.ts:
  - FIND: export interface Database {
  - ADD: users?: {
    Row: UserData
    Insert: UserInsert
    Update: UserUpdate
  }
  - VALIDATE: cd nextjs && npx tsc --noEmit
  - IF_FAIL: Check TypeScript errors and fix type definitions

CREATE nextjs/src/components/UserProfile.tsx:
  - COPY_PATTERN: nextjs/src/components/ui/button.tsx
  - IMPLEMENT:
   - [UserProfile component with proper TypeScript interfaces]
   - [Use existing shadcn/ui components for styling]
   - [Add 'use client' directive for interactivity]
  - VALIDATE: cd nextjs && yarn lint src/components/UserProfile.tsx

UPDATE nextjs/src/app/api/users/route.ts:
  - FIND: export async function GET(
  - ADD_AFTER:
    ```typescript
    import { SassClient } from '@/lib/supabase/unified'

    const sassClient = new SassClient()
    export async function POST(request: Request) {
      const { email, name } = await request.json()
      return sassClient.createUser(email, name)
    }
    ```
  - VALIDATE: cd nextjs && yarn build
````

## Validation Checkpoints (Next.js Repository)

```
CHECKPOINT syntax:
  - RUN: cd nextjs && yarn lint
  - FIX: Any reported ESLint issues
  - CONTINUE: Only when clean

CHECKPOINT types:
  - RUN: cd nextjs && npx tsc --noEmit
  - REQUIRE: No TypeScript errors
  - DEBUG: Check import paths and type definitions
  - CONTINUE: Only when types compile

CHECKPOINT build:
  - RUN: cd nextjs && yarn build
  - REQUIRE: Build succeeds without errors
  - DEBUG: Check for missing dependencies or import errors
  - CONTINUE: Only when build passes
```

## Debug Patterns (Next.js Repository)

```
DEBUG import_error:
  - CHECK: File exists at path
  - CHECK: Import path matches tsconfig.json paths
  - TRY: cd nextjs && npx tsc --noEmit
  - FIX: Check @/ alias paths or relative imports

DEBUG component_error:
  - RUN: cd nextjs && yarn dev
  - CHECK: Browser console for React errors
  - ADD: console.log("Debug: ", variable) for debugging
  - IDENTIFY: Component vs data vs styling issue
  - FIX: Check props, state, or component logic

DEBUG api_error:
  - CHECK: Development server running (cd nextjs && yarn dev)
  - TEST: curl http://localhost:3000/api/your-endpoint
  - READ: Terminal for Next.js error messages
  - FIX: Check API route implementation and Supabase connection
```

## Common Task examples (Next.js Repository)

### Add New Feature

```
1. READ existing similar component in nextjs/src/components/
2. CREATE new component file (COPY shadcn/ui pattern)
3. UPDATE page to use new component
4. VALIDATE TypeScript compilation
5. TEST in browser for functionality
6. FIX any linting issues
7. TEST responsive design
```

### Fix Bug

```
1. REPRODUCE bug in browser
2. READ relevant component code
3. ADD console.log for debugging
4. UPDATE component with fix
5. VALIDATE TypeScript still compiles
6. TEST fix resolves the issue
7. REMOVE debug console.logs
```

### Refactor Component

```
1. VALIDATE current build passes (baseline)
2. CREATE new component structure (keep old)
3. UPDATE one usage to new component
4. VALIDATE still builds and works
5. UPDATE remaining usages incrementally
6. DELETE old component
7. VALIDATE full build passes
```

## Tips for Effective Tasks (Next.js Repository)

- Use VALIDATE after every change
- Include IF_FAIL hints for common Next.js issues
- Reference specific component names or API routes
- Keep validation commands simple and fast (use yarn lint, npx tsc)
- Chain related tasks with clear dependencies
- Always include rollback/undo steps for risky changes
- Test in browser after component changes
- Verify TypeScript compilation before committing
- Use existing shadcn/ui patterns when possible
