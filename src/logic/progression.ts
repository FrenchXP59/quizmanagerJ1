import { DiagnosticResult, ProgressionResult } from '../types/managerFlex';

export const calculateProgression = (initial: DiagnosticResult, current: DiagnosticResult): ProgressionResult => {
    const deltaNatural: Record<string, number> = {};
    const deltaStress: Record<string, number> = {};

    ['directif', 'persuasif', 'participatif', 'delegatif'].forEach(style => {
        deltaNatural[style] = current.natural[style as keyof typeof current.natural] - initial.natural[style as keyof typeof initial.natural];
        deltaStress[style] = current.stress[style as keyof typeof current.stress] - initial.stress[style as keyof typeof initial.stress];
    });

    // Simple flexibility score mapping helper
    const flexScore = (f: 'faible' | 'modéré' | 'élevé') => f === 'faible' ? 1 : f === 'modéré' ? 2 : 3;
    const deltaFlexibility = flexScore(current.flexibility) - flexScore(initial.flexibility);

    const stressGapScore = (s: 'faible' | 'modéré' | 'élevé') => s === 'faible' ? 1 : s === 'modéré' ? 2 : 3;
    const deltaStressGap = stressGapScore(current.stressGap) - stressGapScore(initial.stressGap);

    return {
        deltaNatural,
        deltaStress,
        deltaFlexibility,
        deltaStressGap
    };
};
