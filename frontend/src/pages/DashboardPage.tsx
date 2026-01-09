import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

import { GridBackground } from '../components/ui/GridBackground';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <GridBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="text-gray-500 font-medium">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <GridBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Личный кабинет</h1>
          <p className="text-gray-500">Управляйте своим профилем и настройками</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-gray-100/80">
          <div className="flex items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Icon icon="lucide:user" className="w-14 h-14 text-gray-400" />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{user?.full_name || 'Пользователь'}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user?.role === 'admin'
                  ? 'bg-red-50 text-red-950 border border-red-200/50'
                  : 'bg-primary/10 text-primary'
                  }`}>
                  {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
                </span>
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon icon="lucide:mail" className="w-4 h-4 text-gray-500" />
                  </div>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon icon="lucide:calendar" className="w-4 h-4 text-gray-500" />
                  </div>
                  <span>Зарегистрирован: {new Date().toLocaleDateString('ru-RU')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold shadow-lg shadow-gray-900/10">
                  Редактировать профиль
                </button>
                <button className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold">
                  Сменить пароль
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Optional decorative section */}
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
      </motion.div>
    </DashboardLayout>
  );
};
