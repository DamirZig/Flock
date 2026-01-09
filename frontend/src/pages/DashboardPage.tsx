import React from 'react';
import { motion } from 'framer-motion';

import { GridBackground } from '../components/ui/GridBackground';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { StatsOverview } from '../components/dashboard/StatsOverview';

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
        <ProfileCard user={user} />

        {/* Quick Stats - Optional decorative section */}
        <StatsOverview />
      </motion.div>
    </DashboardLayout>
  );
};
