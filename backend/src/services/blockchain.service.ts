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

import { ethers } from 'ethers';
import { logger } from '../utils/logger';
import { config } from '../config/environment';

// Interfaces para Multi-Chain
export interface ChainConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  ccipRouter?: string;
  ccipChainSelector?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  isActive: boolean;
  lastIndexedBlock: number;
}

export interface CrossChainMessage {
  id: string;
  sourceChain: number;
  destinationChain: number;
  data: any;
  status: 'pending' | 'sent' | 'confirmed' | 'failed';
  txHash?: string;
  createdAt: Date;
}

export interface BlockchainIndexData {
  chainId: number;
  blockNumber: number;
  transactions: any[];
  portfolioData: any[];
  riskMetrics: any[];
  timestamp: Date;
}

// Configurações das chains suportadas
const SUPPORTED_CHAINS: { [chainId: number]: ChainConfig } = {
  // Ethereum Sepolia Testnet
  11155111: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: process.env.SEPOLIA_RPC_URL || 'https://sepolia.drpc.org',
    explorerUrl: 'https://sepolia.etherscan.io',
    ccipRouter: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
    ccipChainSelector: '16015286601757825753',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isActive: true,
    lastIndexedBlock: 0,
  },
  // Polygon Mumbai Testnet  
  80001: {
    chainId: 80001,
    name: 'Mumbai Testnet',
    rpcUrl: process.env.MUMBAI_RPC_URL || 'https://rpc-mumbai.maticvigil.com',
    explorerUrl: 'https://mumbai.polygonscan.com',
    ccipRouter: '0x70499c328e1E2a3c41108bd3730F6670a44595D1',
    ccipChainSelector: '12532609583862916517',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    isActive: true,
    lastIndexedBlock: 0,
  },
  // Avalanche Fuji Testnet
  43113: {
    chainId: 43113,
    name: 'Avalanche Fuji',
    rpcUrl: process.env.FUJI_RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    ccipRouter: '0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8',
    ccipChainSelector: '14767482510784806043',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    isActive: true,
    lastIndexedBlock: 0,
  },
  // BSC Testnet
  97: {
    chainId: 97,
    name: 'BSC Testnet',
    rpcUrl: process.env.BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
    explorerUrl: 'https://testnet.bscscan.com',
    ccipRouter: '0x9527E2d01A3064ef6b50c1Da1C0cC523803BCFF2',
    ccipChainSelector: '13264668187771770619',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    isActive: true,
    lastIndexedBlock: 0,
  },
};

export class MultiChainBlockchainService {
  private providers: Map<number, ethers.JsonRpcProvider> = new Map();
  private chainConfigs: Map<number, ChainConfig> = new Map();
  private indexingIntervals: Map<number, NodeJS.Timeout> = new Map();
  private isConnected: boolean = false;
  private crossChainMessages: Map<string, CrossChainMessage> = new Map();

  constructor() {
    this.initializeChains();
  }

  // Inicializar todas as chains suportadas
  private initializeChains() {
    Object.values(SUPPORTED_CHAINS).forEach(chainConfig => {
      if (chainConfig.isActive) {
        this.chainConfigs.set(chainConfig.chainId, chainConfig);
        
        try {
          const provider = new ethers.JsonRpcProvider(chainConfig.rpcUrl);
          this.providers.set(chainConfig.chainId, provider);
          logger.info(`🔗 Initialized provider for ${chainConfig.name} (${chainConfig.chainId})`);
        } catch (error) {
          logger.error(`❌ Failed to initialize provider for ${chainConfig.name}:`, error);
        }
      }
    });
  }

  // Conectar a todas as chains
  async connect(): Promise<boolean> {
    try {
      logger.info('🔄 Connecting to multiple blockchains...');
      
      const connectionPromises = Array.from(this.providers.entries()).map(
        async ([chainId, provider]) => {
          try {
            const blockNumber = await provider.getBlockNumber();
            const chainConfig = this.chainConfigs.get(chainId)!;
            chainConfig.lastIndexedBlock = blockNumber;
            
            logger.info(`✅ Connected to ${chainConfig.name}: Block ${blockNumber}`);
            return { chainId, success: true };
          } catch (error) {
            logger.error(`❌ Failed to connect to chain ${chainId}:`, error);
            return { chainId, success: false };
          }
        }
      );

      const results = await Promise.all(connectionPromises);
      const successfulConnections = results.filter(r => r.success).length;
      
      this.isConnected = successfulConnections > 0;
      
      logger.info(`🌐 Multi-chain connection: ${successfulConnections}/${results.length} chains connected`);
      
      if (this.isConnected) {
        await this.startIndexing();
      }
      
      return this.isConnected;
      
    } catch (error) {
      logger.error('❌ Multi-chain connection failed:', error);
      this.isConnected = false;
      return false;
    }
  }

  // Iniciar indexação para todas as chains
  private async startIndexing() {
    for (const [chainId, chainConfig] of this.chainConfigs) {
      if (chainConfig.isActive) {
        const interval = setInterval(
          () => this.indexChainData(chainId),
          30000 // Indexar a cada 30 segundos
        );
        
        this.indexingIntervals.set(chainId, interval);
        logger.info(`📊 Started indexing for ${chainConfig.name}`);
      }
    }
  }

  // Indexar dados de uma chain específica
  private async indexChainData(chainId: number): Promise<void> {
    try {
      const provider = this.providers.get(chainId);
      const chainConfig = this.chainConfigs.get(chainId);
      
      if (!provider || !chainConfig) return;

      const currentBlock = await provider.getBlockNumber();
      const lastIndexed = chainConfig.lastIndexedBlock;

      if (currentBlock > lastIndexed) {
        // Indexar blocos perdidos
        const blocksToIndex = Math.min(currentBlock - lastIndexed, 10); // Máximo 10 blocos por vez
        
        for (let i = 1; i <= blocksToIndex; i++) {
          const blockNumber = lastIndexed + i;
          await this.indexBlock(chainId, blockNumber);
        }

        chainConfig.lastIndexedBlock = currentBlock;
        logger.debug(`📈 Indexed ${blocksToIndex} blocks for ${chainConfig.name}`);
      }
    } catch (error) {
      logger.error(`❌ Error indexing chain ${chainId}:`, error);
    }
  }

  // Indexar um bloco específico
  private async indexBlock(chainId: number, blockNumber: number): Promise<BlockchainIndexData | null> {
    try {
      const provider = this.providers.get(chainId);
      if (!provider) return null;

      const block = await provider.getBlock(blockNumber, true);
      if (!block) return null;

      const indexData: BlockchainIndexData = {
        chainId,
        blockNumber,
        transactions: [...(block.transactions || [])],
        portfolioData: [], // Implementar análise de portfólio
        riskMetrics: [], // Implementar análise de risco
        timestamp: new Date(),
      };

      // Emitir evento para outros serviços
      this.emitBlockIndexed(indexData);

      return indexData;
    } catch (error) {
      logger.error(`❌ Error indexing block ${blockNumber} on chain ${chainId}:`, error);
      return null;
    }
  }

  // Obter dados de múltiplas chains
  async getMultiChainData(address: string): Promise<any> {
    try {
      const chainPromises = Array.from(this.providers.entries()).map(
        async ([chainId, provider]) => {
          try {
            const balance = await provider.getBalance(address);
            const chainConfig = this.chainConfigs.get(chainId)!;
            
            return {
              chainId,
              chainName: chainConfig.name,
              balance: ethers.formatEther(balance),
              nativeCurrency: chainConfig.nativeCurrency,
              blockNumber: chainConfig.lastIndexedBlock,
            };
          } catch (error) {
            logger.error(`Error getting data from chain ${chainId}:`, error);
            return null;
          }
        }
      );

      const results = await Promise.all(chainPromises);
      return results.filter(r => r !== null);
    } catch (error) {
      logger.error('❌ Error getting multi-chain data:', error);
      return [];
    }
  }

  // Enviar mensagem cross-chain via CCIP
  async sendCrossChainMessage(
    sourceChain: number,
    destinationChain: number,
    data: any
  ): Promise<string> {
    try {
      const sourceConfig = this.chainConfigs.get(sourceChain);
      const destConfig = this.chainConfigs.get(destinationChain);
      
      if (!sourceConfig || !destConfig) {
        throw new Error('Chain configuration not found');
      }

      const messageId = `ccip_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      
      const message: CrossChainMessage = {
        id: messageId,
        sourceChain,
        destinationChain,
        data,
        status: 'pending',
        createdAt: new Date(),
      };

      this.crossChainMessages.set(messageId, message);

      // Simular envio CCIP (implementar lógica real depois)
      logger.info(`📤 CCIP Message sent: ${messageId} from ${sourceConfig.name} to ${destConfig.name}`);
      
      // Atualizar status após "confirmação"
      setTimeout(() => {
        message.status = 'confirmed';
        message.txHash = `0x${Math.random().toString(16).slice(2)}`;
        logger.info(`✅ CCIP Message confirmed: ${messageId}`);
      }, 5000);

      return messageId;
    } catch (error) {
      logger.error('❌ Error sending cross-chain message:', error);
      throw error;
    }
  }

  // Obter status de mensagem cross-chain
  getCrossChainMessageStatus(messageId: string): CrossChainMessage | null {
    return this.crossChainMessages.get(messageId) || null;
  }

  // Obter configuração de uma chain
  getChainConfig(chainId: number): ChainConfig | null {
    return this.chainConfigs.get(chainId) || null;
  }

  // Obter todas as chains ativas
  getActiveChains(): ChainConfig[] {
    return Array.from(this.chainConfigs.values()).filter(config => config.isActive);
  }

  // Obter provider de uma chain específica
  getProvider(chainId: number): ethers.JsonRpcProvider | null {
    return this.providers.get(chainId) || null;
  }

  // Verificar saúde do serviço
  isHealthy(): boolean {
    return this.isConnected && this.providers.size > 0;
  }

  // Obter estatísticas do serviço
  getStats(): any {
    return {
      isConnected: this.isConnected,
      connectedChains: this.providers.size,
      activeChains: Array.from(this.chainConfigs.values()).filter(c => c.isActive).length,
      crossChainMessages: this.crossChainMessages.size,
      lastIndexedBlocks: Object.fromEntries(
        Array.from(this.chainConfigs.entries()).map(([id, config]) => [id, config.lastIndexedBlock])
      ),
    };
  }

  // Emitir evento de bloco indexado (para WebSocket ou outros serviços)
  private emitBlockIndexed(data: BlockchainIndexData): void {
    // Implementar emissão de eventos para WebSocket
    logger.debug(`📡 Block indexed event: Chain ${data.chainId}, Block ${data.blockNumber}`);
  }

  // Parar indexação e limpar recursos
  async disconnect(): Promise<void> {
    try {
      // Parar todos os intervalos de indexação
      for (const interval of this.indexingIntervals.values()) {
        clearInterval(interval);
      }
      this.indexingIntervals.clear();

      // Limpar providers
      this.providers.clear();
      this.chainConfigs.clear();
      
      this.isConnected = false;
      logger.info('🔌 Multi-chain blockchain service disconnected');
    } catch (error) {
      logger.error('❌ Error disconnecting blockchain service:', error);
    }
  }
}

// Singleton instance
export const multiChainBlockchainService = new MultiChainBlockchainService();

// Backward compatibility - manter interface antiga
export class BlockchainService {
  async connect(): Promise<boolean> {
    return await multiChainBlockchainService.connect();
  }

  async getRiskScore(address: string): Promise<number> {
    // Implementação usando dados multi-chain
    const multiChainData = await multiChainBlockchainService.getMultiChainData(address);
    return Math.floor(Math.random() * 8000) + 1000; // Mock por enquanto
  }

  async getProtocol(address: string) {
    return {
      name: 'Multi-Chain Protocol',
      address,
      riskMetrics: {
        overallRisk: 4000,
        auditScore: 8500,
        liquidityScore: 7000
      }
    };
  }

  async createInsurancePolicy(userAddress: string, data: any): Promise<any> {
    // Mock implementation for insurance policy creation
    return {
      policyId: `policy_${Date.now()}`,
      userAddress,
      coverage: data.coverage || 100000,
      premium: data.premium || 1000,
      status: 'active',
      txHash: `0x${Math.random().toString(16).slice(2)}`,
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
  }

  async claimInsurance(policyId: string, userAddress: string): Promise<any> {
    // Mock implementation for insurance claim
    return {
      claimId: `claim_${Date.now()}`,
      policyId,
      userAddress,
      amount: Math.floor(Math.random() * 50000) + 10000,
      status: 'approved',
      txHash: `0x${Math.random().toString(16).slice(2)}`,
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
  }

  isHealthy(): boolean {
    return multiChainBlockchainService.isHealthy();
  }

  async getNetworkInfo() {
    const stats = multiChainBlockchainService.getStats();
    return {
      chainId: 11155111, // Default para compatibilidade
      name: 'Multi-Chain',
      blockNumber: stats.lastIndexedBlocks[11155111] || 0,
      connected: stats.isConnected,
      multiChain: {
        connectedChains: stats.connectedChains,
        activeChains: stats.activeChains,
        chains: multiChainBlockchainService.getActiveChains(),
      }
    };
  }
}

export const blockchainService = new BlockchainService();
