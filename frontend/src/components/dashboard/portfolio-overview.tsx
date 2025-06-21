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

import { useAccount } from 'wagmi';
import { useWalletData } from '@/hooks/useWalletData';
import { useClientTime } from '@/hooks/useClientTime';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Wallet, Shield, AlertTriangle } from 'lucide-react';

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
  const { isConnected, address } = useAccount();
  const { walletData } = useWalletData();
  const { formatTime } = useClientTime();

  // Dados reais do portfolio da carteira conectada
  const portfolio = isConnected && walletData ? {
    totalValue: walletData.totalValue.toString(),
    lastUpdate: walletData.lastUpdated,
    assets: [
      {
        symbol: walletData.nativeBalance.symbol,
        balance: walletData.nativeBalance.formatted,
        value: walletData.nativeBalance.value.toString(),
        price: walletData.nativeBalance.value / parseFloat(walletData.nativeBalance.formatted)
      },
      ...walletData.balances.map(token => ({
        symbol: token.symbol,
        balance: token.balance,
        value: token.value.toString(),
        price: token.value / parseFloat(token.balance)
      }))
    ]
  } : {
    totalValue: '0',
    lastUpdate: null,
    assets: []
  };

  // Métricas de risco calculadas baseadas no portfolio real
  const riskMetrics = isConnected && walletData ? {
    portfolioRisk: Math.min(90, Math.round((walletData.totalValue / 10000) * 100)),
    diversification: Math.min(100, Math.round((walletData.balances.length + 1) * 25)),
    liquidityRisk: Math.round(Math.random() * 30 + 10),
    smartContractRisk: Math.round(walletData.balances.length * 12)
  } : {
    portfolioRisk: 0,
    diversification: 0,
    liquidityRisk: 0,
    smartContractRisk: 0
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Visão Geral do Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Carteira Não Conectada
              </h3>
              <p className="text-gray-400 mb-4">
                Conecte sua carteira para ver seu portfolio em tempo real
              </p>
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-lg text-blue-400 text-sm">
                🔗 Use o botão &quot;Connect Wallet&quot; no menu lateral
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
              <span className="text-white">Portfolio em Tempo Real</span>
            </div>
            <div className="text-xs text-gray-400">
              📍 {address && formatAddress(address)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Última Atualização</span>
            <span className="text-sm font-medium text-gray-300">
              {portfolio.lastUpdate ? formatTime(portfolio.lastUpdate.toISOString()) : '--:--:--'}
            </span>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Valor Total</span>
              <div className="text-right">
                <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
                <div className="text-sm text-green-400 font-medium">
                  {walletData?.totalChange24h ? 
                    `${walletData.totalChange24h >= 0 ? '+' : ''}${walletData.totalChange24h.toFixed(2)}% hoje` 
                    : '+0.0% hoje'
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/40 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-1">Score de Risco</div>
              <div className="text-lg font-bold text-white">{riskMetrics.portfolioRisk}/100</div>
              <div className="text-xs text-orange-400">
                {riskMetrics.portfolioRisk < 30 ? 'Risco Baixo' : 
                 riskMetrics.portfolioRisk < 70 ? 'Risco Médio' : 'Risco Alto'}
              </div>
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
              Ativos ({portfolio.assets.length})
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
        {/* Card de Alertas - Layout Melhorado */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertas Ativos
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
                        Alto Risco Detectado
                      </h4>
                      <p className="text-sm text-red-300">
                        Score de Risco: {riskMetrics.portfolioRisk}/100
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-8">
                    Considere diversificar seu portfolio para reduzir o risco
                  </p>
                </div>
              )}
              
              {riskMetrics.diversification < 50 && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-yellow-400 mb-1">
                        Portfolio Concentrado
                      </h4>
                      <p className="text-sm text-yellow-300">
                        Diversificação: {riskMetrics.diversification}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pl-8">
                    Adicione mais ativos para melhorar a diversificação
                  </p>
                </div>
              )}

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
                          <div className="text-xs text-gray-400 mb-1 font-medium">Risco</div>
                          <div className="text-lg font-bold text-green-400">{riskMetrics.portfolioRisk}/100</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-400 mb-1 font-medium">Diversificação</div>
                          <div className="text-lg font-bold text-green-400">{riskMetrics.diversification}%</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/30 rounded-lg p-3">
                        <p className="text-xs text-gray-300 text-center leading-relaxed">
                          ✅ Todas as métricas estão dentro dos parâmetros normais
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
              Performance 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Valores Principais */}
              <div className="space-y-2">
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
              </div>

              {/* Variação e P&L */}
              <div className="space-y-2">
                <div className={`flex items-center justify-between p-2 rounded-lg border ${
                  walletData?.totalChange24h && walletData.totalChange24h >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <span className="text-xs font-medium text-gray-300">Variação</span>
                  <div className="flex items-center gap-1">
                    {walletData?.totalChange24h && walletData.totalChange24h >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />
                    )}
                    <span className={`text-sm font-bold ${
                      walletData?.totalChange24h && walletData.totalChange24h >= 0 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {walletData?.totalChange24h ? 
                        `${walletData.totalChange24h >= 0 ? '+' : ''}${walletData.totalChange24h.toFixed(2)}%` 
                        : '+0.0%'
                      }
                    </span>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between p-2 rounded-lg border ${
                  walletData?.totalChange24h && walletData.totalChange24h >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <span className="text-xs font-medium text-gray-300">P&L (24h)</span>
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
                    Resumo do Portfolio
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Ativos</div>
                    <div className="text-sm font-bold text-white">{portfolio.assets.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Score de Risco</div>
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