import { logger } from '../utils/logger';
import { cacheService } from './cache.service';

interface PerformanceMetrics {
  requestCount: number;
  averageResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
}

interface ConnectionPoolStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
}

export class PerformanceService {
  private requestTimes: number[] = [];
  private errorCount = 0;
  private requestCount = 0;
  private startTime = Date.now();

  // Connection pooling para APIs externas
  private connectionPools = new Map<string, any>();

  /**
   * Registrar tempo de resposta de requisição
   */
  recordRequestTime(responseTime: number, isError = false): void {
    this.requestCount++;
    this.requestTimes.push(responseTime);
    
    if (isError) {
      this.errorCount++;
    }

    // Manter apenas os últimos 1000 tempos de resposta
    if (this.requestTimes.length > 1000) {
      this.requestTimes.shift();
    }
  }

  /**
   * Obter métricas atuais de performance
   */
  async getMetrics(): Promise<PerformanceMetrics> {
    const averageResponseTime = this.requestTimes.length > 0
      ? this.requestTimes.reduce((a, b) => a + b, 0) / this.requestTimes.length
      : 0;

    const errorRate = this.requestCount > 0
      ? (this.errorCount / this.requestCount) * 100
      : 0;

    const cacheHitRate = await this.getCacheHitRate();

    return {
      requestCount: this.requestCount,
      averageResponseTime: Math.round(averageResponseTime * 100) / 100,
      errorRate: Math.round(errorRate * 100) / 100,
      cacheHitRate,
      memoryUsage: process.memoryUsage(),
      uptime: Math.round((Date.now() - this.startTime) / 1000)
    };
  }

  /**
   * Obter taxa de acerto do cache
   */
  private async getCacheHitRate(): Promise<number> {
    try {
      const stats = await cacheService.getStats();
      const total = stats.hits + stats.misses;
      return total > 0 ? (stats.hits / total) * 100 : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Verificar saúde do sistema
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    details: any;
  }> {
    const metrics = await this.getMetrics();
    const memUsage = metrics.memoryUsage;
    
    // Critérios de saúde
    const isHealthy = 
      metrics.averageResponseTime < 2000 && // Menos de 2s resposta média
      metrics.errorRate < 5 && // Menos de 5% de erro
      memUsage.heapUsed < 500 * 1024 * 1024; // Menos de 500MB heap

    const isDegraded = 
      metrics.averageResponseTime < 5000 && // Menos de 5s resposta média
      metrics.errorRate < 15 && // Menos de 15% de erro
      memUsage.heapUsed < 1024 * 1024 * 1024; // Menos de 1GB heap

    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (isHealthy) {
      status = 'healthy';
    } else if (isDegraded) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }

    return {
      status,
      details: {
        metrics,
        thresholds: {
          maxResponseTime: status === 'healthy' ? 2000 : 5000,
          maxErrorRate: status === 'healthy' ? 5 : 15,
          maxMemoryUsage: status === 'healthy' ? '500MB' : '1GB'
        }
      }
    };
  }

  /**
   * Otimizar cache baseado em padrões de uso
   */
  async optimizeCache(): Promise<void> {
    try {
      const stats = await cacheService.getStats();
      
      // Se taxa de acerto baixa, aumentar TTL
      if (stats.hits / (stats.hits + stats.misses) < 0.7) {
        logger.info('Cache hit rate baixa, otimizando...');
        // Implementar lógica de otimização
      }

      // Limpar chaves expiradas
      await cacheService.cleanup();
      
    } catch (error) {
      logger.error('Erro ao otimizar cache:', error);
    }
  }

  /**
   * Configurar pooling de conexões HTTP
   */
  configureConnectionPool(name: string, config: {
    maxSockets?: number;
    maxFreeSockets?: number;
    timeout?: number;
    keepAlive?: boolean;
  } = {}): void {
    const defaultConfig = {
      maxSockets: 50,
      maxFreeSockets: 10,
      timeout: 30000,
      keepAlive: true
    };

    const poolConfig = { ...defaultConfig, ...config };
    this.connectionPools.set(name, poolConfig);
    
    logger.info(`Connection pool configured: ${name}`, poolConfig);
  }

  /**
   * Obter estatísticas de pool de conexões
   */
  getConnectionPoolStats(name: string): ConnectionPoolStats | null {
    const pool = this.connectionPools.get(name);
    if (!pool) return null;

    // Estatísticas básicas (em implementação real, seria mais detalhado)
    return {
      total: pool.maxSockets,
      active: 0, // Seria calculado baseado no uso real
      idle: pool.maxFreeSockets,
      waiting: 0
    };
  }

  /**
   * Monitorar performance em tempo real
   */
  startPerformanceMonitoring(intervalMs = 60000): void {
    setInterval(async () => {
      const health = await this.healthCheck();
      const metrics = await this.getMetrics();
      
      // Log métricas importantes
      logger.info('Performance Metrics', {
        status: health.status,
        requestCount: metrics.requestCount,
        avgResponseTime: `${metrics.averageResponseTime}ms`,
        errorRate: `${metrics.errorRate}%`,
        cacheHitRate: `${metrics.cacheHitRate}%`,
        memoryUsage: `${Math.round(metrics.memoryUsage.heapUsed / 1024 / 1024)}MB`,
        uptime: `${metrics.uptime}s`
      });

      // Alertas automáticos
      if (health.status === 'unhealthy') {
        logger.error('Sistema com performance degradada!', health.details);
      } else if (health.status === 'degraded') {
        logger.warn('Performance degradada detectada', health.details);
      }

      // Otimização automática
      await this.optimizeCache();
      
    }, intervalMs);
  }

  /**
   * Limpar métricas antigas
   */
  resetMetrics(): void {
    this.requestTimes = [];
    this.errorCount = 0;
    this.requestCount = 0;
    this.startTime = Date.now();
    logger.info('Performance metrics reset');
  }

  /**
   * Middleware para medir performance de requisições
   */
  createPerformanceMiddleware() {
    return (req: any, res: any, next: any) => {
      const startTime = Date.now();
      
      res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        const isError = res.statusCode >= 400;
        
        this.recordRequestTime(responseTime, isError);
        
        // Log requisições lentas
        if (responseTime > 3000) {
          logger.warn(`Slow request detected: ${req.method} ${req.path} - ${responseTime}ms`);
        }
      });
      
      next();
    };
  }
}

export const performanceService = new PerformanceService(); 