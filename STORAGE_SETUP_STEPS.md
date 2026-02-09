# 🚀 Quick Storage Setup Guide

## ✅ Step 1: DONE
You've already added the `avatar_url` column to contacts table!

## 📦 Step 2: Create Storage Buckets (2 minutes)

1. **Go to Supabase Dashboard → Storage** (left sidebar)
2. **Click "New bucket"** button

### Create Bucket 1: `contact-avatars`
- **Name:** `contact-avatars`
- **Public bucket:** ✅ **Check this box** (so images can be accessed)
- **File size limit:** `5242880` (5 MB in bytes)
- **Allowed MIME types:** `image/jpeg,image/png,image/gif,image/webp`
- Click **"Create bucket"**

### Create Bucket 2: `profile-avatars`
- **Name:** `profile-avatars`
- **Public bucket:** ✅ **Check this box**
- **File size limit:** `5242880` (5 MB)
- **Allowed MIME types:** `image/jpeg,image/png,image/gif,image/webp`
- Click **"Create bucket"**

## 🔐 Step 3: Set Storage Policies (1 minute)

1. **Go back to SQL Editor**
2. **Open the file:** `supabase/setup_storage_buckets.sql`
3. **Copy ALL the SQL** (starting from line 8, the policies)
4. **Paste into SQL Editor**
5. **Click "Run"**

That's it! 🎉

---

## 🧪 Test It

After setup:
1. Go to Contacts page
2. Click "Add Contact" or edit an existing contact
3. Click "Upload Image" in the form
4. Select an image
5. Save the contact
6. You should see the avatar on the contact card!

---

**Note:** If you get permission errors, make sure:
- Buckets are marked as **Public**
- Policies were run successfully
- You're logged in to the app
