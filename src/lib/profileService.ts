// Service for user profile operations
import { supabase, isSupabaseConfigured } from './supabase';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export class ProfileService {
  // Get current user's profile
  static async getProfile(): Promise<{ profile: Profile | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return { profile: data, error: null };
    } catch (error: any) {
      return { profile: null, error: error as Error };
    }
  }

  // Update user profile
  static async updateProfile(updates: ProfileUpdate): Promise<{ profile: Profile | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Clean form data (convert empty strings to null)
      const cleanUpdates: ProfileUpdate = {};
      for (const [key, value] of Object.entries(updates)) {
        if (value === '') {
          cleanUpdates[key as keyof ProfileUpdate] = null as any;
        } else if (value !== undefined) {
          cleanUpdates[key as keyof ProfileUpdate] = value as any;
        }
      }

      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...cleanUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { profile: data, error: null };
    } catch (error: any) {
      return { profile: null, error: error as Error };
    }
  }
}
