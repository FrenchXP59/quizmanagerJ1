import { useNavigate } from 'react-router-dom';
import { useManagerFlex } from '@/hooks/useManagerFlex';
import { calculateProgression } from '@/logic/progression';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const Progression = () => {
    const { state } = useManagerFlex();
    const { initialDiagnostic, reDiagnostic } = state;

    if (!initialDiagnostic || !reDiagnostic) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 text-slate-500">
                    Progression non disponible. Vous devez effectuer le diagnostic initial et la re-mesure.
                </div>
            </DashboardLayout>
        );
    }

    const progression = calculateProgression(initialDiagnostic, reDiagnostic);

    const renderDelta = (val: number, label: string) => {
        let color = 'text-slate-500';
        let Icon = Minus;
        if (val > 0) { color = 'text-green-600'; Icon = ArrowUp; }
        if (val < 0) { color = 'text-red-600'; Icon = ArrowDown; }

        // For stressGap, negative is usually good (less gap), but logic/progression returns simple diff
        // Let's stick to simple delta display

        return (
            <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-700 font-medium">{label}</span>
                <div className={`flex items-center gap-1 font-bold ${color}`}>
                    {val !== 0 && <Icon className="w-4 h-4" />}
                    {val > 0 ? '+' : ''}{val}
                </div>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Votre Progression</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution du Style Naturel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderDelta(progression.deltaNatural.directif, 'Directif')}
                        {renderDelta(progression.deltaNatural.persuasif, 'Persuasif')}
                        {renderDelta(progression.deltaNatural.participatif, 'Participatif')}
                        {renderDelta(progression.deltaNatural.delegatif, 'Délégatif')}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Indicateurs Clés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderDelta(progression.deltaFlexibility, 'Indice de Flexibilité')}
                        {renderDelta(progression.deltaStressGap, 'Maîtrise du Stress (Écart)')}
                        <div className="mt-4 pt-4 border-t">
                            <span className="text-sm text-slate-500">
                                Score de Maturité (nouveau): <span className="font-bold text-indigo-600">{reDiagnostic.advancedScore}/4</span>
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Progression;
