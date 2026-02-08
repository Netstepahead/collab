import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuestionnaireAnswers, Language } from '@/types/questionnaire';

interface QuestionnaireState {
  // User info
  userName: string;
  userEmail: string;
  
  // Questionnaire state
  currentQuestion: number;
  answers: QuestionnaireAnswers;
  language: Language;
  isCompleted: boolean;
  
  // Actions
  setUserInfo: (name: string, email: string) => void;
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (questionNumber: number) => void;
  setLanguage: (lang: Language) => void;
  completeQuestionnaire: () => void;
  resetQuestionnaire: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set) => ({
      // Initial state
      userName: '',
      userEmail: '',
      currentQuestion: 1,
      answers: {},
      language: 'en',
      isCompleted: false,

      // Actions
      setUserInfo: (name, email) =>
        set({ userName: name, userEmail: email }),

      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value }
        })),

      nextQuestion: () =>
        set((state) => ({
          currentQuestion: Math.min(state.currentQuestion + 1, 36)
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 1)
        })),

      goToQuestion: (questionNumber) =>
        set({ currentQuestion: questionNumber }),

      setLanguage: (lang) =>
        set({ language: lang }),

      completeQuestionnaire: () =>
        set({ isCompleted: true }),

      resetQuestionnaire: () =>
        set({
          userName: '',
          userEmail: '',
          currentQuestion: 1,
          answers: {},
          isCompleted: false
        })
    }),
    {
      name: 'questionnaire-storage'
    }
  )
);
