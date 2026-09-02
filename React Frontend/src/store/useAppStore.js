import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const ROLES = {
  STUDENT: 'student',
  INDUSTRY: 'industry',
  MENTOR: 'mentor',
  ADMIN: 'admin',
}

export const useAppStore = create(
  persist(
    (set) => ({
      role: null,
      mockUser: null,
      isAuthenticated: false,

      setRole: (role) => set({ role, isAuthenticated: true }),
      setMockUser: (user) => set({ mockUser: user }),
      logout: () => set({ role: null, mockUser: null, isAuthenticated: false }),
    }),
    { name: 'aayush-portal-demo' },
  ),
)
