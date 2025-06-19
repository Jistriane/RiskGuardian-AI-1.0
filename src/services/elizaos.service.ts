import axios, { AxiosResponse } from 'axios';

// Configuração da API ElizaOS
const ELIZAOS_BASE_URL = process.env.NEXT_PUBLIC_ELIZAOS_URL || 'http://localhost:3002';

// Tipos para as respostas da API
export interface PortfolioAnalysis {
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendations: string[];
  detectedRisks: {
    type: string;
    severity: string;
    description: string;
    impact: number;
  }[];
  hedgeSuggestions: {
    strategy: string;
    reasoning: string;
    urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
  summary: string;
}

export interface AIAgentResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface WebSocketMessage {
  type: 'analysis_update' | 'risk_alert' | 'hedge_suggestion' | 'market_data';
  payload: any;
  timestamp: string;
}

class ElizaOSService {
  private baseURL: string;
  private wsConnection: WebSocket | null = null;

  constructor() {
    this.baseURL = ELIZAOS_BASE_URL;
  }

  // Health check do serviço
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/api/health`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      console.warn('ElizaOS health check failed:', error);
      return false;
    }
  }

  // Análise de portfólio via IA
  async analyzePortfolio(
    walletAddress: string, 
    context?: {
      protocols?: string[];
      timeframe?: string;
      riskTolerance?: string;
    }
  ): Promise<AIAgentResponse<PortfolioAnalysis>> {
    try {
      const response: AxiosResponse<AIAgentResponse<PortfolioAnalysis>> = await axios.post(
        `${this.baseURL}/api/analyze-portfolio`,
        {
          address: walletAddress,
          context: {
            protocols: context?.protocols || [],
            timeframe: context?.timeframe || '24h',
            riskTolerance: context?.riskTolerance || 'medium',
            analysisType: 'comprehensive'
          }
        },
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data.data,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      console.error('Portfolio analysis error:', error);
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Analysis failed',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Conectar WebSocket para atualizações em tempo real
  connectWebSocket(callbacks: {
    onAnalysisUpdate?: (data: any) => void;
    onRiskAlert?: (data: any) => void;
    onHedgeSuggestion?: (data: any) => void;
    onMarketData?: (data: any) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onError?: (error: Event) => void;
  }): boolean {
    try {
      const wsUrl = this.baseURL.replace('http', 'ws') + '/ws';
      this.wsConnection = new WebSocket(wsUrl);

      this.wsConnection.onopen = () => {
        console.log('ElizaOS WebSocket connected');
        callbacks.onConnect?.();
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          switch (message.type) {
            case 'analysis_update':
              callbacks.onAnalysisUpdate?.(message.payload);
              break;
            case 'risk_alert':
              callbacks.onRiskAlert?.(message.payload);
              break;
            case 'hedge_suggestion':
              callbacks.onHedgeSuggestion?.(message.payload);
              break;
            case 'market_data':
              callbacks.onMarketData?.(message.payload);
              break;
          }
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.wsConnection.onclose = () => {
        console.log('ElizaOS WebSocket disconnected');
        callbacks.onDisconnect?.();
      };

      this.wsConnection.onerror = (error) => {
        console.error('ElizaOS WebSocket error:', error);
        callbacks.onError?.(error);
      };

      return true;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return false;
    }
  }

  // Desconectar WebSocket
  disconnectWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  // Verificar status da conexão WebSocket
  get isWebSocketConnected(): boolean {
    return this.wsConnection?.readyState === WebSocket.OPEN;
  }
}

// Instância singleton
export const elizaOSService = new ElizaOSService();

// Hook personalizado para usar o serviço
export const useElizaOS = () => {
  return {
    elizaOSService,
    analyzePortfolio: elizaOSService.analyzePortfolio.bind(elizaOSService),
    connectWebSocket: elizaOSService.connectWebSocket.bind(elizaOSService),
    disconnectWebSocket: elizaOSService.disconnectWebSocket.bind(elizaOSService),
    isConnected: elizaOSService.isWebSocketConnected,
    healthCheck: elizaOSService.healthCheck.bind(elizaOSService)
  };
}; 