---
description: Create a new task in the task management system
argument-hint: [Task category] [Task description]
---

# Create Task

Create a new task in the task management system by copying the template and filling out the details based on the provided context.

## Core Development Philosophy

When creating tasks, follow these principles to maintain simplicity and focus:

### KISS (Keep It Simple, Silly)

- **Simplicity First**: Choose straightforward solutions over complex ones whenever possible
- **Single Responsibility**: Each task should have one clear purpose and objective
- **Break Down Complexity**: If a task seems complex, break it into smaller, focused tasks
- **Clear Implementation**: Keep implementation steps concise and actionable

### YAGNI (You Aren't Gonna Need It)

- **Essential Only**: Implement features only when they are needed, not when you anticipate they might be useful
- **Avoid Speculation**: Don't add functionality "just in case" - wait until there's a clear requirement
- **MVP Focus**: For MVP projects, focus on core functionality that validates the hypothesis
- **Progressive Enhancement**: Add complexity only after proving simpler solutions won't work

## Process

### 1. Determine Task Details

- **Category**: @1
- **Description**: @2
- **ID**: Use a one up sequential number for the chosen category by reviewing current tasks in @tasks/INDEX.md
- **Priority**: Assign one of the following priority levels based on your assesment of the task's importance: P0 (critical), P1 (important), or P2 (nice-to-have)

### 2. Create Task File

Copy the template and create a new task file:

```bash
# Example: Create a new feature task
mkdir -p docs/project-management/tasks/features
cp template.md docs/project-management/tasks/features/FEAT-001-implement-user-auth.md
```

### 2.5. Verify Current State

- Check if dependencies already installed
- Verify component structure exists
- Confirm related functionality working
- Validate existing build passes

### 3. Fill Out Task Template

Edit the new task file with:

- **Task ID**: FEAT-001 (or appropriate category/ID)
- **Description**: Brief, specific description
- **Objective**: What needs to be accomplished and why (focus on essential functionality)
- **Prerequisites**: Any conditions that must be met first
- **Implementation Steps**: Detailed step-by-step instructions (keep simple and focused)
- **Success Criteria**: Measurable validation points (avoid over-engineering)
- **Validation**: Commands to verify completion (use existing tools when possible)
- **Dependencies**: Any task IDs this depends on

### 3.5. Document Scope Decisions

- Explicitly state what features are included/excluded and why
- Reference YAGNI decisions with rationale
- Note complexity trade-offs made
- Document assumptions about existing functionality

### 4. Update Task Tracker

Add the new task to `docs/project-management/tasks/INDEX.md`:

- Add to appropriate phase table
- Update task count and completion percentage
- Add to dependency graph if needed
- Update time estimates

### 4.5. Include Testing Matrix

- Browser compatibility checks
- Edge case scenarios
- Performance benchmarks
- Accessibility validation

### 4.7. Risk Analysis

- Potential breaking changes
- Rollback procedures
- Alternative implementation options
- Dependencies on existing functionality

## Task Categories

### DEV (Development)

- Environment setup and configuration
- Tool installation and dependencies
- Build system configuration
- Development workflow improvements

### FEAT (Features)

- New user-facing functionality
- API endpoints and integrations
- Database schema changes
- User interface components

### BUG (Bug Fixes)

- Critical functionality issues
- Performance problems
- Security vulnerabilities
- User experience problems

### DOCS (Documentation)

- API documentation
- User guides and tutorials
- Architecture decisions
- Implementation guides

### TEST (Testing)

- Unit test implementation
- Integration test setup
- Test coverage improvement
- Testing automation

### PERF (Performance)

- Load time optimization
- Memory usage reduction
- Database query optimization
- Bundle size reduction

### SEC (Security)

- Authentication improvements
- Authorization implementation
- Data validation enhancements
- Security audit fixes

### REFACTOR (Refactoring)

- Code organization improvements
- Architecture modernization
- Technical debt reduction
- Legacy code cleanup

## Best Practices

### Task Sizing & Complexity

- **Keep tasks small**: Aim for 1-4 hours of work per task (KISS principle)
- **Single responsibility**: Each task should have one clear objective
- **Break down complexity**: If a task exceeds 4 hours, split it into smaller tasks
- **MVP focus**: For learning/validation projects, prioritize essential functionality

### Implementation Guidance

- **Be specific**: Include concrete steps and validation criteria
- **Clear success criteria**: Define what "done" looks like
- **Include validation commands**: Specify exact commands to verify completion
- **Avoid over-engineering**: Don't add "nice-to-have" features to core tasks
- **Update dependencies**: Mark tasks as blocked by dependencies if needed

### Quality Assurance

- **Testable tasks**: Ensure each task can be validated independently
- **Clear validation**: Define specific commands or tests to verify completion
- **Documentation**: Include links to relevant docs or ADRs when needed
- **Progressive enhancement**: Add complexity only after basic functionality works

## KISS/YAGNI Task Creation Guidelines

### Decision Framework

Before creating a task, apply these principles:

1. **Essential vs. Nice-to-Have**: Is this functionality required for the current learning hypothesis or can it wait?
2. **Simple vs. Complex**: Can I achieve the objective with a straightforward solution?
3. **Existing Tools**: Can I use existing libraries/frameworks rather than building from scratch?
4. **Task Size**: Can this be completed in 1-4 hours, or should it be broken down?
5. **Current State**: What already exists that I can build upon or must avoid breaking?
6. **Scope Boundaries**: What specific functionality is included vs. excluded and why?

### Task Complexity Assessment

- **✅ Good Task**: "Implement basic user login with email/password"
- **❌ Over-Engineered**: "Implement enterprise SSO with OAuth, SAML, LDAP, and custom MFA"

### Scope Documentation Best Practices

When creating tasks, explicitly document:

**What's Included:**

- Core functionality that delivers immediate value
- Simple, proven solutions over complex alternatives
- Existing tools and libraries over custom implementations

**What's Excluded (with Rationale):**

- Features that violate YAGNI principle
- Complex solutions when simple ones exist
- Functionality that can be added later progressively
- Dependencies on unproven or unstable tools

**Risk Considerations:**

- Potential breaking changes to existing functionality
- Dependencies on specific versions or configurations
- Alternative approaches if primary implementation fails
- Rollback procedures for failed implementations

## Example Task Creation

For a typical web application feature:

```bash
# 1. Verify current state (new step 2.5)
cd nextjs
npm list next-auth  # Check if already installed
npm run build       # Ensure current build works

# 2. Create task file
cp docs/project-management/tasks/template.md docs/project-management/tasks/features/FEAT-001-implement-user-auth.md

# 3. Fill out with specific details including scope decisions
# Task: Implement user authentication system
# Priority: P0
# Implementation Steps:
# - Install next-auth dependency
# - Create auth configuration
# - Implement login/register forms
# - Add route protection
# - Test authentication flow
#
# Scope Decisions:
# ✅ Include: Basic email/password auth (essential for security)
# ✅ Include: Session management (required for app functionality)
# ❌ Exclude: OAuth providers (YAGNI - can add later)
# ❌ Exclude: Advanced RBAC (YAGNI - start with basic auth)
#
# Risk Analysis:
# - Risk: Breaking existing pages without auth
# - Mitigation: Implement protected routes last
# - Rollback: Remove auth config, revert route changes
#
# Validation: npm run build && npm test
```

## Enhanced Task Creation Process

### Complete Step-by-Step Workflow

1. **Determine Task Details** (Essential requirements)
2. **Verify Current State** (Pre-implementation checks)
3. **Create Task File** (Copy template)
4. **Fill Out Task Template** (Core content)
5. **Document Scope Decisions** (YAGNI/KISS rationale)
6. **Include Testing Matrix** (Comprehensive validation)
7. **Risk Analysis** (Potential issues and mitigations)
8. **Update Task Tracker** (Project management)

### Quality Assurance Checklist

Before finalizing any task:

- [ ] **Scope**: Applied YAGNI principle to exclude unnecessary features
- [ ] **Complexity**: Used KISS principle for simplest workable solution
- [ ] **Dependencies**: Verified current state and existing functionality
- [ ] **Risks**: Identified potential breaking changes and rollback plans
- [ ] **Testing**: Included comprehensive validation scenarios
- [ ] **Documentation**: Clearly documented what's included vs. excluded
- [ ] **Timeline**: Ensured 1-4 hour implementation time
- [ ] **Validation**: Specified exact commands to verify completion

### Common Pitfalls to Avoid

- **Over-engineering**: Don't add "nice-to-have" features to core tasks
- **Scope creep**: Stick to single responsibility per task
- **Assumption risks**: Always verify current state before planning
- **Testing gaps**: Include edge cases and error scenarios
- **Documentation debt**: Always explain scope decisions and trade-offs
