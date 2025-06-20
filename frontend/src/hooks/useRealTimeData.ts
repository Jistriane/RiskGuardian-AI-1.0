import { useState, useEffect } from 'react';

interface PortfolioAsset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  change24h: number;
  allocation: number;
}

interface RiskMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface RealTimeData {
  prices: Record<string, number>;
  marketData: {
    totalVolume: number;
    marketCap: number;
    dominance: Record<string, number>;
  };
  lending: {
    totalValueLocked: number;
    totalBorrowed: number;
    avgAPY: number;
    avgAPR: number;
  };
  portfolio: {
    totalValue: number;
    totalPnL: number;
    pnlPercentage: number;
    assets: PortfolioAsset[];
  };
  riskMetrics: RiskMetric[];
  lastUpdate: Date;
  address?: string;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = () => {
      const portfolioAssets: PortfolioAsset[] = [
        {
          symbol: 'ETH',
          name: 'Ethereum',
          amount: 2.5,
          price: 2350.45,
          value: 5876.13,
          change24h: 3.2,
          allocation: 65.4
        },
        {
          symbol: 'USDC',
          name: 'USD Coin',
          amount: 1500,
          price: 1.00,
          value: 1500.00,
          change24h: 0.0,
          allocation: 16.7
        },
        {
          symbol: 'LINK',
          name: 'Chainlink',
          amount: 100,
          price: 14.32,
          value: 1432.00,
          change24h: -1.8,
          allocation: 15.9
        },
        {
          symbol: 'AAVE',
          name: 'Aave',
          amount: 2,
          price: 89.45,
          value: 178.90,
          change24h: 2.1,
          allocation: 2.0
        }
      ];

      const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);

      setData({
        prices: {
          'ETH': 2350.45,
          'USDC': 1.00,
          'DAI': 0.999,
          'USDT': 1.001,
          'LINK': 14.32,
          'AAVE': 89.45
        },
        marketData: {
          totalVolume: 45000000000,
          marketCap: 1200000000000,
          dominance: {
            'BTC': 42.5,
            'ETH': 18.2,
            'Others': 39.3
          }
        },
        lending: {
          totalValueLocked: 12500000000,
          totalBorrowed: 8900000000,
          avgAPY: 4.25,
          avgAPR: 6.80
        },
        portfolio: {
          totalValue,
          totalPnL: 445.80,
          pnlPercentage: 5.2,
          assets: portfolioAssets
        },
        riskMetrics: [
          {
            title: 'VaR (95%)',
            value: '$892.33',
            change: '-2.1%',
            trend: 'down',
            description: 'Value at Risk - máxima perda esperada'
          },
          {
            title: 'Volatilidade',
            value: '12.5%',
            change: '+0.8%',
            trend: 'up',
            description: 'Volatilidade anualizada do portfolio'
          },
          {
            title: 'Beta',
            value: '1.15',
            change: '+0.05',
            trend: 'up',
            description: 'Sensibilidade em relação ao mercado'
          },
          {
            title: 'Sharpe Ratio',
            value: '1.82',
            change: '+0.12',
            trend: 'up',
            description: 'Retorno ajustado ao risco'
          }
        ],
        lastUpdate: new Date(),
        address: '0x742d35Cc6622C0532925a3b8D4c4AA001231B881'
      });
      setIsLoading(false);
    };

    const timeout = setTimeout(loadInitialData, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!data || isLoading) return;

    const interval = setInterval(() => {
      setData(prevData => {
        if (!prevData) return prevData;

        // Update prices with random fluctuations
        const newPrices = {
          ...prevData.prices,
          'ETH': prevData.prices.ETH * (1 + (Math.random() - 0.5) * 0.02),
          'USDC': 1.00 + (Math.random() - 0.5) * 0.001,
          'DAI': 0.999 + (Math.random() - 0.5) * 0.002,
          'USDT': 1.001 + (Math.random() - 0.5) * 0.001,
          'LINK': prevData.prices.LINK * (1 + (Math.random() - 0.5) * 0.03),
          'AAVE': prevData.prices.AAVE * (1 + (Math.random() - 0.5) * 0.025),
        };

        // Update portfolio values based on new prices
        const updatedAssets = prevData.portfolio.assets.map(asset => ({
          ...asset,
          price: newPrices[asset.symbol] || asset.price,
          value: asset.amount * (newPrices[asset.symbol] || asset.price),
          change24h: asset.change24h + (Math.random() - 0.5) * 0.5
        }));

        const newTotalValue = updatedAssets.reduce((sum, asset) => sum + asset.value, 0);

        return {
          ...prevData,
          prices: newPrices,
          portfolio: {
            ...prevData.portfolio,
            assets: updatedAssets,
            totalValue: newTotalValue,
            totalPnL: newTotalValue - 8500, // Assume initial investment was $8500
            pnlPercentage: ((newTotalValue - 8500) / 8500) * 100
          },
          lending: {
            ...prevData.lending,
            avgAPY: Math.max(0.1, prevData.lending.avgAPY + (Math.random() - 0.5) * 0.1),
            avgAPR: Math.max(0.1, prevData.lending.avgAPR + (Math.random() - 0.5) * 0.1),
          },
          riskMetrics: prevData.riskMetrics.map(metric => ({
            ...metric,
            change: metric.trend === 'up' ? 
              `+${(Math.random() * 0.5).toFixed(1)}%` : 
              `-${(Math.random() * 0.5).toFixed(1)}%`
          })),
          lastUpdate: new Date()
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [data, isLoading]);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return { 
    data, 
    isLoading, 
    error: null, 
    isConnected: true,
    portfolio: data?.portfolio,
    riskMetrics: data?.riskMetrics,
    address: data?.address,
    refreshData
  };
};
