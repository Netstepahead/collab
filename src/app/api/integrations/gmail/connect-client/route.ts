import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';

// This endpoint returns the OAuth URL for client-side redirect
export async function GET(request: NextRequest) {
  try {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing OAuth config:', {
        hasClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
      });
      return NextResponse.json(
        { error: 'Gmail integration is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' },
        { status: 500 }
      );
    }

    // Log configuration for debugging (don't log secrets in production)
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/gmail/callback`;
    console.log('OAuth config:', {
      clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
      redirectUri,
      hasRedirectUri: !!process.env.GOOGLE_REDIRECT_URI,
    });

    // Generate OAuth URL
    const authUrl = GmailIntegration.getAuthUrl();
    
    return NextResponse.json({ authUrl });
  } catch (error: any) {
    console.error('Error generating Gmail OAuth URL:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate OAuth URL' },
      { status: 500 }
    );
  }
}
