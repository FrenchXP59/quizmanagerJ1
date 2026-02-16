import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useManagerFlex } from '@/hooks/useManagerFlex';
import { questions } from '@/data/questions';
import { advancedQuestions } from '@/logic/advancedQuestions'; // Import advanced questions
import { calculateScores, calculateAdvancedScore } from '@/logic/scoring'; // Updated import path
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ProgressBar from '@/components/Layout/ProgressBar';
import ModuleIntro from '@/components/Quiz/ModuleIntro';
import QuestionCard from '@/components/Quiz/QuestionCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DiagnosticResult } from '@/types/managerFlex';

const MODULES_BASE = [
    { id: 'decision', title: 'Prise de Décision', description: 'Comment abordez-vous les choix stratégiques et opérationnels ?' },
    { id: 'beginner', title: 'Management d\'un Débutant', description: 'Votre posture face à un collaborateur en phase d\'apprentissage.' },
    { id: 'expert', title: 'Management d\'un Expert', description: 'Comment interagissez-vous avec un collaborateur autonome et compétent ?' },
    { id: 'crisis', title: 'Gestion de Crise', description: 'Vos réflexes en situation d\'urgence ou de turbulences.' },
    { id: 'stress', title: 'Sous Pression', description: 'Analyse de vos comportements réflexes en situation de stress intense.', isStress: true }
];

const Diagnostic = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isRetake = searchParams.get('mode') === 're';

    const { saveInitialDiagnostic, saveReDiagnostic } = useManagerFlex();

    const [currentModuleIndex, setCurrentModuleIndex] = useState(-1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showModuleIntro, setShowModuleIntro] = useState(false);

    // Combine standard modules with potential advanced questions for retake
    // For simplicity, we'll just treat advanced questions as a 6th "Advanced" module if isRetake is true
    const MODULES = useMemo(() => {
        if (isRetake) {
            return [...MODULES_BASE, {
                id: 'advanced',
                title: 'Maturité Managériale',
                description: 'Questions avancées de prise de recul.',
                isAdvanced: true // Custom flag
            }];
        }
        return MODULES_BASE;
    }, [isRetake]);

    const currentModule = MODULES[currentModuleIndex];

    const moduleQuestions = useMemo(() => {
        if (!currentModule) return [];
        if ((currentModule as any).isAdvanced) return advancedQuestions;
        return questions.filter(q => q.module === currentModule.id);
    }, [currentModule]);

    // Handle answers
    const handleAnswer = (score: number) => {
        const currentQ = moduleQuestions[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [currentQ.id]: score }));

        setTimeout(() => {
            if (currentQuestionIndex < moduleQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                if (currentModuleIndex < MODULES.length - 1) {
                    setCurrentModuleIndex(prev => prev + 1);
                    setCurrentQuestionIndex(0);
                    setShowModuleIntro(true);
                } else {
                    finishQuiz();
                }
            }
        }, 400);
    };

    const finishQuiz = () => {
        // Determine context (initial or retake)
        // Separate core answers from advanced answers
        // Note: calculateScores filters out advanced questions ID > 100 automatically
        const baseResult = calculateScores(answers);
        const advancedScore = isRetake ? calculateAdvancedScore(answers) : undefined;

        const fullResult: DiagnosticResult = {
            ...baseResult,
            date: new Date().toISOString(),
            advancedScore
        };

        if (isRetake) {
            saveReDiagnostic(fullResult);
        } else {
            saveInitialDiagnostic(fullResult);
        }

        navigate('/analysis');
    };

    const startQuiz = () => {
        setCurrentModuleIndex(0);
        setShowModuleIntro(true);
    };

    // Intro View
    if (currentModuleIndex === -1) {
        return (
            <DashboardLayout>
                <div className="max-w-2xl mx-auto text-center py-12 animate-in fade-in">
                    <Button variant="ghost" className="mb-8" onClick={() => navigate('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Annuler et retour
                    </Button>

                    <h1 className="text-3xl font-bold text-slate-900 mb-6">
                        {isRetake ? "Re-mesure de votre profil" : "Diagnostic Managérial"}
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        {isRetake
                            ? "Vous allez repasser le questionnaire, enrichi de 4 questions de maturité, pour mesurer votre évolution."
                            : "Ce questionnaire comporte 30 questions réparties en 5 modules. Répondez spontanément."}
                    </p>

                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" onClick={startQuiz}>
                        Commencer maintenant
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    const totalQuestions = isRetake ? questions.length + advancedQuestions.length : questions.length;
    const answeredCount = Object.keys(answers).length;

    // Interstitial View
    if (showModuleIntro) {
        return (
            <DashboardLayout>
                <div className="max-w-3xl mx-auto pt-10">
                    <ProgressBar current={answeredCount} total={totalQuestions} />
                    <ModuleIntro
                        moduleName={currentModule.title}
                        description={currentModule.description}
                        onStart={() => setShowModuleIntro(false)}
                        index={currentModuleIndex + 1}
                    />
                </div>
            </DashboardLayout>
        );
    }

    // Question View
    const currentQuestion = moduleQuestions[currentQuestionIndex];
    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto pt-8">
                <ProgressBar current={answeredCount} total={totalQuestions} />

                <div className="mb-6 flex justify-between items-center text-sm text-slate-400 uppercase tracking-widest font-medium">
                    <span>Module {currentModuleIndex + 1}/{MODULES.length}</span>
                    <span>{currentModule.title}</span>
                </div>

                <QuestionCard
                    key={currentQuestion.id}
                    questionText={currentQuestion.text}
                    currentAnswer={answers[currentQuestion.id]}
                    onAnswer={handleAnswer}
                    className="animate-in slide-in-from-right-8 duration-300"
                />
            </div>
        </DashboardLayout>
    );
};

export default Diagnostic;
