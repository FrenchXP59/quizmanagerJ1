import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PieChart, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming shadcn utils exist or standard clsx

const NAV_ITEMS = [
    { path: '/', label: 'Tableau de Bord', icon: LayoutDashboard },
    { path: '/diagnostic', label: 'Diagnostic', icon: FileText },
    { path: '/analysis', label: 'Mon Analyse', icon: PieChart },
    { path: '/challenges', label: 'Défis Hebdo', icon: Target },
    { path: '/progression', label: 'Progression', icon: TrendingUp },
];

const Sidebar = () => {
    return (
        <div className="w-64 bg-slate-900 h-screen flex flex-col text-white fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold tracking-tight text-white">
                    Horizon Duo
                    <span className="block text-xs font-normal text-slate-400 mt-1">ManagerFlex Suite</span>
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isActive
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 text-center">
                    © 2024 Horizon Duo
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
