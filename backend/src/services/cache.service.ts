import Redis from 'ioredis';
import { logger } from '../utils/logger';
import { config } from '../config/environment';

export interface CacheStats {
  hits: number;
  misses: number;
  keys: number;
  memory: string;
  connected: boolean;
}

export interface MultiChainCacheData {
  chainId: number;
  address: string;
  data: any;
  timestamp: number;
  ttl: number;
}

export class RedisCacheService {
  private redis: Redis | null = null;
  private isConnected: boolean = false;
  private hits: number = 0;
  private misses: number = 0;
  private readonly DEFAULT_TTL = 300; // 5 minutos

  constructor() {
    // Verificar se Redis está habilitado
    const redisEnabled = process.env.REDIS_ENABLED === 'true';
    
    if (redisEnabled) {
      this.connectIfNeeded();
    } else {
      logger.info('📋 Redis desabilitado - funcionando sem cache');
      this.isConnected = false;
      this.redis = null;
    }
  }

  private async connectIfNeeded(): Promise<void> {
    if (!this.redis || !this.isConnected) {
      try {
        await this.connect();
      } catch (error) {
        logger.warn('⚠️ Redis connection failed, running without cache:', (error as Error).message);
        this.isConnected = false;
      }
    }
  }

  async connect(): Promise<void> {
    try {
      // Configurar Redis com opções básicas e válidas
      this.redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0'),
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        lazyConnect: true,
        connectionName: 'riskguardian-backend',
      });

      // Event listeners
      this.redis.on('connect', () => {
        logger.info('📋 Redis connecting...');
      });

      this.redis.on('ready', () => {
        this.isConnected = true;
        logger.info('✅ Redis connected and ready');
      });

      this.redis.on('error', (error) => {
        this.isConnected = false;
        logger.error('❌ Redis error:', error);
      });

      this.redis.on('close', () => {
        this.isConnected = false;
        logger.warn('⚠️ Redis connection closed');
      });

      this.redis.on('reconnecting', () => {
        logger.info('🔄 Redis reconnecting...');
      });

      // Conectar com timeout
      await Promise.race([
        this.redis.connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Redis connection timeout')), 5000)
        )
      ]);
      
    } catch (error) {
      logger.warn('⚠️ Redis connection failed, continuing without cache:', (error as Error).message);
      this.isConnected = false;
      this.redis = null;
      // Não propagar o erro para permitir que o app continue
    }
  }

  // ========== OPERAÇÕES BÁSICAS ==========

  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.redis || !this.isConnected) {
        this.misses++;
        return null;
      }

      const value = await this.redis.get(key);
      if (!value) {
        this.misses++;
        return null;
      }

      this.hits++;
      return JSON.parse(value) as T;
    } catch (error) {
      logger.error('Redis get error:', error);
      this.misses++;
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = this.DEFAULT_TTL): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;

      const serializedValue = JSON.stringify(value);
      await this.redis.setex(key, ttlSeconds, serializedValue);
      
      logger.debug(`📋 Cache SET: ${key} (TTL: ${ttlSeconds}s)`);
    } catch (error) {
      logger.error('Redis set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;
      
      await this.redis.del(key);
      logger.debug(`📋 Cache DEL: ${key}`);
    } catch (error) {
      logger.error('Redis delete error:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!this.redis || !this.isConnected) return false;
      
      const exists = await this.redis.exists(key);
      return exists === 1;
    } catch (error) {
      logger.error('Redis exists error:', error);
      return false;
    }
  }

  // ========== OPERAÇÕES MULTI-CHAIN ==========

  // Salvar dados multi-chain
  async setMultiChainData(
    chainId: number, 
    address: string, 
    data: any, 
    ttl: number = this.DEFAULT_TTL
  ): Promise<void> {
    const key = this.getMultiChainKey(chainId, address);
    const cacheData: MultiChainCacheData = {
      chainId,
      address,
      data,
      timestamp: Date.now(),
      ttl,
    };
    
    await this.set(key, cacheData, ttl);
  }

  // Obter dados multi-chain
  async getMultiChainData(chainId: number, address: string): Promise<any | null> {
    const key = this.getMultiChainKey(chainId, address);
    const cacheData = await this.get<MultiChainCacheData>(key);
    
    if (!cacheData) return null;
    
    // Verificar se não expirou
    const now = Date.now();
    if (now - cacheData.timestamp > cacheData.ttl * 1000) {
      await this.del(key);
      return null;
    }
    
    return cacheData.data;
  }

  // Obter dados de todas as chains para um endereço
  async getAllChainsData(address: string): Promise<{ [chainId: number]: any }> {
    try {
      if (!this.redis || !this.isConnected) return {};

      const pattern = `multichain:*:${address}`;
      const keys = await this.redis.keys(pattern);
      
      if (keys.length === 0) return {};

      const pipeline = this.redis.pipeline();
      keys.forEach(key => pipeline.get(key));
      
      const results = await pipeline.exec();
      const chainsData: { [chainId: number]: any } = {};

      results?.forEach((result, index) => {
        if (result && result[1]) {
          try {
            const cacheData: MultiChainCacheData = JSON.parse(result[1] as string);
            chainsData[cacheData.chainId] = cacheData.data;
          } catch (error) {
            logger.error('Error parsing cached data:', error);
          }
        }
      });

      return chainsData;
    } catch (error) {
      logger.error('Error getting all chains data:', error);
      return {};
    }
  }

  // ========== OPERAÇÕES DE PORTFOLIO ==========

  async setPortfolioData(
    address: string, 
    portfolioData: any, 
    ttl: number = this.DEFAULT_TTL
  ): Promise<void> {
    const key = `portfolio:${address}`;
    await this.set(key, portfolioData, ttl);
  }

  async getPortfolioData(address: string): Promise<any | null> {
    const key = `portfolio:${address}`;
    return await this.get(key);
  }

  // ========== OPERAÇÕES DE RISCO ==========

  async setRiskData(
    address: string, 
    riskData: any, 
    ttl: number = 600 // 10 minutos para dados de risco
  ): Promise<void> {
    const key = `risk:${address}`;
    await this.set(key, riskData, ttl);
  }

  async getRiskData(address: string): Promise<any | null> {
    const key = `risk:${address}`;
    return await this.get(key);
  }

  // ========== OPERAÇÕES DE PREÇOS ==========

  async setPriceData(
    symbol: string, 
    priceData: any, 
    ttl: number = 60 // 1 minuto para preços
  ): Promise<void> {
    const key = `price:${symbol.toLowerCase()}`;
    await this.set(key, priceData, ttl);
  }

  async getPriceData(symbol: string): Promise<any | null> {
    const key = `price:${symbol.toLowerCase()}`;
    return await this.get(key);
  }

  // ========== PUB/SUB PARA REAL-TIME ==========

  async publishUpdate(channel: string, data: any): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;
      
      await this.redis.publish(channel, JSON.stringify(data));
      logger.debug(`📡 Published to ${channel}`);
    } catch (error) {
      logger.error('Redis publish error:', error);
    }
  }

  async subscribe(channel: string, callback: (data: any) => void): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;

      // Criar nova conexão para subscription
      const subscriber = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      });

      subscriber.subscribe(channel);
      
      subscriber.on('message', (receivedChannel, message) => {
        if (receivedChannel === channel) {
          try {
            const data = JSON.parse(message);
            callback(data);
          } catch (error) {
            logger.error('Error parsing subscription message:', error);
          }
        }
      });

      logger.info(`📡 Subscribed to channel: ${channel}`);
    } catch (error) {
      logger.error('Redis subscribe error:', error);
    }
  }

  // ========== OPERAÇÕES DE LIMPEZA ==========

  async cleanup(): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;

      // Limpar keys expirados manualmente (Redis faz isso automaticamente, mas podemos ser proativos)
      const info = await this.redis.info('memory');
      logger.debug(`📋 Redis memory info: ${info}`);
      
    } catch (error) {
      logger.error('Redis cleanup error:', error);
    }
  }

  async flushDatabase(): Promise<void> {
    try {
      if (!this.redis || !this.isConnected) return;
      
      await this.redis.flushdb();
      logger.warn('🗑️ Redis database flushed');
    } catch (error) {
      logger.error('Redis flush error:', error);
    }
  }

  // ========== ESTATÍSTICAS ==========

  async getStats(): Promise<CacheStats> {
    try {
      if (!this.redis || !this.isConnected) {
        return {
          hits: this.hits,
          misses: this.misses,
          keys: 0,
          memory: '0B',
          connected: false,
        };
      }

      const [dbsize, info] = await Promise.all([
        this.redis.dbsize(),
        this.redis.info('memory'),
      ]);

      // Extrair uso de memória do info
      const memoryUsage = info.match(/used_memory_human:(.+)/)?.[1]?.trim() || '0B';

      return {
        hits: this.hits,
        misses: this.misses,
        keys: dbsize,
        memory: memoryUsage,
        connected: this.isConnected,
      };
    } catch (error) {
      logger.error('Error getting Redis stats:', error);
      return {
        hits: this.hits,
        misses: this.misses,
        keys: 0,
        memory: '0B',
        connected: false,
      };
    }
  }

  // ========== UTILITÁRIOS ==========

  private getMultiChainKey(chainId: number, address: string): string {
    return `multichain:${chainId}:${address}`;
  }

  isHealthy(): boolean {
    return this.isConnected;
  }

  async disconnect(): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.quit();
        this.redis = null;
      }
      
      this.isConnected = false;
      logger.info('�� Redis disconnected');
    } catch (error) {
      logger.error('Error disconnecting Redis:', error);
    }
  }
}

// Singleton instance
export const cacheService = new RedisCacheService();
