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
import { useAccount, useConnect, useDisconnect, useChainId, useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WalletDebug() {
  const [mounted, setMounted] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<any>({});
  
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  useEffect(() => {
    setMounted(true);
    
    // Detectar informações do browser
    if (typeof window !== 'undefined') {
      setBrowserInfo({
        hasEthereum: !!window.ethereum,
        hasMetaMask: !!(window.ethereum?.isMetaMask),
        hasCoinbase: !!(window.ethereum?.isCoinbaseWallet),
        userAgent: navigator.userAgent,
        isSecureContext: window.isSecureContext,
        location: window.location.origin,
      });
    }
  }, []);

  if (!mounted) {
    return (
      <Card className="mt-4 border-yellow-500/50 bg-yellow-900/10">
        <CardContent className="p-4">
          <div className="animate-pulse text-yellow-400">Carregando diagnóstico...</div>
        </CardContent>
      </Card>
    );
  }

  const handleConnectorTest = async (connector: any) => {
    try {
      console.log(`Testando conector: ${connector.name}`);
      await connect({ connector });
    } catch (err) {
      console.error(`Erro no conector ${connector.name}:`, err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status da Conexão */}
      <Card className="border-blue-500/50 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="text-blue-400 text-sm">
            🔍 Status da Conexão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>Conectado: {isConnected ? '✅' : '❌'}</div>
            <div>Conectando: {isConnecting ? '⏳' : '❌'}</div>
            <div>Desconectado: {isDisconnected ? '✅' : '❌'}</div>
            <div>Carregando: {isLoading ? '⏳' : '❌'}</div>
          </div>
          
          {address && (
            <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
              <div><strong>Endereço:</strong> {address}</div>
              <div><strong>Chain ID:</strong> {chainId}</div>
              {balance && (
                <div><strong>Saldo:</strong> {balance.formatted} {balance.symbol}</div>
              )}
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-900/20 border border-red-500/30 rounded">
              <div><strong>Erro:</strong> {error.name}</div>
              <div><strong>Mensagem:</strong> {error.message}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações do Browser */}
      <Card className="border-purple-500/50 bg-purple-900/10">
        <CardHeader>
          <CardTitle className="text-purple-400 text-sm">
            🌐 Informações do Browser
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>Ethereum: {browserInfo.hasEthereum ? '✅' : '❌'}</div>
            <div>MetaMask: {browserInfo.hasMetaMask ? '✅' : '❌'}</div>
            <div>Coinbase: {browserInfo.hasCoinbase ? '✅' : '❌'}</div>
            <div>HTTPS: {browserInfo.isSecureContext ? '✅' : '❌'}</div>
          </div>
          
          <div className="p-2 bg-gray-800 rounded">
            <div><strong>URL:</strong> {browserInfo.location}</div>
            <div><strong>User Agent:</strong> {browserInfo.userAgent?.slice(0, 60)}...</div>
          </div>
        </CardContent>
      </Card>

      {/* Conectores Disponíveis */}
      <Card className="border-green-500/50 bg-green-900/10">
        <CardHeader>
          <CardTitle className="text-green-400 text-sm">
            🔌 Conectores Disponíveis ({connectors.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {connectors.map((connector) => (
            <div key={connector.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <div className="text-xs">
                <div><strong>{connector.name}</strong></div>
                <div className="text-gray-400">ID: {connector.id}</div>
                <div className="text-gray-400">Tipo: {connector.type}</div>
              </div>
              <button
                onClick={() => handleConnectorTest(connector)}
                disabled={isLoading}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  pendingConnector?.id === connector.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {pendingConnector?.id === connector.id ? 'Conectando...' : 'Testar'}
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ações de Debug */}
      <Card className="border-orange-500/50 bg-orange-900/10">
        <CardHeader>
          <CardTitle className="text-orange-400 text-sm">
            🛠️ Ações de Debug
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (window.ethereum) {
                  window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then((accounts: string[]) => {
                      console.log('Contas diretas:', accounts);
                      alert(`Contas encontradas: ${accounts.length}`);
                    })
                    .catch((err: any) => {
                      console.error('Erro na conexão direta:', err);
                      alert(`Erro: ${err.message}`);
                    });
                } else {
                  alert('window.ethereum não disponível');
                }
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
            >
              Teste Direto
            </button>

            <button
              onClick={() => {
                const info = {
                  connectors: connectors.map(c => ({ id: c.id, name: c.name, type: c.type })),
                  browserInfo,
                  wagmiState: { isConnected, isConnecting, isDisconnected, address, chainId },
                  error: error ? { name: error.name, message: error.message } : null
                };
                console.log('Debug Info:', info);
                navigator.clipboard.writeText(JSON.stringify(info, null, 2));
                alert('Informações copiadas para o clipboard');
              }}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
            >
              Copiar Debug
            </button>

            {isConnected && (
              <button
                onClick={() => disconnect()}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
              >
                Desconectar
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs"
            >
              Recarregar
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Instruções de Troubleshooting */}
      <Card className="border-yellow-500/50 bg-yellow-900/10">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-sm">
            💡 Troubleshooting
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <div className="space-y-1">
            <div><strong>❌ Se não conseguir conectar:</strong></div>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
              <li>Verifique se MetaMask/carteira está instalada</li>
              <li>Certifique-se que a carteira está desbloqueada</li>
              <li>Tente recarregar a página</li>
              <li>Verifique se está usando HTTPS</li>
              <li>Teste conexão direta com o botão acima</li>
            </ul>
          </div>
          
          <div className="space-y-1">
            <div><strong>⚠️ Problemas comuns:</strong></div>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
              <li>Popup bloqueado pelo browser</li>
              <li>Carteira já conectada em outra aba</li>
              <li>Rede não suportada</li>
              <li>Extensão desabilitada</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 