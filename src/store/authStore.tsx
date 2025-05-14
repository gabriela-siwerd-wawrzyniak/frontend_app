import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  id: number | null;
  isAuthenticated: boolean;
  firstName: string | null;
  loginDate: string | null;
  setAuth: (id: number, isAuthenticated: boolean, firstName: string, loginDate: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      id: null,
      isAuthenticated: false,
      firstName: null,
      loginDate: null,
      setAuth: (id, isAuthenticated, firstName, loginDate) =>
        set({ id, isAuthenticated, firstName, loginDate }),
      clearAuth: () => set({ id: null, isAuthenticated: false, firstName: null, loginDate: null }),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        id: state.id,
        isAuthenticated: state.isAuthenticated,
        firstName: state.firstName,
        loginDate: state.loginDate,
      }),
    }
  )
);
