---
description: Generate a comprehensive task list for Next.js/Supabase changes with repository-specific validation
model: claude-opus-4-1-20250805
---

# Create TASK PRP (Advanced)

Generate a comprehensive task list for focused changes with validation.

## Task: $ARGUMENTS

## Analysis Process

1. **Scope Definition**

   - Identify all affected files
   - Map dependencies
   - Check for side effects
   - Note test coverage

2. **Pattern Research**

   - Find similar changes in history
   - Identify conventions to follow
   - Check for helper functions
   - Review test patterns

3. **User Clarification**
   - Confirm change scope
   - Verify acceptance criteria
   - Check deployment considerations
   - Identify blockers

## PRP Generation

**READ**
Using TASK_PRP/PRPs/prp_task.md format:

### Context Section

```yaml
context:
  docs:
    - url: [API documentation]
      focus: [specific methods]

  patterns:
    - file: nextjs/src/components/ui/button.tsx
      copy: [component pattern to follow]

  gotchas:
    - issue: "Library requires X"
      fix: "Always do Y first"
```

### Task Structure

```
ACTION path/to/file:
  - OPERATION: [specific change]
  - VALIDATE: [test command]
  - IF_FAIL: [debug strategy]
  - ROLLBACK: [undo approach]
```

### Task Sequencing (Next.js Repository)

1. **Setup Tasks**: Prerequisites and analysis
2. **Core Changes**: TypeScript types, components, pages
3. **Integration**: Supabase connection and component integration
4. **Validation**: TypeScript compilation, ESLint, build validation
5. **Cleanup**: Remove debug code and temporary files

### Validation Strategy (Repository-Specific)

- TypeScript compilation check after each change
- ESLint validation after groups
- Build validation for integration checks
- Manual browser testing for functionality

## User Interaction Points

1. **Task Review**

   - Confirm task breakdown
   - Validate sequencing
   - Check completeness

2. **Risk Assessment**
   - Review potential impacts
   - Confirm rollback approach
   - Set success criteria

## Critical Elements (Next.js Repository)

- Include Next.js-specific debug patterns
- Add TypeScript compilation checks
- Note Supabase security considerations
- Document component integration assumptions
- Verify shadcn/ui component usage

## Output

Save as: `TASK_PRP/PRPs/{task-name}.md`

## Quality Checklist

- [ ] All changes identified
- [ ] Dependencies mapped
- [ ] Each task has validation
- [ ] Rollback steps included
- [ ] Debug strategies provided
- [ ] Performance impact noted
- [ ] Security checked
- [ ] No missing edge cases

Remember: Small, focused changes with immediate validation.
