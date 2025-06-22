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

import { useState, useEffect } from 'react';
import { WalletButton } from '@/components/wallet/wallet-button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TradingChart } from '@/components/ui/trading-chart';
import { TrendingUp, TrendingDown, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';

const tradingPairs = [
  { symbol: 'ETH/USDC', base: 'ETH', quote: 'USDC', basePrice: 2487.52, change: 3.24, volume: 1250000, icon: '🔷' },
  { symbol: 'BTC/USDC', base: 'BTC', quote: 'USDC', basePrice: 44856.12, change: -1.85, volume: 2850000, icon: '₿' },
  { symbol: 'LINK/USDC', base: 'LINK', quote: 'USDC', basePrice: 14.82, change: 5.67, volume: 425000, icon: '🔗' },
  { symbol: 'UNI/USDC', base: 'UNI', quote: 'USDC', basePrice: 7.94, change: 2.18, volume: 650000, icon: '🦄' },
  { symbol: 'AAVE/USDC', base: 'AAVE', quote: 'USDC', basePrice: 148.35, change: -0.92, volume: 380000, icon: '👻' }
];

export default function TradingPage() {
  const { data: realTimeData, loading: isLoading } = useRealTimeData();
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');
  const [orderBook, setOrderBook] = useState<any>({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [buyAmount, setBuyAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const { t } = useI18n();

  const selectedPairData = tradingPairs.find(pair => pair.symbol === selectedPair);
  const baseSymbol = selectedPairData?.base || 'ETH';

  // Gerar order book mockado baseado no preço em tempo real
  useEffect(() => {
    if (!realTimeData) return;

    const rawBasePrice = realTimeData.prices[baseSymbol] || selectedPairData?.basePrice || 2350;
    const basePrice = typeof rawBasePrice === 'number' ? rawBasePrice : parseFloat(String(rawBasePrice)) || 2350;
    
    // Mock order book com spread realista
    const spread = basePrice * 0.0005; // 0.05% spread
    const bids = Array.from({ length: 15 }, (_, i) => {
      const price = basePrice - spread - (i * basePrice * 0.0002);
      const amount = Math.random() * 10 + 0.1;
      return {
        price: price.toFixed(2),
        amount: amount.toFixed(4),
        total: (price * amount).toFixed(2)
      };
    });

    const asks = Array.from({ length: 15 }, (_, i) => {
      const price = basePrice + spread + (i * basePrice * 0.0002);
      const amount = Math.random() * 10 + 0.1;
      return {
        price: price.toFixed(2),
        amount: amount.toFixed(4),
        total: (price * amount).toFixed(2)
      };
    });

    setOrderBook({ bids, asks });

    // Mock recent trades
    const trades = Array.from({ length: 20 }, (_, i) => {
      const priceVariation = (Math.random() - 0.5) * 0.01;
      const price = basePrice * (1 + priceVariation);
      const amount = Math.random() * 5 + 0.1;
      return {
        price: price.toFixed(2),
        amount: amount.toFixed(4),
        time: new Date(Date.now() - i * 30000).toLocaleTimeString('pt-BR'),
        type: Math.random() > 0.5 ? 'buy' : 'sell'
      };
    });
    setRecentTrades(trades);

    // Atualizar preços de compra/venda sugeridos
    setBuyPrice(bids[0]?.price || basePrice.toFixed(2));
    setSellPrice(asks[0]?.price || basePrice.toFixed(2));
  }, [realTimeData, selectedPair, baseSymbol, selectedPairData]);

  const rawCurrentPrice = realTimeData?.prices[baseSymbol] || selectedPairData?.basePrice || 0;
  const currentPrice = typeof rawCurrentPrice === 'number' ? rawCurrentPrice : (typeof rawCurrentPrice === 'object' && rawCurrentPrice.price ? rawCurrentPrice.price : parseFloat(String(rawCurrentPrice)) || 0);
  const priceChange = selectedPairData?.change || 0;

  const formatCurrency = (value: number | string | null | undefined) => {
    const numValue = typeof value === 'number' ? value : parseFloat(String(value || 0));
    
    // Verificar se é um número válido
    if (isNaN(numValue) || !isFinite(numValue)) {
      return '$0.00';
    }
    
    if (numValue > 1000) {
      return `$${(numValue / 1000).toFixed(1)}k`;
    }
    return `$${numValue.toFixed(2)}`;
  };

  const formatVolume = (volume: number | string | null | undefined) => {
    const numVolume = typeof volume === 'number' ? volume : parseFloat(String(volume || 0));
    
    // Verificar se é um número válido
    if (isNaN(numVolume) || !isFinite(numVolume)) {
      return '0';
    }
    
    if (numVolume > 1000000) {
      return `${(numVolume / 1000000).toFixed(1)}M`;
    }
    if (numVolume > 1000) {
      return `${(numVolume / 1000).toFixed(1)}K`;
    }
    return numVolume.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.trading.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t.trading.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <WalletButton />
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isLive ? t.trading.live : t.trading.paused}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                  className="ml-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Seletor de Par de Trading */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tradingPairs.map((pair) => (
              <Button
                key={pair.symbol}
                variant={selectedPair === pair.symbol ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPair(pair.symbol)}
                className="flex-shrink-0"
              >
                <span className="mr-2">{pair.icon}</span>
                {pair.symbol}
                <span className={`ml-2 ${pair.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pair.change >= 0 ? '+' : ''}{typeof pair.change === 'number' ? pair.change.toFixed(2) : '0.00'}%
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Gráfico de Preço - Coluna Principal */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedPair} - {t.trading.priceChart}</span>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold">
                    {formatCurrency(currentPrice)}
                  </div>
                  <div className={`flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {priceChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {priceChange >= 0 ? '+' : ''}{typeof priceChange === 'number' ? priceChange.toFixed(2) : '0.00'}%
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TradingChart symbol={baseSymbol} />
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{t.trading.orderBook}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Sell Orders (Asks) */}
                <div>
                  <h4 className="text-xs font-medium text-red-600 mb-2 uppercase">{t.trading.sell}</h4>
                  <div className="space-y-1">
                    {orderBook.asks.slice(0, 8).reverse().map((order: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-red-600 font-mono">${order.price}</span>
                        <span className="text-gray-600">{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Price Spread */}
                <div className="py-2 border-y border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(currentPrice)}
                  </div>
                    <div className="text-xs text-gray-500">{selectedPair}</div>
                  </div>
                </div>

                {/* Buy Orders (Bids) */}
                <div>
                  <h4 className="text-xs font-medium text-green-600 mb-2 uppercase">{t.trading.buy}</h4>
                  <div className="space-y-1">
                    {orderBook.bids.slice(0, 8).map((order: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-green-600 font-mono">${order.price}</span>
                        <span className="text-gray-600">{order.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Painel de Trading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Painel de Compra */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center">
                <ArrowUpRight className="h-5 w-5 mr-2" />
{t.trading.buy} {baseSymbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.common.price} (USDC)</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.trading.amount} ({baseSymbol})</label>
                <input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.0000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.trading.total} (USDC)</label>
                <input
                  type="number"
                  value={buyPrice && buyAmount ? (parseFloat(buyPrice) * parseFloat(buyAmount)).toFixed(2) : ''}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                  readOnly
                />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t.trading.buy} {baseSymbol}
              </Button>
            </CardContent>
          </Card>

          {/* Painel de Venda */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center">
                <ArrowDownRight className="h-5 w-5 mr-2" />
                {t.trading.sell} {baseSymbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.common.price} (USDC)</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.trading.amount} ({baseSymbol})</label>
                <input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0.0000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.trading.total} (USDC)</label>
                <input
                  type="number"
                  value={sellPrice && sellAmount ? (parseFloat(sellPrice) * parseFloat(sellAmount)).toFixed(2) : ''}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                  readOnly
                />
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                {t.trading.sell} {baseSymbol}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas de Mercado */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.trading.high} 24h</div>
              <div className="text-lg font-semibold">
                {formatCurrency(currentPrice * 1.05)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.trading.low} 24h</div>
              <div className="text-lg font-semibold">
                {formatCurrency(currentPrice * 0.95)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.trading.volume} 24h</div>
              <div className="text-lg font-semibold">
                {formatVolume(selectedPairData?.volume || 0)} {baseSymbol}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.common.change24h} 24h</div>
              <div className={`text-lg font-semibold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}{typeof priceChange === 'number' ? priceChange.toFixed(2) : '0.00'}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trades */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Trades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Preço (USDC)</th>
                    <th className="text-left py-2">Quantidade ({baseSymbol})</th>
                    <th className="text-left py-2">Horário</th>
                    <th className="text-left py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.slice(0, 10).map((trade, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className={`py-2 font-mono ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                        ${trade.price}
                      </td>
                      <td className="py-2 font-mono">{trade.amount}</td>
                      <td className="py-2 text-gray-600">{trade.time}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {trade.type === 'buy' ? 'Compra' : 'Venda'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 