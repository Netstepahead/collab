# Gmail Sync: Service Role Key Required

The Gmail sync needs to match emails to your contacts. In serverless (Vercel), the normal Supabase client often doesn't send the user's JWT to the database, so the contacts query returns no rows.

**Fix:** Use the Supabase **service role** key in the sync API route to fetch your contacts (for the verified user only). Then matching and inserts still use the user's session.

## Setup

1. **Get your Service Role Key**
   - Supabase Dashboard → your project → **Settings** → **API**
   - Under "Project API keys", copy the **service_role** key (secret, not the anon key).

2. **Add it in Vercel**
   - Vercel → your project → **Settings** → **Environment Variables**
   - Add:
     - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
     - **Value:** (paste the service_role key)
     - **Environments:** Production (and Preview if you use it)

3. **Redeploy**
   - After adding or changing env vars, you must **redeploy** for them to apply.
   - Deployments → open the **...** menu on the latest → **Redeploy**, or push a new commit.

## Verify

After redeploying, run **Sync Now** and check the Vercel function logs. You should see:

- `[Gmail Sync] SUPABASE_SERVICE_ROLE_KEY: set`
- `[Gmail Sync] Pre-fetched N contacts for user ...` (N > 0 if you have contacts with emails)

If you see `SUPABASE_SERVICE_ROLE_KEY: not set or invalid`, the variable is missing, wrong, or the deployment didn't pick it up (redeploy after adding it).
