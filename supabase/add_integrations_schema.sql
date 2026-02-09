-- Add integrations table for storing OAuth tokens and sync status
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL, -- 'gmail', 'outlook', 'whatsapp', 'linkedin', etc.
  access_token TEXT NOT NULL, -- Encrypted token
  refresh_token TEXT, -- Encrypted refresh token
  expires_at TIMESTAMP WITH TIME ZONE,
  enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_settings JSONB DEFAULT '{}'::jsonb, -- Custom sync settings per provider
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, provider) -- One integration per provider per user
);

-- Add interaction_sources table to track where interactions came from
CREATE TABLE IF NOT EXISTS public.interaction_sources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  interaction_id UUID REFERENCES public.interactions(id) ON DELETE CASCADE NOT NULL,
  source_type TEXT NOT NULL, -- 'manual', 'gmail', 'outlook', 'whatsapp', etc.
  source_id TEXT, -- External ID from the platform (e.g., Gmail message ID)
  metadata JSONB DEFAULT '{}'::jsonb, -- Additional data from the source
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interaction_sources ENABLE ROW LEVEL SECURITY;

-- Integrations policies
CREATE POLICY "Users can view own integrations"
  ON public.integrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations"
  ON public.integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations"
  ON public.integrations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own integrations"
  ON public.integrations FOR DELETE
  USING (auth.uid() = user_id);

-- Interaction sources policies
CREATE POLICY "Users can view own interaction sources"
  ON public.interaction_sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.interactions
      WHERE interactions.id = interaction_sources.interaction_id
      AND interactions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own interaction sources"
  ON public.interaction_sources FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.interactions
      WHERE interactions.id = interaction_sources.interaction_id
      AND interactions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own interaction sources"
  ON public.interaction_sources FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.interactions
      WHERE interactions.id = interaction_sources.interaction_id
      AND interactions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own interaction sources"
  ON public.interaction_sources FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.interactions
      WHERE interactions.id = interaction_sources.interaction_id
      AND interactions.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON public.integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_provider ON public.integrations(provider);
CREATE INDEX IF NOT EXISTS idx_interaction_sources_interaction_id ON public.interaction_sources(interaction_id);
CREATE INDEX IF NOT EXISTS idx_interaction_sources_source_id ON public.interaction_sources(source_id);

-- Add trigger for updated_at
CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON public.integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
