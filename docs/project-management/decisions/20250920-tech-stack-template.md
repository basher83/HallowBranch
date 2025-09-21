# Tech Stack Template Selection

- Status: approved
- Date: 2025-09-20
- Tags: tech-stack, frontend, backend, template

## Context and Problem Statement

We evaluated Next.js + Supabase starters for a private, family‑only genealogy MVP. Priorities: fast time‑to‑MVP, low complexity to maintain solo, Supabase‑native auth and storage, RLS examples, real‑time updates, and a practical UI baseline for photos and person CRUD.

We compared Hikari, Saasy‑land, and Razikus. Hikari is powerful but includes Stripe and extra SaaS surface. Saasy‑land uses NextAuth rather than Supabase Auth. Razikus is Supabase‑native, focused, and ships file + task demos that map cleanly to this use case.

## Decision Drivers

- Fast time-to-MVP
- Low maintenance complexity for solo development
- Supabase-native authentication and storage
- Row Level Security (RLS) examples
- Real-time updates capability
- Practical UI baseline for photos and CRUD operations

## Considered Options

- Razikus (Next.js + Supabase)
- Hikari (Next.js + Supabase + Stripe + tRPC)
- Saasy‑land (Next.js + NextAuth)

## Decision Outcome

Chosen option: "Razikus (Next.js + Supabase)", because it provides Supabase-native auth, RLS examples, real-time updates, file management demos that map to photo workflows, and person CRUD demos with minimal adaptation needed.

### Positive Consequences

- Faster path to working MVP with family photos and person CRUD
- Supabase-native: Auth, RLS examples, and real-time built in
- File management demo: drag-and-drop uploads, progress, sharing → photo workflow
- Task demo ≈ person CRUD: minimal adaptation to manage family members
- No Stripe/marketing bloat to remove → less code to delete
- Simpler setup and smaller codebase than Hikari; Apache license
- Reduced maintenance and less upgrade friction compared to heavy starters

### Negative Consequences

- Smaller feature surface than Hikari (no payments, fewer premade marketing components)
- Will still need to add genealogy-specific models and visualization

## Pros and Cons of the Options

### Razikus (Next.js + Supabase)

- Good, because Supabase-native auth and storage
- Good, because includes RLS examples
- Good, because real-time updates built-in
- Good, because file management demo maps to photo workflows
- Good, because task demo easily adapts to person CRUD
- Good, because no extra SaaS features to remove
- Good, because smaller codebase than Hikari
- Bad, because limited feature surface compared to Hikari

### Hikari (Next.js + Supabase + Stripe + tRPC)

- Good, because powerful and feature-rich
- Good, because includes payment processing
- Good, because more marketing components available
- Bad, because includes Stripe and extra SaaS surface to remove
- Bad, because more complex to maintain solo
- Bad, because larger codebase with more to delete/modify

### Saasy‑land (Next.js + NextAuth)

- Good, because focused approach
- Bad, because uses NextAuth instead of Supabase Auth
- Bad, because not Supabase-native
- Bad, because lacks Supabase-specific features and examples

## Implementation Plan

### Week 1: Setup and Adapt

**Day 1‑2: Setup and deploy**

- Fork template, set up Supabase, deploy
- Rename "tasks" → "persons"
- Adapt task fields to genealogy fields

**Day 3‑4: Data model**

- Add relationships table
- Adjust RLS for family‑only access
- Connect file uploads to persons

**Day 5‑7: Visualization**

- Add family‑chart or react‑family‑tree
- Wire to persons data and deploy to family

## Guardrails

- Keep customizations minimal to preserve template upgrades
- If gaps appear that materially slow progress, re-evaluate Hikari as fallback

## Links

- Live demo: [basicsass.razikus.com](http://basicsass.razikus.com)
- Research: [Research – Razikus Next.js + Supabase Template](https://www.notion.so/Research-Razikus-Next-js-Supabase-Template-b9eca9061c3e4f3289f35f86b72186ab?pvs=21)
