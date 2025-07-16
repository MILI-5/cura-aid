import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarCheck, FaMoon, FaSun } from 'react-icons/fa';

interface HospitalPageLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const glassStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.82)',
  boxShadow: '0 8px 32px 0 rgba(56,189,248,0.13)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '2rem',
  border: '1.5px solid rgba(56,189,248,0.18)',
};

const HospitalPageLayout: React.FC<HospitalPageLayoutProps> = ({ title, subtitle, backgroundImage, children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((d) => !d);
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: `url(${backgroundImage || DEFAULT_IMAGE}) center/cover no-repeat fixed`,
        position: 'relative',
        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
        transition: 'background 0.3s',
      }}
    >
      {/* Overlay for the whole page */}
      <div style={{ position: 'absolute', inset: 0, background: darkMode ? 'rgba(15,23,42,0.88)' : 'rgba(15,23,42,0.78)', zIndex: 0 }} />
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 100,
          background: darkMode ? '#bae6fd' : '#0f172a',
          color: darkMode ? '#0f172a' : '#bae6fd',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(15,23,42,0.13)',
          cursor: 'pointer',
          transition: 'background 0.3s, color 0.3s',
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
      </button>
      {/* Hero/Header Section */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '38vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '2.5rem 1rem' }}>
          <div style={{ color: '#67e8f9', fontWeight: 700, letterSpacing: '2px', fontSize: '1.05rem', marginBottom: 10 }}>CURA AID</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.7rem', lineHeight: 1.15, textShadow: '0 2px 16px #0e7490cc' }}>{title}</h1>
          <p style={{ color: '#bae6fd', fontSize: '1.08rem', fontWeight: 500, textShadow: '0 2px 16px #0e749088' }}>{subtitle}</p>
        </div>
      </section>
      {/* Main Content - glassy card */}
      <div
        style={{
          ...glassStyle,
          maxWidth: 900,
          margin: '0 auto',
          padding: '2.5rem 1rem',
          position: 'relative',
          zIndex: 2,
          marginTop: '-2.5rem',
          marginBottom: '2.5rem',
          color: darkMode ? '#0ea5e9' : undefined,
        }}
      >
        {children}
      </div>
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/appointments')}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 100,
          background: 'linear-gradient(90deg, #38bdf8 0%, #4ade80 100%)',
          color: '#0f172a',
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(56,189,248,0.18)',
          fontWeight: 700,
          fontSize: '1.5rem',
          cursor: 'pointer',
          transition: 'background 0.3s, color 0.3s',
        }}
        aria-label="Book Appointment"
      >
        <FaRegCalendarCheck size={28} />
      </button>
    </div>
  );
};

export default HospitalPageLayout; 