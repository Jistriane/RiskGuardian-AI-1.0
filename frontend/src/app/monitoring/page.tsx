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
import { Monitor, AlertTriangle, CheckCircle, Clock, Zap, Activity, Bell, Settings, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';

interface SystemAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
  acknowledged: boolean;
  resolved: boolean;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  target: number;
  history: { time: string; value: number }[];
}

export default function MonitoringPage() {
  const { portfolio, riskMetrics, marketData, isConnected } = useRealTimeData();
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Gas Price Spike Detectado',
      message: 'Gas price aumentou para 120 gwei, 400% acima da média.',
      timestamp: new Date(Date.now() - 300000),
      source: 'Gas Tracker',
      acknowledged: false,
      resolved: false
    },
    {
      id: '2',
      type: 'critical',
      title: 'Oracle Price Deviation',
      message: 'Chainlink ETH/USD está 2.1% diferente do preço de mercado.',
      timestamp: new Date(Date.now() - 600000),
      source: 'Price Oracle',
      acknowledged: true,
      resolved: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Successful Hedge Execution',
      message: 'Hedge automation executado com sucesso para posição ETH.',
      timestamp: new Date(Date.now() - 900000),
      source: 'Automation System',
      acknowledged: true,
      resolved: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'High Portfolio Volatility',
      message: 'Volatilidade do portfólio aumentou para 85%, acima do limite de 80%.',
      timestamp: new Date(Date.now() - 1200000),
      source: 'Risk Monitor',
      acknowledged: false,
      resolved: false
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: 'Uptime',
      value: 99.97,
      unit: '%',
      status: 'healthy',
      target: 99.9,
      history: Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        value: 99.5 + Math.random() * 0.5
      }))
    },
    {
      name: 'Response Time',
      value: 45,
      unit: 'ms',
      status: 'healthy',
      target: 100,
      history: Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        value: 30 + Math.random() * 40
      }))
    },
    {
      name: 'Transaction Success',
      value: 98.5,
      unit: '%',
      status: 'healthy',
      target: 95,
      history: Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        value: 95 + Math.random() * 5
      }))
    },
    {
      name: 'Gas Efficiency',
      value: 87,
      unit: '%',
      status: 'warning',
      target: 90,
      history: Array.from({ length: 24 }, (_, i) => ({
        time: `${23 - i}h`,
        value: 80 + Math.random() * 15
      }))
    }
  ]);

  const [selectedMetric, setSelectedMetric] = useState<string>('Uptime');
  const [filterAlerts, setFilterAlerts] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simular novas métricas
        setSystemMetrics(prev => prev.map(metric => ({
          ...metric,
          value: metric.name === 'Response Time' ? 
            30 + Math.random() * 40 :
            metric.value + (Math.random() - 0.5) * 2,
          history: [
            ...metric.history.slice(1),
            {
              time: 'now',
              value: metric.name === 'Response Time' ? 
                30 + Math.random() * 40 :
                metric.value + (Math.random() - 0.5) * 2
            }
          ]
        })));

        // Simular novos alertas ocasionalmente
        if (Math.random() < 0.1) {
          const newAlert: SystemAlert = {
            id: Date.now().toString(),
            type: ['info', 'warning', 'critical'][Math.floor(Math.random() * 3)] as any,
            title: 'Novo Evento do Sistema',
            message: 'Um novo evento foi detectado pelo sistema de monitoramento.',
            timestamp: new Date(),
            source: 'System Monitor',
            acknowledged: false,
            resolved: false
          };
          setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-900/20 border-red-800/50';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-800/50';
      case 'info':
        return 'bg-blue-900/20 border-blue-800/50';
      case 'success':
        return 'bg-green-900/20 border-green-800/50';
      default:
        return 'bg-gray-900/20 border-gray-800/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterAlerts === 'all') return true;
    if (filterAlerts === 'unresolved') return !alert.resolved;
    if (filterAlerts === 'critical') return alert.type === 'critical';
    return alert.type === filterAlerts;
  });

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.resolved).length;
  const warningAlerts = alerts.filter(alert => alert.type === 'warning' && !alert.resolved).length;
  const healthyMetrics = systemMetrics.filter(metric => metric.status === 'healthy').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {t('monitoringTitle')}
            </h1>
            <p className="text-gray-400">
              {t('monitoringSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={autoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">
                Sistema Saudável
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{healthyMetrics}</div>
              <p className="text-xs text-green-200">
                de {systemMetrics.length} métricas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-600 to-red-700 border-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-100">
                Alertas Críticos
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{criticalAlerts}</div>
              <p className="text-xs text-red-200">
                Requer atenção imediata
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-100">
                Avisos
              </CardTitle>
              <Bell className="h-4 w-4 text-yellow-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{warningAlerts}</div>
              <p className="text-xs text-yellow-200">
                Monitoramento necessário
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                Uptime
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">99.97%</div>
              <p className="text-xs text-blue-200">
                Últimas 24h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Metrics */}
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Monitor className="h-5 w-5" />
              Métricas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {systemMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMetric === metric.name 
                      ? 'border-blue-500 bg-blue-900/20' 
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedMetric(metric.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{metric.name}</h3>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value.toFixed(metric.name === 'Response Time' ? 0 : 1)}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-400">
                    Target: {metric.target}{metric.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Metric History Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={systemMetrics.find(m => m.name === selectedMetric)?.history || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <Bell className="h-5 w-5" />
                Alertas e Notificações
              </CardTitle>
              <div className="flex gap-2">
                {['all', 'critical', 'warning', 'unresolved'].map((filter) => (
                  <Button
                    key={filter}
                    variant={filterAlerts === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterAlerts(filter)}
                  >
                    {filter === 'all' ? 'Todos' :
                     filter === 'critical' ? 'Críticos' :
                     filter === 'warning' ? 'Avisos' : 'Não Resolvidos'}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                    alert.resolved ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h3 className="font-semibold text-white">{alert.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{alert.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>Fonte: {alert.source}</span>
                          <span>{alert.timestamp.toLocaleString('pt-BR')}</span>
                          {alert.acknowledged && (
                            <span className="text-blue-400">• Reconhecido</span>
                          )}
                          {alert.resolved && (
                            <span className="text-green-400">• Resolvido</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Reconhecer
                        </Button>
                      )}
                      {!alert.resolved && (
                        <Button
                          size="sm"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          Resolver
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAlerts.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <p>Nenhum alerta encontrado para os filtros selecionados</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Services Status */}
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5" />
              Status dos Serviços
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Blockchain RPC', status: 'operational', latency: '45ms' },
                { name: 'Price Oracles', status: 'operational', latency: '120ms' },
                { name: 'Automation Engine', status: 'operational', latency: '89ms' },
                { name: 'Risk Calculator', status: 'degraded', latency: '340ms' },
                { name: 'Alert System', status: 'operational', latency: '67ms' },
                { name: 'Database', status: 'operational', latency: '23ms' }
              ].map((service, index) => (
                <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{service.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${
                      service.status === 'operational' ? 'bg-green-500 animate-pulse' :
                      service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={`${
                      service.status === 'operational' ? 'text-green-400' :
                      service.status === 'degraded' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {service.status === 'operational' ? 'Operacional' :
                       service.status === 'degraded' ? 'Degradado' : 'Indisponível'}
                    </span>
                    <span className="text-gray-400">{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 