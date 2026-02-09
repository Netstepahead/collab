-- Add avatar_url column to contacts table
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
