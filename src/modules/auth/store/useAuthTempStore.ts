import { create } from 'zustand';

interface AuthTempStore {
  password: string | null;
  setPassword: (pass: string | null) => void;
}

export const useAuthTempStore = create<AuthTempStore>((set) => ({
  password: null,
  setPassword: (password) => set({ password }),
}));
