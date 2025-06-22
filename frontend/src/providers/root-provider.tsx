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

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@/contexts/i18n-context';
import { config } from '@/config/wagmi';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  // Estado para controlar hidratação
  const [isClient, setIsClient] = useState(false);
  
  // Query Client otimizado - criado apenas uma vez
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000, // 5 segundos
        gcTime: 2 * 60 * 1000, // 2 minutos
        retry: 3,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 10 * 1000, // 10 segundos
        refetchIntervalInBackground: true,
        // Otimizações para reduzir problemas de chunk loading
        networkMode: 'online',
        retryOnMount: true,
      },
      mutations: {
        retry: 2,
        networkMode: 'online',
      },
    },
  }));

  // Efeito para controlar hidratação
  useEffect(() => {
    setIsClient(true);
    
    // Log de debug apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 RootProvider: Cliente hidratado');
      
      // Monitoramento de queries apenas em desenvolvimento
      const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
        if (event?.type && event?.query?.queryKey) {
          console.log('🔄 React Query Event:', {
            type: event.type,
            query: event.query.queryKey,
            state: event.query.state.status
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [queryClient]);

  // Renderização condicional para evitar problemas de hidratação
  if (!isClient) {
    return (
      <div id="loading-root" className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default RootProvider; 