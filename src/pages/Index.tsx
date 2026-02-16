import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { questions } from '@/data/questions';
import { calculateScores } from '@/utils/scoring';
import MainLayout from '@/components/Layout/MainLayout';
import ProgressBar from '@/components/Layout/ProgressBar';
import ModuleIntro from '@/components/Quiz/ModuleIntro';
import QuestionCard from '@/components/Quiz/QuestionCard';
import ResultsRadar from '@/components/Results/RadarChart';
import DetailedAnalysis from '@/components/Results/DetailedAnalysis';
import { ArrowRight, RotateCcw } from 'lucide-react';

const MODULES = [
  { id: 'decision', title: 'Prise de Décision', description: 'Comment abordez-vous les choix stratégiques et opérationnels ?' },
  { id: 'beginner', title: 'Management d\'un Débutant', description: 'Votre posture face à un collaborateur en phase d\'apprentissage.' },
  { id: 'expert', title: 'Management d\'un Expert', description: 'Comment interagissez-vous avec un collaborateur autonome et compétent ?' },
  { id: 'crisis', title: 'Gestion de Crise', description: 'Vos réflexes en situation d\'urgence ou de turbulences.' },
  { id: 'stress', title: 'Sous Pression', description: 'Analyse de vos comportements réflexes en situation de stress intense.', isStress: true }
];

const Index = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(-1); // -1 = Global Intro
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [showModuleIntro, setShowModuleIntro] = useState(false);

  // Filter questions for current module
  const currentModule = MODULES[currentModuleIndex];
  const moduleQuestions = useMemo(() => {
    if (!currentModule) return [];
    return questions.filter(q => q.module === currentModule.id);
  }, [currentModule]);

  // Global Progress
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleStart = () => {
    setCurrentModuleIndex(0);
    setShowModuleIntro(true);
  };

  const handleModuleStart = () => {
    setShowModuleIntro(false);
  };

  const handleAnswer = (score: number) => {
    const currentQ = moduleQuestions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: score }));

    // Delay to show selection feedback
    setTimeout(() => {
      if (currentQuestionIndex < moduleQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // End of module
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
    setIsFinished(true);
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentModuleIndex(-1);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setShowModuleIntro(false);
  };

  // --- VIEWS ---

  if (isFinished) {
    const results = calculateScores(answers);

    return (
      <MainLayout>
        <div className="space-y-12 animate-in fade-in duration-700">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">Votre Profil Managérial</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Analyse complète de vos dynamiques de pilotage et de soutien.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visualisation Radar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">Cartographie Dynamique</h3>
              <ResultsRadar analysis={results} />
              <div className="mt-6 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-600">Profil Naturel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-slate-600">Sous Stress</span>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <DetailedAnalysis analysis={results} />
          </div>

          <div className="flex justify-center pt-12 gap-4 print:hidden">
            <Button onClick={() => window.print()} variant="default" size="lg" className="bg-slate-900 hover:bg-slate-800 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              Télécharger le rapport PDF
            </Button>
            <Button onClick={restartQuiz} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Relancer le diagnostic
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // --- INTRO SCREEN ---
  if (currentModuleIndex === -1) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in zoom-in-95 duration-500">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 pb-2">
            Leadership Scan 360°
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed">
            Un outil de diagnostic professionnel pour évaluer votre posture managériale,
            vos réflexes sous pression et votre flexibilité d'adaptation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
            {[
              { title: "15 Minutes", desc: "Diagnostic rapide et précis" },
              { title: "5 Dimensions", desc: "Analyse situationnelle" },
              { title: "Plan d'action", desc: "Pistes de développement" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="text-lg font-bold text-slate-900 mb-1">{item.title}</div>
                <div className="text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>

          <Button onClick={handleStart} size="lg" className="mt-8 text-lg px-10 py-6 h-auto bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105">
            Démarrer le diagnostic <ArrowRight className="ml-2" />
          </Button>
        </div>
      </MainLayout>
    );
  }

  // --- MODULE INTRO ---
  if (showModuleIntro) {
    return (
      <MainLayout>
        <ProgressBar current={answeredCount} total={totalQuestions} />
        <ModuleIntro
          moduleName={currentModule.title}
          description={currentModule.description}
          onStart={handleModuleStart}
          index={currentModuleIndex + 1}
        />
      </MainLayout>
    );
  }

  // --- QUESTION CARD ---
  const currentQuestion = moduleQuestions[currentQuestionIndex];
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar current={answeredCount} total={totalQuestions} />

        <div className="mb-6 flex justify-between items-center text-sm text-slate-400 uppercase tracking-widest font-medium">
          <span>Module {currentModuleIndex + 1}/{MODULES.length}</span>
          <span>{currentModule.title}</span>
        </div>

        <QuestionCard
          key={currentQuestion.id} // Force re-render animation
          questionText={currentQuestion.text}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          className="animate-in slide-in-from-right-8 duration-500"
        />
      </div>
    </MainLayout>
  );
};

export default Index;

