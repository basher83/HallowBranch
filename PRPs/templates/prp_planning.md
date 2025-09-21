name: "Planning PRP Template - Next.js SaaS PRD Generation"
description: |
Optimized for planning Next.js/React/TypeScript features within the Supabase SaaS Template repository context.
Focuses on generating detailed PRDs with visual diagrams before implementation.

---

## Purpose

Generate comprehensive Product Requirements Documents (PRDs) with visual diagrams, turning rough ideas into detailed specifications ready for implementation within the Next.js Supabase SaaS Template repository.

## Philosophy

1. **Research First**: Gather context before planning
2. **Visual Thinking**: Use diagrams to clarify concepts
3. **Validation Built-in**: Include challenges and edge cases
4. **Implementation Ready**: Output feeds directly into other PRPs

## Initial Concept

$ARGUMENTS

## Planning Process

### Phase 1: Idea Expansion & Research

#### Context Gathering

```yaml
research_areas:
  market_analysis:
    - competitors: [Research similar solutions]
    - user_needs: [Identify pain points]
    - trends: [Current industry directions]

  technical_research:
    - existing_solutions: [How others solve this]
    - libraries: [Available tools/frameworks]
    - patterns: [Common implementation approaches]

  internal_context:
    - current_system: [How it works today]
    - constraints: [Technical/business limitations]
    - integration_points: [What it must work with]
```

#### Initial Exploration

```
RESEARCH similar solutions:
  - WEB_SEARCH: "{concept} Next.js implementation examples"
  - WEB_SEARCH: "{concept} React best practices"
  - WEB_SEARCH: "{concept} Supabase integration patterns"

ANALYZE existing repository:
  - FIND: Similar features in nextjs/src/app/
  - IDENTIFY: Existing component patterns in nextjs/src/components/
  - NOTE: Supabase integration patterns in nextjs/src/lib/supabase/
  - CHECK: Authentication flows in nextjs/src/app/auth/
  - REVIEW: UI patterns using shadcn/ui components
```

### Phase 2: PRD Structure Generation

#### 1. Executive Summary

```markdown
## Problem Statement

[Clear articulation of the problem being solved]

## Solution Overview

[High-level description of proposed solution]

## Success Metrics

- Metric 1: [Measurable outcome]
- Metric 2: [Measurable outcome]
- KPI: [Key performance indicator]
```

#### 2. User Stories & Scenarios

````markdown
## Primary User Flow

\```mermaid
graph LR
A[User Action] --> B{Decision Point}
B -->|Path 1| C[Outcome 1]
B -->|Path 2| D[Outcome 2]
D --> E[Final State]
C --> E
\```

## User Stories

1. **As a [user type]**, I want to [action] so that [benefit]
   - Acceptance Criteria:
     - [ ] Criterion 1
     - [ ] Criterion 2
   - Edge Cases:
     - [Edge case 1]
     - [Edge case 2]
````

#### 3. System Architecture (Next.js + Supabase)

````markdown
## High-Level Architecture

\```mermaid
graph TB
subgraph "Next.js Frontend"
UI[User Interface<br/>React Components]
Client[Client Components<br/>useState/Context]
Server[Server Components<br/>API Routes]
end

    subgraph "Supabase Backend"
        Auth[(Authentication<br/>Row Level Security)]
        DB[(PostgreSQL<br/>Database)]
        Storage[Storage Buckets]
        Edge[Edge Functions<br/>Optional]
    end

    subgraph "External"
        EXT[External APIs<br/>Optional]
    end

    UI --> Client
    UI --> Server
    Client --> Auth
    Server --> Auth
    Server --> DB
    Server --> Storage
    Server --> Edge
    Server --> EXT

\```

## Component Breakdown

- **Next.js Pages & Components**:

  - [Page Component]: [App Router page in nextjs/src/app/]
  - [Feature Component]: [Reusable component with shadcn/ui]

- **Supabase Integration**:

  - [SassClient Wrapper]: [Data operations using existing pattern]
  - [Auth Components]: [Authentication flows]
  - [Database Tables]: [PostgreSQL schema integration]

- **State Management**:
  - [Local State]: [useState for component state]
  - [Global State]: [Context API for shared state]
  - [Server State]: [Supabase real-time subscriptions]
````

#### 4. Technical Specifications (Next.js App Router)

````markdown
## Next.js App Router Implementation

\```mermaid
sequenceDiagram
participant U as User
participant B as Browser
participant S as Next.js Server
participant C as Client Component
participant DB as Supabase
participant E as External API

    U->>B: Navigate/Load Page
    B->>S: Request Page
    S->>DB: Server-side Data Fetch
    DB-->>S: Return Data
    S->>E: Server-side API Call (if needed)
    E-->>S: Response
    S-->>B: Rendered HTML + Client JS
    B->>C: Client-side Interaction
    C->>DB: Client-side Data Operations
    DB-->>C: Real-time Updates

\```

## Route Structure

- **Page Routes**: `nextjs/src/app/{feature}/page.tsx`
- **API Routes**: `nextjs/src/app/api/{resource}/route.ts`
- **Dynamic Routes**: `nextjs/src/app/{feature}/[id]/page.tsx`

## Data Operations

\```mermaid
flowchart TD
A[User Action] --> B{Component Type}
B -->|Server Component| C[Direct Supabase Call]
B -->|Client Component| D[SassClient Wrapper]
C --> E[Database Query]
D --> E
E --> F{Real-time}
F -->|Yes| G[Subscription]
F -->|No| H[One-time Query]
H --> I[Return Data]
G --> I
\```
````

#### 5. Implementation Strategy (Next.js Repository)

````markdown
## Development Phases

\```mermaid
graph LR
A[Planning] --> B[Core Implementation]
B --> C[Integration & Polish]
C --> D[Validation & Deploy]

    A -.- E[PRD Creation<br/>Architecture Design<br/>Component Planning]
    B -.- F[Next.js Pages<br/>React Components<br/>Supabase Integration]
    C -.- G[UI/UX Polish<br/>Authentication Flows<br/>Error Handling]
    D -.- H[Manual Testing<br/>Build Validation<br/>Documentation]

\```

## Implementation Priority (Repository-Specific)

1. **Planning**: Detailed PRD with Next.js architecture diagrams
2. **Core Implementation**: Basic functionality using existing patterns
3. **UI Integration**: Leverage shadcn/ui components and Tailwind styling
4. **Supabase Integration**: Authentication and data layer integration
5. **Validation**: Manual testing and build verification
6. **Documentation**: Update component patterns and usage examples
````

### Phase 3: Challenge & Validation

#### Devil's Advocate Analysis

```yaml
challenges:
  technical_risks:
    - risk: "Performance at scale"
      mitigation: "Implement caching layer"

    - risk: "Third-party API reliability"
      mitigation: "Build fallback mechanisms"

  business_risks:
    - risk: "User adoption"
      mitigation: "Phased rollout with feedback loops"

    - risk: "Scope creep"
      mitigation: "Strict MVP definition"

  edge_cases:
    - scenario: "No network connectivity"
      handling: "Offline mode with sync"

    - scenario: "Concurrent updates"
      handling: "Optimistic locking"
```

#### Success Criteria

```markdown
## Definition of Done

- [ ] All user stories implemented
- [ ] Test coverage > 80%
- [ ] Performance benchmarks met
- [ ] Security review passed
- [ ] Documentation complete

## Measurable Outcomes

- Metric 1: [Target value]
- Metric 2: [Target value]
- User satisfaction: [Target score]
```

### Phase 4: Validation & Output

#### Pre-Implementation Checklist

```
VALIDATE assumptions:
  - Technical feasibility confirmed
  - Resource availability verified
  - Dependencies identified
  - Risks documented with mitigations

REVIEW with stakeholders:
  - Business alignment confirmed
  - Technical approach approved
  - Timeline acceptable
  - Success metrics agreed
```

#### Output Format

The final PRD should be structured as:

1. **Executive Summary** (1 page)
2. **Detailed Requirements** (with diagrams)
3. **Technical Architecture** (with diagrams)
4. **Implementation Plan** (with timeline)
5. **Appendices** (research, alternatives considered)

### Validation Commands (Repository-Specific)

```bash
# Verify PRD completeness
grep -E "(TODO|TBD|FIXME)" generated_prd.md

# Check diagram syntax (Mermaid diagrams work in GitHub)
# Mermaid diagrams render automatically in GitHub and most markdown viewers

# Validate Next.js implementation readiness
cd nextjs && yarn lint                    # ESLint validation
cd nextjs && npx tsc --noEmit            # TypeScript validation
cd nextjs && yarn build                  # Build validation

# Check repository integration
cd nextjs && find src/components -name "*.tsx" | head -5  # Verify component patterns
cd nextjs && find src/lib -name "*.ts" | grep -i supabase # Verify Supabase patterns
```

## Anti-Patterns to Avoid

- ❌ Vague requirements without acceptance criteria
- ❌ Missing edge cases and error scenarios
- ❌ Diagrams that don't match the text
- ❌ Technical jargon without explanation
- ❌ Unrealistic timelines
- ❌ No success metrics

## Next.js-Specific Anti-Patterns

- ❌ Not considering Server vs Client Components
- ❌ Ignoring existing shadcn/ui component patterns
- ❌ Planning features that don't leverage Supabase integration
- ❌ Not accounting for Next.js App Router structure
- ❌ Overlooking authentication and authorization requirements

## Success Indicators

- ✅ Another developer could implement from this PRD alone
- ✅ All stakeholders understand the plan
- ✅ Risks are identified with mitigations
- ✅ Clear path from current state to desired state
- ✅ Diagrams clarify rather than confuse

## Template Usage Example (Next.js Context)

Input: "Add a todo list feature to our SaaS app"

Output would include:

- User flow diagrams for creating, editing, and managing todos
- Next.js architecture showing Server/Client Components usage
- Sequence diagrams for Supabase real-time updates
- Database schema integration with existing Supabase tables
- Next.js App Router structure for `/todos` pages
- Component specifications using existing shadcn/ui patterns
- Implementation phases leveraging SassClient wrapper
- Edge cases like offline usage, concurrent edits
- Success metrics like completion rate, user engagement

The resulting PRD becomes the `$ARGUMENTS` input for implementation PRPs like `prp_base_typescript.md`.
