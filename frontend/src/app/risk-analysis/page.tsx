'use client';

import { useState } from 'react';
import { WalletButton } from '@/components/wallet/wallet-button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, TrendingUp, Activity, BarChart3, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

function getRiskColor(score: number): string {
  if (score < 30) return 'text-green-500';
  if (score < 60) return 'text-yellow-500';
  return 'text-red-500';
}

function getRiskLevel(score: number, t: any): string {
  if (score < 30) return t('lowRisk');
  if (score < 60) return t('mediumRisk');
  return t('highRisk');
}

function getRiskBgColor(score: number): string {
  if (score < 30) return 'from-green-900/50 to-emerald-900/50 border-green-800/50';
  if (score < 60) return 'from-yellow-900/50 to-orange-900/50 border-yellow-800/50';
  return 'from-red-900/50 to-pink-900/50 border-red-800/50';
}

export default function RiskAnalysisPage() {
  const { portfolio, riskMetrics, isConnected, address, refreshData } = useRealTimeData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
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
              <Shield className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('riskAnalysisTitle')} {t('disconnected')}</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              {t('connectToViewPortfolio')}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const riskFactors = [
    {
      name: t('volatility'),
      score: riskMetrics.volatility || 45,
      description: 'Oscilação dos preços dos ativos',
      icon: '📈'
    },
    {
      name: t('liquidity'),
      score: riskMetrics.liquidity || 75,
      description: 'Facilidade de conversão em dinheiro',
      icon: '💧'
    },
    {
      name: t('concentration'),
      score: 100 - (riskMetrics.diversification || 0),
      description: 'Distribuição entre diferentes ativos',
      icon: '🎯'
    },
    {
      name: t('smartContract'),
      score: riskMetrics.smartContractRisk || 25,
      description: 'Risco de falhas em contratos',
      icon: '📋'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('riskAnalysisTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('riskAnalysisSubtitle')}
          </p>
        </div>

        {/* Risk Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('riskScore')} Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">3.2</div>
              <p className="text-sm text-green-600">{t('lowRisk')}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">VaR 95%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-2.1%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('twentyFourHours')}</p>
              <div className="text-xs text-gray-500 mt-1">
                Max perda esperada
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('volatility')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">18.5%</div>
              <p className="text-sm text-yellow-600">Moderada</p>
              <div className="text-xs text-gray-500 mt-1">
                Últimos 30 dias
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">1.45</div>
              <p className="text-sm text-blue-600">Bom</p>
              <div className="text-xs text-gray-500 mt-1">
                Retorno/Risco
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('riskDistribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { asset: 'ETH', risk: t('mediumRisk'), score: 4.2, allocation: '40%', color: 'bg-yellow-500' },
                  { asset: 'BTC', risk: t('lowRisk'), score: 2.8, allocation: '30%', color: 'bg-green-500' },
                  { asset: 'LINK', risk: t('highRisk'), score: 6.1, allocation: '15%', color: 'bg-red-500' },
                  { asset: 'USDC', risk: 'Muito Baixo', score: 1.0, allocation: '10%', color: 'bg-blue-500' },
                  { asset: 'UNI', risk: t('highRisk'), score: 7.2, allocation: '5%', color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <div>
                        <div className="font-medium">{item.asset}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.allocation} do {t('portfolio')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.score}/10</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.risk}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('assetCorrelation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div></div>
                  <div className="text-center font-medium">ETH</div>
                  <div className="text-center font-medium">BTC</div>
                  <div className="text-center font-medium">LINK</div>
                  <div className="text-center font-medium">UNI</div>
                </div>
                {[
                  { asset: 'ETH', values: [1.0, 0.75, 0.82, 0.68] },
                  { asset: 'BTC', values: [0.75, 1.0, 0.65, 0.58] },
                  { asset: 'LINK', values: [0.82, 0.65, 1.0, 0.72] },
                  { asset: 'UNI', values: [0.68, 0.58, 0.72, 1.0] }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 gap-2 text-sm">
                    <div className="font-medium">{row.asset}</div>
                    {row.values.map((val, j) => (
                      <div key={j} className={`text-center p-2 rounded ${val > 0.7 ? 'bg-red-100 text-red-800' : val > 0.5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {val.toFixed(2)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('scenarioAnalysis')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { scenario: t('bearMarket'), impact: '-35%', probability: '15%', color: 'text-red-600' },
                  { scenario: t('normalCorrection'), impact: '-15%', probability: '35%', color: 'text-yellow-600' },
                  { scenario: t('bullMarket'), impact: '+45%', probability: '25%', color: 'text-green-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.scenario}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('probability')}: {item.probability}</div>
                    </div>
                    <div className={`text-lg font-bold ${item.color}`}>
                      {item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('riskRecommendations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    action: t('diversifyExposure'), 
                    priority: t('priority'), 
                    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                  },
                  { 
                    action: t('increaseStablecoins'), 
                    priority: t('priority'), 
                    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' 
                  },
                  { 
                    action: t('implementStopLoss'), 
                    priority: t('priority'), 
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.action}</div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${item.color}`}>
                        {item.priority}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      {t('apply')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? t('loading') : t('refresh')}
          </Button>
        </div>
      </div>
    </div>
  );
} 