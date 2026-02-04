import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CoverPage from './CoverPage';
import ExecutiveSummaryPage from './ExecutiveSummaryPage';
import ScoreChartSection from './ScoreChartSection';
import StrengthsAndChallenges from './StrengthsAndChallenges';
import RiskFactors from './RiskFactors';
import CollaborationStrategy from './CollaborationStrategy';
import StrategyRoadmap from './StrategyRoadmap';
import ActionPlan from './ActionPlan';
import Worksheet from './Worksheet';
import BackCover from './BackCover';
import { getArchetypeContentByI18n, ArchetypeKey } from '../../data/ReportContentConfig';
import { skills } from '../../data/skills';
import { profiles } from '../../data/profiles';
import './nbs-styles.css';

// VERSION: DATA-ADAPTER-V1 (Robust Data Normalization)

interface ReportData {
  userName: string;
  date: string;
  totalScore: number;
  keyInsight: string;
  topStrengths: string[];
  growthAreas: string[];
  scoreCharts: Array<{ category: string; userScore: number; averageScore: number; }>;
  strengthsNarrative: string;
  focusTraits: string[];
  challengeTitle: string;
  challengeDescription: string;
  contrastData: { high: { label: string; score: number }; low: { label: string; score: number }; };
  focusArea: string;
  primaryArchetype: { key: string; name: string; definition: string; };
  secondaryArchetype?: { key: string; name: string; description: string; };
  risks: Array<{ title: string; description: string; }>;
  roadmapPillars: Array<{ title: string; description: string; actions: string[]; }>;
  actions: Array<{ id: string; text: string; category: string; }>;
  allArchetypes: Array<{ key: string; name: string; description: string; }>;
  contactInfo: { email?: string; phone?: string; website?: string; };
  // Additional fields for component compatibility
  topSkills?: string[];
  blindSpots?: string[];
  scores?: any;
  riskFactors?: Array<{ title: string; description: string; }>;
  recommendations?: Array<{ title: string; description: string; actions?: string[]; }>;
}

interface ReportContainerProps {
  reportData?: ReportData;
  isRTL?: boolean;
}

/**
 * Robust Data Adapter: Normalizes raw localStorage data into valid ReportData structure
 */
function normalizeData(rawData: any, isRTL: boolean = false): ReportData {
  const language = isRTL ? 'he' : 'en';
  const lang = language as 'he' | 'en';

  // Helper: Extract value from multiple possible field names
  const getField = (variations: string[], defaultValue: any = null) => {
    for (const field of variations) {
      const value = rawData?.[field];
      if (value !== undefined && value !== null && value !== '') {
        return value;
      }
      // Try nested paths
      if (field.includes('.')) {
        const parts = field.split('.');
        let current = rawData;
        for (const part of parts) {
          if (current?.[part] !== undefined) {
            current = current[part];
          } else {
            current = null;
            break;
          }
        }
        if (current !== null && current !== undefined && current !== '') {
          return current;
        }
      }
    }
    return defaultValue;
  };

  // Extract user name from various possible fields
  const userName = getField([
    'userName', 'respondentName', 'name', 'fullName', 
    'respondent.name', 'user.name', 'profile.name'
  ], 'User');

  // Extract date from various possible fields
  const dateRaw = getField(['date', 'createdAt', 'created_at', 'timestamp', 'generatedAt'], new Date().toISOString());
  const date = typeof dateRaw === 'string' ? dateRaw : new Date(dateRaw).toISOString();

  // Extract archetype information
  const primaryArchetypeKey = getField([
    'primaryArchetype.key', 'primaryArchetype', 'profileResult.primary', 
    'archetype', 'archetypeKey', 'profile'
  ], 'magnet') as ArchetypeKey;

  const secondaryArchetypeKey = getField([
    'secondaryArchetype.key', 'secondaryArchetype', 'profileResult.secondary'
  ], null) as ArchetypeKey | null;

  // Get archetype content
  const primaryArchetypeContent = getArchetypeContentByI18n(primaryArchetypeKey, language);
  const primaryProfile = profiles[lang]?.[primaryArchetypeKey] || profiles.en[primaryArchetypeKey];

  // Extract skill scores
  const skillScores = getField(['skillScores', 'scores', 'skill_scores'], {});
  
  console.log('🔍 DEBUG: skillScores from localStorage:', skillScores);
  console.log('🔍 DEBUG: Number of skills found:', Object.keys(skillScores).length);
  
  // Convert skillScores object to scoreCharts array
  const scoreCharts: Array<{ category: string; userScore: number; averageScore: number; }> = [];
  const skillsData = skills[lang] || skills.en;
  
  for (let skillId = 1; skillId <= 12; skillId++) {
    const skillScore = skillScores[skillId];
    const userScore = skillScore?.average || skillScore?.userScore || skillScore?.score || 0;
    const averageScore = 3.5; // Default average
    const category = skillsData[skillId] || `Skill ${skillId}`;
    
    if (userScore === 0 && skillId <= 5) {
      console.warn(`⚠️ Skill ${skillId} (${category}) has score 0:`, skillScore);
    }
    
    scoreCharts.push({
      category,
      userScore: Math.max(0, Math.min(5, userScore)), // Clamp between 0-5
      averageScore
    });
  }
  
  console.log('📊 DEBUG: scoreCharts array length:', scoreCharts.length);
  console.log('📊 DEBUG: First 5 scoreCharts:', scoreCharts.slice(0, 5));

  // Calculate total score
  const totalScore = scoreCharts.reduce((sum, chart) => sum + chart.userScore, 0) / scoreCharts.length || 0;

  // Extract top skills and blind spots from skill scores
  const sortedSkills = [...scoreCharts].sort((a, b) => b.userScore - a.userScore);
  const topSkills = sortedSkills.slice(0, 3).map(s => s.category);
  const blindSpots = sortedSkills.slice(-3).reverse().map(s => s.category);

  // Get strengths and growth areas from archetype content
  const topStrengths = primaryArchetypeContent?.strengths || primaryProfile?.strengths || topSkills;
  const growthAreas = primaryArchetypeContent?.risks?.map(r => r.title) || primaryProfile?.challenges || blindSpots;

  // Build contrast data (highest vs lowest skill)
  const highestSkill = sortedSkills[0];
  const lowestSkill = sortedSkills[sortedSkills.length - 1];
  const contrastData = {
    high: {
      label: highestSkill?.category || (isRTL ? 'גבוה' : 'High'),
      score: highestSkill?.userScore || 0
    },
    low: {
      label: lowestSkill?.category || (isRTL ? 'נמוך' : 'Low'),
      score: lowestSkill?.userScore || 0
    }
  };

  // Build risks from archetype content
  const risks = primaryArchetypeContent?.risks || [];

  // Build roadmap pillars from recommendations
  const roadmapPillars = primaryArchetypeContent?.recommendations || [];

  // Build actions from roadmap pillars
  const actions: Array<{ id: string; text: string; category: string; }> = [];
  roadmapPillars.forEach((pillar, idx) => {
    if (pillar.actions) {
      pillar.actions.forEach((action, actionIdx) => {
        actions.push({
          id: `action_${idx}_${actionIdx}`,
          text: action,
          category: pillar.title || 'General'
        });
      });
    }
  });

  // Build all archetypes list
  const allArchetypes = Object.keys(profiles[lang] || profiles.en).map(key => {
    const archetype = profiles[lang]?.[key] || profiles.en[key];
    return {
      key,
      name: archetype.name,
      description: archetype.description
    };
  });

  // Build secondary archetype if available
  let secondaryArchetype: { key: string; name: string; description: string; } | undefined;
  if (secondaryArchetypeKey) {
    const secondaryProfile = profiles[lang]?.[secondaryArchetypeKey] || profiles.en[secondaryArchetypeKey];
    if (secondaryProfile) {
      secondaryArchetype = {
        key: secondaryArchetypeKey,
        name: secondaryProfile.name,
        description: secondaryProfile.description
      };
    }
  }

  // Build normalized ReportData
  const normalized: ReportData = {
    userName,
    date,
    totalScore,
    keyInsight: primaryArchetypeContent?.tagline || primaryProfile?.description || '',
    topStrengths,
    growthAreas,
    scoreCharts,
    strengthsNarrative: primaryArchetypeContent?.deepDive?.[0] || primaryProfile?.description || '',
    focusTraits: primaryProfile?.coreIndicators || [],
    challengeTitle: risks[0]?.title || (isRTL ? 'האתגר המרכזי' : 'Main Challenge'),
    challengeDescription: risks[0]?.description || primaryProfile?.challenges?.[0] || '',
    contrastData,
    focusArea: growthAreas[0] || '',
    primaryArchetype: {
      key: primaryArchetypeKey,
      name: primaryArchetypeContent?.title || primaryProfile?.name || 'Network Profile',
      definition: primaryArchetypeContent?.deepDive?.[0] || primaryProfile?.description || ''
    },
    secondaryArchetype,
    risks,
    roadmapPillars,
    actions,
    allArchetypes,
    contactInfo: getField(['contactInfo', 'contact'], {}) || {},
    // Additional fields for component compatibility
    topSkills,
    blindSpots,
    scores: scoreCharts,
    riskFactors: risks,
    recommendations: roadmapPillars
  };

  return normalized;
}

const ReportContainer: React.FC<ReportContainerProps> = ({ reportData, isRTL: propIsRTL }) => {
  const { i18n } = useTranslation();
  const logoPath = '/logo-step-ahead-dark.png'; // Dark logo for dark backgrounds (white text)

  const [normalizedData, setNormalizedData] = useState<ReportData | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    try {
      const urlPath = window.location.pathname.split('/').pop() || '';
      const cleanId = urlPath.replace(/^(report_)+/, '');

      if (cleanId) {
        let foundData = null;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key) continue;

          if (key.includes(cleanId)) {
            const rawData = localStorage.getItem(key);
            if (rawData) {
              try {
                const parsedData = JSON.parse(rawData);
                if (parsedData && typeof parsedData === 'object') {
                  foundData = parsedData;
                  break;
                }
              } catch (e) {
                console.error('Error parsing JSON from localStorage:', e);
              }
            }
          }
        }

        if (foundData) {
          // Always use current i18n language (allows language switching)
          const currentIsRTL = propIsRTL !== undefined ? propIsRTL : (i18n.language === 'he' || i18n.language?.startsWith('he'));
          
          // Normalize the data with current language
          const normalized = normalizeData(foundData, currentIsRTL);
          
          // Debug logging
          console.group('🔍 Report Data Normalization');
          console.log('📥 Raw Data from localStorage:', foundData);
          console.log('✨ Normalized Data:', normalized);
          console.log('📊 Key Mappings:', {
            userName: normalized.userName,
            archetype: normalized.primaryArchetype.key,
            skillsCount: normalized.scoreCharts.length,
            risksCount: normalized.risks.length,
            recommendationsCount: normalized.recommendations?.length || 0
          });
          console.groupEnd();
          
          setNormalizedData(normalized);
        }
      }
    } catch (err) {
      console.error('Error loading report data:', err);
    }
  }, [propIsRTL, i18n.language]);

  // Use current i18n language (allows real-time language switching)
  const isRTL = propIsRTL !== undefined ? propIsRTL : (i18n.language === 'he' || i18n.language?.startsWith('he'));

  // Use normalized data or normalize provided reportData
  const finalData = normalizedData || (reportData ? normalizeData(reportData, isRTL) : null);

  const formatDate = (dateString: string) => {
    if (!dateString) return new Date().toLocaleDateString(isRTL ? 'he-IL' : 'en-US');
    try {
      return new Date(dateString).toLocaleDateString(isRTL ? 'he-IL' : 'en-US');
    } catch {
      return new Date().toLocaleDateString(isRTL ? 'he-IL' : 'en-US');
    }
  };

  // PDF Print functionality
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handlePDF = useCallback(async () => {
    setIsPrinting(true);
    try {
      // Dynamic import of html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = document.querySelector('.report-wrapper') as HTMLElement;
      if (!element) {
        console.error('Report wrapper not found');
        setIsPrinting(false);
        return;
      }

      const opt = {
        margin: [5, 5, 5, 5] as [number, number, number, number],
        filename: `Network_Profile_${finalData?.userName || 'Report'}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.95 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const,
          compress: true
        },
        pagebreak: { 
          mode: 'css' as any,
          after: '.report-page'
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print dialog
      window.print();
    } finally {
      setIsPrinting(false);
    }
  }, [finalData]);

  // Loading state
  if (!finalData) {
    return (
      <div style={{
        padding: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          {isRTL ? 'הדוח בטעינה...' : 'Loading Report...'}
        </h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          {isRTL ? 'מחפש נתונים בזיכרון הדפדפן.' : 'Searching for data in browser storage.'}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4472C4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
          {isRTL ? 'חזור לשאלון' : 'Back to Questionnaire'}
        </button>
      </div>
    );
  }

  return (
    <div className={`report-wrapper ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Print/PDF Controls */}
      <div className="report-controls">
        <button
          className="btn-print"
          onClick={handlePrint}
          aria-label={isRTL ? 'הדפס' : 'Print'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" rx="1" />
          </svg>
          <span>{isRTL ? 'הדפס' : 'Print'}</span>
        </button>
        <button
          className="btn-pdf"
          onClick={handlePDF}
          disabled={isPrinting}
          aria-label={isRTL ? 'שמור PDF' : 'Save PDF'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>{isPrinting ? (isRTL ? 'מייצר...' : 'Generating...') : (isRTL ? 'שמור PDF' : 'Save PDF')}</span>
        </button>
      </div>

      {/* Report Pages */}
      <CoverPage
        LogoPath={logoPath}
        userName={finalData.userName}
        date={formatDate(finalData.date)}
        isRTL={isRTL}
      />
      <ExecutiveSummaryPage
        userName={finalData.userName}
        primaryArchetypeKey={finalData.primaryArchetype.key as ArchetypeKey}
        secondaryArchetypeKey={finalData.secondaryArchetype?.key as ArchetypeKey}
        topSkills={finalData.topSkills}
        blindSpots={finalData.blindSpots}
        isRTL={isRTL}
        i18nLanguage={isRTL ? 'he' : 'en'}
      />
      <ScoreChartSection
        scores={finalData.scoreCharts.slice(0, 6)}
        isRTL={isRTL}
        pageNumber={1}
      />
      <ScoreChartSection
        scores={finalData.scoreCharts.slice(6, 12)}
        isRTL={isRTL}
        pageNumber={2}
      />
      <StrengthsAndChallenges
        topSkills={finalData.topSkills}
        blindSpots={finalData.blindSpots}
        contrastData={finalData.contrastData}
        challengeTitle={finalData.challengeTitle}
        challengeDescription={finalData.challengeDescription}
        focusArea={finalData.focusArea}
        isRTL={isRTL}
      />
      <RiskFactors
        riskFactors={finalData.riskFactors}
        isRTL={isRTL}
      />
      <CollaborationStrategy
        primaryArchetype={finalData.primaryArchetype.key}
        secondaryArchetype={finalData.secondaryArchetype?.key}
        isRTL={isRTL}
      />
      <StrategyRoadmap
        recommendations={finalData.recommendations}
        isRTL={isRTL}
      />
      <ActionPlan
        actions={finalData.actions}
        userName={finalData.userName}
        isRTL={isRTL}
      />
      <Worksheet
        isRTL={isRTL}
      />
      <BackCover
        LogoPath={logoPath}
        contactInfo={finalData.contactInfo}
        isRTL={isRTL}
      />
    </div>
  );
};

export default ReportContainer;
