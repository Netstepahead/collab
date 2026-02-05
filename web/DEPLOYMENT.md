# 🚀 Deployment Guide

How to deploy your Personal CRM to production.

---

## 📋 Prerequisites

Before deploying:
- [ ] Tested locally (everything works)
- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Environment variables ready
- [ ] Code committed to Git

---

## 🌐 Option 1: Vercel (Recommended)

**Best for:** Quick deployment, automatic CI/CD, free tier

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Personal CRM ready for deployment"

# Add remote (replace with your repo)
git remote add origin https://github.com/your-username/network-crm.git

# Push
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js!

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `web` ⚠️ IMPORTANT!
**Build Command:** `npm run build` (default)
**Output Directory:** `.next` (default)

### Step 4: Add Environment Variables

In Vercel dashboard, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

**Where to find:**
- Vercel Dashboard → Your Project → Settings → Environment Variables

### Step 5: Deploy!

Click "Deploy" - that's it! ✨

**Your app will be live at:** `https://your-project.vercel.app`

### Step 6: Enable Automatic Deployments

Every push to `main` will auto-deploy!

```bash
# Make changes
git add .
git commit -m "Added new feature"
git push

# Vercel automatically deploys! 🎉
```

---

## ⚙️ Option 2: Netlify

**Best for:** Alternative to Vercel, similar features

### Step 1: Push to GitHub (same as above)

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your repository

### Step 3: Configure Build

**Base directory:** `web`
**Build command:** `npm run build`
**Publish directory:** `web/.next`

### Step 4: Environment Variables

Add in Netlify dashboard:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### Step 5: Deploy!

---

## 🐳 Option 3: Docker (Self-Hosted)

**Best for:** Full control, own server

### Step 1: Create Dockerfile

```dockerfile
# web/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    restart: unless-stopped
```

### Step 3: Deploy

```bash
docker-compose up -d
```

---

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables not committed to Git
- [ ] `.env.local` in `.gitignore`
- [ ] Supabase RLS policies tested
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] CORS configured if needed
- [ ] Rate limiting considered (Supabase has built-in)
- [ ] Error logging set up (optional)

---

## 🌍 Custom Domain

### On Vercel:

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `mynetwork.com`)
3. Follow DNS instructions
4. Add CNAME or A record
5. Wait for DNS propagation (~24 hours max)
6. SSL certificate auto-generated! ✨

### DNS Records:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

---

## 📊 Post-Deployment Checks

After deployment:

### Test These Features:

- [ ] Home page loads
- [ ] Navigation works
- [ ] Sign up creates account
- [ ] Sign in works
- [ ] Questionnaire saves answers
- [ ] Results page displays
- [ ] Add contact works
- [ ] Edit contact works
- [ ] Delete contact works
- [ ] Search works
- [ ] Sign out works
- [ ] Mobile view works
- [ ] Hebrew/English toggle works

### Check These URLs:

```
https://your-app.vercel.app
https://your-app.vercel.app/auth
https://your-app.vercel.app/questionnaire
https://your-app.vercel.app/results
https://your-app.vercel.app/contacts
https://your-app.vercel.app/dashboard
```

---

## 🐛 Troubleshooting

### Issue: "Internal Server Error"

**Cause:** Missing environment variables

**Fix:**
1. Check Vercel → Settings → Environment Variables
2. Make sure both Supabase vars are set
3. Redeploy

### Issue: "Cannot connect to database"

**Cause:** Wrong Supabase URL or key

**Fix:**
1. Check Supabase dashboard for correct values
2. Update environment variables
3. Redeploy

### Issue: "Page not found"

**Cause:** Root directory not set to `web`

**Fix:**
1. Vercel → Settings → General
2. Set Root Directory: `web`
3. Redeploy

### Issue: Auth not working

**Cause:** Supabase redirect URLs not configured

**Fix:**
1. Supabase → Authentication → URL Configuration
2. Add: `https://your-app.vercel.app/**`
3. Try auth again

---

## 📈 Monitoring & Analytics

### Option 1: Vercel Analytics (Built-in)

```bash
# Enable in Vercel dashboard
Project → Analytics → Enable
```

Free tier includes:
- Page views
- Unique visitors
- Top pages
- Referrers

### Option 2: Supabase Dashboard

Monitor:
- Database size
- API requests
- Active users
- Query performance

Go to: Supabase → Database → Usage

---

## 💰 Cost Estimates

### Free Tier (Perfect for Testing):

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domain
- ✅ SSL certificate
- ✅ **Cost: $0**

**Supabase:**
- ✅ 500MB database
- ✅ 1GB file storage
- ✅ 2GB bandwidth
- ✅ 50,000 monthly active users
- ✅ **Cost: $0**

**Total: $0/month for small usage** 🎉

### When You Grow:

**Vercel Pro:** $20/month
- 1TB bandwidth
- More deployments
- Team features

**Supabase Pro:** $25/month
- 8GB database
- 100GB file storage
- 250GB bandwidth

**Total: $45/month for serious usage**

---

## 🔄 Update Process

### Deploy New Changes:

```bash
# Make changes locally
git add .
git commit -m "Added new feature"
git push

# Vercel automatically deploys! ✨
# No manual steps needed
```

### Rollback if Needed:

1. Go to Vercel → Deployments
2. Find previous working version
3. Click "Promote to Production"

---

## 📱 Mobile App (Future)

To create mobile apps later:

### Option 1: PWA (Progressive Web App)
- Add `manifest.json`
- Enable service workers
- Users can "Add to Home Screen"
- Works on iOS & Android

### Option 2: React Native
- Reuse TypeScript types
- Reuse business logic
- Native mobile experience

### Option 3: Capacitor
- Wrap web app as native
- Access device features
- Easier than React Native

---

## 🎯 Recommended Setup for Production

For best results:

1. **Deploy to Vercel**
   - Easiest and fastest
   - Free tier is generous
   - Automatic HTTPS

2. **Use Supabase**
   - Free tier works great
   - Scales automatically
   - Built-in auth & storage

3. **Add Custom Domain** (optional)
   - Looks professional
   - Easy to remember
   - Costs ~$10-15/year

4. **Enable Analytics**
   - Vercel Analytics (free)
   - Track usage
   - Improve UX

**Total monthly cost: $0 for testing, $45 for serious usage**

---

## 📞 Support

### If Deployment Fails:

1. Check Vercel build logs
2. Test locally first (`npm run build`)
3. Verify environment variables
4. Check Supabase connection
5. Review error messages

### Common Commands:

```bash
# Test production build locally
npm run build
npm start

# Clear cache and rebuild
rm -rf .next
npm run build

# Check for errors
npm run lint
```

---

## ✅ Final Checklist

Before sharing with users:

- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Supabase configured
- [ ] All features tested
- [ ] Mobile view checked
- [ ] Custom domain added (optional)
- [ ] Analytics enabled (optional)
- [ ] Privacy policy added (if collecting data)
- [ ] Terms of service added (if needed)

---

## 🎉 You're Live!

Congratulations! Your Personal CRM is now online and ready to use.

**Share the URL with:**
- Team members
- Test users
- Friends for feedback

**Monitor:**
- Vercel analytics
- Supabase dashboard
- User feedback

**Iterate:**
- Add features from TODO.md
- Fix bugs
- Improve UX

---

**Happy deploying! 🚀**

_Need help? Check Vercel docs or Supabase docs_
