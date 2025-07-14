// src/@types/theme.ts
export type Theme = 'light' | 'dark' | 'theme1' | 'theme2';

export interface ThemeConfig {
  colors: {
    background: string;
    text: string;
    primary: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
  };
}