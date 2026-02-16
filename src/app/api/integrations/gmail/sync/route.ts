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

    // Get user from token first
    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client with user's access token for RLS
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }


    // Get Gmail integration using the authenticated client
    // Query directly to avoid RLS issues
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'gmail')
      .single();
    
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

    // Log first so we can confirm this code path is deployed (must appear before "Fetching emails")
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasServiceRole = Boolean(serviceRoleKey && serviceRoleKey.length > 20 && !serviceRoleKey.includes('your-service-role'));
    console.log(`[Gmail Sync] START user=${user.id} serviceRole=${hasServiceRole ? 'yes' : 'no'}`);

    let contactsForUser: { id: string; email: string | null }[] = [];
    if (supabaseUrl && hasServiceRole && serviceRoleKey) {
      try {
        const adminClient = createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        contactsForUser = await GmailIntegration.fetchContactsForUser(adminClient, user.id);
        console.log(`[Gmail Sync] Pre-fetched ${contactsForUser.length} contacts`);
      } catch (err) {
        console.error('[Gmail Sync] Error fetching contacts with service role:', err);
      }
    } else {
      console.log(`[Gmail Sync] Pre-fetch skipped (no service role key)`);
    }

    // Sync emails (pass auth client for inserts; pre-fetched contacts for matching)
    const { synced, errors, totalEmails, matchedContacts, skippedNoContact } = await gmailIntegration.syncEmails(
      user.id,
      lastSyncAt,
      supabase,
      contactsForUser.length > 0 ? contactsForUser : undefined
    );

    // Update last sync time using authenticated client
    await supabase
      .from('integrations')
      .update({
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', integration.id)
      .eq('user_id', user.id);

    // Build detailed message
    let message = `Synced ${synced} interactions`;
    if (totalEmails > 0) {
      message += ` from ${totalEmails} emails`;
      if (skippedNoContact > 0) {
        message += ` (${skippedNoContact} skipped - no matching contact)`;
      }
    }
    if (errors > 0) {
      message += ` (${errors} errors)`;
    }

    return NextResponse.json({
      success: true,
      synced,
      errors,
      totalEmails,
      matchedContacts,
      skippedNoContact,
      message,
    });
  } catch (error: any) {
    console.error('Error syncing Gmail:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync Gmail' },
      { status: 500 }
    );
  }
}
