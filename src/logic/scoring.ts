import { questions } from '../data/questions';
import { AnalysisResult, StyleType } from '../types/quiz';

const MAX_SCORE_PER_STYLE_NATURAL = 24;

// Re-using the logic from utils/scoring.ts but placing it in logic structure as requested
// Also handling potential 'advanced' inputs if passed (not in basic AnalysisResult but part of input)

export const calculateScores = (answers: Record<number, number>): AnalysisResult => {
    const scores = {
        natural: { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 },
        stress: { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 }
    };

    // We need to access questions directly or pass them. Importing from data/questions
    Object.entries(answers).forEach(([qId, score]) => {
        const question = questions.find(q => q.id === parseInt(qId));
        if (!question) return;

        // Skip advanced questions (IDs > 100 for example, if any) from this calc
        // Logic: standard questions are 1-30
        if (question.id > 100) return;

        if (question.module === 'stress') {
            scores.stress[question.style] += score;
        } else {
            scores.natural[question.style] += score;
        }
    });

    const stressCounts = { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 };
    const naturalCounts = { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 };

    questions.forEach(q => {
        // Only count standard questions
        if (q.id > 100) return;

        if (q.module === 'stress') stressCounts[q.style]++;
        else naturalCounts[q.style]++;
    });

    const normalize = (val: number, max: number) => max === 0 ? 0 : Math.round((val / (max * 4)) * 100);

    const finalNatural = {
        directif: normalize(scores.natural.directif, naturalCounts.directif),
        persuasif: normalize(scores.natural.persuasif, naturalCounts.persuasif),
        participatif: normalize(scores.natural.participatif, naturalCounts.participatif),
        delegatif: normalize(scores.natural.delegatif, naturalCounts.delegatif),
    };

    const finalStress = {
        directif: normalize(scores.stress.directif, stressCounts.directif),
        persuasif: normalize(scores.stress.persuasif, stressCounts.persuasif),
        participatif: normalize(scores.stress.participatif, stressCounts.participatif),
        delegatif: normalize(scores.stress.delegatif, stressCounts.delegatif),
    };

    // Dominant Style (Natural)
    const dominant = (Object.keys(finalNatural) as StyleType[]).reduce((a, b) => finalNatural[a] > finalNatural[b] ? a : b);

    // Secondary Style
    const sortedStyles = (Object.keys(finalNatural) as StyleType[]).sort((a, b) => finalNatural[b] - finalNatural[a]);
    const secondary = sortedStyles[1];

    // Flexibility Index (Dispersion)
    const values = Object.values(finalNatural);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    let flexibility: 'faible' | 'modéré' | 'élevé' = 'modéré';
    if (range < 20) flexibility = 'élevé';
    else if (range > 50) flexibility = 'faible';

    // Stress Gap
    const totalShift = (Object.keys(finalNatural) as StyleType[]).reduce((sum, style) => {
        return sum + Math.abs(finalNatural[style] - finalStress[style]);
    }, 0);

    const avgShift = totalShift / 4;
    let stressGap: 'faible' | 'modéré' | 'élevé' = 'modéré';
    if (avgShift < 10) stressGap = 'faible';
    else if (avgShift > 25) stressGap = 'élevé';

    return {
        natural: finalNatural,
        stress: finalStress,
        flexibility,
        dominant,
        secondary,
        stressGap,
        dispersion: range,
        stressGapRaw: avgShift
    };
};

export const calculateAdvancedScore = (answers: Record<number, number>): number => {
    // Advanced questions IDs are 101, 102, 103, 104
    let total = 0;
    let count = 0;
    [101, 102, 103, 104].forEach(id => {
        if (answers[id]) {
            total += answers[id];
            count++;
        }
    });
    return count > 0 ? parseFloat((total / count).toFixed(1)) : 0;
};
