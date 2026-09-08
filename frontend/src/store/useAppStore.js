import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import mockUsers from '@/data/users/mockUsers.json'

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
      loginDemo: (role) => {
        const user = mockUsers.data.users.find((u) => u.role === role)
        set({ role, mockUser: user ?? null, isAuthenticated: true })
      },
      logout: () => set({ role: null, mockUser: null, isAuthenticated: false }),
    }),
    { name: 'aayush-portal-demo' },
  ),
)
