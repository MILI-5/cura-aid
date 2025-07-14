// src/configs/theme.config.ts
import { ThemeConfig } from '../@types/theme';

export const themes: Record<string, ThemeConfig> = {
    base: {
        colors: {
            primary: 'var(--primary-color)',
            background: 'var(--background-color)',
            text: 'var(--text-color)',
        },
        typography: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
        },
    },
    theme1: {
        colors: {
            primary: 'var(--primary-color)',
            background: 'var(--background-color)',
            text: 'var(--text-color)',
        },
        typography: {
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
        },
    },
};