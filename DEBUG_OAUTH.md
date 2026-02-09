# Debug OAuth Invalid Client Error

## Check What's Actually Being Sent

The error "invalid_client" means Google doesn't recognize the Client ID. Let's debug what's actually happening.

## Step 1: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"Functions"** tab
5. Look for logs from `/api/integrations/gmail/connect-client`
6. Check what Client ID and Redirect URI are being used

## Step 2: Verify Environment Variables Are Actually Set

The code now logs what it's receiving. Check Vercel logs to see:
- Is `GOOGLE_CLIENT_ID` set?
- Is `GOOGLE_REDIRECT_URI` set?
- What values are being used?

## Step 3: Common Issues

### Issue 1: Environment Variables Not Loading

**Symptom**: Logs show `undefined` or empty values

**Fix**:
1. In Vercel, go to Settings → Environment Variables
2. Make sure variables are set for **Production** environment
3. Redeploy after adding/changing variables
4. Wait 2-3 minutes for deployment to complete

### Issue 2: Client ID Format Wrong

**Symptom**: Client ID doesn't end with `.apps.googleusercontent.com`

**Fix**:
1. Copy Client ID fresh from Google Cloud Console
2. Should be: `123456789-xxx.apps.googleusercontent.com`
3. Update in Vercel
4. Redeploy

### Issue 3: Redirect URI Mismatch

**Symptom**: Logs show different redirect URI than what's in Google Cloud Console

**Fix**:
1. Check logs to see what redirect URI is being used
2. Make sure it matches EXACTLY in Google Cloud Console
3. Both should be: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`

### Issue 4: OAuth Client Not Found

**Symptom**: Error 401: invalid_client

**Possible causes**:
1. Client ID is from wrong project
2. Client ID was deleted
3. OAuth consent screen not configured
4. Client ID has extra characters/spaces

**Fix**:
1. Go to Google Cloud Console → Credentials
2. Verify OAuth client exists
3. Copy Client ID again
4. Make sure no extra spaces when pasting into Vercel

## Step 4: Test the OAuth URL Directly

After checking logs, you can test the OAuth URL:

1. Go to: `https://collab-eight-flame.vercel.app/api/integrations/gmail/connect-client`
2. This should return JSON with `authUrl`
3. Copy the `authUrl` value
4. Check the URL parameters:
   - `client_id` should match your Client ID
   - `redirect_uri` should match what's in Google Cloud Console

## Step 5: Verify Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth client ID
3. Verify:
   - Client ID matches what's in Vercel
   - Redirect URI includes: `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`
   - OAuth consent screen is configured

## Quick Test

Run this in browser console on your Vercel site:

```javascript
fetch('/api/integrations/gmail/connect-client')
  .then(r => r.json())
  .then(data => {
    console.log('OAuth URL:', data.authUrl);
    // Check the URL parameters
    const url = new URL(data.authUrl);
    console.log('Client ID:', url.searchParams.get('client_id'));
    console.log('Redirect URI:', url.searchParams.get('redirect_uri'));
  });
```

This will show you exactly what's being sent to Google.
