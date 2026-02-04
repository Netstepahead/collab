import React from 'react';
import './nbs-styles.css';

interface Pillar {
  title: string;
  description: string;
  actions: string[];
}

interface StrategyRoadmapProps {
  pillars?: Pillar[];
  recommendations?: Array<{ title?: string; description?: string; actions?: string[] }>;
  isRTL?: boolean;
}

const StrategyRoadmap: React.FC<StrategyRoadmapProps> = ({ pillars, recommendations, isRTL = false }) => {
  // Convert recommendations to pillars format if needed
  let displayPillars: Pillar[] = [];
  if (pillars && pillars.length > 0) {
    displayPillars = pillars;
  } else if (recommendations && recommendations.length > 0) {
    displayPillars = recommendations.map(rec => ({
      title: rec?.title || '',
      description: rec?.description || '',
      actions: rec?.actions || []
    }));
  }

  return (
    <div className="report-page report-roadmap">
      <h2 className="page-title">
        {isRTL ? 'מפת דרכים - אסטרטגיה' : 'Growth Roadmap'}
      </h2>

      <div className="roadmap-content">
        {displayPillars.length > 0 ? (
          displayPillars.map((pillar, idx) => (
            <div key={idx} className="pillar-item">
              <div className="pillar-number">{idx + 1}</div>
              <div className="pillar-content">
                <h3 className="pillar-title">{pillar?.title || `Pillar ${idx + 1}`}</h3>
                <p className="pillar-description">{pillar?.description || ''}</p>
                {pillar?.actions && pillar.actions.length > 0 && (
                  <ul className="pillar-actions">
                    {pillar.actions.map((action, actionIdx) => (
                      <li key={actionIdx}>{action || ''}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="roadmap-empty">
            <p>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyRoadmap;
