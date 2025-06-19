'use client'

import { http, createConfig } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
} from 'wagmi/chains'

// Configuração com RainbowKit
export const wagmiConfig = getDefaultConfig({
  appName: 'RiskGuardian AI',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // Project ID válido ou fallback
  chains: [sepolia, polygonMumbai, mainnet, polygon],
  transports: {
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
})

// Configurações adicionais para testnet
export const TESTNET_CHAINS = [
  sepolia,
  polygonMumbai,
]

export const MAINNET_CHAINS = [
  mainnet,
  polygon,
]

// Endereços de contratos por rede
export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    riskRegistry: '0x123...',
    portfolioAnalyzer: '0x456...',
    riskOracle: '0x789...',
    alertSystem: '0xabc...',
    riskInsurance: '0xdef...',
  },
  [polygonMumbai.id]: {
    riskRegistry: '0x123...',
    portfolioAnalyzer: '0x456...',
    riskOracle: '0x789...',
    alertSystem: '0xabc...',
    riskInsurance: '0xdef...',
  },
} as const

// Configuração de desenvolvimento
export const DEV_CONFIG = {
  skipWalletValidation: true,
  mockWalletConnection: true,
  enableTestnetsOnly: true,
} 