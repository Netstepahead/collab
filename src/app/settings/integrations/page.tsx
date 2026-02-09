'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { IntegrationsService } from '@/lib/integrations/integrationsService';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { Mail, CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react';
import '@/lib/i18n';
import type { Database } from '@/types/database';

type Integration = Database['public']['Tables']['integrations']['Row'];

export default function IntegrationsPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading) {
      if (!isSupabaseConfigured()) {
        setError(i18n.language === 'he' ? 'Supabase לא מוגדר' : 'Supabase not configured');
        setLoading(false);
        return;
      }

      if (!user) {
        router.push('/auth');
        return;
      }

      loadIntegrations();
    }
  }, [mounted, authLoading, user, router, i18n.language]);

  const loadIntegrations = async () => {
    setLoading(true);
    setError('');
    const { data, error: integrationsError } = await IntegrationsService.getIntegrations();
    
    if (integrationsError) {
      setError(integrationsError.message);
    } else if (data) {
      setIntegrations(data);
    }
    setLoading(false);
  };

  const handleConnectGmail = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get OAuth URL from API
      const response = await fetch('/api/integrations/gmail/connect-client');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to get OAuth URL' }));
        setError(errorData.error || 'Failed to connect Gmail');
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (!data.authUrl) {
        setError('No authorization URL received');
        setLoading(false);
        return;
      }

      // Store callback URL in sessionStorage
      sessionStorage.setItem('gmail_oauth_callback', window.location.href);
      
      // Redirect to Google OAuth
      window.location.href = data.authUrl;
    } catch (error: any) {
      console.error('Error connecting Gmail:', error);
      setError(error.message || 'Failed to connect Gmail');
      setLoading(false);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (!confirm(i18n.language === 'he' ? 'האם אתה בטוח שברצונך לנתק אינטגרציה זו?' : 'Are you sure you want to disconnect this integration?')) {
      return;
    }

    const { error } = await IntegrationsService.deleteIntegration(integrationId);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(i18n.language === 'he' ? 'אינטגרציה נותקה בהצלחה' : 'Integration disconnected successfully');
      setTimeout(() => setSuccess(''), 3000);
      loadIntegrations();
    }
  };

  const handleToggleEnabled = async (integration: Integration) => {
    const { error } = await IntegrationsService.updateIntegration(integration.id, {
      enabled: !integration.enabled,
    });

    if (error) {
      setError(error.message);
    } else {
      loadIntegrations();
    }
  };

  const handleSync = async (integration: Integration) => {
    setSyncing(integration.id);
    setError('');
    setSuccess('');

    try {
      // Get Supabase session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        setError(i18n.language === 'he' ? 'לא ניתן לקבל אסימון אימות' : 'Failed to get authentication token');
        return;
      }

      const response = await fetch('/api/integrations/gmail/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(data.message || (i18n.language === 'he' ? 'סנכרון הושלם בהצלחה' : 'Sync completed successfully'));
        setTimeout(() => setSuccess(''), 5000);
        await IntegrationsService.updateLastSync(integration.id);
        loadIntegrations();
      }
    } catch (error: any) {
      setError(error.message || 'Failed to sync');
    } finally {
      setSyncing(null);
    }
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthSuccess = urlParams.get('oauth_success');
    const error = urlParams.get('error');

    if (error) {
      setError(i18n.language === 'he' ? `שגיאת OAuth: ${error}` : `OAuth error: ${error}`);
      // Clean URL
      window.history.replaceState({}, '', '/settings/integrations');
      return;
    }

    // Handle successful OAuth callback (tokens in URL params from callback route)
    if (oauthSuccess === 'true') {
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
      const expiresAt = urlParams.get('expires_at');

      if (accessToken) {
        handleSaveTokens(accessToken, refreshToken, expiresAt);
      } else {
        setError(i18n.language === 'he' ? 'לא התקבלו אסימונים' : 'No tokens received');
        window.history.replaceState({}, '', '/settings/integrations');
      }
    }
  }, [user]);

  const handleSaveTokens = async (accessToken: string, refreshToken: string | null, expiresAt: string | null) => {
    try {
      setLoading(true);
      setError('');

      if (!user) {
        setError(i18n.language === 'he' ? 'נדרש להתחבר' : 'Please sign in');
        return;
      }

      // Get Supabase session token
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        setError(i18n.language === 'he' ? 'לא ניתן לקבל אסימון אימות' : 'Failed to get authentication token');
        return;
      }

      // Save tokens to database
      const saveResponse = await fetch('/api/integrations/gmail/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
          expiresAt,
        }),
      });

      const saveData = await saveResponse.json();

      if (saveData.error) {
        setError(saveData.error);
      } else {
        setSuccess(i18n.language === 'he' ? 'Gmail חובר בהצלחה' : 'Gmail connected successfully');
        setTimeout(() => setSuccess(''), 3000);
        loadIntegrations();
        // Clean URL - remove OAuth params
        window.history.replaceState({}, '', '/settings/integrations');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to save tokens');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B365D] border-r-transparent"></div>
            <p className="mt-4 text-gray-600 font-light">
              {i18n.language === 'he' ? 'טוען...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const gmailIntegration = integrations.find(i => i.provider === 'gmail');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF8F3] to-[#F5F1E8]">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#1B365D] mb-2">
            {i18n.language === 'he' ? 'אינטגרציות' : 'Integrations'}
          </h1>
          <p className="text-gray-600 font-light">
            {i18n.language === 'he' ? 'חבר ערוצי תקשורת כדי ליצור אינטראקציות אוטומטית' : 'Connect communication channels to automatically log interactions'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        {/* Gmail Integration */}
        <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="font-serif text-[#1B365D]">Gmail</CardTitle>
                  <CardDescription className="text-gray-600">
                    {i18n.language === 'he' ? 'סנכרן אימיילים אוטומטית' : 'Automatically sync emails'}
                  </CardDescription>
                </div>
              </div>
              {gmailIntegration ? (
                <div className="flex items-center gap-2">
                  {gmailIntegration.enabled ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      {i18n.language === 'he' ? 'מחובר' : 'Connected'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <XCircle className="w-4 h-4" />
                      {i18n.language === 'he' ? 'מושבת' : 'Disabled'}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {gmailIntegration ? (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {i18n.language === 'he' 
                      ? 'Gmail מחובר. האימיילים שלך יסונכרנו אוטומטית.'
                      : 'Gmail is connected. Your emails will be synced automatically.'}
                  </p>
                  {gmailIntegration.last_sync_at && (
                    <p className="text-xs text-gray-500">
                      {i18n.language === 'he' 
                        ? `סנכרון אחרון: ${new Date(gmailIntegration.last_sync_at).toLocaleString(i18n.language === 'he' ? 'he-IL' : 'en-US')}`
                        : `Last sync: ${new Date(gmailIntegration.last_sync_at).toLocaleString('en-US')}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleToggleEnabled(gmailIntegration)}
                    variant="outline"
                    className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
                  >
                    {gmailIntegration.enabled 
                      ? (i18n.language === 'he' ? 'השבת' : 'Disable')
                      : (i18n.language === 'he' ? 'הפעל' : 'Enable')}
                  </Button>
                  <Button
                    onClick={() => handleSync(gmailIntegration)}
                    disabled={syncing === gmailIntegration.id || !gmailIntegration.enabled}
                    className="bg-[#1B365D] hover:bg-[#2a4d80] text-white"
                  >
                    {syncing === gmailIntegration.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {i18n.language === 'he' ? 'מסנכרן...' : 'Syncing...'}
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {i18n.language === 'he' ? 'סנכרן עכשיו' : 'Sync Now'}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDisconnect(gmailIntegration.id)}
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    {i18n.language === 'he' ? 'נתק' : 'Disconnect'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">
                  {i18n.language === 'he' 
                    ? 'חבר את חשבון Gmail שלך כדי להתחיל ליצור אינטראקציות אוטומטית מהאימיילים שלך.'
                    : 'Connect your Gmail account to start automatically creating interactions from your emails.'}
                </p>
                <Button
                  onClick={handleConnectGmail}
                  className="bg-[#1B365D] hover:bg-[#2a4d80] text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {i18n.language === 'he' ? 'חבר Gmail' : 'Connect Gmail'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* More integrations coming soon */}
        <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card opacity-60">
          <CardContent className="py-8 text-center">
            <p className="text-gray-500 text-sm">
              {i18n.language === 'he' 
                ? 'עוד אינטגרציות יגיעו בקרוב: Outlook, WhatsApp, LinkedIn'
                : 'More integrations coming soon: Outlook, WhatsApp, LinkedIn'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
