import { NextRequest, NextResponse } from 'next/server';
import { IntegrationsService } from '@/lib/integrations/integrationsService';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken, expiresAt } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // Get user from token first
    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Verify user and set session for RLS
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Set the session so RLS policies can access auth.uid()
    // We need to create a session object with the access token
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: '', // Not needed for this operation
    });

    // Save integration using the authenticated Supabase client
    // This ensures RLS policies work correctly
    const { data: integration, error } = await IntegrationsService.upsertIntegrationWithClient(
      supabase,
      'gmail',
      {
        access_token: accessToken,
        refresh_token: refreshToken || null,
        expires_at: expiresAt || null,
        enabled: true,
      },
      user.id
    );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      integration,
    });
  } catch (error: any) {
    console.error('Error saving Gmail integration:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save integration' },
      { status: 500 }
    );
  }
}
