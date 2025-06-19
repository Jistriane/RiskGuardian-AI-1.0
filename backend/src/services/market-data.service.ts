import axios from 'axios';
import { cacheService } from './cache.service';
import { logger } from '../utils/logger';
import { multiChainBlockchainService } from './blockchain.service';

export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: number;
}

export interface ChainTokenData {
  chainId: number;
  chainName: string;
  tokens: TokenPrice[];
  nativePrice: TokenPrice;
}

export interface MultiChainMarketData {
  totalMarketCap: number;
  totalVolume: number;
  chains: ChainTokenData[];
  lastUpdated: number;
}

export interface DeFiProtocolData {
  name: string;
  address: string;
  chainId: number;
  tvl: number;
  apy: number;
  riskScore: number;
  category: string;
}

export class MarketDataService {
  private readonly COINGECKO_API = 'https://api.coingecko.com/api/v3';
  private readonly DEFILLAMA_API = 'https://api.llama.fi';
  private readonly CACHE_TTL = 60; // 1 minuto
  private readonly CHAIN_CACHE_TTL = 300; // 5 minutos

  // Mapeamento de chainId para chain names do CoinGecko
  private readonly CHAIN_MAPPING: { [chainId: number]: string } = {
    1: 'ethereum',
    56: 'binance-smart-chain',
    137: 'polygon-pos',
    250: 'fantom',
    43114: 'avalanche',
    10: 'optimistic-ethereum',
    42161: 'arbitrum-one',
    11155111: 'ethereum', // Sepolia -> Ethereum para preços
    80001: 'polygon-pos', // Mumbai -> Polygon para preços
    43113: 'avalanche', // Fuji -> Avalanche para preços
    97: 'binance-smart-chain', // BSC Testnet -> BSC para preços
  };

  // Tokens nativos por chain
  private readonly NATIVE_TOKENS: { [chainId: number]: string } = {
    1: 'ethereum',
    56: 'binancecoin',
    137: 'matic-network',
    250: 'fantom',
    43114: 'avalanche-2',
    10: 'ethereum',
    42161: 'ethereum',
    11155111: 'ethereum',
    80001: 'matic-network',
    43113: 'avalanche-2',
    97: 'binancecoin',
  };

  constructor() {
    this.startPeriodicUpdates();
  }

  // ========== PREÇOS MULTI-CHAIN ==========

  async getMultiChainPrices(): Promise<MultiChainMarketData> {
    try {
      const cacheKey = 'multichain:market-data';
      const cached = await cacheService.get<MultiChainMarketData>(cacheKey);
    
      if (cached) {
        logger.debug('📊 Returning cached multi-chain market data');
        return cached;
      }

      const activeChains = multiChainBlockchainService.getActiveChains();
      const chainDataPromises = activeChains.map(chain => 
        this.getChainMarketData(chain.chainId)
      );

      const chainsData = await Promise.all(chainDataPromises);
      const validChains = chainsData.filter(data => data !== null) as ChainTokenData[];

      const totalMarketCap = validChains.reduce((sum, chain) => 
        sum + chain.tokens.reduce((chainSum, token) => chainSum + token.marketCap, 0), 0
      );

      const totalVolume = validChains.reduce((sum, chain) => 
        sum + chain.tokens.reduce((chainSum, token) => chainSum + token.volume24h, 0), 0
      );

      const marketData: MultiChainMarketData = {
        totalMarketCap,
        totalVolume,
        chains: validChains,
        lastUpdated: Date.now(),
      };

      await cacheService.set(cacheKey, marketData, this.CHAIN_CACHE_TTL);
      
      logger.info(`📊 Multi-chain market data updated: ${validChains.length} chains`);
      return marketData;

    } catch (error) {
      logger.error('❌ Error getting multi-chain prices:', error);
      throw new Error('Failed to fetch multi-chain market data');
    }
  }

  async getChainMarketData(chainId: number): Promise<ChainTokenData | null> {
    try {
      const cacheKey = `chain-market:${chainId}`;
      const cached = await cacheService.get<ChainTokenData>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const chainConfig = multiChainBlockchainService.getChainConfig(chainId);
      if (!chainConfig) return null;

      const chainName = this.CHAIN_MAPPING[chainId];
      if (!chainName) return null;

      // Buscar preços dos tokens principais da chain
      const topTokens = await this.getTopTokensByChain(chainName);
      const nativeTokenId = this.NATIVE_TOKENS[chainId];
      const nativePrice = await this.getTokenPrice(nativeTokenId);

      const chainData: ChainTokenData = {
        chainId,
        chainName: chainConfig.name,
        tokens: topTokens,
        nativePrice,
      };

      await cacheService.set(cacheKey, chainData, this.CACHE_TTL);
      return chainData;

    } catch (error) {
      logger.error(`❌ Error getting chain market data for ${chainId}:`, error);
      return null;
    }
  }

  async getTopTokensByChain(chainName: string): Promise<TokenPrice[]> {
    try {
      const response = await axios.get(
        `${this.COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            category: chainName,
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
          timeout: 10000,
        }
      );

      return response.data.map((token: any): TokenPrice => ({
        symbol: token.symbol.toUpperCase(),
        price: token.current_price || 0,
        change24h: token.price_change_percentage_24h || 0,
        volume24h: token.total_volume || 0,
        marketCap: token.market_cap || 0,
        lastUpdated: Date.now(),
      }));

    } catch (error) {
      logger.error(`❌ Error getting top tokens for ${chainName}:`, error);
      return [];
    }
  }

  async getTokenPrice(tokenId: string): Promise<TokenPrice> {
    try {
      const cacheKey = `token-price:${tokenId}`;
      const cached = await cacheService.get<TokenPrice>(cacheKey);
      
      if (cached) {
        return cached;
      }
      
      const response = await axios.get(
        `${this.COINGECKO_API}/simple/price`,
        {
          params: {
            ids: tokenId,
            vs_currencies: 'usd',
            include_24hr_change: true,
            include_24hr_vol: true,
            include_market_cap: true,
          },
          timeout: 5000,
        }
      );

      const data = response.data[tokenId];
      if (!data) {
        throw new Error(`Token ${tokenId} not found`);
      }

      const tokenPrice: TokenPrice = {
        symbol: tokenId.toUpperCase(),
        price: data.usd || 0,
        change24h: data.usd_24h_change || 0,
        volume24h: data.usd_24h_vol || 0,
        marketCap: data.usd_market_cap || 0,
        lastUpdated: Date.now(),
      };

      await cacheService.set(cacheKey, tokenPrice, this.CACHE_TTL);
      return tokenPrice;

    } catch (error) {
      logger.error(`❌ Error getting token price for ${tokenId}:`, error);
      
      // Retornar dados padrão em caso de erro
      return {
        symbol: tokenId.toUpperCase(),
        price: 0,
        change24h: 0,
        volume24h: 0,
        marketCap: 0,
        lastUpdated: Date.now(),
      };
    }
  }

  // ========== DADOS DeFi ==========

  async getDeFiProtocols(): Promise<DeFiProtocolData[]> {
    try {
      const cacheKey = 'defi:protocols';
      const cached = await cacheService.get<DeFiProtocolData[]>(cacheKey);
      
      if (cached) {
        return cached;
      }

      const response = await axios.get(`${this.DEFILLAMA_API}/protocols`, {
        timeout: 10000,
      });

      const protocols: DeFiProtocolData[] = response.data
        .slice(0, 50) // Top 50 protocolos
        .map((protocol: any): DeFiProtocolData => ({
          name: protocol.name,
          address: protocol.address || '',
          chainId: this.getChainIdFromName(protocol.chain),
          tvl: protocol.tvl || 0,
          apy: protocol.apy || 0,
          riskScore: this.calculateProtocolRiskScore(protocol),
          category: protocol.category || 'defi',
        }))
        .filter((protocol: DeFiProtocolData) => protocol.chainId > 0);

      await cacheService.set(cacheKey, protocols, this.CHAIN_CACHE_TTL);
      return protocols;

    } catch (error) {
      logger.error('❌ Error getting DeFi protocols:', error);
      return [];
    }
  }

  async getProtocolTVL(protocolName: string): Promise<number> {
    try {
      const response = await axios.get(
        `${this.DEFILLAMA_API}/tvl/${protocolName}`,
        { timeout: 5000 }
      );

      return response.data || 0;
    } catch (error) {
      logger.error(`❌ Error getting TVL for ${protocolName}:`, error);
      return 0;
    }
  }

  // ========== UTILITÁRIOS ==========

  private calculateProtocolRiskScore(protocol: any): number {
    let riskScore = 5000; // Base score

    // TVL score (higher TVL = lower risk)
    if (protocol.tvl > 1000000000) riskScore -= 1000; // > $1B
    else if (protocol.tvl > 100000000) riskScore -= 500; // > $100M
    else if (protocol.tvl > 10000000) riskScore -= 200; // > $10M

    // Age score (older = lower risk)
    const ageInDays = protocol.ageInDays || 0;
    if (ageInDays > 365) riskScore -= 500;
    else if (ageInDays > 180) riskScore -= 300;
    else if (ageInDays > 90) riskScore -= 100;

    // Audit score
    if (protocol.audits && protocol.audits.length > 0) {
      riskScore -= 300;
    }

    return Math.max(1000, Math.min(9000, riskScore));
  }

  private getChainIdFromName(chainName: string): number {
    const chainMappingReverse: { [name: string]: number } = {
      'ethereum': 1,
      'bsc': 56,
      'polygon': 137,
      'fantom': 250,
      'avalanche': 43114,
      'optimism': 10,
      'arbitrum': 42161,
    };

    return chainMappingReverse[chainName?.toLowerCase()] || 0;
  }

  // ========== ATUALIZAÇÕES PERIÓDICAS ==========

  private startPeriodicUpdates(): void {
    // Atualizar preços a cada 1 minuto
    setInterval(async () => {
      try {
        await this.getMultiChainPrices();
        logger.debug('📊 Periodic market data update completed');
      } catch (error) {
        logger.error('❌ Error in periodic market data update:', error);
      }
    }, 60000);

    // Atualizar protocolos DeFi a cada 10 minutos
    setInterval(async () => {
      try {
        await this.getDeFiProtocols();
        logger.debug('🏛️ Periodic DeFi data update completed');
      } catch (error) {
        logger.error('❌ Error in periodic DeFi update:', error);
      }
    }, 600000);
  }

  // ========== SAÚDE DO SERVIÇO ==========

  async isHealthy(): Promise<boolean> {
    try {
      // Testar conexão com CoinGecko
      const response = await axios.get(`${this.COINGECKO_API}/ping`, {
        timeout: 5000,
      });

      return response.status === 200;
    } catch (error) {
      logger.error('❌ Market data service health check failed:', error);
      return false;
    }
  }

  async getServiceStats(): Promise<any> {
    return {
      supportedChains: Object.keys(this.CHAIN_MAPPING).length,
      cacheStats: await cacheService.getStats(),
      isHealthy: await this.isHealthy(),
      lastUpdate: Date.now(),
    };
  }
}

// Singleton instance
export const marketDataService = new MarketDataService(); 