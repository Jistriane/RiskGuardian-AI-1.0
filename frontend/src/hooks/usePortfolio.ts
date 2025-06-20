import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Portfolio, Asset, ApiResponse } from '@/types';
import { portfolioApi } from '@/services/api.service';
import { toast } from 'sonner';

export const usePortfolio = (walletAddress?: string) => {
  const queryClient = useQueryClient();

  // Fetch portfolio data
  const {
    data: portfolio,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['portfolio', walletAddress],
    queryFn: () => portfolioApi.getPortfolio(walletAddress!),
    enabled: !!walletAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
  });

  // Refresh portfolio manually
  const refreshPortfolio = useMutation({
    mutationFn: () => portfolioApi.refreshPortfolio(walletAddress!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', walletAddress] });
      toast.success('Portfolio refreshed successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to refresh portfolio: ${error.message}`);
    },
  });

  // Add asset to portfolio tracking
  const addAsset = useMutation({
    mutationFn: (asset: Partial<Asset>) => portfolioApi.addAsset(walletAddress!, asset),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', walletAddress] });
      toast.success('Asset added to portfolio');
    },
    onError: (error: any) => {
      toast.error(`Failed to add asset: ${error.message}`);
    },
  });

  // Remove asset from portfolio tracking
  const removeAsset = useMutation({
    mutationFn: (assetId: string) => portfolioApi.removeAsset(walletAddress!, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', walletAddress] });
      toast.success('Asset removed from portfolio');
    },
    onError: (error: any) => {
      toast.error(`Failed to remove asset: ${error.message}`);
    },
  });

  // Calculate portfolio metrics
  const portfolioMetrics = portfolio ? {
    totalValue: portfolio.totalValue,
    totalValueChange24h: portfolio.totalValueChange24h,
    totalValueChangePercentage24h: portfolio.totalValueChangePercentage24h,
    totalPnl: portfolio.totalPnl,
    totalPnlPercentage: portfolio.totalPnlPercentage,
    riskScore: portfolio.riskScore,
    assetCount: portfolio.assets.length,
    topAsset: portfolio.assets.reduce((prev: Asset, current: Asset) => 
      (prev.value > current.value) ? prev : current, portfolio.assets[0]
    ),
    portfolioAllocation: portfolio.assets.map((asset: Asset) => ({
      symbol: asset.symbol,
      allocation: asset.allocation,
      value: asset.value
    }))
  } : null;

  return {
    portfolio,
    portfolioMetrics,
    isLoading,
    error,
    refetch,
    refreshPortfolio: {
      mutate: refreshPortfolio.mutate,
      isLoading: refreshPortfolio.isPending,
    },
    addAsset: {
      mutate: addAsset.mutate,
      isLoading: addAsset.isPending,
    },
    removeAsset: {
      mutate: removeAsset.mutate,
      isLoading: removeAsset.isPending,
    },
  };
}; 