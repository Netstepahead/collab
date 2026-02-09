// Service for managing interactions with Supabase
import { supabase, isSupabaseConfigured } from './supabase';
import type { Interaction } from '@/types/contact';
import type { Database } from '@/types/database';

type InteractionInsert = Database['public']['Tables']['interactions']['Insert'];
type InteractionUpdate = Database['public']['Tables']['interactions']['Update'];

// Helper function to clean empty strings from form data
function cleanInteractionData<T extends Partial<InteractionInsert | InteractionUpdate>>(data: T): Partial<InteractionInsert | InteractionUpdate> {
  const cleaned: any = { ...data };
  
  // Convert empty strings to undefined so they're not sent to Supabase
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === '') {
      cleaned[key] = undefined;
    }
  });
  
  return cleaned;
}

export class InteractionsService {
  // Get all interactions for a contact
  static async getContactInteractions(contactId: string): Promise<{ data: Interaction[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('contact_id', contactId)
        .eq('user_id', user.id)
        .order('interaction_date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Get all interactions for current user (across all contacts)
  static async getAllInteractions(): Promise<{ data: Interaction[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('user_id', user.id)
        .order('interaction_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(100); // Limit to recent 100 interactions

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Get recent interactions (for dashboard)
  static async getRecentInteractions(limit: number = 10): Promise<{ data: Interaction[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('user_id', user.id)
        .order('interaction_date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Create a new interaction
  static async createInteraction(
    contactId: string,
    interactionData: Omit<InteractionInsert, 'id' | 'user_id' | 'contact_id' | 'created_at'>
  ): Promise<{ data: Interaction | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const cleanedData = cleanInteractionData(interactionData);

      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('interactions')
        .insert({
          user_id: user.id,
          contact_id: contactId,
          ...cleanedData,
        })
        .select()
        .single();

      if (error) throw error;

      // Update contact's last_contact_date if this interaction is the most recent
      await this.updateContactLastContactDate(contactId, interactionData.interaction_date);

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Update an interaction
  static async updateInteraction(
    interactionId: string,
    updates: InteractionUpdate
  ): Promise<{ data: Interaction | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const cleanedData = cleanInteractionData(updates);

      // @ts-ignore - Supabase type inference issue
      const { data, error } = await supabase
        .from('interactions')
        .update(cleanedData)
        .eq('id', interactionId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      // If interaction_date was updated, check if we need to update contact's last_contact_date
      if (updates.interaction_date && data) {
        await this.updateContactLastContactDate(data.contact_id, updates.interaction_date);
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error as Error };
    }
  }

  // Delete an interaction
  static async deleteInteraction(interactionId: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('interactions')
        .delete()
        .eq('id', interactionId)
        .eq('user_id', user.id);

      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      return { error: error as Error };
    }
  }

  // Helper: Update contact's last_contact_date if this is the most recent interaction
  private static async updateContactLastContactDate(contactId: string, interactionDate: string): Promise<void> {
    try {
      // Get the most recent interaction date for this contact
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: interactions } = await supabase
        .from('interactions')
        .select('interaction_date')
        .eq('contact_id', contactId)
        .eq('user_id', user.id)
        .order('interaction_date', { ascending: false })
        .limit(1);

      if (interactions && interactions.length > 0) {
        const mostRecentDate = interactions[0].interaction_date;
        
        // Update contact's last_contact_date
        // @ts-ignore
        await supabase
          .from('contacts')
          .update({ last_contact_date: mostRecentDate })
          .eq('id', contactId)
          .eq('user_id', user.id);
      }
    } catch (error) {
      // Silently fail - this is a helper function
      console.error('Error updating contact last_contact_date:', error);
    }
  }
}
