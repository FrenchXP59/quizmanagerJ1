import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            H
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-slate-800">
                            Horizon Duo <span className="text-slate-400 font-normal">| Diagnostic Managérial</span>
                        </span>
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Édition Professionnelle
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                {children}
            </main>

            <footer className="border-t border-slate-200 bg-white mt-auto">
                <div className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} Horizon Duo. Tous droits réservés. Outil de diagnostic professionnel.
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
