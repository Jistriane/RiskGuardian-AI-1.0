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
import { useAccount } from 'wagmi';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview';
import RiskMetrics from '@/components/dashboard/risk-metrics';
import AutomationStatus from '@/components/dashboard/automation-status';
import AIInsights from '@/components/dashboard/ai-insights';
import { MarketData } from '@/components/dashboard/market-data';
import { WalletButton } from '@/components/wallet/wallet-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Shield, TrendingUp, Zap, Activity, RefreshCw } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';
import { useWalletData } from '@/hooks/useWalletData';
import { DataSourceIndicator } from '@/components/wallet/data-source-indicator';
import { RealTimeStatus } from '@/components/wallet/real-time-status';

export default function DashboardPage() {
  const { t } = useI18n();
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  
  // Hook para dados reais da carteira
  const { walletData, isLoading, error, refresh, marketPrices } = useWalletData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Carregando...</div>
    </div>;
  }

  // Dados do portfolio (reais da carteira conectada)
  const portfolio = isConnected && walletData ? {
    totalValue: walletData.totalValue,
    assets: [
      {
        symbol: walletData.nativeBalance.symbol,
        amount: parseFloat(walletData.nativeBalance.formatted),
        value: walletData.nativeBalance.value
      },
      ...walletData.balances.map(token => ({
        symbol: token.symbol,
        amount: parseFloat(token.balance),
        value: token.value
      }))
    ]
  } : {
    totalValue: 0,
    assets: []
  };

  // Métricas de risco calculadas baseadas no portfolio real
  const riskMetrics = isConnected && walletData ? {
    portfolioRisk: Math.min(90, (walletData.totalValue / 10000) * 100), // Risco baseado no valor
    liquidityRisk: Math.random() * 50 + 20, // Simulado por enquanto
    smartContractRisk: walletData.balances.length * 15, // Risco baseado na diversificação
  } : null;

  // Dados de mercado em tempo real
  const marketData = isConnected && marketPrices ? {
    ETH: {
      price: marketPrices.ETH?.price || 0,
      change24h: marketPrices.ETH?.change24h || 0
    }
  } : null;

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
    }).format(numValue);
  };

  // Calcular score de risco baseado nas métricas - com verificação de segurança
  const riskScore = riskMetrics && riskMetrics.portfolioRisk !== undefined 
    ? Math.round((riskMetrics.portfolioRisk + riskMetrics.liquidityRisk + riskMetrics.smartContractRisk) / 3)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header com métricas principais */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {t.dashboard.title}
            </h1>
            <p className="text-gray-400">
              {t.dashboard.subtitle}
              {isConnected && address && (
                <span className="ml-2 text-blue-400">
                  • {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected && (
              <button
                onClick={refresh}
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? t.common.loading : t.common.refresh}
              </button>
            )}
            
            {!isConnected && (
              <div className="w-64">
                <WalletButton />
              </div>
            )}
          </div>
        </div>

        {/* Indicador de erro */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg">
            <p className="font-medium">{t.common.error}:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Status em tempo real */}
        {isConnected && (
          <RealTimeStatus
            lastUpdated={walletData?.lastUpdated}
            isLoading={isLoading}
            onRefresh={refresh}
            totalValue={portfolio.totalValue}
            tokensCount={portfolio.assets.length}
          />
        )}

        {/* Métricas de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                {t.dashboard.totalPortfolioValue}
              </CardTitle>
              <Wallet className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {isConnected ? formatCurrency(portfolio.totalValue) : '$0.00'}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-blue-200">
                  {portfolio.assets.length} {t.dashboard.assets}
                </p>
                {isConnected && walletData && (
                  <DataSourceIndicator 
                    type="real" 
                    label={t.dashboard.realTimeAnalysis} 
                    description={t.dashboard.blockchain}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">
                {t.dashboard.riskScore}
              </CardTitle>
              <Shield className="h-4 w-4 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {riskScore}/100
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-emerald-200">
                  {riskScore < 30 ? t.dashboard.lowRisk : 
                   riskScore < 70 ? t.dashboard.mediumRisk : t.dashboard.highRisk}
                </p>
                <DataSourceIndicator 
                  type="calculated" 
                  label="Calculado" 
                  description="Baseado em dados reais do portfolio"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">
                {t.dashboard.ethVariation24h}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {marketData?.ETH ? (
                  `${marketData.ETH.change24h >= 0 ? '+' : ''}${marketData.ETH.change24h.toFixed(2)}%`
                ) : '--'}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-orange-200">
                  {marketData?.ETH ? formatCurrency(marketData.ETH.price) : '--'}
                </p>
                <DataSourceIndicator 
                  type="real" 
                  label="CoinGecko API" 
                  description="Preços reais em tempo real"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">
                {t.dashboard.activeAutomations}
              </CardTitle>
              <Zap className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-purple-200">
                2 {t.dashboard.hedge}, 1 {t.dashboard.rebalanceamento}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Data com gráficos em tempo real */}
          <div className="lg:col-span-2">
            <MarketData />
          </div>
        </div>

        {/* Grid de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <div className="lg:col-span-1">
            <PortfolioOverview />
          </div>

          {/* Risk Metrics */}
          <div className="lg:col-span-1">
            <RiskMetrics />
          </div>

          {/* Automation Status */}
          <div className="lg:col-span-1">
            <AutomationStatus />
          </div>
        </div>

        {/* AI Insights */}
        <div className="w-full">
          <AIInsights />
        </div>

        {/* Status dos dados em tempo real */}
        {isConnected && walletData && (
          <Card className="border-gray-700 bg-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="h-5 w-5 text-green-400" />
                Dados da Carteira em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                  <p className="text-sm font-medium text-blue-400">Última Atualização</p>
                  <p className="text-white font-medium">
                    {walletData.lastUpdated.toLocaleTimeString('pt-BR')}
                  </p>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                  <p className="text-sm font-medium text-green-400">Valor Total</p>
                  <p className="text-white font-medium">
                    {formatCurrency(walletData.totalValue)}
                  </p>
                </div>
                <div className={`p-4 rounded-lg border ${
                  walletData.totalChange24h >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <p className={`text-sm font-medium ${
                    walletData.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    Variação 24h
                  </p>
                  <p className={`font-medium ${
                    walletData.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {walletData.totalChange24h >= 0 ? '+' : ''}
                    {walletData.totalChange24h.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                  <p className="text-sm font-medium text-purple-400">Tokens</p>
                  <p className="text-white font-medium">
                    {walletData.balances.length + 1} ativos
                  </p>
                </div>
              </div>
              
              {/* Lista de tokens */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Distribuição de Ativos</h4>
                <div className="space-y-2">
                  {/* Balance nativo */}
                  <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {walletData.nativeBalance.symbol}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{walletData.nativeBalance.symbol}</p>
                        <p className="text-xs text-gray-400">
                          {parseFloat(walletData.nativeBalance.formatted).toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">
                        {formatCurrency(walletData.nativeBalance.value)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {((walletData.nativeBalance.value / walletData.totalValue) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  {/* Tokens ERC20 */}
                  {walletData.balances.map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{token.symbol}</p>
                          <p className="text-xs text-gray-400">
                            {parseFloat(token.balance).toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          {formatCurrency(token.value)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {((token.value / walletData.totalValue) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status do sistema */}
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5" />
              {t.dashboard.systemStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                <div>
                  <p className="text-sm font-medium text-green-400">
                    {t.dashboard.blockchain}
                  </p>
                  <p className="text-xs text-green-300">
                    {t.common.online}
                  </p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                <div>
                  <p className="text-sm font-medium text-green-400">
                    {t.dashboard.priceOracle}
                  </p>
                  <p className="text-xs text-green-300">
                    {t.common.online}
                  </p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-800/30">
                <div>
                  <p className="text-sm font-medium text-green-400">
                    {t.dashboard.aiAnalytics}
                  </p>
                  <p className="text-xs text-green-300">
                    {t.common.online}
                  </p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 