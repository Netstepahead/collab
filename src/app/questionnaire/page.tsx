'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useQuestionnaireStore } from '@/stores/questionnaireStore';
import { questions } from '@/data/questions';
import { skills } from '@/data/skills';
import '@/lib/i18n';
import './questionnaire.css';

const QUESTIONS_PER_PAGE = 3;

export default function QuestionnairePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState('');

  const {
    currentQuestion,
    answers,
    language,
    setAnswer,
    goToQuestion,
    setLanguage,
    completeQuestionnaire
  } = useQuestionnaireStore();

  useEffect(() => {
    setMounted(true);
    setLanguage(i18n.language as 'en' | 'he');
  }, [i18n.language, setLanguage]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  if (!mounted) {
    return null;
  }

  const currentQuestions = questions[language as 'en' | 'he'];
  const totalQuestions = currentQuestions.length;
  
  // Calculate current page (0-indexed)
  const currentPage = Math.floor((currentQuestion - 1) / QUESTIONS_PER_PAGE);
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  
  // Get questions for current page
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, totalQuestions);
  const pageQuestions = currentQuestions.slice(startIndex, endIndex);
  
  const progress = ((currentPage + 1) / totalPages) * 100;
  const isLastPage = currentPage === totalPages - 1;

  // Get current skill
  const getCurrentSkill = () => {
    if (pageQuestions.length === 0) return null;
    let skillId = pageQuestions[0].skill || Math.ceil(pageQuestions[0].id / 3);
    
    // Fix: Swap skill 4 and 5 titles (from original code)
    if (skillId === 4) {
      skillId = 5;
    } else if (skillId === 5) {
      skillId = 4;
    }
    
    return {
      id: skillId,
      name: skills[language as 'en' | 'he'][skillId] || `Skill ${skillId}`
    };
  };

  const currentSkill = getCurrentSkill();

  // Check if all questions on current page are answered
  const areAllPageQuestionsAnswered = () => {
    return pageQuestions.every(q => answers[q.id] !== null && answers[q.id] !== undefined);
  };

  const allAnswered = currentQuestions.every(q => answers[q.id] !== null && answers[q.id] !== undefined);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswer(questionId, value);
    setError('');
  };

  const handleNext = () => {
    if (!areAllPageQuestionsAnswered()) {
      const errorMsg = i18n.language === 'he'
        ? 'אנא ענה על כל השאלות בעמוד הנוכחי לפני שתמשיך'
        : 'Please answer all questions on the current page before continuing';
      setError(errorMsg);
      return;
    }

    if (currentPage < totalPages - 1) {
      // Go to first question of next page
      const nextPageFirstQuestion = (currentPage + 1) * QUESTIONS_PER_PAGE + 1;
      goToQuestion(nextPageFirstQuestion);
      setError('');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      // Go to first question of previous page
      const prevPageFirstQuestion = (currentPage - 1) * QUESTIONS_PER_PAGE + 1;
      goToQuestion(prevPageFirstQuestion);
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      const unanswered = currentQuestions.filter(q => answers[q.id] === null || answers[q.id] === undefined);
      const errorMsg = i18n.language === 'he'
        ? `אנא ענה על כל השאלות. נותרו ${unanswered.length} שאלות ללא מענה.`
        : `Please answer all questions. ${unanswered.length} remaining.`;
      setError(errorMsg);
      return;
    }

    completeQuestionnaire();
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="questionnaire-container">
        <div className="questionnaire-content">
          {/* Logo */}
          <div className="questionnaire-logo">
            <img 
              src="/logo-step-ahead-dark.png" 
              alt="StepAhead"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/logo-step-ahead.png';
              }}
            />
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Question Header */}
          <div className="question-header">
            {currentSkill && (
              <h1 className="skill-title">{currentSkill.name}</h1>
            )}
            <h2 className="page-number">
              {i18n.language === 'he'
                ? `עמוד ${currentPage + 1} מתוך ${totalPages}`
                : `Page ${currentPage + 1} of ${totalPages}`}
            </h2>
          </div>

          {/* Questions Group */}
          <div className="questions-group">
            {pageQuestions.map((question, index) => {
              const absoluteQuestionNumber = startIndex + index + 1;
              const currentAnswer = answers[question.id];

              return (
                <div key={question.id} className="question-item">
                  <div className="question-number">
                    {t('question')} {absoluteQuestionNumber} {t('of')} {totalQuestions}
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
                            checked={currentAnswer === option}
                            onChange={() => handleAnswer(question.id, option)}
                          />
                          <span>{t(`scale.${option}`)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
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
                disabled={!allAnswered}
                className="btn btn-primary"
              >
                {t('submit')}
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
    </div>
  );
}
