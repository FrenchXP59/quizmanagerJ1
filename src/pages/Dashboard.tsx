import { useNavigate } from 'react-router-dom';
import { useManagerFlex } from '@/hooks/useManagerFlex';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, FileText, Target, TrendingUp, Lock } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DashboardLayout';

const Dashboard = () => {
    const navigate = useNavigate();
    const { state, isLoaded } = useManagerFlex();

    if (!isLoaded) return <div className="p-8">Chargement...</div>;

    const { maturityLevel, challenges } = state;

    // Calculate global progress based on maturity
    // Level 1: Diagnostic done (33%)
    // Level 2: Challenges done (66%)
    // Level 3: Re-diag done (100%)
    const progressValue = maturityLevel === 1 ? 33 : maturityLevel === 2 ? 66 : 100;

    // Count challenges completed
    const completedChallenges = challenges.filter(c => c.completed).length;

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500">

                {/* Header & Global Progress */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-slate-900">Tableau de Bord Managérial</h1>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-slate-500">
                            <span>Niveau de Maturité: {maturityLevel}/3</span>
                            <span>Progression du cycle</span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                    </div>
                </div>

                {/* Dynamic Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* CARD 1: DIAGNOSTIC */}
                    <Card className={`border-l-4 ${state.initialDiagnostic ? 'border-l-green-500' : 'border-l-indigo-500 shadow-md shadow-indigo-100'}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-slate-500" />
                                Diagnostic Initial
                            </CardTitle>
                            <CardDescription>
                                {state.initialDiagnostic
                                    ? "Terminé le " + new Date(state.initialDiagnostic.date || Date.now()).toLocaleDateString()
                                    : "Évaluez votre style managérial en 15 min."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {state.initialDiagnostic ? (
                                <Button variant="outline" className="w-full" onClick={() => navigate('/analysis')}>
                                    Voir mon analyse
                                </Button>
                            ) : (
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate('/diagnostic')}>
                                    Démarrer le diagnostic <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* CARD 2: CHALLENGES */}
                    <Card className={`border-l-4 ${state.challenges.length > 0 ? 'border-l-indigo-500 shadow-md' : 'border-l-slate-200 opacity-75'}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-slate-500" />
                                Défis Hebdomadaires
                            </CardTitle>
                            <CardDescription>
                                {state.challenges.length > 0
                                    ? `${completedChallenges}/3 défis relevés`
                                    : "Débloquez vos défis après le diagnostic."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {state.challenges.length > 0 ? (
                                <Button className="w-full" onClick={() => navigate('/challenges')}>
                                    Accéder aux défis <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button disabled className="w-full text-slate-400">
                                    <Lock className="w-4 h-4 mr-2" /> Verrouillé
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* CARD 3: PROGRESSION */}
                    <Card className={`border-l-4 ${maturityLevel >= 2 ? 'border-l-indigo-500 shadow-md' : 'border-l-slate-200 opacity-75'}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-slate-500" />
                                Re-mesure & Progression
                            </CardTitle>
                            <CardDescription>
                                {maturityLevel >= 3
                                    ? "Analyse comparative disponible."
                                    : maturityLevel === 2
                                        ? "Prêt pour la re-mesure."
                                        : "Complétez vos défis pour débloquer."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {maturityLevel >= 3 ? (
                                <Button className="w-full" onClick={() => navigate('/progression')}>
                                    Voir ma progression
                                </Button>
                            ) : maturityLevel === 2 ? (
                                <Button className="w-full bg-indigo-600" onClick={() => navigate('/diagnostic?mode=re')}>
                                    Lancer la re-mesure
                                </Button>
                            ) : (
                                <Button disabled className="w-full text-slate-400">
                                    <Lock className="w-4 h-4 mr-2" /> Verrouillé
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
