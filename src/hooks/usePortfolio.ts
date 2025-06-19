'use client'

import { useCallback, useEffect } from 'react'
import { usePortfolioStore } from '@/stores/portfolio.store'
import { useAuthStore } from '@/stores/auth.store'
import { CreatePortfolioRequest } from '@/types/api'

export function usePortfolio() {
  const { isAuthenticated } = useAuthStore()
  
  const {
    portfolios,
    selectedPortfolio,
    portfolioRisk,
    realtimeData,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    loadPortfolios,
    createPortfolio: storeCreatePortfolio,
    updatePortfolio: storeUpdatePortfolio,
    deletePortfolio: storeDeletePortfolio,
    selectPortfolio,
    loadPortfolioRisk,
    subscribeToRealtimeUpdates,
    unsubscribeFromRealtimeUpdates,
    clearError
  } = usePortfolioStore()

  // Auto-load portfolios when authenticated
  useEffect(() => {
    if (isAuthenticated && portfolios.length === 0 && !isLoading) {
      loadPortfolios()
    }
  }, [isAuthenticated, portfolios.length, isLoading, loadPortfolios])

  // Wrapper functions with better error handling
  const createPortfolio = useCallback(async (data: CreatePortfolioRequest) => {
    if (!isAuthenticated) {
      console.warn('⚠️ Tentativa de criar portfólio sem estar autenticado')
      return null
    }

    const result = await storeCreatePortfolio(data)
    if (result) {
      // Auto-select the new portfolio
      selectPortfolio(result)
    }
    return result
  }, [isAuthenticated, storeCreatePortfolio, selectPortfolio])

  const updatePortfolio = useCallback(async (id: string, data: Partial<CreatePortfolioRequest>) => {
    if (!isAuthenticated) {
      console.warn('⚠️ Tentativa de atualizar portfólio sem estar autenticado')
      return null
    }

    return await storeUpdatePortfolio(id, data)
  }, [isAuthenticated, storeUpdatePortfolio])

  const deletePortfolio = useCallback(async (id: string) => {
    if (!isAuthenticated) {
      console.warn('⚠️ Tentativa de deletar portfólio sem estar autenticado')
      return false
    }

    return await storeDeletePortfolio(id)
  }, [isAuthenticated, storeDeletePortfolio])

  const refreshPortfolios = useCallback(async () => {
    if (!isAuthenticated) return
    await loadPortfolios()
  }, [isAuthenticated, loadPortfolios])

  const refreshPortfolioRisk = useCallback(async (portfolioId: string) => {
    if (!isAuthenticated) return
    await loadPortfolioRisk(portfolioId)
  }, [isAuthenticated, loadPortfolioRisk])

  // Get realtime data for specific portfolio
  const getRealtimeData = useCallback((portfolioId: string) => {
    return realtimeData.get(portfolioId)
  }, [realtimeData])

  // Get realtime data for selected portfolio
  const selectedPortfolioRealtimeData = selectedPortfolio 
    ? getRealtimeData(selectedPortfolio.id)
    : null

  // Portfolio stats
  const portfolioStats = {
    total: portfolios.length,
    totalValue: portfolios.reduce((sum, p) => sum + parseFloat(p.totalValue || '0'), 0),
    averageRiskScore: portfolios.length > 0 
      ? portfolios.reduce((sum, p) => sum + p.riskScore, 0) / portfolios.length 
      : 0,
    highRiskCount: portfolios.filter(p => p.riskScore > 7000).length
  }

  // Helper to find portfolio by ID
  const findPortfolioById = useCallback((id: string) => {
    return portfolios.find(p => p.id === id)
  }, [portfolios])

  // Check if a portfolio is selected
  const isPortfolioSelected = (portfolioId: string) => {
    return selectedPortfolio?.id === portfolioId
  }

  return {
    // Data
    portfolios,
    selectedPortfolio,
    portfolioRisk,
    selectedPortfolioRealtimeData,
    portfolioStats,

    // Loading states
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,

    // Actions
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    selectPortfolio,
    refreshPortfolios,
    refreshPortfolioRisk,
    clearError,

    // Realtime
    subscribeToRealtimeUpdates,
    unsubscribeFromRealtimeUpdates,
    getRealtimeData,

    // Helpers
    findPortfolioById,
    isPortfolioSelected,

    // Authentication check
    isAuthenticated
  }
} 