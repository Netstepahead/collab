# Verify Your Client ID

## Current Client ID in .env.local

From your `.env.local` file:
```
GOOGLE_CLIENT_ID=p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com
```

## What to Check

1. **Go to Google Cloud Console**: https://console.cloud.google.com/apis/credentials
2. **Click on your OAuth client ID**
3. **Copy the Client ID** shown there
4. **Compare** with what's in:
   - Your `.env.local` file
   - Vercel environment variables

## They Must Match Exactly

The Client ID must be **exactly the same** in:
- Google Cloud Console
- Vercel environment variables (`GOOGLE_CLIENT_ID`)
- Your `.env.local` file (for local development)

## Common Issues

### Issue 1: Extra Characters
- ❌ Wrong: `p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com ` (trailing space)
- ✅ Right: `p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com`

### Issue 2: Quotes
- ❌ Wrong: `"p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com"`
- ✅ Right: `p95315909512-tp78s0nn8iv7o68pgkdqdbhl7c693btr.apps.googleusercontent.com`

### Issue 3: Wrong Project
- Make sure you're looking at the Client ID from the **same project** where you enabled Gmail API

## Quick Fix Steps

1. **Google Cloud Console** → Copy Client ID fresh
2. **Vercel** → Update `GOOGLE_CLIENT_ID` environment variable
3. **Redeploy** → Wait for deployment to finish
4. **Test again**
