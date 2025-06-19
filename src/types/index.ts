export interface Portfolio {
  id: string;
  name: string;
  description: string;
  totalValue: string;
  riskScore: number;
  positionCount: number;
  userId?: string;
  createdAt?: string;
}

export interface Token {
  symbol: string
  amount: string
  value: number
  percentage: number
  logo?: string
}

export interface RiskMetrics {
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  volatilityIndex: number;
  liquidityRatio: number;
  healthFactor: number;
  portfolioId: string;
}

export interface Alert {
  id: string;
  portfolioId: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  timestamp: string;
  data: any;
}

export interface AIInsight {
  id: string
  type: 'recommendation' | 'warning' | 'insight'
  title: string
  content: string
  confidence: number
  timestamp: string
}

export interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  timestamp: string
}

export interface ChainData {
  balance: string;
  riskScore: number;
  portfolioValue: string;
  assets: number;
  lastUpdated: Date;
}

export interface WebSocketMessage {
  type: 'portfolio_update' | 'market_data' | 'alert' | 'ai_insight'
  data: any
  timestamp: string
}

export interface ContractMetrics {
  contractName: string;
  contractAddress: string;
  tvl: string;
  activePositions: number;
  successfulHedges: number;
  performanceScore: number;
  lastActivity: Date;
}

export interface MultiChainPortfolio {
  address: string;
  totalValue: string;
  riskScore: number;
  chains: Record<string, ChainData>;
}

export interface AIAnalysis {
  riskLevel: 'low' | 'moderate' | 'high';
  totalValue: number;
  healthFactor: number;
  mainRisks: string[];
  recommendations: string[];
  explanation: string;
}

export interface AutomationTrigger {
  id: string;
  triggerType: string;
  isActive: boolean;
  executionCount: number;
  lastTriggered: Date;
}

export interface DashboardData {
  overview: {
    totalTVL: string;
    avgRiskScore: string;
    totalActivePositions: number;
    totalSuccessfulHedges: number;
    avgPerformanceScore: string;
    contractsMonitored: number;
    portfoliosTracked: number;
    activeTriggers: number;
  };
  riskAnalysis: {
    distribution: Record<string, number>;
    avgVolatility: string;
    avgLiquidityRatio: string;
  };
  automation: {
    totalTriggers: number;
    activeTriggers: number;
    totalExecutions: number;
    topTriggers: Array<{
      id: string;
      type: string;
      executions: number;
      lastTriggered: Date;
    }>;
  };
  contracts: Array<{
    name: string;
    address: string;
    tvl: string;
    activePositions: number;
    performanceScore: number;
    lastActivity: Date;
  }>;
  timestamp: Date;
}

export interface SystemStatus {
  status: 'healthy' | 'degraded' | 'error';
  services: {
    backend: boolean;
    elizaos: boolean;
    chromia: boolean;
    websocket: boolean;
  };
  timestamp: Date;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  results?: {
    riskScore: number;
    expectedReturn: number;
    worstCase: number;
    bestCase: number;
  };
}

export interface WalletState {
  address?: string;
  chainId?: number;
  isConnected: boolean;
  isConnecting: boolean;
  error?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  timestamp?: Date;
} 