import React from 'react';
import './nbs-styles.css';

export interface ArchetypeRevealProps {
  title?: string;
  tagline?: string;
  descriptionPoints?: string[];
  graphic?: React.ReactNode;
  archetypeKey?: string;
  isPrimary?: boolean;
  isRTL?: boolean;
}

/**
 * ArchetypeReveal Component
 * 
 * Displays the user's primary archetype with graphic, title, tagline, and description.
 * This is a "dumb" component that receives all content via props.
 * 
 * Used for Pages 7-8 of the report.
 */
const ArchetypeReveal: React.FC<ArchetypeRevealProps> = ({
  title,
  tagline,
  descriptionPoints,
  graphic,
  archetypeKey,
  isPrimary = true,
  isRTL = false
}) => {
  const displayTitle = title || (isRTL ? 'הטיפוס הרשתי שלך' : 'Your Network Archetype');
  const displayTagline = tagline || (isRTL ? 'גלה את הפרופיל הרשתי שלך' : 'Discover your network profile');
  const displayPoints = descriptionPoints || [
    isRTL ? 'הפרופיל הרשתי שלך משקף את הדפוסים וההתנהגויות שלך ביצירת קשרים מקצועיים.' : 'Your network profile reflects your patterns and behaviors in creating professional connections.'
  ];

  return (
    <div className={`report-page report-archetype-reveal ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="archetype-reveal-container">
        {/* Graphic Section */}
        {graphic && (
          <div className="archetype-graphic-large">
            {graphic}
          </div>
        )}

        {/* Title Section */}
        <div className="archetype-header">
          <h2 className="archetype-name-large">{displayTitle}</h2>
          <p className="archetype-tagline">{displayTagline}</p>
        </div>

        {/* Description Section */}
        <div className="archetype-definition">
          {displayPoints.map((point, index) => (
            <p key={index} className="archetype-description-point">
              {point || ''}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeReveal;
