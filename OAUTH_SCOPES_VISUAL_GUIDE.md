# Visual Guide: Adding OAuth Scopes

## Where You Are Now

You're on the **OAuth Overview** page. This is different from the **OAuth Consent Screen** where you add scopes.

## Step-by-Step: Adding Scopes

### Step 1: Navigate to OAuth Consent Screen

**Current page**: OAuth Overview (what you're seeing now)
**Target page**: OAuth Consent Screen

**How to get there**:

**Option A - From Left Sidebar:**
1. Look at the left sidebar
2. Find **"APIs & Services"** (might be collapsed - click to expand)
3. Click **"OAuth consent screen"**

**Option B - Direct Link:**
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Make sure your project is selected (should show "collab-agent-486912" in the header)

**Option C - From Hamburger Menu:**
1. Click the hamburger menu ☰ (top left)
2. Navigate: APIs & Services > OAuth consent screen

### Step 2: Configure Consent Screen

Once you're on the OAuth Consent Screen page:

1. **Choose User Type**:
   - Select **"Internal"** (for Google Workspace)
   - Click **"CREATE"**

2. **Fill App Information**:
   - App name: `Step Ahead CRM`
   - User support email: Select from dropdown
   - Developer contact email: Your email
   - Click **"SAVE AND CONTINUE"**

### Step 3: Add Scopes (THIS IS STEP 4 FROM THE GUIDE)

After saving app information, you'll see a page with multiple steps:

1. **Look for "Scopes" section** (usually Step 2 of 4)
2. You'll see a button: **"ADD OR REMOVE SCOPES"** - Click it!
3. A **popup window** will appear with:
   - A search box at the top
   - A list of available scopes below
4. **In the search box**, type: `gmail`
5. You'll see Gmail-related scopes appear
6. **Check these two boxes**:
   - ☑️ `https://www.googleapis.com/auth/gmail.readonly`
   - ☑️ `https://www.googleapis.com/auth/gmail.metadata`
7. Click **"UPDATE"** button at the bottom of the popup
8. Back on the main page, click **"SAVE AND CONTINUE"**

### Step 4: Complete Setup

- **Test Users**: Skip (for Internal apps)
- **Summary**: Review and finish

## Troubleshooting

### "I don't see 'Add scopes' section"
- Make sure you completed the "App Information" step first
- The scopes step appears AFTER you save the app information
- Try refreshing the page

### "The popup is empty"
- Make sure you typed `gmail` in the search box
- Try typing the full scope URL: `gmail.readonly`
- Check your internet connection

### "I'm stuck on OAuth Overview page"
- The OAuth Overview is different from OAuth Consent Screen
- You need to navigate to "OAuth consent screen" specifically
- Use the direct link: https://console.cloud.google.com/apis/credentials/consent

### "I can't find APIs & Services"
- Click the hamburger menu ☰ (three horizontal lines, top left)
- Look for "APIs & Services" in the menu
- Or use the direct link above

## Visual Checklist

- [ ] Navigated to OAuth Consent Screen (not Overview)
- [ ] Selected "Internal" user type
- [ ] Filled in app information
- [ ] Clicked "ADD OR REMOVE SCOPES" button
- [ ] Searched for "gmail" in popup
- [ ] Checked both Gmail scopes
- [ ] Clicked "UPDATE"
- [ ] Saved and continued

## Quick Links

- **OAuth Consent Screen**: https://console.cloud.google.com/apis/credentials/consent
- **OAuth Overview** (where you are now): https://console.cloud.google.com/auth/overview
- **APIs & Services**: https://console.cloud.google.com/apis
