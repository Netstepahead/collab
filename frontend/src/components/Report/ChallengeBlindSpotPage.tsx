import React from 'react';
import { useTranslation } from 'react-i18next';
import './nbs-styles.css';
import PageLayout from './PageLayout';
import { getArchetypeContentByI18n, ArchetypeKey } from '../../data/ReportContentConfig';

export interface Scores {
  [skillId: string]: {
    average: number;
    [key: string]: any;
  };
}

export interface ChallengeBlindSpotPageProps {
  scores: Scores;
  archetype: ArchetypeKey;
  isRTL?: boolean;
  pageNumber?: number;
  i18nLanguage?: string;
}

/**
 * ChallengeBlindSpotPage Component
 * 
 * Displays a challenge/blind spot analysis comparing two skills:
 * - Building Relationships (Skill ID 1)
 * - Maintaining Relationships (Skill ID 2)
 * 
 * Shows the gap between these capabilities and provides insights
 * based on the archetype's challenge description.
 */
const ChallengeBlindSpotPage: React.FC<ChallengeBlindSpotPageProps> = ({
  scores,
  archetype,
  isRTL = false,
  pageNumber = 5,
  i18nLanguage = 'en'
}) => {
  const { t } = useTranslation();
  const MAX_SCORE = 5;

  // Get archetype content for challenge text
  const archetypeContent = getArchetypeContentByI18n(archetype, i18nLanguage);
  
  // Get challenge description from archetype content
  // Note: The challenge structure might be different in ReportContentConfig
  // For now, we'll use the first risk description as challenge insight
  const challengeTitle = isRTL ? 'האתגר המרכזי שלך' : 'Your Main Challenge';
  const challengeSubtitle = archetypeContent.tagline || '';
  
  // Extract the two comparison skills
  const buildingScore = scores['1']?.average || 0; // Building Contacts
  const maintainingScore = scores['2']?.average || 0; // Maintaining Contacts

  // Calculate percentages
  const buildingPercent = (buildingScore / MAX_SCORE) * 100;
  const maintainingPercent = (maintainingScore / MAX_SCORE) * 100;
  const gap = Math.abs(buildingScore - maintainingScore);

  // Determine which is higher
  const buildingIsHigher = buildingScore > maintainingScore;
  const highScore = buildingIsHigher ? buildingScore : maintainingScore;
  const lowScore = buildingIsHigher ? maintainingScore : buildingScore;
  const highPercent = buildingIsHigher ? buildingPercent : maintainingPercent;
  const lowPercent = buildingIsHigher ? maintainingPercent : buildingPercent;

  // Labels
  const buildingLabel = isRTL ? 'יצירת קשרים' : 'Building Relationships';
  const buildingLabelEn = 'Building Relationships';
  const maintainingLabel = isRTL ? 'שמירה על קשרים' : 'Maintaining Relationships';
  const maintainingLabelEn = 'Maintaining Relationships';

  // Insight text - use first risk description as challenge insight
  const insightText = archetypeContent.risks && archetypeContent.risks.length > 0
    ? archetypeContent.risks[0].description
    : isRTL 
      ? 'בעוד שאתה מצטיין ביצירת קשרים חדשים ובניית רשת רחבה, שימור הקשרים לאורך זמן מהווה אתגר.'
      : 'While you excel at creating new connections and building a wide network, maintaining relationships over time poses a challenge.';

  // Why this matters text - use first recommendation description
  const whyMattersText = archetypeContent.recommendations && archetypeContent.recommendations.length > 0
    ? archetypeContent.recommendations[0].description
    : isRTL
      ? 'רשת יציבה ובריאה נשענת על יכולת לא רק ליצור קשרים, אלא גם לטפח אותם לאורך זמן.'
      : 'A stable and healthy network relies on the ability not only to create connections but also to nurture them over time.';

  // Status labels
  const highStatusLabel = isRTL ? 'חזק מאוד' : 'Very Strong';
  const lowStatusLabel = isRTL ? 'דורש חיזוק' : 'Needs Strengthening';

  return (
    <div className="report-page">
      <PageLayout pageNumber={pageNumber} isRTL={isRTL}>
        <div className={`challenge-blind-spot-page ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Header */}
          <header className="challenge-blind-spot-header">
            <h1 className="challenge-blind-spot-title">
              {challengeTitle}
            </h1>
            {challengeSubtitle && (
              <p className="challenge-blind-spot-subtitle">
                {challengeSubtitle}
              </p>
            )}
            <p className="challenge-blind-spot-intro">
              {isRTL
                ? 'הניתוח מגלה פער משמעותי בין יכולות הרשת שלך. הבנת הפער הזה היא המפתח לשיפור האינטליגנציה הרשתית שלך.'
                : 'The analysis reveals a significant gap between your network capabilities. Understanding this gap is the key to improving your network intelligence.'}
            </p>
          </header>

          {/* Visual Hero Section - Balance Scale */}
          <div className="challenge-blind-spot-visual">
            <div className="challenge-blind-spot-card">
              {/* Scale Title */}
              <div className="challenge-blind-spot-scale-title">
                <h2 className="challenge-blind-spot-scale-title-main">
                  {isRTL ? 'מאזן היכולות' : 'Capability Balance'}
                </h2>
                <p className="challenge-blind-spot-scale-title-sub">
                  {isRTL ? 'Capability Balance' : 'מאזן היכולות'}
                </p>
              </div>

              {/* Comparison Bars */}
              <div className="challenge-blind-spot-comparison">
                {/* Building Relationships - Higher Score */}
                <div className="challenge-blind-spot-metric">
                  <div className="challenge-blind-spot-metric-header">
                    <span className="challenge-blind-spot-metric-label challenge-blind-spot-metric-label-high">
                      {buildingIsHigher ? buildingLabel : maintainingLabel}
                    </span>
                    <div className="challenge-blind-spot-metric-score-group">
                      <span className="challenge-blind-spot-metric-label-en">
                        {buildingIsHigher ? buildingLabelEn : maintainingLabelEn}
                      </span>
                      <span className="challenge-blind-spot-metric-badge challenge-blind-spot-metric-badge-high">
                        {highScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="challenge-blind-spot-bar-wrapper">
                    <div
                      className="challenge-blind-spot-bar challenge-blind-spot-bar-high"
                      style={{ width: `${highPercent}%` }}
                    />
                    <div className="challenge-blind-spot-bar-label">
                      <span className="challenge-blind-spot-bar-label-text">{highStatusLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Gap Indicator */}
                <div className="challenge-blind-spot-gap-indicator">
                  <div className="challenge-blind-spot-gap-line challenge-blind-spot-gap-line-left" />
                  <div className="challenge-blind-spot-gap-badge">
                    <span className="challenge-blind-spot-gap-text">
                      {isRTL ? 'פער:' : 'Gap:'} {gap.toFixed(1)}
                    </span>
                  </div>
                  <div className="challenge-blind-spot-gap-line challenge-blind-spot-gap-line-right" />
                </div>

                {/* Maintaining Relationships - Lower Score */}
                <div className="challenge-blind-spot-metric">
                  <div className="challenge-blind-spot-metric-header">
                    <span className="challenge-blind-spot-metric-label challenge-blind-spot-metric-label-low">
                      {buildingIsHigher ? maintainingLabel : buildingLabel}
                    </span>
                    <div className="challenge-blind-spot-metric-score-group">
                      <span className="challenge-blind-spot-metric-label-en">
                        {buildingIsHigher ? maintainingLabelEn : buildingLabelEn}
                      </span>
                      <span className="challenge-blind-spot-metric-badge challenge-blind-spot-metric-badge-low">
                        {lowScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="challenge-blind-spot-bar-wrapper">
                    <div
                      className="challenge-blind-spot-bar challenge-blind-spot-bar-low"
                      style={{ width: `${lowPercent}%` }}
                    />
                    <div className="challenge-blind-spot-bar-label challenge-blind-spot-bar-label-low">
                      <span className="challenge-blind-spot-bar-label-text">{lowStatusLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight Box */}
            <div className="challenge-blind-spot-insight">
              <div className="challenge-blind-spot-insight-content">
                <div className="challenge-blind-spot-insight-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="challenge-blind-spot-insight-text">
                  <h3 className="challenge-blind-spot-insight-title">
                    {isRTL ? 'תובנה מרכזית' : 'Key Insight'}
                  </h3>
                  <p className="challenge-blind-spot-insight-description">
                    {insightText}
                  </p>
                </div>
              </div>
            </div>

            {/* Why This Matters */}
            <div className="challenge-blind-spot-why-matters">
              <h3 className="challenge-blind-spot-why-matters-title">
                {isRTL ? 'למה זה חשוב?' : 'Why This Matters'}
              </h3>
              <p className="challenge-blind-spot-why-matters-text">
                {whyMattersText}
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default ChallengeBlindSpotPage;
