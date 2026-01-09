import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Logo } from '../components/ui/Logo';
import { GridBackground } from '../components/ui/GridBackground';

export const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulation of admin login
        setTimeout(() => {
            setIsLoading(false);
            // Here would be actual admin logic
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans bg-gray-50/50">
            <GridBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50"
            >
                <div className="flex flex-col items-center mb-8">
                    <div onClick={() => navigate('/dashboard')} className="cursor-pointer hover:opacity-80 transition-opacity mb-6">
                        <Logo />
                    </div>
                    <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-red-100">
                        Admin Zone
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Панель Администратора
                    </h2>
                    <p className="text-gray-500 text-center mt-2">
                        Доступ только для уполномоченных лиц
                    </p>
                </div>

                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mb-6">
                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Ключ доступа"
                            className="bg-white/50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 h-12"
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-none"
                    >
                        {isLoading ? 'Проверка прав...' : 'Войти в систему'}
                    </Button>
                </form>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Вернуться назад
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
