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

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview';
import RiskMetrics from '@/components/dashboard/risk-metrics';
import AIInsights from '@/components/dashboard/ai-insights';
import { MarketData } from '@/components/dashboard/market-data';
import AutomationStatus from '@/components/dashboard/automation-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { WalletButton } from '@/components/wallet/wallet-button';
import { Activity, TrendingUp, Shield, Zap, Wallet } from 'lucide-react';
import { WalletDebug } from '@/components/wallet/wallet-debug';
import { WalletTest } from '@/components/wallet/wallet-test';
import { useI18n } from '@/contexts/i18n-context';

export default function DashboardPage() {
  const { data: realTimeData, isConnected } = useRealTimeData();
  const { t } = useI18n();

  // Dados simulados do portfolio
  const portfolio = {
    totalValue: '25750.42',
    assets: [
      { symbol: 'ETH', amount: '5.5', value: '12925.48', price: realTimeData?.prices?.ETH || 2350.45 },
      { symbol: 'USDC', amount: '8500', value: '8500.00', price: realTimeData?.prices?.USDC || 1.00 },
      { symbol: 'LINK', amount: '300', value: '4296.00', price: realTimeData?.prices?.LINK || 14.32 },
      { symbol: 'AAVE', amount: '32.5', value: '2907.12', price: realTimeData?.prices?.AAVE || 89.45 }
    ]
  };

  // Dados simulados de métricas de risco
  const riskMetrics = {
    portfolioRisk: 35,
    liquidityRisk: 25,
    smartContractRisk: 15,
    correlationRisk: 40,
    volatilityScore: 42
  };

  // Dados de mercado do hook ou simulados
  const marketData = realTimeData ? {
    ETH: {
      price: realTimeData.prices.ETH,
      change24h: (Math.random() - 0.5) * 10 // Variação simulada
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
            </p>
          </div>
          
          {!isConnected && (
            <div className="w-64">
              <WalletButton />
            </div>
          )}
        </div>

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
              <p className="text-xs text-blue-200">
                {portfolio.assets.length} {t.dashboard.assets}
              </p>
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
              <p className="text-xs text-emerald-200">
                {riskScore < 30 ? t.dashboard.lowRisk : 
                 riskScore < 70 ? t.dashboard.mediumRisk : t.dashboard.highRisk}
              </p>
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
              <p className="text-xs text-orange-200">
                {marketData?.ETH ? formatCurrency(marketData.ETH.price) : '--'}
              </p>
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

        {/* Debug da Carteira - TEMPORÁRIO */}
        <WalletDebug />
        
        {/* Teste de Conexão MetaMask - TEMPORÁRIO */}
        <WalletTest />

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