-- Setup Storage Buckets and Policies for Profile Pictures
-- Run this AFTER creating the buckets manually in Supabase Storage UI

-- Step 1: Create storage buckets (run these in SQL Editor if you prefer SQL, 
-- or create them manually in Storage UI - both work the same)

-- Note: Buckets must be created manually in Storage UI first, then policies below will work

-- Step 2: Storage Policies for contact-avatars bucket
-- These policies allow users to upload/read/update/delete their own contact avatars

-- Allow users to upload contact avatars (in their own folder)
CREATE POLICY IF NOT EXISTS "Users can upload contact avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read contact avatars (public read)
CREATE POLICY IF NOT EXISTS "Users can read contact avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-avatars');

-- Allow users to update their own contact avatars
CREATE POLICY IF NOT EXISTS "Users can update contact avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own contact avatars
CREATE POLICY IF NOT EXISTS "Users can delete contact avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Step 3: Storage Policies for profile-avatars bucket
-- These policies allow users to upload/read/update/delete their own profile avatar

-- Allow users to upload profile avatars
CREATE POLICY IF NOT EXISTS "Users can upload profile avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read profile avatars (public read)
CREATE POLICY IF NOT EXISTS "Users can read profile avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-avatars');

-- Allow users to update their own profile avatars
CREATE POLICY IF NOT EXISTS "Users can update profile avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own profile avatars
CREATE POLICY IF NOT EXISTS "Users can delete profile avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
