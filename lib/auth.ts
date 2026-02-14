// Authentication utilities and state management
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  userId: string
  email: string
  name: string
  role: 'owner' | 'walker'
  subscription?: {
    plan: string
    status: string
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: 'owner' | 'walker') => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // TODO: Integrate with AWS Cognito or Auth0
        // For now, mock authentication
        const mockUser: User = {
          userId: 'user_' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'owner',
        }
        set({ user: mockUser, isAuthenticated: true })
      },

      signup: async (name: string, email: string, password: string, role: 'owner' | 'walker') => {
        // TODO: Integrate with AWS Cognito or Auth0
        // For now, mock signup
        const mockUser: User = {
          userId: 'user_' + Date.now(),
          email,
          name,
          role,
        }
        set({ user: mockUser, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Route protection hook
export function useRequireAuth() {
  const { isAuthenticated, user } = useAuthStore()
  return { isAuthenticated, user, requireAuth: !isAuthenticated }
}
