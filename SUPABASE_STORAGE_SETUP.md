# 📸 Supabase Storage Setup for Profile Pictures

## Step 1: Add avatar_url Column to Contacts Table

Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

Or run the file: `supabase/add_avatar_to_contacts.sql`

## Step 2: Create Storage Buckets

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**

### Create Bucket 1: `contact-avatars`
- **Name:** `contact-avatars`
- **Public bucket:** ✅ Yes (so images can be accessed)
- **File size limit:** 5 MB
- **Allowed MIME types:** `image/jpeg,image/png,image/gif,image/webp`

### Create Bucket 2: `profile-avatars`
- **Name:** `profile-avatars`
- **Public bucket:** ✅ Yes
- **File size limit:** 5 MB
- **Allowed MIME types:** `image/jpeg,image/png,image/gif,image/webp`

## Step 3: Set Up Storage Policies

Run this SQL in your Supabase SQL Editor:

```sql
-- Policy for contact-avatars: Users can upload/read their own contact avatars
CREATE POLICY "Users can upload contact avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can read contact avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'contact-avatars');

CREATE POLICY "Users can update contact avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete contact avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contact-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy for profile-avatars: Users can upload/read their own profile avatar
CREATE POLICY "Users can upload profile avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can read profile avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can update profile avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete profile avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## ✅ That's It!

After completing these steps:
- Users can upload profile pictures for contacts
- Images are stored securely in Supabase Storage
- Images are accessible via public URLs
- Each user can only manage their own images

---

**Note:** The `profiles` table already has `avatar_url` field, so user profile pictures will work once storage is set up.
