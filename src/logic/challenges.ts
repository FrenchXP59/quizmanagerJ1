import { AnalysisResult } from '../types/quiz';
import { Challenge } from '../types/managerFlex';

const CHALLENGE_MAPPING: Record<string, { title: string, description: string }[]> = {
    directif: [
        { title: "La règle des 3 questions", description: "Avant de donner une solution, posez 3 questions à votre collaborateur (Qu'en penses-tu ? Quelles options ? Ta reco ?)" },
        { title: "Débrief inversé", description: "Demandez à un collaborateur de vous faire un feedback sur votre clarté après une réunion." },
        { title: "Silence actif", description: "En réunion, attendez 10 secondes après une question avant de reprendre la parole." }
    ],
    persuasif: [
        { title: "Écoute sans vente", description: "Faites un point de 15 min sans chercher à convaincre, juste pour comprendre les freins." },
        { title: "Feedback factuel", description: "Donnez un feedback basé uniquement sur des faits observés, sans interprétation ni justification." },
        { title: "Délégation du 'Pourquoi'", description: "Laissez un collaborateur expliquer la vision à l'équipe à votre place." }
    ],
    participatif: [
        { title: "Décision unilatérale assumée", description: "Sur un sujet mineur, tranchez seul et annoncez la décision sans justification excessive." },
        { title: "Time-boxing", description: "Fixez une limite de temps stricte (ex: 20 min) pour atteindre un consensus, sinon tranchez." },
        { title: "Feedback recadrage", description: "Faites un recadrage bienveillant mais ferme à un collaborateur qui dépasse les bornes." }
    ],
    delegatif: [
        { title: "Vis ma vie", description: "Passez 1h sur le terrain avec un collaborateur pour comprendre ses contraintes opérationnelles." },
        { title: "Point Météo", description: "Faites un point hebdo de 15 min avec chaque direct report, focalisé sur le ressenti, pas les tâches." },
        { title: "Célébration explicite", description: "Félicitez publiquement un collaborateur pour une réussite précise." }
    ]
};

const WEAKNESS_CHALLENGES: Record<string, { title: string, description: string }[]> = {
    // Si mon style faible est X, je dois faire un effort pour...
    directif: [
        { title: "Cadre clair", description: "Définissez un objectif SMART écrit pour un collaborateur flou." }
    ],
    persuasif: [
        { title: "Partage de sens", description: "Expliquez le 'pourquoi' d'une tâche rébarbative à un collaborateur." }
    ],
    participatif: [
        { title: "Consultation flash", description: "Demandez l'avis de 3 personnes avant de valider une décision simple." }
    ],
    delegatif: [
        { title: "Lâcher prise", description: "Confiez une tâche que vous aimez faire à quelqu'un d'autre sans intervenir." }
    ]
};

export const generateChallenges = (analysis: AnalysisResult): Challenge[] => {
    // 1. Sécurisation des entrées
    if (!analysis || !analysis.dominant || !analysis.natural) {
        console.error("Analysis data missing or corrupt");
        return [];
    }

    const { dominant, natural } = analysis;

    // 2. Calcul robuste du style faible
    // On trie les styles du score le plus bas au plus haut
    const styles = Object.keys(natural) as Array<keyof typeof natural>;
    const sortedStyles = styles.sort((a, b) => natural[a] - natural[b]);
    const weakest = sortedStyles[0];

    const challenges: Challenge[] = [];

    // 3. Récupération & Vérification des définitions (Sans fallback silencieux)
    const domChoices = CHALLENGE_MAPPING[dominant];
    const weakChoices = WEAKNESS_CHALLENGES[weakest];

    if (!domChoices || !weakChoices) {
        console.error(`Missing challenge definition for styles: ${dominant} or ${weakest}`);
        return [];
    }

    // 4. Génération Sécurisée (crypto.randomUUID)
    // 2 défis de "modulation" sur le style dominant
    challenges.push({
        id: crypto.randomUUID(),
        title: domChoices[0].title,
        description: domChoices[0].description,
        completed: false,
        feedback: "",
        type: 'modulation'
    });
    challenges.push({
        id: crypto.randomUUID(),
        title: domChoices[1].title,
        description: domChoices[1].description,
        completed: false,
        feedback: "",
        type: 'modulation'
    });

    // 1 défi de "développement" sur le style faible
    challenges.push({
        id: crypto.randomUUID(),
        title: weakChoices[0].title,
        description: weakChoices[0].description,
        completed: false,
        feedback: "",
        type: 'development'
    });

    return challenges;
};
