import { ManagerFlexState } from '../types/managerFlex';

export const calculateMaturityLevel = (state: ManagerFlexState): 1 | 2 | 3 => {
    // 1. Si pas de diagnostic initial -> Niveau 1 (ou 0, mais ici on assume 1 dès qu'on commence)
    if (!state.initialDiagnostic) return 1;

    // 2. Si Re-Diagnostic existe, on vérifie les critères d'excellence pour le niveau 3
    if (state.reDiagnostic) {
        const { dispersion, stressGapRaw, advancedScore } = state.reDiagnostic;

        // Critères stricts pour Niveau 3
        const isDispersionGood = dispersion < 30;
        const isStressGapGood = stressGapRaw < 15;
        const isAdvancedGood = (advancedScore || 0) > 3.2;

        if (isDispersionGood && isStressGapGood && isAdvancedGood) {
            return 3;
        }
        // Sinon, on reste au niveau 2 (même avec re-diag)
        return 2;
    }

    // 3. Si Challenges validés (mais pas encore de re-diag) -> Niveau 2
    // Règle: 3 défis cochés ET feedback > 20 chars
    const allChallengesCompleted = state.challenges.length > 0 && state.challenges.every(c => c.completed && c.feedback.length > 20);
    if (allChallengesCompleted) {
        return 2;
    }

    // Sinon défaut Niveau 1
    return 1;
};
