---
description: Prime Claude Code with core knowledge about the Next.js/Supabase SaaS Template project structure and context
model: claude-opus-4-1-20250805
---

> Command for priming Claude Code with core knowledge about your Next.js/Supabase SaaS Template project

# Prime Context for Claude Code

## Repository Structure Overview

This is a **Next.js 15 + Supabase SaaS Template** with a monorepo structure:

```text
/ (repository root)
├── nextjs/                    # Next.js 15 application (main project)
│   ├── src/app/              # Next.js App Router pages
│   ├── src/components/       # React components (includes shadcn/ui)
│   ├── src/lib/              # Utilities and Supabase integration
│   └── package.json         # Dependencies and scripts
├── supabase/                 # Supabase configuration and migrations
├── PRPs/                     # Product Requirements Planning system
├── .claude/                  # AI development commands and tools
├── claude_md_files/          # Template documentation files
└── docs/                     # Project documentation
```

## Essential Reading Order

1. **README.md** - Project overview and setup instructions
2. **CLAUDE.md** - Development guidelines and repository patterns
3. **PRPs/README.md** - Understanding the PRP workflow system

## Key Files to Examine

### Next.js Application (`nextjs/` directory)

- `nextjs/src/app/layout.tsx` - Root layout with providers and metadata
- `nextjs/src/app/page.tsx` - Main landing page
- `nextjs/src/lib/supabase/unified.ts` - SassClient wrapper pattern
- `nextjs/src/lib/supabase/client.ts` - Supabase client configuration
- `nextjs/src/components/ui/button.tsx` - shadcn/ui component example
- `nextjs/src/middleware.ts` - Next.js middleware for auth/session
- `nextjs/package.json` - Dependencies and development scripts
- `nextjs/next.config.ts` - Next.js configuration

### Supabase Configuration (`supabase/` directory)

- `supabase/config.toml` - Supabase CLI configuration
- `supabase/migrations/` - Database migrations and policies

### PRP System (`PRPs/` directory)

- `PRPs/templates/` - PRP templates for different types of work
- `PRPs/ai_docs/` - AI-specific documentation

### AI Development Tools (`.claude/` directory)

- `.claude/commands/` - Specialized commands for different workflows
- `.claude/commands/prp-commands/` - PRP-specific commands
- `.claude/commands/typescript/` - TypeScript-specific commands

## Important Dependencies & Configuration

### Core Dependencies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with new features
- **TypeScript** - Type safety
- **Supabase** - Backend as a Service (Auth, Database, Storage)
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI

### Key Configuration Files

- `nextjs/tsconfig.json` - TypeScript configuration
- `nextjs/next.config.ts` - Next.js build configuration
- `nextjs/tailwind.config.ts` - Tailwind CSS configuration
- `supabase/config.toml` - Supabase CLI configuration
- `.env.local` - Environment variables (not in repo)

## Development Patterns to Understand

1. **Next.js App Router** - File-based routing in `nextjs/src/app/`
2. **SassClient Pattern** - Supabase client wrapper in `nextjs/src/lib/supabase/unified.ts`
3. **shadcn/ui Components** - Component library in `nextjs/src/components/ui/`
4. **PRP Workflow** - Feature development process using Product Requirements Planning
5. **Environment Setup** - Supabase local development and configuration

## Common Commands to Know

```bash
# Development
cd nextjs && yarn dev              # Start Next.js dev server
cd nextjs && yarn build            # Build for production
cd nextjs && yarn lint             # Run ESLint
cd nextjs && npx tsc --noEmit      # Type check

# Supabase
supabase start                     # Start local Supabase
supabase status                    # Check Supabase status

# PRP Workflow
# Use commands in .claude/commands/prp-commands/
```

## Repository-Specific Context

- **Monorepo Structure**: Next.js app is in `nextjs/` subdirectory
- **Package Manager**: Uses yarn (not npm)
- **Database**: PostgreSQL via Supabase (not local database)
- **Authentication**: Supabase Auth with custom session handling
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Development Approach**: PRP-driven development workflow

> After reviewing these files, explain back to me the project structure, purpose, key files, important dependencies, and configuration files.
