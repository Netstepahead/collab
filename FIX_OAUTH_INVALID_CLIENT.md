# Fix: OAuth Client Not Found (Error 401: invalid_client)

## The Problem

You're getting "The OAuth client was not found" when trying to connect Gmail. This means Google can't find your OAuth client ID.

## Common Causes & Solutions

### 1. Environment Variables Not Set in Vercel

**Check:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify these exist:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REDIRECT_URI`

**Fix:**
1. Add missing variables (see `VERCEL_ENV_SETUP.md`)
2. Make sure `GOOGLE_REDIRECT_URI` is set to: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
3. Redeploy after adding variables

### 2. Wrong Client ID

**Check:**
- Go to Google Cloud Console → APIs & Services → Credentials
- Find your OAuth client ID
- Copy the exact Client ID

**Fix:**
1. Update `GOOGLE_CLIENT_ID` in Vercel with the exact value
2. Should look like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
3. No quotes, no spaces
4. Redeploy

### 3. Redirect URI Mismatch

**This is the most common issue!**

**Check in Google Cloud Console:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth client ID
3. Check "Authorized redirect URIs"
4. Must include: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`

**Fix:**
1. Edit your OAuth client
2. Add redirect URI: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
3. Make sure it matches EXACTLY (including https://, no trailing slash)
4. Save
5. Try connecting again

### 4. OAuth Consent Screen Not Configured

**Check:**
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Make sure OAuth consent screen is configured
- Should show "Step Ahead CRM" or your app name

**Fix:**
- Complete OAuth consent screen setup (Step 2 in `GMAIL_SETUP.md`)
- Make sure you selected "Internal" user type
- Save all steps

### 5. Wrong Project Selected

**Check:**
- In Google Cloud Console, verify the project dropdown shows the correct project
- The project where you created the OAuth client

**Fix:**
- Select the correct project
- Verify Client ID belongs to that project

## Step-by-Step Fix

### Step 1: Verify Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Check these exist:
   ```
   GOOGLE_CLIENT_ID=p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   GOOGLE_REDIRECT_URI=https://collab-eight-flame.vercel.app/api/integrations/gmail/callback
   ```
5. If missing or wrong, update them
6. Redeploy

### Step 2: Verify Google Cloud Console Redirect URI

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth client ID
3. Click **"EDIT"**
4. Under "Authorized redirect URIs", verify you have:
   - `http://localhost:3000/api/integrations/gmail/callback` (for local)
   - `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback` (for production)
5. If missing, add the production one
6. Click **"SAVE"**

### Step 3: Verify Client ID Matches

1. In Google Cloud Console, copy the Client ID
2. Compare with what's in Vercel environment variables
3. They must match EXACTLY
4. No spaces, no quotes, no extra characters

### Step 4: Test Again

1. Wait 1-2 minutes after making changes
2. Go to: https://collab-eight-flame.vercel.app/settings/integrations
3. Click "Connect Gmail"
4. Should work now!

## Quick Checklist

- [ ] `GOOGLE_CLIENT_ID` set in Vercel (matches Google Cloud Console)
- [ ] `GOOGLE_CLIENT_SECRET` set in Vercel
- [ ] `GOOGLE_REDIRECT_URI` set in Vercel: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
- [ ] Redirect URI added to Google Cloud Console OAuth client
- [ ] Redirect URIs match exactly (including https://, no trailing slash)
- [ ] OAuth consent screen configured
- [ ] Correct project selected in Google Cloud Console
- [ ] Redeployed after changing environment variables

## Most Likely Issue

**Redirect URI mismatch** - The redirect URI in Vercel doesn't match what's in Google Cloud Console.

Make sure both have:
- `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
- Exact match (case-sensitive, no trailing slash)

## Still Not Working?

1. **Double-check Client ID**: Copy fresh from Google Cloud Console
2. **Check browser console**: Press F12, look for errors
3. **Check Vercel logs**: Go to Deployments → Latest → Logs
4. **Verify OAuth consent screen**: Make sure it's fully configured
