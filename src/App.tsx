// src/App.tsx or wherever your routes are defined
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/components/Home';
import Themes from './views/Home/themes/Themes';
import Profile from './views/Profile';
import Dashboard from './views/Dashboard';
import ThemeProvider from './components/template/ThemeProvider';
import FloatingSearchModal from './components/shared/FloatingSearchModal';
import ThemeCustomizer from './components/shared/ThemeCustomizer';
import Settings from './views/Settings';
import Contact from './views/Contact';
import { ToastProvider } from './components/shared/ToastContext';
import Breadcrumbs from './components/shared/Breadcrumbs';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './components/template/Logo';
import HealthInsights from './views/HealthInsights';

const SplashScreen = ({ show, theme }: { show: boolean; theme: 'light' | 'dark' }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className={`fixed inset-0 flex items-center justify-center z-[9999] transition-colors duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900' : 'bg-gradient-to-br from-blue-100 via-teal-100 to-neutral-50'}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        aria-label="Loading"
        role="status"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Logo type="full" mode={theme} logoWidth={160} imgClass="drop-shadow-xl" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    // Detect theme from ThemeProvider or localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') setTheme(storedTheme);
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

    return (
        <Router>
            <ThemeProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen">
            <SplashScreen show={showSplash} theme={theme} />
            {!showSplash && (
              <>
                        <FloatingSearchModal />
                <Breadcrumbs />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/themes" element={<Themes />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/customizer" element={<ThemeCustomizer />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/health-insights" element={<HealthInsights />} />
                        </Routes>
              </>
            )}
                    </div>
        </ToastProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;