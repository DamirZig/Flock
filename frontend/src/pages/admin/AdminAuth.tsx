import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { GridBackground } from '../../components/ui/GridBackground';
import { verifyPassword } from '../../api/client';
import { Icon } from '@iconify/react';

interface AdminAuthProps {
    onVerified: () => void;
    onBack: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onVerified, onBack }) => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await verifyPassword(password);
            onVerified();
        } catch (err: any) {
            setError(err.message || 'Ошибка проверки пароля');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 font-sans bg-gray-50/50">
            <GridBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50"
            >
                <div className="flex flex-col items-center mb-8">
                    <div onClick={onBack} className="cursor-pointer hover:opacity-80 transition-opacity mb-6">
                        <Logo />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full mb-4"
                    >
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Admin Security</span>
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Подтвердите личность
                    </h2>
                    <p className="text-gray-500 text-center mt-2">
                        Введите пароль для входа в панель управления
                    </p>
                </div>

                <form onSubmit={handleVerify} className="w-full flex flex-col gap-4 mb-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                type="password"
                                placeholder="Ваш пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 h-12 pl-10"
                                required
                            />
                            <Icon icon="lucide:lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-500 text-xs mt-1 text-center font-medium"
                            >
                                {error}
                            </motion.p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 bg-gray-900 hover:bg-gray-800 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed border-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5" />
                                <span>Проверка...</span>
                            </div>
                        ) : 'Войти в админ-панель'}
                    </Button>
                </form>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1 font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <Icon icon="lucide:arrow-left" className="w-4 h-4" />
                        Вернуться назад
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
