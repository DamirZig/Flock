import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Logo } from '../components/ui/Logo';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/'); // Assuming '/' is welcome page
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50/50 relative">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/80 z-20 flex flex-col h-full flex-shrink-0 shadow-xl"
            >
                {/* Logo Header - Clickable to go home */}
                <div className="p-6 border-b border-gray-100/80">
                    <Logo onClick={handleHome} />
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {['owner', 'admin', 'curator'].includes(user?.role || '') && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50/50 hover:bg-red-50 rounded-xl font-medium transition-colors border border-red-100/50"
                        >
                            <Icon icon="lucide:shield" className="w-5 h-5" />
                            Админ панель
                        </button>
                    )}
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-colors">
                        <Icon icon="lucide:user" className="w-5 h-5" />
                        Личный кабинет
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                        <Icon icon="lucide:settings" className="w-5 h-5" />
                        Настройки
                    </button>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100/80 mt-auto">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors"
                    >
                        <Icon icon="lucide:log-out" className="w-5 h-5" />
                        Выйти
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 h-full overflow-y-auto p-8 z-10 w-full relative">
                {children}
            </div>
        </div>
    );
};
