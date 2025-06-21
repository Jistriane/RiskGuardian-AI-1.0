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

// Base Types
export interface User {
  id: string;
  address: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  totalValueChange24h: number;
  totalValueChangePercentage24h: number;
  totalPnl: number;
  totalPnlPercentage: number;
  riskScore: number;
  assets: Asset[];
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  allocation: number; // percentage of portfolio
  contractAddress?: string;
  logoUri?: string;
  chain: string;
}

// Risk Types
export interface RiskMetrics {
  portfolioRisk: number; // 0-100
  volatility: number;
  var95: number; // Value at Risk 95%
  sharpeRatio: number;
  maxDrawdown: number;
  beta: number;
  correlationBTC: number;
  correlationETH: number;
  liquidityRisk: number;
  concentrationRisk: number;
  updatedAt: string;
}

export interface RiskAlert {
  id: string;
  type: 'HIGH_VOLATILITY' | 'LARGE_POSITION' | 'CORRELATION_WARNING' | 'LIQUIDITY_RISK';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  assetSymbol?: string;
  threshold: number;
  currentValue: number;
  createdAt: string;
  acknowledged: boolean;
}

// Market Data Types
export interface MarketData {
  symbol: string;
  price: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: string;
}

export interface TradingViewData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// AI Insights Types
export interface AIInsight {
  id: string;
  type: 'MARKET_ANALYSIS' | 'PORTFOLIO_OPTIMIZATION' | 'RISK_WARNING' | 'OPPORTUNITY';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  actionable: boolean;
  recommendations: string[];
  createdAt: string;
  expiresAt?: string;
}

export interface ScenarioAnalysis {
  id: string;
  name: string;
  description: string;
  parameters: {
    marketCondition: 'BULL' | 'BEAR' | 'SIDEWAYS' | 'CRASH';
    timeframe: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y';
    volatilityMultiplier: number;
  };
  results: {
    expectedReturn: number;
    worstCase: number;
    bestCase: number;
    probabilityOfLoss: number;
    maxDrawdown: number;
  };
  createdAt: string;
}

// Automation Types
export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'REBALANCE' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'RISK_LIMIT';
  trigger: {
    condition: string;
    threshold: number;
    comparison: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS';
  };
  action: {
    type: 'SELL' | 'BUY' | 'REBALANCE' | 'NOTIFY';
    parameters: Record<string, any>;
  };
  lastTriggered?: string;
  timesTriggered: number;
  createdAt: string;
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'PRICE_UPDATE' | 'PORTFOLIO_UPDATE' | 'RISK_ALERT' | 'AI_INSIGHT' | 'AUTOMATION_TRIGGER';
  data: any;
  timestamp: string;
}

export interface PriceUpdate {
  symbol: string;
  price: number;
  change24h: number;
  changePercentage24h: number;
  volume24h: number;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Chart Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  duration?: number;
  timestamp: string;
  read: boolean;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Wallet Types
export interface WalletInfo {
  address: string;
  chainId: number;
  isConnected: boolean;
  connector?: string;
}

// Export type utilities
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>; 