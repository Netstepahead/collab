# TODO List

Priority tasks and future features for the Personal CRM application.

---

## 🔥 High Priority (Next Steps)

### 1. Save Questionnaire Results to Database
**Status:** Not Started
**Why:** Currently results only show on page, not saved for later viewing

**Tasks:**
- [ ] Create API route to save results
- [ ] Save when user completes questionnaire
- [ ] Link results to user profile
- [ ] Update Dashboard to show latest result
- [ ] Add "View My Report" link in Dashboard

**Files to modify:**
- `src/app/results/page.tsx` - Add save logic
- `src/app/dashboard/page.tsx` - Fetch and display results

---

### 2. Contact Detail Page
**Status:** Not Started
**Why:** Need a dedicated page for each contact with full info

**Tasks:**
- [ ] Create `src/app/contacts/[id]/page.tsx`
- [ ] Show all contact information
- [ ] Display interaction history
- [ ] Add "Add Interaction" button
- [ ] Edit contact from detail page
- [ ] Back to contacts list

**New Files:**
- `src/app/contacts/[id]/page.tsx`

---

### 3. Add Interactions to Contacts
**Status:** Foundation exists, needs UI
**Why:** Track when you last spoke, met, or interacted

**Tasks:**
- [ ] Create InteractionForm component
- [ ] Add interaction dialog in contact detail
- [ ] List interactions on contact page
- [ ] Show last contact date on contact card
- [ ] Filter contacts by last interaction

**New Files:**
- `src/components/contacts/InteractionForm.tsx`
- `src/components/contacts/InteractionList.tsx`

---

## 📊 Medium Priority

### 4. Enhanced Dashboard
**Status:** Basic version exists
**Why:** Make it actually useful

**Tasks:**
- [ ] Show user's archetype at top
- [ ] Display key stats (total contacts, by type, etc.)
- [ ] Recent interactions timeline
- [ ] Upcoming reminders (future feature)
- [ ] Quick actions

**Files to modify:**
- `src/app/dashboard/page.tsx`

---

### 5. Tags System
**Status:** Database ready, no UI
**Why:** Organize contacts better

**Tasks:**
- [ ] Tag input in contact form (chips UI)
- [ ] Tag selector/filter on contacts page
- [ ] Popular tags display
- [ ] Tag management page
- [ ] Tag-based contact groups

**New Files:**
- `src/components/contacts/TagInput.tsx`
- `src/components/contacts/TagFilter.tsx`

---

### 6. CSV Import
**Status:** Not Started
**Why:** Bulk import contacts

**Tasks:**
- [ ] CSV upload button
- [ ] Parse CSV file
- [ ] Map columns to contact fields
- [ ] Preview before import
- [ ] Bulk insert to database
- [ ] Show import results

**New Files:**
- `src/components/contacts/ImportDialog.tsx`
- `src/lib/csvImport.ts`

---

## 🎨 Polish & UX

### 7. Mobile Menu
**Status:** Not Started
**Why:** Navigation doesn't work on mobile

**Tasks:**
- [ ] Add hamburger menu button
- [ ] Mobile slide-out menu
- [ ] Touch-friendly navigation
- [ ] Test on actual mobile devices

**Files to modify:**
- `src/components/layout/Header.tsx`

---

### 8. Loading States & Skeletons
**Status:** Basic loading exists
**Why:** Better UX during data fetching

**Tasks:**
- [ ] Add skeleton loaders
- [ ] Better loading animations
- [ ] Optimistic UI updates
- [ ] Error boundaries

**New Files:**
- `src/components/ui/skeleton.tsx`

---

### 9. Confirmation Dialogs
**Status:** Using browser confirm()
**Why:** More polished and consistent

**Tasks:**
- [ ] Create ConfirmDialog component
- [ ] Replace all confirm() calls
- [ ] Support async confirmations
- [ ] Consistent styling

**New Files:**
- `src/components/ui/confirm-dialog.tsx`

---

## 🚀 Advanced Features

### 10. Network Visualization
**Status:** Not Started
**Why:** Core feature of the app vision

**Tasks:**
- [ ] Install React Flow
- [ ] Create network graph page
- [ ] Map contacts to nodes
- [ ] Show connection strength
- [ ] Group by tags
- [ ] Interactive zoom/pan
- [ ] Export as image

**New Files:**
- `src/app/network/page.tsx`
- `src/components/network/NetworkGraph.tsx`
- `src/lib/networkBuilder.ts`

---

### 11. LinkedIn Import
**Status:** Not Started
**Why:** Many contacts are on LinkedIn

**Tasks:**
- [ ] Research LinkedIn API / CSV export
- [ ] Create import flow
- [ ] Map LinkedIn fields to contact fields
- [ ] Handle photos
- [ ] Deduplicate contacts

**Complexity:** HIGH (LinkedIn API limitations)

---

### 12. Goals & Reminders
**Status:** Not Started
**Why:** Proactive relationship management

**Tasks:**
- [ ] Create goals table in database
- [ ] Goal CRUD interface
- [ ] Link goals to contacts
- [ ] Reminder system (email/push?)
- [ ] Track goal progress

**New Tables:**
- `goals`
- `reminders`

---

### 13. Email Integration
**Status:** Not Started
**Why:** Track email interactions automatically

**Tasks:**
- [ ] Gmail API integration
- [ ] Outlook integration
- [ ] Parse sent/received emails
- [ ] Create interactions automatically
- [ ] Privacy settings

**Complexity:** VERY HIGH

---

## 🐛 Known Issues to Fix

### 14. Small Bugs
- [ ] Loading state flicker on auth check
- [ ] Language toggle doesn't persist on refresh
- [ ] Form validation could be better
- [ ] Error messages could be more helpful
- [ ] Contact card truncation on long names

---

## 📱 Testing Needs

### 15. Testing Checklist
- [ ] Test on mobile devices (iOS/Android)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test RTL (Hebrew) thoroughly
- [ ] Test with large number of contacts (100+)
- [ ] Test offline behavior
- [ ] Test slow connections

---

## 📝 Documentation

### 16. Documentation Tasks
- [ ] Add JSDoc comments to all functions
- [ ] Create API documentation
- [ ] Add inline code comments
- [ ] Create video tutorials
- [ ] Write blog post about the project

---

## 🔒 Security & Privacy

### 17. Security Audit
- [ ] Review all RLS policies
- [ ] Test unauthorized access attempts
- [ ] Add rate limiting
- [ ] Add CAPTCHA on signup (if needed)
- [ ] Privacy policy page
- [ ] Terms of service page
- [ ] GDPR compliance check

---

## 🎯 Performance

### 18. Optimization
- [ ] Add database indexes (some exist)
- [ ] Implement pagination for contacts
- [ ] Add caching where appropriate
- [ ] Optimize images
- [ ] Code splitting
- [ ] Bundle size analysis

---

## 💾 Data Management

### 19. Backup & Export
- [ ] Export all data as JSON
- [ ] Export contacts as CSV
- [ ] Backup questionnaire results
- [ ] Import from backup
- [ ] Delete account functionality

---

## 🌍 Internationalization

### 20. More Languages
- [ ] Add more languages (Spanish, French, etc.)
- [ ] Translate all UI strings
- [ ] Locale-based date/time formatting
- [ ] Currency formatting (if needed)

---

## 📊 Analytics

### 21. Usage Analytics
- [ ] Add privacy-respecting analytics
- [ ] Track feature usage
- [ ] Monitor errors
- [ ] User feedback system
- [ ] Net Promoter Score (NPS)

---

## Quick Wins (Easy to Implement)

✅ **Do These First:**
1. Save questionnaire results (High Priority #1)
2. Add last contact date to contact cards (5 min)
3. Fix loading state flicker (15 min)
4. Add skeleton loaders (30 min)
5. Mobile menu (1 hour)

---

## Notes

- Prioritize based on user feedback
- Focus on core CRM features first
- Keep performance in mind
- Maintain code quality
- Test thoroughly before adding complexity

---

**Last Updated:** 2026-02-05
**By:** AI Assistant (Night Build)
