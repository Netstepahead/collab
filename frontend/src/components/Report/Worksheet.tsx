import React, { useState } from 'react';
import './nbs-styles.css';

interface WorksheetProps {
  isRTL?: boolean;
}

const Worksheet: React.FC<WorksheetProps> = ({ isRTL = false }) => {
  const [goal, setGoal] = useState('');
  const [action, setAction] = useState('');
  const [timeline, setTimeline] = useState('');
  const [helpers, setHelpers] = useState('');

  return (
    <div className="report-page report-worksheet">
      <h2 className="page-title">
        {isRTL ? 'תוכנית עבודה' : 'Personal Worksheet'}
      </h2>

      <div className="worksheet-content">
        <div className="worksheet-form">
          <div className="worksheet-field">
            <label className="worksheet-label">
              {isRTL ? 'מטרה' : 'Goal'}
            </label>
            <textarea
              className="worksheet-input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={isRTL ? 'מה המטרה שלך?' : 'What is your goal?'}
              rows={3}
            />
          </div>

          <div className="worksheet-field">
            <label className="worksheet-label">
              {isRTL ? 'פעולה' : 'Action'}
            </label>
            <textarea
              className="worksheet-input"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder={isRTL ? 'מה תעשה?' : 'What will you do?'}
              rows={3}
            />
          </div>

          <div className="worksheet-field">
            <label className="worksheet-label">
              {isRTL ? 'זמן' : 'Timeline'}
            </label>
            <input
              type="text"
              className="worksheet-input"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder={isRTL ? 'מתי?' : 'When?'}
            />
          </div>

          <div className="worksheet-field">
            <label className="worksheet-label">
              {isRTL ? 'עוזרים' : 'Helpers'}
            </label>
            <textarea
              className="worksheet-input"
              value={helpers}
              onChange={(e) => setHelpers(e.target.value)}
              placeholder={isRTL ? 'מי יכול לעזור?' : 'Who can help?'}
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
