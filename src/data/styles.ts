import { StyleDefinition, StyleType } from '../types/quiz';

export const styleDefinitions: Record<StyleType, StyleDefinition> = {
    directif: {
        name: "Directif",
        description: "Vous privilégiez un pilotage fort avec un soutien limité. Vous donnez des directives claires et supervisez étroitement le travail.",
        characteristics: [
            "Instructions précises et détaillées",
            "Supervision étroite",
            "Décisions centralisées",
            "Contrôle régulier",
            "Focus sur l'efficacité"
        ],
        color: "#1e3a8a" // Bleu nuit professionnel
    },
    persuasif: {
        name: "Persuasif",
        description: "Vous combinez un pilotage fort avec un soutien élevé. Vous guidez tout en motivant et en expliquant vos décisions.",
        characteristics: [
            "Communication des objectifs",
            "Motivation de l'équipe",
            "Formation active",
            "Soutien face aux difficultés",
            "Explication des décisions"
        ],
        color: "#ca8a04" // Doré/Moutarde pro
    },
    participatif: {
        name: "Participatif",
        description: "Vous adoptez un pilotage modéré avec un fort soutien. Vous consultez l'équipe et encouragez la collaboration.",
        characteristics: [
            "Consultation de l'équipe",
            "Encouragement des idées",
            "Facilitation des échanges",
            "Développement de l'autonomie",
            "Recherche de consensus"
        ],
        color: "#059669" // Vert émeraude
    },
    delegatif: {
        name: "Délégatif",
        description: "Vous privilégiez un pilotage minimal avec un soutien limité. Vous faites confiance à l'autonomie complète de l'équipe.",
        characteristics: [
            "Délégation importante",
            "Autonomie complète",
            "Intervention minimale",
            "Focus stratégique",
            "Confiance totale"
        ],
        color: "#4f46e5" // Indigo
    }
};
