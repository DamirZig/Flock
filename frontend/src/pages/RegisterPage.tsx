import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { registerUser } from '../api/client';
import { Logo } from '../components/ui/Logo';
import { GridBackground } from '../components/ui/GridBackground';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string, isVisible: boolean }>({
    type: 'success',
    message: '',
    isVisible: true
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    if (password !== confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Пароли не совпадают',
        isVisible: true
      });
      return;
    }

    setIsLoading(true);
    setAlert(prev => ({ ...prev, isVisible: false }));

    try {
      await registerUser({ email, password, full_name: fullName });
      setAlert({
        type: 'success',
        message: 'Аккаунт успешно создан!',
        isVisible: true
      });
      setAlert({
        type: 'success',
        message: 'Аккаунт успешно создан!',
        isVisible: true
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.message || 'Ошибка регистрации',
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
          <div onClick={() => navigate('/')} className="cursor-pointer hover:opacity-80 transition-opacity mb-6">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Добро пожаловать
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Создайте аккаунт и начните управлять бизнесом
          </p>
        </div>

        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4 mb-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Имя"
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 h-12"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
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
            <Input
              type="password"
              placeholder="Повторите пароль"
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 h-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Создание...' : 'Создать аккаунт'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Уже есть аккаунт?</span>
          <button
            onClick={() => navigate('/login')}
            className="font-bold text-gray-900 hover:text-primary transition-colors"
          >
            Войти
          </button>
        </div>
      </motion.div>
    </div>
  );
};
