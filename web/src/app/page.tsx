'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import '@/lib/i18n';

export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      title: i18n.language === 'he' ? 'דע את עצמך' : 'Know Yourself',
      description: i18n.language === 'he' 
        ? 'גלה את הארכיטייפ הרשתי שלך דרך שאלון מבוסס מחקר'
        : 'Discover your networking archetype through research-based questionnaire',
      icon: '🎯',
      action: () => router.push('/questionnaire'),
      buttonText: i18n.language === 'he' ? 'התחל שאלון' : 'Start Questionnaire'
    },
    {
      title: i18n.language === 'he' ? 'נהל קשרים' : 'Manage Contacts',
      description: i18n.language === 'he'
        ? 'CRM אישי לניהול והטיפוח של הרשת המקצועית שלך'
        : 'Personal CRM to manage and nurture your professional network',
      icon: '👥',
      action: () => router.push('/contacts'),
      buttonText: i18n.language === 'he' ? 'ניהול קשרים' : 'Manage Contacts'
    },
    {
      title: i18n.language === 'he' ? 'הדוח שלי' : 'My Report',
      description: i18n.language === 'he'
        ? 'צפה בדוח שלך, החוזקות והמלצות לפיתוח'
        : 'View your report, strengths and development recommendations',
      icon: '📊',
      action: () => router.push('/dashboard'),
      buttonText: i18n.language === 'he' ? 'לוח בקרה' : 'Dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {i18n.language === 'he' ? 'ברוכים הבאים לרשת שלך' : 'Welcome to Your Network'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {i18n.language === 'he'
              ? 'פלטפורמה לניהול קשרים אישיים ומקצועיים מבוססת הבנת סגנון הניהול הרשתי שלך'
              : 'A platform for managing personal and professional relationships based on understanding your networking style'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={feature.action}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">
              {i18n.language === 'he' ? 'איך זה עובד?' : 'How It Works?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {i18n.language === 'he' ? 'השלם את השאלון' : 'Complete the Questionnaire'}
                  </h3>
                  <p className="text-gray-600">
                    {i18n.language === 'he'
                      ? '36 שאלות שיעזרו לך להבין את סגנון ניהול הקשרים שלך'
                      : '36 questions to help you understand your relationship management style'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {i18n.language === 'he' ? 'קבל את הדוח שלך' : 'Get Your Report'}
                  </h3>
                  <p className="text-gray-600">
                    {i18n.language === 'he'
                      ? 'גלה את הארכיטייפ שלך, החוזקות והאתגרים'
                      : 'Discover your archetype, strengths and challenges'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {i18n.language === 'he' ? 'נהל את הרשת שלך' : 'Manage Your Network'}
                  </h3>
                  <p className="text-gray-600">
                    {i18n.language === 'he'
                      ? 'השתמש ב-CRM אישי לניהול ופיתוח הקשרים שלך'
                      : 'Use the personal CRM to manage and develop your relationships'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
