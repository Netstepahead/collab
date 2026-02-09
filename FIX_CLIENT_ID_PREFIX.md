# Fix: Remove "p" Prefix from Client ID

## 🔴 Problem Found!

Your Google Cloud Console shows the Client ID as:
```
95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
```

But your Vercel environment variable has an extra "p" prefix:
```
p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
```

This extra "p" is causing the "invalid_client" error!

## ✅ Fix Steps

### 1. Update Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project: **collab**
3. Go to: **Settings** → **Environment Variables**
4. Find `GOOGLE_CLIENT_ID`
5. **Edit** it and remove the "p" prefix
6. Change from:
   ```
   p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
   ```
   To:
   ```
   95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
   ```
7. Click **Save**
8. **Redeploy** your application (or wait for auto-deploy)

### 2. Local Development (Already Fixed)

I've already fixed your `.env.local` file. The Client ID now has the correct value without the "p" prefix.

### 3. Verify After Fix

1. **Wait for Vercel to redeploy** (or manually redeploy)

2. **Test the debug endpoint**:
   ```
   https://collab-eight-flame.vercel.app/api/integrations/gmail/test
   ```
   - Should show `parsedClientId` without the "p" prefix

3. **Test OAuth URL directly**:
   - Copy the `authUrl` from the test endpoint
   - Open it in your browser
   - **Should now show Google's consent screen** ✅

4. **Try connecting Gmail**:
   - Go to: https://collab-eight-flame.vercel.app/settings/integrations
   - Click "Connect Gmail"
   - Should work now!

## 📋 What Was Wrong

The Client ID in Google Cloud Console is:
```
95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
```

But it was stored in Vercel as:
```
p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
```

Google couldn't find a client with the "p" prefix, hence the "invalid_client" error.

## ✅ After Fixing

Once you update Vercel and redeploy, the OAuth flow should work perfectly!
