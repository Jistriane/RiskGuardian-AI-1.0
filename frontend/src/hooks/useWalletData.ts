/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Hook para buscar dados reais da carteira conectada
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';
import { formatUnits } from 'viem';
import { useRealWalletTokens } from './useRealWalletTokens';

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  value: number;
  price: number;
  change24h: number;
  contractAddress?: string;
}

interface WalletData {
  address: string;
  chainId: number;
  totalValue: number;
  totalChange24h: number;
  balances: TokenBalance[];
  nativeBalance: {
    formatted: string;
    value: number;
    symbol: string;
  };
  lastUpdated: Date;
}

interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export function useWalletData() {
  const { address, isConnected, chainId } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketPrices, setMarketPrices] = useState<Record<string, MarketPrice>>({});

  const { data: nativeBalance, refetch: refetchNativeBalance } = useBalance({
    address: address,
    query: {
      refetchInterval: 10000, // Atualizar a cada 10 segundos
    }
  });

  // Hook para buscar tokens ERC20 reais
  const { tokens: realTokens, isLoading: tokensLoading, refreshTokens } = useRealWalletTokens();

  console.log('💼 useWalletData Debug:', {
    address,
    isConnected,
    chainId,
    nativeBalance: nativeBalance ? formatUnits(nativeBalance.value, nativeBalance.decimals) : '0',
    realTokens: realTokens.length,
    blockNumber: blockNumber?.toString()
  });

  const fetchMarketPrices = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,chainlink,uniswap,usd-coin,tether&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true'
      );

      if (!response.ok) {
        console.warn('⚠️ Failed to fetch market prices, using fallback');
        throw new Error('Failed to fetch prices');
      }

      const data = await response.json();
      console.log('📈 Market prices fetched:', data);
      
      const priceMap: Record<string, MarketPrice> = {
        'ETH': {
          symbol: 'ETH',
          price: data.ethereum?.usd || 2400,
          change24h: data.ethereum?.usd_24h_change || 0,
          volume24h: data.ethereum?.usd_24h_vol || 0,
        },
        'LINK': {
          symbol: 'LINK',
          price: data.chainlink?.usd || 15,
          change24h: data.chainlink?.usd_24h_change || 0,
          volume24h: data.chainlink?.usd_24h_vol || 0,
        },
        'USDC': {
          symbol: 'USDC',
          price: data['usd-coin']?.usd || 1,
          change24h: data['usd-coin']?.usd_24h_change || 0,
          volume24h: data['usd-coin']?.usd_24h_vol || 0,
        },
      };

      setMarketPrices(priceMap);
      return priceMap;
    } catch (error) {
      console.error('❌ Error fetching market prices:', error);
      // Preços de fallback
      const fallbackPrices = {
        'ETH': { symbol: 'ETH', price: 2400, change24h: 0, volume24h: 0 },
        'LINK': { symbol: 'LINK', price: 15, change24h: 0, volume24h: 0 },
        'USDC': { symbol: 'USDC', price: 1, change24h: 0, volume24h: 0 },
      };
      setMarketPrices(fallbackPrices);
      return fallbackPrices;
    }
  }, []);

  const updateWalletData = useCallback(async () => {
    if (!address || !isConnected || !chainId) {
      console.log('⏭️ Skipping wallet update - not connected');
      setWalletData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 Updating wallet data...');
      
      const prices = await fetchMarketPrices();

      const nativeSymbol = 'ETH';
      const nativePrice = prices[nativeSymbol]?.price || 2400;
      const nativeBalanceFormatted = nativeBalance ? formatUnits(nativeBalance.value, nativeBalance.decimals) : '0';
      const nativeValue = parseFloat(nativeBalanceFormatted) * nativePrice;

      console.log('🏦 Native balance:', {
        formatted: nativeBalanceFormatted,
        value: nativeValue,
        price: nativePrice
      });

      // Usar tokens reais da carteira conectada
      const walletTokens: TokenBalance[] = realTokens.map(token => ({
        symbol: token.symbol,
        name: token.name,
        balance: token.balance,
        decimals: token.decimals,
        value: token.value,
        price: token.price,
        change24h: token.change24h,
        contractAddress: token.address,
      }));

      console.log('🪙 Wallet tokens:', walletTokens);

      const totalTokenValue = walletTokens.reduce((sum, token) => sum + token.value, 0);
      const totalValue = nativeValue + totalTokenValue;

      console.log('💰 Portfolio values:', {
        nativeValue,
        totalTokenValue,
        totalValue
      });

      const totalChange24h = totalValue > 0 
        ? ((nativeValue * (prices[nativeSymbol]?.change24h || 0)) + 
           walletTokens.reduce((sum, token) => sum + (token.value * token.change24h / 100), 0)) / totalValue
        : 0;

      const newWalletData: WalletData = {
        address,
        chainId,
        totalValue,
        totalChange24h,
        balances: walletTokens,
        nativeBalance: {
          formatted: nativeBalanceFormatted,
          value: nativeValue,
          symbol: nativeSymbol,
        },
        lastUpdated: new Date(),
      };

      console.log('✅ Wallet data updated:', newWalletData);
      setWalletData(newWalletData);
    } catch (error) {
      console.error('❌ Error updating wallet data:', error);
      setError(error instanceof Error ? error.message : 'Failed to update wallet data');
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, chainId, nativeBalance, fetchMarketPrices, realTokens]);

  // Atualizar dados inicialmente
  useEffect(() => {
    updateWalletData();
  }, [updateWalletData]);

  // Atualizar dados periodicamente para tempo real
  useEffect(() => {
    if (!isConnected) return;

    console.log('⏰ Setting up real-time updates...');
    const interval = setInterval(() => {
      console.log('🔄 Periodic update triggered');
      updateWalletData();
    }, 10000); // Atualizar a cada 10 segundos para tempo real

    return () => {
      console.log('⏹️ Clearing real-time updates');
      clearInterval(interval);
    };
  }, [isConnected, updateWalletData]);

  // Atualizar quando há novo bloco
  useEffect(() => {
    if (blockNumber && isConnected) {
      console.log('🧱 New block detected, updating wallet data...', blockNumber.toString());
      updateWalletData();
    }
  }, [blockNumber, isConnected, updateWalletData]);

  const refresh = useCallback(() => {
    console.log('🔄 Manual refresh triggered');
    refetchNativeBalance();
    refreshTokens();
    updateWalletData();
  }, [refetchNativeBalance, refreshTokens, updateWalletData]);

  return {
    walletData,
    isLoading: isLoading || tokensLoading,
    error,
    marketPrices,
    refresh,
    lastUpdated: walletData?.lastUpdated,
  };
} 