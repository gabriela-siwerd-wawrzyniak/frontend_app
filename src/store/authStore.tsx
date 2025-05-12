import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  firstName: string | null;
  loginDate: string | null;
  setAuth: (isAuthenticated: boolean, firstName: string, loginDate: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  firstName: null,
  loginDate: null,
  setAuth: (isAuthenticated, firstName, loginDate) =>
    set({ isAuthenticated, firstName, loginDate }),
  clearAuth: () => set({ isAuthenticated: false, firstName: null, loginDate: null }),
}));
