// Service for managing contacts with Supabase
import { supabase, isSupabaseConfigured } from './supabase';
import type { Contact, ContactFormData, Interaction } from '@/types/contact';

// Helper function to clean empty strings from form data
// PostgreSQL doesn't accept empty strings for date fields - they need to be null
function cleanFormData(data: ContactFormData | Partial<ContactFormData>) {
  const cleaned: any = { ...data };
  
  // Convert empty strings to undefined so they're not sent to Supabase
  Object.keys(cleaned).forEach(key => {
    if (cleaned[key] === '') {
      cleaned[key] = undefined;
    }
  });
  
  return cleaned;
}

export class ContactsService {
  // Get all contacts for current user
  static async getContacts(): Promise<{ data: Contact[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Get single contact by ID
  static async getContact(id: string): Promise<{ data: Contact | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Create new contact
  static async createContact(contactData: ContactFormData): Promise<{ data: Contact | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const cleanedData = cleanFormData(contactData);

      const { data, error } = await supabase
        .from('contacts')
        .insert({
          user_id: user.id,
          ...cleanedData,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Update contact
  static async updateContact(id: string, contactData: Partial<ContactFormData>): Promise<{ data: Contact | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      
      const cleanedData = cleanFormData(contactData);
      
      const { data, error } = await supabase
        .from('contacts')
        .update(cleanedData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Delete contact
  static async deleteContact(id: string): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  // Search contacts
  static async searchContacts(query: string): Promise<{ data: Contact[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .or(`full_name.ilike.%${query}%,company.ilike.%${query}%,job_title.ilike.%${query}%`)
        .order('full_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Get contacts by tag
  static async getContactsByTag(tag: string): Promise<{ data: Contact[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .contains('tags', [tag])
        .order('full_name', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Add interaction to contact
  static async addInteraction(contactId: string, interaction: {
    interaction_date: string;
    interaction_type: Interaction['interaction_type'];
    notes?: string;
  }): Promise<{ data: Interaction | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('interactions')
        .insert({
          user_id: user.id,
          contact_id: contactId,
          ...interaction,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Get interactions for contact
  static async getContactInteractions(contactId: string): Promise<{ data: Interaction[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }
      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('contact_id', contactId)
        .order('interaction_date', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
