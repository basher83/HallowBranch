# Use family-chart Library for Tree Visualization

- Status: accepted
- Date: 2025-09-21
- Tags: frontend, visualization, family-tree, genealogy, ui-component

## Context and Problem Statement

We need a family tree visualization component that can display person-to-person relationships, handle dynamic data updates, and provide interactive features like pan/zoom. This must integrate with our Supabase real-time data and work within the NextJS/React architecture.

## Considered Options

- family-chart - Specialized genealogy tree visualization library
- react-family-tree - React wrapper for family tree rendering
- D3.js custom implementation - Full control but complex development
- vis.js network graphs - General purpose graph visualization
- Custom SVG implementation - Lightweight but requires extensive development

## Decision Outcome

Chosen option: "family-chart", because it provides genealogy-specific features, handles complex family relationships, supports real-time updates, and offers interactive features out-of-the-box, enabling tree visualization within the MVP timeline without custom graph algorithm development.

### Positive Consequences

- Specialized for genealogy data structures and relationships
- Built-in support for person cards with photos and details
- Interactive features (pan, zoom, selection) included
- Real-time data update compatibility
- Active maintenance and genealogy community support

### Negative Consequences

- External dependency on specific library architecture
- Limited customization compared to custom D3 implementation
- Potential learning curve for component integration
- Dependency on maintainer for bug fixes and features

## Links

- Related to frontend visualization requirements in PRD
- Enables family tree viewing user stories from MVP documentation
