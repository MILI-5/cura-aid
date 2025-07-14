import React, { useState, useEffect } from 'react';

const PRESET_THEMES = [
  { name: 'Blue', primary: '#2a85ff', secondary: '#8ecae6', background: '#f5faff' },
  { name: 'Green', primary: '#0CAF60', secondary: '#b7e4c7', background: '#f6fff8' },
  { name: 'Purple', primary: '#8C62FF', secondary: '#cdb4f6', background: '#f8f7ff' },
  { name: 'Orange', primary: '#fb732c', secondary: '#ffd6a5', background: '#fff7f0' },
  { name: 'Red', primary: '#e74c3c', secondary: '#ffb4a2', background: '#fff5f5' },
];

const getStored = (key: string, fallback: string) => localStorage.getItem(key) || fallback;

export const ThemeCustomizerPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [primary, setPrimary] = useState(getStored('custom-primary', '#2a85ff'));
  const [secondary, setSecondary] = useState(getStored('custom-secondary', '#8ecae6'));
  const [background, setBackground] = useState(getStored('custom-background', '#f5faff'));

  useEffect(() => {
    document.documentElement.style.setProperty('--tw-color-primary', primary);
    document.documentElement.style.setProperty('--tw-color-secondary', secondary);
    document.documentElement.style.setProperty('--tw-color-background', background);
    localStorage.setItem('custom-primary', primary);
    localStorage.setItem('custom-secondary', secondary);
    localStorage.setItem('custom-background', background);
  }, [primary, secondary, background]);

  const handlePreset = (theme: typeof PRESET_THEMES[0]) => {
    setPrimary(theme.primary);
    setSecondary(theme.secondary);
    setBackground(theme.background);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold text-primary mb-4">Theme Customizer</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Primary color:</label>
        <input
          type="color"
          value={primary}
          onChange={e => setPrimary(e.target.value)}
          className="w-12 h-12 p-0 border-none bg-transparent cursor-pointer"
        />
        <span className="ml-4 text-gray-700 dark:text-gray-200">{primary}</span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Secondary color:</label>
        <input
          type="color"
          value={secondary}
          onChange={e => setSecondary(e.target.value)}
          className="w-12 h-12 p-0 border-none bg-transparent cursor-pointer"
        />
        <span className="ml-4 text-gray-700 dark:text-gray-200">{secondary}</span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Background color:</label>
        <input
          type="color"
          value={background}
          onChange={e => setBackground(e.target.value)}
          className="w-12 h-12 p-0 border-none bg-transparent cursor-pointer"
        />
        <span className="ml-4 text-gray-700 dark:text-gray-200">{background}</span>
      </div>
      <div className="mb-2 font-medium">Or choose a preset:</div>
      <div className="flex gap-3 mb-4">
        {PRESET_THEMES.map(theme => (
          <button
            key={theme.name}
            className={`w-10 h-10 rounded-full border-2 ${primary === theme.primary && secondary === theme.secondary && background === theme.background ? 'border-primary' : 'border-gray-300'}`}
            style={{ background: `linear-gradient(135deg, ${theme.primary} 60%, ${theme.secondary} 100%, ${theme.background} 100%)` }}
            onClick={() => handlePreset(theme)}
            aria-label={theme.name}
          />
        ))}
      </div>
      <div className="text-xs text-gray-400">Your choices are saved and applied instantly!</div>
      {onClose && (
        <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition w-full" onClick={onClose}>Close</button>
      )}
    </div>
  );
};

const ThemeCustomizer: React.FC = () => <ThemeCustomizerPanel />;

export default ThemeCustomizer; 