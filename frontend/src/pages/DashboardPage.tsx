import React from 'react';
import { motion } from 'framer-motion';

import { GridBackground } from '../components/ui/GridBackground';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton';

export const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <DashboardLayout>
        <GridBackground />
        <div className="relative z-10 pt-8 mt-20"> {/* Match layout padding/margin */}
          <DashboardSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <GridBackground />
      <div className="relative z-10 pt-8 mt-20">
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
      </div>
    </DashboardLayout>
  );
};
