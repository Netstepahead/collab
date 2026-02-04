import React, { useState } from 'react';
import './nbs-styles.css';
import { getArchetypeContentByI18n, ArchetypeKey } from '../../data/ReportContentConfig';
import PageLayout from './PageLayout';

export interface ExecutiveSummaryPageProps {
  userName?: string;
  primaryArchetypeKey?: ArchetypeKey;
  secondaryArchetypeKey?: ArchetypeKey;
  keyInsight?: string;
  topStrengths?: string[];
  growthAreas?: string[];
  topSkills?: string[];
  blindSpots?: string[];
  isRTL?: boolean;
  i18nLanguage?: string;
}

/**
 * ExecutiveSummaryPage Component
 * 
 * Updated with new v0 design while preserving all existing logic.
 * Combines the introduction greeting and snapshot into a single high-impact page.
 */
const ExecutiveSummaryPage: React.FC<ExecutiveSummaryPageProps> = ({
  userName,
  primaryArchetypeKey,
  secondaryArchetypeKey,
  keyInsight,
  topStrengths,
  growthAreas,
  topSkills,
  blindSpots,
  isRTL = false,
  i18nLanguage
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Use fallbacks for missing data
  const displayName = userName || 'User';
  const archetypeKey = primaryArchetypeKey || 'magnet';
  // Determine language: use prop if provided, otherwise infer from isRTL
  const lang = i18nLanguage || (isRTL ? 'he' : 'en');
  
  // Get archetype content for the localized name and description
  const archetypeContent = getArchetypeContentByI18n(archetypeKey, lang);
  const archetypeName = archetypeContent?.title || 'Network Profile';
  const archetypeDescription = archetypeContent?.deepDive?.[0] || archetypeContent?.tagline || '';
  
  // Use topStrengths/growthAreas if provided, otherwise fallback to topSkills/blindSpots
  const displayStrengths = topStrengths || topSkills || [];
  const displayGrowthAreas = growthAreas || blindSpots || [];

  // Get archetype illustration path
  const getArchetypeImagePath = (archetypeKey: ArchetypeKey | string, language: string): string => {
    const key = archetypeKey as ArchetypeKey;
    // For Hebrew, check which suffix exists for each archetype
    // Some use 'he' (pioneer, magnet) and some use 'heb' (gardener, bridge)
    if (language === 'he') {
      // Check archetype-specific suffix
      const hebrewSuffixes: Record<string, string> = {
        gardener: 'heb',  // gardener-heb.png
        bridge: 'heb',   // bridge-heb.png
        magnet: 'he',    // magnet-he.png
        pioneer: 'he'    // pioneer-he.png
      };
      const suffix = hebrewSuffixes[key] || 'he';
      return `/images/archetypes/${key}-${suffix}.png`;
    }
    return `/images/archetypes/${key}-en.png`;
  };

  const archetypeImagePath = getArchetypeImagePath(archetypeKey, lang);

  // Get archetype initials for fallback
  const getArchetypeInitials = (archetypeKey: ArchetypeKey | string): string => {
    const key = archetypeKey as ArchetypeKey;
    const initials: Record<string, string> = {
      magnet: isRTL ? 'מ"ר' : 'NM',
      bridge: isRTL ? 'מ"א' : 'SB',
      gardener: isRTL ? 'מ"ר' : 'NG',
      pioneer: isRTL ? 'ח"ר' : 'NP'
    };
    return initials[key] || '?';
  };

  // Handle image fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const currentKey = archetypeKey;
    
    // Build fallback paths based on language
    // For Hebrew, try alternative language codes based on archetype, then English as last resort
    const hebrewSuffixes: Record<string, string[]> = {
      gardener: ['heb', 'he'],  // Try heb first, then he
      bridge: ['heb', 'he'],   // Try heb first, then he
      magnet: ['he', 'heb'],   // Try he first, then heb
      pioneer: ['he', 'heb']   // Try he first, then heb
    };
    
    const fallbackPaths = lang === 'he' 
      ? [
          // Try alternative Hebrew suffixes for this archetype
          ...(hebrewSuffixes[currentKey] || ['he', 'heb']).map(suffix => 
            `/images/archetypes/${currentKey}-${suffix}.png`
          ),
          `/images/archetypes/${currentKey}-en.png`, // Try English version as fallback
          `/images/archetypes/${currentKey}.png`, // Try without language suffix
          `/images/archetypes/${currentKey}.svg` // Try SVG
        ]
      : [
          `/images/archetypes/${currentKey}.png`, // Try without language suffix
          `/images/archetypes/${currentKey}.svg` // Try SVG
        ];
    
    let currentFallbackIndex = 0;
    const tryNextFallback = () => {
      if (currentFallbackIndex < fallbackPaths.length) {
        img.src = fallbackPaths[currentFallbackIndex];
        currentFallbackIndex++;
      } else {
        setImageError(true);
        img.style.display = 'none';
      }
    };
    
    img.onerror = tryNextFallback;
    tryNextFallback();
  };

  return (
    <div className="report-page">
      <PageLayout pageNumber={2} isRTL={isRTL}>
        <div 
          className={`executive-summary-page-v0 ${isRTL ? 'rtl' : 'ltr'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <header className="exec-summary-v0-header">
            <h1 className="exec-summary-v0-greeting">
              {isRTL ? `הי ${displayName}` : `Hi ${displayName}`}
            </h1>
            <p className="exec-summary-v0-intro-text">
              {isRTL ? (
                <>
                  אנו מעריכים את הזמן שהקדשת להשלמת האבחון
                  <br />
                  הניתוח המפורט בדפים הבאים מבוסס על התשובות שלך לשאלון פרופיל היכולות הרשתיות. הדוח
                  <br />
                  מציג את נקודות החוזק והאתגרים שלך בתחום הרשתות המקצועיות, ומציע המלצות מותאמות
                  <br />
                  אישית לפיתוח יכולותיך הרשתיות.
                </>
              ) : (
                <>
                  We appreciate the time you dedicated to completing the diagnosis.
                  <br />
                  The detailed analysis in the following pages is based on your responses to the Network Capabilities Profile questionnaire. The report
                  <br />
                  presents your strengths and challenges in professional networking, and offers personalized
                  <br />
                  recommendations for developing your network capabilities.
                </>
              )}
            </p>
          </header>

          {/* Main Title */}
          <h2 className="exec-summary-v0-persona-title">
            {isRTL ? 'הפרופיל הרשתי שלך:' : 'Your Network Persona:'}
          </h2>

          {/* Hero Illustration */}
          <div className="exec-summary-v0-hero">
            <div className="exec-summary-v0-hero-container">
              {!imageError ? (
                <img
                  src={archetypeImagePath}
                  alt={archetypeName}
                  onError={handleImageError}
                  className="exec-summary-v0-hero-image"
                  onLoad={() => {
                    // Image loaded successfully, clear any error state
                    setImageError(false);
                  }}
                />
              ) : (
                <>
                  {/* Fallback UI - Circular badge with initials */}
                  <div className="exec-summary-v0-fallback-badge">
                    <div className="exec-summary-v0-fallback-circle">
                      <span className="exec-summary-v0-fallback-initials">
                        {getArchetypeInitials(primaryArchetypeKey)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {archetypeDescription && (
            <p className="exec-summary-v0-description">
              {archetypeDescription}
            </p>
          )}

          {/* Bottom Cards */}
          <div className="exec-summary-v0-cards">
            {/* Strengths Card */}
            <div className="exec-summary-v0-card exec-summary-v0-card-strengths">
              <div className="exec-summary-v0-card-border" />
              <div className="exec-summary-v0-card-content">
                <h3 className="exec-summary-v0-card-title">
                  {isRTL ? 'חוזקות עיקריות' : 'Top Strengths'}
                </h3>
                <ul className="exec-summary-v0-card-list">
                  {displayStrengths.length > 0 ? (
                    displayStrengths.map((strength, index) => (
                      <li key={index} className="exec-summary-v0-card-item">
                        <span className="exec-summary-v0-card-bullet exec-summary-v0-card-bullet-strengths">•</span>
                        <span>{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li className="exec-summary-v0-card-item">
                      <span className="exec-summary-v0-card-bullet exec-summary-v0-card-bullet-strengths">•</span>
                      <span>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Growth Areas Card */}
            <div className="exec-summary-v0-card exec-summary-v0-card-growth">
              <div className="exec-summary-v0-card-border" />
              <div className="exec-summary-v0-card-content">
                <h3 className="exec-summary-v0-card-title">
                  {isRTL ? 'אזורי צמיחה' : 'Growth Areas'}
                </h3>
                <ul className="exec-summary-v0-card-list">
                  {displayGrowthAreas.length > 0 ? (
                    displayGrowthAreas.map((area, index) => (
                      <li key={index} className="exec-summary-v0-card-item">
                        <span className="exec-summary-v0-card-bullet exec-summary-v0-card-bullet-growth">•</span>
                        <span>{area}</span>
                      </li>
                    ))
                  ) : (
                    <li className="exec-summary-v0-card-item">
                      <span className="exec-summary-v0-card-bullet exec-summary-v0-card-bullet-growth">•</span>
                      <span>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default ExecutiveSummaryPage;
