import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';

export async function GET(request: NextRequest) {
  try {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Gmail integration is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' },
        { status: 500 }
      );
    }

    // Generate OAuth URL
    const authUrl = GmailIntegration.getAuthUrl();
    
    // Redirect to Google OAuth
    return NextResponse.redirect(authUrl);
  } catch (error: any) {
    console.error('Error initiating Gmail OAuth:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initiate Gmail connection' },
      { status: 500 }
    );
  }
}
