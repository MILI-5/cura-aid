// src/store/themeStore.ts
import create from 'zustand';

interface ThemeStore {
    currentTheme: string;
    setTheme: (theme: string) => void;
}

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'base';
    }
    return 'base';
};

export const useThemeStore = create<ThemeStore>((set) => ({
    currentTheme: getInitialTheme(),
    setTheme: (theme) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
        set({ currentTheme: theme });
    },
}));