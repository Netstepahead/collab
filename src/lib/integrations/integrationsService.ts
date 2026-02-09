// Service for managing integrations
import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '@/types/database';

type Integration = Database['public']['Tables']['integrations']['Row'];
type IntegrationInsert = Database['public']['Tables']['integrations']['Insert'];
type IntegrationUpdate = Database['public']['Tables']['integrations']['Update'];

export class IntegrationsService {
  // Get all integrations for current user
  static async getIntegrations(): Promise<{ data: Integration[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Get integration by provider
  static async getIntegration(provider: string): Promise<{ data: Integration | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('provider', provider)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      return { data: data || null, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Create or update integration
  static async upsertIntegration(
    provider: string,
    integrationData: Omit<IntegrationInsert, 'id' | 'user_id' | 'provider' | 'created_at' | 'updated_at'>
  ): Promise<{ data: Integration | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('integrations')
        .upsert({
          user_id: user.id,
          provider,
          ...integrationData,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,provider',
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Update integration
  static async updateIntegration(
    integrationId: string,
    updates: IntegrationUpdate
  ): Promise<{ data: Integration | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('integrations')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', integrationId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Delete integration
  static async deleteIntegration(integrationId: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('id', integrationId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error as Error };
    }
  }

  // Update last sync time
  static async updateLastSync(integrationId: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('integrations')
        .update({
          last_sync_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', integrationId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error as Error };
    }
  }
}
