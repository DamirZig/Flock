import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Icon } from '@iconify/react';
import { GridBackground } from '../components/ui/GridBackground';
import { Logo } from '../components/ui/Logo';
import chimiLogo from '../assets/chimi.png';
import { useAuth } from '../context/AuthContext';

interface WelcomePageProps {
  onNext: () => void;
  onRegister: () => void;
  onDashboard?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onNext,
  onRegister,
  onDashboard
}) => {
  const { isAuthenticated, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 15
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans bg-gray-50/50">
      <GridBackground />

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">

        {/* Header / Logo Area */}
        <div className="flex justify-between items-center mb-8 sm:mb-12 max-w-7xl mx-auto w-full">
          <Logo />

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg transition-all"
              >
                <Icon icon="lucide:user" className="w-5 h-5 text-gray-500" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      <button
                        onClick={() => { setShowMenu(false); onDashboard?.(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon icon="lucide:layout-dashboard" className="w-5 h-5 text-primary" />
                        <span className="font-medium">Панель управления</span>
                      </button>
                      <button
                        onClick={() => setShowMenu(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon icon="lucide:settings" className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Настройки</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => { setShowMenu(false); logout(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Icon icon="lucide:log-out" className="w-5 h-5" />
                        <span className="font-medium">Выйти</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onNext}
              className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
            >
              Войти
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-7xl mx-auto w-full">

          {/* Left Column: Text & CTA */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Smart Business OS</span>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Бизнес <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary">на автопилоте</span>
                <motion.svg
                  className="absolute w-full h-3 bottom-0 left-0 z-0 text-primary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Единая платформа для управления продажами, клиентами и задачами. Работает в Telegram, браузере и твоем ритме.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onRegister}
                className="text-lg py-4 px-8 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 shadow-xl shadow-gray-900/10 transform hover:-translate-y-1 transition-all duration-300"
              >
                Начать бесплатно
                <Icon icon="solar:arrow-right-up-bold" className="ml-2" />
              </Button>
              <button className="text-lg py-4 px-8 rounded-2xl bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center justify-center gap-2">
                <Icon icon="solar:play-circle-bold-duotone" className="text-primary text-2xl" />
                Как это работает?
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Icon icon="logos:telegram" width="24" className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="logos:google-icon" width="24" className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="logos:yandex-ru" width="24" className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Bento Grid */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4 auto-rows-[180px]">

              {/* Card 1: Ecosystem */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 row-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between overflow-hidden relative"
              >
                <div className="z-10">
                  <h3 className="text-2xl font-bold text-gray-900">Экосистема</h3>
                  <p className="text-gray-500">Всё в одном месте</p>
                </div>

                {/* Abstract decorative circles instead of old logo */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="20" className="text-primary" />
                    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="20" className="text-gray-900" />
                  </svg>
                </div>

                <div className="z-10 bg-primary/10 p-4 rounded-2xl">
                  <Icon icon="solar:widget-5-bold-duotone" className="text-primary w-8 h-8" />
                </div>
              </motion.div>

              {/* Card 2: AI */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-1 row-span-1 bg-gray-900 rounded-3xl p-6 shadow-sm flex flex-col justify-between text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>

                {/* Chimi Mascot Image */}
                <img
                  src={chimiLogo}
                  className="absolute -right-2 -bottom-4 w-24 h-24 object-contain opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
                  alt="Chimi Mascot"
                />

                <Icon icon="solar:magic-stick-3-bold-duotone" className="text-primary w-8 h-8 z-10" />
                <div className="z-10">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    AI Chimi
                  </h3>
                  <p className="text-gray-400 text-sm">Твой помощник</p>
                </div>
              </motion.div>

              {/* Card 3: Analytics (Replaced Growth Claim) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-1 row-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group"
              >
                <div className="w-full h-16 flex items-end justify-between gap-1 pb-2">
                  {/* Abstract Wave Bars */}
                  {[40, 70, 50, 80, 60, 90, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-full bg-primary/20 rounded-t-sm"
                      initial={{ height: "20%" }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Аналитика</h3>
                  <p className="text-gray-500 text-sm">В реальном времени</p>
                </div>
              </motion.div>

              {/* Card 4: Devices */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 bg-gradient-to-r from-primary-light to-white rounded-3xl p-6 shadow-sm border border-white flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Любое устройство</h3>
                  <p className="text-gray-600 text-sm max-w-[150px]">Telegram бот или Веб-кабинет</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-16 bg-white rounded-lg border-2 border-gray-100 shadow-sm transform -rotate-6 flex items-center justify-center">
                    <Icon icon="solar:smartphone-bold" className="text-gray-300 w-6 h-6" />
                  </div>
                  <div className="w-20 h-14 bg-white rounded-lg border-2 border-gray-100 shadow-sm transform rotate-3 mt-4 flex items-center justify-center">
                    <Icon icon="solar:laptop-bold" className="text-gray-300 w-8 h-8" />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Footer Text */}
        <div className="text-center mt-12 pb-4 text-gray-400 text-sm">
          &copy; 2026 Flock. All rights reserved.
        </div>
      </div>
    </div>
  );
};
