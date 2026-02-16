export type StyleType = 'directif' | 'persuasif' | 'participatif' | 'delegatif';

export interface Question {
  id: number;
  text: string;
  style: StyleType;
  module: 'decision' | 'beginner' | 'expert' | 'crisis' | 'stress';
}

export interface StyleDefinition {
  name: string;
  description: string;
  characteristics: string[];
  color: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> score (1-4)
  isFinished: boolean;
  history: number[]; // For navigation
}

export interface AnalysisResult {
  natural: Record<StyleType, number>;
  stress: Record<StyleType, number>;
  flexibility: 'faible' | 'modéré' | 'élevé';
  dominant: StyleType;
  secondary: StyleType;
  stressGap: 'faible' | 'modéré' | 'élevé';
  dispersion: number;
  stressGapRaw: number;
}
