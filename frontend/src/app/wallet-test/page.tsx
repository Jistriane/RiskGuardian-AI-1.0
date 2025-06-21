/**
 * @title RiskGuardian AI - Página de Teste da Carteira
 * @author Jistriane (jistriane@live.com)
 * @description Página para testar e debuggar dados da carteira em tempo real
 */

'use client';

import { useAccount, useBalance, useChainId } from 'wagmi';
import { useWalletData } from '@/hooks/useWalletData';
import { useRealWalletTokens } from '@/hooks/useRealWalletTokens';
import { WalletButton } from '@/components/wallet/wallet-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export default function WalletTestPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: nativeBalance } = useBalance({ address });
  
  const { walletData, isLoading, error, refresh } = useWalletData();
  const { tokens, isLoading: tokensLoading, refreshTokens, supportedTokens } = useRealWalletTokens();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Teste da Carteira - Debug Mode</h1>
        
        {!isConnected && (
          <div className="w-64">
            <WalletButton />
          </div>
        )}

        {isConnected && (
          <>
            {/* Informações básicas */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Informações da Carteira</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-2">
                <div><strong>Endereço:</strong> {address}</div>
                <div><strong>Chain ID:</strong> {chainId}</div>
                <div><strong>Rede:</strong> {
                  chainId === 1 ? 'Ethereum Mainnet' :
                  chainId === 11155111 ? 'Sepolia Testnet' :
                  chainId === 137 ? 'Polygon' :
                  chainId === 42161 ? 'Arbitrum' :
                  'Desconhecida'
                }</div>
                <div><strong>Balance ETH:</strong> {nativeBalance ? `${parseFloat(nativeBalance.formatted).toFixed(6)} ETH` : 'Carregando...'}</div>
              </CardContent>
            </Card>

            {/* Tokens suportados */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Tokens Suportados na Rede</CardTitle>
                <button
                  onClick={refreshTokens}
                  disabled={tokensLoading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${tokensLoading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </CardHeader>
              <CardContent>
                {supportedTokens && supportedTokens.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supportedTokens.map((token, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <div className="text-white font-medium">{token.symbol}</div>
                        <div className="text-gray-300 text-sm">{token.name}</div>
                        <div className="text-gray-400 text-xs font-mono">{token.address}</div>
                        <div className="text-gray-400 text-xs">Decimals: {token.decimals}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400">Nenhum token suportado encontrado para esta rede</div>
                )}
              </CardContent>
            </Card>

            {/* Tokens encontrados */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Tokens Encontrados na Carteira</CardTitle>
              </CardHeader>
              <CardContent>
                {tokensLoading ? (
                  <div className="text-gray-400">Carregando tokens...</div>
                ) : tokens.length > 0 ? (
                  <div className="space-y-3">
                    {tokens.map((token, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">{token.symbol}</div>
                          <div className="text-gray-300 text-sm">{token.name}</div>
                          <div className="text-gray-400 text-xs font-mono">{token.address}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{parseFloat(token.balance).toFixed(6)}</div>
                          <div className="text-green-400 text-sm">${token.value.toFixed(2)}</div>
                          <div className="text-gray-400 text-xs">@${token.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400">
                    Nenhum token encontrado na carteira para esta rede.
                    <br />
                    <small>Certifique-se de que você tem tokens ERC20 na carteira conectada.</small>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dados consolidados */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Dados Consolidados</CardTitle>
                <button
                  onClick={refresh}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Atualizar Tudo
                </button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-gray-400">Carregando dados consolidados...</div>
                ) : walletData ? (
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-white font-medium text-lg">
                        Valor Total: ${walletData.totalValue.toFixed(2)}
                      </div>
                      <div className="text-gray-300">
                        Variação 24h: {walletData.totalChange24h.toFixed(2)}%
                      </div>
                      <div className="text-gray-400 text-sm">
                        Última atualização: {walletData.lastUpdated.toLocaleString('pt-BR')}
                      </div>
                    </div>

                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-white font-medium">Balance Nativo (ETH)</div>
                      <div className="text-gray-300">{walletData.nativeBalance.formatted} ETH</div>
                      <div className="text-green-400">${walletData.nativeBalance.value.toFixed(2)}</div>
                    </div>

                    {walletData.balances.map((balance, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <div className="text-white font-medium">{balance.symbol}</div>
                        <div className="text-gray-300">{balance.balance} {balance.symbol}</div>
                        <div className="text-green-400">${balance.value.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400">Nenhum dado consolidado disponível</div>
                )}
              </CardContent>
            </Card>

            {/* Erros */}
            {error && (
              <Card className="bg-red-900/20 border-red-600">
                <CardHeader>
                  <CardTitle className="text-red-400">Erro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-red-300">{error}</div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}