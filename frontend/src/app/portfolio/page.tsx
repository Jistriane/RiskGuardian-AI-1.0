'use client';

import { useState } from 'react';
import { WalletButton } from '@/components/wallet/wallet-button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Wallet, PlusCircle, MinusCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

export default function PortfolioPage() {
  const { portfolio, riskMetrics, isConnected, address, refreshData } = useRealTimeData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              🛡️ RiskGuardian AI
            </h1>
            <div className="w-64">
              <WalletButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Wallet className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Conecte sua Carteira</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Para visualizar e gerenciar seu portfólio DeFi, conecte sua carteira usando o botão acima.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const totalValue = parseFloat(portfolio.totalValue);
  const hasAssets = portfolio.assets.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('portfolioTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('portfolioSubtitle')}
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('totalValue')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
              <p className="text-green-600 text-sm">+2.34% {t('change24h')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('performance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+12.5%</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t('thirtyDays')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('assets')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{portfolio.assets.length}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Diferentes criptomoedas</p>
            </CardContent>
          </Card>
        </div>

        {/* Asset Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('allocation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'ETH', value: '$18,092.76', percentage: '40%', color: 'bg-blue-500' },
                  { name: 'BTC', value: '$13,569.57', percentage: '30%', color: 'bg-orange-500' },
                  { name: 'LINK', value: '$6,784.78', percentage: '15%', color: 'bg-purple-500' },
                  { name: 'USDC', value: '$4,523.19', percentage: '10%', color: 'bg-green-500' },
                  { name: 'Others', value: '$2,261.59', percentage: '5%', color: 'bg-gray-500' }
                ].map((asset, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                      <span className="font-medium">{asset.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{asset.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{asset.percentage}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('transactions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Buy', asset: 'ETH', amount: '0.5', value: '$1,170.95', time: '2h ago' },
                  { type: 'Sell', asset: 'BTC', amount: '0.02', value: '$870.42', time: '1d ago' },
                  { type: 'Buy', asset: 'LINK', amount: '50', value: '$727.50', time: '2d ago' },
                  { type: 'Swap', asset: 'USDC → ETH', amount: '500', value: '$500.00', time: '3d ago' }
                ].map((tx, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div>
                      <div className="font-medium">{tx.type} {tx.asset}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{tx.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tx.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{tx.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Holdings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Holdings Detalhados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">{t('assets')}</th>
                    <th className="text-right py-3 px-4">{t('balance')}</th>
                    <th className="text-right py-3 px-4">{t('value')}</th>
                    <th className="text-right py-3 px-4">{t('change24h')}</th>
                    <th className="text-right py-3 px-4">{t('allocation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { asset: 'ETH', balance: '7.7234', value: '$18,092.76', change: '+2.34%', allocation: '40%', isPositive: true },
                    { asset: 'BTC', balance: '0.3117', value: '$13,569.57', change: '-1.23%', allocation: '30%', isPositive: false },
                    { asset: 'LINK', balance: '466.21', value: '$6,784.78', change: '+5.67%', allocation: '15%', isPositive: true },
                    { asset: 'USDC', balance: '4,523.19', value: '$4,523.19', change: '0.00%', allocation: '10%', isPositive: true },
                    { asset: 'UNI', balance: '142.87', value: '$1,356.96', change: '+3.45%', allocation: '3%', isPositive: true },
                    { asset: 'AAVE', balance: '12.45', value: '$904.63', change: '-2.11%', allocation: '2%', isPositive: false }
                  ].map((holding, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4 font-medium">{holding.asset}</td>
                      <td className="py-3 px-4 text-right">{holding.balance}</td>
                      <td className="py-3 px-4 text-right font-semibold">{holding.value}</td>
                      <td className={`py-3 px-4 text-right ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.change}
                      </td>
                      <td className="py-3 px-4 text-right">{holding.allocation}</td>
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