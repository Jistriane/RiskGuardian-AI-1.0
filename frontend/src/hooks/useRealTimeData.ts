import { useState, useEffect } from 'react';

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
  lastUpdate: Date;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = () => {
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
        lastUpdate: new Date()
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

        return {
          ...prevData,
          prices: {
            ...prevData.prices,
            'ETH': prevData.prices.ETH * (1 + (Math.random() - 0.5) * 0.02),
            'USDC': 1.00 + (Math.random() - 0.5) * 0.001,
            'DAI': 0.999 + (Math.random() - 0.5) * 0.002,
            'USDT': 1.001 + (Math.random() - 0.5) * 0.001,
            'LINK': prevData.prices.LINK * (1 + (Math.random() - 0.5) * 0.03),
            'AAVE': prevData.prices.AAVE * (1 + (Math.random() - 0.5) * 0.025),
          },
          lending: {
            ...prevData.lending,
            avgAPY: Math.max(0.1, prevData.lending.avgAPY + (Math.random() - 0.5) * 0.1),
            avgAPR: Math.max(0.1, prevData.lending.avgAPR + (Math.random() - 0.5) * 0.1),
          },
          lastUpdate: new Date()
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [data, isLoading]);

  return { 
    data, 
    isLoading, 
    error: null, 
    isConnected: true 
  };
};
