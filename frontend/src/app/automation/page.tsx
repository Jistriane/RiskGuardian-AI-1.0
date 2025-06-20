'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Zap, Settings, Shield, TrendingDown, RotateCcw, Play, Pause, AlertTriangle, CheckCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface AutomationRule {
  id: string;
  name: string;
  type: 'hedge' | 'stop_loss' | 'rebalance' | 'insurance';
  status: 'active' | 'paused' | 'inactive';
  trigger: string;
  action: string;
  lastTriggered?: Date;
  timesTriggered: number;
  conditions: {
    asset?: string;
    threshold?: number;
    percentage?: number;
  };
}

export default function AutomationPage() {
  const { portfolio, riskMetrics, marketData, isConnected } = useRealTimeData();
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Hedge ETH Volatilidade',
      type: 'hedge',
      status: 'active',
      trigger: 'Volatilidade ETH > 8%',
      action: 'Comprar PUT options',
      lastTriggered: new Date(Date.now() - 3600000),
      timesTriggered: 3,
      conditions: { asset: 'ETH', threshold: 8, percentage: 20 }
    },
    {
      id: '2', 
      name: 'Stop Loss Portfolio',
      type: 'stop_loss',
      status: 'active',
      trigger: 'Perda total > 15%',
      action: 'Vender 50% dos ativos',
      timesTriggered: 0,
      conditions: { threshold: 15, percentage: 50 }
    },
    {
      id: '3',
      name: 'Rebalanceamento Semanal',
      type: 'rebalance',
      status: 'active',
      trigger: 'Toda segunda-feira',
      action: 'Rebalancear para 60/40 ETH/USDC',
      lastTriggered: new Date(Date.now() - 86400000 * 3),
      timesTriggered: 12,
      conditions: { percentage: 60 }
    },
    {
      id: '4',
      name: 'Seguro Smart Contract',
      type: 'insurance',
      status: 'paused',
      trigger: 'Exposição DeFi > 70%',
      action: 'Ativar cobertura de seguro',
      timesTriggered: 1,
      conditions: { threshold: 70, percentage: 100 }
    }
  ]);

  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { t } = useTranslation();

  const toggleRuleStatus = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hedge':
        return <Shield className="h-4 w-4 text-blue-400" />;
      case 'stop_loss':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      case 'rebalance':
        return <RotateCcw className="h-4 w-4 text-purple-400" />;
      case 'insurance':
        return <Shield className="h-4 w-4 text-emerald-400" />;
      default:
        return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  const activeRules = automationRules.filter(rule => rule.status === 'active').length;
  const totalTriggers = automationRules.reduce((sum, rule) => sum + rule.timesTriggered, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('automationTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('automationSubtitle')}
          </p>
        </div>

        {/* Active Automations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Auto Hedge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{t('active')}</span>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  ETH: Proteção contra queda &gt; 5%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                Stop Loss
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{t('active')}</span>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Portfolio: Limite -15%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                {t('rebalancing')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{t('inactive')}</span>
                  <Switch checked={false} onCheckedChange={() => {}} />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Mensal: Última vez 15 dias atrás
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurar Auto Hedge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ativo para Hedge</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option>ETH</option>
                  <option>BTC</option>
                  <option>LINK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Limite de Queda (%)</label>
                <input
                  type="number"
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Valor Máximo para Hedge</label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <Button className="w-full">
                Atualizar Configuração
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurar {t('rebalancing')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Frequência</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option>Semanal</option>
                  <option>Mensal</option>
                  <option>Trimestral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Desvio Mínimo (%)</label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alocação Alvo</label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>ETH</span>
                    <input type="number" placeholder="40" className="w-20 px-2 py-1 border rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BTC</span>
                    <input type="number" placeholder="30" className="w-20 px-2 py-1 border rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LINK</span>
                    <input type="number" placeholder="20" className="w-20 px-2 py-1 border rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>USDC</span>
                    <input type="number" placeholder="10" className="w-20 px-2 py-1 border rounded" />
                  </div>
                </div>
              </div>
              <Button className="w-full">
                Ativar {t('rebalancing')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Histórico de Automações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Hedge', action: 'Executado', asset: 'ETH', amount: '$500', time: '2h atrás', status: 'success' },
                { type: 'Stop Loss', action: 'Acionado', asset: 'BTC', amount: '$200', time: '1d atrás', status: 'warning' },
                { type: 'Rebalance', action: 'Executado', asset: 'Portfolio', amount: '$1,200', time: '15d atrás', status: 'success' },
                { type: 'Hedge', action: 'Falhado', asset: 'LINK', amount: '$300', time: '20d atrás', status: 'error' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'success' ? 'bg-green-500' :
                      item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{item.type} - {item.action}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.asset} • {item.amount}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 