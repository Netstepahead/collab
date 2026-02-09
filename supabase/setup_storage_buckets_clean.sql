-- Storage Policies for contact-avatars bucket
CREATE POLICY IF NOT EXISTS "Users can upload contact avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY IF NOT EXISTS "Users can read contact avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-avatars');

CREATE POLICY IF NOT EXISTS "Users can update contact avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY IF NOT EXISTS "Users can delete contact avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage Policies for profile-avatars bucket
CREATE POLICY IF NOT EXISTS "Users can upload profile avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY IF NOT EXISTS "Users can read profile avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-avatars');

CREATE POLICY IF NOT EXISTS "Users can update profile avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY IF NOT EXISTS "Users can delete profile avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
