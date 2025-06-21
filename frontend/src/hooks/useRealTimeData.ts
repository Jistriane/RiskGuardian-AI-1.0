/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface RealTimeData {
  timestamp: string;
  prices: {
    [symbol: string]: {
      price: number;
      change24h: number;
      volume: number;
    };
  };
  portfolio: {
    totalValue: number;
    totalChange24h: number;
    assets: Array<{
      symbol: string;
      balance: number;
      value: number;
      change24h: number;
    }>;
  };
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    var95: number;
    beta: number;
  };
  isRealTime: boolean;
}

export function useRealTimeData(refreshInterval = 5000) {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://riskguardian-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/portfolio/real-time`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData = await response.json();
      setData(newData);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setLoading(false);
      console.error('Error fetching real-time data:', err);
    }
  }, []);

  useEffect(() => {
    // Fetch inicial
    fetchData();

    // Configurar intervalo de atualização
    const interval = setInterval(fetchData, refreshInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  // Função para forçar refresh manual
  const refresh = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    loading,
    error,
    lastUpdate,
    refresh,
    isRealTime: data?.isRealTime || false,
  };
}
