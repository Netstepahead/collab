# Fix "invalid_client" Error - OAuth Client Not Found

## 🔴 Problem Confirmed

When testing the OAuth URL directly, Google returns:
- **Error**: "The OAuth client was not found"
- **Error Code**: `401: invalid_client`

This means the Client ID `p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com` **does not exist** in your Google Cloud Console (or exists in a different project).

## ✅ Solution: Find or Create the Correct OAuth Client

### Option 1: Find Existing OAuth Client (Recommended)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/apis/credentials

2. **Check the Project Dropdown** (top of page)
   - Make sure you're in the **correct project**
   - The project name might be something like "collab-agent-486912" or similar
   - If you're not sure, check all your projects

3. **Look for OAuth 2.0 Client IDs**
   - Scroll down to "OAuth 2.0 Client IDs" section
   - Look for any existing clients
   - **If you find one**, click on it and:
     - Copy the **Client ID** (should look like `xxxxx.apps.googleusercontent.com`)
     - Copy the **Client secret**
     - Check "Authorized redirect URIs" - make sure it includes:
       ```
       https://collab-eight-flame.vercel.app/api/integrations/gmail/callback
       ```
     - If the redirect URI is missing, **add it**

4. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `GOOGLE_CLIENT_ID` with the correct Client ID
   - Update `GOOGLE_CLIENT_SECRET` with the correct Client secret
   - Make sure `GOOGLE_REDIRECT_URI` is set to:
     ```
     https://collab-eight-flame.vercel.app/api/integrations/gmail/callback
     ```
   - **Redeploy** your application (or wait for auto-deploy)

### Option 2: Create New OAuth Client

If you can't find an existing OAuth client:

1. **Go to**: https://console.cloud.google.com/apis/credentials

2. **Make sure correct project is selected** (check dropdown)

3. **Click "+ CREATE CREDENTIALS** → **OAuth client ID**

4. **If prompted, configure OAuth consent screen first**:
   - User Type: **Internal** (since you're using Google Workspace)
   - App name: "Step Ahead CRM" (or your app name)
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Skip scopes (for Internal apps, scopes are often auto-added)
   - Click **Save and Continue**
   - Add test users if needed
   - Click **Back to Dashboard**

5. **Create OAuth Client ID**:
   - Application type: **Web application**
   - Name: "Collab Gmail Integration" (or any name)
   - **Authorized redirect URIs**: Click **+ ADD URI**
   - Add: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
   - Click **CREATE**

6. **Copy Credentials**:
   - **Client ID**: Copy the full value (looks like `xxxxx.apps.googleusercontent.com`)
   - **Client secret**: Click "Show" and copy it

7. **Update Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Set `GOOGLE_CLIENT_ID` = (the Client ID you just copied)
   - Set `GOOGLE_CLIENT_SECRET` = (the Client secret you just copied)
   - Set `GOOGLE_REDIRECT_URI` = `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
   - **Redeploy** your application

## 🔍 Verify After Fix

1. **Wait for Vercel to redeploy** (or manually redeploy)

2. **Test the debug endpoint again**:
   ```
   https://collab-eight-flame.vercel.app/api/integrations/gmail/test
   ```
   - Should show the new Client ID

3. **Test OAuth URL directly**:
   - Copy the `authUrl` from the test endpoint
   - Open it in your browser
   - **Should now show Google's consent screen** ✅

4. **Try connecting Gmail**:
   - Go to: https://collab-eight-flame.vercel.app/settings/integrations
   - Click "Connect Gmail"
   - Should work now!

## 📋 Quick Checklist

- [ ] Found correct Google Cloud project
- [ ] Found existing OAuth client OR created new one
- [ ] Verified redirect URI is added: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
- [ ] Updated Vercel `GOOGLE_CLIENT_ID` with correct value
- [ ] Updated Vercel `GOOGLE_CLIENT_SECRET` with correct value
- [ ] Verified `GOOGLE_REDIRECT_URI` is set correctly
- [ ] Redeployed application
- [ ] Tested OAuth URL - should show consent screen

## 🎯 Most Common Issue

**Wrong Google Cloud Project Selected**: The OAuth client exists, but you're looking in the wrong project. Check the project dropdown in Google Cloud Console!
