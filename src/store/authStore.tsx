import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  firstName: string | null;
  loginDate: string | null;
  setAuth: (isAuthenticated: boolean, firstName: string, loginDate: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isAuthenticated: false,
      firstName: null,
      loginDate: null,
      setAuth: (isAuthenticated, firstName, loginDate) =>
        set({ isAuthenticated, firstName, loginDate }),
      clearAuth: () => set({ isAuthenticated: false, firstName: null, loginDate: null }),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        firstName: state.firstName,
        loginDate: state.loginDate,
      }),
    }
  )
);
