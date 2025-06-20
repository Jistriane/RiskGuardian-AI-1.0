'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';

interface RiskMetric {
  label: string;
  value: number;
  status: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export default function RiskMetrics() {
  const [metrics, setMetrics] = useState<RiskMetric[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { t } = useI18n();

  useEffect(() => {
    // Simular dados de risco em tempo real
    const generateMetrics = (): RiskMetric[] => [
      {
        label: t.dashboard.volatility,
        value: Math.floor(Math.random() * 40) + 20, // 20-60%
        status: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        trend: Math.random() > 0.5 ? 'up' : 'down',
        description: 'Volatilidade do portfolio nas últimas 24h'
      },
      {
        label: t.dashboard.correlation,
        value: Math.floor(Math.random() * 30) + 60, // 60-90%
        status: Math.random() > 0.6 ? 'medium' : 'low',
        trend: Math.random() > 0.6 ? 'stable' : Math.random() > 0.3 ? 'up' : 'down',
        description: 'Correlação entre ativos do portfolio'
      },
      {
        label: t.dashboard.var1Day,
        value: Math.floor(Math.random() * 15) + 5, // 5-20%
        status: Math.random() > 0.8 ? 'high' : 'medium',
        trend: Math.random() > 0.4 ? 'down' : 'up',
        description: 'Value at Risk para 1 dia (95% confiança)'
      },
      {
        label: t.dashboard.sharpeRatio,
        value: parseFloat((Math.random() * 2 + 0.5).toFixed(2)), // 0.5-2.5
        status: Math.random() > 0.7 ? 'low' : 'medium',
        trend: Math.random() > 0.5 ? 'up' : 'stable',
        description: 'Relação risco-retorno ajustada'
      }
    ];

    const updateMetrics = () => {
      setMetrics(generateMetrics());
      setLastUpdate(new Date());
    };

    // Atualizar imediatamente
    updateMetrics();

    // Atualizar a cada 30 segundos
    const interval = setInterval(updateMetrics, 30000);

    return () => clearInterval(interval);
  }, [t]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'stable': return <Activity className="h-4 w-4 text-gray-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return <Shield className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTrendText = (trend: string): string => {
    switch (trend) {
      case 'up': return t.dashboard.up;
      case 'down': return t.dashboard.down;
      case 'stable': return t.dashboard.stable;
      default: return t.dashboard.stable;
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t.dashboard.riskMetrics}
          </span>
          <span className="text-xs text-gray-400">
            {t.dashboard.lastUpdate}: {lastUpdate.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getStatusColor(metric.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <span className="font-medium">{metric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <span className="font-bold">
                    {typeof metric.value === 'number' && metric.value < 10 
                      ? metric.value 
                      : `${metric.value}%`
                    }
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{metric.description}</p>
                <span className="text-xs text-gray-500">
                  {t.dashboard.trend}: {getTrendText(metric.trend)}
                </span>
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Status Geral</span>
            </div>
            <p className="text-xs text-gray-300">
              Portfolio com risco moderado. Monitoramento ativo das métricas em tempo real.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 