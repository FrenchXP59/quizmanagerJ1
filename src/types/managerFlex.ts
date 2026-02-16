import { AnalysisResult } from './quiz';

export interface ManagerFlexState {
    initialDiagnostic: DiagnosticResult | null;
    challenges: Challenge[];
    reDiagnostic: DiagnosticResult | null;
    maturityLevel: 1 | 2 | 3;
}

export interface DiagnosticResult extends AnalysisResult {
    date: string;
    advancedScore?: number; // 1-4
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    feedback: string;
    type: 'modulation' | 'development';
}

export interface FeedbackAnalysisResult {
    keywordsFound: string[];
    sentiment: 'positive' | 'neutral' | 'mixed';
    synthesis: string;
}

export interface ProgressionResult {
    deltaNatural: Record<string, number>;
    deltaStress: Record<string, number>;
    deltaFlexibility: number; // calculated from raw range diff
    deltaStressGap: number; // calculated from raw gap diff
}
