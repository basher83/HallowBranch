# Use Supabase as Backend Platform

- Status: accepted
- Date: 2025-09-21
- Tags: backend, database, supabase, real-time, authentication

## Context and Problem Statement

We need a backend platform that provides database, authentication, file storage, and real-time capabilities for collaborative family genealogy. The platform must support family-based privacy controls, handle media uploads, and enable real-time collaboration without extensive custom development.

## Considered Options

- Supabase - Open source Firebase alternative with PostgreSQL, auth, and real-time
- Firebase - Google's platform with similar features but different data model
- AWS Amplify - Full AWS stack integration with complex setup
- Custom Node.js/Express - Full control but requires building all services
- Railway/Render - PaaS hosting with database add-ons

## Decision Outcome

Chosen option: "Supabase", because it provides all required features (PostgreSQL, authentication, real-time subscriptions, file storage) in a unified platform with excellent developer experience, enabling rapid development while maintaining cost control at $25-50/month for typical family usage.

### Positive Consequences

- Built-in real-time subscriptions for collaborative editing
- Row-level security for family-based privacy controls
- Excellent developer experience with auto-generated APIs
- Cost-effective scaling from $0 to $50/month
- Rich ecosystem with client libraries and tooling

### Negative Consequences

- Vendor lock-in to Supabase platform and pricing
- Limited to PostgreSQL feature set (though sufficient for genealogy)
- Dependency on Supabase service availability
- Migration complexity if switching platforms later

## Links

- Builds upon Razikus template foundation decision
- Enables real-time collaboration requirements from MVP documentation
