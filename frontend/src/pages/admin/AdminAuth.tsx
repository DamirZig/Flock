import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { GridBackground } from '../../components/ui/GridBackground';
import { verifyPassword } from '../../api/client';

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
                    <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-red-100">
                        Admin Security
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        Подтвердите личность
                    </h2>
                    <p className="text-gray-500 text-center mt-2">
                        Введите пароль от вашей учетной записи для входа в панель управления
                    </p>
                </div>

                <form onSubmit={handleVerify} className="w-full flex flex-col gap-4 mb-6">
                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Ваш пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 h-12"
                            required
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1 text-center font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-none"
                    >
                        {isLoading ? 'Проверка...' : 'Войти в админ-панель'}
                    </Button>
                </form>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <button
                        onClick={onBack}
                        className="font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Вернуться назад
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
