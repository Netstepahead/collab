import React from 'react';
import './nbs-styles.css';
import { getArchetypeContentByI18n, ArchetypeKey } from '../../data/ReportContentConfig';

export interface SnapshotProps {
  primaryArchetypeKey: ArchetypeKey;
  keyInsight: string;
  topStrengths: string[];
  growthAreas: string[];
  isRTL?: boolean;
  i18nLanguage?: string;
}

/**
 * Snapshot Component (Page 3: Executive Summary)
 * 
 * Displays the primary archetype name as the hero element,
 * followed by key insight, top strengths, and growth areas.
 * This is a "dumb" component that receives all content via props.
 */
const Snapshot: React.FC<SnapshotProps> = ({ 
  primaryArchetypeKey,
  keyInsight, 
  topStrengths, 
  growthAreas,
  isRTL = false,
  i18nLanguage = 'en'
}) => {
  // Get archetype content for the localized name
  const archetypeContent = getArchetypeContentByI18n(primaryArchetypeKey, i18nLanguage);
  const archetypeName = archetypeContent.title;

  return (
    <div className={`report-page report-snapshot ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="snapshot-header">
        <h2 className="snapshot-title">
          {isRTL ? 'הפרופיל הרשתי שלך' : 'Your Network Persona'}
        </h2>
        <h1 className="archetype-name-hero">{archetypeName}</h1>
      </div>

      <div className="snapshot-insight">
        <p>{keyInsight}</p>
      </div>

      <div className="snapshot-grid">
        <div className="snapshot-section strengths-section">
          <h3 className="section-title">
            {isRTL ? 'חוזקות עיקריות' : 'Top Strengths'}
          </h3>
          <ul className="snapshot-list">
            {topStrengths.map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="snapshot-section growth-section">
          <h3 className="section-title">
            {isRTL ? 'אזורי צמיחה' : 'Growth Areas'}
          </h3>
          <ul className="snapshot-list">
            {growthAreas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Snapshot;
