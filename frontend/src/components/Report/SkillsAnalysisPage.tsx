import React from 'react';
import { useTranslation } from 'react-i18next';
import './nbs-styles.css';
import PageLayout from './PageLayout';

export interface SkillData {
  label: string;
  score: number;
  average: number;
}

export interface SkillsAnalysisPageProps {
  skillsData: SkillData[];
  isRTL?: boolean;
  pageNumber?: number;
}

/**
 * SkillsAnalysisPage Component
 * 
 * Displays a detailed analysis of all skills with:
 * - Skill labels (using translation hooks)
 * - User score bars (calculated width: score / 5 * 100%)
 * - Average comparison
 * - Brand colors (Deep Blue for user score, Orange for average)
 */
const SkillsAnalysisPage: React.FC<SkillsAnalysisPageProps> = ({
  skillsData,
  isRTL = false,
  pageNumber = 3
}) => {
  const { t } = useTranslation();
  const MAX_SCORE = 5; // Scale is 1-5

  // Calculate bar width percentage
  const getBarWidth = (score: number): string => {
    const percentage = (score / MAX_SCORE) * 100;
    return `${Math.min(100, Math.max(0, percentage))}%`;
  };

  return (
    <div className="report-page">
      <PageLayout pageNumber={pageNumber} isRTL={isRTL}>
        <div className={`skills-analysis-page ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Page Title */}
        <h2 className="skills-analysis-title">
          {isRTL ? 'ניתוח מיומנויות' : 'Skills Analysis'}
        </h2>

        {/* Subtitle */}
        <p className="skills-analysis-subtitle">
          {isRTL 
            ? 'סקירה מפורטת של המיומנויות הרשתיות שלך בהשוואה לממוצע'
            : 'A detailed overview of your network capabilities compared to the average'
          }
        </p>

        {/* Skills List */}
        <div className="skills-analysis-list">
          {skillsData.map((skill, index) => {
            const userBarWidth = getBarWidth(skill.score);
            const averageBarWidth = getBarWidth(skill.average);
            const isAboveAverage = skill.score > skill.average;

            return (
              <div key={index} className="skills-analysis-item">
                {/* Skill Label */}
                <div className="skills-analysis-label-row">
                  <span className="skills-analysis-label">{skill.label}</span>
                  <span className="skills-analysis-score-value">
                    {skill.score.toFixed(1)}
                  </span>
                </div>

                {/* Progress Bars Container */}
                <div className="skills-analysis-bars-container">
                  {/* User Score Bar */}
                  <div className="skills-analysis-bar-wrapper">
                    <div 
                      className={`skills-analysis-bar skills-analysis-bar-user ${isAboveAverage ? 'above-average' : ''}`}
                      style={{ width: userBarWidth }}
                    >
                      <span className="skills-analysis-bar-label">
                        {isRTL ? 'ציון שלך' : 'Your Score'}
                      </span>
                    </div>
                  </div>

                  {/* Average Score Bar */}
                  <div className="skills-analysis-bar-wrapper">
                    <div 
                      className="skills-analysis-bar skills-analysis-bar-average"
                      style={{ width: averageBarWidth }}
                    >
                      <span className="skills-analysis-bar-label">
                        {isRTL ? 'ממוצע' : 'Average'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Comparison */}
                <div className="skills-analysis-comparison">
                  {isAboveAverage ? (
                    <span className="skills-analysis-comparison-positive">
                      {isRTL 
                        ? `+${(skill.score - skill.average).toFixed(1)} מעל הממוצע`
                        : `+${(skill.score - skill.average).toFixed(1)} above average`
                      }
                    </span>
                  ) : skill.score < skill.average ? (
                    <span className="skills-analysis-comparison-negative">
                      {isRTL 
                        ? `${(skill.average - skill.score).toFixed(1)} מתחת לממוצע`
                        : `${(skill.average - skill.score).toFixed(1)} below average`
                      }
                    </span>
                  ) : (
                    <span className="skills-analysis-comparison-neutral">
                      {isRTL ? 'בממוצע' : 'At average'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="skills-analysis-legend">
          <div className="skills-analysis-legend-item">
            <div className="skills-analysis-legend-color skills-analysis-legend-user"></div>
            <span>{isRTL ? 'ציון שלך' : 'Your Score'}</span>
          </div>
          <div className="skills-analysis-legend-item">
            <div className="skills-analysis-legend-color skills-analysis-legend-average"></div>
            <span>{isRTL ? 'ממוצע' : 'Average'}</span>
          </div>
        </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default SkillsAnalysisPage;
