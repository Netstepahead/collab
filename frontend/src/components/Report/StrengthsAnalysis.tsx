import React from 'react';
import './nbs-styles.css';

export interface StrengthsAnalysisProps {
  title?: string;
  narrative?: string;
  strengths?: string[];
  topSkills?: string[];
  isRTL?: boolean;
}

/**
 * StrengthsAnalysis Component
 * 
 * Displays a deep dive into the user's key strengths.
 * This is a "dumb" component that receives all content via props.
 * 
 * Used for Page 5 of the report.
 */
const StrengthsAnalysis: React.FC<StrengthsAnalysisProps> = ({
  title,
  narrative,
  strengths,
  topSkills,
  isRTL = false
}) => {
  const displayTitle = title || (isRTL ? 'חוזקות בולטות' : 'Key Strengths Deep Dive');
  const displayNarrative = narrative || (isRTL ? 'החוזקות שלך משקפות את היכולות הרשתיות החזקות ביותר שלך.' : 'Your strengths reflect your strongest network capabilities.');
  const displayStrengths = strengths || topSkills || [];

  return (
    <div className={`report-page report-strengths ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="page-title">{displayTitle}</h2>

      <div className="strengths-content">
        {/* Narrative Section */}
        <div className="strengths-narrative">
          <p className="strengths-narrative-text">{displayNarrative}</p>
        </div>

        {/* Strengths List Section */}
        <div className="strengths-traits">
          <h3 className="section-subtitle">
            {isRTL ? 'תכונות מרכזיות' : 'Key Traits'}
          </h3>
          {displayStrengths.length > 0 ? (
            <ul className="traits-list">
              {displayStrengths.map((strength, idx) => (
                <li key={idx} className="trait-item">
                  <span className="trait-icon">✓</span>
                  <span className="trait-text">{strength || ''}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="traits-empty">{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrengthsAnalysis;
