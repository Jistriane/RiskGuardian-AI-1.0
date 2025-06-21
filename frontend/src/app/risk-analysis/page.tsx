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
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  RefreshCw,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';

export default function RiskAnalysisPage() {
  const { t } = useTranslation();
  const { data, loading, error, lastUpdate, refresh, isRealTime } = useRealTimeData(5000); // Atualiza a cada 5 segundos

  if (loading && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-lg">{t('loading')}</span>
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
            Tentar Novamente
          </Button>
          </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Nenhum dado disponível</p>
            </div>
      </DashboardLayout>
    );
  }

  const riskMetrics = data.riskMetrics;
  const portfolio = data.portfolio;

  // Calcular nível de risco baseado na volatilidade
  const getRiskLevel = (volatility: number) => {
    if (volatility < 20) return { level: 'Baixo', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (volatility < 50) return { level: 'Médio', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    return { level: 'Alto', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const riskLevel = getRiskLevel(riskMetrics.volatility);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Análise de Risco</h1>
            <div className="flex items-center gap-2 mt-2">
              {isRealTime && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Tempo Real
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
            {t('refresh')}
          </Button>
        </div>

        {/* Risk Level Overview */}
        <Card className={`p-6 ${riskLevel.bgColor} ${riskLevel.borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${riskLevel.bgColor}`}>
                {riskLevel.level === 'Baixo' ? (
                  <Shield className={`h-6 w-6 ${riskLevel.color}`} />
                ) : riskLevel.level === 'Médio' ? (
                  <AlertTriangle className={`h-6 w-6 ${riskLevel.color}`} />
                ) : (
                  <AlertTriangle className={`h-6 w-6 ${riskLevel.color}`} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">Nível de Risco</h2>
                <p className={`text-2xl font-bold ${riskLevel.color}`}>
                  {riskLevel.level}
                </p>
                <p className="text-sm text-muted-foreground">
                  Baseado na volatilidade atual de {formatPercentage(riskMetrics.volatility)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Valor do Portfolio</p>
              <p className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</p>
            </div>
          </div>
        </Card>

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Volatilidade
                </p>
                <p className="text-2xl font-bold">
                  {formatPercentage(riskMetrics.volatility)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Anualizada
                </p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  VaR (95%)
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(riskMetrics.var95)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Máxima perda esperada
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Sharpe Ratio
                </p>
                <p className={`text-2xl font-bold ${
                  riskMetrics.sharpeRatio > 1 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {riskMetrics.sharpeRatio.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Retorno/Risco
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Beta
                </p>
                <p className="text-2xl font-bold">
                  {riskMetrics.beta.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Correlação com mercado
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Exposição por Ativo</h3>
              <div className="space-y-4">
              {portfolio.assets.map((asset) => {
                const allocation = (asset.value / portfolio.totalValue) * 100;
                const risk = allocation > 50 ? 'Alto' : allocation > 25 ? 'Médio' : 'Baixo';
                const riskColor = risk === 'Alto' ? 'text-red-600' : 
                                 risk === 'Médio' ? 'text-yellow-600' : 'text-green-600';
                
                return (
                  <div key={asset.symbol} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {asset.symbol.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(asset.value)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPercentage(allocation)}</p>
                      <p className={`text-sm ${riskColor}`}>
                        Risco {risk}
                      </p>
                    </div>
                  </div>
                );
              })}
              </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Métricas de Performance</h3>
              <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Max Drawdown</span>
                <span className="text-red-600 font-semibold">
                  {formatPercentage(riskMetrics.maxDrawdown)}
                </span>
                </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Mudança 24h</span>
                <span className={`font-semibold ${
                  portfolio.totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {portfolio.totalChange24h >= 0 ? '+' : ''}{formatCurrency(portfolio.totalChange24h)}
                </span>
                      </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Performance %</span>
                <span className={`font-semibold ${
                  portfolio.totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage((portfolio.totalChange24h / portfolio.totalValue) * 100)}
                </span>
                  </div>

              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Diversificação</span>
                <span className="font-semibold">
                  {portfolio.assets.length} ativos
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Risk Recommendations */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recomendações de Risco</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskMetrics.volatility > 50 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">Alta Volatilidade</span>
                    </div>
                <p className="text-sm text-red-700">
                  Considere diversificar mais seu portfolio para reduzir a volatilidade.
                </p>
                    </div>
            )}
            
            {riskMetrics.sharpeRatio < 1 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Baixo Sharpe Ratio</span>
                  </div>
                <p className="text-sm text-yellow-700">
                  O retorno ajustado ao risco pode ser melhorado.
                </p>
              </div>
            )}
            
            {portfolio.assets.length < 3 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Diversificação</span>
                </div>
                <p className="text-sm text-blue-700">
                  Adicione mais ativos para melhor diversificação de risco.
                </p>
                    </div>
            )}
            
            {riskMetrics.volatility < 30 && riskMetrics.sharpeRatio > 1.5 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Boa Performance</span>
                  </div>
                <p className="text-sm text-green-700">
                  Seu portfolio está bem balanceado em termos de risco-retorno.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Real-time Data Indicator */}
        {isRealTime && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-green-800">
                Análise de risco em tempo real - Atualizando a cada 5 segundos
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