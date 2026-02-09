'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Network, Users, CheckSquare2 } from 'lucide-react';
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

  // Mock action recommendations - in the future this will come from the database
  const actionRecommendations = [
    {
      text: i18n.language === 'he' 
        ? 'צור קשר עם תום - הוא עבר לתפקיד חדש, בדוק מה איתו'
        : 'Contact Tom - he moved to a new position, check in on him',
      priority: 'high'
    },
    {
      text: i18n.language === 'he'
        ? 'עדכן את פרטי הקשר של שרה - השתנה האימייל שלה'
        : 'Update Sarah\'s contact info - her email has changed',
      priority: 'medium'
    },
    {
      text: i18n.language === 'he'
        ? 'תזכורת: פגישה עם דוד מחר בשעה 14:00'
        : 'Reminder: Meeting with David tomorrow at 2:00 PM',
      priority: 'medium'
    }
  ];

  const features = [
    {
      title: i18n.language === 'he' ? 'כישורי הרשת שלך' : 'Your Network Skills',
      description: i18n.language === 'he' 
        ? 'השלם את השאלון להערכת כישורי הרשת שלך וצפה בדוח המפורט עם הארכיטייפ, החוזקות והמלצות לפיתוח'
        : 'Complete the assessment questionnaire to understand your networking skills and view your detailed report with archetype, strengths, and development recommendations',
      icon: Network,
      action: () => router.push('/questionnaire'),
      buttonText: i18n.language === 'he' ? 'התחל הערכה' : 'Start Assessment'
    },
    {
      title: i18n.language === 'he' ? 'נהל קשרים' : 'Manage Contacts',
      description: i18n.language === 'he'
        ? 'CRM אישי לניהול והטיפוח של הרשת המקצועית שלך'
        : 'Personal CRM to manage and nurture your professional network',
      icon: Users,
      action: () => router.push('/contacts'),
      buttonText: i18n.language === 'he' ? 'ניהול קשרים' : 'Manage Contacts'
    },
    {
      title: i18n.language === 'he' ? 'לוח פעולות' : 'Action Board',
      description: i18n.language === 'he'
        ? 'המלצות פעולה מותאמות אישית לניהול ופיתוח הרשת שלך'
        : 'Personalized action recommendations to manage and develop your network',
      icon: CheckSquare2,
      action: () => router.push('/dashboard'),
      buttonText: i18n.language === 'he' ? 'צפה בהמלצות' : 'View Recommendations',
      recommendations: actionRecommendations
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] network-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-[#1B365D] leading-tight">
            {i18n.language === 'he' ? 'ברוכים הבאים לרשת שלך' : 'Welcome to Your Network'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            {i18n.language === 'he'
              ? 'פלטפורמה לניהול קשרים אישיים ומקצועיים מבוססת הבנת סגנון הניהול הרשתי שלך'
              : 'A platform for managing personal and professional relationships based on understanding your networking style'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={idx} 
                className="hover:shadow-card transition-smooth border-[#1B365D]/10 bg-white/80 backdrop-blur-sm flex flex-col"
              >
                <CardHeader>
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1B365D]/5 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#1B365D]" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-serif text-[#1B365D]">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600 font-light mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {feature.recommendations && (
                    <div className="mb-4 space-y-2 flex-1">
                      {feature.recommendations.slice(0, 3).map((rec, recIdx) => (
                        <div 
                          key={recIdx}
                          className="text-sm text-gray-600 p-2 rounded-md bg-[#FAF9F6] border border-[#1B365D]/5"
                        >
                          <div className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              rec.priority === 'high' ? 'bg-[#E87722]' : 'bg-[#1B365D]/30'
                            }`} />
                            <span className="font-light">{rec.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button 
                    onClick={feature.action}
                    className="w-full bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg rounded-lg mt-auto"
                  >
                    {feature.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="max-w-3xl mx-auto border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-center font-serif text-[#1B365D] text-2xl">
              {i18n.language === 'he' ? 'איך זה עובד?' : 'How It Works?'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E87722]/10 flex items-center justify-center text-[#E87722] font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#1B365D]">
                    {i18n.language === 'he' ? 'השלם את השאלון' : 'Complete the Questionnaire'}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {i18n.language === 'he'
                      ? '36 שאלות שיעזרו לך להבין את סגנון ניהול הקשרים שלך'
                      : '36 questions to help you understand your relationship management style'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E87722]/10 flex items-center justify-center text-[#E87722] font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#1B365D]">
                    {i18n.language === 'he' ? 'קבל את הדוח שלך' : 'Get Your Report'}
                  </h3>
                  <p className="text-gray-600 font-light">
                    {i18n.language === 'he'
                      ? 'גלה את הארכיטייפ שלך, החוזקות והאתגרים'
                      : 'Discover your archetype, strengths and challenges'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E87722]/10 flex items-center justify-center text-[#E87722] font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#1B365D]">
                    {i18n.language === 'he' ? 'נהל את הרשת שלך' : 'Manage Your Network'}
                  </h3>
                  <p className="text-gray-600 font-light">
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
