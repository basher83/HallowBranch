---
name: "Story PRP Template - Next.js Implementation Focus"
description: "Template for converting user stories into executable implementation tasks within the Next.js Supabase SaaS Template repository"
---

## Original Story

Paste in the original story shared by the user below:

```
[User story/task description from Jira/Linear/etc]
```

## Story Metadata

**Story Type**: [Feature/Bug/Enhancement/Refactor]
**Estimated Complexity**: [Low/Medium/High]
**Primary Systems Affected**: [List of main components/services]

---

## CONTEXT REFERENCES (Next.js Repository)

[Repository-specific documentation and patterns]

- nextjs/src/lib/types.ts - {Why this type definition is relevant}
- nextjs/src/components/ui/ - {Specific UI components to reuse}
- nextjs/src/lib/supabase/unified.ts - {Supabase integration patterns}
- nextjs/src/app/auth/ - {Authentication flow patterns}
- @/components/ui/button.tsx - {Component structure pattern to follow}
- @/lib/supabase/client.ts - {Supabase client setup pattern}

---

## IMPLEMENTATION TASKS

[Task blocks in dependency order - each block is atomic and testable]

### Concept For tasks

- We are using Information dense keywords to be specific and concise about implementation steps and details.
- The tasks have to be detailed and specific to ensure clarity and accuracy.
- The developer that will execute the tasks should be able to complete the task using only the context of this file, with references to relevant codebase paths and integration points.

### {ACTION} {target_file}:

- {VERB/KEYWORD}: {Specific implementation detail}
- {PATTERN}: {Existing pattern to follow from codebase}
- {IMPORTS}: {Required imports or dependencies}
- {GOTCHA}: {Known issues or constraints to avoid}
- **VALIDATE**: `{executable validation command}`

### Example Format:

### CREATE nextjs/src/lib/types/user.types.ts:

- IMPLEMENT: TypeScript interfaces for User data models
- PATTERN: Follow nextjs/src/lib/types.ts structure
- IMPORTS: from @/lib/types (extend existing Database type)
- GOTCHA: Use PascalCase for interfaces, camelCase for properties
- **VALIDATE**: `cd nextjs && npx tsc --noEmit`

### CREATE nextjs/src/components/UserProfile.tsx:

- IMPLEMENT: React component with TypeScript props interface
- PATTERN: Follow nextjs/src/components/ui/button.tsx structure
- IMPORTS: from @/components/ui/button; from @/lib/types/user.types
- GOTCHA: Use 'use client' directive for interactive components
- **VALIDATE**: `cd nextjs && yarn lint src/components/UserProfile.tsx`

### CREATE nextjs/src/app/api/users/route.ts:

- IMPLEMENT: Next.js API route handler for user operations
- PATTERN: Follow nextjs/src/app/api/auth/callback/route.ts structure
- IMPORTS: from @/lib/supabase/unified; from @/lib/types/user.types
- GOTCHA: Use named exports (GET, POST, PUT, DELETE) for API routes
- **VALIDATE**: `cd nextjs && yarn build`

---

## Validation Loop (Next.js Repository)

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
cd nextjs && yarn lint src/{new_files}                    # ESLint with TypeScript rules
cd nextjs && npx tsc --noEmit                            # TypeScript type checking

# Project-wide validation
cd nextjs && yarn lint                                    # ESLint on all files
cd nextjs && npx tsc --noEmit                           # TypeScript validation

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Integration Validation (Component Testing)

```bash
# Development server validation
cd nextjs && yarn dev &
sleep 5  # Allow Next.js startup time

# Basic functionality check
curl -I http://localhost:3000
# Expected: 200 OK response

# Build validation
cd nextjs && yarn build
# Expected: Successful build with no TypeScript errors or warnings

# Expected: All integrations working, proper responses, no build errors
```

### Level 3: Manual Testing (User Experience)

```bash
# Development server validation
cd nextjs && yarn dev &
sleep 5  # Allow Next.js startup time

# Manual browser testing checklist:
# 1. Navigate to http://localhost:3000
# 2. Test the new feature manually
# 3. Verify functionality works as expected
# 4. Check responsive design
# 5. Test error handling

# Component integration check
cd nextjs && find src/components -name "*.tsx" | head -5  # Verify component patterns
cd nextjs && find src/lib -name "*.ts" | grep -i supabase # Verify Supabase patterns

# Expected: Feature works as expected in browser with no console errors
```

### Level 4: Repository-Specific Validation

You can use available CLI tools and repository patterns for validation:

```bash
# Next.js specific validation
cd nextjs && yarn lint --fix                          # Auto-fix linting issues
cd nextjs && npx tsc --noEmit --strict               # Strict TypeScript checking

# Repository pattern validation
cd nextjs && grep -r "use client" src/components/     # Check Client Component usage
cd nextjs && grep -r "SassClient" src/               # Verify Supabase integration patterns

# Build optimization check
cd nextjs && yarn build && echo "✓ Build successful"
```

---

## COMPLETION CHECKLIST (Next.js Repository)

- [ ] All tasks completed
- [ ] Each task validation passed
- [ ] ESLint passes: `cd nextjs && yarn lint`
- [ ] TypeScript compiles: `cd nextjs && npx tsc --noEmit`
- [ ] Build succeeds: `cd nextjs && yarn build`
- [ ] Manual testing completed successfully
- [ ] Story acceptance criteria met
- [ ] No console errors in browser
- [ ] Follows existing repository patterns

---

## Notes (Next.js Repository Context)

[Any additional context, decisions made, or follow-up items]

### Repository-Specific Guidelines:

- Use existing shadcn/ui components from nextjs/src/components/ui/
- Follow SassClient pattern for Supabase operations
- Use 'use client' directive only when necessary for interactivity
- Follow Next.js App Router conventions for routing
- Import from @/ paths (configured in tsconfig.json)
- Ensure Server Components are used by default for better performance

---

## Next.js-Specific Anti-Patterns to Avoid

- ❌ Don't create new component patterns when shadcn/ui components exist
- ❌ Don't use 'use client' unnecessarily - embrace Server Components
- ❌ Don't skip basic validation (lint, build) because "it should work"
- ❌ Don't ignore existing TypeScript types - extend them properly
- ❌ Don't hardcode Supabase configuration - use environment variables
- ❌ Don't leave console.log statements in production code
- ❌ Don't create custom styling when Tailwind CSS is available
- ❌ Don't break existing functionality when adding new features
