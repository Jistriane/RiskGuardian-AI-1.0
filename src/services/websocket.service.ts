export interface WebSocketMessage {
  type: 'price_alert' | 'risk_alert' | 'hedge_suggestion' | 'market_update' | 'portfolio_change';
  payload: any;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface AlertSubscription {
  symbol: string;
  condition: 'above' | 'below' | 'change_percent';
  value: number;
  enabled: boolean;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private callbacks: { [key: string]: (data: any) => void } = {};
  private subscriptions: AlertSubscription[] = [];
  private isReconnecting = false;

  // URLs dos diferentes serviços WebSocket
  private readonly URLS = {
    elizaos: process.env.NEXT_PUBLIC_ELIZAOS_WS_URL || 'ws://localhost:3002/ws',
    backend: process.env.NEXT_PUBLIC_BACKEND_WS_URL || 'ws://localhost:3000/ws',
    binance: 'wss://stream.binance.com:9443/ws'
  };

  constructor() {
    // Conectar automaticamente ao inicializar
    this.connect();
  }

  // Conectar ao WebSocket
  connect(service: keyof typeof this.URLS = 'elizaos'): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        const url = this.URLS[service];
        
        if (this.ws?.readyState === WebSocket.OPEN) {
          resolve(true);
          return;
        }

        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
          console.log(`WebSocket connected to ${service}`);
          this.reconnectAttempts = 0;
          this.isReconnecting = false;
          
          // Reenviar subscrições ativas
          this.resubscribe();
          
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log(`WebSocket disconnected from ${service}`);
          this.ws = null;
          
          if (!this.isReconnecting && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect(service);
          }
          
          resolve(false);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          resolve(false);
        };

      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
        resolve(false);
      }
    });
  }

  // Programar reconexão automática
  private scheduleReconnect(service: keyof typeof this.URLS): void {
    this.isReconnecting = true;
    this.reconnectAttempts++;
    
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect(service);
    }, delay);
  }

  // Processar mensagens recebidas
  private handleMessage(message: WebSocketMessage): void {
    // Chamar callbacks específicos por tipo
    const callback = this.callbacks[message.type];
    if (callback) {
      callback(message.payload);
    }

    // Callback geral para todas as mensagens
    const generalCallback = this.callbacks['*'];
    if (generalCallback) {
      generalCallback(message);
    }

    // Processar alertas automaticamente
    if (message.type === 'price_alert' || message.type === 'risk_alert') {
      this.processAlert(message);
    }
  }

  // Processar alertas e verificar condições
  private processAlert(message: WebSocketMessage): void {
    if (message.type === 'price_alert') {
      const { symbol, price } = message.payload;
      
      // Verificar alertas de preço configurados
      this.subscriptions.forEach(sub => {
        if (sub.symbol === symbol && sub.enabled) {
          let triggered = false;
          
          if (sub.condition === 'above' && price > sub.value) {
            triggered = true;
          } else if (sub.condition === 'below' && price < sub.value) {
            triggered = true;
          }
          
          if (triggered) {
            this.triggerAlert({
              type: 'price_alert',
              symbol,
              condition: sub.condition,
              value: sub.value,
              currentPrice: price,
              severity: this.calculateSeverity(price, sub.value, sub.condition)
            });
          }
        }
      });
    }
  }

  // Calcular severidade do alerta
  private calculateSeverity(currentPrice: number, threshold: number, condition: string): 'low' | 'medium' | 'high' | 'critical' {
    const percentDiff = Math.abs((currentPrice - threshold) / threshold) * 100;
    
    if (percentDiff > 10) return 'critical';
    if (percentDiff > 5) return 'high';
    if (percentDiff > 2) return 'medium';
    return 'low';
  }

  // Disparar alerta personalizado
  private triggerAlert(alertData: any): void {
    const alertCallback = this.callbacks['alert_triggered'];
    if (alertCallback) {
      alertCallback(alertData);
    }
  }

  // Registrar callback para tipo específico de mensagem
  on(messageType: string, callback: (data: any) => void): void {
    this.callbacks[messageType] = callback;
  }

  // Remover callback
  off(messageType: string): void {
    delete this.callbacks[messageType];
  }

  // Enviar mensagem via WebSocket
  send(message: Partial<WebSocketMessage>): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected');
      return false;
    }

    try {
      const fullMessage: WebSocketMessage = {
        type: message.type || 'generic',
        payload: message.payload || {},
        timestamp: new Date().toISOString(),
        ...message
      };

      this.ws.send(JSON.stringify(fullMessage));
      return true;
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return false;
    }
  }

  // Subscrever a atualizações de preço
  subscribeToPrice(symbols: string[]): boolean {
    return this.send({
      type: 'price_alert',
      payload: {
        action: 'subscribe',
        symbols
      }
    });
  }

  // Subscrever a alertas de risco
  subscribeToRisk(walletAddress: string): boolean {
    return this.send({
      type: 'risk_alert',
      payload: {
        action: 'subscribe',
        walletAddress
      }
    });
  }

  // Adicionar alerta personalizado
  addAlert(alert: AlertSubscription): void {
    this.subscriptions.push(alert);
    
    // Notificar servidor sobre novo alerta
    this.send({
      type: 'price_alert',
      payload: {
        action: 'add_alert',
        alert
      }
    });
  }

  // Remover alerta
  removeAlert(symbol: string, condition: string): void {
    this.subscriptions = this.subscriptions.filter(
      sub => !(sub.symbol === symbol && sub.condition === condition)
    );

    this.send({
      type: 'price_alert',
      payload: {
        action: 'remove_alert',
        symbol,
        condition
      }
    });
  }

  // Listar alertas ativos
  getAlerts(): AlertSubscription[] {
    return [...this.subscriptions];
  }

  // Reenviar subscrições após reconexão
  private resubscribe(): void {
    this.subscriptions.forEach(sub => {
      this.send({
        type: 'price_alert',
        payload: {
          action: 'add_alert',
          alert: sub
        }
      });
    });
  }

  // Conectar ao Binance WebSocket para dados em tempo real
  connectToBinance(symbols: string[]): boolean {
    try {
      const streams = symbols.map(symbol => `${symbol.toLowerCase()}usdt@ticker`).join('/');
      const binanceWs = new WebSocket(`${this.URLS.binance}/${streams}`);

      binanceWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Processar dados do Binance
          const message: WebSocketMessage = {
            type: 'market_update',
            payload: {
              symbol: data.s?.replace('USDT', ''),
              price: parseFloat(data.c),
              change24h: parseFloat(data.P),
              volume: parseFloat(data.v),
              high24h: parseFloat(data.h),
              low24h: parseFloat(data.l)
            },
            timestamp: new Date().toISOString()
          };

          this.handleMessage(message);
        } catch (error) {
          console.error('Error processing Binance data:', error);
        }
      };

      return true;
    } catch (error) {
      console.error('Failed to connect to Binance WebSocket:', error);
      return false;
    }
  }

  // Desconectar WebSocket
  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
  }

  // Verificar status da conexão
  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // Obter estatísticas da conexão
  getConnectionStats() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      activeSubscriptions: this.subscriptions.length,
      activeCallbacks: Object.keys(this.callbacks).length
    };
  }
}

// Instância singleton
export const webSocketService = new WebSocketService();

// Hook personalizado para usar o WebSocket
export const useWebSocket = () => {
  return {
    webSocketService,
    isConnected: webSocketService.isConnected,
    connect: webSocketService.connect.bind(webSocketService),
    disconnect: webSocketService.disconnect.bind(webSocketService),
    on: webSocketService.on.bind(webSocketService),
    off: webSocketService.off.bind(webSocketService),
    send: webSocketService.send.bind(webSocketService),
    subscribeToPrice: webSocketService.subscribeToPrice.bind(webSocketService),
    subscribeToRisk: webSocketService.subscribeToRisk.bind(webSocketService),
    addAlert: webSocketService.addAlert.bind(webSocketService),
    removeAlert: webSocketService.removeAlert.bind(webSocketService),
    getAlerts: webSocketService.getAlerts.bind(webSocketService),
    connectToBinance: webSocketService.connectToBinance.bind(webSocketService),
    getConnectionStats: webSocketService.getConnectionStats.bind(webSocketService)
  };
}; 