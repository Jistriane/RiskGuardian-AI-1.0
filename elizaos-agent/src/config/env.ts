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

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env-dev';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Required environment variables - removing PORT as it's optional with fallback
const requiredEnvVars = [
  'NODE_ENV',
  'LOG_LEVEL',
  'CORS_ORIGIN',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS'
];

// Check for required environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.warn(`Missing optional configuration: ${missingEnvVars.join(', ')}`);
}

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3003', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // AI Providers
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.ANTHROPIC_MODEL || 'claude-3-opus-20240229'
  },

  // Blockchain (Optional)
  ethereum: {
    rpcUrl: process.env.ETHEREUM_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo'
  },
  polygon: {
    rpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-mumbai.g.alchemy.com/v2/demo'
  },
  bsc: {
    rpcUrl: process.env.BSC_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545'
  },
  avalanche: {
    rpcUrl: process.env.AVALANCHE_RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },

  // Cache Configuration
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '5', 10), // 5 seconds
    checkPeriod: parseInt(process.env.CACHE_CHECK_PERIOD || '1', 10) // 1 second
  }
}; 