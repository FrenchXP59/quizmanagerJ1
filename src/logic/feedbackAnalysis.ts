import { FeedbackAnalysisResult } from '../types/managerFlex';

const POSITIVE_KEYWORDS = ['utile', 'appris', 'mieux', 'bien', 'équipe', 'confiance', 'clair', 'succès', 'réussi'];
const NEGATIVE_KEYWORDS = ['difficile', 'compliqué', 'refus', 'temps', 'inutile', 'dur', 'pas réussi', 'résistance'];

export const analyzeFeedback = (feedbacks: string[]): FeedbackAnalysisResult => {
    const combinedFeedback = feedbacks.join(' ').toLowerCase();

    const foundPositive = POSITIVE_KEYWORDS.filter(kw => combinedFeedback.includes(kw));
    const foundNegative = NEGATIVE_KEYWORDS.filter(kw => combinedFeedback.includes(kw));

    let sentiment: 'positive' | 'neutral' | 'mixed' = 'neutral';

    if (foundPositive.length > foundNegative.length) sentiment = 'positive';
    else if (foundNegative.length > foundPositive.length && foundPositive.length > 0) sentiment = 'mixed';
    else if (foundNegative.length > 0) sentiment = 'neutral'; // Or negative, but kept simple

    let synthesis = "Nouvelles approches testées.";
    if (sentiment === 'positive') {
        synthesis = "L'intégration des nouvelles pratiques semble efficace et bien accueillie par l'équipe.";
    } else if (sentiment === 'mixed') {
        synthesis = "La dynamique de changement est amorcée malgré certaines résistances observées.";
    } else if (foundNegative.length > 0) {
        synthesis = "Des difficultés d'application ont été rencontrées ; l'analyse des points de blocage est nécessaire.";
    }

    return {
        keywordsFound: [...foundPositive, ...foundNegative],
        sentiment,
        synthesis
    };
};
