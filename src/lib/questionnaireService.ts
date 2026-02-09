// Service for managing questionnaire results with Supabase
import { supabase, isSupabaseConfigured } from './supabase';
import type { QuestionnaireAnswers } from '@/types/questionnaire';

export interface QuestionnaireResult {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  answers: QuestionnaireAnswers;
  skill_scores: Record<number, { total: number; count: number; average: number }>;
  primary_archetype: string;
  secondary_archetype: string | null;
  language: string;
}

export class QuestionnaireService {
  // Save questionnaire results
  static async saveResults(
    answers: QuestionnaireAnswers,
    skillScores: Record<number, { total: number; count: number; average: number }>,
    primaryArchetype: string,
    secondaryArchetype: string | null,
    language: string
  ): Promise<{ data: QuestionnaireResult | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if user already has a result - if so, update it; otherwise create new
      const { data: existingResult } = await supabase
        .from('questionnaire_results')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (existingResult) {
        // Update existing result
        // @ts-ignore - Type inference issue with Supabase client
        const { data, error } = await supabase
          .from('questionnaire_results')
          .update({
            answers: answers as any,
            skill_scores: skillScores as any,
            primary_archetype: primaryArchetype,
            secondary_archetype: secondaryArchetype,
            language: language,
          })
          .eq('id', existingResult.id)
          .select()
          .single();

        if (error) throw error;
        return { data: data as QuestionnaireResult, error: null };
      } else {
        // Create new result
        // @ts-ignore - Type inference issue with Supabase client
        const { data, error } = await supabase
          .from('questionnaire_results')
          .insert({
            user_id: user.id,
            answers: answers as any,
            skill_scores: skillScores as any,
            primary_archetype: primaryArchetype,
            secondary_archetype: secondaryArchetype,
            language: language,
          })
          .select()
          .single();

        if (error) throw error;
        return { data: data as QuestionnaireResult, error: null };
      }
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Get latest questionnaire result for current user
  static async getLatestResult(): Promise<{ data: QuestionnaireResult | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        return { data: null, error: null }; // Not configured, return null (not an error)
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: null }; // Not logged in, return null (not an error)
      }

      const { data, error } = await supabase
        .from('questionnaire_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // If no rows found, that's okay - user just hasn't completed questionnaire yet
        if (error.code === 'PGRST116') {
          return { data: null, error: null };
        }
        throw error;
      }

      return { data: data as QuestionnaireResult, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  // Get all results for current user (for history)
  static async getAllResults(): Promise<{ data: QuestionnaireResult[] | null; error: Error | null }> {
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Please add your Supabase credentials to .env.local');
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('questionnaire_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data as QuestionnaireResult[], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
