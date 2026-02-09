import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';

// Debug endpoint to check OAuth configuration
export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET ? '***SET***' : 'NOT SET';
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'NOT SET (using fallback)';
    
    // Generate OAuth URL to check
    let authUrl = '';
    let error = null;
    
    try {
      authUrl = GmailIntegration.getAuthUrl();
    } catch (e: any) {
      error = e.message;
    }

    // Parse the authUrl to extract client_id
    let parsedClientId = '';
    let parsedRedirectUri = '';
    
    if (authUrl) {
      try {
        const url = new URL(authUrl);
        parsedClientId = url.searchParams.get('client_id') || '';
        parsedRedirectUri = url.searchParams.get('redirect_uri') || '';
      } catch (e) {
        // URL parsing failed
      }
    }

    return NextResponse.json({
      environment: {
        GOOGLE_CLIENT_ID: clientId || 'NOT SET',
        GOOGLE_CLIENT_SECRET: clientSecret,
        GOOGLE_REDIRECT_URI: redirectUri,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET',
      },
      generatedOAuthUrl: {
        authUrl: authUrl || error,
        parsedClientId,
        parsedRedirectUri,
        error,
      },
      instructions: {
        step1: 'Compare the parsedClientId above with your Google Cloud Console Client ID',
        step2: 'Make sure they match EXACTLY',
        step3: 'If different, update GOOGLE_CLIENT_ID in Vercel environment variables',
        step4: 'Verify redirect_uri matches what\'s in Google Cloud Console',
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
}
