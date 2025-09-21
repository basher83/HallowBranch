---
description: Perform a comprehensive review of the Next.js/React/TypeScript codebase within the Supabase SaaS Template repository
model: claude-opus-4-1-20250805
---

# Next.js/Supabase Codebase Review

Perform a comprehensive review of the Next.js/React/TypeScript codebase within the Supabase SaaS Template repository focusing on architecture, patterns, and best practices.

Review scope: $ARGUMENTS

If no specific scope provided, review the entire codebase.

## Review Process

1. **Codebase Analysis**

   - Analyze overall project structure and architecture
   - Review component organization and modularity
   - Check for consistency across the codebase
   - Identify technical debt and improvement opportunities

2. **Pattern Consistency**

   - Ensure consistent use of Next.js App Router patterns
   - Validate TypeScript usage across components and pages
   - Check for consistent component naming conventions
   - Review import/export patterns with @/ path aliases

3. **Performance Assessment**
   - Evaluate bundle size and optimization
   - Review Server vs Client Component usage
   - Check for unnecessary 'use client' directives
   - Assess Next.js Image optimization usage

## Review Focus Areas

### 1. **Architecture & Structure**

- Next.js App Router implementation
- Component organization (Server vs Client Components)
- Supabase integration patterns
- API routes organization
- Proper separation of concerns

### 2. **TypeScript Quality**

- Strict mode compliance across all files
- Type safety and explicit typing
- Interface definitions and exports
- Proper use of Supabase generated types
- Generic usage and constraints

### 3. **Next.js-Specific Patterns**

- Server vs Client Component usage patterns
- App Router conventions and structure
- Supabase client wrapper (SassClient) patterns
- shadcn/ui component integration consistency
- Environment variable management

### 4. **Performance & Optimization**

- Bundle analysis and optimization
- Next.js Image optimization implementation
- Code splitting and lazy loading
- Unnecessary 'use client' directive elimination
- Server Component usage effectiveness

### 5. **Security & Validation**

- Environment variable management
- Supabase Row Level Security implementation
- Input validation patterns
- API route security measures
- Supabase Auth integration consistency

### 6. **Code Quality Standards**

- Component size limits (reasonable React component sizes)
- Function complexity and length
- Code duplication assessment
- Error handling patterns for Supabase operations
- Logging and debugging practices

### 7. **Repository Standards**

- ESLint configuration and compliance
- Prettier formatting consistency
- TypeScript strict mode adherence
- Build process compliance
- Repository-specific patterns adherence

### 8. **Dependencies & Tooling**

- yarn usage compliance
- Dependency management
- Next.js build configuration
- Development tooling setup
- Supabase CLI integration

### 9. **Documentation & Maintenance**

- Code documentation quality
- README completeness
- Component prop documentation
- Supabase integration documentation
- CLAUDE.md updates

### 10. **Next.js Best Practices**

- Server vs Client Component usage
- App Router conventions adherence
- shadcn/ui component integration
- SassClient pattern usage
- Environment variable typing

## Analysis Commands (Repository-Specific)

Execute these commands to gather comprehensive data:

```bash
# Project structure analysis
cd nextjs && tree -I 'node_modules|.next|.git' -L 3

# TypeScript analysis
cd nextjs && npx tsc --noEmit --listFiles

# Bundle analysis
cd nextjs && yarn build && du -sh .next/

# Code quality metrics
cd nextjs && rg --stats "use client" --type tsx
cd nextjs && rg --stats "export interface" --type ts
cd nextjs && rg --stats "SassClient" --type ts

# ESLint check
cd nextjs && yarn lint

# Dependency analysis
cd nextjs && yarn list --depth=0
```

## Review Output

Create a comprehensive review report:

```markdown
# Next.js/Supabase Codebase Review #[number]

## Executive Summary

[High-level overview of codebase health, architecture quality, and key findings]

## Architecture Assessment

### 🏗️ Structure Quality: [Grade A-F]

- [Overall architecture assessment]
- [Component organization evaluation]
- [Next.js App Router implementation]
- [Supabase integration patterns]

### 📊 Metrics

- Total Components: X (Server: Y, Client: Z)
- Bundle Size: X MB (JS: Y MB, CSS: Z MB)
- Build Success Rate: X% (Target: 100%)
- TypeScript Compliance: X% strict mode

## Critical Findings

### 🔴 Architecture Issues (Must Fix)

- [Structural problems requiring immediate attention]
- [Performance bottlenecks]
- [Security vulnerabilities]

### 🟡 Pattern Inconsistencies (Should Fix)

- [Inconsistent implementations]
- [Suboptimal patterns]
- [Technical debt items]

### 🟢 Optimization Opportunities (Consider)

- [Performance improvements]
- [Code quality enhancements]
- [Maintainability improvements]

## Quality Assessment

### TypeScript Quality: [Grade A-F]

- Type safety compliance
- Interface definitions
- Strict mode adherence
- Generic usage patterns
- Supabase type integration

### Next.js Patterns: [Grade A-F]

- Server vs Client Component usage
- App Router conventions
- SassClient wrapper patterns
- shadcn/ui component integration

### Performance Score: [Grade A-F]

- Bundle optimization
- Next.js Image optimization
- Client Component efficiency
- Build performance

## Detailed Analysis

### Component Analysis

- [Component size distribution]
- [Server vs Client Component usage]
- [shadcn/ui component integration]
- [Reusability assessment]

### Security Review

- [Environment variable usage]
- [Supabase Row Level Security implementation]
- [API route security measures]
- [Authentication patterns]

### Validation Quality

- [Manual testing effectiveness]
- [Build validation assessment]
- [TypeScript compilation success]
- [ESLint compliance patterns]

## Recommendations

### Immediate Actions (Next Sprint)

1. [Priority fixes with specific file references]
2. [Critical performance improvements]
3. [Security enhancements]

### Medium-term Improvements (Next Month)

1. [Architecture improvements]
2. [Code quality enhancements]
3. [Testing improvements]

### Long-term Strategy (Next Quarter)

1. [Architectural evolution]
2. [Performance optimization strategy]
3. [Maintenance improvements]

## Best Practices Observed

- [Highlight excellent implementations]
- [Patterns worth replicating]
- [Quality code examples]

## Compliance Checklist

- [ ] `cd nextjs && npx tsc --noEmit` passes
- [ ] `cd nextjs && yarn lint` zero warnings
- [ ] `cd nextjs && yarn build` succeeds
- [ ] All components follow size best practices
- [ ] No `any` types in codebase
- [ ] Proper Server vs Client Component usage
- [ ] Environment variables properly typed
- [ ] Supabase types properly integrated
- [ ] shadcn/ui components used consistently
- [ ] SassClient pattern implemented correctly

## Metrics Dashboard
```

Code Quality Score: X/100
├── TypeScript Quality: X/25
├── Next.js Patterns: X/25
├── Supabase Integration: X/25
└── Repository Standards: X/25

Technical Debt: X hours estimated
Bundle Size: X MB (Target: <5MB for MVP)
Build Time: X seconds
Validation Success Rate: X% (Target: 100%)

```

## Next Review
Recommended review frequency: [Monthly/Quarterly]
Focus areas for next review: [Specific areas to monitor]
```

Save report to PRPs/code*reviews/nextjs_review*[YYYY-MM-DD].md
