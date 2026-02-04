import React from 'react';
import './nbs-styles.css';

interface ChallengeFocusProps {
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

const ChallengeFocus: React.FC<ChallengeFocusProps> = ({ 
  challengeTitle, 
  challengeDescription, 
  contrastData, 
  focusArea,
  blindSpots,
  isRTL = false
}) => {
  const displayTitle = challengeTitle || (isRTL ? 'האתגר המרכזי' : 'Main Challenge');
  const displayDescription = challengeDescription || (isRTL ? 'זיהוי האתגרים שלך הוא הצעד הראשון לשיפור.' : 'Identifying your challenges is the first step to improvement.');
  const displayFocusArea = focusArea || (isRTL ? 'מומלץ להתמקד בפיתוח יכולות רשתיות.' : 'Recommended to focus on developing network capabilities.');

  return (
    <div className="report-page report-challenge">
      <h2 className="page-title">
        {isRTL ? 'האתגר המרכזי' : 'Main Challenge'}
      </h2>

      <div className="challenge-content">
        <h3 className="challenge-title">{displayTitle}</h3>
        <p className="challenge-description">{displayDescription}</p>

        {contrastData?.high && contrastData?.low ? (
          <div className="contrast-comparison">
            <div className="contrast-item high">
              <div className="contrast-label">{contrastData.high?.label || (isRTL ? 'גבוה' : 'High')}</div>
              <div className="contrast-score">{(contrastData.high?.score || 0).toFixed(1)}</div>
              <div className="contrast-bar">
                <div 
                  className="contrast-bar-fill high-fill" 
                  style={{ width: `${((contrastData.high?.score || 0) / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="contrast-item low">
              <div className="contrast-label">{contrastData.low?.label || (isRTL ? 'נמוך' : 'Low')}</div>
              <div className="contrast-score">{(contrastData.low?.score || 0).toFixed(1)}</div>
              <div className="contrast-bar">
                <div 
                  className="contrast-bar-fill low-fill" 
                  style={{ width: `${((contrastData.low?.score || 0) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : blindSpots && blindSpots.length > 0 ? (
          <div className="blind-spots-list">
            <h4 className="focus-title">
              {isRTL ? 'נקודות עיוורון' : 'Blind Spots'}
            </h4>
            <ul>
              {blindSpots.map((spot, idx) => (
                <li key={idx}>{spot}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="focus-area">
          <h4 className="focus-title">
            {isRTL ? 'אזור מיקוד' : 'Focus Area'}
          </h4>
          <p className="focus-text">{displayFocusArea}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFocus;
