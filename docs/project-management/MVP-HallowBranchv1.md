# HallowBranch MVP: Learning-Driven Development

## 🎯 MVP Learning Objectives

**Problem Validation Hypotheses:**

1. **Privacy Need**: Families are willing to switch from free/paid genealogy services to gain complete data ownership and privacy
2. **Collaboration Value**: Real-time collaborative editing provides significant value over individual genealogy software
3. **Digital Adoption**: Families (especially multi-generational) will actively use a digital family tree platform
4. **Media Integration**: Photo/document integration drives engagement more than text-only genealogy data

**Core Feature Hypotheses:**

1. **Real-time Updates**: Families value seeing changes instantly without manual refresh
2. **Change Attribution**: Users want to know who made changes and when for accountability
3. **Mobile Access**: Family members need mobile access to contribute photos and updates
4. **Simple Onboarding**: Google OAuth + family invitations enable quick adoption

**Market Hypotheses:**

1. **Cost Sensitivity**: Families will choose $25-50/month over $2,880+/year for privacy
2. **Family Size**: Typical families can effectively collaborate with 10-20 members
3. **Content Types**: Photos and basic biographical info are sufficient for initial engagement

## 📊 MVP Success Metrics & Validation

**Primary Learning Metrics (What We Must Learn):**

- **Problem Validation**: Do families actually want private genealogy management?

  - Target: 50+ families sign up in first month
  - Measure: Conversion rate from invitation to first family member added

- **Feature Validation**: Does collaborative editing provide real value?

  - Target: 60% of families have 3+ active contributors
  - Measure: Number of real-time edits vs individual sessions

- **Engagement Validation**: Will families regularly contribute content?
  - Target: 70% of users upload at least one photo within first week
  - Measure: Weekly active users and content addition patterns

**Secondary Validation Metrics (How Well It Works):**

- **Usability**: Time-to-first-usable < 5 minutes from Google login
- **Reliability**: 95%+ successful page loads during family testing
- **Mobile Experience**: 80% of usage from mobile devices
- **Privacy Confidence**: Zero accidental data exposure incidents

## 🚀 MVP Build Plan (Hypothesis Testing Focus)

**Week 1: Foundation (Setup & Core Data Model)**

- Fork and configure Razikus template with Supabase
- Implement basic person/family member data model
- Create family invitation system with Google OAuth
- **Hypothesis Test**: Can families invite members and create first person in < 5 minutes?

**Week 2: Core Features (Photo Upload & Basic Tree)**

- Adapt file upload for person photos
- Implement basic family tree visualization
- Add change attribution tracking
- **Hypothesis Test**: Do users engage more with photo integration?

**Week 3: Real-time Collaboration**

- Enable Supabase real-time subscriptions
- Add presence indicators and change notifications
- Implement basic conflict resolution
- **Hypothesis Test**: Does real-time editing increase collaboration frequency?

**Week 4: Polish & Beta Testing**

- Mobile responsiveness optimization
- Error handling and user feedback
- Deploy to beta families for validation
- **Hypothesis Test**: Will families actually use this daily/weekly?

## 🎯 MVP Scope: Minimal Learning Features

**IN SCOPE (Essential for Learning):**

- Google OAuth authentication with family invitations
- Create/edit family member profiles (name, birth/death, relationships)
- Photo upload linked to family members (drag-and-drop)
- Basic family tree visualization with relationship display
- Real-time collaborative editing with change attribution
- Family-based privacy controls (RLS)
- Mobile-responsive interface

**OUT OF SCOPE (Post-Learning Features):**

- GEDCOM import/export (not needed for learning collaboration value)
- Advanced tree visualizations (basic view sufficient for testing)
- Complex relationship types (parent/child/spouse enough for MVP)
- Notification systems (real-time updates serve this purpose)
- Advanced search/filtering (basic navigation adequate)
- Print-friendly views (digital-first learning focus)

## ✅ MVP Acceptance Criteria (Hypothesis Validation)

**Core Functionality (Must Work for Learning):**

- Family members can sign in with Google and immediately see their family tree
- Users can create a new person with basic info in under 2 minutes
- Photo upload works reliably and displays on person profiles
- Users can see when others are editing (presence indicators)
- Real-time updates appear within 2 seconds of changes
- Privacy controls prevent access from non-family members

**Technical Reliability (Must Work for Testing):**

- 99%+ successful photo uploads during testing
- Real-time updates work with 5+ concurrent users
- Mobile interface usable on phones and tablets
- No data loss during collaborative editing sessions

**Learning Validation (Must Measure):**

- Track time from Google login to first person creation
- Monitor real-time edit frequency vs individual edits
- Measure photo upload rate and types of photos added
- Capture user feedback on privacy and collaboration value

## 📈 MVP Success Indicators

**Learning Success (Primary):**

- **Problem Validated**: 30+ families actively using platform after 2 weeks
- **Collaboration Proved**: Average 3+ real-time edits per family per week
- **Engagement Confirmed**: 50% of users return weekly to add content
- **Privacy Valued**: Families express preference for private platform

**Feature Success (Secondary):**

- **Technical Feasibility**: Real-time collaboration works reliably
- **User Experience**: Families can onboard new members independently
- **Mobile Adoption**: 60%+ usage from mobile devices
- **Data Integrity**: No data conflicts or loss during collaborative editing

## 🔄 MVP Pivot/Persevere Criteria

**Persevere If:**

- Families actively invite new members and collaborate regularly
- Users express strong preference for privacy over commercial platforms
- Real-time editing proves valuable for family coordination
- Photo/document integration drives ongoing engagement

**Pivot If:**

- Families don't see value in collaborative editing over individual tools
- Privacy concerns don't outweigh convenience of existing platforms
- Users prefer static family trees over dynamic collaboration
- Technical complexity of real-time features overwhelms user experience

## 🎯 MVP Success Definition

**We will consider the MVP successful if we can confidently answer:**

1. **Do families want this?** (Problem validation)
2. **Does real-time collaboration work?** (Technical validation)
3. **Will families actually use it?** (Engagement validation)
4. **Is the privacy premium worth it?** (Value validation)

**The MVP succeeds if we learn whether to build a full genealogy platform or focus on a different family collaboration solution.**
