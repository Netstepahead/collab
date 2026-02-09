# Communication Channel Integration Plan

## Overview
This document outlines the approach for integrating communication channels to automatically log interactions instead of requiring manual user input.

## Integration Architecture

### 1. **Webhook-Based Approach** (Recommended)
- **How it works**: Communication platforms send webhooks to our API when events occur (emails sent/received, calls made, messages sent)
- **Pros**: 
  - Real-time updates
  - No need for OAuth tokens (if using webhook services)
  - Works with multiple platforms
- **Cons**: 
  - Requires webhook endpoint setup
  - Some platforms require paid plans for webhooks

### 2. **API Integration Approach**
- **How it works**: Our backend periodically polls communication APIs or uses OAuth to access user's communication data
- **Pros**: 
  - More control over data fetching
  - Can batch process interactions
- **Cons**: 
  - Requires OAuth setup for each platform
  - Rate limits may apply
  - More complex authentication flow

### 3. **Browser Extension Approach**
- **How it works**: Browser extension captures communication events and sends them to our API
- **Pros**: 
  - Works with web-based platforms (Gmail, LinkedIn, etc.)
  - No API access needed
- **Cons**: 
  - Requires users to install extension
  - Platform-specific development needed

## Recommended Implementation: Hybrid Approach

### Phase 1: Email Integration (Gmail/Outlook)
**Method**: OAuth + Gmail API / Microsoft Graph API

**Steps**:
1. User connects their email account via OAuth
2. Store OAuth tokens securely in database (encrypted)
3. Set up background job to:
   - Fetch recent emails (last 30 days initially)
   - Match email addresses to contacts
   - Create interactions automatically
   - Continue syncing new emails periodically

**Database Schema Addition**:
```sql
CREATE TABLE public.integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL, -- 'gmail', 'outlook', 'whatsapp', etc.
  access_token TEXT NOT NULL, -- Encrypted
  refresh_token TEXT, -- Encrypted
  expires_at TIMESTAMP WITH TIME ZONE,
  enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.interaction_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interaction_id UUID REFERENCES public.interactions(id) ON DELETE CASCADE NOT NULL,
  source_type TEXT NOT NULL, -- 'manual', 'gmail', 'outlook', 'whatsapp', etc.
  source_id TEXT, -- External ID from the platform
  metadata JSONB, -- Additional data from the source
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Phase 2: WhatsApp Integration
**Method**: WhatsApp Business API or Twilio WhatsApp API

**Steps**:
1. User connects WhatsApp Business account
2. Use WhatsApp Business API webhooks
3. Automatically log messages as interactions

### Phase 3: LinkedIn Integration
**Method**: LinkedIn API + OAuth

**Steps**:
1. User connects LinkedIn account
2. Track messages and connection requests
3. Log as interactions

### Phase 4: Calendar Integration (Google Calendar / Outlook)
**Method**: Calendar API + OAuth

**Steps**:
1. User connects calendar
2. Extract meeting participants
3. Match to contacts
4. Create "meeting" interactions automatically

## Implementation Details

### Backend Service Structure

```
src/
  lib/
    integrations/
      baseIntegration.ts          # Base class for all integrations
      gmailIntegration.ts         # Gmail-specific implementation
      outlookIntegration.ts      # Outlook-specific implementation
      whatsappIntegration.ts     # WhatsApp-specific implementation
      linkedinIntegration.ts    # LinkedIn-specific implementation
    syncService.ts              # Background job to sync integrations
  api/
    integrations/
      connect/
        route.ts                # OAuth connection endpoint
      callback/
        route.ts                # OAuth callback handler
      webhook/
        route.ts                # Webhook receiver
      sync/
        route.ts                # Manual sync trigger
```

### Contact Matching Logic

When an interaction is detected from a communication channel:

1. **Email Matching**:
   - Extract email addresses from sender/recipient
   - Match against `contacts.email` field
   - If multiple matches, use most recent contact or prompt user

2. **Phone Matching**:
   - Extract phone numbers
   - Normalize format (remove spaces, dashes, country codes)
   - Match against `contacts.phone` field

3. **Name Matching** (Fallback):
   - Extract names from email headers or message metadata
   - Fuzzy match against `contacts.full_name`
   - Show suggestions to user if confidence < 80%

### User Experience Flow

1. **Setup**:
   - User goes to Settings → Integrations
   - Clicks "Connect Gmail" (or other platform)
   - OAuth flow completes
   - Integration is enabled

2. **Automatic Logging**:
   - Background job runs every 15 minutes
   - Fetches new communications
   - Matches to contacts
   - Creates interactions automatically
   - User sees new interactions in their timeline

3. **Manual Review**:
   - User can review auto-created interactions
   - Can edit or delete if incorrect
   - Can manually link unmatched communications

4. **Conflict Resolution**:
   - If communication matches multiple contacts, show dialog:
     - "This email matches 2 contacts. Which one?"
     - User selects correct contact
     - System learns from user choices

## Security Considerations

1. **Token Storage**: 
   - Encrypt OAuth tokens at rest
   - Use environment variables for encryption keys
   - Rotate tokens automatically

2. **Data Privacy**:
   - Only sync metadata (dates, participants, types)
   - Don't store full email/message content unless user opts in
   - Allow users to disconnect integrations anytime

3. **Rate Limiting**:
   - Respect API rate limits
   - Implement exponential backoff
   - Queue sync jobs if needed

## Next Steps

1. **Start with Gmail Integration** (most common)
   - Set up Google Cloud Project
   - Implement OAuth flow
   - Create Gmail API service
   - Build sync job
   - Test with sample account

2. **Add Integration Management UI**:
   - Settings page for integrations
   - Connect/disconnect buttons
   - Sync status indicators
   - Manual sync trigger

3. **Implement Contact Matching**:
   - Email matching logic
   - Phone matching logic
   - Name fuzzy matching
   - User confirmation flow

4. **Add Interaction Review**:
   - Flag auto-created interactions
   - Allow editing/deleting
   - Show source information

## Technical Requirements

- **Backend**: Next.js API routes or separate Node.js service
- **Queue System**: For background jobs (Vercel Cron, Upstash QStash, or similar)
- **Database**: Already using Supabase PostgreSQL
- **OAuth Libraries**: 
  - `googleapis` for Gmail
  - `@azure/msal-node` for Outlook
  - Platform-specific SDKs for others

## Estimated Timeline

- **Phase 1 (Gmail)**: 2-3 weeks
- **Phase 2 (WhatsApp)**: 1-2 weeks
- **Phase 3 (LinkedIn)**: 1-2 weeks
- **Phase 4 (Calendar)**: 1 week

Total: ~6-8 weeks for full implementation
