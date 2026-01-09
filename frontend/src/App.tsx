import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CookieConsent } from './components/ui/CookieConsent';
import { AuthProvider, useAuth } from './context/AuthContext';

type Page = 'welcome' | 'login' | 'register' | 'dashboard';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Initialize state from localStorage or default to 'welcome'
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const savedPage = localStorage.getItem('currentPage');
    return (savedPage as Page) || 'welcome';
  });

  // Persist currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (isAuthenticated) {
      if (currentPage === 'login' || currentPage === 'register') {
        setCurrentPage('dashboard');
      }
    } else {
      if (currentPage === 'dashboard') {
        setCurrentPage('welcome');
      }
    }
  }, [isAuthenticated, currentPage]);

  const handleNext = () => {
    setCurrentPage('login');
  };

  const handleRegister = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('register');
    }
  };

  const handleLogin = () => {
    setCurrentPage('login');
  };

  const handleBack = () => {
    setCurrentPage('welcome');
  };

  const handleDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleHome = () => {
    setCurrentPage('welcome');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen absolute top-0 left-0"
          >
            <WelcomePage
              onNext={handleNext}
              onRegister={handleRegister}
              onDashboard={handleDashboard}
            />
          </motion.div>
        )}

        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen absolute top-0 left-0"
          >
            <LoginPage
              onRegister={handleRegister}
              onBack={handleBack}
              onLoginSuccess={() => setCurrentPage('dashboard')}
            />
          </motion.div>
        )}

        {currentPage === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen absolute top-0 left-0"
          >
            <RegisterPage onLogin={handleLogin} onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-screen absolute top-0 left-0"
          >
            <DashboardPage onHome={handleHome} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
