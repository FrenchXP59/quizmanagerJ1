import { useState } from 'react';
import { useManagerFlex } from '@/hooks/useManagerFlex';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Target, CheckCircle2 } from 'lucide-react';

const Challenges = () => {
    const { state, updateChallenge } = useManagerFlex();
    const { challenges } = state;

    // Local state for feedback input handling
    const [editingFeedback, setEditingFeedback] = useState<Record<string, string>>({});

    const handleFeedbackChange = (id: string, value: string) => {
        setEditingFeedback(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = (id: string, completed: boolean) => {
        const feedback = editingFeedback[id] !== undefined
            ? editingFeedback[id]
            : challenges.find(c => c.id === id)?.feedback || "";

        updateChallenge(id, completed, feedback);
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Target className="w-8 h-8 text-indigo-600" />
                    Défis Hebdomadaires
                </h1>
                <p className="text-slate-600 mt-2 max-w-2xl">
                    Complétez ces 3 actions ciblées pour développer votre flexibilité managériale.
                    Vos retours d'expérience sont essentiels pour valider votre progression.
                </p>
            </div>

            <div className="grid gap-6">
                {challenges.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500">
                            Aucun défi disponible. Commencez par réaliser votre diagnostic.
                        </p>
                    </div>
                ) : (
                    challenges.map((challenge) => (
                        <Card key={challenge.id} className={`transition-all ${challenge.completed ? 'bg-indigo-50 border-indigo-200' : 'bg-white'}`}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className={`text-xl ${challenge.completed ? 'text-indigo-900' : 'text-slate-800'}`}>
                                            {challenge.title}
                                        </CardTitle>
                                        <CardDescription className="mt-1 text-base">
                                            {challenge.description}
                                        </CardDescription>
                                    </div>
                                    {challenge.completed && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id={`check-${challenge.id}`}
                                            checked={challenge.completed}
                                            onCheckedChange={(checked) => handleSave(challenge.id, checked === true)}
                                        />
                                        <div className="grid gap-1.5 leading-none w-full">
                                            <label
                                                htmlFor={`check-${challenge.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer pt-1"
                                            >
                                                Marquer comme réalisé
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Votre retour d'expérience (min. 20 caractères)
                                        </label>
                                        <Textarea
                                            placeholder="Comment cela s'est-il passé ? Qu'avez-vous observé ?"
                                            className="min-h-[80px] bg-white"
                                            defaultValue={challenge.feedback}
                                            onChange={(e) => handleFeedbackChange(challenge.id, e.target.value)}
                                            onBlur={(e) => handleSave(challenge.id, challenge.completed)}
                                        />
                                        <div className="text-xs text-right text-slate-400">
                                            {(editingFeedback[challenge.id]?.length || challenge.feedback.length)} / 20 caractères
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </DashboardLayout>
    );
};

export default Challenges;
