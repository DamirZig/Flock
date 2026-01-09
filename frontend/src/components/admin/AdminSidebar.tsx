import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Дашборд',
            path: '/admin',
            show: true
        },
        {
            icon: Users,
            label: 'Пользователи',
            path: '/admin/users',
            show: ['admin', 'owner'].includes(user?.role || '')
        },
        {
            icon: ShieldCheck,
            label: 'Роли',
            path: '/admin/roles',
            show: user?.role === 'owner'
        },
    ];

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col h-screen sticky top-0"
        >
            {/* Logo Section */}
            <div className="p-8 pb-4">
                <div
                    onClick={() => navigate('/dashboard')}
                    className="cursor-pointer hover:opacity-80 transition-all flex items-center gap-3 group"
                >
                    <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
                        <Logo />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                <div className="px-4 mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Меню управления</span>
                </div>

                {menuItems.filter(item => item.show).map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-primary text-gray-900 shadow-lg shadow-primary/20'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4" />}
                        </button>
                    );
                })}
            </nav>

            {/* Back to CRM */}
            <div className="p-6 mt-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm">В CRM</span>
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary-dark font-extrabold text-lg uppercase">
                            {user?.role?.[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.full_name}</p>
                        <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider">
                            {user?.role === 'owner' ? 'Владелец' :
                                user?.role === 'admin' ? 'Администратор' :
                                    user?.role === 'curator' ? 'Куратор' : user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};
