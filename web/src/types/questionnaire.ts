// TypeScript types for questionnaire

export interface Question {
  id: number;
  text: string;
  skill: number;
}

export interface QuestionnaireAnswers {
  [questionId: number]: number;
}

export interface SkillScore {
  skill: number;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface Profile {
  name: string;
  key: string;
  description: string;
  coreIndicators: string[];
  supportingIndicators: string[];
  reinforcingIndicators: string[];
  strengths: string[];
  challenges: string[];
}

export interface QuestionnaireResult {
  userId?: string;
  userName?: string;
  userEmail?: string;
  answers: QuestionnaireAnswers;
  skillScores: SkillScore[];
  primaryArchetype: string;
  secondaryArchetype?: string;
  completedAt: Date;
}

export type Language = 'en' | 'he';
