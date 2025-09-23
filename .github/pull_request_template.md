## 🎯 Summary

<!-- Provide a brief, clear description of the changes -->

**Type:** <!-- feat, fix, docs, refactor, test, chore, style -->
**Related Issue:** <!-- #issue-number or N/A -->

## 📝 Description

### What does this PR do?

<!-- Explain the changes in detail -->

### Why is this needed?

<!-- Describe the problem being solved or feature being added -->

## 🔄 Changes

### Frontend (Next.js/React)
- [ ] Components modified/added
- [ ] Pages modified/added
- [ ] Styles/themes updated
- [ ] State management changes

### Backend (Supabase)
- [ ] Database migrations
- [ ] RLS policies updated
- [ ] Edge functions modified
- [ ] Storage rules changed

### Other
- [ ] Documentation updates
- [ ] Configuration changes
- [ ] Dependencies added/updated

## 🧪 Testing

### How to test

1. <!-- Step 1 -->
2. <!-- Step 2 -->
3. <!-- Step 3 -->

### Test checklist
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested on mobile viewport
- [ ] Tested on desktop viewport
- [ ] Tested with authenticated user
- [ ] Tested with unauthenticated user (if applicable)

## 📸 Screenshots

<!-- Add screenshots or videos if UI changes are involved -->

<details>
<summary>Before</summary>

<!-- Add before screenshots -->

</details>

<details>
<summary>After</summary>

<!-- Add after screenshots -->

</details>

## ✅ Checklist

### Code Quality
- [ ] Code follows project conventions (CLAUDE.md)
- [ ] No hardcoded values (uses constants/env vars)
- [ ] No console.log statements in production code
- [ ] Semantic HTML and proper accessibility

### TypeScript & Linting
- [ ] `npm run lint` passes with zero warnings
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] No `any` types added (use `unknown` if needed)

### Styling & UI
- [ ] Uses semantic design tokens (not hardcoded colors)
- [ ] Dark mode support maintained
- [ ] Responsive design maintained
- [ ] Uses existing shadcn/ui components where applicable

### Performance
- [ ] No unnecessary re-renders introduced
- [ ] Images optimized (if applicable)
- [ ] Bundle size impact considered
- [ ] Loading states implemented for async operations

### Security
- [ ] No sensitive data exposed in client code
- [ ] RLS policies updated if database changes made
- [ ] Environment variables properly used for secrets
- [ ] Input validation implemented

### Documentation
- [ ] README updated (if needed)
- [ ] CHANGELOG.md updated
- [ ] Code comments added for complex logic
- [ ] PRPs updated (if architectural changes)

## 🚨 Breaking Changes

<!-- List any breaking changes and migration steps -->

- [ ] No breaking changes

<!-- If breaking changes exist, describe them:
- What breaks:
- Migration path:
- Who is affected:
-->

## 🔗 Dependencies

<!-- List new dependencies and justify their addition -->

**New packages added:**
- <!-- package-name: reason for adding -->

**Packages updated:**
- <!-- package-name: from version -> to version -->

## 📚 Additional Notes

<!-- Any additional context, design decisions, or future considerations -->

---

**By submitting this PR, I confirm that:**

- [ ] I have tested these changes locally
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] All tests pass (when applicable)
