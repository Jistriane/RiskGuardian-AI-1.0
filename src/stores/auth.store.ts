import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthLoginResponse } from '@/types/api'
import { apiService } from '@/services/api.service'
import toast from 'react-hot-toast'

interface User {
  id: string
  address: string
  createdAt: string
}

interface AuthState {
  // Estado
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  token: string | null
  error: string | null

  // Ações
  login: (address: string, signature: string, message: string) => Promise<boolean>
  logout: () => Promise<void>
  getNonce: (address: string) => Promise<string>
  loadProfile: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      error: null,

      // Ações
      getNonce: async (address: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await apiService.getNonce(address)
          
          set({ isLoading: false })
          return response.message

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao obter nonce'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          toast.error(errorMessage)
          throw error
        }
      },

      login: async (address: string, signature: string, message: string) => {
        try {
          set({ isLoading: true, error: null })

          const response = await apiService.login(address, signature, message)

          set({
            isAuthenticated: true,
            isLoading: false,
            user: response.user,
            token: response.token,
            error: null
          })

          toast.success(`Bem-vindo! Conectado como ${address.slice(0, 6)}...${address.slice(-4)}`)
          return true

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro no login'
          set({ 
            isAuthenticated: false,
            isLoading: false, 
            user: null,
            token: null,
            error: errorMessage 
          })
          toast.error(errorMessage)
          return false
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true })

          await apiService.logout()

          set({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
            error: null
          })

          toast.success('Logout realizado com sucesso')

        } catch (error) {
          console.error('Erro no logout:', error)
          // Mesmo com erro, fazer logout local
          set({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            token: null,
            error: null
          })
        }
      },

      loadProfile: async () => {
        try {
          const { token } = get()
          if (!token) return

          set({ isLoading: true, error: null })

          const profile = await apiService.getProfile()

          set({
            user: profile,
            isLoading: false
          })

        } catch (error) {
          console.error('Erro ao carregar perfil:', error)
          
          // Se o token for inválido, fazer logout
          if (error instanceof Error && error.message.includes('401')) {
            get().logout()
          } else {
            set({ 
              isLoading: false,
              error: 'Erro ao carregar perfil'
            })
          }
        }
      },

      clearError: () => {
        set({ error: null })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'riskguardian-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      }),
      onRehydrateStorage: () => (state) => {
        // Verificar se o token ainda é válido quando a app recarregar
        if (state?.token && state?.isAuthenticated) {
          state.loadProfile()
        }
      }
    }
  )
) 