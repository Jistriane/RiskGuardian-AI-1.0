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

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/contexts/i18n-context';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  RefreshCw,
  Clock,
  DollarSign,
  Percent
} from 'lucide-react';

export default function PortfolioPage() {
  const { t } = useI18n();
  const { data, loading, error, lastUpdate, refresh, isRealTime } = useRealTimeData(3000); // Atualiza a cada 3 segundos
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  if (loading && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-lg">{t.common.loading}</span>
            </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-500 text-lg">{error}</p>
          <Button onClick={refresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.common.tryAgain}
          </Button>
          </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">{t.common.noData}</p>
            </div>
      </DashboardLayout>
    );
  }

  const portfolio = data.portfolio;
  const prices = data.prices;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{t.portfolio.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              {isRealTime && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
{t.common.realTime}
                </Badge>
              )}
              {lastUpdate && (
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {lastUpdate.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
          <Button onClick={refresh} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
{t.common.refresh}
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
{t.common.totalValue}
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(portfolio.totalValue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
{t.common.change24h}
                </p>
                <div className="flex items-center gap-1">
                  <p className={`text-2xl font-bold ${
                    portfolio.totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(portfolio.totalChange24h)}
                  </p>
                  {portfolio.totalChange24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
              <Percent className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
{t.common.assets}
                </p>
                <p className="text-2xl font-bold">
                  {portfolio.assets.length}
                </p>
              </div>
              <PieChart className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
                    <div>
                <p className="text-sm font-medium text-muted-foreground">
{t.common.performance}
                </p>
                <p className={`text-2xl font-bold ${
                  portfolio.totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage((portfolio.totalChange24h / portfolio.totalValue) * 100)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Assets Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{t.common.assets}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr className="border-b">
                                      <th className="text-left py-3 px-4 font-medium">{t.common.assets}</th>
                  <th className="text-right py-3 px-4 font-medium">{t.common.balance}</th>
                                      <th className="text-right py-3 px-4 font-medium">{t.common.price}</th>
                                      <th className="text-right py-3 px-4 font-medium">{t.common.value}</th>
                                      <th className="text-right py-3 px-4 font-medium">{t.common.change24h}</th>
                                      <th className="text-right py-3 px-4 font-medium">{t.common.allocation}</th>
                  </tr>
                </thead>
                <tbody>
                {portfolio.assets.map((asset) => {
                  const assetPrice = prices[asset.symbol]?.price || 0;
                  const allocation = (asset.value / portfolio.totalValue) * 100;
                  
                  return (
                    <tr 
                      key={asset.symbol}
                      className={`border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                        selectedAsset === asset.symbol ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedAsset(selectedAsset === asset.symbol ? null : asset.symbol)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {asset.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{asset.symbol}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.symbol === 'BTC' ? 'Bitcoin' : 
                               asset.symbol === 'ETH' ? 'Ethereum' : 
                               asset.symbol === 'USDC' ? 'USD Coin' : asset.symbol}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-mono">
                        {asset.balance.toFixed(asset.symbol === 'USDC' ? 2 : 6)}
                      </td>
                      <td className="text-right py-3 px-4 font-mono">
                        {formatCurrency(assetPrice)}
                      </td>
                      <td className="text-right py-3 px-4 font-mono font-semibold">
                        {formatCurrency(asset.value)}
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-medium ${
                          asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {asset.change24h >= 0 ? '+' : ''}{formatCurrency(asset.change24h)}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${Math.min(allocation, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {formatPercentage(allocation)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
        </Card>

        {/* Real-time Data Indicator */}
        {isRealTime && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-green-800">
                Dados em tempo real ativos - Atualizando a cada 3 segundos
              </p>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                AO VIVO
              </Badge>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
} 