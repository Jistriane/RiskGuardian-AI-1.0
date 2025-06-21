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

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WalletDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const info = {
        hasEthereum: !!window.ethereum,
        isMetaMask: window.ethereum?.isMetaMask,
        userAgent: navigator.userAgent,
        accounts: null,
        chainId: null,
      };

      // Tentar obter informações da rede
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            info.accounts = accounts;
            setDebugInfo({...info});
          })
          .catch(() => {
            info.accounts = 'Erro ao obter contas';
            setDebugInfo({...info});
          });

        window.ethereum.request({ method: 'eth_chainId' })
          .then((chainId: string) => {
            info.chainId = chainId;
            setDebugInfo({...info});
          })
          .catch(() => {
            info.chainId = 'Erro ao obter chain ID';
            setDebugInfo({...info});
          });
      }

      setDebugInfo(info);
    }
  }, []);

  return (
    <Card className="mt-4 border-yellow-500/50 bg-yellow-900/10">
      <CardHeader>
        <CardTitle className="text-yellow-400 text-sm">
          🔍 Diagnóstico da Carteira
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Ethereum Provider:</span>
            <span className={debugInfo.hasEthereum ? 'text-green-400' : 'text-red-400'}>
              {debugInfo.hasEthereum ? '✅ Detectado' : '❌ Não detectado'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>MetaMask:</span>
            <span className={debugInfo.isMetaMask ? 'text-green-400' : 'text-red-400'}>
              {debugInfo.isMetaMask ? '✅ Detectado' : '❌ Não detectado'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Contas:</span>
            <span className="text-gray-300 max-w-32 truncate">
              {Array.isArray(debugInfo.accounts) 
                ? debugInfo.accounts.length > 0 
                  ? `${debugInfo.accounts.length} conta(s)`
                  : 'Nenhuma conta'
                : debugInfo.accounts || 'Carregando...'
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span>Chain ID:</span>
            <span className="text-gray-300">
              {debugInfo.chainId || 'Carregando...'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Navegador:</span>
            <span className="text-gray-300 max-w-32 truncate">
              {debugInfo.userAgent?.includes('Chrome') ? 'Chrome' :
               debugInfo.userAgent?.includes('Firefox') ? 'Firefox' :
               debugInfo.userAgent?.includes('Safari') ? 'Safari' : 'Outro'}
            </span>
          </div>
        </div>
        
        {!debugInfo.hasEthereum && (
          <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
            ⚠️ MetaMask não detectado. Instale em: https://metamask.io/download/
          </div>
        )}
        
        {debugInfo.hasEthereum && !debugInfo.isMetaMask && (
          <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-500/30 rounded text-xs text-yellow-300">
            ℹ️ Provider diferente do MetaMask detectado. Pode haver incompatibilidades.
          </div>
        )}
      </CardContent>
    </Card>
  );
} 