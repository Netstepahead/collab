'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import '@/lib/i18n';

export default function DashboardPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isCompleted } = useQuestionnaireStore();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {i18n.language === 'he' ? 'לוח הבקרה שלי' : 'My Dashboard'}
            </h1>
            <p className="text-gray-600">
              {i18n.language === 'he'
                ? 'סקירה כוללת של הפרופיל והפעילות הרשתית שלך'
                : 'Overview of your profile and network activity'}
            </p>
          </div>

          {!isCompleted ? (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>
                  {i18n.language === 'he' ? '👋 ברוך הבא!' : '👋 Welcome!'}
                </CardTitle>
                <CardDescription>
                  {i18n.language === 'he'
                    ? 'התחל את המסע שלך על ידי השלמת השאלון'
                    : 'Start your journey by completing the questionnaire'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {i18n.language === 'he'
                    ? 'כדי לראות את הדוח המלא שלך ולקבל המלצות מותאמות אישית, השלם את השאלון תחילה.'
                    : 'To see your full report and get personalized recommendations, complete the questionnaire first.'}
                </p>
                <Button
                  onClick={() => router.push('/questionnaire')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {i18n.language === 'he' ? 'התחל שאלון' : 'Start Questionnaire'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {i18n.language === 'he' ? 'הארכיטייפ שלי' : 'My Archetype'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/results')}
                      className="w-full"
                    >
                      {i18n.language === 'he' ? 'צפה בדוח' : 'View Report'}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {i18n.language === 'he' ? 'הקשרים שלי' : 'My Contacts'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {i18n.language === 'he' ? 'בקרוב' : 'Coming soon'}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/contacts')}
                      className="w-full"
                    >
                      {i18n.language === 'he' ? 'נהל קשרים' : 'Manage Contacts'}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {i18n.language === 'he' ? 'הרשת שלי' : 'My Network'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {i18n.language === 'he' ? 'בקרוב' : 'Coming soon'}
                    </p>
                    <Button variant="outline" disabled className="w-full">
                      {i18n.language === 'he' ? 'ויזואליזציה' : 'Visualization'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {i18n.language === 'he' ? '🚧 פיצ\'רים נוספים בפיתוח' : '🚧 More Features In Development'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        {i18n.language === 'he'
                          ? 'מטרות ותזכורות לטיפוח קשרים'
                          : 'Goals and reminders for nurturing relationships'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        {i18n.language === 'he'
                          ? 'המלצות מבוססות ארכיטייפ'
                          : 'Archetype-based recommendations'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        {i18n.language === 'he'
                          ? 'Analytics והצגת מגמות'
                          : 'Analytics and trend visualization'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
