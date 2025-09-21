# 🌳 HallowBranch - Private Family Genealogy Platform

**A privacy-first family genealogy platform that enables families to collaboratively preserve and share their heritage with complete data ownership and real-time collaboration.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-1.0-green)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🎯 Overview

HallowBranch is a modern, privacy-focused family genealogy platform built for families who want to maintain their family history without sharing sensitive data with commercial genealogy companies. Unlike Ancestry ($2,880+/year for 20 users) and MyHeritage ($2,500-3,780/year), HallowBranch provides complete family data ownership for ~$25-50/month hosting costs.

### ✨ Key Features

- **🛡️ Complete Privacy** - Family-only access with no public data sharing
- **👥 Real-time Collaboration** - Live editing with change attribution
- **📸 Rich Media Support** - Photo and document integration with drag-and-drop
- **🌐 Modern Web App** - Responsive design for all devices
- **🔐 Enterprise Security** - Row-level security with family-based access controls
- **⚡ Fast Performance** - Optimized for 20+ concurrent family members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and CLI installed globally
- Git for version control

### Quick Start (3-4 days to MVP)

```bash
# 1. Clone and setup
git clone <repository-url> hallowbranch
cd hallowbranch

# 2. Configure Supabase
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db reset

# 3. Setup environment
cd nextjs
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# 4. Install and run
yarn install
yarn dev
```

For detailed setup instructions, see [docs/project-management/IMPLEMENTATION.md](docs/project-management/IMPLEMENTATION.md).

## 📋 Project Structure

```
📦 HallowBranch
├── 📂 docs/                    # Documentation
│   └── 📂 project-management/
│       ├── 📂 ADRs/           # Architecture Decision Records
│       ├── 📂 PRDs/           # Product Requirements
│       ├── IMPLEMENTATION.md  # Technical implementation guide
│       ├── MVP-HallowBranchv1.md # MVP learning objectives
│       └── PRD-vs-MVP-vs-ADR.md # Documentation framework
├── 📂 nextjs/                  # Next.js application
│   ├── 📂 src/
│   │   ├── 📂 app/            # App router pages
│   │   ├── 📂 components/     # UI components
│   │   └── 📂 lib/            # Utilities and configurations
│   └── 📂 supabase/           # Database migrations
└── 📂 PRPs/                   # Project Research Proposals
```

## 🏗️ Architecture & Technology Stack

### Core Technologies

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **UI Components**: shadcn/ui component library
- **Deployment**: Vercel with environment-based configuration

### Key Architecture Decisions

Our technical decisions are documented in Architecture Decision Records (ADRs):

- **[Use Razikus Template as Foundation](docs/project-management/decisions/20250921-use-razikus-template-foundation.md)** - Why we chose the Razikus template
- **[Use Supabase as Backend Platform](docs/project-management/decisions/20250921-use-supabase-backend.md)** - Backend platform selection
- **[Use family-chart for Tree Visualization](docs/project-management/decisions/20250921-use-family-chart-visualization.md)** - Tree visualization component

### Database Schema

```sql
-- Core entities for family genealogy
persons (id, first_name, last_name, birth_date, death_date, biography, ...)
relationships (id, person1_id, person2_id, relationship_type, ...)
person_media (id, person_id, file_url, file_type, caption, ...)
families (id, name, description, created_by, ...)
family_members (id, family_id, user_id, role, joined_at, ...)
```

## 🎯 Development Roadmap

### MVP Phase (Week 1-4)

**Goal**: Validate core hypotheses about privacy needs and collaboration value

- **Week 1**: Foundation setup and family member CRUD
- **Week 2**: Photo upload integration and Google OAuth
- **Week 3**: Real-time collaboration and basic tree view
- **Week 4**: Testing and launch to beta families

**Success Metrics**:

- 50+ families sign up in first month
- 70% of users upload at least one photo
- 60% of families have 3+ active contributors

### Enhanced Phase (Week 5-8)

- Enhanced media management and galleries
- Activity feeds and change history
- Advanced tree visualization modes
- GEDCOM import/export capabilities

### Advanced Phase (Week 9-12)

- Timeline and geographic visualization
- Statistics dashboard
- Print-friendly and PDF generation
- Advanced search and filtering

For detailed MVP learning objectives, see [MVP-HallowBranchv1.md](docs/project-management/MVP-HallowBranchv1.md).

## 📚 Documentation

### 📋 Product Documentation

- **[PRD - Family Genealogy App](docs/project-management/PRDs/PRD–Family-Genealogy-App.md)** - Complete product requirements
- **[MVP-HallowBranchv1.md](docs/project-management/MVP-HallowBranchv1.md)** - MVP learning objectives and validation
- **[PRD-vs-MVP-vs-ADR.md](docs/project-management/PRD-vs-MVP-vs-ADR.md)** - Documentation framework guide

### 🏗️ Technical Documentation

- **[IMPLEMENTATION.md](docs/project-management/IMPLEMENTATION.md)** - Technical implementation guide
- **[Architecture Decision Records](docs/project-management/decisions/)** - Technical decision rationale
- **[ADR Index](docs/project-management/decisions/INDEX.md)** - Browse all ADRs by category

### 📋 Project Research Proposals (PRPs)

- **[PRPs/README.md](PRPs/README.md)** - Agentic engineering methodology
- **[PRPs/ai_docs/](PRPs/ai_docs/)** - AI and automation documentation

## 🔐 Privacy & Security

HallowBranch is built with privacy as a core principle:

- **Family-Only Access**: Row-level security ensures only family members can access data
- **Complete Data Ownership**: Families maintain full control of their genealogy data
- **No Data Sharing**: Unlike commercial platforms, no data is shared with partners
- **GDPR Compliance**: Built-in privacy controls and data handling practices
- **Transparent Architecture**: All technical decisions documented in ADRs

## 💰 Cost Comparison

| Platform         | 20 Users/Year | Privacy     | Real-time Collaboration |
| ---------------- | ------------- | ----------- | ----------------------- |
| **HallowBranch** | ~$300-600     | ✅ Complete | ✅ Built-in             |
| Ancestry         | $2,880+       | ❌ Shared   | ❌ Limited              |
| MyHeritage       | $2,500-3,780  | ❌ Shared   | ❌ Limited              |

_HallowBranch hosting costs: $25-50/month for typical family usage_

## 🤝 Contributing

We welcome contributions to HallowBranch! Please see our contribution guidelines:

1. **Architecture Decisions**: Review existing ADRs before proposing changes
2. **Code Quality**: Follow Next.js and React best practices
3. **Testing**: Add tests for new features and bug fixes
4. **Documentation**: Update relevant documentation for any changes
5. **Privacy Focus**: Ensure all changes maintain family data privacy

### Development Workflow

1. Create a feature branch
2. Make changes following existing patterns
3. Add tests for new functionality
4. Update documentation as needed
5. Submit pull request with clear description

## 🧪 Testing & Quality Assurance

- **Unit Tests**: Core business logic and utilities
- **Integration Tests**: Real-time collaboration features
- **E2E Tests**: Critical user flows (person creation, photo upload)
- **Family Beta Testing**: Real-world validation with family groups
- **Performance Testing**: Load testing for family tree operations

## 📱 Mobile & Responsive Design

HallowBranch is built as a progressive web app with mobile-first design:

- Responsive layout for phones and tablets
- Touch-optimized interactions
- Offline-capable features
- Mobile-friendly tree visualization

## 🔧 Development Commands

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format

# Supabase local development
npx supabase start

# Generate types from database
npx supabase gen types typescript --local > src/lib/supabase/types.ts
```

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Razikus](https://github.com/Razikus)** - Supabase-NextJS template foundation
- **[Supabase](https://supabase.com/)** - Backend platform and real-time features
- **[Next.js](https://nextjs.org/)** - React framework
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library
- **[family-chart](https://github.com/donatso/family-chart)** - Tree visualization

## 💪 Support the Project

If you find HallowBranch helpful:

- ⭐ Give it a star on GitHub
- 🐛 Report bugs or suggest features
- 📖 Contribute to documentation
- 🔀 Submit pull requests

**Together, we're building the future of private family genealogy!** 🌳

---

_Built with ❤️ for families who value privacy and collaboration_
