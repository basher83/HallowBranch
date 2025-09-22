# Task Management System - HallowBranch Genealogy Platform

## Overview

This task management system tracks the development of HallowBranch, a private family genealogy platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase. It provides structured tracking for work items, dependencies, and progress across development phases.

## Purpose

The task system addresses several critical needs for the HallowBranch genealogy platform:

- **Visibility**: Clear understanding of development progress and current priorities
- **Dependencies**: Explicit tracking of task relationships and blockers
- **Prioritization**: P0/P1/P2 classification for feature development and bug fixes
- **Validation**: Success criteria and validation steps for genealogy features
- **Documentation**: Detailed implementation guidance for complex genealogy workflows
- **Privacy Focus**: Ensuring all development maintains the platform's privacy-first approach

## How to Use This System

### 1. Check Current Status

Review `INDEX.md` for:

- Overall project progress percentage
- Current phase and priorities
- Task dependencies and blockers
- Critical path for completion

### 2. Select a Task

Choose tasks marked as 🔄 Ready that match your expertise:

- **DEV** tasks: Development setup, tooling, dependencies
- **FEAT** tasks: New genealogy features and functionality
- **BUG** tasks: Bug fixes and issue resolution
- **DOCS** tasks: Documentation and guides
- **TEST** tasks: Testing implementation and coverage
- **PERF** tasks: Performance optimizations
- **SEC** tasks: Security improvements (privacy-focused)
- **REFACTOR** tasks: Code refactoring and improvements

### 3. Follow Task Structure

Each task file contains:

- Clear objective and success criteria
- Step-by-step implementation guide
- Validation commands specific to Next.js/React/Supabase stack
- Dependencies and prerequisites

## Directory Structure

```text
tasks/
├── README.md                   # Project-specific documentation (adapt this template)
├── INDEX.md                    # Active task tracker and progress dashboard
├── template.md                 # Task file template (customize for your tech stack)
├── [category-1]/               # Your first task category directory
│   └── [PREFIX]-XXX-*.md       # Task files using your prefixes
├── [category-2]/               # Your second task category directory
│   └── [PREFIX]-XXX-*.md       # Task files using your prefixes
└── [category-n]/               # Additional task categories as needed
    └── [PREFIX]-XXX-*.md       # Task files using your prefixes
```

## How to Use This System

### 1. Check Current Status

Review `INDEX.md` for:

- Overall project progress percentage
- Current phase and priorities
- Task dependencies and blockers
- Critical path for completion

### 2. Select a Task

Choose tasks marked as 🔄 Ready that match your expertise and project needs:

- **DEV** tasks: Development setup, tooling, dependencies
- **FEAT** tasks: New features and functionality
- **BUG** tasks: Bug fixes and issue resolution
- **DOCS** tasks: Documentation and guides
- **TEST** tasks: Testing implementation and coverage
- **PERF** tasks: Performance optimizations
- **SEC** tasks: Security improvements
- **REFACTOR** tasks: Code refactoring and improvements

### 3. Follow Task Structure

Each task file contains:

- Clear objective and success criteria
- Step-by-step implementation guide
- Validation commands specific to your tech stack
- Dependencies and prerequisites

## Task File Format

All task files follow the structure defined in [`template.md`](template.md).

See the template file for the exact format and all required sections. The template includes placeholders for project-specific validation commands.

## Status Indicators

- 🔄 **Ready**: Task can be started immediately
- ⏸️ **Blocked**: Waiting on dependencies to complete
- 🚧 **In Progress**: Currently being worked on
- ✅ **Complete**: Task finished and validated
- ❌ **Failed**: Task encountered issues, needs revision

## Priority Levels

- **P0 (Critical)**: Must complete for core functionality to work
- **P1 (Important)**: Significant functionality or improvement
- **P2 (Nice to Have)**: Optimization or enhancement

## HallowBranch Task Categories

### Development (DEV)

Tasks related to HallowBranch platform setup and tooling:

- Next.js/React development environment
- Supabase database configuration
- Authentication system setup
- Development tools and workflows

### Features (FEAT)

Tasks for implementing genealogy platform features:

- Family tree visualization components
- User authentication and profiles
- Data import/export functionality
- Real-time collaboration features
- Privacy controls and permissions

### Bug Fixes (BUG)

Tasks for resolving HallowBranch issues:

- UI/UX bugs in genealogy interface
- Authentication flow problems
- Database query issues
- Performance problems with family trees

### Documentation (DOCS)

Tasks for HallowBranch documentation:

- API documentation for genealogy features
- User guides for family tree management
- Privacy policy and terms documentation
- Developer setup and deployment guides

### Testing (TEST)

Tasks for HallowBranch testing infrastructure:

- Unit tests for React components
- Integration tests for genealogy workflows
- E2E tests for family tree operations
- Performance testing for large family trees

### Performance (PERF)

Tasks for HallowBranch optimization:

- Family tree rendering performance
- Database query optimization
- Bundle size reduction
- Memory usage optimization for large datasets

### Security (SEC)

Tasks for HallowBranch security improvements:

- User data privacy controls
- Authentication security enhancements
- Data validation and sanitization
- GDPR compliance features

### Refactoring (REFACTOR)

Tasks for HallowBranch code quality improvements:

- Component organization and reuse
- Database schema optimization
- State management improvements
- Legacy code modernization

## Creating New Tasks

### 1. Determine Task Category

Choose the most appropriate category for HallowBranch:

- **DEV**: Next.js/React setup, Supabase configuration, development tools
- **FEAT**: Genealogy features, family tree components, user authentication
- **BUG**: UI bugs, database issues, performance problems
- **DOCS**: API docs, user guides, privacy documentation
- **TEST**: Component tests, genealogy workflow tests, performance tests
- **PERF**: Family tree rendering, database query optimization, bundle size
- **SEC**: Privacy controls, authentication security, data validation
- **REFACTOR**: Component organization, state management, legacy code cleanup

### 2. Assign Task ID

Use sequential numbering with HallowBranch prefixes:

- DEV-001, DEV-002, etc.
- FEAT-001, FEAT-002, etc.
- BUG-001, BUG-002, etc.

### 3. Use the Template

Copy `template.md` and fill in all sections:

- Keep descriptions concise and actionable
- Include specific commands for Next.js/React/Supabase stack
- Define clear success criteria for genealogy features
- **IMPORTANT**: Run `date +"%Y-%m-%d"` to get current date for Created/Updated fields
- Update the "Updated" field whenever status changes
- Customize validation commands for npm/yarn, Supabase, and testing tools

### 4. Update INDEX.md

Add your task to the appropriate phase table and update:

- Task counts and time estimates
- Dependency graph if needed
- Overall completion percentage
- HallowBranch-specific phases and timelines

## Best Practices

### Task Sizing

- **Small** (1-2 hours): Single file changes, simple configurations
- **Medium** (3-4 hours): Multi-file changes, new features
- **Large** (5+ hours): Consider breaking into subtasks

### Dependencies

- List explicit task IDs that must complete first
- Use "None" for tasks that can start immediately
- Update blocked tasks when dependencies complete

### Validation

- Include specific commands to verify success for your tech stack
- Reference test files or build scripts
- Document expected output
- Customize validation for your specific tools (npm, yarn, docker, terraform, etc.)

### Documentation

- Link to relevant project documentation
- Reference external resources specific to your tech stack
- Include troubleshooting tips for your tools

## Workflow Example 1: Find and Execute Existing Task

```bash
# 1. Check current status
cat docs/project-management/tasks/INDEX.md | rg "Ready"

# 2. Select a task
cat docs/project-management/tasks/features/FEAT-001-*.md

# 3. Complete the work (Next.js/React/Supabase commands)
npm install new-package
npm run build
npm test

# 4. Validate completion
npm run lint
npm run test:coverage

# 5. Update task status in INDEX.md
# Change status from 🔄 Ready to ✅ Complete
```

## Workflow Example 2: Create New Task

```bash
# 1. Check current task count and next available ID
cat docs/project-management/tasks/INDEX.md | grep "Total Tasks"

# 2. Determine appropriate category and prefix (DEV, FEAT, BUG, etc.)
# Example: Creating a new genealogy feature task
mkdir -p docs/project-management/tasks/features

# 3. Copy template and create new task file
cp docs/project-management/tasks/template.md docs/project-management/tasks/features/FEAT-010-family-tree-search.md

# 4. Edit the new task file with HallowBranch-specific details
# - Update Task ID: FEAT-010
# - Add description and objective for genealogy feature
# - Fill in implementation steps for Next.js/React/Supabase
# - Add validation commands (npm run build, npm test)
# - Set dependencies (if any)
# - Run: date +"%Y-%m-%d" for Created/Updated dates

# 5. Update INDEX.md to include the new task
# - Add to appropriate phase table
# - Update task count and completion percentage
# - Update dependency graph if needed
# - Update time estimates
```

## Integration Points

This task system integrates with the HallowBranch genealogy platform:

- **Architecture Decisions**: Reference ADRs in `docs/decisions/`
- **Component Documentation**: Link to React component docs and guides
- **Database Schema**: Reference Supabase database documentation
- **API Documentation**: Link to Next.js API route documentation
- **Privacy Documentation**: Reference privacy policy and GDPR compliance docs

## Maintenance

- Review task status weekly
- Archive completed phases to `completed/` subdirectory
- Update time estimates based on actual completion
- Add lessons learned to task notes
- Customize categories as your project evolves

## HallowBranch Tech Stack

### Next.js/React/Supabase Validation Commands

```bash
# Common validation commands for HallowBranch tasks
npm run build          # Build Next.js application
npm run lint           # Check code quality
npm run test           # Run test suite
npm run type-check     # TypeScript type checking
npm run test:coverage  # Check test coverage

# Database validation
supabase status        # Check Supabase project status
supabase db diff       # Check database schema changes

# Performance validation
npm run lighthouse     # Performance and accessibility testing
```

### Task Categories for HallowBranch

The HallowBranch genealogy platform uses these categories:

- **DEV** - Next.js/React setup, Supabase configuration, development tools
- **FEAT** - Genealogy features, family tree components, user authentication
- **BUG** - UI bugs, database issues, performance problems
- **DOCS** - API docs, user guides, privacy documentation
- **TEST** - Component tests, genealogy workflow tests, performance tests
- **PERF** - Family tree rendering, database query optimization, bundle size
- **SEC** - Privacy controls, authentication security, data validation
- **REFACTOR** - Component organization, state management, legacy code cleanup

---

_For current task status and active work items, see [INDEX.md](INDEX.md)_

## Example Implementation

See [`tasks/`](tasks/) for a complete working example of the task management system in action. This includes:

- **6 example tasks** across 3 categories (DEV, FEAT, TEST)
- **Real implementation steps** with actual commands
- **Dependency management** showing how tasks block each other
- **Complete workflow** from setup to testing

### Quick Start with Example

```bash
# 1. Explore the example tasks
cat tasks/INDEX.md | head -20
cat tasks/development/DEV-001-*.md

# 2. See the dependency graph
cat tasks/INDEX.md | grep -A 10 "Task Dependencies"

# 3. Try validation commands from the tasks
cd tasks
npm run build    # Example command from DEV-003
npm test         # Example command from TEST-001
```

The example demonstrates a complete project workflow from development setup through feature implementation to testing.

---
