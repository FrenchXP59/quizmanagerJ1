import { questions } from '../data/questions';
import { AnalysisResult, StyleType } from '../types/quiz';

const MAX_SCORE_PER_STYLE_NATURAL = 24; // 6 questions * 4 points (approx, normalized)
const MAX_SCORE_PER_STYLE_STRESS = 8;   // 2 questions * 4 points (approx)

export const calculateScores = (answers: Record<number, number>): AnalysisResult => {
    const scores = {
        natural: { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 },
        stress: { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 }
    };

    Object.entries(answers).forEach(([qId, score]) => {
        const question = questions.find(q => q.id === parseInt(qId));
        if (!question) return;

        if (question.module === 'stress') {
            scores.stress[question.style] += score;
        } else {
            scores.natural[question.style] += score;
        }
    });

    // Normalize to 100 for display (Simple linear projection for now)
    // Natural: 6 questions per style available in total across 4 modules?
    // Actually let's count max possible scores for accurate normalization
    // Directif: 6 qs (natural) -> 6*4 = 24 max

    const normalizedNatural = {
        directif: Math.round((scores.natural.directif / 24) * 100),
        persuasif: Math.round((scores.natural.persuasif / 24) * 100),
        participatif: Math.round((scores.natural.participatif / 24) * 100),
        delegatif: Math.round((scores.natural.delegatif / 24) * 100),
    };

    // Stress: 2 questions per style roughly?
    // Let's check distribution in questions.ts
    // Directif: 2 (Q25, Q29) -> 8 max
    // Persuasif: 1 (Q26) -> 4 max ... Wait, need balanced stress questions
    // Let's adjust normalization dynamically based on question count to be safe.

    const stressCounts = { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 };
    const naturalCounts = { directif: 0, persuasif: 0, participatif: 0, delegatif: 0 };

    questions.forEach(q => {
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
    // High variance = Low flexibility (stuck in one mode)
    // Low variance = High flexibility (able to use all modes)
    const values = Object.values(finalNatural);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;

    let flexibility: 'faible' | 'modéré' | 'élevé' = 'modéré';
    if (range < 20) flexibility = 'élevé';
    else if (range > 50) flexibility = 'faible';

    // Stress Gap & Shift
    // Calculate average shift intensity
    const totalShift = (Object.keys(finalNatural) as StyleType[]).reduce((sum, style) => {
        return sum + Math.abs(finalNatural[style] - finalStress[style]);
    }, 0);

    // Avg shift per style
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
        stressGap
    };
};

export const generateAnalysis = (result: AnalysisResult): string => {
    // Simple generator for now, can be expanded with more rules
    const { dominant, secondary, natural } = result;

    if (dominant === 'directif' && natural.participatif < 30) {
        return "Attention au risque d'autoritarisme. Votre efficacité est réelle, mais vous pourriez gagner à écouter davantage votre équipe pour favoriser l'engagement.";
    }

    if (dominant === 'participatif' && natural.directif < 30) {
        return "Votre bienveillance est une force, mais attention à la lenteur décisionnelle en période de crise. Osez trancher plus rapidement.";
    }

    if (dominant === 'delegatif' && natural.persuasif < 30) {
        return "Votre confiance honore votre équipe, mais attention à ne pas disparaître. Vos collaborateurs ont aussi besoin de vision et de feedback.";
    }

    return "Votre profil présente un équilibre intéressant. Pensez à adapter votre style consciemment en fonction du niveau d'autonomie de vos interlocuteurs.";
};

export const generateCoachingQuestions = (result: AnalysisResult): string[] => {
    const { dominant, natural } = result;
    const questions: string[] = [];

    if (dominant === 'directif') {
        questions.push("Dans quelles situations récentes auriez-vous pu laisser plus d'autonomie ?");
        questions.push("Comment vous assurez-vous que vos collaborateurs ont bien compris le 'sens' de vos directives ?");
        if (natural.participatif < 40) questions.push("Qu'est-ce qui vous empêche de solliciter l'avis de votre équipe avant de trancher ?");
    } else if (dominant === 'participatif') {
        questions.push("Avez-vous parfois l'impression de retarder une décision pour chercher un consensus impossible ?");
        questions.push("Comment réagissez-vous face à un collaborateur qui attend des directives claires et immédiates ?");
        if (natural.directif < 40) questions.push("Quels sont les risques pour vous à imposer une décision impopulaire ?");
    } else if (dominant === 'persuasif') {
        questions.push("Passez-vous trop de temps à 'vendre' vos décisions plutôt qu'à écouter les retours ?");
        questions.push("Comment gérez-vous les personnalités qui préfèrent l'exécution directe aux longs discours ?");
    } else if (dominant === 'delegatif') {
        questions.push("Savez-vous réellement ce qui se passe sur le terrain en ce moment ?");
        questions.push("Comment montrez-vous à votre équipe que vous êtes disponible en cas de pépin ?");
        if (natural.persuasif < 40) questions.push("À quand remonte votre dernier feedback constructif individuel ?");
    }

    return questions.length > 0 ? questions : [
        "Comment pourriez-vous adapter votre style actuel à un collaborateur débutant ?",
        "Dans quelle mesure votre stress impacte-t-il votre clarté de communication ?",
        "Quel est votre prochain défi managérial ?"
    ];
};

export const generateActionPlan = (result: AnalysisResult): string[] => {
    const { dominant, stressGap } = result;
    const actions: string[] = [];

    actions.push("Semaine 1 : Observer mon style dominant pendant 3 jours et noter 3 situations où il a été inefficace.");

    if (stressGap === 'élevé') {
        actions.push("Identifier mes 3 déclencheurs de stress principaux et préparer une 'réponse type' pour temporiser avant de réagir.");
    }

    if (dominant === 'directif') {
        actions.push("Tester la méthode des '3 questions' avant de donner une solution : Qu'en penses-tu ? Quelles sont les options ? Quelle est ta recommandation ?");
    } else if (dominant === 'participatif') {
        actions.push("Sur un sujet mineur, prendre une décision seul et l'annoncer sans justification excessive pour tester l'impact.");
    } else if (dominant === 'delegatif') {
        actions.push("Planifier un point 'Météo' de 15min avec chaque collaborateur pour prendre le pouls sans parler opérationnel.");
    } else if (dominant === 'persuasif') {
        actions.push("Lors de la prochaine réunion, parler 2 fois moins que d'habitude et noter les idées des autres.");
    }

    return actions;
};
