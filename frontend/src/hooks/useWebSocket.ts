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

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { WebSocketMessage, PriceUpdate } from '@/types';
import { usePortfolioStore } from '@/stores/portfolio.store';
import { toast } from 'sonner';

interface UseWebSocketOptions {
  walletAddress?: string;
  autoConnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    walletAddress,
    autoConnect = true,
    reconnectAttempts = 3,
    reconnectDelay = 1000,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  
  const socketRef = useRef<Socket | null>(null);
  const reconnectCountRef = useRef(0);
  const { setPortfolio, updateAsset } = usePortfolioStore();

  const connect = () => {
    if (socketRef.current?.connected) return;

    try {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';
      
      socketRef.current = io(wsUrl, {
        transports: ['websocket'],
        query: walletAddress ? { walletAddress } : {},
        reconnection: false, // We'll handle reconnection manually
      });

      const socket = socketRef.current;

      socket.on('connect', () => {
        setIsConnected(true);
        setConnectionError(null);
        reconnectCountRef.current = 0;
        console.log('WebSocket connected');
      });

      socket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.log('WebSocket disconnected:', reason);
        
        // Auto-reconnect logic
        if (reconnectCountRef.current < reconnectAttempts) {
          setTimeout(() => {
            reconnectCountRef.current++;
            connect();
          }, reconnectDelay * reconnectCountRef.current);
        }
      });

      socket.on('connect_error', (error) => {
        setConnectionError(error.message);
        setIsConnected(false);
        console.error('WebSocket connection error:', error);
      });

      // Handle incoming messages
      socket.on('message', (message: WebSocketMessage) => {
        setLastMessage(message);
        handleMessage(message);
      });

      // Specific event handlers
      socket.on('price_update', (data: PriceUpdate) => {
        handlePriceUpdate(data);
      });

      socket.on('portfolio_update', (portfolio) => {
        setPortfolio(portfolio);
      });

      socket.on('risk_alert', (alert) => {
        toast.warning(alert.title, {
          description: alert.description,
        });
      });

      socket.on('ai_insight', (insight) => {
        toast.info(insight.title, {
          description: insight.description,
        });
      });

    } catch (error) {
      setConnectionError((error as Error).message);
      console.error('Failed to create WebSocket connection:', error);
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  };

  const sendMessage = (event: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('WebSocket not connected. Message not sent:', { event, data });
    }
  };

  const handleMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case 'PRICE_UPDATE':
        handlePriceUpdate(message.data);
        break;
      case 'PORTFOLIO_UPDATE':
        setPortfolio(message.data);
        break;
      case 'RISK_ALERT':
        toast.warning(message.data.title, {
          description: message.data.description,
        });
        break;
      case 'AI_INSIGHT':
        toast.info(message.data.title, {
          description: message.data.description,
        });
        break;
      case 'AUTOMATION_TRIGGER':
        toast.success('Automation Triggered', {
          description: `Rule "${message.data.ruleName}" was executed`,
        });
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  const handlePriceUpdate = (priceUpdate: PriceUpdate) => {
    // Update asset prices in portfolio store if the asset exists
    const portfolio = usePortfolioStore.getState().portfolio;
    if (portfolio) {
      const asset = portfolio.assets.find(a => a.symbol === priceUpdate.symbol);
      if (asset) {
        updateAsset(asset.id, {
          price: priceUpdate.price,
          priceChange24h: priceUpdate.change24h,
          priceChangePercentage24h: priceUpdate.changePercentage24h,
        });
      }
    }
  };

  // Subscribe to portfolio symbols for price updates
  const subscribeToSymbols = (symbols: string[]) => {
    sendMessage('subscribe_symbols', { symbols });
  };

  const unsubscribeFromSymbols = (symbols: string[]) => {
    sendMessage('unsubscribe_symbols', { symbols });
  };

  // Join wallet-specific room
  const joinWalletRoom = (address: string) => {
    sendMessage('join_wallet_room', { walletAddress: address });
  };

  const leaveWalletRoom = (address: string) => {
    sendMessage('leave_wallet_room', { walletAddress: address });
  };

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [walletAddress, autoConnect]);

  useEffect(() => {
    if (isConnected && walletAddress) {
      joinWalletRoom(walletAddress);
    }
  }, [isConnected, walletAddress]);

  return {
    isConnected,
    connectionError,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
    subscribeToSymbols,
    unsubscribeFromSymbols,
    joinWalletRoom,
    leaveWalletRoom,
  };
}; 