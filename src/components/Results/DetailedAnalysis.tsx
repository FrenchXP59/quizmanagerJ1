import React from 'react';
import { AnalysisResult } from '@/types/quiz';
import { styleDefinitions } from '@/data/styles';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateAnalysis, generateCoachingQuestions, generateActionPlan } from '@/utils/scoring';

interface DetailedAnalysisProps {
    analysis: AnalysisResult;
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ analysis }) => {
    const dominantStyle = styleDefinitions[analysis.dominant];
    const secondaryStyle = styleDefinitions[analysis.secondary];
    const narrative = generateAnalysis(analysis);

    return (
        <div className="space-y-8">
            {/* Narrative Summary */}
            <Card className="bg-indigo-50 border-indigo-100">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">Synthèse du consultant</h3>
                    <p className="text-indigo-800 leading-relaxed text-lg">{narrative}</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dominant Style */}
                <Card className="border-l-4 border-l-indigo-600 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-semibold text-slate-700">Style Dominant</CardTitle>
                            <Badge className="bg-indigo-600">Moteur principal</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">{dominantStyle.name}</h4>
                        <p className="text-slate-600 mb-4">{dominantStyle.description}</p>
                        <ul className="space-y-2">
                            {dominantStyle.characteristics.map((char, i) => (
                                <li key={i} className="flex items-center text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                                    {char}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Secondary Style */}
                <Card className="border-l-4 border-l-slate-400 shadow-sm bg-slate-50/50">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-semibold text-slate-700">Style Secondaire</CardTitle>
                            <Badge variant="outline" className="text-slate-600 border-slate-300">Ressource</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-2xl font-bold text-slate-700 mb-2">{secondaryStyle.name}</h4>
                        <p className="text-slate-600 mb-4">{secondaryStyle.description}</p>
                        <ul className="space-y-2">
                            {secondaryStyle.characteristics.map((char, i) => (
                                <li key={i} className="flex items-center text-sm text-slate-600">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                                    {char}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* KPI Indicators */}
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Indicateurs de Performance Managériale</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Indice de Flexibilité</div>
                        <div className="flex items-end gap-2">
                            <span className={`text-2xl font-bold ${analysis.flexibility === 'élevé' ? 'text-green-600' : 'text-amber-600'}`}>
                                {analysis.flexibility.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            Capacité à changer de posture selon le contexte. Un indice élevé montre une palette managériale riche.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Écart sous Pression</div>
                        <div className="flex items-end gap-2">
                            <span className={`text-2xl font-bold ${analysis.stressGap === 'faible' ? 'text-green-600' : 'text-red-600'}`}>
                                {analysis.stressGap.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            Différence entre votre gestion au calme et sous stress. Un écart élevé peut déstabiliser l'équipe.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Coaching & Action Plan */}
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Développement Personnel</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-50">
                    <CardHeader>
                        <CardTitle className="text-lg text-slate-700">Questions de Coaching</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            {generateCoachingQuestions(analysis).map((q, i) => (
                                <li key={i} className="text-slate-600 italic">"{q}"</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-indigo-50 border-indigo-100">
                    <CardHeader>
                        <CardTitle className="text-lg text-indigo-900">Plan d'Action Immédiat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {generateActionPlan(analysis).map((action, i) => (
                                <li key={i} className="flex items-start gap-2 text-indigo-800">
                                    <span className="font-bold text-indigo-400 min-w-[20px]">{i + 1}.</span>
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DetailedAnalysis;
