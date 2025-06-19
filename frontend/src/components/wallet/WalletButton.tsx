'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
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
        // Aguardar montar o componente
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            className={className}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all",
                      "bg-aurora-purple/20 border-aurora-purple/50 text-aurora-purple hover:bg-aurora-purple/30",
                      "aurora-glow hover:scale-105 active:scale-95"
                    )}
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Conectar Carteira
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all",
                      "bg-destructive/20 border-destructive/50 text-destructive hover:bg-destructive/30"
                    )}
                    onClick={openChainModal}
                    type="button"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Rede Incorreta
                    </span>
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-2">
                  {/* Botão da Chain */}
                  <button
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all",
                      "bg-aurora-blue/20 border-aurora-blue/50 text-aurora-blue hover:bg-aurora-blue/30",
                      "text-xs"
                    )}
                    onClick={openChainModal}
                    type="button"
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
                    <span>{chain.name}</span>
                  </button>

                  {/* Botão da Conta */}
                  <button
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all",
                      "bg-aurora-green/20 border-aurora-green/50 text-aurora-green hover:bg-aurora-green/30",
                      "aurora-glow"
                    )}
                    onClick={openAccountModal}
                    type="button"
                  >
                    <Wallet className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        {account.displayName}
                      </div>
                      {account.displayBalance && (
                        <div className="text-xs opacity-70">
                          {account.displayBalance}
                        </div>
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

export default WalletButton; 