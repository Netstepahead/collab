# Setting Environment Variables in Vercel

## The Problem

You're seeing the error on your **deployed site** (Vercel), but `.env.local` only works **locally**. Vercel needs environment variables set separately.

## Quick Fix: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Sign in if needed
3. Find your project: **"collab"** or **"collab-eight-flame"**
4. Click on the project name

### Step 2: Navigate to Settings

1. Click **"Settings"** tab (top navigation)
2. Click **"Environment Variables"** in the left sidebar

### Step 3: Add Google OAuth Variables

Add these three environment variables one by one:

#### Variable 1: GOOGLE_CLIENT_ID
1. Click **"Add New"** button
2. **Key**: `GOOGLE_CLIENT_ID`
3. **Value**: `p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com`
   - (Or copy from your `.env.local` file)
4. **Environment**: Select all three:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **"Save"**

#### Variable 2: GOOGLE_CLIENT_SECRET
1. Click **"Add New"** button
2. **Key**: `GOOGLE_CLIENT_SECRET`
3. **Value**: `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`
   - (Or copy from your `.env.local` file)
4. **Environment**: Select all three:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **"Save"**

#### Variable 3: GOOGLE_REDIRECT_URI
1. Click **"Add New"** button
2. **Key**: `GOOGLE_REDIRECT_URI`
3. **Value**: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
   - **Important**: Use your actual Vercel domain!
4. **Environment**: Select all three:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development
5. Click **"Save"**

### Step 4: Redeploy

After adding environment variables, you need to redeploy:

**Option A - Automatic (Recommended):**
- Vercel will automatically redeploy when you push to GitHub
- Just push any commit: `git commit --allow-empty -m "Trigger redeploy" && git push`

**Option B - Manual:**
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Confirm redeploy

### Step 5: Verify

1. Wait for deployment to finish (usually 1-2 minutes)
2. Go to: https://collab-eight-flame.vercel.app/settings/integrations
3. The error should be gone
4. You should see "Connect Gmail" button working

## Important Notes

### Different Redirect URIs

You'll need **different redirect URIs** for different environments:

- **Local**: `http://localhost:3000/api/integrations/gmail/callback`
- **Vercel Production**: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
- **Vercel Preview**: `https://your-preview-url.vercel.app/api/integrations/gmail/callback`

### Google Cloud Console Setup

Make sure your OAuth client in Google Cloud Console has **ALL** redirect URIs:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth client ID
3. Click **"EDIT"**
4. Under "Authorized redirect URIs", add:
   - `http://localhost:3000/api/integrations/gmail/callback` (local)
   - `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback` (production)
5. Click **"SAVE"**

## Quick Checklist

- [ ] Added `GOOGLE_CLIENT_ID` to Vercel
- [ ] Added `GOOGLE_CLIENT_SECRET` to Vercel
- [ ] Added `GOOGLE_REDIRECT_URI` to Vercel (with production URL)
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Added production redirect URI to Google Cloud Console
- [ ] Redeployed the application
- [ ] Verified error is gone

## Troubleshooting

### "Still seeing the error after redeploy"
- Wait 2-3 minutes for deployment to complete
- Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check Vercel deployment logs for errors

### "Redirect URI mismatch error"
- Make sure the redirect URI in Vercel matches exactly what's in Google Cloud Console
- Check for trailing slashes or http vs https

### "Environment variables not showing"
- Make sure you saved each variable
- Check that you selected the right environments
- Try redeploying again
