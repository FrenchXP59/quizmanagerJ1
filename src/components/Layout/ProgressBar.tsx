import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = Math.round(((current) / total) * 100);

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-slate-500">Progression globale</span>
                <span className="text-sm font-semibold text-indigo-600">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2 bg-slate-100" indicatorClassName="bg-indigo-600 transition-all duration-500" />
        </div>
    );
};

export default ProgressBar;
