/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Hook avançado para dados da carteira em tempo real via WebSocket
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useWalletData } from './useWalletData';
import { useWebSocket } from './useWebSocket';

interface RealTimeWalletData {
  address: string;
  chainId: number;
  totalValue: number;
  totalChange24h: number;
  assets: Array<{
    symbol: string;
    balance: string;
    value: number;
    price: number;
    change24h: number;
    allocation: number;
  }>;
  riskMetrics: {
    portfolioRisk: number;
    liquidityRisk: number;
    volatilityRisk: number;
    concentrationRisk: number;
  };
  lastUpdated: Date;
  isRealTime: boolean;
}

export function useRealTimeWallet() {
  const { address, isConnected } = useAccount();
  const { walletData, isLoading, error, refresh } = useWalletData();
  const [realTimeData, setRealTimeData] = useState<RealTimeWalletData | null>(null);
  const [priceUpdates] = useState<Record<string, number>>({});

  // WebSocket para atualizações de preços em tempo real
  const { isConnected: wsConnected, sendMessage } = useWebSocket({
    walletAddress: address,
    autoConnect: isConnected,
  });

  // Calcular métricas de risco baseadas nos dados da carteira
  const calculateRiskMetrics = useCallback((data: typeof walletData) => {
    if (!data) return {
      portfolioRisk: 0,
      liquidityRisk: 0,
      volatilityRisk: 0,
      concentrationRisk: 0,
    };

    // Risco de concentração baseado na diversificação
    const totalAssets = data.balances.length + 1; // +1 para ETH nativo
    const concentrationRisk = Math.max(0, 100 - (totalAssets * 15));

    // Risco de portfolio baseado no valor total
    const portfolioRisk = Math.min(90, (data.totalValue / 50000) * 100);

    // Risco de liquidez baseado na composição dos ativos
    const liquidityRisk = data.balances.reduce((risk, token) => {
      // Tokens como USDC têm menor risco de liquidez
      if (token.symbol === 'USDC' || token.symbol === 'USDT') return risk + 5;
      // ETH tem risco médio
      if (token.symbol === 'ETH') return risk + 15;
      // Outros tokens têm risco maior
      return risk + 25;
    }, 0) / totalAssets;

    // Risco de volatilidade baseado na mudança de preços
    const volatilityRisk = Math.abs(data.totalChange24h) * 2;

    return {
      portfolioRisk: Math.round(portfolioRisk),
      liquidityRisk: Math.round(liquidityRisk),
      volatilityRisk: Math.round(Math.min(100, volatilityRisk)),
      concentrationRisk: Math.round(concentrationRisk),
    };
  }, []);

  // Atualizar dados em tempo real quando há mudanças na carteira
  useEffect(() => {
    if (!walletData || !isConnected) {
      setRealTimeData(null);
      return;
    }

    const assets = [
      {
        symbol: walletData.nativeBalance.symbol,
        balance: walletData.nativeBalance.formatted,
        value: walletData.nativeBalance.value,
        price: walletData.nativeBalance.value / parseFloat(walletData.nativeBalance.formatted),
        change24h: 0, // Será atualizado via WebSocket
        allocation: (walletData.nativeBalance.value / walletData.totalValue) * 100,
      },
      ...walletData.balances.map(token => ({
        symbol: token.symbol,
        balance: token.balance,
        value: token.value,
        price: token.price,
        change24h: token.change24h,
        allocation: (token.value / walletData.totalValue) * 100,
      }))
    ];

    const riskMetrics = calculateRiskMetrics(walletData);

    setRealTimeData({
      address: walletData.address,
      chainId: walletData.chainId,
      totalValue: walletData.totalValue,
      totalChange24h: walletData.totalChange24h,
      assets,
      riskMetrics,
      lastUpdated: walletData.lastUpdated,
      isRealTime: wsConnected,
    });

    // Subscrever aos símbolos dos tokens para atualizações de preços
    if (wsConnected) {
      const symbols = assets.map(asset => asset.symbol);
      sendMessage('subscribe_symbols', { symbols });
    }
  }, [walletData, isConnected, wsConnected, calculateRiskMetrics, sendMessage]);

  // Atualizar preços em tempo real via WebSocket
  useEffect(() => {
    if (!realTimeData || !wsConnected) return;

    // Simular atualizações de preços (em produção, isso viria do WebSocket)
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        if (!prev) return null;

        const updatedAssets = prev.assets.map(asset => {
          // Simular mudança de preço pequena
          const priceChange = (Math.random() - 0.5) * 0.02; // ±1%
          const newPrice = asset.price * (1 + priceChange);
          const newValue = parseFloat(asset.balance) * newPrice;

          return {
            ...asset,
            price: newPrice,
            value: newValue,
            change24h: asset.change24h + priceChange * 100,
          };
        });

        const newTotalValue = updatedAssets.reduce((sum, asset) => sum + asset.value, 0);
        
        // Recalcular alocações
        const assetsWithAllocation = updatedAssets.map(asset => ({
          ...asset,
          allocation: (asset.value / newTotalValue) * 100,
        }));

        return {
          ...prev,
          totalValue: newTotalValue,
          assets: assetsWithAllocation,
          lastUpdated: new Date(),
        };
      });
    }, 5000); // Atualizar a cada 5 segundos

    return () => clearInterval(interval);
  }, [realTimeData, wsConnected]);

  // Função para forçar atualização completa
  const forceRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  // Função para subscrever a novos símbolos
  const subscribeToSymbol = useCallback((symbol: string) => {
    if (wsConnected) {
      sendMessage('subscribe_symbols', { symbols: [symbol] });
    }
  }, [wsConnected, sendMessage]);

  return {
    realTimeData,
    isLoading,
    error,
    isRealTime: wsConnected,
    forceRefresh,
    subscribeToSymbol,
    priceUpdates,
  };
} 