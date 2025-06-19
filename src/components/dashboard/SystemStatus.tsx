'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useAppStore } from '@/store';
import { apiService } from '@/services/api';
import { webSocketService } from '@/services/websocket';

export function SystemStatus() {
  const { systemStatus, setSystemStatus, wsConnected } = useAppStore();
  const [isChecking, setIsChecking] = useState(false);

  const checkSystemHealth = async () => {
    setIsChecking(true);
    
    try {
      const [backendHealth, elizaosHealth] = await Promise.all([
        apiService.checkBackendHealth(),
        apiService.checkElizaosHealth(),
      ]);

      setSystemStatus({
        status: backendHealth && elizaosHealth && wsConnected ? 'healthy' : 'degraded',
        services: {
          backend: backendHealth,
          elizaos: elizaosHealth,
          chromia: true, // Assumindo funcionando por enquanto
          websocket: wsConnected,
        },
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Health check failed:', error);
      setSystemStatus({
        status: 'error',
        services: {
          backend: false,
          elizaos: false,
          chromia: false,
          websocket: false,
        },
        timestamp: new Date(),
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [wsConnected]);

  const getStatusColor = () => {
    switch (systemStatus.status) {
      case 'healthy':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (systemStatus.status) {
      case 'healthy':
        return 'Operacional';
      case 'degraded':
        return 'Degradado';
      case 'error':
        return 'Erro';
      default:
        return 'Verificando...';
    }
  };

  const servicesCount = Object.values(systemStatus.services);
  const healthyServices = servicesCount.filter(Boolean).length;
  const totalServices = servicesCount.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className="text-sm font-medium text-gray-700">
            Status do Sistema
          </span>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={checkSystemHealth}
                disabled={isChecking}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verificar status dos serviços</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{getStatusText()}</span>
          <span className="text-gray-500">
            {healthyServices}/{totalServices}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center space-x-1">
            {systemStatus.services.backend ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <span className="text-gray-600">Backend</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {systemStatus.services.elizaos ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <span className="text-gray-600">ElizaOS</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {systemStatus.services.chromia ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <span className="text-gray-600">Chromia</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {systemStatus.services.websocket ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <span className="text-gray-600">WebSocket</span>
          </div>
        </div>
      </div>

      {systemStatus.status !== 'healthy' && (
        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
          {systemStatus.status === 'degraded' 
            ? 'Alguns serviços podem estar indisponíveis' 
            : 'Sistema com problemas. Verifique as conexões.'}
        </div>
      )}
    </div>
  );
} 