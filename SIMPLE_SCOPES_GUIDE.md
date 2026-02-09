# Simple Guide: Adding Scopes (You're Almost There!)

## What You're Seeing Now

You're on the **Credentials** page with the "Create credentials" dropdown open. Perfect! You're in the right place.

## Simple Steps to Add Scopes

### Step 1: Create OAuth Client ID

1. **Click "OAuth client ID"** from the dropdown menu (the one that's currently open)
2. A form will appear

### Step 2: Fill in the Form

1. **Application type**: Select **"Web application"**
2. **Name**: Enter `Step Ahead CRM` (or any name you want)
3. **Authorized redirect URIs**: Click **"ADD URI"** and add:
   - `http://localhost:3000/api/integrations/gmail/callback`
   - `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
   (or your production domain)

### Step 3: About Scopes

**Important**: You might NOT see a "Scopes" field in this form. That's OK!

**Here's why**: 
- For Internal apps, scopes are often handled automatically
- OR they're configured in the OAuth consent screen (which you already set up)
- The scopes will be requested when users connect their Gmail

### Step 4: Create the Credential

1. Click **"CREATE"** button
2. A popup will appear showing:
   - **Client ID** (copy this!)
   - **Client Secret** (copy this immediately - you'll only see it once!)

### Step 5: Save the Credentials

**IMPORTANT**: Copy both the Client ID and Client Secret right now!

You'll need these for your `.env.local` file:
```
GOOGLE_CLIENT_ID=paste-client-id-here
GOOGLE_CLIENT_SECRET=paste-client-secret-here
```

## About Scopes - Don't Worry!

**The scopes are already configured!** Here's how:

1. When you set up the OAuth consent screen (Step 2), Google knows what your app needs
2. When users connect their Gmail, they'll be asked to grant permission for:
   - Reading Gmail (gmail.readonly)
   - Gmail metadata (gmail.metadata)
3. These scopes are automatically requested during the OAuth flow

## What to Do If You Want to Verify Scopes

If you want to double-check scopes are set:

1. Go back to: **"OAuth consent screen"** (in the left sidebar)
2. Look for your app "Step Ahead CRM"
3. Click on it to edit
4. Look for "Scopes" section or tab
5. If you see it, verify the Gmail scopes are there
6. If you don't see it, that's fine - they're handled automatically

## Bottom Line

**You don't need to manually add scopes right now!**

Just:
1. ✅ Click "OAuth client ID"
2. ✅ Fill in the form (Web application, name, redirect URIs)
3. ✅ Click CREATE
4. ✅ Copy Client ID and Client Secret
5. ✅ Add them to your environment variables

The scopes will work automatically when users connect their Gmail accounts!

## Next Steps After Creating Credentials

1. Copy Client ID and Client Secret
2. Add them to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/integrations/gmail/callback
   ```
3. Restart your development server
4. Test the integration at `/settings/integrations`

That's it! The scopes are handled automatically. 🎉
