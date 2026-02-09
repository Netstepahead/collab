import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';

// This route handles the OAuth callback from Google
// Google redirects with GET request containing code in query params
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/settings/integrations?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/settings/integrations?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const { accessToken, refreshToken, expiresAt } = await GmailIntegration.getTokens(code);

    // Store tokens temporarily in query params to pass to client
    // The client will extract them and save via /save route
    const redirectUrl = new URL('/settings/integrations', request.url);
    redirectUrl.searchParams.set('oauth_success', 'true');
    redirectUrl.searchParams.set('access_token', accessToken);
    if (refreshToken) {
      redirectUrl.searchParams.set('refresh_token', refreshToken);
    }
    if (expiresAt) {
      redirectUrl.searchParams.set('expires_at', expiresAt.toISOString());
    }

    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error('Error in Gmail OAuth callback:', error);
    return NextResponse.redirect(
      new URL(`/settings/integrations?error=${encodeURIComponent(error.message || 'Failed to exchange authorization code')}`, request.url)
    );
  }
}

// Also support POST for API calls (if needed)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Exchange code for tokens
    const { accessToken, refreshToken, expiresAt } = await GmailIntegration.getTokens(code);

    return NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      expiresAt: expiresAt?.toISOString() || null,
    });
  } catch (error: any) {
    console.error('Error in Gmail OAuth callback:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to exchange authorization code' },
      { status: 500 }
    );
  }
}
