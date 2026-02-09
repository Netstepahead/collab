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
    <header className="sticky top-0 z-50 w-full border-b border-[#1B365D]/10 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <img 
              src="/logo-stepahead.svg" 
              alt="StepAhead" 
              className="h-10 md:h-12 w-auto transition-all duration-300"
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
            className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
              isActive('/') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
            }`}
          >
            {i18n.language === 'he' ? 'בית' : 'Home'}
          </Link>
          <Link
            href="/questionnaire"
            className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
              isActive('/questionnaire') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
            }`}
          >
            {i18n.language === 'he' ? 'שאלון' : 'Questionnaire'}
          </Link>
          {user && (
            <>
              <Link
                href="/contacts"
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
                  isActive('/contacts') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
                }`}
              >
                {i18n.language === 'he' ? 'קשרים' : 'Contacts'}
              </Link>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
                  isActive('/dashboard') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
                }`}
              >
                {i18n.language === 'he' ? 'לוח בקרה' : 'Dashboard'}
              </Link>
              <Link
                href="/network"
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
                  isActive('/network') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
                }`}
              >
                {i18n.language === 'he' ? 'רשת' : 'Network'}
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#E87722] ${
                  isActive('/profile') ? 'text-[#E87722] font-semibold' : 'text-[#1B365D]'
                }`}
              >
                {i18n.language === 'he' ? 'פרופיל' : 'Profile'}
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
            className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5 transition-smooth"
          >
            {i18n.language === 'en' ? 'עברית' : 'English'}
          </Button>
          
          {/* Auth buttons */}
          {isSupabaseConfigured() && (
            <>
              {loading ? (
                <div className="w-16 h-8 bg-gray-100 animate-pulse rounded-lg" />
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {user.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-[#1B365D] hover:bg-[#1B365D]/5"
                  >
                    {i18n.language === 'he' ? 'התנתק' : 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => router.push('/auth')}
                  className="bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg"
                >
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
