import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { Portfolio, CreatePortfolioRequest, PortfolioRisk, RealtimePortfolioData } from '@/types/api'
import { apiService } from '@/services/api.service'
import { webSocketService } from '@/services/websocket.service'
import toast from 'react-hot-toast'

interface PortfolioState {
  // Estado
  portfolios: Portfolio[]
  selectedPortfolio: Portfolio | null
  portfolioRisk: PortfolioRisk | null
  realtimeData: Map<string, RealtimePortfolioData>
  
  // Estados de carregamento
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  
  // Erro
  error: string | null

  // Ações
  loadPortfolios: () => Promise<void>
  createPortfolio: (data: CreatePortfolioRequest) => Promise<Portfolio | null>
  updatePortfolio: (id: string, data: Partial<CreatePortfolioRequest>) => Promise<Portfolio | null>
  deletePortfolio: (id: string) => Promise<boolean>
  selectPortfolio: (portfolio: Portfolio | null) => void
  loadPortfolioRisk: (portfolioId: string) => Promise<void>
  subscribeToRealtimeUpdates: (portfolioId: string) => void
  unsubscribeFromRealtimeUpdates: (portfolioId: string) => void
  updateRealtimeData: (data: RealtimePortfolioData) => void
  clearError: () => void
}

export const usePortfolioStore = create<PortfolioState>()(
  subscribeWithSelector((set, get) => ({
    // Estado inicial
    portfolios: [],
    selectedPortfolio: null,
    portfolioRisk: null,
    realtimeData: new Map(),
    
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    
    error: null,

    // Ações
    loadPortfolios: async () => {
      try {
        set({ isLoading: true, error: null })

        const portfolios = await apiService.getPortfolios()

        set({ 
          portfolios,
          isLoading: false 
        })

        console.log(`✅ Carregados ${portfolios.length} portfólios`)

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar portfólios'
        set({ 
          isLoading: false, 
          error: errorMessage,
          portfolios: []
        })
        console.error('❌ Erro ao carregar portfólios:', error)
        toast.error(errorMessage)
      }
    },

    createPortfolio: async (data: CreatePortfolioRequest) => {
      try {
        set({ isCreating: true, error: null })

        const newPortfolio = await apiService.createPortfolio(data)

        set(state => ({ 
          portfolios: [...state.portfolios, newPortfolio],
          isCreating: false 
        }))

        toast.success(`Portfólio "${newPortfolio.name}" criado com sucesso`)
        console.log('✅ Portfólio criado:', newPortfolio)
        
        return newPortfolio

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao criar portfólio'
        set({ 
          isCreating: false, 
          error: errorMessage 
        })
        console.error('❌ Erro ao criar portfólio:', error)
        toast.error(errorMessage)
        return null
      }
    },

    updatePortfolio: async (id: string, data: Partial<CreatePortfolioRequest>) => {
      try {
        set({ isUpdating: true, error: null })

        const updatedPortfolio = await apiService.updatePortfolio(id, data)

        set(state => ({ 
          portfolios: state.portfolios.map(p => 
            p.id === id ? updatedPortfolio : p
          ),
          selectedPortfolio: state.selectedPortfolio?.id === id 
            ? updatedPortfolio 
            : state.selectedPortfolio,
          isUpdating: false 
        }))

        toast.success(`Portfólio "${updatedPortfolio.name}" atualizado`)
        console.log('✅ Portfólio atualizado:', updatedPortfolio)
        
        return updatedPortfolio

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar portfólio'
        set({ 
          isUpdating: false, 
          error: errorMessage 
        })
        console.error('❌ Erro ao atualizar portfólio:', error)
        toast.error(errorMessage)
        return null
      }
    },

    deletePortfolio: async (id: string) => {
      try {
        set({ isDeleting: true, error: null })

        await apiService.deletePortfolio(id)

        set(state => ({ 
          portfolios: state.portfolios.filter(p => p.id !== id),
          selectedPortfolio: state.selectedPortfolio?.id === id 
            ? null 
            : state.selectedPortfolio,
          isDeleting: false 
        }))

        // Unsubscribe from realtime updates
        get().unsubscribeFromRealtimeUpdates(id)

        toast.success('Portfólio removido com sucesso')
        console.log('✅ Portfólio removido:', id)
        
        return true

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro ao remover portfólio'
        set({ 
          isDeleting: false, 
          error: errorMessage 
        })
        console.error('❌ Erro ao remover portfólio:', error)
        toast.error(errorMessage)
        return false
      }
    },

    selectPortfolio: (portfolio: Portfolio | null) => {
      const currentSelected = get().selectedPortfolio

      // Unsubscribe from previous portfolio updates
      if (currentSelected) {
        get().unsubscribeFromRealtimeUpdates(currentSelected.id)
      }

      set({ 
        selectedPortfolio: portfolio,
        portfolioRisk: null // Clear previous risk data
      })

      // Subscribe to new portfolio updates
      if (portfolio) {
        get().subscribeToRealtimeUpdates(portfolio.id)
        get().loadPortfolioRisk(portfolio.id)
      }

      console.log('📊 Portfólio selecionado:', portfolio?.name || 'None')
    },

    loadPortfolioRisk: async (portfolioId: string) => {
      try {
        const risk = await apiService.getPortfolioRisk(portfolioId)
        
        set({ portfolioRisk: risk })
        console.log('✅ Risco do portfólio carregado:', risk)

      } catch (error) {
        console.error('❌ Erro ao carregar risco do portfólio:', error)
        const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar análise de risco'
        toast.error(errorMessage)
      }
    },

    subscribeToRealtimeUpdates: (portfolioId: string) => {
      try {
        console.log(`📡 Inscrevendo-se em atualizações do portfólio: ${portfolioId}`)
        
        // Subscribe to portfolio updates
        if (webSocketService?.onPortfolioUpdate) {
          webSocketService.onPortfolioUpdate((data: RealtimePortfolioData) => {
            if (data.portfolioId === portfolioId) {
              get().updateRealtimeData(data)
            }
          })

          // Subscribe to specific portfolio events
          if (webSocketService.subscribeToPortfolio) {
            webSocketService.subscribeToPortfolio(portfolioId)
          }
        }

      } catch (error) {
        console.error('❌ Erro ao inscrever-se em atualizações:', error)
      }
    },

    unsubscribeFromRealtimeUpdates: (portfolioId: string) => {
      try {
        console.log(`📡 Cancelando inscrição do portfólio: ${portfolioId}`)
        
        if (webSocketService?.unsubscribeFromPortfolio) {
          webSocketService.unsubscribeFromPortfolio(portfolioId)
        }

        // Remove realtime data from store
        set(state => {
          const newRealtimeData = new Map(state.realtimeData)
          newRealtimeData.delete(portfolioId)
          return { realtimeData: newRealtimeData }
        })

      } catch (error) {
        console.error('❌ Erro ao cancelar inscrição:', error)
      }
    },

    updateRealtimeData: (data: RealtimePortfolioData) => {
      set(state => {
        const newRealtimeData = new Map(state.realtimeData)
        newRealtimeData.set(data.portfolioId, data)
        return { realtimeData: newRealtimeData }
      })

      // Update selected portfolio if it matches
      const { selectedPortfolio } = get()
      if (selectedPortfolio?.id === data.portfolioId) {
        set(state => ({
          selectedPortfolio: {
            ...state.selectedPortfolio!,
            totalValue: data.totalValue.toString(),
            riskScore: data.riskMetrics.score
          }
        }))
      }

      console.log(`📊 Dados em tempo real atualizados para portfólio: ${data.portfolioId}`)
    },

    clearError: () => {
      set({ error: null })
    }
  }))
)

// Setup WebSocket handlers quando o store for inicializado
if (typeof window !== 'undefined' && webSocketService) {
  try {
    webSocketService.onPortfolioUpdate?.((data: RealtimePortfolioData) => {
      usePortfolioStore.getState().updateRealtimeData(data)
    })
  } catch (error) {
    console.warn('⚠️ WebSocket não disponível para portfolio store')
  }
} 