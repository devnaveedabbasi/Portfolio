import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  adminEmail: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_EMAIL = "naveedabbasi8651@gmail.com";
const ADMIN_PASSWORD = "asdasdasd";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      adminEmail: ADMIN_EMAIL,
      login: (email: string, password: string) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isLoggedIn: false });
      },
    }),
    {
      name: "admin-auth",
    },
  ),
);
