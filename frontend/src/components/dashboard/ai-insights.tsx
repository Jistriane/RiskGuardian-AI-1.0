'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { t } = useI18n();

  useEffect(() => {
    // Simular insights de IA
    const generateInsights = (): AIInsight[] => {
      const insightTemplates = [
        {
          type: 'opportunity' as const,
          title: t.dashboard.dcaOpportunity,
          description: 'ETH está 12% abaixo da média móvel de 30 dias. Considere aumentar posição.',
          confidence: Math.floor(Math.random() * 30) + 70,
          priority: 'medium' as const
        },
        {
          type: 'risk' as const,
          title: t.dashboard.highCorrelationDetected,
          description: 'Portfolio com 85% de correlação. Diversificação recomendada.',
          confidence: Math.floor(Math.random() * 20) + 80,
          priority: 'high' as const
        },
        {
          type: 'recommendation' as const,
          title: t.dashboard.rebalancingSuggested,
          description: 'Altcoins superaram alocação alvo em 15%. Considere rebalancear.',
          confidence: Math.floor(Math.random() * 25) + 65,
          priority: 'medium' as const
        },
        {
          type: 'alert' as const,
          title: t.dashboard.volatilityIncreasing,
          description: 'VIX cripto subiu 23% nas últimas 6h. Prepare estratégias defensivas.',
          confidence: Math.floor(Math.random() * 15) + 85,
          priority: 'high' as const
        },
        {
          type: 'opportunity' as const,
          title: t.dashboard.yieldFarming,
          description: 'Pool USDC-ETH oferece 8.5% APY com baixo risco de perda impermanente.',
          confidence: Math.floor(Math.random() * 20) + 70,
          priority: 'low' as const
        }
      ];

      return insightTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 3)
        .map((template, index) => ({
          id: index.toString(),
          ...template,
          timestamp: new Date(Date.now() - Math.random() * 3600000)
        }));
    };

    const updateInsights = () => {
      setInsights(generateInsights());
      setLastUpdate(new Date());
    };

    updateInsights();
    const interval = setInterval(updateInsights, 45000);
    return () => clearInterval(interval);
  }, [t]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'risk': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'recommendation': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'alert': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'alert': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return t.dashboard.highPriority;
      case 'medium': return t.dashboard.mediumPriority;
      case 'low': return t.dashboard.lowPriority;
      default: return 'Normal';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            {t.dashboard.aiInsights}
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
          {insights.map((insight) => (
            <div key={insight.id} className={`p-3 rounded-lg border ${getTypeColor(insight.type)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(insight.type)}
                  <span className="font-medium">{insight.title}</span>
                </div>
                <div className="flex flex-col items-end text-xs">
                  <span className={`font-medium ${getPriorityColor(insight.priority)}`}>
                    {getPriorityText(insight.priority)}
                  </span>
                  <span className="text-gray-500">
                    {insight.confidence}% {t.dashboard.confidence}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
              <div className="text-xs text-gray-500">
                {insight.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })} • Análise por IA
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">{t.dashboard.elizaosAiActive}</span>
            </div>
            <p className="text-xs text-gray-300">
              Analisando {insights.length} insights em tempo real. 
              Próxima análise em 45 segundos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 