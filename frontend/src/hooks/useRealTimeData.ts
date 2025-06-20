'use client';

import { useState, useEffect } from 'react';

export interface RealTimePortfolio {
  totalValue: string;
  assets: PortfolioAsset[];
  performance24h: string;
  performance7d: string;
  allocation: { [key: string]: number };
  lastUpdate: string;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  price: string;
  change24h: string;
  allocation: number;
}

export interface RiskMetrics {
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  portfolioRisk: number;
  liquidityRisk: number;
  smartContractRisk: number;
  diversification: number;
}

export interface MarketData {
  [key: string]: {
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
  };
}

export function useRealTimeData() {
  // Estados locais sem dependências externas
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  
  const [portfolio] = useState<RealTimePortfolio>({
    totalValue: '45,234.67',
    lastUpdate: new Date().toISOString(),
    assets: [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: '12.45',
        value: '31,012.32',
        price: '2,487.52',
        change24h: '+2.34%',
        allocation: 68.6
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: '8,445.23',
        value: '8,445.23',
        price: '1.00',
        change24h: '+0.01%',
        allocation: 18.7
      },
      {
        symbol: 'LINK',
        name: 'Chainlink',
        balance: '245.67',
        value: '3,495.18',
        price: '14.23',
        change24h: '+3.45%',
        allocation: 7.7
      },
      {
        symbol: 'UNI',
        name: 'Uniswap',
        balance: '325.45',
        value: '2,567.80',
        price: '7.89',
        change24h: '-1.23%',
        allocation: 5.7
      }
    ],
    performance24h: '+3.42%',
    performance7d: '+12.8%',
    allocation: {
      ETH: 68.6,
      USDC: 18.7,
      LINK: 7.7,
      UNI: 5.7
    }
  });

  const [riskMetrics] = useState<RiskMetrics>({
    volatility: 45.3,
    sharpeRatio: 1.8,
    maxDrawdown: 23.4,
    portfolioRisk: 42,
    liquidityRisk: 15,
    smartContractRisk: 28,
    diversification: 75
  });

  const [marketData, setMarketData] = useState<MarketData>({
    ETH: { price: 2487.52, change24h: 2.34, volume24h: 15420000000, marketCap: 298900000000 },
    BTC: { price: 44856.12, change24h: -0.87, volume24h: 22180000000, marketCap: 883200000000 },
    USDC: { price: 1.00, change24h: 0.01, volume24h: 4520000000, marketCap: 33800000000 },
    LINK: { price: 14.23, change24h: 3.45, volume24h: 485000000, marketCap: 8560000000 },
    UNI: { price: 7.89, change24h: -1.23, volume24h: 185000000, marketCap: 4720000000 },
    AAVE: { price: 89.34, change24h: 1.87, volume24h: 125000000, marketCap: 1340000000 }
  });

  // Detectar se a carteira está conectada
  useEffect(() => {
    const checkWalletConnection = () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              setIsConnected(true);
              setAddress(accounts[0]);
            }
          })
          .catch(() => {
            setIsConnected(false);
            setAddress(undefined);
          });
      }
    };

    checkWalletConnection();

    // Escutar mudanças na conta
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
        } else {
          setIsConnected(false);
          setAddress(undefined);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  // Simulação de atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const volatility = symbol === 'USDC' ? 0.1 : 
                           symbol === 'BTC' ? 3.0 :
                           symbol === 'ETH' ? 4.0 : 5.0;
          
          const change = (Math.random() - 0.5) * volatility;
          updated[symbol] = {
            ...updated[symbol],
            price: Math.max(0.01, updated[symbol].price * (1 + change / 100)),
            change24h: updated[symbol].change24h + change * 0.1,
            volume24h: updated[symbol].volume24h * (1 + (Math.random() - 0.5) * 0.1)
          };
        });
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    console.log('Dados atualizados');
    // Simular delay de atualização
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const connectWallet = () => {
    setIsConnected(true);
    setAddress('0x1234567890123456789012345678901234567890');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(undefined);
  };

  return {
    portfolio,
    riskMetrics,
    marketData,
    isConnected,
    address,
    refreshData,
    connectWallet,
    disconnectWallet
  };
} 