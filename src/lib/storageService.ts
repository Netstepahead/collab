// Service for uploading images to Supabase Storage
import { supabase, isSupabaseConfigured } from './supabase';

export class StorageService {
  // Upload contact avatar
  static async uploadContactAvatar(
    file: File,
    contactId: string
  ): Promise<{ url: string | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create file path: {user_id}/{contact_id}_{timestamp}.{ext}
      // This matches the policy which checks foldername(name)[1] = user_id
      const fileExt = file.name.split('.').pop();
      const fileName = `${contactId}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('contact-avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        // Provide more helpful error messages
        if (uploadError.message?.includes('new row violates row-level security policy')) {
          throw new Error('Permission denied. Please check storage bucket policies are set up correctly.');
        }
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('contact-avatars')
        .getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (error: any) {
      return { url: null, error: error as Error };
    }
  }

  // Upload user profile avatar
  static async uploadProfileAvatar(
    file: File,
    userId: string
  ): Promise<{ url: string | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      // Create file path: {user_id}/{timestamp}_{filename}
      // This matches the policy which checks foldername(name)[1] = user_id
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('profile-avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true, // Allow overwriting
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('profile-avatars')
        .getPublicUrl(filePath);

      return { url: data.publicUrl, error: null };
    } catch (error) {
      return { url: null, error: error as Error };
    }
  }

  // Delete avatar
  static async deleteAvatar(filePath: string, bucket: 'contact-avatars' | 'profile-avatars'): Promise<{ error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured');
      }

      // Extract path from URL if full URL is provided
      const path = filePath.includes('/storage/v1/object/public/') 
        ? filePath.split('/storage/v1/object/public/')[1]?.split('/').slice(1).join('/')
        : filePath;

      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
