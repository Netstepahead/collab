# Personal CRM & Network Capabilities Platform

A comprehensive personal relationship management application that helps users understand their networking style and manage their professional and personal connections strategically.

## 🎯 Project Vision

This application combines:
1. **Self-Assessment** - Understand your networking archetype through a validated questionnaire
2. **Personal CRM** - Manage and nurture your relationships strategically
3. **Network Visualization** - See your network as an interactive graph (coming soon)
4. **Strategic Guidance** - Personalized recommendations based on your archetype

---

## 🚀 Current Status: Phase 1-4 Complete! ✅

### ✅ Phase 1: Foundation & Navigation (COMPLETE)
- [x] Next.js 16 setup with TypeScript & Tailwind CSS
- [x] Bilingual support (English & Hebrew) with RTL
- [x] State management with Zustand
- [x] UI component library (shadcn/ui)
- [x] **Full Navigation System**:
  - Header with navigation menu
  - Home page with feature cards
  - Ability to navigate between sections
  - Responsive design

### ✅ Phase 2: Questionnaire & Report (COMPLETE)
- [x] **Complete Questionnaire Flow** (EXACT copy from original):
  - 3 questions per page
  - Skill title header on each page
  - Original color scheme (#4472C4, #FF6B35)
  - Progress tracking and state persistence
  - 36 questions across 12 networking skills
- [x] **Results/Report Page**:
  - Archetype identification (Magnet, Bridge, Gardener, Pioneer)
  - Skill breakdown visualization
  - Strengths and growth areas
  - Navigation to CRM
- [x] Scoring algorithm (same as original app)
- [x] All original questionnaire data migrated

### ✅ Phase 3: Authentication & Database (COMPLETE)
- [x] **Supabase Integration**:
  - Database schema with RLS policies
  - User profiles table
  - Questionnaire results storage
  - Contacts & interactions tables
- [x] **Authentication System**:
  - Sign up / Sign in
  - Auth state management (Zustand)
  - Protected routes
  - User session persistence
- [x] Database schema with SQL migrations ready

### ✅ Phase 4: CRM Foundation (COMPLETE)
- [x] **Contact Management**:
  - Full CRUD operations (Create, Read, Update, Delete)
  - Contact list with grid view
  - Search functionality
  - Contact form with all fields:
    - Basic info (name, email, phone)
    - Professional info (company, job title)
    - Relationship metadata (type, strength, common ground)
    - Notes
- [x] **ContactsService** for Supabase integration
- [x] Beautiful UI with cards and dialogs

---

## 🗂️ Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── auth/              # Authentication
│   │   ├── questionnaire/     # Questionnaire (3 Q per page)
│   │   ├── results/           # Results/Report
│   │   ├── contacts/          # Contacts CRM
│   │   └── dashboard/         # Dashboard
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, navigation
│   │   ├── questionnaire/     # Questionnaire components
│   │   └── contacts/          # Contact form & components
│   ├── data/
│   │   ├── questions.ts       # 36 questions (EN/HE)
│   │   ├── profiles.ts        # 4 archetypes definitions
│   │   └── skills.ts          # 12 skills names
│   ├── lib/
│   │   ├── i18n.ts           # i18n configuration
│   │   ├── scoringService.ts # Scoring algorithm
│   │   ├── supabase.ts       # Supabase client
│   │   └── contactsService.ts # Contacts CRUD
│   ├── stores/
│   │   ├── questionnaireStore.ts  # Questionnaire state
│   │   └── authStore.ts       # Auth state
│   ├── types/
│   │   ├── questionnaire.ts   # TypeScript types
│   │   ├── database.ts        # Supabase types
│   │   └── contact.ts         # Contact types
│   └── locales/
│       ├── en/
│       └── he/
├── supabase/
│   └── schema.sql            # Database schema
└── public/
    └── images/               # Archetype images
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier is perfect)

### 1. Clone and Install

```bash
cd web
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project:
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait ~2 minutes for setup

#### Run the Database Schema:
1. In Supabase dashboard, go to **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Paste and click "Run"
4. This creates all tables, policies, and triggers

#### Get Your Credentials:
1. Go to **Settings** → **API**
2. Copy:
   - Project URL
   - anon/public key

#### Create `.env.local`:

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Current Features

### 🏠 Home Page
- Feature cards navigation
- Clear value proposition
- Responsive design

### 📋 Questionnaire
- 36 questions across 12 skills
- 3 questions per page
- Skill headers
- Progress tracking
- Auto-save (localStorage)
- Bilingual (EN/HE)

### 📊 Report/Results
- Primary & secondary archetype
- Strengths & challenges
- Skill scores with visualization
- Navigation to CRM

### 👥 Contacts CRM
- Add/Edit/Delete contacts
- Search functionality
- Grid view with cards
- Fields:
  - Name, email, phone
  - Company, job title
  - Relationship type
  - Connection strength (1-5)
  - Common ground
  - Notes
- Protected (requires auth)

### 🔐 Authentication
- Sign up / Sign in
- Email + password
- Protected routes
- Session persistence
- Supabase Auth

---

## 📋 Next Steps (Phase 5+)

### Phase 5: Enhanced CRM
- [ ] Contact detail page
- [ ] Add interactions/notes to contacts
- [ ] Tags system
- [ ] Filter by tags/relationship type
- [ ] Import from CSV
- [ ] Export contacts

### Phase 6: Dashboard & Analytics
- [ ] Save questionnaire results to Supabase
- [ ] View past reports
- [ ] Network statistics
- [ ] Activity timeline
- [ ] Archetype-based insights

### Phase 7: Network Visualization
- [ ] React Flow integration
- [ ] Interactive network graph
- [ ] Node clustering by tags
- [ ] Connection strength visualization
- [ ] Export as image

### Phase 8: Goals & Reminders
- [ ] Set relationship goals
- [ ] Reminders to reach out
- [ ] Track interaction frequency
- [ ] Personalized recommendations

### Phase 9: Advanced Features
- [ ] LinkedIn import
- [ ] Email integration
- [ ] Calendar integration
- [ ] AI-powered insights
- [ ] Collaboration features

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand (with persistence)
- **i18n**: react-i18next
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Vercel (recommended)

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add environment variables in Vercel dashboard:
#    - NEXT_PUBLIC_SUPABASE_URL
#    - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Alternative: Any hosting that supports Next.js

The app will work on:
- Vercel (easiest)
- Netlify
- Railway
- Your own server with Node.js

**No additional server needed!** Supabase handles all backend.

---

## 💰 Costs

### Development & Testing: **$0**
- Vercel Free Tier
- Supabase Free Tier

### Production (when you scale):
- Vercel Pro: $20/month (optional)
- Supabase Pro: $25/month (optional)

**For demo and small user base: Completely free!** 🎉

---

## 🎨 Design Philosophy

- **User-First**: Simple, intuitive interfaces
- **Bilingual**: Full RTL support for Hebrew
- **Responsive**: Mobile-first design
- **Accessible**: Following WCAG guidelines
- **Modern**: Clean, professional aesthetics
- **Fast**: Optimized performance

---

## 📚 Database Schema

See `supabase/schema.sql` for complete schema.

### Main Tables:
- `profiles` - User profiles
- `questionnaire_results` - Quiz results
- `contacts` - Contact information
- `interactions` - Contact history

All tables have Row Level Security (RLS) enabled for data privacy.

---

## 🤝 Contributing

This is a private project. For questions or suggestions, contact the project owner.

---

## 📄 License

Private - All rights reserved

---

## 🎓 Methodology

Questions are based on **Network Capabilities Profile** methodology:

### 4 Archetypes:
- **Magnet** (מוקד משיכה) - Natural network anchor
- **Bridge** (מגשר) - Connects different groups
- **Gardener** (מטפח) - Nurtures relationships
- **Pioneer** (חלוץ) - Actively expands network

### 12 Skills:
1. Building Contacts
2. Maintaining Contacts
3. Deepening Relationships
4. Strategic Networking
5. Network Diversity
6. Reciprocity
7. Trust & Reliability
8. Open Communication
9. Information Brokerage
10. Network Centrality
11. Providing Value
12. Influence & Leadership

---

## 🐛 Known Issues

- Mobile menu not yet implemented (use desktop view for now)
- Network visualization not started
- CSV import not implemented
- No email notifications yet

---

## 📞 Support

For issues or questions, refer to the project documentation or contact the maintainer.

---

**Built with ❤️ for better relationship management**
#   B u i l d   0 2 / 0 8 / 2 0 2 6   1 7 : 2 1 : 2 3  
 