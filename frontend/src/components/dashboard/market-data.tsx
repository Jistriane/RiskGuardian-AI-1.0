'use client';

import { useState, useEffect } from 'react';
import { useClientTime } from '@/hooks/useClientTime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  lastUpdate: string;
}

interface ChartDataPoint {
  time: string;
  price: number;
}

export function MarketData() {
  const { formatTime } = useClientTime();
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('ETH');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simular dados de mercado em tempo real
  useEffect(() => {
    const generateMarketData = (): MarketData[] => {
      const baseData = [
        { symbol: 'ETH', basePrice: 2000, baseName: 'Ethereum' },
        { symbol: 'BTC', basePrice: 45000, baseName: 'Bitcoin' },
        { symbol: 'USDC', basePrice: 1, baseName: 'USD Coin' },
        { symbol: 'LINK', basePrice: 15, baseName: 'Chainlink' }
      ];

      return baseData.map(asset => {
        const priceVariation = (Math.random() - 0.5) * 0.1; // ±5%
        const price = asset.basePrice * (1 + priceVariation);
        const change24h = (Math.random() - 0.5) * 20; // ±10%
        
        return {
          symbol: asset.symbol,
          price,
          change24h,
          volume24h: Math.random() * 1000000000, // Volume aleatório
          high24h: price * 1.05,
          low24h: price * 0.95,
          lastUpdate: new Date().toISOString()
        };
      });
    };

    const generateChartData = (timestamp: number): ChartDataPoint[] => {
      const data: ChartDataPoint[] = [];
      const basePrice = selectedAsset === 'ETH' ? 2000 : 
                       selectedAsset === 'BTC' ? 45000 :
                       selectedAsset === 'USDC' ? 1 : 15;
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(timestamp - i * 3600000); // Cada hora
        const priceVariation = (Math.random() - 0.5) * 0.1;
        const price = basePrice * (1 + priceVariation);
        
        // Usar formatação local direta para evitar dependência do formatTime
        const formattedTime = time.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });
        
        data.push({
          time: formattedTime,
          price
        });
      }
      
      return data;
    };

    // Atualizar dados iniciais
    const updateData = () => {
      const newMarketData = generateMarketData();
      const newChartData = generateChartData(Date.now());
      
      setMarketData(newMarketData);
      setChartData(newChartData);
      setLastUpdate(new Date());
    };

    updateData();

    // Atualizar a cada 5 segundos
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, [selectedAsset]); // Removido formatTime das dependências para evitar loop infinito

  const formatCurrency = (value: number, symbol: string = 'USD'): string => {
    if (symbol === 'USDC') {
      return `$${value.toFixed(4)}`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatVolume = (volume: number): string => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  const getChangeColor = (change: number): string => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Mercado em Tempo Real
            <Badge variant="info" className="bg-green-900/20 border-green-800/30 text-green-400">
              🟢 Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {marketData.map((asset) => (
              <div
                key={asset.symbol}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAsset === asset.symbol
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedAsset(asset.symbol)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {asset.symbol === 'ETH' && '🔷'}
                        {asset.symbol === 'BTC' && '₿'}
                        {asset.symbol === 'USDC' && '💰'}
                        {asset.symbol === 'LINK' && '🔗'}
                      </span>
                    </div>
                    <span className="font-semibold">{asset.symbol}</span>
                  </div>
                  {getChangeIcon(asset.change24h)}
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-bold">
                    {formatCurrency(asset.price, asset.symbol)}
                  </div>
                  <div className={`text-sm ${getChangeColor(asset.change24h)}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-400">
                    Vol: {formatVolume(asset.volume24h)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gráfico de Preços - {selectedAsset}</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              Última atualização: {formatTime(lastUpdate.toISOString())}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-1">
            {chartData.map((point, index) => {
              const maxPrice = Math.max(...chartData.map(p => p.price));
              const minPrice = Math.min(...chartData.map(p => p.price));
              const height = ((point.price - minPrice) / (maxPrice - minPrice)) * 200 + 20;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center group relative"
                  style={{ minWidth: '20px' }}
                >
                  <div
                    className="bg-blue-500 hover:bg-blue-400 transition-colors rounded-t"
                    style={{ height: `${height}px`, width: '12px' }}
                  />
                  <div className="text-xs text-gray-500 mt-1 rotate-45 origin-left">
                    {point.time}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatCurrency(point.price, selectedAsset)}
                    <br />
                    {point.time}
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedAsset && marketData.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {(() => {
                const asset = marketData.find(m => m.symbol === selectedAsset);
                if (!asset) return null;
                
                return (
                  <>
                    <div>
                      <div className="text-gray-400">Preço Atual</div>
                      <div className="font-semibold">
                        {formatCurrency(asset.price, asset.symbol)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Máxima 24h</div>
                      <div className="font-semibold">
                        {formatCurrency(asset.high24h, asset.symbol)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Mínima 24h</div>
                      <div className="font-semibold">
                        {formatCurrency(asset.low24h, asset.symbol)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Volume 24h</div>
                      <div className="font-semibold">
                        {formatVolume(asset.volume24h)}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 