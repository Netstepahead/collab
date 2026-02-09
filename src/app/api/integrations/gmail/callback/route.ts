import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';

// This route handles the OAuth callback and returns tokens to client
// The client will then save them via the /save route
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
