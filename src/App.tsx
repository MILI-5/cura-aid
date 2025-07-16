// src/App.tsx or wherever your routes are defined
import React, { useState, createContext, useEffect } from 'react';
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
import { useLocation } from 'react-router-dom';
import Logo from './components/template/Logo';
import HealthInsights from './views/HealthInsights';
import ThreeDemo from './components/ui/ThreeDemo';
import AnimatedLanding from './components/ui/AnimatedLanding';
import Doctors from './views/Doctors';
import Inpatient from './views/Inpatient';
import Pharmacy from './views/Pharmacy';
import Lab from './views/Lab';
import Portal from './views/Portal';
import Telemedicine from './views/Telemedicine';
import Inventory from './views/Inventory';
import Notifications from './views/Notifications';
import Insurance from './views/Insurance';
import Branches from './views/Branches';
import Outpatient from './views/Outpatient';
import Surgery from './views/Surgery';
import Ambulance from './views/Ambulance';
import Bloodbank from './views/Bloodbank';
import Feedback from './views/Feedback';

// Mock tenants
const tenants = [
  { id: 'clinicA', name: 'Clinic A', color: '#3b82f6', logo: '/img/logo/logo-light-full.png' },
  { id: 'clinicB', name: 'Clinic B', color: '#10b981', logo: '/img/logo/logo-dark-full.png' },
  { id: 'clinicC', name: 'Clinic C', color: '#f59e42', logo: '/img/logo/logo-dark-streamline.png' },
];

export const TenantContext = createContext({ tenant: tenants[0], setTenant: (t: any) => {} });

const SplashScreen = ({ show, theme }: { show: boolean; theme: 'light' | 'dark' }) => (
  show ? (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-colors duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900' : 'bg-gradient-to-br from-blue-100 via-teal-100 to-neutral-50'}`}
      aria-label="Loading"
      role="status"
    >
      <div>
        <Logo type="full" mode={theme} logoWidth={160} imgClass="drop-shadow-xl" />
      </div>
    </div>
  ) : null
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<div><AnimatedLanding /></div>} />
      <Route path="/doctors" element={<div><Doctors /></div>} />
      <Route path="/inpatient" element={<div><Inpatient /></div>} />
      <Route path="/pharmacy" element={<div><Pharmacy /></div>} />
      <Route path="/lab" element={<div><Lab /></div>} />
      <Route path="/portal" element={<div><Portal /></div>} />
      <Route path="/telemedicine" element={<div><Telemedicine /></div>} />
      <Route path="/inventory" element={<div><Inventory /></div>} />
      <Route path="/notifications" element={<div><Notifications /></div>} />
      <Route path="/insurance" element={<div><Insurance /></div>} />
      <Route path="/branches" element={<div><Branches /></div>} />
      <Route path="/outpatient" element={<div><Outpatient /></div>} />
      <Route path="/surgery" element={<div><Surgery /></div>} />
      <Route path="/ambulance" element={<div><Ambulance /></div>} />
      <Route path="/bloodbank" element={<div><Bloodbank /></div>} />
      <Route path="/feedback" element={<div><Feedback /></div>} />
      <Route path="/themes" element={<div><Themes /></div>} />
      <Route path="/profile" element={<div><Profile /></div>} />
      <Route path="/dashboard" element={<div><Dashboard /></div>} />
      <Route path="/customizer" element={<div><ThemeCustomizer /></div>} />
      <Route path="/settings" element={<div><Settings /></div>} />
      <Route path="/contact" element={<div><Contact /></div>} />
      <Route path="/health-insights" element={<div><HealthInsights /></div>} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [tenant, setTenant] = useState(tenants[0]);
  const location = useLocation();

  useEffect(() => {
    // Detect theme from ThemeProvider or localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') setTheme(storedTheme);
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set CSS variable for tenant color
    document.documentElement.style.setProperty('--tenant-primary', tenant.color);
    // Set document title
    document.title = tenant.name + ' | Cura Aid';
    // Set favicon
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) favicon.href = tenant.logo;
  }, [tenant]);

    return (
        <ThemeProvider>
        <ToastProvider>
          <TenantContext.Provider value={{ tenant, setTenant }}>
            <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${tenant.color}22 0%, #fff 100%)` }}>
              {/* Tenant Welcome Banner */}
              <div className="w-full text-center py-2" style={{ background: tenant.color, color: '#fff' }}>
                Welcome to {tenant.name}!
              </div>
              {/* Tenant Selector */}
              <div className="w-full flex justify-end p-4 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
                <label className="mr-2 font-semibold text-primary">Tenant:</label>
                <select
                  value={tenant.id}
                  onChange={e => setTenant(tenants.find(t => t.id === e.target.value) || tenants[0])}
                  className="px-3 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
                >
                  {tenants.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              {/* Tenant Branding (logo) */}
              <div className="flex justify-center items-center py-6">
                <img src={tenant.logo} alt={tenant.name + ' logo'} className="h-12" />
                <span className="ml-4 text-2xl font-bold" style={{ color: tenant.color }}>{tenant.name}</span>
              </div>
              {/* Main App Content */}
              <div className="flex flex-col min-h-screen">
                <SplashScreen show={showSplash} theme={theme} />
                {!showSplash && (
                  <>
                    <FloatingSearchModal />
                    <Breadcrumbs />
                    <AnimatedRoutes />
                  </>
                )}
              </div>
            </div>
          </TenantContext.Provider>
        </ToastProvider>
            </ThemeProvider>
    );
};

// Register service worker for PWA
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src/service-worker.js').then(
      registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      err => {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}

export default App;