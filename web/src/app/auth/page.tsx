'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { isSupabaseConfigured } from '@/lib/supabase';
import '@/lib/i18n';

export default function AuthPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const { user, signIn, signUp } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!mounted) {
    return null;
  }

  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>
                {i18n.language === 'he' ? '⚠️ Supabase לא מוגדר' : '⚠️ Supabase Not Configured'}
              </CardTitle>
              <CardDescription>
                {i18n.language === 'he'
                  ? 'על מנת להשתמש ב-Authentication, יש להגדיר Supabase'
                  : 'To use Authentication, you need to configure Supabase'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p>
                  {i18n.language === 'he'
                    ? '1. צור פרויקט Supabase חדש ב-'
                    : '1. Create a new Supabase project at '}
                  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    supabase.com
                  </a>
                </p>
                <p>
                  {i18n.language === 'he'
                    ? '2. העתק את ה-URL וה-anon key'
                    : '2. Copy the URL and anon key'}
                </p>
                <p>
                  {i18n.language === 'he'
                    ? '3. צור קובץ .env.local עם הערכים'
                    : '3. Create .env.local file with the values'}
                </p>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono">
                  NEXT_PUBLIC_SUPABASE_URL=your-url<br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
                </div>
              </div>
              <Button onClick={() => router.push('/')} className="w-full">
                {i18n.language === 'he' ? 'חזור לעמוד הבית' : 'Back to Home'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          setError(i18n.language === 'he' ? 'אנא הזן שם מלא' : 'Please enter full name');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || (i18n.language === 'he' ? 'שגיאה' : 'Error'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isSignUp
                ? (i18n.language === 'he' ? 'הרשמה' : 'Sign Up')
                : (i18n.language === 'he' ? 'התחברות' : 'Sign In')}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? (i18n.language === 'he' ? 'צור חשבון חדש' : 'Create a new account')
                : (i18n.language === 'he' ? 'התחבר לחשבון שלך' : 'Sign in to your account')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {i18n.language === 'he' ? 'שם מלא' : 'Full Name'}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder={i18n.language === 'he' ? 'הזן שם מלא' : 'Enter full name'}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {i18n.language === 'he' ? 'אימייל' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={i18n.language === 'he' ? 'הזן אימייל' : 'Enter email'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {i18n.language === 'he' ? 'סיסמה' : 'Password'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder={i18n.language === 'he' ? 'הזן סיסמה' : 'Enter password'}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={loading}
              >
                {loading
                  ? (i18n.language === 'he' ? 'מעבד...' : 'Processing...')
                  : isSignUp
                  ? (i18n.language === 'he' ? 'הרשמה' : 'Sign Up')
                  : (i18n.language === 'he' ? 'התחברות' : 'Sign In')}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                  }}
                  className="text-blue-600 hover:underline"
                >
                  {isSignUp
                    ? (i18n.language === 'he' ? 'כבר יש לך חשבון? התחבר' : 'Already have an account? Sign in')
                    : (i18n.language === 'he' ? 'אין לך חשבון? הירשם' : 'Don\'t have an account? Sign up')}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
