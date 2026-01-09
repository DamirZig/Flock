import React from 'react';
import { Icon } from '@iconify/react';

export const StatsOverview: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100/80">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon icon="lucide:zap" className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500">Активных задач</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100/80">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-600" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-500">Выполнено</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100/80">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon icon="lucide:users" className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">1</p>
                <p className="text-sm text-gray-500">Пользователей</p>
            </div>
        </div>
    );
};
