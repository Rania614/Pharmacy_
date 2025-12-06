import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null, // 'customer' or 'admin'
      isAuthenticated: false,

      login: (userData, token, role = 'customer') => {
        set({
          user: userData,
          token: token,
          role: role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      isAdmin: () => {
        return get().role === 'admin';
      },

      isCustomer: () => {
        return get().role === 'customer';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
