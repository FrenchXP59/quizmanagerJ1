import { Question } from '../types/quiz';

export const questions: Question[] = [
    // MODULE 1: PRISE DE DÉCISION
    { id: 1, text: "Face à une décision stratégique urgente, je tranche rapidement pour sécuriser l'orientation.", style: 'directif', module: 'decision' },
    { id: 2, text: "Avant d'arbitrer, je prends le temps d'expliquer ma vision pour donner du sens à l'action.", style: 'persuasif', module: 'decision' },
    { id: 3, text: "Lorsqu'un choix complexe se présente, je consulte systématiquement les membres de l'équipe pour recueillir leurs avis.", style: 'participatif', module: 'decision' },
    { id: 4, text: "Je confie l'analyse des options techniques à mon équipe et je valide leur recommandation finale.", style: 'delegatif', module: 'decision' },
    { id: 5, text: "Je définis personnellement les étapes d'exécution et les échéances précises pour chaque projet.", style: 'directif', module: 'decision' },
    { id: 6, text: "Pour faire accepter un changement, je privilégie l'argumentation rationnelle et la pédagogie.", style: 'persuasif', module: 'decision' },

    // MODULE 2: MANAGEMENT D'UN DÉBUTANT
    { id: 7, text: "Avec un collaborateur junior, j'investis du temps pour expliquer le contexte et les enjeux de chaque mission.", style: 'persuasif', module: 'beginner' },
    { id: 8, text: "Pour sécuriser sa montée en compétence, je lui fournis un cadre de travail structuré et des processus clairs.", style: 'directif', module: 'beginner' },
    { id: 9, text: "J'encourage ses prises d'initiative et ses propositions, même lorsqu'elles sont encore imparfaites.", style: 'participatif', module: 'beginner' },
    { id: 10, text: "Je lui confie rapidement une mission complète adaptée à son niveau et je le laisse expérimenter par lui-même.", style: 'delegatif', module: 'beginner' },
    { id: 11, text: "Je mets en place des points de contrôle fréquents pour valider ses livrables étape par étape.", style: 'directif', module: 'beginner' },
    { id: 12, text: "Je m'attache à valoriser chacune de ses réussites pour construire durablement sa confiance professionnelle.", style: 'persuasif', module: 'beginner' },

    // MODULE 3: MANAGEMENT D'UN EXPERT
    { id: 13, text: "Face à un expert, je me limite à fixer les objectifs et je lui fais confiance sur la méthode.", style: 'delegatif', module: 'expert' },
    { id: 14, text: "Avant d'acter une stratégie, je sollicite systématiquement son analyse critique pour affiner ma vision.", style: 'participatif', module: 'expert' },
    { id: 15, text: "Même avec un expert, je maintiens un cadre strict concernant les priorités business et les délais.", style: 'directif', module: 'expert' },
    { id: 16, text: "Je m'assure régulièrement par le dialogue qu'il reste aligné avec la vision et les valeurs de l'entreprise.", style: 'persuasif', module: 'expert' },
    { id: 17, text: "Je lui accorde une autonomie quasi-totale dans l'organisation de son quotidien et de ses tâches.", style: 'delegatif', module: 'expert' },
    { id: 18, text: "Nous co-construisons ses objectifs annuels et les indicateurs de performance associés.", style: 'participatif', module: 'expert' },

    // MODULE 4: GESTION DE CRISE
    { id: 19, text: "En situation critique, je reprends immédiatement le pilotage opérationnel pour redresser la barre.", style: 'directif', module: 'crisis' },
    { id: 20, text: "Je réunis l'équipe dès le début de la crise pour analyser collectivement les solutions possibles.", style: 'participatif', module: 'crisis' },
    { id: 21, text: "Je responsabilise directement les experts métier pour qu'ils traitent le problème à la source.", style: 'delegatif', module: 'crisis' },
    { id: 22, text: "Je concentre mon énergie à rassurer les équipes et à clarifier la marche à suivre.", style: 'persuasif', module: 'crisis' },
    { id: 23, text: "J'exige une application immédiate et rigoureuse des mesures correctives que j'ai décidées.", style: 'directif', module: 'crisis' },
    { id: 24, text: "Je délègue la résolution de l'incident à la personne la plus compétente en gardant un suivi distant.", style: 'delegatif', module: 'crisis' },

    // MODULE 5: SOUS PRESSION
    { id: 25, text: "Lorsque les délais se tendent fortement, je deviens naturellement plus directif et exigeant.", style: 'directif', module: 'stress' },
    { id: 26, text: "Sous tension, je redouble d'explications pour prévenir tout malentendu ou erreur d'interprétation.", style: 'persuasif', module: 'stress' },
    { id: 27, text: "En période de stress, ma priorité est de protéger la cohésion du groupe et l'ambiance de travail.", style: 'participatif', module: 'stress' },
    { id: 28, text: "Si je suis débordé, mon réflexe est de réduire mes interventions pour me concentrer sur l'essentiel.", style: 'delegatif', module: 'stress' },
    { id: 29, text: "Le stress me pousse à contrôler plus finement les détails des livrables pour éviter les erreurs.", style: 'directif', module: 'stress' },
    { id: 30, text: "En cas de surcharge cognitive, je délègue davantage pour garantir le respect du planning.", style: 'delegatif', module: 'stress' }
];
