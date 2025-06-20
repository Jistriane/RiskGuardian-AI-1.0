'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartData {
  time: string;
  timestamp: number;
  price: number;
  volume: number;
}

interface TradingChartProps {
  symbol: string;
  className?: string;
}

export const TradingChart = ({ symbol, className = '' }: TradingChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);

  // Gerar dados iniciais
  const generateInitialData = (symbol: string) => {
    const data: ChartData[] = [];
    const basePrice = {
      'ETH': 2350,
      'BTC': 45000,
      'USDC': 1,
      'LINK': 14.32,
      'UNI': 8,
      'AAVE': 89.45
    }[symbol] || 100;

    let price = basePrice;
    
    // Gerar dados das últimas 24 horas
    for (let i = 23; i >= 0; i--) {
      const timestamp = Date.now() - (i * 60 * 60 * 1000);
      const volatility = symbol === 'USDC' ? 0.001 : 0.02;
      
      // Simular movimento de preço mais realista
      const change = (Math.random() - 0.5) * volatility;
      price = price * (1 + change);
      
      data.push({
        time: new Date(timestamp).toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp,
        price: parseFloat(price.toFixed(symbol === 'USDC' ? 4 : 2)),
        volume: Math.random() * 1000000
      });
    }
    
    return data;
  };

  // Adicionar novo ponto de dados
  const addNewDataPoint = () => {
    setChartData(prevData => {
      if (prevData.length === 0) return prevData;
      
      const lastPoint = prevData[prevData.length - 1];
      const volatility = symbol === 'USDC' ? 0.001 : 0.015;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = lastPoint.price * (1 + change);
      
      const newPoint: ChartData = {
        time: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: Date.now(),
        price: parseFloat(newPrice.toFixed(symbol === 'USDC' ? 4 : 2)),
        volume: Math.random() * 1000000
      };
      
      setCurrentPrice(newPoint.price);
      
      // Manter apenas os últimos 50 pontos para performance
      const newData = [...prevData, newPoint].slice(-50);
      return newData;
    });
  };

  // Inicializar dados
  useEffect(() => {
    const initialData = generateInitialData(symbol);
    setChartData(initialData);
    setCurrentPrice(initialData[initialData.length - 1]?.price || 0);
    setIsLoading(false);
  }, [symbol]);

  // Atualizar dados em tempo real
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(addNewDataPoint, 3000); // Atualizar a cada 3 segundos
    return () => clearInterval(interval);
  }, [symbol, isLoading]);

  const formatPrice = (value: number) => {
    if (symbol === 'USDC') {
      return `$${value.toFixed(4)}`;
    }
    return value > 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value.toFixed(2)}`;
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === 'price') {
      return [formatPrice(value), 'Preço'];
    }
    return [value, name];
  };

  if (isLoading) {
    return (
      <div className={`h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500 dark:text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const latestPrice = chartData[chartData.length - 1]?.price || 0;
  const previousPrice = chartData[chartData.length - 2]?.price || latestPrice;
  const priceChange = latestPrice - previousPrice;
  const priceChangePercent = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Informações do Preço */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(latestPrice)}
          </h3>
          <div className={`flex items-center text-sm ${
            priceChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{priceChange >= 0 ? '↗' : '↘'}</span>
            <span className="ml-1">
              {priceChange >= 0 ? '+' : ''}{formatPrice(Math.abs(priceChange))} 
              ({priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div>Volume: ${(chartData[chartData.length - 1]?.volume || 0).toLocaleString()}</div>
          <div>Última atualização: {new Date().toLocaleTimeString('pt-BR')}</div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatPrice}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#3B82F6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Indicador de Status ao Vivo */}
      <div className="flex items-center justify-center">
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          Dados em tempo real • Atualizando a cada 3 segundos
        </div>
      </div>
    </div>
  );
}; 