import React from 'react';
import './nbs-styles.css';

interface Action {
  id: string;
  text: string;
  category: string;
}

interface ActionPlanProps {
  actions?: Action[];
  userName?: string;
  isRTL?: boolean;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ actions = [], userName, isRTL = false }) => {
  const displayActions = Array.isArray(actions) ? actions : [];
  
  return (
    <div className="report-page report-actions">
      <h2 className="page-title">
        {isRTL ? 'המלצות מעשיות' : 'Tactical Actions'}
      </h2>

      <div className="actions-content">
        {displayActions.length > 0 ? (
          <div className="actions-list">
            {displayActions.map((action, idx) => (
              <div key={action?.id || idx} className="action-item">
                <div className="action-number">{idx + 1}</div>
                <div className="action-text">{action?.text || ''}</div>
                <div className="action-category">{action?.category || ''}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="actions-empty">
            <p>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPlan;
