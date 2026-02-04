import React from 'react';
import './nbs-styles.css';

interface CoverPageProps {
  LogoPath?: string;
  logoPath?: string;
  userName?: string;
  date?: string;
  isRTL?: boolean;
}

const CoverPage: React.FC<CoverPageProps> = ({ LogoPath, logoPath, userName, date, isRTL = false }) => {
  // Use dark logo (white text) for dark background
  const logo = LogoPath || logoPath || '/logo-step-ahead-dark.png';
  const displayName = userName || 'User';
  const displayDate = date || new Date().toLocaleDateString(isRTL ? 'he-IL' : 'en-US');

  return (
    <div className="report-page report-cover">
      <div className="cover-content">
        <div className="cover-logo">
          <img 
            src={logo} 
            alt="StepAhead" 
            onError={(e) => { 
              // Hide logo if not found
              (e.target as HTMLImageElement).style.display = 'none';
            }} 
          />
        </div>
        <h1 className="cover-title">
          {isRTL ? 'פרופיל היכולות הרשתיות שלך' : 'Your Network Capabilities Profile'}
        </h1>
        <div className="cover-name">{displayName}</div>
        <div className="cover-date">{displayDate}</div>
        <div className="cover-confidential">
          {isRTL ? 'סודי - לשימוש אישי בלבד' : 'Confidential - For personal use only'}
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
