// Configurações de ambiente para o backend
export const config = {
  // Servidor
  port: parseInt(process.env.PORT || '3001'),
  host: process.env.HOST || '0.0.0.0',
  logLevel: process.env.LOG_LEVEL || 'info',

  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/riskguardian',
  },

  // Blockchain
  blockchain: {
    chainId: parseInt(process.env.CHAIN_ID || '11155111'),
    chainName: process.env.CHAIN_NAME || 'Sepolia',
    rpcUrl: process.env.RPC_URL || 'https://sepolia.drpc.org',
    privateKey: process.env.PRIVATE_KEY || '',
  },

  // Contratos
  contracts: {
    riskRegistry: process.env.RISK_REGISTRY_ADDRESS || '',
    portfolioAnalyzer: process.env.PORTFOLIO_ANALYZER_ADDRESS || '',
    riskInsurance: process.env.RISK_INSURANCE_ADDRESS || '',
    hedgeAutomation: process.env.HEDGE_AUTOMATION_ADDRESS || '',
  },

  // URLs dos serviços
  services: {
    elizaos: process.env.ELIZAOS_URL || 'http://localhost:3000',
    chromia: process.env.CHROMIA_URL || 'http://localhost:8080',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
} as const;

export type Config = typeof config;

// Environment configuration with development fallbacks
export const env = {
  // API Configuration  
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // Blockchain Configuration
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  
  // ElizaOS Configuration
  ELIZAOS_URL: process.env.NEXT_PUBLIC_ELIZAOS_URL || 'http://localhost:3001',
  ELIZAOS_WS: process.env.NEXT_PUBLIC_ELIZAOS_WS || 'ws://localhost:3001',
  ELIZAOS_AGENT_ID: process.env.NEXT_PUBLIC_ELIZAOS_AGENT_ID || 'riskguardian-agent',
  ELIZAOS_ENABLED: process.env.NEXT_PUBLIC_ELIZAOS_ENABLED === 'true',
  
  // Chromia Configuration  
  CHROMIA_URL: process.env.NEXT_PUBLIC_CHROMIA_URL || 'http://localhost:3002',
  CHROMIA_WS: process.env.NEXT_PUBLIC_CHROMIA_WS || 'http://localhost:3002',
  CHROMIA_ENABLED: process.env.NEXT_PUBLIC_CHROMIA_ENABLED === 'true',
  
  // Development Settings
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEV_MODE: process.env.NODE_ENV === 'development',
  SKIP_WEBSOCKETS: process.env.NEXT_PUBLIC_SKIP_WEBSOCKETS === 'true',
  MOCK_DATA: process.env.NEXT_PUBLIC_MOCK_DATA === 'true',
  
  // Security
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'dev-secret-key',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
} as const

// Validation
export const isConfigValid = () => {
  const requiredInProduction = [
    env.WALLETCONNECT_PROJECT_ID,
    env.NEXTAUTH_SECRET,
  ]
  
  if (env.NODE_ENV === 'production') {
    return requiredInProduction.every(Boolean)
  }
  
  return true
}

// Development helpers
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'

export const devSettings = {
  skipWebSocketConnections: env.DEV_MODE && (env.SKIP_WEBSOCKETS || !env.ELIZAOS_ENABLED),
  useMockData: env.DEV_MODE && env.MOCK_DATA,
  enableDevTools: env.DEV_MODE,
} as const 