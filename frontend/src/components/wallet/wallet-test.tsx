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

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WalletTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');

  const connectMetaMask = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Solicitar conexão
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
          
          // Obter saldo
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          });
          
          // Converter de Wei para ETH
          const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
          setBalance(balanceInEth.toFixed(4));
        }
      } catch (error: any) {
        console.error('Erro ao conectar MetaMask:', error);
        if (error.code === 4001) {
          alert('Conexão rejeitada pelo usuário.');
        } else {
          alert('Erro ao conectar. Verifique se o MetaMask está instalado e desbloqueado.');
        }
      }
    } else {
      alert('MetaMask não detectado! Instale em: https://metamask.io/download/');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    setBalance('');
  };

  return (
    <Card className="mt-4 border-blue-500/50 bg-blue-900/10">
      <CardHeader>
        <CardTitle className="text-blue-400 text-sm">
          🧪 Teste de Conexão de Carteira
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              Clique no botão abaixo para testar a conexão direta com sua carteira:
            </p>
            <button
              onClick={connectMetaMask}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              🔗 Conectar Carteira (Teste)
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">✅ Conectado com sucesso!</h4>
              <div className="text-xs space-y-1">
                <div><strong>Endereço:</strong> {address.slice(0, 6)}...{address.slice(-4)}</div>
                <div><strong>Saldo:</strong> {balance} ETH</div>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Desconectar
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 