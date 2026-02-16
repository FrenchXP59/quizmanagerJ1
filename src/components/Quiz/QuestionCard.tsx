import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
    questionText: string;
    currentAnswer: number | undefined;
    onAnswer: (score: number) => void;
    className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText, currentAnswer, onAnswer, className }) => {
    return (
        <div className={cn("w-full max-w-2xl mx-auto", className)}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 leading-tight text-center">
                {questionText}
            </h2>

            <RadioGroup
                value={currentAnswer?.toString()}
                onValueChange={(val) => onAnswer(parseInt(val))}
                className="grid grid-cols-1 gap-4"
            >
                {[
                    { value: 1, label: "Pas du tout", mobileLabel: "1 - Pas du tout" },
                    { value: 2, label: "Plutôt non", mobileLabel: "2 - Plutôt non" },
                    { value: 3, label: "Plutôt oui", mobileLabel: "3 - Plutôt oui" },
                    { value: 4, label: "Tout à fait", mobileLabel: "4 - Tout à fait" }
                ].map((option) => (
                    <div key={option.value}>
                        <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} className="peer sr-only" />
                        <Label
                            htmlFor={`option-${option.value}`}
                            className={cn(
                                "flex items-center justify-between p-4 md:p-6 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                "hover:bg-slate-50 hover:border-indigo-200",
                                currentAnswer === option.value
                                    ? "border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600"
                                    : "border-slate-200 bg-white text-slate-600"
                            )}
                        >
                            <span className="text-lg md:text-xl font-medium">{option.label}</span>
                            {currentAnswer === option.value && (
                                <span className="text-indigo-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </span>
                            )}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default QuestionCard;
