# Test the OAuth URL

## What You're Seeing

The JSON response with `authUrl` is correct! This means:
- ✅ Environment variables are loading
- ✅ OAuth URL is being generated
- ✅ Client ID is being used

## Next Steps

### Option 1: Use the authUrl from JSON (Quick Test)

1. Copy the `authUrl` value from the JSON response
2. Paste it into your browser address bar
3. Press Enter
4. You should be redirected to Google's OAuth consent screen

### Option 2: Click "Connect Gmail" Button (Proper Way)

1. Go to: https://collab-eight-flame.vercel.app/settings/integrations
2. Click the **"Connect Gmail"** button
3. It should automatically redirect you to Google

## Verify the Client ID

From the JSON response, I can see:
- **Client ID in URL**: `p95315909512-tp78s0nn8iv7068pgkdqdbh17c693btr.apps.googleusercontent.com`
- **Redirect URI**: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`

**Check if this matches:**
1. Go to Google Cloud Console → Credentials
2. Click on your OAuth client ID
3. Verify the Client ID matches: `p95315909512-tp78s0nn8iv7068pgkdqdbh17c693btr.apps.googleusercontent.com`
4. Verify redirect URI includes: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`

## If You Get "invalid_client" Error

This means the Client ID in the OAuth URL doesn't match what's in Google Cloud Console.

**Fix:**
1. Copy the Client ID from Google Cloud Console (fresh copy)
2. Update `GOOGLE_CLIENT_ID` in Vercel environment variables
3. Make sure it matches EXACTLY (no spaces, no quotes)
4. Redeploy

## Test the OAuth URL Directly

1. Copy the `authUrl` from the JSON
2. Open it in a new browser tab
3. If it works → You'll see Google's consent screen
4. If it fails → You'll see the "invalid_client" error

This will tell us if the issue is with:
- The OAuth URL generation (working ✅)
- The Client ID matching (might be the issue)
- The redirect URI matching (might be the issue)
