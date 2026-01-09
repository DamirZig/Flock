import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@iconify/react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const navItems = [
        { label: 'Дашборд', icon: 'lucide:layout-dashboard', path: '/admin', roles: ['owner', 'admin', 'curator'] },
        { label: 'Управление ролями', icon: 'lucide:shield-check', path: '/admin/roles', roles: ['owner'] },
        { label: 'Пользователи', icon: 'lucide:users', path: '/admin/users', roles: ['owner', 'admin'] },
        { label: 'Настройки системы', icon: 'lucide:settings', path: '/admin/settings', roles: ['owner'] },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 flex overflow-hidden font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200/80 flex flex-col z-30 shadow-xl shadow-gray-200/20"
            >
                <div className="p-8 border-b border-gray-100/80 flex items-center gap-3">
                    <div onClick={() => navigate('/dashboard')} className="cursor-pointer hover:opacity-80 transition-opacity">
                        <Logo />
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                        Основное меню
                    </div>

                    {navItems.filter(item => item.roles.includes(user?.role || '')).map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 group ${isActive
                                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon
                                    icon={item.icon}
                                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary-light' : 'text-gray-400'
                                        }`}
                                />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-gray-100/80 bg-gray-50/30">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-black text-sm border border-red-100 shadow-inner">
                            {user?.role?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-gray-900 truncate tracking-tight">{user?.full_name}</p>
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                                {user?.role === 'owner' ? 'Владелец' :
                                    user?.role === 'admin' ? 'Администратор' :
                                        user?.role === 'curator' ? 'Куратор' : user?.role}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Icon icon="lucide:log-out" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-20 bg-white/70 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-10 z-20 sticky top-0">
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight">Админ-панель</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Контроль и управление</p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-all bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                        <Icon icon="lucide:layout-grid" className="w-4 h-4" />
                        Вернуться в CRM
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-10 bg-gray-50/30">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};
