# Quick Start: Create Google Cloud Project for Gmail Integration

## Step-by-Step Guide

### Option 1: From the Header (Easiest)

1. **Click "My First Project"** button in the top header (you can see it in your current view)
2. A dropdown will appear showing your projects
3. Click **"NEW PROJECT"** at the top of the dropdown
4. Fill in:
   - **Project name**: `Step Ahead CRM` (or any name you prefer)
   - **Organization**: Select your Google Workspace organization (if available)
   - **Location**: Leave as default or select your region
5. Click **"CREATE"**
6. Wait a few seconds for the project to be created
7. Select the new project from the dropdown

### Option 2: From Project Selector

1. Click the **project dropdown** in the top header (where it says "My First Project")
2. Click **"NEW PROJECT"** button
3. Follow steps 4-7 above

### Option 3: Direct Navigation

1. Go directly to: https://console.cloud.google.com/projectcreate
2. Fill in project details
3. Click **"CREATE"**

## After Creating the Project

Once your project is created:

1. **Select your project** from the dropdown in the header
2. **Enable Gmail API**:
   - Go to: https://console.cloud.google.com/apis/library/gmail.googleapis.com
   - Or navigate: "APIs & Services" > "Library" > Search "Gmail API" > Click "Enable"

3. **Configure OAuth Consent Screen**:
   - Go to: https://console.cloud.google.com/apis/credentials/consent
   - Or navigate: "APIs & Services" > "OAuth consent screen"
   - Choose **"Internal"** (since you're using Google Workspace)
   - Fill in the required fields

4. **Create OAuth Credentials**:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Or navigate: "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Follow the steps in `GMAIL_SETUP.md`

## Quick Links

- **Create Project**: https://console.cloud.google.com/projectcreate
- **Select Project**: Click project dropdown in header
- **Enable Gmail API**: https://console.cloud.google.com/apis/library/gmail.googleapis.com
- **OAuth Consent**: https://console.cloud.google.com/apis/credentials/consent
- **OAuth Credentials**: https://console.cloud.google.com/apis/credentials

## Tips

- **Project Name**: Use something descriptive like "Step Ahead CRM" or "Collab CRM"
- **Organization**: If you see your Google Workspace organization, select it (helps with billing and permissions)
- **Project ID**: Google will auto-generate one (you can change it if needed)
- **Billing**: You may need to enable billing, but Gmail API has a generous free tier

## Next Steps

After creating the project, continue with the setup guide in `GMAIL_SETUP.md` starting from Step 2 (Configure OAuth Consent Screen).
