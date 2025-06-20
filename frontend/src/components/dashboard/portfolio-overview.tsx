'use client';

import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useTranslation } from '@/hooks/useTranslation';
import { useClientTime } from '@/hooks/useClientTime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, Shield, AlertTriangle } from 'lucide-react';

function formatCurrency(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

function getRiskColor(score: number): string {
  if (score < 30) return 'text-green-500';
  if (score < 60) return 'text-yellow-500';
  return 'text-red-500';
}

export function PortfolioOverview() {
  const { data: realTimeData, isConnected } = useRealTimeData();
  const { t } = useTranslation();
  const { formatTime } = useClientTime();

  // Dados simulados para o portfolio
  const portfolio = {
    totalValue: '25750.42',
    lastUpdate: new Date(),
    assets: [
      { symbol: 'ETH', balance: '5.5', value: '12925.48', price: realTimeData?.prices?.ETH || 2350.45 },
      { symbol: 'USDC', balance: '8500', value: '8500.00', price: realTimeData?.prices?.USDC || 1.00 },
      { symbol: 'LINK', balance: '300', value: '4296.00', price: realTimeData?.prices?.LINK || 14.32 },
      { symbol: 'AAVE', balance: '32.5', value: '2907.12', price: realTimeData?.prices?.AAVE || 89.45 }
    ]
  };

  // Dados simulados de métricas de risco
  const riskMetrics = {
    portfolioRisk: 35,
    diversification: 75,
    liquidityRisk: 25,
    smartContractRisk: 15
  };

  const address = '0xfe36...6f8a'; // Simulado

  const getRiskLevel = (score: number): string => {
    if (score < 30) return t('lowRisk');
    if (score < 60) return t('mediumRisk');
    return t('highRisk');
  };

  if (!isConnected) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {t('portfolioOverview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {t('walletNotConnected')}
              </h3>
              <p className="text-gray-400 mb-4">
                {t('connectToViewPortfolio')}
              </p>
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-lg text-blue-400 text-sm">
                🔗 Use o botão "{t('connectWallet')}" no menu lateral
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
      <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              <span className="text-white">{t('portfolioRealTime')}</span>
            </div>
            <div className="text-xs text-gray-400">
              📍 {address}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{t('lastUpdate')}</span>
            <span className="text-sm font-medium text-gray-300">{formatTime(portfolio.lastUpdate)}</span>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">{t('totalValue')}</span>
              <div className="text-right">
                <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
                <div className="text-sm text-green-400 font-medium">+2.4% hoje</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/40 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Score de Risco</div>
              <div className="text-lg font-bold text-white">{riskMetrics.portfolioRisk}/100</div>
              <div className="text-xs text-orange-400">Risco Médio</div>
            </div>
            
            <div className="bg-gray-800/40 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Diversificação</div>
              <div className="text-lg font-bold text-white">{riskMetrics.diversification}%</div>
              <div className="text-xs text-green-400">
                {riskMetrics.diversification > 70 ? 'Bem Diversificado' : 'Concentrado'}
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
              {t('assets')} ({portfolio.assets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolio.assets.map((asset, index) => {
                const allocation = (parseFloat(asset.value) / totalValue) * 100;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {asset.symbol === 'ETH' && '🔷'}
                          {asset.symbol === 'USDC' && '💰'}
                          {asset.symbol === 'LINK' && '🔗'}
                          {asset.symbol === 'AAVE' && '👻'}
                          {!['ETH', 'USDC', 'LINK', 'AAVE'].includes(asset.symbol) && '💎'}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{asset.symbol}</div>
                        <div className="text-sm text-gray-400">
                          {asset.balance} {asset.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        {formatCurrency(asset.value)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {allocation.toFixed(1)}% do Portfolio
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
              Nenhum Ativo Encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-400 mb-4">
                Nenhum ativo encontrado na carteira conectada
              </p>
              <div className="text-sm text-gray-500">
                Certifique-se de que sua carteira contém ETH, USDC ou LINK
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertas Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMetrics.portfolioRisk > 70 && (
                <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-red-400">
                        Alto Risco Detectado
                      </h4>
                      <p className="text-sm text-red-300 mt-1">
                        Score de Risco: {riskMetrics.portfolioRisk}/100
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Considere diversificar seu portfolio para reduzir o risco
                  </p>
                </div>
              )}
              
              {riskMetrics.diversification < 50 && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-yellow-400">
                        Portfolio Concentrado
                      </h4>
                      <p className="text-sm text-yellow-300 mt-1">
                        Diversificação: {riskMetrics.diversification}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Adicione mais ativos para melhorar a diversificação
                  </p>
                </div>
              )}

              {/* Se não há alertas ativos, mostrar mensagem organizada */}
              {riskMetrics.portfolioRisk <= 70 && riskMetrics.diversification >= 50 && hasAssets && (
                <div className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <h4 className="text-base font-semibold text-green-400">
                      Nenhum Alerta Ativo
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">Risco</div>
                        <div className="text-lg font-bold text-green-400">{riskMetrics.portfolioRisk}/100</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400 mb-1">Diversificação</div>
                        <div className="text-lg font-bold text-green-400">{riskMetrics.diversification}%</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <p className="text-sm text-gray-300 text-center leading-relaxed">
                        Todas as métricas estão dentro dos parâmetros normais
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card de Performance melhorado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Performance 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                <span className="text-xs font-medium text-gray-300">Valor Inicial</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(totalValue * 0.976)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                <span className="text-xs font-medium text-gray-300">Valor Atual</span>
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(totalValue)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-900/20 border border-green-800/30 rounded-lg">
                <span className="text-xs font-medium text-gray-300">Variação</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-sm font-bold text-green-400">+2.4%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-900/20 border border-green-800/30 rounded-lg">
                <span className="text-xs font-medium text-gray-300">P&L (24h)</span>
                <span className="text-sm font-bold text-green-400">
                  +{formatCurrency(totalValue * 0.024)}
                </span>
              </div>
              
              {/* Informações adicionais */}
              <div className="mt-3 p-2 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <div className="text-xs text-blue-400 font-medium mb-1">
                  📊 Resumo do Portfolio
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">
                    Ativos: <span className="text-white font-medium">{portfolio.assets.length}</span>
                  </div>
                  <div className="text-gray-400">
                    Risco: <span className={`font-medium ${getRiskColor(riskMetrics.portfolioRisk)}`}>
                      {riskMetrics.portfolioRisk}/100
                    </span>
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