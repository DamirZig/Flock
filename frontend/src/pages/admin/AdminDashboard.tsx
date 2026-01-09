import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '@iconify/react';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    const roleMap: Record<string, string> = {
        'owner': 'Владелец',
        'admin': 'Администратор',
        'curator': 'Куратор',
        'user': 'Пользователь'
    };

    const stats = [
        { label: 'Всего пользователей', value: '1,284', change: '+12%', color: 'blue', icon: 'lucide:users' },
        { label: 'Активных сегодня', value: '156', change: '+5%', color: 'green', icon: 'lucide:user-check' },
        { label: 'Новых за неделю', value: '42', change: '-2%', color: 'purple', icon: 'lucide:user-plus' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Добро пожаловать, {user?.full_name?.split(' ')[0] || 'Администратор'}! 👋
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        Твой уровень доступа:
                        <span className="ml-2 px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase tracking-wider border border-red-100">
                            {roleMap[user?.role || ''] || user?.role}
                        </span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        Экспорт
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
                        Отчет за месяц
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={item}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300`}>
                                <Icon icon={stat.icon} className="w-6 h-6" />
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h4 className="text-4xl font-black text-gray-900 mt-1">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-10 py-8 border-b border-gray-100/80 flex items-center justify-between">
                        <h3 className="font-black text-gray-900 text-lg tracking-tight">Последние действия</h3>
                        <Icon icon="lucide:history" className="text-gray-400 w-5 h-5" />
                    </div>
                    <div className="p-10 flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                            <Icon icon="lucide:scroll-text" className="w-10 h-10 text-gray-300" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-2">Журнал пуст</h5>
                        <p className="text-sm text-gray-500 max-w-[240px]">
                            Пока нет новых уведомлений для вашего уровня доступа
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-[2rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-primary/30 transition-colors duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-wider">Система Chimi</span>
                            </div>
                            <h3 className="text-2xl font-black mb-4">Автоматизация вашего бизнеса на максимуме</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Настройте умные сценарии для упрощения работы вашей команды и улучшения клиентского опыта.
                            </p>
                        </div>
                        <button className="mt-8 self-start px-6 py-3 bg-white text-gray-900 rounded-xl font-black text-sm hover:scale-105 transition-transform flex items-center gap-2">
                            Настроить Chimi
                            <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
