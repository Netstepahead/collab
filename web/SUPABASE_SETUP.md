# 🔧 Supabase Setup - Step by Step Guide

## Step 1: Find Your Supabase Credentials

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Find your credentials:**
   - Click on the **Settings** icon (⚙️) in the left sidebar
   - Click on **API** in the settings menu
   
3. **Copy these values:**
   
   You'll see two important values:
   
   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....(very long string)
   ```

---

## Step 2: Create `.env.local` File

Now let's create the configuration file:

### Option A: Using File Explorer (Easy!)

1. Open File Explorer
2. Navigate to: `c:\Projects\Collab\web`
3. Find the file: `.env.local.example`
4. **Right-click** on `.env.local.example`
5. Select **Copy**
6. **Right-click** in the same folder
7. Select **Paste**
8. **Rename** the copied file from `.env.local.example - Copy` to `.env.local`
   - Remove "- Copy" and remove ".example"
   - Final name should be: `.env.local`

### Option B: Using Command Line

Open PowerShell in the `web` folder and run:
```powershell
Copy-Item .env.local.example .env.local
```

### Step 3: Edit `.env.local`

1. **Open** the file `.env.local` in your editor (VSCode, Notepad, etc.)
2. You'll see:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Replace** with your actual values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
   ```

4. **Save** the file

---

## Step 3: Run the SQL Schema

Now let's create the database tables:

### 1. Open the SQL file:
   - In VSCode, open: `c:\Projects\Collab\web\supabase\schema.sql`
   - **Select ALL** the content (Ctrl+A)
   - **Copy** it (Ctrl+C)

### 2. Go to Supabase SQL Editor:
   - Go to your Supabase Dashboard
   - Click on **SQL Editor** in the left sidebar (📝 icon)
   - Click **"+ New query"** button

### 3. Run the SQL:
   - **Paste** all the SQL code (Ctrl+V)
   - Click the **"Run"** button (green play button) at the bottom right
   - Wait for it to complete

### 4. Verify Success:
   You should see a success message like:
   ```
   Success. No rows returned
   ```

### 5. Check Your Tables:
   - Click on **Table Editor** in the left sidebar (📊 icon)
   - You should now see 4 tables:
     - `profiles`
     - `questionnaire_results`
     - `contacts`
     - `interactions`

---

## Step 4: Restart Your Dev Server

1. **Stop** the current dev server (Ctrl+C in the terminal)
2. **Start** it again:
   ```bash
   npm run dev
   ```

3. **Open** http://localhost:3000

---

## ✅ Test That It Works

1. Go to http://localhost:3000
2. Click **"Sign In / Sign Up"**
3. The authentication page should now work (no warning message!)
4. Try creating an account
5. Go to **"Contact Management"**
6. Try adding a contact

---

## 🎉 Success!

You now have:
- ✅ Supabase configured
- ✅ Database tables created
- ✅ Full authentication working
- ✅ Contact management working
- ✅ Data persistence

---

## 🚨 Troubleshooting

### "I can't find .env.local.example"
- Make sure you're in the `web` folder, not the root `Collab` folder
- In File Explorer, enable "Show hidden files" (View → Show → Hidden items)

### "The SQL script shows an error"
- Make sure you copied ALL the content from `schema.sql`
- Try running it again (it's safe to run multiple times)
- Check that you're in the SQL Editor, not the database settings

### "Authentication still shows a warning"
- Make sure `.env.local` is in the `web` folder (not `web\src`)
- Check that the file is named `.env.local` (not `.env.local.txt`)
- Restart the dev server
- Hard refresh your browser (Ctrl+Shift+R)

---

## 📞 Need Help?

If you get stuck, tell me:
1. Which step you're on
2. What you see or what error you get
3. I'll help you fix it!

---

**Next Step:** Once this works, we'll deploy to Vercel so your team can access it! 🚀
