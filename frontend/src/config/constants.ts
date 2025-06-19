// ==================== CONFIGURAÇÕES DO SISTEMA ====================

export const APP_CONFIG = {
  name: 'RiskGuardian AI',
  version: '2.0.0',
  description: 'Advanced DeFi Risk Management Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  icon: '/icons/logo.svg',
} as const;

// ==================== APIs E ENDPOINTS ====================

export const API_CONFIG = {
  backend: {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },
  elizaos: {
    baseUrl: process.env.NEXT_PUBLIC_ELIZAOS_URL || 'http://localhost:3000/api',
    wsUrl: process.env.NEXT_PUBLIC_ELIZAOS_WS || 'ws://localhost:3000',
    timeout: 15000,
  },
  chromia: {
    baseUrl: process.env.NEXT_PUBLIC_CHROMIA_URL || 'http://localhost:3002',
    wsUrl: process.env.NEXT_PUBLIC_CHROMIA_WS || 'ws://localhost:3002/ws',
    timeout: 10000,
  },
} as const;

// ==================== BLOCKCHAIN CONSTANTS ====================

export const CHAINS = {
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth.llamarpc.com',
    explorer: 'https://etherscan.io',
  },
  SEPOLIA: {
    id: 11155111,
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.drpc.org',
    explorer: 'https://sepolia.etherscan.io',
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon.llamarpc.com',
    explorer: 'https://polygonscan.com',
  },
  BSC: {
    id: 56,
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc.llamarpc.com',
    explorer: 'https://bscscan.com',
  },
  AVALANCHE: {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    rpcUrl: 'https://avalanche.llamarpc.com',
    explorer: 'https://snowtrace.io',
  },
} as const;

// ==================== CONTRATOS DEPLOYADOS ====================

export const CONTRACTS = {
  [CHAINS.SEPOLIA.id]: {
    riskGuardianMaster: '0x30175D5BB0c97F4af00707950707D4b0Da4E7DdF',
    stopLossHedge: '0x0D175144FaF2a7045820b1242353aaC7240cD748',
    rebalanceHedge: '0xcdddD0599117455BF24884082725aE2EaE58e401',
    volatilityHedge: '0xdC3a51B096403aD9Fd080afdAA907643029423A6',
  },
} as const;

// ==================== TOKENS ====================

export const TOKENS = {
  [CHAINS.SEPOLIA.id]: [
    {
      address: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      symbol: 'LINK',
      name: 'Chainlink Token',
      decimals: 18,
      logoUri: '/tokens/link.svg',
    },
    {
      address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
      symbol: 'WETH',
      name: 'Wrapped Ether',
      decimals: 18,
      logoUri: '/tokens/weth.svg',
    },
  ],
} as const;

// ==================== CONFIGURAÇÕES DE UI ====================

export const UI_CONFIG = {
  theme: {
    default: 'dark',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#10b981',
      cyber: {
        blue: '#00d4ff',
        purple: '#8b5cf6',
        green: '#00ff88',
        pink: '#ff0080',
        yellow: '#ffff00',
        orange: '#ff8000',
      },
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  refreshInterval: {
    portfolio: 30000,
    alerts: 5000,
    market: 10000,
    system: 60000,
  },
  charts: {
    defaultTimeframe: '24h',
    availableTimeframes: ['1h', '4h', '24h', '7d', '30d', '90d', '1y'],
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
  },
} as const;

// ==================== CONFIGURAÇÕES DE DASHBOARD ====================

export const DASHBOARD_CONFIG = {
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;

// ==================== RISK LEVELS ====================

export const RISK_LEVELS = {
  LOW: {
    score: [0, 25],
    color: '#10b981',
    label: 'Baixo',
    description: 'Risco baixo, portfólio conservador',
  },
  MEDIUM: {
    score: [26, 50],
    color: '#f59e0b',
    label: 'Médio',
    description: 'Risco moderado, portfólio equilibrado',
  },
  HIGH: {
    score: [51, 75],
    color: '#f97316',
    label: 'Alto',
    description: 'Risco alto, portfólio agressivo',
  },
  CRITICAL: {
    score: [76, 100],
    color: '#ef4444',
    label: 'Crítico',
    description: 'Risco crítico, ação imediata necessária',
  },
} as const;

// ==================== ALERT TYPES ====================

export const ALERT_TYPES = {
  PRICE: {
    icon: '📈',
    color: '#3b82f6',
    label: 'Preço',
  },
  VOLATILITY: {
    icon: '📊',
    color: '#8b5cf6',
    label: 'Volatilidade',
  },
  LIQUIDITY: {
    icon: '💧',
    color: '#10b981',
    label: 'Liquidez',
  },
  RISK: {
    icon: '⚠️',
    color: '#f59e0b',
    label: 'Risco',
  },
  SYSTEM: {
    icon: '🔧',
    color: '#6b7280',
    label: 'Sistema',
  },
  HEDGE_EXECUTION: {
    icon: '🛡️',
    color: '#8b5cf6',
    label: 'Execução de Hedge',
  },
} as const;

// ==================== HEDGE STRATEGY TYPES ====================

export const HEDGE_TYPES = {
  STOP_LOSS: {
    label: 'Stop Loss',
    description: 'Proteção contra perdas',
    icon: '🛑',
    color: '#ef4444',
  },
  TAKE_PROFIT: {
    label: 'Take Profit',
    description: 'Realização de lucros',
    icon: '🎯',
    color: '#10b981',
  },
  REBALANCE: {
    label: 'Rebalanceamento',
    description: 'Ajuste de alocação',
    icon: '⚖️',
    color: '#8b5cf6',
  },
  VOLATILITY: {
    label: 'Volatilidade',
    description: 'Proteção contra volatilidade',
    icon: '📈',
    color: '#f59e0b',
  },
  CROSS_CHAIN: {
    label: 'Cross-Chain',
    description: 'Hedge entre redes',
    icon: '🌐',
    color: '#06b6d4',
  },
} as const;

// ==================== FORMATAÇÃO E UTILS ====================

export const FORMAT_CONFIG = {
  currency: {
    USD: {
      symbol: '$',
      locale: 'en-US',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    BTC: {
      symbol: '₿',
      locale: 'en-US',
      minimumFractionDigits: 6,
      maximumFractionDigits: 8,
    },
    ETH: {
      symbol: 'Ξ',
      locale: 'en-US',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    },
  },
  number: {
    compact: {
      notation: 'compact' as const,
      maximumSignificantDigits: 3,
    },
    percentage: {
      style: 'percent' as const,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
} as const;

// ==================== WEBSOCKET EVENTS ====================

export const WS_EVENTS = {
  // Eventos de entrada
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  
  // Eventos de dados
  ALERT: 'alert',
  PRICE_UPDATE: 'price_update',
  PORTFOLIO_UPDATE: 'portfolio_update',
  ANALYSIS_COMPLETE: 'analysis_complete',
  SYSTEM_STATUS: 'system_status',
  
  // Eventos de AI
  AI_ANALYSIS_START: 'ai_analysis_start',
  AI_ANALYSIS_PROGRESS: 'ai_analysis_progress',
  AI_ANALYSIS_COMPLETE: 'ai_analysis_complete',
  AI_ANALYSIS_ERROR: 'ai_analysis_error',
} as const;

// ==================== LOCAL STORAGE KEYS ====================

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'riskguardian_user_preferences',
  WALLET_CONNECTION: 'riskguardian_wallet_connection',
  DASHBOARD_LAYOUT: 'riskguardian_dashboard_layout',
  RECENT_PORTFOLIOS: 'riskguardian_recent_portfolios',
  ALERT_SETTINGS: 'riskguardian_alert_settings',
  THEME: 'riskguardian_theme',
} as const;

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Carteira não conectada',
  NETWORK_NOT_SUPPORTED: 'Rede não suportada',
  INSUFFICIENT_BALANCE: 'Saldo insuficiente',
  TRANSACTION_REJECTED: 'Transação rejeitada pelo usuário',
  NETWORK_ERROR: 'Erro de conexão',
  CONTRACT_ERROR: 'Erro no contrato inteligente',
  API_ERROR: 'Erro na API',
  VALIDATION_ERROR: 'Erro de validação',
  UNKNOWN_ERROR: 'Erro desconhecido',
} as const;

// ==================== SUCCESS MESSAGES ====================

export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Carteira conectada com sucesso',
  TRANSACTION_CONFIRMED: 'Transação confirmada',
  PORTFOLIO_CREATED: 'Portfólio criado com sucesso',
  STRATEGY_CREATED: 'Estratégia criada com sucesso',
  ALERT_DISMISSED: 'Alerta dispensado',
  SETTINGS_SAVED: 'Configurações salvas',
} as const; 