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
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export function WalletButton() {
  const [mounted, setMounted] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Previne renderização no servidor
  if (!mounted) {
    return (
      <div className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
        Carregando...
      </div>
    );
  }

  // Função para conectar carteira
  const handleConnect = async (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    if (connector) {
      try {
        await connect({ connector });
        setShowWalletModal(false);
      } catch (error) {
        console.error('Erro ao conectar:', error);
      }
    }
  };

  // Função para trocar de rede
  const handleSwitchNetwork = async (targetChainId: number) => {
    try {
      await switchChain({ chainId: targetChainId });
    } catch (error) {
      console.error('Erro ao trocar rede:', error);
    }
  };

  // Se conectado, mostrar informações da conta
  if (isConnected && address) {
    const isWrongNetwork = chainId !== mainnet.id && chainId !== sepolia.id;
    
    return (
      <div className="space-y-2">
        <div className={`px-4 py-3 rounded-lg flex items-center justify-between ${
          isWrongNetwork ? 'bg-red-600' : 'bg-green-600'
        } text-white`}>
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span className="font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          <button
            onClick={() => disconnect()}
            className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
          >
            Desconectar
          </button>
        </div>
        
        {isWrongNetwork && (
          <div className="space-y-2">
            <p className="text-sm text-red-500">Rede não suportada. Troque para:</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSwitchNetwork(mainnet.id)}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
              >
                Mainnet
              </button>
              <button
                onClick={() => handleSwitchNetwork(sepolia.id)}
                className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
              >
                Sepolia
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mapeamento de ícones para conectores conhecidos
  const getConnectorIcon = (name: string) => {
    const iconMap: Record<string, string> = {
      'MetaMask': '🦊',
      'Injected': '💼',
      'WalletConnect': '🔗',
      'Coinbase Wallet': '🔵',
      'Trust Wallet': '🛡️',
      'Brave Wallet': '🦁',
    };
    return iconMap[name] || '💼';
  };

  return (
    <div className="space-y-2">
      {/* Botão principal de conexão */}
      <button
        onClick={() => setShowWalletModal(true)}
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 w-full justify-center"
      >
        {isPending ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            Conectando...
          </>
        ) : (
          <>
            🔗 Conectar Carteira
          </>
        )}
      </button>

      {/* Modal de seleção de carteiras */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Conectar Carteira</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector.id)}
                  className="w-full p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">{getConnectorIcon(connector.name)}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{connector.name}</div>
                    <div className="text-sm text-gray-500">
                      {connector.name === 'Injected' ? 'Detecta automaticamente carteiras instaladas' : 'Conectar via ' + connector.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              Carteiras suportadas: MetaMask, Trust Wallet, Coinbase Wallet, Brave Wallet e outras compatíveis com Web3
            </div>
          </div>
        </div>
      )}

      {/* Informações de debug em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div>Status: {isConnected ? 'Conectado' : 'Desconectado'}</div>
          <div>Conectores disponíveis: {connectors.length}</div>
          {connectors.length > 0 && (
            <div>Tipos: {connectors.map(c => c.name).join(', ')}</div>
          )}
          <div>Rede atual: {chainId}</div>
        </div>
      )}
    </div>
  );
} 