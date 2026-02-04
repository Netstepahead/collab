import React from 'react';
import './nbs-styles.css';

interface PageLayoutProps {
  children: React.ReactNode;
  pageNumber?: number;
  isRTL?: boolean;
}

/**
 * PageLayout Component
 * 
 * A reusable wrapper component for report pages that provides:
 * - Uniform background
 * - Header with logo and "Personal Report" text
 * - Footer with page number and "Confidential" text
 * - Consistent padding
 */
const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  pageNumber,
  isRTL = false 
}) => {
  const getLogoPath = () => {
    return '/logo-step-ahead-dark.svg';
  };

  return (
    <div className={`page-layout ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="page-layout-header">
        <div className="page-layout-logo">
          <img 
            src={getLogoPath()} 
            alt="StepAhead" 
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
          />
        </div>
        <div className="page-layout-header-text">
          {isRTL ? 'דוח אישי' : 'Personal Report'}
        </div>
      </div>

      {/* Content */}
      <div className="page-layout-content">
        {children}
      </div>

      {/* Footer */}
      <div className="page-layout-footer">
        {pageNumber && (
          <div className="page-layout-page-number">
            {isRTL ? `עמוד ${pageNumber}` : `Page ${pageNumber}`}
          </div>
        )}
        <div className="page-layout-confidential">
          {isRTL ? 'סודי - לשימוש אישי בלבד' : 'Confidential - For personal use only'}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
