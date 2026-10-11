import { create } from 'zustand';

export type LanguageType = 'ZH' | 'EN' | 'JA' | 'KO';

interface LanguageState {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: (localStorage.getItem('user_lang') as LanguageType) || 'ZH',
  setLanguage: (lang) => {
    localStorage.setItem('user_lang', lang);
    set({ language: lang });
  }
}));
