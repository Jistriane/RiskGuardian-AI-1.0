import { io, Socket } from 'socket.io-client';
import { config } from '@/config/env';
import type { Alert } from '@/types';

interface WebSocketCallbacks {
  onAlert?: (alert: Alert) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onReconnect?: () => void;
  onError?: (error: any) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private callbacks: WebSocketCallbacks = {};

  constructor() {
    this.connect();
  }

  private connect(): void {
    try {
      this.socket = io(config.api.chromiaWs, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.callbacks.onError?.(error);
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected');
      this.reconnectAttempts = 0;
      this.callbacks.onConnect?.();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ WebSocket disconnected:', reason);
      this.callbacks.onDisconnect?.();
    });

    this.socket.on('reconnect', () => {
      console.log('🔄 WebSocket reconnected');
      this.callbacks.onReconnect?.();
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      this.reconnectAttempts = attemptNumber;
      console.log(`🔄 WebSocket reconnect attempt ${attemptNumber}`);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error);
      this.callbacks.onError?.(error);
    });

    // Eventos específicos do RiskGuardian
    this.socket.on('alert', (alert: Alert) => {
      console.log('🚨 New alert received:', alert);
      this.callbacks.onAlert?.(alert);
    });

    this.socket.on('portfolio_update', (data: any) => {
      console.log('📊 Portfolio update received:', data);
      // Handle portfolio updates
    });

    this.socket.on('risk_update', (data: any) => {
      console.log('⚠️ Risk update received:', data);
      // Handle risk metric updates
    });

    this.socket.on('market_update', (data: any) => {
      console.log('📈 Market update received:', data);
      // Handle market data updates
    });
  }

  public setCallbacks(callbacks: WebSocketCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  public subscribeToPortfolio(portfolioId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('subscribe', portfolioId);
      console.log(`📡 Subscribed to portfolio: ${portfolioId}`);
    }
  }

  public unsubscribeFromPortfolio(portfolioId: string): void {
    if (this.socket?.connected) {
      this.socket.emit('unsubscribe', portfolioId);
      console.log(`📡 Unsubscribed from portfolio: ${portfolioId}`);
    }
  }

  public subscribeToGlobalAlerts(): void {
    if (this.socket?.connected) {
      this.socket.emit('subscribe_global_alerts');
      console.log('📡 Subscribed to global alerts');
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  public getReconnectAttempts(): number {
    return this.reconnectAttempts;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public reconnect(): void {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connect();
    }
  }

  // Método para enviar dados customizados
  public emit(event: string, data: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  // Método para escutar eventos customizados
  public on(event: string, callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Método para remover listeners
  public off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }
}

export const webSocketService = new WebSocketService(); 