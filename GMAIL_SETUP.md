# Gmail Integration Setup Guide

## Prerequisites

1. Google Cloud Project with Gmail API enabled
2. OAuth 2.0 credentials configured
3. Environment variables set up

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

## Step 2: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" (unless you have Google Workspace)
3. Fill in required information:
   - App name: "Step Ahead CRM" (or your app name)
   - User support email
   - Developer contact email
4. Add scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.metadata`
5. Add test users (if in testing mode)
6. Save and continue

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/integrations/gmail/callback`
   - Production: `https://your-domain.com/api/integrations/gmail/callback`
5. Copy the **Client ID** and **Client Secret**

## Step 4: Set Environment Variables

Add these to your `.env.local` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/integrations/gmail/callback
```

For production (Vercel), add these in:
- Vercel Dashboard > Your Project > Settings > Environment Variables

## Step 5: Run Database Migration

Run the SQL file to create the integrations tables:

```sql
-- Run this in Supabase SQL Editor
-- File: supabase/add_integrations_schema.sql
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/settings/integrations`
3. Click "Connect Gmail"
4. Complete OAuth flow
5. Test sync by clicking "Sync Now"

## How It Works

1. **User clicks "Connect Gmail"**:
   - Redirects to Google OAuth consent screen
   - User grants permissions

2. **OAuth Callback**:
   - Receives authorization code
   - Exchanges code for access/refresh tokens
   - Saves tokens to database (encrypted)

3. **Automatic Sync**:
   - Background job runs periodically (to be implemented)
   - Fetches recent emails
   - Matches emails to contacts
   - Creates interactions automatically

4. **Manual Sync**:
   - User clicks "Sync Now"
   - Immediately fetches and processes emails

## Contact Matching Logic

The system matches emails to contacts by:
1. **Exact email match**: Matches sender/recipient email to `contacts.email`
2. **Domain match**: If exact match fails, tries matching by email domain
3. **Skip if no match**: Emails without matching contacts are skipped (can be improved later)

## Security Notes

- OAuth tokens are stored in the database (should be encrypted in production)
- Only Gmail read-only scopes are requested
- Users can disconnect anytime
- Refresh tokens are used to maintain access

## Troubleshooting

### "Gmail integration is not configured"
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Restart your development server after adding env variables

### "OAuth error: access_denied"
- User denied permissions during OAuth flow
- Try connecting again

### "Failed to sync Gmail"
- Check that tokens are valid
- Verify Gmail API is enabled in Google Cloud Console
- Check browser console for detailed error messages

### Sync not finding contacts
- Ensure contacts have email addresses set
- Check that email format matches (case-insensitive)

## Next Steps

- [ ] Set up background sync job (Vercel Cron or similar)
- [ ] Add email content preview in interactions
- [ ] Improve contact matching (fuzzy name matching)
- [ ] Add conflict resolution UI for ambiguous matches
- [ ] Implement token refresh logic
- [ ] Add sync status indicators
