import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { loginUser } from '../api/client';
import { Logo } from '../components/ui/Logo';
import { GridBackground } from '../components/ui/GridBackground';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onRegister: () => void;
  onLoginSuccess?: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onRegister, onLoginSuccess, onBack }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string, isVisible: boolean }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    setAlert(prev => ({ ...prev, isVisible: false }));

    try {
      // Backend sets the cookie. We don't need to manually store the token.
      await loginUser({ email, password });

      // Update context: this will trigger a checkAuth() to verify the cookie
      login();

      setAlert({
        type: 'success',
        message: 'Успешный вход!',
        isVisible: true
      });

      if (onLoginSuccess) {
        setTimeout(onLoginSuccess, 1000);
      }
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.message || 'Ошибка входа',
        isVisible: true
      });
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
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50"
      >
        <Alert
          type={alert.type}
          message={alert.message}
          isVisible={alert.isVisible}
          onClose={() => setAlert(prev => ({ ...prev, isVisible: false }))}
        />

        <div className="flex flex-col items-center mb-8">
          <div onClick={onBack} className="cursor-pointer hover:opacity-80 transition-opacity mb-6">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            С возвращением
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Войдите, чтобы продолжить управление
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mb-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Пароль"
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
              Забыли пароль?
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Ещё нет аккаунта?</span>
          <button
            onClick={onRegister}
            className="font-bold text-gray-900 hover:text-primary transition-colors"
          >
            Создать аккаунт
          </button>
        </div>
      </motion.div>
    </div>
  );
};
