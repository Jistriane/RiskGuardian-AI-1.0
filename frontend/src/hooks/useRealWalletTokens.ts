/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Hook para buscar tokens ERC20 reais da carteira conectada
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useReadContracts, useChainId } from 'wagmi';
import { formatUnits } from 'viem';

// Contratos ERC20 por rede - Endereços corretos da Sepolia
const TOKENS_BY_CHAIN: Record<number, Array<{
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  coingeckoId: string;
}>> = {
  // Sepolia Testnet
  11155111: [
    {
      symbol: 'LINK',
      name: 'Chainlink Token',
      address: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // LINK oficial Sepolia
      decimals: 18,
      coingeckoId: 'chainlink'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // USDC Sepolia
      decimals: 6,
      coingeckoId: 'usd-coin'
    },
    {
      symbol: 'WETH',
      name: 'Wrapped Ether',
      address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // WETH Sepolia
      decimals: 18,
      coingeckoId: 'ethereum'
    }
  ],
  // Ethereum Mainnet
  1: [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0xA0b86a33E6C17536045d6b77D9a0d6A1A67E9e9e',
      decimals: 6,
      coingeckoId: 'usd-coin'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink Token',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      decimals: 18,
      coingeckoId: 'chainlink'
    }
  ]
};

// ABI mínimo para ERC20
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
] as const;

interface RealTokenBalance {
  symbol: string;
  name: string;
  address: string;
  balance: string;
  decimals: number;
  value: number;
  price: number;
  change24h: number;
}

export function useRealWalletTokens() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [tokens, setTokens] = useState<RealTokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obter tokens para a rede atual
  const currentTokens = TOKENS_BY_CHAIN[chainId] || [];

  console.log('🔗 useRealWalletTokens Debug:', {
    address,
    isConnected,
    chainId,
    currentTokens: currentTokens.length,
    tokensConfig: currentTokens
  });

  // Preparar contratos para leitura
  const contracts = currentTokens.map(token => ({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
  }));

  const { data: contractResults, refetch, isLoading: contractsLoading } = useReadContracts({
    contracts,
    query: {
      enabled: !!address && isConnected && currentTokens.length > 0,
      refetchInterval: 10000, // Atualizar a cada 10 segundos para tempo real
    },
  });

  // Buscar preços dos tokens
  const fetchTokenPrices = useCallback(async () => {
    if (currentTokens.length === 0) return {};

    try {
      const ids = currentTokens.map(token => token.coingeckoId).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );

      if (!response.ok) {
        console.warn('⚠️ Failed to fetch token prices, using fallback');
        // Preços de fallback
        return {
          'chainlink': { usd: 15, usd_24h_change: 0 },
          'usd-coin': { usd: 1, usd_24h_change: 0 },
          'ethereum': { usd: 2400, usd_24h_change: 0 }
        };
      }

      const data = await response.json();
      console.log('💰 Token prices fetched:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching token prices:', error);
      return {
        'chainlink': { usd: 15, usd_24h_change: 0 },
        'usd-coin': { usd: 1, usd_24h_change: 0 },
        'ethereum': { usd: 2400, usd_24h_change: 0 }
      };
    }
  }, [currentTokens]);

  // Processar dados dos contratos
  const processTokenData = useCallback(async () => {
    if (!address || !isConnected || !contractResults || currentTokens.length === 0) {
      console.log('⏭️ Skipping token processing:', { address, isConnected, contractResults: !!contractResults, currentTokens: currentTokens.length });
      setTokens([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 Processing token data...', { contractResults: contractResults.length });
      
      const prices = await fetchTokenPrices();
      const realTokens: RealTokenBalance[] = [];

      // Processar cada token
      currentTokens.forEach((tokenConfig, index) => {
        const balanceResult = contractResults[index];

        console.log(`📊 Token ${tokenConfig.symbol}:`, {
          status: balanceResult?.status,
          result: balanceResult?.result?.toString(),
          error: balanceResult?.error
        });

        if (balanceResult?.status === 'success' && balanceResult.result) {
          const balance = balanceResult.result as bigint;
          const formattedBalance = formatUnits(balance, tokenConfig.decimals);
          const numericBalance = parseFloat(formattedBalance);

          // Incluir todos os tokens, mesmo com balance 0 para debug
          const priceData = prices[tokenConfig.coingeckoId];
          const price = priceData?.usd || 0;
          const change24h = priceData?.usd_24h_change || 0;

          const tokenData = {
            symbol: tokenConfig.symbol,
            name: tokenConfig.name,
            address: tokenConfig.address,
            balance: formattedBalance,
            decimals: tokenConfig.decimals,
            value: numericBalance * price,
            price,
            change24h,
          };

          console.log(`✅ Token ${tokenConfig.symbol} processed:`, tokenData);

          // Só adicionar se tem balance > 0 OU estamos em debug
          if (numericBalance > 0 || process.env.NODE_ENV === 'development') {
            realTokens.push(tokenData);
          }
        } else if (balanceResult?.error) {
          console.error(`❌ Error reading ${tokenConfig.symbol}:`, balanceResult.error);
        }
      });

      console.log('🎯 Final tokens:', realTokens);
      setTokens(realTokens);
    } catch (error) {
      console.error('❌ Error processing token data:', error);
      setError(error instanceof Error ? error.message : 'Failed to process token data');
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, contractResults, currentTokens, fetchTokenPrices]);

  // Atualizar dados quando necessário
  useEffect(() => {
    processTokenData();
  }, [processTokenData]);

  // Refresh manual
  const refreshTokens = useCallback(() => {
    console.log('🔄 Manual refresh tokens...');
    refetch();
    processTokenData();
  }, [refetch, processTokenData]);

  return {
    tokens,
    isLoading: isLoading || contractsLoading,
    error,
    refreshTokens,
    hasTokens: tokens.length > 0,
    supportedTokens: currentTokens, // Para debug
  };
}