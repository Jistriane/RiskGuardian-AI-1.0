import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const wagmiConfig = getDefaultConfig({
  appName: config.app.name,
  projectId: 'your-walletconnect-project-id', // Obtenha em https://cloud.walletconnect.com
  chains: [sepolia],
  ssr: true,
});

// Configuração de chain customizada para Sepolia
export const sepoliaChain = {
  id: 11155111,
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: [config.blockchain.rpcUrl] },
    default: { http: [config.blockchain.rpcUrl] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
} as const; 