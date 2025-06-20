'use client';

import { useState, useEffect } from 'react';
import { WalletButton } from '@/components/wallet/wallet-button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign, RefreshCw, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Dados de candlestick mockados
const generateCandlestickData = (symbol: string, hours = 24) => {
  const data = [];
  let basePrice = {
    'ETH': 2500,
    'BTC': 45000,
    'USDC': 1,
    'LINK': 15,
    'UNI': 8,
    'AAVE': 150
  }[symbol] || 100;

  for (let i = hours; i >= 0; i--) {
    const timestamp = Date.now() - (i * 60 * 60 * 1000);
    const volatility = symbol === 'USDC' ? 0.005 : 0.08;
    
    const open = basePrice;
    const high = open * (1 + Math.random() * volatility);
    const low = open * (1 - Math.random() * volatility);
    const close = low + Math.random() * (high - low);
    
    basePrice = close;
    
    data.push({
      time: new Date(timestamp).toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.random() * 500000,
      price: parseFloat(close.toFixed(2))
    });
  }
  return data;
};

const tradingPairs = [
  { symbol: 'ETH/USDC', basePrice: 2487.52, change: 3.24, volume: 1250000, icon: '🔷' },
  { symbol: 'BTC/USDC', basePrice: 44856.12, change: -1.85, volume: 2850000, icon: '₿' },
  { symbol: 'LINK/USDC', basePrice: 14.82, change: 5.67, volume: 425000, icon: '🔗' },
  { symbol: 'UNI/USDC', basePrice: 7.94, change: 2.18, volume: 650000, icon: '🦄' },
  { symbol: 'AAVE/USDC', basePrice: 148.35, change: -0.92, volume: 380000, icon: '👻' }
];

export default function TradingPage() {
  const { portfolio, isConnected, address, marketData } = useRealTimeData();
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');
  const [candlestickData, setCandlestickData] = useState<any[]>([]);
  const [orderBook, setOrderBook] = useState<any>({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { t } = useTranslation();

  // Inicializar timestamp apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    updateTradingData();
    
    const interval = setInterval(() => {
      if (isLive) {
        updateTradingData();
        setLastUpdate(new Date());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedPair, isLive, isConnected]);

  const updateTradingData = () => {
    const symbol = selectedPair.split('/')[0];
    const data = generateCandlestickData(symbol, 24);
    setCandlestickData(data);

    // Mock order book
    const basePrice = data[data.length - 1]?.close || 2500;
    const bids = Array.from({ length: 10 }, (_, i) => ({
      price: basePrice * (1 - (i + 1) * 0.001),
      amount: Math.random() * 10,
      total: 0
    }));
    const asks = Array.from({ length: 10 }, (_, i) => ({
      price: basePrice * (1 + (i + 1) * 0.001),
      amount: Math.random() * 10,
      total: 0
    }));

    setOrderBook({ bids, asks });

    // Mock recent trades
    const trades = Array.from({ length: 20 }, (_, i) => ({
      price: basePrice * (1 + (Math.random() - 0.5) * 0.01),
      amount: Math.random() * 5,
      time: new Date(Date.now() - i * 30000).toLocaleTimeString('pt-BR'),
      type: Math.random() > 0.5 ? 'buy' : 'sell'
    }));
    setRecentTrades(trades);
  };

  const currentPair = tradingPairs.find(pair => pair.symbol === selectedPair);
  const latestPrice = candlestickData[candlestickData.length - 1]?.close || currentPair?.basePrice;

  const formatCurrency = (value: number) => {
    if (value > 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('tradingTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('tradingSubtitle')}
          </p>
        </div>

        {/* Trading Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('priceChart')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">{t('loadingData')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader>
              <CardTitle>{t('orderBook')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sell Orders */}
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">{t('sell')}</h4>
                  <div className="space-y-1">
                    {[
                      { price: '2,345.67', amount: '0.5432' },
                      { price: '2,344.23', amount: '1.2345' },
                      { price: '2,343.89', amount: '0.8765' }
                    ].map((order, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-red-600">${order.price}</span>
                        <span className="text-gray-600">{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Price */}
                <div className="py-2 border-y border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">$2,341.89</div>
                    <div className="text-xs text-gray-500">ETH/USD</div>
                  </div>
                </div>

                {/* Buy Orders */}
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">{t('buy')}</h4>
                  <div className="space-y-1">
                    {[
                      { price: '2,340.12', amount: '0.7654' },
                      { price: '2,339.45', amount: '1.5432' },
                      { price: '2,338.78', amount: '0.9876' }
                    ].map((order, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-green-600">${order.price}</span>
                        <span className="text-gray-600">{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Buy Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">{t('buy')} ETH</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('price')}</label>
                <input
                  type="number"
                  placeholder="2,341.89"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('amount')}</label>
                <input
                  type="number"
                  placeholder="0.0000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('total')}</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  readOnly
                />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t('buy')} ETH
              </Button>
            </CardContent>
          </Card>

          {/* Sell Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">{t('sell')} ETH</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('price')}</label>
                <input
                  type="number"
                  placeholder="2,341.89"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('amount')}</label>
                <input
                  type="number"
                  placeholder="0.0000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('total')}</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  readOnly
                />
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                {t('sell')} ETH
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('high')}</div>
              <div className="text-lg font-semibold">$2,456.78</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('low')}</div>
              <div className="text-lg font-semibold">$2,234.56</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('volume')}</div>
              <div className="text-lg font-semibold">45,678 ETH</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('change')}</div>
              <div className="text-lg font-semibold text-green-600">+2.34%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 