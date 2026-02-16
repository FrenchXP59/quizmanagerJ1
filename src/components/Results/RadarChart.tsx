import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { AnalysisResult } from '@/types/quiz';
import { styleDefinitions } from '@/data/styles';

interface ResultsRadarProps {
    analysis: AnalysisResult;
}

const ResultsRadar: React.FC<ResultsRadarProps> = ({ analysis }) => {
    const data = Object.keys(analysis.natural).map((key) => {
        const styleKey = key as keyof typeof analysis.natural;
        return {
            style: styleDefinitions[styleKey].name,
            natural: analysis.natural[styleKey],
            stress: analysis.stress[styleKey],
            fullMark: 100,
        };
    });

    return (
        <div className="w-full h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="style" tick={{ fill: '#475569', fontSize: 14, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    <Radar
                        name="Profil Naturel"
                        dataKey="natural"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Profil Sous Stress"
                        dataKey="stress"
                        stroke="#ef4444"
                        strokeWidth={3}
                        fill="#ef4444"
                        fillOpacity={0.4}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResultsRadar;
