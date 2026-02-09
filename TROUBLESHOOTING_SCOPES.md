# Troubleshooting: Can't Find Scopes Section

## Common Reasons You Don't See Scopes

### 1. You're on the Wrong Page
**Problem**: You're on "OAuth Overview" instead of "OAuth Consent Screen"

**Solution**:
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Make sure you see "OAuth consent screen" in the page title
- NOT "OAuth Overview" or "Google Auth Platform"

### 2. You Haven't Completed App Information Yet
**Problem**: Scopes section only appears AFTER you save app information

**Solution**:
1. Make sure you've:
   - Selected "Internal" user type
   - Clicked "CREATE"
   - Filled in App name, emails
   - Clicked "SAVE AND CONTINUE"
2. The Scopes section appears on the NEXT page after saving

### 3. Internal Apps Might Have Different Flow
**Problem**: For Internal apps, Google might handle scopes differently

**Solution**:
- **Option A**: Scopes might be added automatically - continue to Step 3 (Create Credentials)
- **Option B**: Look for "Scopes" in the left sidebar under "OAuth consent screen"
- **Option C**: Add scopes when creating OAuth credentials (Step 3)

### 4. UI Has Changed
**Problem**: Google Cloud Console UI updates frequently

**Solution**:
- Look for any button/link that says "Scopes", "Add scopes", or "OAuth scopes"
- Check the left sidebar for a "Scopes" menu item
- Try refreshing the page

## Alternative: Add Scopes When Creating Credentials

**If you can't find scopes in Step 2, don't worry!** You can add them when creating OAuth credentials:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. Fill in the form
4. **Look for a "Scopes" field or button** in the credential creation form
5. If you see it, add the Gmail scopes there
6. If you don't see it, the scopes from OAuth consent screen will be used automatically

## What to Do Right Now

### Step 1: Verify You're on the Right Page
- URL should be: `console.cloud.google.com/apis/credentials/consent`
- Page title should say "OAuth consent screen"

### Step 2: Check What You See
- Do you see "App Information" form? → Fill it out and save
- Do you see multiple steps/tabs? → Look for "Scopes" tab
- Do you see a summary/dashboard? → Look for "Scopes" section or link

### Step 3: If Still No Scopes Section
**Don't worry!** Continue to Step 3 (Create OAuth Credentials). The scopes might be:
- Already configured automatically
- Added during credential creation
- Or you can add them later

## Quick Checklist

- [ ] I'm on "OAuth consent screen" (not "OAuth Overview")
- [ ] I've selected "Internal" user type
- [ ] I've filled in App Information and clicked "SAVE AND CONTINUE"
- [ ] I've looked for "Scopes" section/tab/button
- [ ] If not found, I'll continue to Step 3 (Create Credentials)

## Next Steps

1. **If you found scopes**: Add the two Gmail scopes and continue
2. **If you didn't find scopes**: Continue to Step 3 (Create OAuth Credentials) - scopes will be handled there or automatically

The important thing is to complete the OAuth consent screen setup and create the credentials. Scopes can be added at different points in the process depending on Google's UI.
