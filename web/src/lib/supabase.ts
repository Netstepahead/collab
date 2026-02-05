import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Use dummy values if not configured to prevent errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== '' && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
  );
};

// Create a single supabase client for interacting with your database
// Will use dummy values if not configured (but isSupabaseConfigured() will return false)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
