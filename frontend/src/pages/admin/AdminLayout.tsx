import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 bg-white border-r border-gray-200 flex flex-col"
            >
                <div className="p-6 border-bottom border-gray-100 flex items-center gap-3">
                    <div onClick={() => navigate('/dashboard')} className="cursor-pointer">
                        <Logo />
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Навигация
                    </div>
                    <button className="w-full flex items-center px-4 py-3 text-gray-700 bg-gray-100/50 rounded-xl font-medium transition-colors">
                        📊 Дашборд
                    </button>
                    {user?.role === 'owner' && (
                        <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                            👑 Управление ролями
                        </button>
                    )}
                    {(user?.role === 'admin' || user?.role === 'owner') && (
                        <button className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                            👥 Пользователи
                        </button>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs uppercase">
                            {user?.role?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</p>
                            <p className="text-xs text-gray-500 capitalize">
                                {user?.role === 'owner' ? 'Владелец' :
                                    user?.role === 'admin' ? 'Администратор' :
                                        user?.role === 'curator' ? 'Куратор' : user?.role}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-lg font-bold text-gray-900">Админ-панель</h1>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Вернуться в CRM →
                    </button>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
