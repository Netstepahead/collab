import React from 'react';
import './nbs-styles.css';

interface ScoreData {
  category: string;
  userScore: number;
  averageScore: number;
}

interface ScoreChartSectionProps {
  scores?: ScoreData[] | Record<string, any>;
  isRTL?: boolean;
  pageNumber?: number;
}

const ScoreChartSection: React.FC<ScoreChartSectionProps> = ({ scores, isRTL = false, pageNumber }) => {
  const maxScore = 5.0;
  
  // Handle both array and object formats
  let scoresArray: ScoreData[] = [];
  if (Array.isArray(scores)) {
    scoresArray = scores;
  } else if (scores && typeof scores === 'object') {
    // Convert object to array format
    scoresArray = Object.entries(scores).map(([key, value]: [string, any]) => ({
      category: value?.category || key,
      userScore: value?.userScore || value?.average || 0,
      averageScore: value?.averageScore || value?.average || 3.5
    }));
  }

  return (
    <div className="report-page report-charts">
      <h2 className="page-title">
        {isRTL ? 'צלילה לנתונים' : 'Data Dive'}
        {pageNumber && (
          <span style={{ fontSize: '0.7em', marginLeft: '10px', marginRight: '10px', opacity: 0.7 }}>
            {isRTL ? `חלק ${pageNumber}` : `Part ${pageNumber}`}
          </span>
        )}
      </h2>

      <div className="charts-container">
        {scoresArray.length > 0 ? (
          scoresArray.map((score, idx) => {
            const userScore = score?.userScore || 0;
            const avgScore = score?.averageScore || 0;
            const userPercentage = (userScore / maxScore) * 100;
            const avgPercentage = (avgScore / maxScore) * 100;

            return (
              <div key={idx} className="chart-item">
                <div className="chart-label">{score?.category || `Category ${idx + 1}`}</div>
                <div className="chart-bars">
                  <div className="chart-bar-container">
                    <div className="chart-bar-label">
                      {isRTL ? 'הציון שלך' : 'Your Score'}
                    </div>
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar user-bar" 
                        style={{ width: `${userPercentage}%` }}
                      >
                        <span className="chart-bar-value">{userScore.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="chart-bar-container">
                    <div className="chart-bar-label">
                      {isRTL ? 'ממוצע' : 'Average'}
                    </div>
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar average-bar" 
                        style={{ width: `${avgPercentage}%` }}
                      >
                        <span className="chart-bar-value">{avgScore.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="charts-empty">
            <p>{isRTL ? 'נתונים לא זמינים' : 'Data not available'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreChartSection;
