import React from 'react';
import { ThemeCustomizerPanel } from '../components/shared/ThemeCustomizer';

const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 mt-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Settings</h1>
      <ThemeCustomizerPanel />
    </div>
  );
};

export default Settings; 