import React from 'react';
import './nbs-styles.css';

interface SecondaryArchetypeProps {
  primaryArchetype?: string;
  secondaryArchetype?: string;
  isRTL?: boolean;
}

// Archetype names mapping
const archetypeNames: { [key: string]: { en: string; he: string } } = {
  magnet: { en: 'Network Magnet', he: 'מוקד משיכה רשתי' },
  bridge: { en: 'Strategic Bridge', he: 'גשר אסטרטגי' },
  gardener: { en: 'Network Gardener', he: 'גנן הרשת' },
  pioneer: { en: 'Network Pioneer', he: 'חלוץ הרשתות' }
};

const SecondaryArchetype: React.FC<SecondaryArchetypeProps> = ({ 
  primaryArchetype,
  secondaryArchetype,
  isRTL = false
}) => {
  // Don't render if no secondary archetype
  if (!secondaryArchetype || !primaryArchetype) {
    return null;
  }

  const lang = isRTL ? 'he' : 'en';
  const primaryName = archetypeNames[primaryArchetype]?.[lang] || primaryArchetype;
  const secondaryName = archetypeNames[secondaryArchetype]?.[lang] || secondaryArchetype;

  return (
    <div className={`report-page report-secondary-archetype ${isRTL ? 'rtl' : 'ltr'}`}>
      <h2 className="page-title">
        {isRTL ? 'הפרופיל המשלים' : 'Complementary Profile'}
      </h2>

      <div className="split-card-intro">
        <p>{isRTL 
          ? 'הניתוח שלך מצביע על שילוב ייחודי של שני פרופילי רשת. הבנת שני הפרופילים תעזור לך למנף את החוזקות המלאות שלך.'
          : 'Your analysis reveals a unique blend of two network profiles. Understanding both will help you leverage your full strengths.'}
        </p>
      </div>

      <div className="split-card-container">
        {/* Primary Archetype Side */}
        <div className="split-card-side primary-side">
          <div className="split-card-label">{isRTL ? 'פרופיל ראשי' : 'Primary Profile'}</div>
          <h3 className="split-card-title">{primaryName}</h3>
          <p className="split-card-description">
            {isRTL 
              ? 'זהו הפרופיל הדומיננטי שלך המשקף את החוזקות הרשתיות המרכזיות שלך.'
              : 'This is your dominant profile reflecting your core network strengths.'}
          </p>
        </div>

        {/* Divider */}
        <div className="split-card-divider">
          <span>+</span>
        </div>

        {/* Secondary Archetype Side */}
        <div className="split-card-side secondary-side">
          <div className="split-card-label">{isRTL ? 'פרופיל משלים' : 'Complementary Profile'}</div>
          <h3 className="split-card-title">{secondaryName}</h3>
          <p className="split-card-description">
            {isRTL
              ? 'הפרופיל המשלים שלך מוסיף מימד נוסף ליכולות הרשתיות שלך.'
              : 'Your complementary profile adds an additional dimension to your network capabilities.'}
          </p>
        </div>
      </div>

      <div className="synergy-note">
        <strong>{isRTL ? '💡 סינרגיה:' : '💡 Synergy:'}</strong> {isRTL
          ? 'השילוב בין שני הפרופילים מאפשר לך גמישות רבה בהתאמת הגישה הרשתית שלך לסיטואציות שונות.'
          : 'The combination of both profiles allows you great flexibility in adapting your networking approach to different situations.'}
      </div>
    </div>
  );
};

export default SecondaryArchetype;
