import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Portfolio, Asset } from '@/types';

interface PortfolioState {
  // State
  portfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;

  // Actions
  setPortfolio: (portfolio: Portfolio) => void;
  updateAsset: (assetId: string, updates: Partial<Asset>) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (assetId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearPortfolio: () => void;
  
  // Computed getters
  getTotalValue: () => number;
  getTotalChangePercentage: () => number;
  getAssetAllocation: () => { symbol: string; allocation: number; value: number }[];
  getRiskLevel: () => 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export const usePortfolioStore = create<PortfolioState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    portfolio: null,
    isLoading: false,
    error: null,
    lastUpdated: null,

    // Actions
    setPortfolio: (portfolio: Portfolio) =>
      set({
        portfolio,
        error: null,
        lastUpdated: new Date().toISOString(),
      }),

    updateAsset: (assetId: string, updates: Partial<Asset>) =>
      set((state) => {
        if (!state.portfolio) return state;
        
        const updatedAssets = state.portfolio.assets.map((asset) =>
          asset.id === assetId ? { ...asset, ...updates } : asset
        );
        
        return {
          portfolio: {
            ...state.portfolio,
            assets: updatedAssets,
          },
          lastUpdated: new Date().toISOString(),
        };
      }),

    addAsset: (asset: Asset) =>
      set((state) => {
        if (!state.portfolio) return state;
        
        return {
          portfolio: {
            ...state.portfolio,
            assets: [...state.portfolio.assets, asset],
          },
          lastUpdated: new Date().toISOString(),
        };
      }),

    removeAsset: (assetId: string) =>
      set((state) => {
        if (!state.portfolio) return state;
        
        const updatedAssets = state.portfolio.assets.filter(
          (asset) => asset.id !== assetId
        );
        
        return {
          portfolio: {
            ...state.portfolio,
            assets: updatedAssets,
          },
          lastUpdated: new Date().toISOString(),
        };
      }),

    setLoading: (isLoading: boolean) => set({ isLoading }),

    setError: (error: string | null) => set({ error }),

    clearPortfolio: () =>
      set({
        portfolio: null,
        error: null,
        lastUpdated: null,
      }),

    // Computed getters
    getTotalValue: () => {
      const { portfolio } = get();
      return portfolio?.totalValue || 0;
    },

    getTotalChangePercentage: () => {
      const { portfolio } = get();
      return portfolio?.totalValueChangePercentage24h || 0;
    },

    getAssetAllocation: () => {
      const { portfolio } = get();
      if (!portfolio) return [];
      
      return portfolio.assets.map((asset) => ({
        symbol: asset.symbol,
        allocation: asset.allocation,
        value: asset.value,
      }));
    },

    getRiskLevel: () => {
      const { portfolio } = get();
      if (!portfolio) return 'LOW';
      
      const riskScore = portfolio.riskScore;
      if (riskScore >= 80) return 'CRITICAL';
      if (riskScore >= 60) return 'HIGH';
      if (riskScore >= 40) return 'MEDIUM';
      return 'LOW';
    },
  }))
);

// Utility hooks for specific portfolio data
export const usePortfolioValue = () => usePortfolioStore((state) => state.getTotalValue());
export const usePortfolioChange = () => usePortfolioStore((state) => state.getTotalChangePercentage());
export const usePortfolioAssets = () => usePortfolioStore((state) => state.portfolio?.assets || []);
export const usePortfolioRiskLevel = () => usePortfolioStore((state) => state.getRiskLevel()); 