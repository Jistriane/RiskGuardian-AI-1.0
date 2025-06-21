/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Componente de status em tempo real
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useAccount } from 'wagmi';

interface RealTimeStatusProps {
  lastUpdated?: Date;
  isLoading?: boolean;
  onRefresh?: () => void;
  totalValue?: number;
  tokensCount?: number;
}

export function RealTimeStatus({ 
  lastUpdated, 
  isLoading, 
  onRefresh,
  totalValue = 0,
  tokensCount = 0
}: RealTimeStatusProps) {
  const { isConnected, chainId } = useAccount();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar tempo atual a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return 'Nunca';
    
    const diff = Math.floor((currentTime.getTime() - lastUpdated.getTime()) / 1000);
    
    if (diff < 10) return 'Agora mesmo';
    if (diff < 60) return `${diff}s atrás`;
    if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
    return `${Math.floor(diff / 3600)}h atrás`;
  };

  const getChainName = (chainId?: number) => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 11155111: return 'Sepolia';
      case 137: return 'Polygon';
      case 42161: return 'Arbitrum';
      default: return 'Desconhecida';
    }
  };

  const isRealTime = lastUpdated && (currentTime.getTime() - lastUpdated.getTime()) < 15000; // Menos de 15 segundos

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-400" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-400" />
          )}
          <span className="text-sm font-medium text-white">
            Status da Carteira
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isRealTime ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
          }`} />
          <span className="text-xs text-gray-400">
            {isRealTime ? 'Tempo Real' : 'Desatualizado'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="text-gray-400">Rede:</div>
          <div className="text-white font-medium">
            {isConnected ? getChainName(chainId) : 'Desconectado'}
          </div>
        </div>
        
        <div>
          <div className="text-gray-400">Tokens:</div>
          <div className="text-white font-medium">
            {tokensCount} encontrados
          </div>
        </div>
        
        <div>
          <div className="text-gray-400">Valor Total:</div>
          <div className="text-white font-medium">
            ${totalValue.toFixed(2)}
          </div>
        </div>
        
        <div>
          <div className="text-gray-400">Última Atualização:</div>
          <div className="text-white font-medium">
            {getTimeSinceUpdate()}
          </div>
        </div>
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-2">
          Atualizado em: {formatTime(lastUpdated)}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-700 pt-2">
        <div className="text-xs text-gray-400">
          Tempo atual: {formatTime(currentTime)}
        </div>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-2">
          <div>🔧 Debug Mode Ativo</div>
          <div>Chain ID: {chainId}</div>
          <div>Connected: {isConnected ? 'Sim' : 'Não'}</div>
          <div>Loading: {isLoading ? 'Sim' : 'Não'}</div>
        </div>
      )}
    </div>
  );
} 