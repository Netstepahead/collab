import { NextRequest, NextResponse } from 'next/server';
import { GmailIntegration } from '@/lib/integrations/gmailIntegration';
import { IntegrationsService } from '@/lib/integrations/integrationsService';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // Get user from auth header or session
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

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get Gmail integration
    const { data: integration, error: integrationError } = await IntegrationsService.getIntegration('gmail');
    
    if (integrationError || !integration) {
      return NextResponse.json(
        { error: 'Gmail integration not found. Please connect your Gmail account first.' },
        { status: 404 }
      );
    }

    if (!integration.enabled) {
      return NextResponse.json(
        { error: 'Gmail integration is disabled' },
        { status: 400 }
      );
    }

    // Create Gmail integration instance
    const gmailIntegration = new GmailIntegration(
      integration.access_token,
      integration.refresh_token || null
    );

    // Get last sync time
    const lastSyncAt = integration.last_sync_at 
      ? new Date(integration.last_sync_at)
      : undefined;

    // Sync emails
    const { synced, errors } = await gmailIntegration.syncEmails(user.id, lastSyncAt);

    // Update last sync time
    await IntegrationsService.updateLastSync(integration.id);

    return NextResponse.json({
      success: true,
      synced,
      errors,
      message: `Synced ${synced} interactions${errors > 0 ? ` (${errors} errors)` : ''}`,
    });
  } catch (error: any) {
    console.error('Error syncing Gmail:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync Gmail' },
      { status: 500 }
    );
  }
}
