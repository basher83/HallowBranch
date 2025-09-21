name: "Next.js POC Template - Repository-Specific Edition"
description: |
Optimized for creating POCs within the existing Supabase Next.js SaaS Template.
Focuses on concept validation using existing repository patterns.
Leverages existing UI components and Supabase integration.
"Working over excellent" approach for rapid iteration within template constraints.

---

## Goal

**POC Goal**: [Specific concept to validate - e.g., "Interactive dashboard for data visualization"]

**Deliverable**: [Concrete React artifact - component, page, user flow, integration demo]

**Success Definition**: [How you'll know the concept is validated - e.g., "Stakeholders can navigate core workflow with realistic data"]

## POC Scope & Constraints

**Fidelity Level**: [Demo/MVP]

- **Demo**: Polished UI for stakeholder presentations
- **MVP**: Near-production quality for user testing

**Must Have**: [Core functionality that proves the concept]

- [ ] [Primary user interaction works]
- [ ] [Key data displays correctly with mock data]
- [ ] [Critical user flow is navigable]

**Nice to Have**: [Features that enhance but aren't critical]

- [ ] [Secondary interactions]
- [ ] [Enhanced visual polish]
- [ ] [Additional user personas/flows]

**Won't Have**: [Explicitly excluded to maintain focus]

- [ ] [Real API integration]
- [ ] [Complex error handling]
- [ ] [Performance optimization]
- [ ] [Comprehensive testing]

## Why

**Concept Validation Need**: [What hypothesis are you testing?]

**User Experience Question**: [What UX assumption needs validation?]

**Technical Feasibility**: [What technical approach needs proving?]

**Business Value**: [How does this POC drive decision making?]

## What

**Primary User Journey**: [Step-by-step core flow to demonstrate]

1. [User action/page load]
2. [User interaction with data/UI]
3. [System response/navigation]
4. [Outcome/completion state]

**Key Interactions**: [Critical user interactions that validate concept]

- [Interaction type]: [Expected behavior with mock data]
- [UI element]: [User feedback/system response]

**Visual Requirements**: [UI/UX needs for effective concept validation]

- [Layout/component requirements]
- [Data visualization needs]
- [Interactive element specifications]

### Success Criteria

- [ ] **Core Flow Complete**: Primary user journey works end-to-end with mock data
- [ ] **Key Interactions Functional**: Critical interactions demonstrate concept clearly
- [ ] **Stakeholder Ready**: POC can be demonstrated to decision makers
- [ ] **Concept Validation**: Hypothesis can be tested with realistic user interactions
- [ ] **Documentation Complete**: Assumptions, limitations, and next steps documented

## All Needed Context (POC-Optimized)

### Context Completeness Check

_For POC development: "Does this context enable building a working prototype that validates the core concept?"_

### Repository Technology Stack

```yaml
# Available Tech Stack (Repository-Specific)
framework: [Next.js 15 with React 19]
styling: [Tailwind CSS]
components: [shadcn/ui components]
typescript: [Basic TypeScript types (no strict mode)]
authentication: [Supabase Auth]
database: [Supabase PostgreSQL with RLS]
storage: [Supabase Storage Buckets]

# POC Constraints (Use Existing Patterns)
data_pattern: [Supabase client integration/SassClient wrapper]
state_management: [useState/Context API (existing patterns)]
routing: [Next.js App Router]
ui_components: [Existing shadcn/ui components in components/ui/]
```

### Data Strategy (Repository-Specific)

```yaml
# Primary Approach (Leverage Existing Infrastructure)
strategy: [Supabase integration/Static mock data/Hardcoded objects]
database: [Use existing Supabase setup for real data operations]
authentication: [Leverage existing Supabase Auth system]
storage: [Use existing Supabase Storage for file handling]

# POC Data Options
mock_data: [Hardcoded objects in components/Static JSON files]
real_data: [Use Supabase tables and existing data patterns]
auth_integration: [Use existing Supabase Auth components]
ui_patterns: [Follow existing component patterns in components/]
```

### Similar Examples & Patterns (If Available)

```yaml
# MUST READ - Include these in your context window
- file: [path/to/similar/component.tsx]
  why: [Component structure pattern to follow]
  adapt: [What to modify for POC scope]
  critical: [Key patterns that prevent common React errors]

- url: [React documentation URL with specific section]
  why: [Specific hooks/patterns needed for implementation]
  critical: [Best practices for rapid prototyping]

- example: [Link to similar POC or demo]
  why: [UI/UX pattern inspiration]
  adapt: [How to customize for your concept]
```

### Project Context & Constraints (Repository-Specific)

```yaml
# Development Environment (Existing Repository)
package_manager: [yarn]
build_tool: [Next.js 15]
dev_server: [3000]
directory_structure: [nextjs/src/app/ for pages, nextjs/src/components/ for components]

# POC Placement Convention
poc_directory: [nextjs/src/app/poc-{name}/ for pages]
component_pattern: [PascalCase for components (existing convention)]
ui_components: [Use existing shadcn/ui components in nextjs/src/components/ui/]
supabase_integration: [Use existing SassClient pattern in nextjs/src/lib/supabase/]
```

## Implementation Blueprint

### POC Architecture (Next.js App Router)

```
nextjs/src/app/poc-{name}/
├── page.tsx                    # Main POC page
├── components/                 # POC-specific components
│   ├── PocComponent.tsx        # Core POC component
│   └── PocLayout.tsx          # POC layout wrapper
├── lib/
│   └── pocData.ts             # POC data logic (mock or Supabase)
├── types/
│   └── poc.types.ts           # POC-specific types
└── README.md                  # POC documentation

# Use existing repository structure:
nextjs/src/components/ui/       # Existing shadcn/ui components
nextjs/src/lib/supabase/        # Existing Supabase integration
nextjs/src/lib/types.ts         # Existing type definitions
```

### Implementation Tasks

**Task 1: CREATE poc-{name} Next.js structure**

- SETUP: Next.js App Router structure in nextjs/src/app/poc-{name}/
- CONFIGURE: TypeScript types for POC domain
- INTEGRATE: Use existing Supabase patterns or create mock data
- FOLLOW: Existing component patterns from nextjs/src/components/
- DOCUMENT: POC scope and integration approach

**Task 2: CREATE POC types and data layer**

- IMPLEMENT: TypeScript interfaces in nextjs/src/lib/types/poc.types.ts
- DATA: Create mock data or use existing Supabase integration
- FOLLOW: Existing type patterns from nextjs/src/lib/types.ts
- INTEGRATE: Use SassClient pattern or create simple data layer

**Task 3: CREATE core POC components**

- IMPLEMENT: Main POC components using existing shadcn/ui
- FOLLOW: Existing component patterns from nextjs/src/components/
- STYLE: Use existing Tailwind CSS and component patterns
- PROPS: Proper TypeScript interfaces following repository conventions
- LAYOUT: Use existing layout patterns if needed

**Task 4: CREATE POC page and routing**

- IMPLEMENT: Main POC page in nextjs/src/app/poc-{name}/page.tsx
- CONNECT: Components with data layer (Supabase or mock)
- NAVIGATE: Use Next.js App Router patterns
- STATE: User interaction state management with existing patterns
- DEMO: Complete user flow within Next.js structure

**Task 5: ADD POC-specific components**

- IMPLEMENT: Feature-specific components in poc components directory
- INTEGRATE: With existing UI component library
- STYLE: Follow repository design patterns
- ACCESSIBILITY: Use existing component accessibility patterns

**Task 6: VALIDATE and document POC**

- VALIDATE: Manual testing of complete user flow
- INTEGRATE: Ensure POC works within existing app structure
- DOCUMENT: POC assumptions, limitations, and findings
- DEMO: Preparation notes for stakeholder presentations
- CLEANUP: Remove console.logs and ensure production-ready structure

## Validation Loop (Repository-Specific)

### Level 1: Basic Validation (Immediate Feedback)

```bash
# TypeScript and linting validation
cd nextjs && yarn lint                     # ESLint with Next.js/TS rules
npx tsc --noEmit                          # Type checking without build

# Build validation
cd nextjs && yarn build                   # Production build succeeds

# Expected: Zero TypeScript errors, successful build
```

### Level 2: Integration Validation (User Experience)

```bash
# Development server (from repository root)
cd nextjs && yarn dev &
sleep 5  # Allow Next.js startup time

# Manual validation checklist:
# ✓ POC loads without errors at http://localhost:3000/poc-{name}
# ✓ Primary user flow navigable
# ✓ Key interactions work with data (Supabase or mock)
# ✓ UI renders correctly using existing components
# ✓ Integration with existing authentication works
# ✓ No console errors in browser dev tools

# Basic functionality test
curl -I http://localhost:3000/poc-{name}
# Expected: 200 OK response
```

### Level 3: Concept Validation (Stakeholder & Business)

```bash
# Stakeholder demo preparation
# ✓ Demo script prepared with key talking points
# ✓ Data scenarios cover realistic use cases (Supabase or mock)
# ✓ Known limitations documented and communicated
# ✓ Integration with existing app structure verified
# ✓ Authentication flow works if required

# Documentation and next steps
# ✓ POC findings documented in README.md
# ✓ Integration points with existing codebase identified
# ✓ Follow-up implementation requirements defined
```

## Final Validation Checklist (Repository-Specific)

### Technical Completeness

- [ ] **TypeScript Integration**: All components properly typed with existing types
- [ ] **Next.js Patterns**: Follows App Router and existing component patterns
- [ ] **Build Process**: POC builds and runs without errors
- [ ] **Repository Integration**: Works within existing nextjs/ structure
- [ ] **Supabase Integration**: Uses existing auth and data patterns (if applicable)

### Feature Completeness

- [ ] **Primary User Flow**: Complete end-to-end journey works with data
- [ ] **Key Interactions**: Critical user interactions demonstrate concept
- [ ] **UI Consistency**: Uses existing shadcn/ui components appropriately
- [ ] **Data Layer**: Either uses Supabase integration or clear mock data
- [ ] **Error Handling**: Basic error handling prevents crashes

### Repository Integration

- [ ] **Concept Demonstrated**: Core hypothesis can be evaluated
- [ ] **Stakeholder Ready**: POC ready for decision-maker review
- [ ] **Limitations Clear**: Known constraints clearly documented
- [ ] **Next Steps Defined**: Integration requirements with existing codebase identified
- [ ] **Clean Structure**: POC doesn't break existing functionality

## POC Anti-Patterns (Repository-Specific)

### Implementation Anti-Patterns

- ❌ **Don't create new component patterns**: Use existing shadcn/ui components
- ❌ **Don't ignore existing TypeScript types**: Extend nextjs/src/lib/types.ts
- ❌ **Don't skip Next.js App Router patterns**: Follow existing routing structure
- ❌ **Don't implement custom auth**: Use existing Supabase Auth integration
- ❌ **Don't create custom styling**: Use existing Tailwind CSS setup
- ❌ **Don't add unnecessary dependencies**: Stick to existing package.json

### Process Anti-Patterns

- ❌ **Don't break existing functionality**: Ensure POC doesn't interfere with main app
- ❌ **Don't ignore repository structure**: Place POC in nextjs/src/app/poc-{name}/
- ❌ **Don't skip basic validation**: Always run yarn lint and yarn build
- ❌ **Don't leave console.logs**: Clean up before considering POC complete
- ❌ **Don't ignore mobile responsiveness**: Test on different screen sizes

### Repository-Specific DO Focus On

- ✅ **Use existing UI components**: Leverage shadcn/ui components in nextjs/src/components/ui/
- ✅ **Follow SassClient pattern**: Use existing Supabase integration patterns
- ✅ **Maintain Next.js structure**: Follow App Router conventions from existing pages
- ✅ **Integrate with existing auth**: Use Supabase Auth components if needed
- ✅ **Fast iteration within constraints**: Work within repository limitations
- ✅ **Document integration points**: Note how POC fits with existing codebase
- ✅ **Clean separation**: Keep POC functionality isolated from main app

## Repository-Specific POC Considerations

### Unique Identification

- **Naming Convention**: `poc-{feature}-{variant}` (e.g., poc-dashboard-minimal, poc-dashboard-advanced)
- **Directory Structure**: nextjs/src/app/poc-{name}/ for each POC
- **Git Strategy**: Feature branches or worktrees for parallel development
- **URL Structure**: Available at http://localhost:3000/poc-{name}/

### Repository Integration

- **Shared Resources**: Use existing components from nextjs/src/components/ui/
- **Common Patterns**: Follow existing Next.js App Router conventions
- **Supabase Integration**: Leverage existing SassClient wrapper patterns
- **Type Safety**: Extend existing types from nextjs/src/lib/types.ts

---

**Remember**: This template optimizes for **rapid concept validation within the existing Supabase Next.js repository**. The goal is to prove concepts quickly using existing patterns and infrastructure, while maintaining clean separation from the main application code.
