/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Componente de status de monitoramento em tempo real
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface MonitoringStatusProps {
  systemUptime: number;
  responseTime: number;
  activeAlerts: number;
  healthyServices: number;
  totalServices: number;
  lastUpdated?: Date;
  onRefresh?: () => void;
}

export function RealTimeStatus({
  systemUptime,
  responseTime,
  activeAlerts,
  healthyServices,
  totalServices,
  lastUpdated,
  onRefresh
}: MonitoringStatusProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const getSystemStatus = () => {
    if (activeAlerts === 0 && healthyServices === totalServices) {
      return { color: 'text-green-400', status: 'Saudável', icon: CheckCircle };
    }
    if (activeAlerts > 0 && healthyServices >= totalServices * 0.8) {
      return { color: 'text-yellow-400', status: 'Atenção', icon: AlertTriangle };
    }
    return { color: 'text-red-400', status: 'Crítico', icon: AlertTriangle };
  };

  const systemStatus = getSystemStatus();
  const StatusIcon = systemStatus.icon;

  return (
    <Card className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-blue-400" />
            Status do Sistema
            <Badge className="bg-green-900/20 border-green-800/30 text-green-400 text-xs">
              🟢 Tempo Real
            </Badge>
          </CardTitle>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Status Geral</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <StatusIcon className={`h-4 w-4 ${systemStatus.color}`} />
              <span className={`text-sm font-bold ${systemStatus.color}`}>
                {systemStatus.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {healthyServices}/{totalServices} serviços
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Uptime</div>
            <div className="text-sm font-bold text-white">
              {systemUptime.toFixed(2)}%
            </div>
            <div className="text-xs text-green-400">
              {systemUptime >= 99.9 ? '✅ Excelente' : systemUptime >= 99 ? '⚠️ Bom' : '❌ Crítico'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Resposta</div>
            <div className="text-sm font-bold text-white">
              {Math.round(responseTime)}ms
            </div>
            <div className="text-xs text-blue-400">
              {responseTime < 100 ? '⚡ Rápido' : responseTime < 300 ? '⏱️ Normal' : '🐌 Lento'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Alertas Ativos</div>
            <div className="text-sm font-bold text-white">
              {activeAlerts}
            </div>
            <div className={`text-xs ${activeAlerts === 0 ? 'text-green-400' : 'text-red-400'}`}>
              {activeAlerts === 0 ? '✅ Limpo' : '🚨 Atenção'}
            </div>
          </div>
        </div>

        {lastUpdated && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
