# Run Database Migration for Integrations

## The Error

"Could not find the table 'public.integrations' in the schema cache"

This means the `integrations` table doesn't exist in your Supabase database yet.

## Quick Fix: Run the SQL Migration

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
   - Or go directly to: https://supabase.com/dashboard/project/_/sql/new

### Step 2: Open the Migration File

1. In your project, open: `supabase/add_integrations_schema.sql`
2. **Copy ALL the SQL** from that file
3. Or use the SQL below

### Step 3: Run the SQL

1. Paste the SQL into the Supabase SQL Editor
2. Click **"RUN"** button (or press `Ctrl + Enter`)
3. Wait for it to complete
4. You should see "Success. No rows returned" or similar success message

### Step 4: Verify

1. Go back to your app: https://collab-eight-flame.vercel.app/settings/integrations
2. Refresh the page
3. The error should be gone!

## Quick Copy-Paste SQL

If you can't find the file, here's the SQL to run:

```sql
-- Add integrations table for storing OAuth tokens and sync status
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  enabled BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  sync_settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, provider)
);

-- Add interaction_sources table to track where interactions came from
CREATE TABLE IF NOT EXISTS public.interaction_sources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  interaction_id UUID REFERENCES public.interactions(id) ON DELETE CASCADE NOT NULL,
  source_type TEXT NOT NULL,
  source_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
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
```

## Step-by-Step Visual Guide

1. **Supabase Dashboard** → Your Project
2. **Left Sidebar** → Click **"SQL Editor"**
3. **New Query** → Click **"New query"** button
4. **Paste SQL** → Paste the SQL above
5. **Run** → Click **"RUN"** button (bottom right)
6. **Success** → Should see "Success" message
7. **Refresh App** → Go back to your app and refresh

## Troubleshooting

### "relation already exists"
- The table already exists, that's fine
- The `IF NOT EXISTS` clause prevents errors
- Just continue

### "function update_updated_at_column does not exist"
- This function should exist from your initial schema
- If not, it's created in `supabase/schema.sql`
- Run that file first if needed

### "Still seeing the error"
- Wait 10-15 seconds after running SQL
- Hard refresh browser: `Ctrl + Shift + R`
- Check Supabase logs for errors

## After Running Migration

Once the migration is complete:
1. ✅ The error will disappear
2. ✅ You'll see the Gmail integration card
3. ✅ You can click "Connect Gmail"
4. ✅ Everything should work!
