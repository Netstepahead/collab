import React from 'react';
import { AlertTriangle, TrendingDown, Users, Clock } from 'lucide-react';
import './nbs-styles.css';

interface Risk {
  title: string;
  description: string;
}

interface RiskFactorsProps {
  risks?: Risk[];
  riskFactors?: Risk[];
  isRTL?: boolean;
}

// Map risk keywords to icons
const getRiskIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('bottleneck') || lowerTitle.includes('עומס') || lowerTitle.includes('צוואר בקבוק')) {
    return Users;
  }
  if (lowerTitle.includes('balance') || lowerTitle.includes('איזון')) {
    return TrendingDown;
  }
  if (lowerTitle.includes('maintenance') || lowerTitle.includes('תחזוקה')) {
    return Clock;
  }
  return AlertTriangle;
};

const RiskFactors: React.FC<RiskFactorsProps> = ({ risks, riskFactors, isRTL = false }) => {
  const displayRisks = risks || riskFactors || [];

  if (!displayRisks || displayRisks.length === 0) {
    return null;
  }

  return (
    <div className={`report-page report-risks ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="page-title">
        {isRTL ? 'אזורי סיכון מרכזיים' : 'Key Risk Areas'}
      </h2>

      <div className="risks-intro">
        <p>{isRTL 
          ? 'זיהוי מוקדם של סיכונים פוטנציאליים מאפשר לך לנקוט פעולה מונעת ולחזק את הרשת שלך.'
          : 'Early identification of potential risks allows you to take preventive action and strengthen your network.'}
        </p>
      </div>

      <div className="risks-grid">
        {displayRisks.map((risk, idx) => {
          const Icon = getRiskIcon(risk?.title || '');
          
          return (
            <div key={idx} className="risk-card">
              <div className="risk-card-header">
                <div className="risk-icon-wrapper">
                  <Icon className="risk-icon" />
                </div>
                <h3 className="risk-card-title">{risk?.title || `Risk ${idx + 1}`}</h3>
              </div>
              <p className="risk-card-description">{risk?.description || ''}</p>
              <div className="risk-card-action">
                <span className="risk-severity">{isRTL ? 'דורש תשומת לב' : 'Requires Attention'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="risks-footer">
        <p><strong>{isRTL ? '💡 המלצה:' : '💡 Recommendation:'}</strong> {isRTL
          ? 'התמקד באזור אחד לשיפור בכל פעם, במקום לנסות לטפל בכל הסיכונים בבת אחת.'
          : 'Focus on one area for improvement at a time, rather than trying to address all risks at once.'}
        </p>
      </div>
    </div>
  );
};

export default RiskFactors;
