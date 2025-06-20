import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// Project ID para WalletConnect
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2c4d1b29a853cac73e4e05a1cb7b2efb';

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum],
  connectors: [
    metaMask(),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: 'RiskGuardian AI',
      appLogoUrl: 'https://example.com/logo.png',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

// Contratos no Sepolia Testnet
export const CONTRACTS = {
  RISK_GUARDIAN_MASTER: '0x742d35Cc6635C0532925a5F9b8F8E64d2DD10b23' as const,
  PORTFOLIO_ANALYZER: '0x845B3e58C91C5c5c5c5c5c5c5c5c5c5c5c5c5c5c' as const,
  RISK_ORACLE: '0x932F4e58C91C5c5c5c5c5c5c5c5c5c5c5c5c5c5c' as const,
  RISK_INSURANCE: '0xA23F4e58C91C5c5c5c5c5c5c5c5c5c5c5c5c5c5c' as const,
  ALERT_SYSTEM: '0xB45F4e58C91C5c5c5c5c5c5c5c5c5c5c5c5c5c5c' as const,
  RISK_REGISTRY: '0xC67F4e58C91C5c5c5c5c5c5c5c5c5c5c5c5c5c5c' as const,
};

// Tokens principais
export const TOKENS = {
  USDC: '0xA0b86a33E6C17536045d6b77D9a0d6A1A67E9e9e' as const,
  WETH: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14' as const,
  LINK: '0x779877A7B0D9E8603169DdbD7836e478b4624789' as const,
};

// Price Feeds do Chainlink
export const PRICE_FEEDS = {
  ETH_USD: '0x694AA1769357215DE4FAC081bf1f309aDC325306' as const,
  USDC_USD: '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E' as const,
  LINK_USD: '0xc59E3633BAAC79493d908e63626716e204A45EdF' as const,
}; 