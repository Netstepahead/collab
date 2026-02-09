# Troubleshooting: OAuth Client Not Found Error

## Error Message
"Access blocked: Authorization Error - The OAuth client was not found. Error 401: invalid_client"

## Common Causes & Solutions

### 1. Incorrect Client ID in .env.local

**Check:**
- Open `.env.local` file
- Verify `GOOGLE_CLIENT_ID` matches exactly what you copied from Google Cloud Console
- Make sure there are no extra spaces or quotes

**Fix:**
```env
GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/integrations/gmail/callback
```

**Important:**
- No quotes around the values
- No spaces before/after the `=`
- Copy the Client ID exactly as shown in Google Cloud Console

### 2. Redirect URI Mismatch

**Check:**
- Go to Google Cloud Console > APIs & Services > Credentials
- Click on your OAuth client ID
- Check "Authorized redirect URIs"
- Make sure it includes: `http://localhost:3000/api/integrations/gmail/callback`

**Fix:**
1. Edit your OAuth client
2. Add redirect URI: `http://localhost:3000/api/integrations/gmail/callback`
3. Save
4. Try again

### 3. OAuth Consent Screen Not Configured

**Check:**
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Make sure you've completed the OAuth consent screen setup
- For Internal apps, you should see your app listed

**Fix:**
- Complete the OAuth consent screen setup (Step 2 in GMAIL_SETUP.md)
- Make sure you selected "Internal" user type
- Save all steps

### 4. Wrong Project Selected

**Check:**
- In Google Cloud Console, verify the project dropdown shows the correct project
- The project where you created the OAuth client

**Fix:**
- Select the correct project from the dropdown
- Verify the Client ID belongs to that project

### 5. Client ID Format Issue

**Check:**
- Client ID should look like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- Should end with `.apps.googleusercontent.com`

**Fix:**
- Copy the Client ID again from Google Cloud Console
- Make sure you copied the entire value

## Step-by-Step Fix

### Step 1: Verify Client ID in Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth client ID (should be named "Step Ahead CRM" or similar)
3. Click on it to view details
4. Copy the **Client ID** (the long string ending in `.apps.googleusercontent.com`)

### Step 2: Update .env.local

1. Open `.env.local` file
2. Replace `GOOGLE_CLIENT_ID` with the exact value you copied
3. Make sure format is:
   ```
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   ```
   (No quotes, no spaces)

### Step 3: Verify Redirect URI

1. In the same OAuth client details page
2. Check "Authorized redirect URIs"
3. Should include: `http://localhost:3000/api/integrations/gmail/callback`
4. If not, click "EDIT" and add it

### Step 4: Restart Server

1. Stop server: `Ctrl + C` in terminal
2. Start again: `npm run dev`
3. Wait for "Ready" message

### Step 5: Try Again

1. Go to: http://localhost:3000/settings/integrations
2. Click "Connect Gmail"
3. Should work now!

## Quick Checklist

- [ ] Client ID copied correctly from Google Cloud Console
- [ ] Client ID format: `xxx.apps.googleusercontent.com`
- [ ] No quotes or spaces in .env.local
- [ ] Redirect URI matches exactly: `http://localhost:3000/api/integrations/gmail/callback`
- [ ] OAuth consent screen is configured
- [ ] Correct project selected in Google Cloud Console
- [ ] Server restarted after changing .env.local

## Still Not Working?

1. **Double-check Client ID**: Copy it fresh from Google Cloud Console
2. **Check browser console**: Press F12, look for errors
3. **Check terminal**: Look for error messages
4. **Verify project**: Make sure you're using credentials from the right project

## Common Mistakes

❌ **Wrong**: `GOOGLE_CLIENT_ID="123456789-xxx.apps.googleusercontent.com"` (with quotes)
✅ **Right**: `GOOGLE_CLIENT_ID=123456789-xxx.apps.googleusercontent.com` (no quotes)

❌ **Wrong**: `GOOGLE_CLIENT_ID = 123456789-xxx` (with spaces)
✅ **Right**: `GOOGLE_CLIENT_ID=123456789-xxx` (no spaces)

❌ **Wrong**: Redirect URI: `http://localhost:3000` (missing callback path)
✅ **Right**: Redirect URI: `http://localhost:3000/api/integrations/gmail/callback`
