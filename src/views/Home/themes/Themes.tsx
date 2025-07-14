import React from 'react';
import { useThemeStore } from '../../../store/themeStore';
import { themes } from '../../../configs/theme.config';

const Themes: React.FC = () => {
    const { setTheme } = useThemeStore();

    const handleThemeChange = (theme: string) => {
        setTheme(theme);
    };

    return (
        <div>
            <h1>Select a Theme</h1>
            <div className="theme-list">
                {Object.keys(themes).map((themeKey) => (
                    <div
                        key={themeKey}
                        className={`theme-preview theme-${themeKey} border rounded shadow p-4 m-2 cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => handleThemeChange(themeKey)}
                        style={{
                            // ... existing code ...
                        }}
                    >
                        <span className="capitalize font-semibold">{themeKey}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Themes;