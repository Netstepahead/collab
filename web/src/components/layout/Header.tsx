'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { isSupabaseConfigured } from '@/lib/supabase';

export function Header() {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut, checkAuth } = useAuthStore();

  useEffect(() => {
    if (isSupabaseConfigured()) {
      checkAuth();
    }
  }, [checkAuth]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <img 
              src="/logo-step-ahead-dark.png" 
              alt="Network CRM" 
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {i18n.language === 'he' ? 'בית' : 'Home'}
          </Link>
          <Link
            href="/questionnaire"
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              isActive('/questionnaire') ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {i18n.language === 'he' ? 'שאלון' : 'Questionnaire'}
          </Link>
          {user && (
            <>
              <Link
                href="/contacts"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/contacts') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {i18n.language === 'he' ? 'קשרים' : 'Contacts'}
              </Link>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {i18n.language === 'he' ? 'לוח בקרה' : 'Dashboard'}
              </Link>
            </>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
          >
            {i18n.language === 'en' ? 'עברית' : 'English'}
          </Button>
          
          {/* Auth buttons */}
          {isSupabaseConfigured() && (
            <>
              {loading ? (
                <div className="w-16 h-8 bg-gray-100 animate-pulse rounded" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    {i18n.language === 'he' ? 'התנתק' : 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <Button variant="default" size="sm" onClick={() => router.push('/auth')}>
                  {i18n.language === 'he' ? 'התחבר' : 'Sign In'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
