// components/shared/NavBar.tsx
import React, { useState, useEffect } from 'react';
// Heroicons SVG for user
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
  </svg>
);
// Heroicons SVG for bell
const BellIcon = ({ hasUnread }: { hasUnread: boolean }) => (
  <span className="relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a2.25 2.25 0 01-4.714 0m9.107-2.625c-.806-.54-1.284-1.373-1.284-2.307V9.75a6 6 0 10-12 0v2.4c0 .934-.478 1.768-1.284 2.307-.527.354-.816.98-.639 1.61.176.63.746 1.033 1.397 1.033h14.356c.65 0 1.22-.403 1.397-1.033.177-.63-.112-1.256-.639-1.61z" />
    </svg>
    {hasUnread && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>}
  </span>
);
// Heroicons SVG for plus
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
// Heroicons SVG for globe
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.25-9H21M3 12h2.25m12.364-7.364l-1.591 1.591m-9.192 9.192l-1.591 1.591m0-11.313l1.591 1.591m9.192 9.192l1.591 1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
  </svg>
);
// Heroicons SVG for sun and moon
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 transition-all duration-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.25-9H21M3 12h1.5m15.364-7.364l-1.06 1.06m-12.728 12.728l-1.06 1.06m0-14.848l1.06 1.06m12.728 12.728l1.06 1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
  </svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 transition-all duration-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
);
// Heroicons SVG for lifebuoy (help)
const LifebuoyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l3.18 3.18m6.78 6.78l3.18 3.18m0-13.14l-3.18 3.18m-6.78 6.78l-3.18 3.18" />
  </svg>
);

const mockSearchData = [
  { type: 'Patient', name: 'John Doe', link: '/patients' },
  { type: 'Doctor', name: 'Dr. Alice Brown', link: '/doctors' },
  { type: 'Appointment', name: 'Jane Smith with Dr. Bob White', link: '/appointments' },
  { type: 'Bill', name: 'Bill #1234', link: '/billing' },
  { type: 'Medical Record', name: 'John Doe - Flu', link: '/medical-records' },
];

import ClinicSelector from './ClinicSelector';
import { useSessionUser } from '../../store/authStore';
import { useClinicStore } from '../../store/clinicStore';

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [role, setRole] = useState<'admin' | 'doctor' | 'staff' | 'patient'>('admin');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const filteredResults =
    search.length > 0
      ? mockSearchData.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.type.toLowerCase().includes(search.toLowerCase())
        )
      : [];
  const [helpOpen, setHelpOpen] = useState(false);
  const { user } = useSessionUser();
  const { currentClinic } = useClinicStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  // Mock notifications
  const notifications = [
    { id: 1, text: 'New appointment scheduled for tomorrow at 10:00 AM.', read: false, time: '2m ago' },
    { id: 2, text: 'Bill #1234 is due in 3 days.', read: false, time: '1h ago' },
    { id: 3, text: 'Medical record updated for Jane Smith.', read: true, time: '1d ago' },
  ];
  const unreadCount = notifications.filter(n => !n.read).length;
  // Role-based nav links
  const navLinks = [
    { to: '/', label: 'Home', roles: ['admin', 'doctor', 'staff', 'patient'] },
    { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'doctor', 'staff', 'patient'] },
    { to: '/health-insights', label: 'Health Insights', roles: ['admin', 'doctor', 'staff', 'patient'] },
    { to: '/patients', label: 'Patients', roles: ['admin', 'staff', 'doctor'] },
    { to: '/doctors', label: 'Doctors', roles: ['admin', 'staff'] },
    { to: '/appointments', label: 'Appointments', roles: ['admin', 'doctor', 'staff', 'patient'] },
    { to: '/billing', label: 'Billing', roles: ['admin', 'staff'] },
    { to: '/medical-records', label: 'Records', roles: ['admin', 'staff', 'patient'] },
  ];
  // Role-based quick actions
  const quickActions = [
    { to: '/patients', label: 'Add Patient', roles: ['admin', 'staff'] },
    { to: '/doctors', label: 'Add Doctor', roles: ['admin', 'staff'] },
    { to: '/appointments', label: 'Add Appointment', roles: ['admin', 'doctor', 'staff', 'patient'] },
    { to: '/billing', label: 'Add Bill', roles: ['admin', 'staff'] },
    { to: '/medical-records', label: 'Add Medical Record', roles: ['admin', 'staff', 'patient'] },
  ];
  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-0 left-0 bg-primary text-white p-2 z-50">Skip to main content</a>
      <nav
        role="navigation"
        aria-label="Main site navigation"
        className="flex items-center justify-between px-8 py-4 bg-white/60 dark:bg-gray-900/60 shadow-glass rounded-b-xl sticky top-0 z-50 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 font-sans transition-all duration-300"
        style={{ background: currentClinic.theme.primary }}
      >
        <div className="flex items-center gap-2">
          <img src={currentClinic.logo} alt={currentClinic.name} className="h-8 w-8 rounded-full" />
          <span className="font-bold text-lg text-white">{currentClinic.name}</span>
        </div>
        {/* Desktop Links */}
        <div className={`hidden md:flex gap-8 text-lg font-medium ${mobileMenuOpen ? 'pointer-events-none opacity-0' : ''}`}>
          {navLinks.filter(link => link.roles.includes(role)).map(link => (
            <a key={link.to} href={link.to} className="hover:text-primary transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/40" aria-label={link.label}>{link.label}</a>
          ))}
        </div>
        {/* Global Search Bar (desktop) */}
        <div className="hidden md:block relative w-72 mx-6">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
            placeholder="Search patients, doctors, ..."
            className="w-full px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-sans transition-all duration-200"
            aria-label="Global search"
          />
          {searchOpen && search.length > 0 && (
            <div className="absolute left-0 mt-2 w-full bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg z-50 border border-neutral-100 dark:border-neutral-700 animate-fade-in backdrop-blur-md">
              {filteredResults.length === 0 ? (
                <div className="px-4 py-3 text-neutral-500 dark:text-neutral-400">No results found</div>
              ) : (
                <ul>
                  {filteredResults.map((item, idx) => (
                    <li key={idx}>
                      <a href={item.link} className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors">
                        <span className="font-semibold text-primary">{item.type}:</span> {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/40 ${langOpen ? 'ring-2 ring-primary' : ''}`}
              aria-label="Select language"
              onClick={() => { setLangOpen(v => !v); setQuickAddOpen(false); setNotifOpen(false); setDropdownOpen(false); }}
              tabIndex={0}
            >
              <GlobeIcon />
              <span className="ml-1 text-sm font-semibold">{language === 'en' ? 'EN' : 'ES'}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg py-2 z-50 animate-fade-in border border-neutral-100 dark:border-neutral-700 backdrop-blur-md" role="menu" aria-label="Select language">
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors ${language === 'en' ? 'font-bold text-primary' : ''}`}
                  onClick={() => { setLanguage('en'); setLangOpen(false); }}
                  role="menuitem"
                >
                  English
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors ${language === 'es' ? 'font-bold text-primary' : ''}`}
                  onClick={() => { setLanguage('es'); setLangOpen(false); }}
                  role="menuitem"
                >
                  Español
                </button>
              </div>
            )}
          </div>
          {/* Theme Toggle */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary/10 dark:hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40 transform transition-transform duration-150 active:scale-95 ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            tabIndex={0}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span className="transition-transform duration-300" style={{ transform: theme === 'dark' ? 'rotate(-20deg) scale(1.1)' : 'rotate(0deg) scale(1)' }}>
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
            </span>
          </button>
          {/* Quick Add Button */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 shadow-glass focus:outline-none focus:ring-2 focus:ring-primary/40 transform transition-transform duration-150 active:scale-95"
              aria-label="Quick Add"
              aria-haspopup="menu"
              aria-expanded={quickAddOpen}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Escape') setQuickAddOpen(false); }}
              onClick={() => { setQuickAddOpen(v => !v); setNotifOpen(false); setDropdownOpen(false); setLangOpen(false); }}
            >
              <PlusIcon />
            </button>
            {quickAddOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg py-2 z-50 animate-fade-in border border-neutral-100 dark:border-neutral-700 backdrop-blur-md"
                role="menu"
                aria-label="Quick Add Menu"
              >
                <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 font-semibold text-gray-900 dark:text-gray-100">Quick Add</div>
                {quickActions.filter(action => action.roles.includes(role)).map(action => (
                  <a key={action.to} href={action.to} className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors" role="menuitem" tabIndex={0}>{action.label}</a>
                ))}
              </div>
            )}
          </div>
          {/* Notifications Bell */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary/10 dark:hover:bg-primary/20 shadow focus:outline-none focus:ring-2 focus:ring-primary/40 transform transition-transform duration-150 active:scale-95"
              aria-label="Notifications"
              onClick={() => { setNotifOpen(v => !v); setDropdownOpen(false); setQuickAddOpen(false); }}
              tabIndex={0}
            >
              <BellIcon hasUnread={unreadCount > 0} />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg py-2 z-50 animate-fade-in border border-neutral-100 dark:border-neutral-700 backdrop-blur-md">
                <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-between">
                  Notifications
                  {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 text-xs bg-error text-white rounded-full">{unreadCount}</span>}
                </div>
                <ul className="max-h-64 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-700">
                  {notifications.length === 0 && (
                    <li className="px-4 py-3 text-neutral-500 dark:text-neutral-400">No notifications</li>
                  )}
                  {notifications.map(n => (
                    <li key={n.id} className={`px-4 py-3 flex flex-col ${!n.read ? 'bg-primary/5 dark:bg-primary/10' : ''} rounded`}>
                      <span className="text-sm text-gray-800 dark:text-gray-100">{n.text}</span>
                      <span className="text-xs text-neutral-400 mt-1">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Help/Support Icon */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary/10 dark:hover:bg-primary/20 shadow focus:outline-none focus:ring-2 focus:ring-primary/40 transform transition-transform duration-150 active:scale-95"
              aria-label="Help and support"
              onClick={() => { setHelpOpen(v => !v); setNotifOpen(false); setDropdownOpen(false); setQuickAddOpen(false); setLangOpen(false); }}
              tabIndex={0}
            >
              <LifebuoyIcon />
            </button>
            {helpOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg py-2 z-50 animate-fade-in border border-neutral-100 dark:border-neutral-700 backdrop-blur-md">
                <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 font-semibold text-gray-900 dark:text-gray-100">Help & Support</div>
                <a href="#" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors" role="menuitem">Help Center</a>
                <a href="#" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors" role="menuitem">FAQ</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 transition-colors rounded" role="menuitem">Contact Support</a>
              </div>
            )}
          </div>
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary/10 dark:hover:bg-primary/20 shadow focus:outline-none focus:ring-2 focus:ring-primary/40 transform transition-transform duration-150 active:scale-95"
              aria-label="User menu"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Escape') setDropdownOpen(false); }}
              onClick={() => { setDropdownOpen((v) => !v); setNotifOpen(false); setQuickAddOpen(false); setLangOpen(false); }}
            >
              <img src={user.avatar ?? undefined} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-lg py-2 z-50 animate-fade-in border border-neutral-100 dark:border-neutral-700 backdrop-blur-md"
                role="menu"
                aria-label="User Menu"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-700 mb-2">
                  <img src={user.avatar ?? undefined} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{user.userName ?? undefined}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">{role}</div>
                  </div>
                </div>
                <a href="#" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors" role="menuitem" tabIndex={0}>Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors" role="menuitem" tabIndex={0}>Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-error/10 dark:hover:bg-error/20 text-error transition-colors rounded" role="menuitem" tabIndex={0}>Logout</a>
                <div className="border-t border-neutral-100 dark:border-neutral-700 mt-2 pt-2 px-4">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Switch Role (demo):</div>
                  <div className="flex gap-2">
                    {['admin', 'doctor', 'staff', 'patient'].map(r => (
                      <button
                        key={r}
                        className={`px-2 py-1 rounded text-xs font-semibold border ${role === r ? 'bg-primary text-white border-primary' : 'bg-neutral-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 border-neutral-200 dark:border-neutral-700'} transition-colors`}
                        onClick={() => setRole(r as any)}
                        tabIndex={0}
                        aria-label={`Switch to ${r} role`}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <ClinicSelector userClinicIds={Array.isArray(user.clinicIds) ? user.clinicIds : undefined} />
        </div>
      </nav>
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" tabIndex={0}></div>
          <aside className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg z-[101] flex flex-col animate-slide-in">
            <div className="flex flex-col gap-2 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏥</span>
                  <span className="text-lg font-bold text-primary">Cliniq</span>
                </div>
                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Mobile Search Bar */}
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm mt-2"
                aria-label="Global search"
              />
              {searchOpen && search.length > 0 && (
                <div className="absolute left-6 right-6 mt-14 w-[calc(100%-3rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 border border-gray-100 dark:border-gray-700 animate-fade-in">
                  {filteredResults.length === 0 ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">No results found</div>
                  ) : (
                    <ul>
                      {filteredResults.map((item, idx) => (
                        <li key={idx}>
                          <a href={item.link} className="block px-4 py-2 hover:bg-teal-100 dark:hover:bg-teal-900 transition">
                            <span className="font-semibold text-primary">{item.type}:</span> {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <nav className="flex flex-col gap-2 px-6 py-4 text-lg font-medium">
              {navLinks.filter(link => link.roles.includes(role)).map(link => (
                <a key={link.to} href={link.to} className="py-2 hover:text-primary transition" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
              ))}
            </nav>
            <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2 px-6">
              <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Quick Actions</div>
              {quickActions.filter(action => action.roles.includes(role)).map(action => (
                <a key={action.to} href={action.to} className="block px-2 py-2 rounded hover:bg-teal-100 dark:hover:bg-teal-900 transition" onClick={() => setMobileMenuOpen(false)}>{action.label}</a>
              ))}
            </div>
            <div className="mt-auto px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded shadow transition" onClick={() => setMobileMenuOpen(false)}>Make A Payment</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default NavBar;