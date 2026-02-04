import React from 'react';
import './nbs-styles.css';

interface StrengthsAndChallengesProps {
  // Strengths section
  strengthsTitle?: string;
  narrative?: string;
  strengths?: string[];
  topSkills?: string[];
  
  // Challenge section
  challengeTitle?: string;
  challengeDescription?: string;
  contrastData?: {
    high?: { label?: string; score?: number };
    low?: { label?: string; score?: number };
  };
  focusArea?: string;
  blindSpots?: string[];
  
  isRTL?: boolean;
}

/**
 * StrengthsAndChallenges Component
 * 
 * Combines Key Strengths Deep Dive and Main Challenge into a single page.
 */
const StrengthsAndChallenges: React.FC<StrengthsAndChallengesProps> = ({
  strengthsTitle,
  narrative,
  strengths,
  topSkills,
  challengeTitle,
  challengeDescription,
  contrastData,
  focusArea,
  blindSpots,
  isRTL = false
}) => {
  const displayStrengthsTitle = strengthsTitle || (isRTL ? 'חוזקות בולטות' : 'Key Strengths');
  const displayNarrative = narrative || (isRTL ? 'החוזקות שלך משקפות את היכולות הרשתיות החזקות ביותר שלך.' : 'Your strengths reflect your strongest network capabilities.');
  const displayStrengths = strengths || topSkills || [];
  
  const displayChallengeTitle = challengeTitle || (isRTL ? 'האתגר המרכזי' : 'Main Challenge');
  const displayChallengeDescription = challengeDescription || (isRTL ? 'זיהוי האתגרים שלך הוא הצעד הראשון לשיפור.' : 'Identifying your challenges is the first step to improvement.');
  const displayFocusArea = focusArea || (isRTL ? 'מומלץ להתמקד בפיתוח יכולות רשתיות.' : 'Recommended to focus on developing network capabilities.');

  return (
    <div className={`report-page report-strengths-challenges ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="page-title">
        {isRTL ? 'חוזקות ואתגרים' : 'Strengths & Challenges'}
      </h2>

      <div className="strengths-challenges-container">
        {/* Strengths Section */}
        <div className="strengths-section">
          <h3 className="section-subtitle-main">{displayStrengthsTitle}</h3>
          <p className="section-narrative">{displayNarrative}</p>
          
          {displayStrengths.length > 0 && (
            <div className="traits-compact">
              <ul className="traits-list-compact">
                {displayStrengths.map((strength, idx) => (
                  <li key={idx} className="trait-item-compact">
                    <span className="trait-icon">✓</span>
                    <span className="trait-text">{strength || ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Challenge Section */}
        <div className="challenge-section">
          <div className="challenge-header-label">
            {isRTL ? 'האתגר שלך:' : 'Your Challenge:'}
          </div>
          <h3 className="section-subtitle-main">{displayChallengeTitle}</h3>
          <p className="section-narrative">{displayChallengeDescription}</p>

          {contrastData?.high && contrastData?.low ? (
            <div className="contrast-comparison-compact">
              <div className="contrast-item-compact high">
                <div className="contrast-label-compact">{contrastData.high?.label || (isRTL ? 'גבוה' : 'High')}</div>
                <div className="contrast-score-compact">{(contrastData.high?.score || 0).toFixed(1)}</div>
                <div className="contrast-bar-compact">
                  <div 
                    className="contrast-bar-fill high-fill" 
                    style={{ width: `${((contrastData.high?.score || 0) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="contrast-item-compact low">
                <div className="contrast-label-compact">{contrastData.low?.label || (isRTL ? 'נמוך' : 'Low')}</div>
                <div className="contrast-score-compact">{(contrastData.low?.score || 0).toFixed(1)}</div>
                <div className="contrast-bar-compact">
                  <div 
                    className="contrast-bar-fill low-fill" 
                    style={{ width: `${((contrastData.low?.score || 0) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : blindSpots && blindSpots.length > 0 ? (
            <div className="blind-spots-compact">
              <ul className="blind-spots-list-compact">
                {blindSpots.slice(0, 3).map((spot, idx) => (
                  <li key={idx}>{spot}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="focus-area-compact">
            <p className="focus-text-compact">
              <strong>{isRTL ? 'אזור מיקוד:' : 'Focus Area:'}</strong> {displayFocusArea}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthsAndChallenges;
