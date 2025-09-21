# Use Razikus Template as Application Foundation

- Status: accepted
- Date: 2025-09-21
- Tags: tech-stack, template, foundation, supabase, nextjs

## Context and Problem Statement

We need to build a family genealogy platform with collaborative editing, media storage, and real-time features within a 3-4 day MVP timeline. We evaluated multiple foundation approaches: building from scratch, using alternative templates, or forking an existing template with overlapping features.

## Considered Options

- Razikus Supabase-NextJS Template - Pre-configured with auth, RLS, storage, and real-time features
- Hikari Template - Feature-rich template with payment systems included
- SvelteKit Alternative - Modern framework with minimal overlapping features
- Build from Scratch - Complete control but requires building all infrastructure
- Other NextJS Templates - Various templates with partial feature overlap

## Decision Outcome

Chosen option: "Razikus Supabase-NextJS Template", because it provides 80% of required functionality out-of-the-box including Supabase integration, file management UI, real-time subscriptions, and security policies, enabling 3-4 day MVP delivery instead of 1-2 weeks with alternatives.

### Positive Consequences

- Rapid MVP development (3-4 days vs 1-2 weeks)
- Pre-configured enterprise-grade features (auth, RLS, real-time)
- Focus on genealogy-specific features rather than infrastructure
- Reduced technical risk with proven template

### Negative Consequences

- Template lock-in to NextJS/Supabase stack
- Learning curve for understanding Razikus patterns
- Potential maintenance overhead tracking upstream changes
- Some features may require significant adaptation for genealogy use case

## Links

- Related to tech stack decisions documented in IMPLEMENTATION.md
- Implements real-time collaboration requirements from MVP-HallowBranchv1.md
