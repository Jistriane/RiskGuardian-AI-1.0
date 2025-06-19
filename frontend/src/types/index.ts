// ==================== TYPES FUNDAMENTAIS ====================

export type Address = `0x${string}`;
export type Hash = `0x${string}`;
export type BigNumber = string;

// ==================== BLOCKCHAIN ====================

export interface ChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface TokenInfo {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  price?: number;
  priceChange24h?: number;
}

// ==================== CONTRATOS INTELIGENTES ====================

export interface ContractAddresses {
  riskGuardianMaster: Address;
  stopLossHedge: Address;
  rebalanceHedge: Address;
  volatilityHedge: Address;
  crossChainHedge?: Address;
  riskRegistry?: Address;
  portfolioAnalyzer?: Address;
  riskInsurance?: Address;
  alertSystem?: Address;
}

export interface HedgeStrategy {
  id: string;
  type: 'STOP_LOSS' | 'TAKE_PROFIT' | 'REBALANCE' | 'VOLATILITY' | 'CROSS_CHAIN';
  token: Address;
  amount: BigNumber;
  targetPrice: BigNumber;
  threshold: number;
  isActive: boolean;
  createdAt: string;
  executedAt?: string;
  gasUsed?: BigNumber;
}

// ==================== PORTFOLIO ====================

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  owner: Address;
  totalValue: number;
  totalValueUSD: number;
  riskScore: number;
  positions: PortfolioPosition[];
  strategies: HedgeStrategy[];
  performance: PortfolioPerformance;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioPosition {
  id: string;
  token: TokenInfo;
  amount: BigNumber;
  value: number;
  valueUSD: number;
  weight: number;
  pnl: number;
  pnlPercentage: number;
  entryPrice: number;
  currentPrice: number;
  priceChange24h: number;
}

export interface PortfolioPerformance {
  totalReturn: number;
  totalReturnPercentage: number;
  dailyReturn: number;
  dailyReturnPercentage: number;
  weeklyReturn: number;
  monthlyReturn: number;
  yearlyReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  winRate: number;
  historicalData: PricePoint[];
}

export interface PricePoint {
  timestamp: string;
  value: number;
  volume?: number;
}

// ==================== RISK ANALYSIS ====================

export interface RiskMetrics {
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number; // 0-100
  diversificationScore: number; // 0-100
  valueAtRisk: number; // VaR 24h
  expectedShortfall: number; // ES 24h
  volatility: number;
  beta: number;
  correlation: number;
  liquidityRisk: number;
  concentrationRisk: number;
  marketRisk: number;
  topRisks: RiskFactor[];
  recommendations: RiskRecommendation[];
}

export interface RiskFactor {
  type: 'CONCENTRATION' | 'VOLATILITY' | 'LIQUIDITY' | 'CORRELATION' | 'MARKET';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  impact: number;
  tokens?: string[];
}

export interface RiskRecommendation {
  type: 'DIVERSIFY' | 'HEDGE' | 'REBALANCE' | 'STOP_LOSS' | 'TAKE_PROFIT';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  description: string;
  estimatedImpact: number;
  actionItems: string[];
}

// ==================== ALERTS & MONITORING ====================

export interface Alert {
  id: string;
  portfolioId: string;
  type: 'PRICE' | 'VOLATILITY' | 'LIQUIDITY' | 'RISK' | 'SYSTEM' | 'HEDGE_EXECUTION';
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'ERROR';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  timestamp: string;
  source: 'BACKEND' | 'ELIZAOS' | 'CHROMIA' | 'CHAINLINK';
}

export interface SystemStatus {
  service: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'MAINTENANCE';
  uptime: number;
  lastCheck: string;
  latency?: number;
  errorRate?: number;
  details?: Record<string, unknown>;
}

// ==================== TRADING & ANALYSIS ====================

export interface TradingViewSymbol {
  symbol: string;
  ticker: string;
  name: string;
  type: 'crypto' | 'forex' | 'stock' | 'commodity';
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  strength: number; // 0-100
  description: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  volume24h: number;
  marketCap: number;
  high24h: number;
  low24h: number;
  timestamp: string;
  technicalIndicators: TechnicalIndicator[];
}

// ==================== AI ANALYSIS ====================

export interface AIAnalysis {
  id: string;
  portfolioId: string;
  type: 'RISK_ASSESSMENT' | 'OPTIMIZATION' | 'PREDICTION' | 'SENTIMENT';
  analysis: string;
  confidence: number; // 0-100
  recommendations: AIRecommendation[];
  charts?: ChartData[];
  timestamp: string;
  model: 'GPT4' | 'CLAUDE' | 'CUSTOM';
  processingTime: number;
}

export interface AIRecommendation {
  action: string;
  reason: string;
  confidence: number;
  estimatedImpact: number;
  priority: number;
  tags: string[];
}

export interface ScenarioAnalysis {
  id: string;
  name: string;
  description: string;
  scenarios: Scenario[];
  results: ScenarioResult[];
  createdAt: string;
}

export interface Scenario {
  name: string;
  changes: {
    token: string;
    priceChange: number; // percentage
  }[];
  probability: number;
}

export interface ScenarioResult {
  scenario: string;
  portfolioValue: number;
  pnl: number;
  pnlPercentage: number;
  riskScore: number;
  worstCase: boolean;
  bestCase: boolean;
}

// ==================== WEBSOCKET EVENTS ====================

export interface WebSocketMessage {
  type: 'ALERT' | 'PRICE_UPDATE' | 'PORTFOLIO_UPDATE' | 'ANALYSIS_COMPLETE' | 'SYSTEM_STATUS';
  data: unknown;
  timestamp: string;
  source: string;
}

export interface PriceUpdateEvent {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  timestamp: string;
}

export interface PortfolioUpdateEvent {
  portfolioId: string;
  totalValue: number;
  change: number;
  changePercentage: number;
  positions: PortfolioPosition[];
  timestamp: string;
}

// ==================== API RESPONSES ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ==================== AUTHENTICATION ====================

export interface User {
  id: string;
  address: Address;
  ensName?: string;
  avatar?: string;
  preferences: UserPreferences;
  portfolios: string[];
  createdAt: string;
  lastLoginAt: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  currency: 'USD' | 'EUR' | 'BTC' | 'ETH';
  notifications: {
    email: boolean;
    push: boolean;
    telegram: boolean;
  };
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
  defaultSlippage: number;
  autoRebalance: boolean;
}

export interface AuthState {
  isConnected: boolean;
  address?: Address;
  user?: User;
  token?: string;
  isLoading: boolean;
  error?: string;
}

// ==================== CHART DATA ====================

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area' | 'candlestick';
  title: string;
  data: ChartPoint[];
  config?: ChartConfig;
}

export interface ChartPoint {
  x: string | number;
  y: number;
  volume?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  label?: string;
  color?: string;
}

export interface ChartConfig {
  xAxis?: {
    type: 'time' | 'category' | 'number';
    format?: string;
  };
  yAxis?: {
    format?: string;
    min?: number;
    max?: number;
  };
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

// ==================== STORE STATES ====================

export interface GlobalState {
  auth: AuthState;
  portfolios: Portfolio[];
  alerts: Alert[];
  systemStatus: SystemStatus[];
  marketData: Record<string, MarketData>;
  aiAnalyses: AIAnalysis[];
  isLoading: boolean;
  error?: string;
}

// ==================== COMPONENT PROPS ====================

export interface DashboardProps {
  portfolios: Portfolio[];
  alerts: Alert[];
  systemStatus: SystemStatus[];
  isLoading?: boolean;
}

export interface ChartComponentProps {
  data: ChartData;
  height?: number;
  width?: number;
  className?: string;
  isLoading?: boolean;
}

export interface WalletButtonProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

// ==================== UTILITY TYPES ====================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// ==================== CONSTANTS ====================

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  SEPOLIA: 11155111,
  POLYGON: 137,
  BSC: 56,
  AVALANCHE: 43114,
} as const;

export const CONTRACT_ADDRESSES: Record<number, ContractAddresses> = {
  [SUPPORTED_CHAINS.SEPOLIA]: {
    riskGuardianMaster: '0x30175D5BB0c97F4af00707950707D4b0Da4E7DdF',
    stopLossHedge: '0x0D175144FaF2a7045820b1242353aaC7240cD748',
    rebalanceHedge: '0xcdddD0599117455BF24884082725aE2EaE58e401',
    volatilityHedge: '0xdC3a51B096403aD9Fd080afdAA907643029423A6',
  },
};

export const API_ENDPOINTS = {
  BACKEND: 'http://localhost:3001/api',
  ELIZAOS: 'http://localhost:3000/api', 
  CHROMIA: 'http://localhost:3002',
} as const;

export const WEBSOCKET_URLS = {
  ELIZAOS: 'ws://localhost:3000',
  CHROMIA: 'ws://localhost:3002/ws',
} as const; 