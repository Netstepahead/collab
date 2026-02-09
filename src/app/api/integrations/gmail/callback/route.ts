import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';
import { IntegrationsService } from '@/lib/integrations/integrationsService';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle OAuth error
  if (error) {
    return NextResponse.redirect(
      new URL(`/settings/integrations?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/settings/integrations?error=no_code', request.url)
    );
  }

  try {
    // Exchange code for tokens
    const { accessToken, refreshToken, expiresAt } = await GmailIntegration.getTokens(code);

    // Get user from session (we need to get this from cookies or session)
    // For now, we'll need to pass user_id in state or get from session
    // This is a simplified version - in production, use proper session handling
    
    // Create Supabase client for server-side operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth token in cookies or session
    // For now, we'll need to handle this differently
    // TODO: Implement proper session handling
    
    // For this implementation, we'll need to pass user_id via state parameter
    // or use a session/cookie-based approach
    
    return NextResponse.json(
      { error: 'User session handling needs to be implemented. Please use the client-side flow.' },
      { status: 500 }
    );

    // Once user_id is available:
    // await IntegrationsService.upsertIntegration('gmail', {
    //   access_token: accessToken,
    //   refresh_token: refreshToken,
    //   expires_at: expiresAt?.toISOString() || null,
    //   enabled: true,
    // });

    // return NextResponse.redirect(
    //   new URL('/settings/integrations?success=gmail_connected', request.url)
    // );
  } catch (error: any) {
    console.error('Error in Gmail OAuth callback:', error);
    return NextResponse.redirect(
      new URL(`/settings/integrations?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}
