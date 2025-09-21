# HallowBranch Technical Implementation Guide

## Overview

This guide provides technical implementation details for building the HallowBranch family genealogy platform. For product requirements, business case, and user stories, see [PRD–Family-Genealogy-App.md](PRDs/PRD–Family-Genealogy-App.md). For MVP learning objectives and hypothesis validation, see [MVP-HallowBranchv1.md](MVP-HallowBranchv1.md).

## Architecture Decisions

Key technical decisions are documented in ADRs:

- [Use Razikus Template as Application Foundation](decisions/20250921-use-razikus-template-foundation.md)
- [Use Supabase as Backend Platform](decisions/20250921-use-supabase-backend.md)
- [Use family-chart Library for Tree Visualization](decisions/20250921-use-family-chart-visualization.md)

## Technology Stack

### Foundation: Razikus Template

The project is built on the Razikus Supabase-NextJS template, providing pre-configured:

- Next.js 15 with React 19 and TypeScript
- Supabase client integration
- Authentication system with MFA support
- File upload with drag-and-drop UI
- Real-time subscriptions
- Row-level security policies
- shadcn/ui component library
- Tailwind CSS for styling

### Additional Libraries

- **family-chart**: Genealogy-specific tree visualization
- **Supabase Client**: Database and real-time functionality
- **React Hook Form**: Form management and validation

### Infrastructure

- **Frontend**: Next.js 15 with App Router
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **Deployment**: Vercel with environment-based configuration
- **Database**: PostgreSQL with Row Level Security

## Phased Development Roadmap

### Phase 1: MVP (Days 1-7)

**Goal**: Basic functional genealogy platform with core features

**Day 1-2: Setup & Initial Customization**

```bash
# Fork Razikus template
git clone https://github.com/Razikus/supabase-nextjs-template genealogy-app
cd genealogy-app

# Setup Supabase
npx supabase login
npx supabase link
npx supabase migrations up --linked

# Configure environment
cd nextjs
cp .env.template .env.local
# Add your Supabase keys
yarn && yarn dev
```

**Day 2-3: Adapt Data Model**

- Rename "tasks" table to "persons"
- Modify schema:

```sql
CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT,
    birth_date DATE,
    death_date DATE,
    birth_place TEXT,
    death_place TEXT,
    gender VARCHAR(20),
    notes TEXT,
    profile_photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person1_id UUID REFERENCES persons(id),
    person2_id UUID REFERENCES persons(id),
    relationship_type VARCHAR(50), -- parent, spouse, child
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Day 4-5: UI Adaptation**

- Modify task management UI → person management
- Update file upload to link photos to persons
- Add person profile view using existing components
- Create simple relationship picker

**Day 6-7: Basic Tree Visualization**

- Install family-chart: `yarn add family-chart`
- Create tree component using person/relationship data
- Add to dashboard as new tab
- Deploy to Vercel for family testing

**Deliverable**: Working app where family members can log in, add people with photos, and view a basic tree

### Phase 2: Enhanced Collaboration (Week 2-3)

**Goal**: Real-time collaboration and rich media support

**Week 2: Collaborative Features**

- Enable Supabase real-time on persons/relationships tables
- Add presence indicators (who's online)
- Implement change attribution using existing audit patterns
- Add activity feed using task demo as template

**Week 3: Media & Documents**

- Extend file management for multiple photos per person
- Add document categories (birth certificates, photos, etc.)
- Create gallery view per person
- Implement document viewer

### Phase 3: Advanced Features (Week 4-6)

**Goal**: Professional genealogy features

**Week 4: Import/Export**

- GEDCOM import using gedcom.js
- GEDCOM export functionality
- JSON backup/restore
- Family tree PDF generation

**Week 5: Enhanced Visualizations**

- Interactive timeline view
- Geographic birthplace mapping
- Statistics dashboard
- Relationship calculator

**Week 6: Polish & Launch**

- Mobile responsive improvements
- Print-friendly views
- User preferences
- Family invitation flow refinement

## Implementation Guide

### Adapting Razikus Components

**File Management → Photo Gallery**

```javascript
// Existing Razikus file upload component
// Modify to:
1. Link uploads to person_id
2. Add photo categories (profile, documents, etc.)
3. Create thumbnail generation
4. Add to person profile page
```

**Task Management → Person Management**

```javascript
// Current task CRUD in Razikus
// Transform to:
- Tasks → Persons
- Task status → Life status (living/deceased)
- Task assignee → Created by
- Task description → Biography/Notes
```

### Database Schema Modifications

```sql
-- Extend the existing Razikus structure
-- Add to migrations:

-- Media linking table
CREATE TABLE person_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID REFERENCES persons(id),
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    caption TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Family access control
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    role VARCHAR(50) DEFAULT 'member', -- admin, editor, viewer
    invited_by UUID REFERENCES auth.users(id),
    joined_at TIMESTAMP DEFAULT NOW()
);

-- Update RLS policies for family-only access
CREATE POLICY "Family members can view persons" ON persons
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM family_members
        )
    );
```

### Key Advantages of Razikus Base

**What You DON'T Have to Build:**

- ✅ Authentication flow (including MFA)
- ✅ File upload with progress tracking
- ✅ Drag-and-drop interfaces
- ✅ Real-time subscriptions
- ✅ RLS security policies
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Dark mode support
- ✅ Responsive design base

**What You're Modifying:**

- Tasks → Persons (straightforward table/UI rename)
- File categories (minor extension)
- Adding relationship logic (new feature)
- Tree visualization (new component)

## Development Environment Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase CLI installed globally
- Git for version control

### Quick Start Commands

```bash
# 1. Setup (30 minutes)
git clone https://github.com/Razikus/supabase-nextjs-template genealogy-app
cd genealogy-app

# 2. Configure Supabase
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db reset

# 3. Configure environment
cd nextjs
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# 4. Install dependencies and run
yarn install
yarn dev
```

### Database Schema Setup

Create initial migrations for genealogy data:

```sql
-- Persons table (extends Razikus tasks structure)
CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by UUID REFERENCES auth.users(id),
    first_name TEXT NOT NULL,
    last_name TEXT,
    birth_date DATE,
    death_date DATE,
    birth_place TEXT,
    death_place TEXT,
    gender VARCHAR(20),
    biography TEXT,
    profile_photo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Relationships table
CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person1_id UUID REFERENCES persons(id),
    person2_id UUID REFERENCES persons(id),
    relationship_type VARCHAR(50), -- parent, spouse, child
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;

-- Family members can view/edit persons they created
CREATE POLICY "Users can view persons" ON persons FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert persons" ON persons FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update persons" ON persons FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete persons" ON persons FOR DELETE USING (auth.uid() = created_by);
```

## Component Adaptation Guide

### Adapting Razikus Components

**File Management → Photo Gallery**

```javascript
// Modify existing Razikus file upload component:
// 1. Link uploads to person_id with foreign key relationship
// 2. Add photo categories (profile, documents, historical photos)
// 3. Create thumbnail generation for gallery view
// 4. Integrate with person profile pages
// 5. Add drag-and-drop reordering and bulk operations
```

**Task Management → Person Management**

```javascript
// Transform task CRUD system to person management:
// - Tasks → Persons (update table name and relationships)
// - Task status → Life status (living/deceased/unknown)
// - Task assignee → Created by (user attribution)
// - Task description → Biography/Notes field
// - Task priority → Custom fields for genealogy data
```

### Database Schema Extensions

```sql
-- Person media linking (extends file storage)
CREATE TABLE person_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID REFERENCES persons(id),
    file_url TEXT NOT NULL,
    file_type VARCHAR(50), -- photo, document, certificate
    caption TEXT,
    media_category VARCHAR(50), -- profile, family, historical, document
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Family access control
CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id),
    user_id UUID REFERENCES auth.users(id),
    role VARCHAR(50) DEFAULT 'member', -- admin, editor, viewer
    invited_by UUID REFERENCES auth.users(id),
    joined_at TIMESTAMP DEFAULT NOW()
);

-- Enhanced RLS policies for family-based access
CREATE POLICY "Family members can access family data" ON persons
    FOR ALL USING (
        auth.uid() IN (
            SELECT user_id FROM family_members fm
            JOIN family_members owner_fm ON owner_fm.family_id = fm.family_id
            WHERE owner_fm.user_id = persons.created_by
        )
    );
```

### Real-time Integration

Enable Supabase real-time subscriptions for collaborative editing:

```javascript
// Client-side subscription setup
const subscription = supabase
  .channel("persons-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "persons",
    },
    handlePersonChange
  )
  .subscribe();
```

### Deployment Configuration

**Environment Variables Required:**

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- GOOGLE_CLIENT_ID (for OAuth)

**Build Configuration:**

- Vercel deployment with automatic Supabase integration
- Environment-specific database connections
- Static generation for person profiles where possible

## Testing Strategy

**Development Testing:**

- Unit tests for person/relationship data transformations
- Integration tests for real-time collaboration features
- E2E tests for critical user flows (person creation, photo upload)

**Family Beta Testing:**

- 5-10 family members testing core functionality
- Focus on usability and collaboration features
- Gather feedback on missing genealogy-specific features

## Performance Considerations

- Implement pagination for large family trees
- Add image optimization with Next.js Image component
- Use React.memo for person components to prevent unnecessary re-renders
- Implement optimistic updates for better UX during real-time collaboration
- Add loading states and error boundaries for robust user experience

## Next Steps

1. **Setup Phase**: Fork Razikus template and configure Supabase project
2. **Schema Phase**: Create person and relationship tables with RLS policies
3. **Component Phase**: Adapt existing UI components for genealogy use case
4. **Integration Phase**: Add family-chart visualization and real-time features
5. **Testing Phase**: Deploy to family beta testers for validation
6. **Launch Phase**: Production deployment with monitoring and analytics
