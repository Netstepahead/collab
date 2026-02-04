import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { questions as questionsData } from '../data/questions';
import { skills as skillsData } from '../data/skills';
import { calculateScores, determineProfile } from '../services/scoringService';
import './Questionnaire.css';

function Questionnaire() {
  const { respondentId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [skills, setSkills] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Page index (each page has 3 questions)
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const QUESTIONS_PER_PAGE = 3;

  const loadQuestions = useCallback(() => {
    const lang = i18n.language || 'he';
    const langKey = lang === 'he' ? 'he' : 'en';
    const questionsList = questionsData[langKey] || [];
    setQuestions(questionsList);
    
    // Initialize answers with empty values
    const initialAnswers = {};
    questionsList.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
    setLoading(false);
  }, [i18n.language]);

  const loadSkills = useCallback(() => {
    const lang = i18n.language || 'he';
    const langKey = lang === 'he' ? 'he' : 'en';
    setSkills(skillsData[langKey] || {});
  }, [i18n.language]);

  const loadProgress = useCallback(() => {
    if (!respondentId) return;
    
    try {
      const saved = localStorage.getItem(`questionnaire_${respondentId}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers) {
          setAnswers(data.answers);
        }
        if (data.currentPage !== undefined) {
          setCurrentPage(data.currentPage);
        }
      }
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  }, [respondentId]);

  const saveProgress = useCallback(() => {
    if (!respondentId) return;
    
    try {
      const data = {
        answers,
        currentPage,
        timestamp: Date.now()
      };
      localStorage.setItem(`questionnaire_${respondentId}`, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  }, [respondentId, answers, currentPage]);

  useEffect(() => {
    loadQuestions();
    loadSkills();
    loadProgress();
  }, [loadQuestions, loadSkills, loadProgress]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Save progress to localStorage whenever answers change
  useEffect(() => {
    if (respondentId && Object.keys(answers).length > 0) {
      saveProgress();
    }
  }, [answers, respondentId, saveProgress]);

  const handleAnswerChange = (questionId, answer) => {
    const newAnswer = parseInt(answer);
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: newAnswer // Ensure answer is a number
      };
      return newAnswers;
    });
  };

  const getCurrentPageQuestions = () => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
    return questions.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  };

  const getCurrentPageSkill = () => {
    const pageQuestions = getCurrentPageQuestions();
    if (pageQuestions.length === 0) return null;
    
    // Get skill ID from first question (all 3 questions on a page belong to same skill)
    let skillId = pageQuestions[0].skill || Math.ceil(pageQuestions[0].id / 3);
    
    // Fix: Swap skill 4 and 5 titles
    // Skill 4 questions (10-12) are actually about Network Diversity
    // Skill 5 questions (13-15) are actually about Strategic Networking
    if (skillId === 4) {
      skillId = 5; // Show "גיוון רשת" for skill 4 questions
    } else if (skillId === 5) {
      skillId = 4; // Show "רשת אסטרטגית" for skill 5 questions
    }
    
    return {
      id: skillId,
      name: skills[skillId] || `Skill ${skillId}`
    };
  };

  const areAllPageQuestionsAnswered = () => {
    const pageQuestions = getCurrentPageQuestions();
    return pageQuestions.every(q => answers[q.id] !== null && answers[q.id] !== undefined);
  };

  const handleNext = () => {
    // Check if all questions on current page are answered
    if (!areAllPageQuestionsAnswered()) {
      const errorMsg = i18n.language === 'he' 
        ? 'אנא ענה על כל השאלות בעמוד הנוכחי לפני שתמשיך'
        : 'Please answer all questions on the current page before continuing';
      setError(errorMsg);
      return;
    }
    
    const totalPages = getTotalPages();
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      setError(''); // Clear error when moving to next page
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setError('');
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unanswered = questions.filter(q => answers[q.id] === null || answers[q.id] === undefined);
    if (unanswered.length > 0) {
      const errorMsg = i18n.language === 'he'
        ? `אנא ענה על כל השאלות. נותרו ${unanswered.length} שאלות ללא מענה.`
        : `Please answer all questions. ${unanswered.length} remaining.`;
      setError(errorMsg);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Prepare responses
      const responses = questions.map(q => ({
        questionId: q.id,
        answer: parseInt(answers[q.id]) || 0
      }));

      // Calculate scores
      const skillScores = calculateScores(responses);
      
      // Determine profile
      const profileResult = determineProfile(skillScores);
      
      // Generate report ID
      const reportId = `report_${respondentId}_${Date.now()}`;
      
      // Get respondent name from localStorage
      const respondentData = localStorage.getItem(`respondent_${respondentId}`);
      const respondent = respondentData ? JSON.parse(respondentData) : { name: 'User' };
      
      // Create report data
      const reportData = {
        reportId,
        respondentId,
        respondentName: respondent.name || 'User',
        createdAt: new Date().toISOString(),
        responses,
        skillScores,
        profileResult,
        language: i18n.language || 'he'
      };
      
      // Save report to localStorage
      localStorage.setItem(`report_${reportId}`, JSON.stringify(reportData));
      
      // Clear questionnaire progress
      localStorage.removeItem(`questionnaire_${respondentId}`);
      
      // Navigate to report
      navigate(`/report/${reportId}`);
    } catch (err) {
      console.error('Error generating report:', err);
      setError(i18n.language === 'he' 
        ? 'שגיאה ביצירת הדוח' 
        : 'Error generating report');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="questionnaire-container">{t('loading')}</div>;
  }

  if (questions.length === 0) {
    return <div className="questionnaire-container">{t('error')}: No questions found</div>;
  }

  const currentPageQuestions = getCurrentPageQuestions();
  const totalPages = getTotalPages();
  const progress = ((currentPage + 1) / totalPages) * 100;
  const allAnswered = questions.every(q => answers[q.id] !== null);
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content">
        <div className="questionnaire-logo">
          <img src="/logo-step-ahead-dark.svg" alt="StepAhead" onError={(e) => { e.target.src = '/logo-step-ahead.png'; }} />
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-header">
          {(() => {
            const currentSkill = getCurrentPageSkill();
            return (
              <>
                {currentSkill && (
                  <h1 className="skill-title">
                    {currentSkill.name}
                  </h1>
                )}
                <h2 className="page-number">
                  {i18n.language === 'he' 
                    ? `עמוד ${currentPage + 1} מתוך ${totalPages}`
                    : `Page ${currentPage + 1} of ${totalPages}`
                  }
                </h2>
              </>
            );
          })()}
        </div>

        <div className="questions-group">
          {currentPageQuestions.map((question, index) => (
            <div key={question.id} className="question-item">
              <div className="question-number">
                {t('question')} {(currentPage * QUESTIONS_PER_PAGE) + index + 1} {t('of')} {questions.length}
              </div>
              <div className="question-body">
                <p className="question-text">{question.text}</p>

                <div className="answer-options">
                  {[1, 2, 3, 4, 5].map(option => (
                    <label key={option} className="answer-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option || answers[question.id] === String(option)}
                        onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                      />
                      <span>{t(`scale.${option}`)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="questionnaire-navigation">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="btn btn-secondary"
          >
            {t('previous')}
          </button>

          {isLastPage ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className="btn btn-primary"
            >
              {submitting ? t('loading') : t('submit')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!areAllPageQuestionsAnswered()}
              className="btn btn-primary"
            >
              {t('next')}
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Questionnaire;
