# Gmail Integration Setup Guide

## Understanding Google Workspace vs Google Cloud Platform

**Google Workspace** (formerly G Suite) = The productivity suite your organization uses (Gmail, Drive, Docs, etc.)

**Google Cloud Platform (GCP)** = The platform where you configure APIs and OAuth credentials

**Important**: Even if you use Google Workspace, you still need to:
- Create a Google Cloud Project (this is separate from your Workspace account)
- Enable APIs in that Cloud Project
- Configure OAuth credentials

Think of it this way:
- **Google Workspace** = Your email/productivity tools
- **Google Cloud Platform** = The developer platform for accessing those tools via APIs

## Prerequisites

1. Google Cloud Project with Gmail API enabled (can be created by anyone with access)
2. OAuth 2.0 credentials configured
3. Environment variables set up
4. Access to Google Workspace admin console (for domain-wide delegation, if needed)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   - **Note**: You can use your Google Workspace account to sign in, but you're creating a Cloud Project
   - The Cloud Project is separate from your Workspace organization
2. Create a new project or select an existing one
   - Project name: "Step Ahead CRM" (or similar)
   - Organization: Select your Google Workspace organization (if available)
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

## Step 2: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. **Choose "Internal"** (since you're using Google Workspace)
   - **Internal** = Only users in your Google Workspace organization can use the app
   - **External** = Anyone with a Google account can use it (requires verification for production)
   - For Google Workspace, "Internal" is recommended for security
3. Fill in required information:
   - App name: "Step Ahead CRM"
   - User support email: Your Workspace admin email
   - Developer contact email: Your email
   - App logo (optional)
4. Add scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.metadata`
5. **No test users needed** for Internal apps (all Workspace users can access)
6. Save and continue

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. **Application name**: "Step Ahead CRM"
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/integrations/gmail/callback`
   - Production: `https://your-domain.com/api/integrations/gmail/callback`
   - **Important**: Use your actual production domain (e.g., `https://collab-eight-flame.vercel.app/api/integrations/gmail/callback`)
6. Click "Create"
7. Copy the **Client ID** and **Client Secret** (you'll only see the secret once!)

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

## Google Workspace Specific Notes

### Domain-Wide Delegation (Optional, for Admin Use)
If you want to access all users' emails (admin feature), you can set up Domain-Wide Delegation:
1. In Google Cloud Console, enable Domain-Wide Delegation
2. In Google Workspace Admin Console, authorize the service account
3. This is advanced and usually not needed for individual user integrations

### Internal vs External Apps
- **Internal** (recommended for Workspace):
  - Only users in your Workspace organization can connect
  - No verification process needed
  - More secure
  - Users see "This app is verified by your organization"
  
- **External**:
  - Any Google user can connect
  - Requires Google verification for production
  - More complex setup

### Workspace Admin Approval
- If your Workspace admin has restricted OAuth apps, you may need approval
- Contact your Workspace admin if users can't connect

## Troubleshooting

### "Gmail integration is not configured"
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Restart your development server after adding env variables
- Verify in Vercel environment variables (for production)

### "OAuth error: access_denied"
- User denied permissions during OAuth flow
- Workspace admin may have restricted OAuth apps
- Try connecting again
- Check Workspace admin console for OAuth app restrictions

### "Failed to sync Gmail"
- Check that tokens are valid
- Verify Gmail API is enabled in Google Cloud Console
- Check browser console for detailed error messages
- Verify the Cloud Project is linked to your Workspace organization

### "This app isn't verified"
- For Internal apps, this shouldn't appear
- If using External app, you need to verify with Google
- Switch to Internal app type if you only need Workspace users

### Sync not finding contacts
- Ensure contacts have email addresses set
- Check that email format matches (case-insensitive)
- Verify the email domain matches your Workspace domain

## Next Steps

- [ ] Set up background sync job (Vercel Cron or similar)
- [ ] Add email content preview in interactions
- [ ] Improve contact matching (fuzzy name matching)
- [ ] Add conflict resolution UI for ambiguous matches
- [ ] Implement token refresh logic
- [ ] Add sync status indicators
