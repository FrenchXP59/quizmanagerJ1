import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ModuleIntroProps {
    moduleName: string;
    description: string;
    onStart: () => void;
    index: number;
}

const ModuleIntro: React.FC<ModuleIntroProps> = ({ moduleName, description, onStart, index }) => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Card className="max-w-xl w-full border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl mb-4">
                        {index}
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800">
                        {moduleName}
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        {description}
                    </p>

                    <div className="pt-6">
                        <Button
                            onClick={onStart}
                            size="lg"
                            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-lg py-6 px-8 h-auto shadow-lg shadow-indigo-200 transition-all hover:translate-y-[-2px]"
                        >
                            Commencer ce module <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ModuleIntro;
