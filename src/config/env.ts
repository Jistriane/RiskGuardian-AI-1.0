import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  // Aplicação
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'RiskGuardian AI',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // APIs
  api: {
    backend: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',
    elizaos: process.env.NEXT_PUBLIC_ELIZAOS_URL || 'http://localhost:3000',
    chromiaWs: process.env.NEXT_PUBLIC_CHROMIA_WS_URL || 'ws://localhost:8080',
  },

  // Blockchain
  blockchain: {
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
    chainName: process.env.NEXT_PUBLIC_CHAIN_NAME || 'Sepolia',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.drpc.org',
  },

  // Contratos
  contracts: {
    riskRegistry: process.env.NEXT_PUBLIC_RISK_REGISTRY_ADDRESS || '',
    portfolioAnalyzer: process.env.NEXT_PUBLIC_PORTFOLIO_ANALYZER_ADDRESS || '',
    riskInsurance: process.env.NEXT_PUBLIC_RISK_INSURANCE_ADDRESS || '',
    hedgeAutomation: process.env.NEXT_PUBLIC_HEDGE_AUTOMATION_ADDRESS || '',
  },

  // Features
  features: {
    tradingView: process.env.NEXT_PUBLIC_TRADINGVIEW_ENABLED === 'true',
    debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
  },

  // URLs dos serviços
  services: {
    backend: 'http://localhost:3001',
    elizaos: 'http://localhost:3000', 
    chromia: 'http://localhost:8080',
  }
} as const;

export type Config = typeof config; 