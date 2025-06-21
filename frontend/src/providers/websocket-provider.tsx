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

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error' | 'disabled';
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket deve ser usado dentro de WebSocketProvider');
  }
  return context;
}

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error' | 'disabled'>('disconnected');
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3; // Reduzido para evitar spam

  // Verificar se está em modo de desenvolvimento sem backend
  const isDevModeWithoutBackend = process.env.NODE_ENV === 'development' && 
    process.env.NEXT_PUBLIC_DEV_MODE === 'true';

  const connectSocket = () => {
    // Se estiver em modo dev sem backend, não conectar
    if (isDevModeWithoutBackend) {
      setConnectionStatus('disabled');
      console.log('WebSocket desabilitado - modo desenvolvimento');
      return null;
    }

    setConnectionStatus('connecting');
    
    const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8001', {
      transports: ['websocket', 'polling'],
      timeout: 5000, // Timeout reduzido
      retries: 2,
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: maxReconnectAttempts,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setConnectionStatus('connected');
      reconnectAttempts.current = 0;
      console.log('WebSocket conectado');
      
      toast.success('Conectado ao servidor em tempo real', {
        description: 'Dados atualizados automaticamente',
      });
    });

    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      console.log('WebSocket desconectado:', reason);
      
      if (reason === 'io server disconnect') {
        // Server forçou desconexão, reconectar
        newSocket.connect();
      }
    });

    newSocket.on('connect_error', (error) => {
      setConnectionStatus('error');
      console.warn('WebSocket não disponível (modo desenvolvimento):', error.message);
      
      reconnectAttempts.current += 1;
      
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        console.log('WebSocket indisponível - funcionando offline');
        setConnectionStatus('disabled');
      }
    });

    // Event listeners para dados em tempo real
    newSocket.on('portfolio:update', (data) => {
      console.log('Portfolio atualizado:', data);
    });

    newSocket.on('market:price', (data) => {
      console.log('Preço atualizado:', data);
    });

    newSocket.on('risk:alert', (data) => {
      console.log('Alerta de risco:', data);
      toast.warning('Alerta de Risco', {
        description: data.message,
      });
    });

    newSocket.on('automation:executed', (data) => {
      console.log('Automação executada:', data);
      toast.info('Automação Executada', {
        description: `${data.type}: ${data.status}`,
      });
    });

    setSocket(newSocket);

    return newSocket;
  };

  useEffect(() => {
    if (isDevModeWithoutBackend) {
      setConnectionStatus('disabled');
      console.log('WebSocket desabilitado para desenvolvimento frontend-only');
      return;
    }

    const newSocket = connectSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [isDevModeWithoutBackend]);

  const value = {
    socket,
    isConnected,
    connectionStatus,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
} 