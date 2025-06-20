'use client';

import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { metaMask, coinbaseWallet } from 'wagmi/connectors';
import { I18nProvider } from '@/contexts/i18n-context';
import '@rainbow-me/rainbowkit/styles.css';

// Configuração simplificada sem WalletConnect
const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({ 
      appName: 'RiskGuardian AI'
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 60 * 1000,
    },
  },
});

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <I18nProvider>
      <WagmiProvider config={config as any}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">
            <div className="min-h-screen bg-gray-900 text-white">
              {children}
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </I18nProvider>
  );
}

export default RootProvider; 