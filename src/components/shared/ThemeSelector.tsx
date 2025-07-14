// src/components/shared/ThemeSelector.tsx
import React from 'react';
import { useThemeStore } from '../../store/themeStore';

const ThemeSelector: React.FC = () => {
    const { currentTheme, setTheme } = useThemeStore();

    return (
        <select
            className="border rounded px-2 py-1 mt-2"
            value={currentTheme}
            onChange={(e) => setTheme(e.target.value)}
        >
            <option value="base">Base</option>
            <option value="theme1">Theme 1</option>
            <option value="theme2">Theme 2</option>
            <option value="dark">Dark Mode</option>
        </select>
    );
};

export default ThemeSelector;