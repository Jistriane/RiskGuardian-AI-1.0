'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Zap, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useI18n } from '@/contexts/i18n-context';

interface AutomationRule {
  id: string;
  name: string;
  type: 'hedge' | 'rebalance' | 'alert' | 'insurance';
  status: 'active' | 'inactive' | 'triggered' | 'error';
  lastExecution: Date;
  nextExecution?: Date;
  description: string;
}

export default function AutomationStatus() {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { t } = useI18n();

  useEffect(() => {
    // Simular regras de automação
    const generateRules = (): AutomationRule[] => [
      {
        id: '1',
        name: t.dashboard.stopLossEth,
        type: 'hedge',
        status: Math.random() > 0.8 ? 'triggered' : 'active',
        lastExecution: new Date(Date.now() - Math.random() * 3600000), // última hora
        nextExecution: new Date(Date.now() + Math.random() * 3600000), // próxima hora
        description: 'Proteção contra queda > 5%'
      },
      {
        id: '2',
        name: t.dashboard.rebalancing,
        type: 'rebalance',
        status: Math.random() > 0.9 ? 'error' : 'active',
        lastExecution: new Date(Date.now() - Math.random() * 86400000), // último dia
        nextExecution: new Date(Date.now() + 86400000), // próximo dia
        description: 'Rebalancear portfolio semanalmente'
      },
      {
        id: '3',
        name: t.dashboard.volatilityAlert,
        type: 'alert',
        status: Math.random() > 0.7 ? 'triggered' : 'active',
        lastExecution: new Date(Date.now() - Math.random() * 1800000), // últimos 30min
        description: 'Alertar se volatilidade > 50%'
      },
      {
        id: '4',
        name: t.dashboard.defiInsurance,
        type: 'insurance',
        status: Math.random() > 0.95 ? 'inactive' : 'active',
        lastExecution: new Date(Date.now() - Math.random() * 7200000), // últimas 2h
        description: 'Cobertura automática para protocolos'
      }
    ];

    const updateRules = () => {
      setRules(generateRules());
      setLastUpdate(new Date());
    };

    // Atualizar imediatamente
    updateRules();

    // Atualizar a cada 15 segundos
    const interval = setInterval(updateRules, 15000);

    return () => clearInterval(interval);
  }, [t]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'triggered': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'inactive': return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
      case 'error': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'triggered': return <Zap className="h-4 w-4" />;
      case 'inactive': return <Clock className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hedge': return '🛡️';
      case 'rebalance': return '⚖️';
      case 'alert': return '🔔';
      case 'insurance': return '🏥';
      default: return '🤖';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t.common.active;
      case 'triggered': return t.dashboard.executed;
      case 'inactive': return t.common.inactive;
      case 'error': return t.dashboard.error;
      default: return 'Desconhecido';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {t.dashboard.automationStatus}
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
          {rules.map((rule) => (
            <div key={rule.id} className={`p-3 rounded-lg border ${getStatusColor(rule.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(rule.type)}</span>
                  <span className="font-medium">{rule.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(rule.status)}
                  <span className="text-sm font-medium">{getStatusText(rule.status)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2">{rule.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {t.dashboard.lastExecution}: {rule.lastExecution.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                {rule.nextExecution && (
                  <span>
                    Próxima: {rule.nextExecution.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Sistema Operacional</span>
            </div>
            <p className="text-xs text-gray-300">
              {rules.filter(r => r.status === 'active').length} de {rules.length} regras ativas. 
              Monitoramento em tempo real ativo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 