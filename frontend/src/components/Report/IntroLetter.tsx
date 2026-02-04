import React from 'react';
import './nbs-styles.css';

interface IntroLetterProps {
  userName: string;
  isRTL: boolean;
}

const IntroLetter: React.FC<IntroLetterProps> = ({ userName, isRTL }) => {
  return (
    <div className="report-page report-intro">
      <div className="intro-background"></div>
      <div className="intro-decoration">
        <svg className="network-graphic" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid meet">
          {/* Decorative network lines */}
          <path d="M50,50 Q100,150 50,250 T50,450" stroke="#4472C4" strokeWidth="2" fill="none" opacity="0.3" />
          <circle cx="50" cy="50" r="8" fill="#4472C4" opacity="0.5" />
          <circle cx="50" cy="250" r="8" fill="#4472C4" opacity="0.5" />
          <circle cx="50" cy="450" r="8" fill="#4472C4" opacity="0.5" />
        </svg>
      </div>
      <div className="intro-content">
        <div className="intro-greeting">
          {isRTL ? `היי ${userName}` : `Hi ${userName}`}
        </div>
        <div className="intro-paragraphs">
          {isRTL ? (
            <>
              <p>
                הניתוח המפורט בדפים הבאים מבוסס על התשובות שלך לשאלון פרופיל היכולות הרשתיות.
              </p>
              <p>
                הדוח מציג את נקודות החוזק והאתגרים שלך בתחום הרשתות המקצועיות, ומציע המלצות מותאמות אישית לפיתוח יכולותיך הרשתיות.
              </p>
              <p>
                אנו מקווים שהדוח יעזור לך להבין טוב יותר את הרשת המקצועית שלך ולפתח אותה בצורה אסטרטגית.
              </p>
            </>
          ) : (
            <>
              <p>
                The detailed analysis in the following pages is based on your responses to the Network Capabilities Profile questionnaire.
              </p>
              <p>
                The report presents your strengths and challenges in professional networking, and offers personalized recommendations for developing your network capabilities.
              </p>
              <p>
                We hope this report will help you better understand your professional network and develop it strategically.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroLetter;
