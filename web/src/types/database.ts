// Database types generated from Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      questionnaire_results: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          answers: Json
          skill_scores: Json
          primary_archetype: string
          secondary_archetype: string | null
          language: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          answers: Json
          skill_scores: Json
          primary_archetype: string
          secondary_archetype?: string | null
          language?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          answers?: Json
          skill_scores?: Json
          primary_archetype?: string
          secondary_archetype?: string | null
          language?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string | null
          phone: string | null
          company: string | null
          job_title: string | null
          relationship_type: string | null
          connection_strength: number | null
          last_contact_date: string | null
          notes: string | null
          tags: string[] | null
          common_ground: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          full_name: string
          email?: string | null
          phone?: string | null
          company?: string | null
          job_title?: string | null
          relationship_type?: string | null
          connection_strength?: number | null
          last_contact_date?: string | null
          notes?: string | null
          tags?: string[] | null
          common_ground?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          company?: string | null
          job_title?: string | null
          relationship_type?: string | null
          connection_strength?: number | null
          last_contact_date?: string | null
          notes?: string | null
          tags?: string[] | null
          common_ground?: string | null
        }
      }
      interactions: {
        Row: {
          id: string
          user_id: string
          contact_id: string
          created_at: string
          interaction_date: string
          interaction_type: string
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          contact_id: string
          created_at?: string
          interaction_date: string
          interaction_type: string
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string
          created_at?: string
          interaction_date?: string
          interaction_type?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
