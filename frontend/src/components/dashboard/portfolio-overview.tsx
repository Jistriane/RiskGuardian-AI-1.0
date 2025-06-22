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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useI18n } from '@/contexts/i18n-context';
import { useAccount } from 'wagmi';

interface Asset {
  symbol: string;
  balance: string;
  value: string;
  price?: number;
}

interface Portfolio {
  totalValue: string;
  assets: Asset[];
}

interface RiskMetrics {
  portfolioRisk: number;
  diversification: number;
  liquidityRisk: number;
  smartContractRisk: number;
}

interface WalletData {
  totalChange24h?: number;
}

function formatCurrency(value: string | number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(numValue);
}

function getRiskColor(score: number): string {
  if (score < 30) return 'text-green-400';
  if (score < 70) return 'text-yellow-400';
  return 'text-red-400';
}

export function PortfolioOverview() {
  const { data, loading } = useRealTimeData();
  const { t } = useI18n();
  const { isConnected } = useAccount();

  // Extrair dados do hook com fallbacks seguros
  const portfolio: Portfolio = data?.portfolio ? {
    totalValue: data.portfolio.totalValue.toString(),
    assets: data.portfolio.assets.map(asset => ({
      symbol: asset.symbol,
      balance: asset.balance.toString(),
      value: asset.value.toString(),
      price: asset.value / asset.balance
    }))
  } : {
    totalValue: '0',
    assets: []
  };

  const riskMetrics: RiskMetrics = {
    portfolioRisk: data?.riskMetrics?.volatility ? Math.round(data.riskMetrics.volatility * 100) : 45,
    diversification: portfolio.assets.length * 25,
    liquidityRisk: 20,
    smartContractRisk: 15
  };

  const walletData: WalletData = {
    totalChange24h: data?.portfolio?.totalChange24h || 0
  };

  if (!isConnected) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {t.dashboard.portfolioOverview}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {t.wallet.walletNotConnected}
              </h3>
              <p className="text-gray-400 mb-4">
                {t.wallet.connectToViewPortfolio}
              </p>
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-lg text-blue-400 text-sm">
                🔗 {t.wallet.connectWallet}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalValue = parseFloat(portfolio.totalValue);
  const hasAssets = portfolio.assets.length > 0;

  return (
    <div className="space-y-6">
      {/* Card Principal - Portfolio Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t.dashboard.portfolioRealTime}
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800/30">
              {t.dashboard.live}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t.dashboard.totalValue}</p>
              <p className="text-xs text-gray-500">
                {t.dashboard.lastUpdate}: {new Date().toLocaleTimeString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
              <div className="text-sm text-green-400 font-medium">
                {walletData?.totalChange24h ? 
                  `${walletData.totalChange24h >= 0 ? '+' : ''}${walletData.totalChange24h.toFixed(2)}% ${t.dashboard.today}` 
                  : `+0.0% ${t.dashboard.today}`
                }
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/40 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">{t.dashboard.riskScore}</div>
              <div className="text-lg font-bold text-white">{riskMetrics.portfolioRisk}/100</div>
              <div className="text-xs text-orange-400">
                {riskMetrics.portfolioRisk < 30 ? t.dashboard.lowRisk : 
                 riskMetrics.portfolioRisk < 70 ? t.dashboard.mediumRisk : t.dashboard.highRisk}
              </div>
            </div>
            
            <div className="bg-gray-800/40 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">{t.dashboard.diversification}</div>
              <div className="text-lg font-bold text-white">{riskMetrics.diversification}%</div>
              <div className="text-xs text-green-400">
                {riskMetrics.diversification > 70 ? t.dashboard.wellDiversified : t.dashboard.concentrated}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {hasAssets ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {t.dashboard.assets} ({portfolio.assets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.assets.map((asset: Asset, index: number) => {
                const allocation = (parseFloat(asset.value) / totalValue) * 100;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {asset.symbol === 'ETH' && '🔷'}
                          {asset.symbol === 'USDC' && '💰'}
                          {asset.symbol === 'LINK' && '🔗'}
                          {asset.symbol === 'USDT' && '💵'}
                          {!['ETH', 'USDC', 'LINK', 'USDT'].includes(asset.symbol) && '💎'}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{asset.symbol}</div>
                        <div className="text-sm text-gray-400">
                          {parseFloat(asset.balance).toFixed(4)} {asset.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        {formatCurrency(asset.value)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {allocation.toFixed(1)}% {t.dashboard.ofPortfolio}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {t.dashboard.noAssetsFound}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-400 mb-4">
                {t.dashboard.noAssetsInWallet}
              </p>
              <div className="text-sm text-gray-500">
                {t.dashboard.ensureWalletHasAssets}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card de Alertas - Layout Melhorado */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              {t.dashboard.activeAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMetrics.portfolioRisk > 70 && (
                <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-red-400 mb-1">
                        {t.dashboard.highRiskDetected}
                      </h4>
                      <p className="text-sm text-red-300">
                        {t.dashboard.riskScore}: {riskMetrics.portfolioRisk}/100
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-8">
                    {t.dashboard.considerDiversifying}
                  </p>
                </div>
              )}
              
              {riskMetrics.diversification < 50 && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-yellow-400 mb-1">
                        {t.dashboard.concentratedPortfolio}
                      </h4>
                      <p className="text-sm text-yellow-300">
                        {t.dashboard.diversification}: {riskMetrics.diversification}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-8">
                    {t.dashboard.addMoreAssets}
                  </p>
                </div>
              )}

              {riskMetrics.portfolioRisk <= 70 && riskMetrics.diversification >= 50 && hasAssets && (
                <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <h4 className="text-base font-semibold text-green-400">
                      {t.dashboard.noActiveAlerts}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1 font-medium">{t.dashboard.riskScore}</div>
                        <div className="text-lg font-bold text-green-400">{riskMetrics.portfolioRisk}/100</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1 font-medium">{t.dashboard.diversification}</div>
                        <div className="text-lg font-bold text-green-400">{riskMetrics.diversification}%</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <p className="text-xs text-gray-300 text-center leading-relaxed">
                        ✅ {t.dashboard.allMetricsNormal}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card de Performance - Layout Melhorado */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              {t.dashboard.performance24h}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Valores Principais */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                  <span className="text-xs font-medium text-gray-300">{t.dashboard.initialValue}</span>
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(totalValue * 0.976)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                  <span className="text-xs font-medium text-gray-300">{t.dashboard.currentValue}</span>
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(totalValue)}
                  </span>
                </div>
              </div>

              {/* Variação e P&L */}
              <div className="space-y-2">
                <div className={`flex items-center justify-between p-2 rounded-lg border ${
                  walletData?.totalChange24h && walletData.totalChange24h >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <span className="text-xs font-medium text-gray-300">{t.dashboard.variation}</span>
                  <span className={`text-sm font-bold ${
                    walletData?.totalChange24h && walletData.totalChange24h >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {walletData?.totalChange24h ? 
                      `${walletData.totalChange24h >= 0 ? '+' : ''}${walletData.totalChange24h.toFixed(2)}%` 
                      : '0.0%'
                    }
                  </span>
                </div>
                
                <div className={`flex items-center justify-between p-2 rounded-lg border ${
                  walletData?.totalChange24h && walletData.totalChange24h >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <span className="text-xs font-medium text-gray-300">{t.dashboard.pnl24h}</span>
                  <span className={`text-sm font-bold ${
                    walletData?.totalChange24h && walletData.totalChange24h >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {walletData?.totalChange24h ? 
                      `${walletData.totalChange24h >= 0 ? '+' : ''}${formatCurrency(totalValue * (walletData.totalChange24h / 100))}` 
                      : formatCurrency(0)
                    }
                  </span>
                </div>
              </div>
              
              {/* Resumo do Portfolio */}
              <div className="mt-3 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400">📊</span>
                  <span className="text-xs text-blue-400 font-semibold">
                    {t.dashboard.portfolioSummary}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">{t.dashboard.assets}</div>
                    <div className="text-sm font-bold text-white">{portfolio.assets.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">{t.dashboard.riskScore}</div>
                    <div className={`text-sm font-bold ${getRiskColor(riskMetrics.portfolioRisk)}`}>
                      {riskMetrics.portfolioRisk}/100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 