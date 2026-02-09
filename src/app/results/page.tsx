'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import { calculateScores, determineProfile } from '@/lib/scoringService';
import { QuestionnaireService } from '@/lib/questionnaireService';
import { profiles } from '@/data/profiles';
import { skillNames } from '@/data/questions';
import type { QuestionnaireAnswers } from '@/types/questionnaire';
import '@/lib/i18n';

export default function ResultsPage() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [savedResult, setSavedResult] = useState<any>(null);
  const { answers, language, isCompleted, resetQuestionnaire } = useQuestionnaireStore();

  // Try to load saved results if user hasn't completed questionnaire in current session
  useEffect(() => {
    const loadSavedResults = async () => {
      if (!isCompleted || Object.keys(answers).length === 0) {
        const { data, error } = await QuestionnaireService.getLatestResult();
        if (data && !error) {
          setSavedResult(data);
          setLoadingSaved(false);
          return;
        }
      }
      setLoadingSaved(false);
    };
    loadSavedResults();
  }, []);

  useEffect(() => {
    setMounted(true);
    // Only redirect if no saved results and no current completion
    if (!loadingSaved && !isCompleted && Object.keys(answers).length === 0 && !savedResult) {
      router.push('/');
    }
  }, [isCompleted, answers, router, loadingSaved, savedResult]);

  // Save results when component mounts
  useEffect(() => {
    if (mounted && isCompleted && Object.keys(answers).length > 0 && !saved && !saving) {
      const saveResults = async () => {
        setSaving(true);
        const skillScores = calculateScores(answers);
        const profileResult = determineProfile(skillScores);
        const currentLanguage = (language || i18n.language) as 'en' | 'he';
        
        const { error } = await QuestionnaireService.saveResults(
          answers,
          skillScores,
          profileResult.primary,
          profileResult.secondary,
          currentLanguage
        );

        if (error) {
          console.error('Error saving questionnaire results:', error);
        } else {
          setSaved(true);
        }
        setSaving(false);
      };

      saveResults();
    }
  }, [mounted, isCompleted, answers, language, i18n.language, saved, saving]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (!mounted || loadingSaved) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] network-bg">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-[#1B365D]">{i18n.language === 'he' ? 'טוען...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // Use saved results if available, otherwise use current session results
  let skillScores: Record<number, { total: number; count: number; average: number }>;
  let profileResult: { primary: string; secondary: string | null };
  let currentLanguage: 'en' | 'he';
  let resultAnswers: QuestionnaireAnswers;

  if (savedResult) {
    skillScores = savedResult.skill_scores;
    profileResult = {
      primary: savedResult.primary_archetype,
      secondary: savedResult.secondary_archetype,
    };
    currentLanguage = (savedResult.language || i18n.language) as 'en' | 'he';
    resultAnswers = savedResult.answers;
  } else if (isCompleted && Object.keys(answers).length > 0) {
    skillScores = calculateScores(answers);
    profileResult = determineProfile(skillScores);
    currentLanguage = (language || i18n.language) as 'en' | 'he';
    resultAnswers = answers;
  } else {
    return null;
  }

  const primaryProfile = profiles[currentLanguage][profileResult.primary];
  const secondaryProfile = profileResult.secondary 
    ? profiles[currentLanguage][profileResult.secondary]
    : null;

  const handleReset = () => {
    resetQuestionnaire();
    router.push('/questionnaire');
  };

  const handleContinueToCRM = () => {
    router.push('/contacts');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] network-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D]">
            {i18n.language === 'he' ? 'הפרופיל הרשתי שלך' : 'Your Network Profile'}
          </h1>
          <p className="text-muted-foreground">
            {i18n.language === 'he'
              ? 'על סמך התשובות שלך, הנה הפרופיל הרשתי שלך'
              : 'Based on your responses, here\'s your networking profile'}
          </p>
          {saving && (
            <p className="text-sm text-gray-500 mt-2">
              {i18n.language === 'he' ? 'שומר את הפרופיל שלך...' : 'Saving your profile...'}
            </p>
          )}
          {saved && (
            <p className="text-sm text-green-600 mt-2">
              {i18n.language === 'he' ? '✓ הפרופיל נשמר בהצלחה' : '✓ Profile saved successfully'}
            </p>
          )}
        </div>

        {/* Primary Archetype */}
        <Card className="border-2 border-[#1B365D]/20 bg-white/80 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-[#1B365D]">{primaryProfile.name}</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {i18n.language === 'he' ? 'הארכיטייפ הראשי שלך' : 'Your Primary Archetype'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 font-light">{primaryProfile.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-[#1B365D]">
                  ✓ {i18n.language === 'he' ? 'החוזקות שלך' : 'Your Strengths'}
                </h3>
                <ul className="space-y-2">
                  {primaryProfile.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#1B365D] mr-2">•</span>
                      <span className="text-gray-700 font-light">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-[#E87722]">
                  ⚡ {i18n.language === 'he' ? 'תחומים לפיתוח' : 'Areas for Growth'}
                </h3>
                <ul className="space-y-2">
                  {primaryProfile.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#E87722] mr-2">•</span>
                      <span className="text-gray-700 font-light">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Indicators */}
            <div>
              <h3 className="font-semibold text-lg mb-2 text-[#1B365D]">
                {i18n.language === 'he' ? 'מדדי ליבה' : 'Core Indicators'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {primaryProfile.coreIndicators.map((indicator, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#1B365D]/10 text-[#1B365D] rounded-full text-sm font-medium"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Archetype */}
        {secondaryProfile && (
          <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#1B365D]">{secondaryProfile.name}</CardTitle>
              <CardDescription className="text-gray-600">
                {i18n.language === 'he' ? 'הארכיטייפ המשני שלך' : 'Your Secondary Archetype'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 font-light">{secondaryProfile.description}</p>
              <div className="flex flex-wrap gap-2">
                {secondaryProfile.coreIndicators.map((indicator, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#1B365D]/5 text-[#1B365D] rounded-full text-sm font-light"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skill Scores */}
        <Card className="border-[#1B365D]/10 bg-white/80 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="font-serif text-[#1B365D]">
              {i18n.language === 'he' ? 'ציוני המיומנויות שלך' : 'Your Skill Scores'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {i18n.language === 'he'
                ? 'פירוט מפורט של היכולות הרשתיות שלך'
                : 'Detailed breakdown of your networking capabilities'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skillScores).map(([skillId, score]) => {
                const skillName = (skillNames[currentLanguage] as any)[parseInt(skillId)];
                const scoreValue = typeof score === 'object' && 'average' in score ? score.average : score;
                const percentage = (scoreValue / 5) * 100;
                
                return (
                  <div key={skillId} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-[#1B365D]">{skillName}</span>
                      <span className="text-gray-600">
                        {scoreValue.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <div className="h-2 bg-[#1B365D]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#1B365D] to-[#2a4d80] transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleContinueToCRM}
            size="lg"
            className="bg-[#1B365D] hover:bg-[#2a4d80] text-white transition-smooth hover:shadow-lg"
          >
            {i18n.language === 'he' ? 'המשך ל-CRM אישי' : 'Continue to Personal CRM'}
          </Button>
          <Button
            onClick={handleGoHome}
            variant="outline"
            size="lg"
            className="border-[#1B365D]/20 text-[#1B365D] hover:bg-[#1B365D]/5"
          >
            {i18n.language === 'he' ? 'חזור לעמוד הבית' : 'Back to Home'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-[#E87722]/20 text-[#E87722] hover:bg-[#E87722]/5"
          >
            {i18n.language === 'he' ? 'בצע הערכה מחדש' : 'Retake Assessment'}
          </Button>
        </div>
      </div>
    </div>
  );
}
