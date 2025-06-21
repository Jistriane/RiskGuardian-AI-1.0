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
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasWeb3Wallet, setHasWeb3Wallet] = useState(false);

  useEffect(() => {
    // Verificar se uma carteira Web3 está disponível
    if (typeof window !== 'undefined') {
      setHasWeb3Wallet(!!window.ethereum);
    }
  }, []);

  const handleConnect = async (openConnectModal: () => void) => {
    setIsConnecting(true);
    
    try {
      // Verificar se uma carteira Web3 está instalada
      if (!hasWeb3Wallet) {
        const shouldInstall = confirm(
          'Carteira Web3 não detectada!\n\nPara conectar sua carteira, você precisa instalar uma carteira compatível (MetaMask, Trust Wallet, etc.).\n\nDeseja ser redirecionado para a página do MetaMask?'
        );
        
        if (shouldInstall) {
          window.open('https://metamask.io/download/', '_blank');
        }
        return;
      }

      // Tentar conectar com a carteira Web3
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error: any) {
          if (error.code === 4001) {
            alert('Conexão cancelada pelo usuário.');
            return;
          }
        }
      }
      
      openConnectModal();
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira. Verifique se sua carteira está desbloqueada e tente novamente.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Aguarda hidratação
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={() => handleConnect(openConnectModal)}
                    disabled={isConnecting}
                    className={`w-full px-4 py-3 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg ${
                      isConnecting 
                        ? 'bg-gray-600 opacity-75 cursor-not-allowed' 
                        : hasWeb3Wallet
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105'
                          : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                    }`}
                  >
                    {isConnecting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Conectando...
                      </>
                    ) : hasWeb3Wallet ? (
                      <>
                        💼 Connect Wallet
                      </>
                    ) : (
                      <>
                        ⚠️ Instalar Carteira Web3
                      </>
                    )}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
                  >
                    ⚠️ Rede Não Suportada
                  </button>
                );
              }

              return (
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={openChainModal}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md text-sm font-medium text-white transition-colors"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    📡 {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    <span className="text-lg">👤</span>
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{account.displayName}</span>
                      {account.displayBalance && (
                        <span className="text-xs opacity-75">
                          {account.displayBalance}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
} 