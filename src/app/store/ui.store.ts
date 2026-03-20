import { create } from 'zustand';

export type CursorVariant = 'default' | 'hover' | 'view';

interface UIState {
  splashDone: boolean;
  setSplashDone: (done: boolean) => void;

  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;

  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  splashDone: sessionStorage.getItem('splashDone') === 'true',
  setSplashDone: (done) => {
    if (done) sessionStorage.setItem('splashDone', 'true');
    set({ splashDone: done });
  },

  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
}));
