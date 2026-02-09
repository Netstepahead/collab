// Gmail Integration Service
import { google } from 'googleapis';
import { supabase, isSupabaseConfigured } from '../supabase';
import { InteractionsService } from '../interactionsService';
import type { Contact } from '@/types/contact';

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
    parts?: Array<{
      mimeType: string;
      body: { data?: string };
      parts?: Array<{ mimeType: string; body: { data?: string } }>;
    }>;
  };
  internalDate: string;
}

interface EmailMetadata {
  from: string;
  to: string[];
  subject: string;
  date: Date;
  messageId: string;
  snippet: string;
}

export class GmailIntegration {
  private oauth2Client: any;
  private accessToken: string;
  private refreshToken: string | null;

  constructor(accessToken: string, refreshToken: string | null = null) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/gmail/callback`
    );

    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  // Get OAuth2 authorization URL
  static getAuthUrl(): string {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/gmail/callback`
    );

    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.metadata',
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent', // Force consent to get refresh token
    });
  }

  // Exchange authorization code for tokens
  static async getTokens(code: string): Promise<{ accessToken: string; refreshToken: string | null; expiresAt: Date | null }> {
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/gmail/callback`;
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    );

    console.log('Exchanging token with redirect URI:', redirectUri);

    const { tokens } = await oauth2Client.getToken(code);
    
    return {
      accessToken: tokens.access_token!,
      refreshToken: tokens.refresh_token || null,
      expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    };
  }

  // Refresh access token if needed
  async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    this.oauth2Client.setCredentials({
      refresh_token: this.refreshToken,
    });

    const { credentials } = await this.oauth2Client.refreshAccessToken();
    this.accessToken = credentials.access_token;
    
    return this.accessToken;
  }

  // Get Gmail API client
  private getGmailClient() {
    this.oauth2Client.setCredentials({
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
    });

    return google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  // Fetch recent emails
  async fetchRecentEmails(maxResults: number = 50, afterDate?: Date): Promise<EmailMetadata[]> {
    try {
      const gmail = this.getGmailClient();
      
      const query = afterDate 
        ? `after:${Math.floor(afterDate.getTime() / 1000)}`
        : '';

      const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults,
        q: query,
      });

      const messages = response.data.messages || [];
      const emailMetadata: EmailMetadata[] = [];

      // Fetch full message details for each message
      for (const message of messages.slice(0, maxResults)) {
        try {
          const fullMessage = await gmail.users.messages.get({
            userId: 'me',
            id: message.id!,
            format: 'metadata',
            metadataHeaders: ['From', 'To', 'Subject', 'Date'],
          });

          const headers = fullMessage.data.payload?.headers || [];
          const fromHeader = headers.find(h => h.name === 'From');
          const toHeader = headers.find(h => h.name === 'To');
          const subjectHeader = headers.find(h => h.name === 'Subject');
          const dateHeader = headers.find(h => h.name === 'Date');

          if (fromHeader && toHeader) {
            emailMetadata.push({
              from: this.extractEmail(fromHeader.value),
              to: this.extractEmails(toHeader.value),
              subject: subjectHeader?.value || '',
              date: dateHeader?.value ? new Date(dateHeader.value) : new Date(parseInt(fullMessage.data.internalDate || '0')),
              messageId: message.id!,
              snippet: fullMessage.data.snippet || '',
            });
          }
        } catch (error) {
          console.error(`Error fetching message ${message.id}:`, error);
          // Continue with next message
        }
      }

      return emailMetadata;
    } catch (error: any) {
      if (error.code === 401) {
        // Token expired, try to refresh
        await this.refreshAccessToken();
        return this.fetchRecentEmails(maxResults, afterDate);
      }
      throw error;
    }
  }

  // Extract email address from header value
  private extractEmail(headerValue: string): string {
    const match = headerValue.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    return match ? match[0].toLowerCase() : '';
  }

  // Extract multiple email addresses from header value
  private extractEmails(headerValue: string): string[] {
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
    const matches = headerValue.match(emailRegex);
    return matches ? matches.map(email => email.toLowerCase()) : [];
  }

  // Match email to contact
  static async matchEmailToContact(email: string, userId: string): Promise<string | null> {
    if (!isSupabaseConfigured()) {
      return null;
    }

    try {
      // Try exact match first
      const { data: exactMatch } = await supabase
        .from('contacts')
        .select('id')
        .eq('user_id', userId)
        .eq('email', email.toLowerCase())
        .limit(1)
        .single();

      if (exactMatch) {
        return exactMatch.id;
      }

      // Try partial match (email domain)
      const emailDomain = email.split('@')[1];
      const { data: domainMatch } = await supabase
        .from('contacts')
        .select('id, email')
        .eq('user_id', userId)
        .ilike('email', `%@${emailDomain}`)
        .limit(1)
        .single();

      if (domainMatch) {
        return domainMatch.id;
      }

      return null;
    } catch (error) {
      console.error('Error matching email to contact:', error);
      return null;
    }
  }

  // Sync emails and create interactions
  async syncEmails(userId: string, lastSyncAt?: Date): Promise<{ synced: number; errors: number }> {
    let synced = 0;
    let errors = 0;

    try {
      // Fetch emails since last sync (or last 30 days if first sync)
      const afterDate = lastSyncAt || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const emails = await this.fetchRecentEmails(100, afterDate);

      for (const email of emails) {
        try {
          // Determine if this is a sent or received email
          const userEmail = await this.getUserEmail();
          const isSent = email.to.includes(userEmail);
          const otherPartyEmail = isSent 
            ? email.to.find(e => e !== userEmail) || email.to[0]
            : email.from;

          // Match to contact
          const contactId = await GmailIntegration.matchEmailToContact(otherPartyEmail, userId);
          
          if (!contactId) {
            // Skip if no matching contact found
            continue;
          }

          // Check if interaction already exists for this email
          const { data: existingSource } = await supabase
            .from('interaction_sources')
            .select('interaction_id')
            .eq('source_type', 'gmail')
            .eq('source_id', email.messageId)
            .limit(1)
            .single();

          if (existingSource) {
            // Already synced, skip
            continue;
          }

          // Create interaction
          const { data: interaction, error } = await InteractionsService.createInteraction(
            contactId,
            {
              interaction_date: email.date.toISOString().split('T')[0],
              interaction_type: 'email',
              notes: `Subject: ${email.subject}\n\n${email.snippet}`,
            }
          );

          if (error || !interaction) {
            errors++;
            continue;
          }

          // Create interaction source record
          await supabase
            .from('interaction_sources')
            .insert({
              interaction_id: interaction.id,
              source_type: 'gmail',
              source_id: email.messageId,
              metadata: {
                from: email.from,
                to: email.to,
                subject: email.subject,
                threadId: email.messageId,
              },
            });

          synced++;
        } catch (error) {
          console.error(`Error syncing email ${email.messageId}:`, error);
          errors++;
        }
      }

      return { synced, errors };
    } catch (error) {
      console.error('Error syncing Gmail:', error);
      throw error;
    }
  }

  // Get user's email address
  private async getUserEmail(): Promise<string> {
    const gmail = this.getGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.emailAddress || '';
  }
}
