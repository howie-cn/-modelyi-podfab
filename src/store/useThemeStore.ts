import { create } from 'zustand';

interface ThemeState {
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isTerminalMode: false,
  toggleTerminalMode: () => set((state) => ({ isTerminalMode: !state.isTerminalMode })),
}));
