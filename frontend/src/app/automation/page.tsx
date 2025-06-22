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
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Zap, Settings, Shield, TrendingDown, RotateCcw, Play, Pause, AlertTriangle, CheckCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/contexts/i18n-context';

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
  const { t } = useI18n();

  // Estados para configurações
  const [hedgeConfig, setHedgeConfig] = useState({
    asset: 'ETH',
    dropLimit: 5,
    maxValue: 1000
  });

  const [rebalanceConfig, setRebalanceConfig] = useState({
    frequency: 'Semanal',
    minDeviation: 10,
    allocation: {
      ETH: 40,
      BTC: 30,
      LINK: 20,
      USDC: 10
    }
  });

  const [switchStates, setSwitchStates] = useState({
    autoHedge: true,
    stopLoss: true,
    rebalancing: false
  });

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
{t.automation.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t.automation.subtitle}
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
                  <span className="text-sm">{switchStates.autoHedge ? t.common.active : t.common.inactive}</span>
                  <Switch 
                    checked={switchStates.autoHedge} 
                    onCheckedChange={(checked) => setSwitchStates(prev => ({...prev, autoHedge: checked}))} 
                  />
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
                  <span className="text-sm">{switchStates.stopLoss ? t.common.active : t.common.inactive}</span>
                  <Switch 
                    checked={switchStates.stopLoss} 
                    onCheckedChange={(checked) => setSwitchStates(prev => ({...prev, stopLoss: checked}))} 
                  />
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
{t.automation.rebalancing}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{switchStates.rebalancing ? t.common.active : t.common.inactive}</span>
                  <Switch 
                    checked={switchStates.rebalancing} 
                    onCheckedChange={(checked) => setSwitchStates(prev => ({...prev, rebalancing: checked}))} 
                  />
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
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  value={hedgeConfig.asset}
                  onChange={(e) => setHedgeConfig(prev => ({...prev, asset: e.target.value}))}
                  title="Selecionar ativo para hedge"
                >
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="LINK">LINK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Limite de Queda (%)</label>
                <input
                  type="number"
                  placeholder="5"
                  value={hedgeConfig.dropLimit}
                  onChange={(e) => setHedgeConfig(prev => ({...prev, dropLimit: Number(e.target.value)}))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Valor Máximo para Hedge</label>
                <input
                  type="number"
                  placeholder="1000"
                  value={hedgeConfig.maxValue}
                  onChange={(e) => setHedgeConfig(prev => ({...prev, maxValue: Number(e.target.value)}))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  console.log('Configuração de hedge atualizada:', hedgeConfig);
                  // Aqui você pode adicionar a lógica para salvar a configuração
                }}
              >
                Atualizar Configuração
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurar {t.automation.rebalancing}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Frequência</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  value={rebalanceConfig.frequency}
                  onChange={(e) => setRebalanceConfig(prev => ({...prev, frequency: e.target.value}))}
                  title="Selecionar frequência de rebalanceamento"
                >
                  <option value="Semanal">Semanal</option>
                  <option value="Mensal">Mensal</option>
                  <option value="Trimestral">Trimestral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Desvio Mínimo (%)</label>
                <input
                  type="number"
                  placeholder="10"
                  value={rebalanceConfig.minDeviation}
                  onChange={(e) => setRebalanceConfig(prev => ({...prev, minDeviation: Number(e.target.value)}))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alocação Alvo</label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>ETH</span>
                    <input 
                      type="number" 
                      placeholder="40" 
                      value={rebalanceConfig.allocation.ETH}
                      onChange={(e) => setRebalanceConfig(prev => ({
                        ...prev, 
                        allocation: {...prev.allocation, ETH: Number(e.target.value)}
                      }))}
                      className="w-20 px-2 py-1 border rounded" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BTC</span>
                    <input 
                      type="number" 
                      placeholder="30" 
                      value={rebalanceConfig.allocation.BTC}
                      onChange={(e) => setRebalanceConfig(prev => ({
                        ...prev, 
                        allocation: {...prev.allocation, BTC: Number(e.target.value)}
                      }))}
                      className="w-20 px-2 py-1 border rounded" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>LINK</span>
                    <input 
                      type="number" 
                      placeholder="20" 
                      value={rebalanceConfig.allocation.LINK}
                      onChange={(e) => setRebalanceConfig(prev => ({
                        ...prev, 
                        allocation: {...prev.allocation, LINK: Number(e.target.value)}
                      }))}
                      className="w-20 px-2 py-1 border rounded" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>USDC</span>
                    <input 
                      type="number" 
                      placeholder="10" 
                      value={rebalanceConfig.allocation.USDC}
                      onChange={(e) => setRebalanceConfig(prev => ({
                        ...prev, 
                        allocation: {...prev.allocation, USDC: Number(e.target.value)}
                      }))}
                      className="w-20 px-2 py-1 border rounded" 
                    />
                  </div>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  console.log('Configuração de rebalanceamento atualizada:', rebalanceConfig);
                  setSwitchStates(prev => ({...prev, rebalancing: true}));
                  // Aqui você pode adicionar a lógica para salvar a configuração
                }}
              >
                Ativar {t.automation.rebalancing}
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