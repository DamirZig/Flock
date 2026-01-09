import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    const roleMap: Record<string, string> = {
        'owner': 'Владелец',
        'admin': 'Администратор',
        'curator': 'Куратор',
        'user': 'Пользователь'
    };

    const stats = [
        { label: 'Всего пользователей', value: '1,284', change: '+12%', color: 'blue' },
        { label: 'Активных сегодня', value: '156', change: '+5%', color: 'green' },
        { label: 'Новых за неделю', value: '42', change: '-2%', color: 'purple' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Добро пожаловать, {user?.full_name}! 👋</h2>
                    <p className="text-gray-500 mt-1">Твой уровень доступа: <span className="font-semibold text-red-600 uppercase">{roleMap[user?.role || ''] || user?.role}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                            <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Последние действия в системе</h3>
                </div>
                <div className="p-6">
                    <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-4">📜</div>
                        <p>Пока нет новых уведомлений для вашего уровня доступа</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
