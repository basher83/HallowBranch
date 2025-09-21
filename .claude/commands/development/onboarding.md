---
description: Perform a comprehensive onboarding analysis for a new developer joining this project
model: claude-sonnet-4-20250514
---

Please perform a comprehensive onboarding analysis for a new developer joining this project. Execute the following steps:

## 1. Project Overview

First, analyze the repository structure and provide:

- Project name, purpose, and main functionality
- Tech stack (languages, frameworks, databases, tools)
- Architecture pattern (MVC, microservices, etc.)
- Key dependencies and their purposes

## 2. Repository Structure

Map out the codebase organization:

- List all top-level directories with their purposes
- Identify where different types of code live (models, controllers, utils, tests)
- Highlight any non-standard or unique organizational patterns
- Note any monorepo structures or submodules

## 3. Getting Started

Create step-by-step setup instructions:

- Prerequisites (required software, versions)
- Environment setup commands
- How to install dependencies (yarn vs npm)
- Configuration files that need to be created/modified
- How to run the project locally (Next.js development server)
- How to run tests (if applicable)
- How to build for production (Next.js build process)
- Repository-specific: Supabase local development setup

## 4. Key Components

Identify and explain the most important files/modules:

- Entry points (Next.js pages in nextjs/src/app/, main layout.tsx)
- Core business logic locations (components, utilities, API routes)
- Database models/schemas (Supabase PostgreSQL schema)
- API endpoints or routes (Next.js API routes, Supabase Edge Functions)
- Configuration management (next.config.ts, supabase/config.toml)
- Authentication/authorization implementation (Supabase Auth, middleware.ts)
- Repository-specific: SassClient wrapper pattern in nextjs/src/lib/supabase/

## 5. Development Workflow

Document the development process:

- Git branch naming conventions
- How to create a new feature (using PRP workflow)
- Testing requirements (TypeScript, ESLint, build validation)
- Code style/linting rules (ESLint flat config, Prettier)
- PR process and review guidelines
- CI/CD pipeline overview
- Repository-specific: Using PRPs for feature planning and implementation

## 6. Architecture Decisions

Identify important patterns and decisions:

- Design patterns used and why (Server/Client Components, custom hooks)
- State management approach (Context API, local state, server state)
- Error handling strategy (Next.js error boundaries, try/catch patterns)
- Logging and monitoring setup (Console logging, Supabase monitoring)
- Security measures (Supabase RLS, environment variables, authentication)
- Performance optimizations (Next.js optimizations, image optimization)
- Repository-specific: SassClient wrapper pattern, shadcn/ui component usage

## 7. Common Tasks

Provide examples for frequent development tasks:

- How to add a new API endpoint (Next.js API routes)
- How to create a new database model (Supabase migration)
- How to add a new test (if testing is implemented)
- How to debug common issues (Next.js debugging, Supabase issues)
- How to update dependencies (yarn upgrade patterns)
- Repository-specific: How to create a new page (Next.js App Router), how to add a new component (shadcn/ui pattern), how to integrate with Supabase (SassClient usage)

## 8. Potential Gotchas

List things that might trip up new developers:

- Non-obvious configurations (Next.js vs Create React App differences)
- Required environment variables (Supabase configuration)
- External service dependencies (Supabase services, authentication)
- Known issues or workarounds (Next.js App Router quirks)
- Performance bottlenecks (Server vs Client Components)
- Areas of technical debt (any legacy patterns)
- Repository-specific: Environment variable setup, Supabase local development, yarn vs npm usage, TypeScript strict mode

## 9. Documentation and Resources

- Locate existing documentation (README, docs/, PRPs/)
- API documentation (Next.js API routes, Supabase Edge Functions)
- Database schemas (Supabase migrations in supabase/migrations/)
- Deployment guides (Vercel deployment patterns)
- Team conventions or style guides (CLAUDE.md, ESLint configuration)
- Repository-specific: PRP templates in PRPs/templates/, AI documentation in PRPs/ai_docs/, development commands in .claude/commands/

## 10. Next Steps

Create an onboarding checklist for the new developer:

1. Set up development environment (Node.js, yarn, Supabase CLI)
2. Install dependencies (cd nextjs && yarn install)
3. Configure environment variables (.env.local setup)
4. Run the project successfully (cd nextjs && yarn dev)
5. Make a small test change (modify a component, test TypeScript compilation)
6. Run the validation suite (yarn lint, yarn build)
7. Understand the main user flow (authentication, key pages)
8. Review PRP workflow for feature development
9. Identify area to start contributing (based on current project needs)

Repository-specific: Review CLAUDE.md for development guidelines, explore existing components in nextjs/src/components/ui/, understand Supabase integration patterns in nextjs/src/lib/supabase/

## Output Format

Please create:

1. A comprehensive ONBOARDING.md file at the root of the repository with all above information
2. A QUICKSTART.md with just the essential setup steps (focus on yarn, Next.js, Supabase setup)
3. Suggest updates to the README.md if it's missing critical information (don't update the readme directly)
4. Repository-specific: Reference our PRP workflow, CLAUDE.md guidelines, and existing component patterns

Focus on clarity and actionability. Assume the developer is experienced but completely new to this codebase.

Key repository-specific elements to emphasize:

- Next.js 15 App Router structure
- Supabase integration patterns (SassClient wrapper)
- shadcn/ui component usage
- PRP workflow for feature development
- TypeScript and ESLint validation patterns
