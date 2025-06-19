'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import { wagmiConfig } from '@/config/wagmi'
import { useState, useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

interface RootProviderProps {
  children: React.ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Create query client instance once
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent SSR mismatch by not rendering WalletConnect on server
  if (!mounted) {
    return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    )
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme({
              accentColor: '#3b82f6',
              borderRadius: 'medium',
            }),
            darkMode: darkTheme({
              accentColor: '#3b82f6',
              borderRadius: 'medium',
            }),
          }}
          appInfo={{
            appName: 'RiskGuardian AI',
            learnMoreUrl: 'https://riskguardian.ai',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
} 