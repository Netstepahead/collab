import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user, loading: false }),

      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          
          set({ user: data.user, loading: false });
          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signUp: async (email, password, fullName) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) throw error;
          
          set({ user: data.user, loading: false });
          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, loading: false });
      },

      checkAuth: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          set({ user, loading: false });
        } catch (error) {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Set up auth state listener (only if configured)
if (typeof window !== 'undefined') {
  import('@/lib/supabase').then(({ isSupabaseConfigured, supabase }) => {
    if (isSupabaseConfigured()) {
      supabase.auth.onAuthStateChange((event, session) => {
        useAuthStore.getState().setUser(session?.user ?? null);
      });
    }
  });
}
