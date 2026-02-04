import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

// Simple UUID generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [continueId, setContinueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartNew = () => {
    // Validate name is required
    if (!name || !name.trim()) {
      const errorMsg = i18n.language === 'he' 
        ? 'אנא הזן את שמך'
        : 'Please enter your name';
      setError(errorMsg);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Generate unique ID for respondent
      const respondentId = generateUUID();
      
      // Save respondent data to localStorage
      const respondentData = {
        id: respondentId,
        name: name.trim(),
        email: email ? email.trim() : null,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(`respondent_${respondentId}`, JSON.stringify(respondentData));
      
      navigate(`/questionnaire/${respondentId}`);
    } catch (err) {
      console.error('Error starting questionnaire:', err);
      setError(i18n.language === 'he' 
        ? 'שגיאה בהתחלת השאלון' 
        : 'Failed to start questionnaire');
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!continueId.trim()) {
      setError(i18n.language === 'he' 
        ? 'אנא הזן מזהה' 
        : 'Please enter an ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if respondent exists in localStorage
      const savedData = localStorage.getItem(`respondent_${continueId}`);
      if (!savedData) {
        // Create new respondent if doesn't exist
        const respondentData = {
          id: continueId,
          name: name || null,
          email: email || null,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`respondent_${continueId}`, JSON.stringify(respondentData));
      } else if (name || email) {
        // Update existing respondent
        const respondentData = JSON.parse(savedData);
        if (name) respondentData.name = name.trim();
        if (email) respondentData.email = email.trim();
        localStorage.setItem(`respondent_${continueId}`, JSON.stringify(respondentData));
      }

      navigate(`/questionnaire/${continueId}`);
    } catch (err) {
      console.error('Error continuing questionnaire:', err);
      setError(i18n.language === 'he' 
        ? 'שגיאה בהמשך השאלון' 
        : 'Failed to continue questionnaire');
      setLoading(false);
    }
  };

  const handleQuickTest = () => {
    setLoading(true);
    setError('');

    try {
      // Generate test report with sample data
      const testReportId = `test_${Date.now()}`;
      const testReportData = {
        reportId: testReportId,
        respondentId: 'test',
        respondentName: 'Test User',
        createdAt: new Date().toISOString(),
        language: i18n.language || 'he',
        // Sample test data - you can customize this
        skillScores: {
          1: { average: 4.2 },
          2: { average: 3.8 },
          3: { average: 4.0 },
          4: { average: 3.5 },
          5: { average: 4.1 },
          6: { average: 4.3 },
          7: { average: 4.0 },
          8: { average: 3.9 },
          9: { average: 4.2 },
          10: { average: 4.1 },
          11: { average: 3.8 },
          12: { average: 4.0 }
        },
        profileResult: {
          primary: 'magnet',
          primaryScore: 4.15,
          secondary: null,
          secondaryScore: null
        }
      };
      
      localStorage.setItem(`report_${testReportId}`, JSON.stringify(testReportData));
      navigate(`/report/${testReportId}`);
    } catch (err) {
      console.error('Error generating test report:', err);
      setError(i18n.language === 'he' 
        ? 'שגיאה ביצירת דוח בדיקה' 
        : 'Failed to generate test report');
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-logo">
          <img src="/logo-step-ahead.png" alt="StepAhead" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <h1>{t('welcome')}</h1>
        
        <div className="home-section">
          <h2>{t('enterYourInfo')}</h2>
          <div className="form-group">
            <label>{t('name')} <span className="required">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('yourName')}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('yourEmail')}
            />
          </div>
        </div>

        <div className="home-section">
          <h2>{t('startQuestionnaire')}</h2>
          <button
            onClick={handleStartNew}
            disabled={loading}
            className="btn btn-primary"
          >
            {t('start')}
          </button>
        </div>

        <div className="home-section">
          <h2>{t('continueQuestionnaire')}</h2>
          <p className="info-text">
            {i18n.language === 'he' 
              ? 'אם התחלת שאלון בעבר, הזן את המזהה שקיבלת בסוף השאלון או בדוא"ל שלך.'
              : 'If you started a questionnaire before, enter the ID you received at the end of the questionnaire or in your email.'}
          </p>
          <div className="form-group">
            <label>{t('enterId')}</label>
            <input
              type="text"
              value={continueId}
              onChange={(e) => setContinueId(e.target.value)}
              placeholder={i18n.language === 'he' ? 'הזן מזהה' : 'Enter ID'}
            />
          </div>
          <button
            onClick={handleContinue}
            disabled={loading || !continueId.trim()}
            className="btn btn-secondary"
          >
            {t('continue')}
          </button>
        </div>

        <div className="home-section">
          <button
            onClick={handleQuickTest}
            disabled={loading}
            className="btn btn-test"
          >
            {t('quickTest')}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">{t('loading')}</div>}
      </div>
    </div>
  );
}

export default Home;
