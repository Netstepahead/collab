// Contact types for the CRM system

export interface Contact {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  job_title?: string | null;
  relationship_type?: 'professional' | 'personal' | 'family' | 'other' | null;
  connection_strength?: number | null; // 1-5
  last_contact_date?: string | null;
  notes?: string | null;
  tags?: string[] | null;
  common_ground?: string | null;
}

export interface ContactFormData {
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  relationship_type?: 'professional' | 'personal' | 'family' | 'other';
  connection_strength?: number;
  last_contact_date?: string;
  notes?: string;
  tags?: string[];
  common_ground?: string;
}

export interface Interaction {
  id: string;
  user_id: string;
  contact_id: string;
  created_at: string;
  interaction_date: string;
  interaction_type: 'meeting' | 'call' | 'email' | 'message' | 'event' | 'other';
  notes?: string | null;
}
