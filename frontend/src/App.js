import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import Home from './components/Home';
import Questionnaire from './components/Questionnaire';
import Report from './components/Report';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="App">
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire/:respondentId" element={<Questionnaire />} />
          <Route path="/report/:reportId" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
