# Vercel Deployment Troubleshooting

## Issue: Build Stuck in "Initializing" State

If your deployment is stuck in "Initializing" state, try these steps:

### Step 1: Check Vercel Status
1. Go to: https://www.vercel-status.com/
2. Check if there are any ongoing incidents
3. If Vercel is experiencing issues, wait for them to resolve

### Step 2: Cancel and Redeploy
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Navigate to your project → Deployments
3. Find the stuck deployment (status: "Initializing")
4. Click the "..." menu on the deployment
5. Select "Cancel Deployment"
6. Wait a few seconds
7. Click "Redeploy" on the previous successful deployment, OR
8. Push a new commit to trigger a fresh deployment

### Step 3: Check Build Logs
1. Click on the stuck deployment
2. Go to the "Build Logs" tab
3. Look for any error messages
4. Common issues:
   - Environment variables missing
   - Build timeout
   - Dependency installation failures

### Step 4: Manual Redeploy
If automatic redeploy doesn't work:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click "Create Deployment"
3. Select the branch: `main`
4. Click "Deploy"

### Step 5: Verify Local Build
Before redeploying, make sure the build works locally:
```bash
npm run build
```

If local build fails, fix the errors first.

### Step 6: Check Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all required variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_REDIRECT_URI`

### Common Causes:
- **Vercel infrastructure issues**: Temporary outages or high load
- **Build timeout**: Very large builds can timeout (rare)
- **Missing environment variables**: Can cause initialization to hang
- **GitHub webhook delays**: Sometimes deployments are delayed

### If Nothing Works:
1. Wait 10-15 minutes (sometimes Vercel just needs time)
2. Contact Vercel support: https://vercel.com/support
3. Check Vercel community: https://github.com/vercel/vercel/discussions
