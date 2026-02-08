# 🚀 Quick Setup Guide

Get your Personal CRM up and running in 10 minutes!

---

## ✅ Step 1: Check What's Already Done

Your development server should be running. Check:

```bash
# In web/ directory
npm run dev
```

Visit http://localhost:3000 - you should see the home page! 🎉

---

## 🔧 Step 2: Set Up Supabase (Required for Auth & CRM)

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose:
   - Organization: Create new or use existing
   - Name: `network-crm` (or whatever you like)
   - Database Password: Generate strong password (save it!)
   - Region: Choose closest to you
4. Click "Create new project"
5. Wait ~2 minutes ⏰

### 2.2 Run Database Schema

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open `supabase/schema.sql` from your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

This creates all your tables! ✅

### 2.3 Get Your API Credentials

1. Go to **Settings** (gear icon, bottom left)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys** → `anon` `public`: `eyJhbGc...`

### 2.4 Create `.env.local` File

In your `web/` directory:

```bash
# Copy the example
cp .env.local.example .env.local

# Or create manually
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

**Important:** Replace with YOUR actual values from Supabase!

### 2.5 Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

---

## 🎉 Step 3: Test Everything!

### Test 1: Authentication ✅
1. Go to http://localhost:3000
2. Click "Sign In" in header
3. Click "Don't have an account? Sign up"
4. Create account:
   - Full Name: Your Name
   - Email: your@email.com
   - Password: at least 6 characters
5. Click "Sign Up"
6. You should be redirected to Dashboard!

### Test 2: Questionnaire ✅
1. Click "Questionnaire" in header
2. Answer 3 questions on the page
3. Click "Next"
4. Continue through all 12 pages (36 questions)
5. Click "Submit"
6. See your archetype report! 🎯

### Test 3: Contacts CRM ✅
1. Click "Contacts" in header
2. Click "+ Add Contact"
3. Fill in:
   - Full Name: John Doe
   - Email: john@example.com
   - Company: Acme Corp
   - Relationship Type: Professional
   - Connection Strength: 3
4. Click "Add"
5. See your contact card appear!

---

## 🐛 Troubleshooting

### "Supabase Not Configured" Error

**Problem:** `.env.local` not found or values incorrect

**Solution:**
1. Make sure `.env.local` exists in `web/` directory
2. Check that values are correct (no extra spaces)
3. Restart dev server

### "Auth Error" / Can't Sign Up

**Problem:** Database schema not run or RLS policies missing

**Solution:**
1. Go back to Supabase SQL Editor
2. Run `supabase/schema.sql` again
3. Check for error messages
4. Make sure you ran the ENTIRE file

### Can't Add Contacts

**Problem:** Not signed in or database not set up

**Solution:**
1. Sign out and sign in again
2. Check Supabase → Table Editor → see if `contacts` table exists
3. Try adding a contact again

### Page Not Found

**Problem:** Dev server not running

**Solution:**
```bash
cd web
npm run dev
```

---

## 📊 What You Have Now

After setup, you have:

✅ **Home Page** - Landing with navigation
✅ **Questionnaire** - 36 questions, 12 skills
✅ **Report** - Your networking archetype
✅ **Authentication** - Sign up/Sign in
✅ **Contacts CRM** - Add/Edit/Delete contacts
✅ **Dashboard** - Overview (basic)
✅ **Bilingual** - English & Hebrew

---

## 🎯 Next Steps

### Immediate:
1. Complete the questionnaire yourself
2. Add 5-10 test contacts
3. Explore the UI

### Short Term:
- Add your real contacts
- Start documenting interactions
- Use it daily for a week

### Later:
- Deploy to Vercel (see README)
- Invite others to test
- Add more features (see README roadmap)

---

## 📝 Quick Commands Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🆘 Need Help?

1. Check README.md for detailed info
2. Check Supabase logs: Dashboard → Logs
3. Check browser console: F12 → Console
4. Check terminal for errors

---

## 🎉 You're Done!

Your Personal CRM is ready to use!

Try it out:
1. Answer the questionnaire
2. See your archetype
3. Add some contacts
4. Start managing your network!

**Have fun! 🚀**
