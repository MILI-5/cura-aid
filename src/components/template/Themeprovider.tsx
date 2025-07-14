// src/components/template/ThemeProvider.tsx
import React, { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { themes } from '../../configs/theme.config';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { currentTheme } = useThemeStore();

    useEffect(() => {
        document.body.className = currentTheme === 'dark' ? 'dark' : ''; // Apply dark class
    }, [currentTheme]);

    return <>{children}</>;
};

export default ThemeProvider;