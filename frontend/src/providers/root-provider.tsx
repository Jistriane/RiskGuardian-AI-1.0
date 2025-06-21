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

import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@/contexts/i18n-context';
import { config } from '@/config/wagmi';

// Query Client para React Query - configurado para dados em tempo real
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 5 segundos - dados ficam "frescos" por pouco tempo
      gcTime: 2 * 60 * 1000, // 2 minutos - garbage collection mais agressiva
      retry: 3, // Mais tentativas para dados críticos
      refetchOnWindowFocus: true, // Atualizar quando a janela receber foco
      refetchOnMount: true, // Atualizar ao montar componente
      refetchOnReconnect: true, // Atualizar quando reconectar
      refetchInterval: 10 * 1000, // Atualizar a cada 10 segundos para tempo real
      refetchIntervalInBackground: true, // Continuar atualizando em background
    },
    mutations: {
      retry: 2,
    },
  },
});

// Log de debug para monitorar queries
if (process.env.NODE_ENV === 'development') {
  queryClient.getQueryCache().subscribe((event) => {
    console.log('🔄 React Query Event:', {
      type: event.type,
      query: event.query.queryKey,
      state: event.query.state.status
    });
  });
}

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
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