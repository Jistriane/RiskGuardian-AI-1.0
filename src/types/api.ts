// Types para Backend API (porta 8001)
export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
  count?: number
  error?: string
  message?: string
}

// Auth Types
export interface AuthNonceRequest {
  address: string
}

export interface AuthNonceResponse {
  message: string
  nonce: string
}

export interface AuthLoginRequest {
  address: string
  signature: string
  message: string
}

export interface AuthLoginResponse {
  token: string
  user: {
    id: string
    address: string
    createdAt: string
  }
}

// Portfolio Types
export interface Portfolio {
  id: string
  name: string
  description: string
  totalValue: string
  riskScore: number
  positionCount: number
  createdAt: string
  updatedAt: string
}

export interface CreatePortfolioRequest {
  name: string
  description?: string
}

export interface PortfolioRisk {
  portfolioId: string
  riskScore: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  diversificationScore: number
  topRisks: Array<{
    type: string
    score: number
    description: string
  }>
  recommendations: string[]
}

// Insurance Types
export interface InsurancePolicy {
  id: string
  type: 'SMART_CONTRACT' | 'PROTOCOL' | 'MARKET'
  coverage: string
  premium: string
  status: 'ACTIVE' | 'EXPIRED' | 'CLAIMED' | 'PENDING'
  duration: number
  createdAt: string
  expiresAt: string
}

export interface CreateInsuranceRequest {
  coverageAmount: string
  riskThreshold: number
  duration: number
}

// Monitoring Types
export interface MonitoringAlert {
  id: string
  type: 'price_alert' | 'risk_alert' | 'protocol_alert'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  portfolioId?: string
  protocolAddress?: string
}

// ElizaOS Types (porta 3003)
export interface ElizaOSAnalysisRequest {
  address: string
  context?: string
}

export interface ElizaOSAnalysisResponse {
  analysis: string
  recommendations: string[]
  riskLevel: string
  confidence: number
  timestamp: string
}

export interface ElizaOSInsight {
  id: string
  type: 'risk' | 'opportunity' | 'market' | 'portfolio'
  title: string
  content: string
  confidence: number
  timestamp: string
}

// WebSocket Message Types
export interface WSMessage {
  type: string
  payload?: any
  data?: any
  timestamp?: string
}

// ElizaOS WebSocket Messages - Mais flexível
export interface ElizaOSWSMessage extends WSMessage {
  type: string // Removido union type restritivo
  address?: string
  content?: string
}

// Chromia AWS Types (porta 3002) - Atualizado
export interface ChromiaAlert {
  portfolioId: string
  alertId?: string
  type: 'warning' | 'critical' | 'info'
  severity?: 'low' | 'medium' | 'high' | 'critical' // Adicionado severity
  title?: string // Adicionado title
  message: string
  timestamp: string
  data?: any
}

export interface ChromiaAlertSubscription {
  portfolioId: string
  alertTypes: string[]
  webhookUrl?: string
}

// Socket.IO Event Types for Chromia
export interface ChromiaSocketEvents {
  alert: (alert: ChromiaAlert) => void
  risk_alert: (alert: ChromiaAlert) => void
  price_alert: (alert: ChromiaAlert) => void
  anomaly_detected: (alert: ChromiaAlert) => void
  anomaly: (data: { portfolioId: string; anomalyType: string; severity: string }) => void
  notification: (notification: { id: string; message: string; type: string }) => void
  'portfolio_update': (data: { portfolioId: string; metrics: any }) => void
}

// Market Data Types
export interface MarketData {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  timestamp: string
}

export interface TradingViewData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Error Types
export interface ApiError {
  success: false
  error: string
  message?: string
  details?: any
  code?: number
}

// WebSocket Connection Status
export interface WSConnectionStatus {
  connected: boolean
  connecting: boolean
  error?: string
  lastConnected?: Date
  reconnectAttempts: number
}

// Real-time Data Types
export interface RealtimePortfolioData {
  portfolioId: string
  totalValue: number
  change24h: number
  positions: Array<{
    symbol: string
    amount: number
    value: number
    change24h: number
  }>
  riskMetrics: {
    score: number
    level: string
    volatility: number
  }
  timestamp: string
} 