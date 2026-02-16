import { useNavigate } from 'react-router-dom';
import { useManagerFlex } from '@/hooks/useManagerFlex';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import ResultsRadar from '@/components/Results/RadarChart';
import DetailedAnalysis from '@/components/Results/DetailedAnalysis';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Analysis = () => {
    const navigate = useNavigate();
    const { state, isLoaded } = useManagerFlex();

    if (!isLoaded) return <div>Chargement...</div>;

    const result = state.initialDiagnostic;

    if (!result) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 animate-in fade-in">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Aucune analyse disponible</h2>
                    <p className="text-slate-600 mb-8">Vous devez d'abord réaliser votre diagnostic managérial.</p>
                    <Button onClick={() => navigate('/diagnostic')}>
                        Démarrer le diagnostic
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Retour au tableau de bord
                </Button>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Analyse Détaillée</h1>
                        <p className="text-slate-500 mt-1">
                            Diagnostic réalisé le {new Date(result.date).toLocaleDateString()}
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => window.print()} className="print:hidden">
                        Exporter en PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-in slide-in-from-bottom-4 duration-700">
                {/* Radar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">Cartographie Dynamique</h3>
                    <ResultsRadar analysis={result} />
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

                {/* Breakdown */}
                <DetailedAnalysis analysis={result} />
            </div>
        </DashboardLayout>
    );
};

export default Analysis;
