import React from 'react';
import { useTranslation } from 'react-i18next';
import './nbs-styles.css';
import PageLayout from './PageLayout';

export interface StrengthCard {
  title: string;
  score: number;
  description: string;
  iconName: string;
}

export interface PrimaryArchetype {
  strengths: StrengthCard[];
  [key: string]: any; // Allow other properties
}

export interface StrengthsDeepDivePageProps {
  primaryArchetype: PrimaryArchetype;
  isRTL?: boolean;
  pageNumber?: number;
}

/**
 * IconMap - Maps icon names to icon components
 * Using simple SVG icons as fallback since Lucide might not be installed
 */
const IconMap: Record<string, React.ReactNode> = {
  magnet: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8c0-2.21 1.79-4 4-4s4 1.79 4 4v12c0 2.21-1.79 4-4 4s-4-1.79-4-4V8z" />
      <path d="M6 8h12" />
      <path d="M12 8v12" />
    </svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
    </svg>
  ),
  users: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  network: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="8" y1="7" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="7" />
      <line x1="8" y1="17" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="17" />
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  zap: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  default: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
};

/**
 * StrengthsDeepDivePage Component
 * 
 * Displays a deep dive into strengths with cards showing:
 * - Icon
 * - Title
 * - Score
 * - Description
 * 
 * All content is dynamically loaded from primaryArchetype.strengths
 */
const StrengthsDeepDivePage: React.FC<StrengthsDeepDivePageProps> = ({
  primaryArchetype,
  isRTL = false,
  pageNumber = 5
}) => {
  const { t } = useTranslation();
  const strengths = primaryArchetype?.strengths || [];

  // Get icon component from iconName
  const getIcon = (iconName: string): React.ReactNode => {
    return IconMap[iconName.toLowerCase()] || IconMap.default;
  };

  // Calculate bar width for score (assuming scale 1-5)
  const getScoreWidth = (score: number): string => {
    const percentage = (score / 5) * 100;
    return `${Math.min(100, Math.max(0, percentage))}%`;
  };

  return (
    <div className="report-page">
      <PageLayout pageNumber={pageNumber} isRTL={isRTL}>
        <div className={`strengths-deep-dive-page ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Page Title */}
          <h2 className="strengths-deep-dive-title">
            {isRTL ? 'חוזקות בולטות' : 'Strengths Deep Dive'}
          </h2>

          {/* Subtitle */}
          <p className="strengths-deep-dive-subtitle">
            {isRTL
              ? 'סקירה מפורטת של החוזקות המרכזיות שלך ברשת'
              : 'A detailed overview of your key network strengths'
            }
          </p>

          {/* Strengths Cards Grid */}
          <div className="strengths-deep-dive-grid">
            {strengths.map((strength, index) => (
              <div key={index} className="strength-card">
                {/* Icon */}
                <div className="strength-card-icon">
                  {getIcon(strength.iconName)}
                </div>

                {/* Header */}
                <div className="strength-card-header">
                  <h3 className="strength-card-title">{strength.title}</h3>
                  <div className="strength-card-score">
                    <span className="strength-card-score-value">{strength.score.toFixed(1)}</span>
                    <span className="strength-card-score-label">/ 5.0</span>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="strength-card-score-bar-wrapper">
                  <div
                    className="strength-card-score-bar"
                    style={{ width: getScoreWidth(strength.score) }}
                  />
                </div>

                {/* Description */}
                <p className="strength-card-description">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default StrengthsDeepDivePage;
