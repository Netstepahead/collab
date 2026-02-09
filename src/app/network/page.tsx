'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { NetworkGraph } from '@/components/network/NetworkGraph';
import { ContactsService } from '@/lib/contactsService';
import { useAuthStore } from '@/stores/authStore';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Contact } from '@/types/contact';
import '@/lib/i18n';

export default function NetworkPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (mounted && !authLoading && isSupabaseConfigured() && !user) {
      router.push('/auth');
    }
  }, [mounted, authLoading, user, router]);

  useEffect(() => {
    if (user && isSupabaseConfigured()) {
      loadContacts();
    }
  }, [user]);

  const loadContacts = async () => {
    setLoading(true);
    const { data, error } = await ContactsService.getContacts();
    
    if (error) {
      setError(error.message);
    } else if (data) {
      setContacts(data);
    }
    setLoading(false);
  };

  if (!mounted || authLoading) {
    return null;
  }

  // If Supabase not configured, show fallback UI
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] network-bg">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card rounded-lg p-6">
              <h2 className="font-serif text-[#1B365D] text-xl mb-2">
                {i18n.language === 'he' ? '⚠️ נדרש Supabase' : '⚠️ Supabase Required'}
              </h2>
              <p className="text-gray-600">
                {i18n.language === 'he'
                  ? 'על מנת להשתמש בוויזואליזציה, יש להגדיר Supabase.'
                  : 'To use network visualization, you need to configure Supabase.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] network-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D] mb-2">
              {i18n.language === 'he' ? 'ויזואליזציה של הרשת' : 'Network Visualization'}
            </h1>
            <p className="text-gray-600 font-light">
              {i18n.language === 'he'
                ? 'צפה ברשת הקשרים שלך בצורה ויזואלית'
                : 'View your network of connections visually'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}

          {/* Network Graph */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1B365D] border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-light">
                {i18n.language === 'he' ? 'טוען את הרשת...' : 'Loading network...'}
              </p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card rounded-lg p-12 text-center">
              <p className="text-gray-600 mb-4 font-light">
                {i18n.language === 'he' 
                  ? 'אין קשרים להצגה. הוסף קשרים כדי לראות את הרשת שלך.'
                  : 'No contacts to display. Add contacts to see your network.'}
              </p>
              <button
                onClick={() => router.push('/contacts')}
                className="bg-[#1B365D] hover:bg-[#2a4d80] text-white px-6 py-2 rounded-lg transition-smooth"
              >
                {i18n.language === 'he' ? 'הוסף קשרים' : 'Add Contacts'}
              </button>
            </div>
          ) : (
            <NetworkGraph contacts={contacts} />
          )}
        </div>
      </div>
    </div>
  );
}
