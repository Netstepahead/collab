import React from 'react';
import './nbs-styles.css';

interface BackCoverProps {
  LogoPath?: string;
  logoPath?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  isRTL?: boolean;
}

const BackCover: React.FC<BackCoverProps> = ({ LogoPath, logoPath, contactInfo, isRTL = false }) => {
  const logo = LogoPath || logoPath || '/logo-step-ahead-dark.svg';
  
  // Default contact info with StepAhead details
  const defaultContact = {
    email: 'info@step-ahead.com',
    website: 'www.step-ahead.com'
  };
  
  const contact = { ...defaultContact, ...(contactInfo || {}) };

  return (
    <div className="report-page report-back-cover">
      <div className="back-cover-content">
        <div className="back-cover-logo">
          <img src={logo} alt="StepAhead" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
        
        <div className="back-cover-info">
          <h3 className="back-cover-title">
            {isRTL ? 'צור קשר' : 'Contact Us'}
          </h3>
          
          <div className="contact-item">
            <span className="contact-label">{isRTL ? 'אימייל:' : 'Email:'}</span>
            <span className="contact-value">{contact.email}</span>
          </div>
          
          {contact?.phone && (
            <div className="contact-item">
              <span className="contact-label">{isRTL ? 'טלפון:' : 'Phone:'}</span>
              <span className="contact-value">{contact.phone}</span>
            </div>
          )}
          
          <div className="contact-item">
            <span className="contact-label">{isRTL ? 'אתר:' : 'Website:'}</span>
            <span className="contact-value">{contact.website}</span>
          </div>
        </div>

        <div className="back-cover-footer">
          <p>{isRTL ? '© StepAhead - כל הזכויות שמורות' : '© StepAhead - All rights reserved'}</p>
        </div>
      </div>
    </div>
  );
};

export default BackCover;
