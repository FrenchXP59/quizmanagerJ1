import { Question } from '../types/quiz';

// Using a high ID range for advanced questions to avoid conflict
export const advancedQuestions: Question[] = [
    { id: 101, text: "J'ai pris conscience de mes biais naturels et je les corrige en temps réel.", style: 'directif', module: 'expert' }, // Style is dummy here, used for structure
    { id: 102, text: "J'adapte consciemment mon style de communication à chaque interlocuteur.", style: 'directif', module: 'expert' },
    { id: 103, text: "Je suis capable d'utiliser un style qui n'est pas naturel pour moi quand la situation l'exige.", style: 'directif', module: 'expert' },
    { id: 104, text: "Je mesure régulièrement l'impact de mes décisions sur la motivation de l'équipe.", style: 'directif', module: 'expert' }
];

// Note: These questions contribute to 'advancedScore' (average 1-4), not the style profiles.
// The 'style' and 'module' fields are kept to satisfy the Question interface but ignored in scoring.
