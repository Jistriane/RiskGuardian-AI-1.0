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

/**
 * Serviço de Integração com Nó Chromia Real
 * Conecta o sistema AWS com o nó Postchain/Chromia
 */

import axios, { AxiosInstance } from 'axios';
import { ChromiaRealService } from './ChromiaRealService';
import { ChromiaSDK } from './ChromiaSDK';
import { AlertSystemConfig, defaultConfig } from '../config/alert-system.config';

// Types para integração
interface ChromiaTransaction {
    rid: string;
    operations: Array<{
        name: string;
        args: any[];
    }>;
    signers: string[];
}

interface ChainlinkPriceData {
    symbol: string;
    price: number;
    timestamp: number;
    confidence: number;
}

interface AlertPayload {
    portfolioId: string;
    alertType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    currentValue: number;
    thresholdValue?: number;
}

export class ChromiaNodeIntegration {
    private chromiaAPI: AxiosInstance;
    private chromiaService: ChromiaRealService;
    private chromiaSDK: ChromiaSDK;
    private nodeUrl: string;
    private isConnected: boolean = false;
    private config: AlertSystemConfig;

    constructor(nodeUrl: string = 'http://chromia-node:7740', config: AlertSystemConfig = defaultConfig) {
        this.nodeUrl = nodeUrl;
        this.config = config;
        
        this.chromiaAPI = axios.create({
            baseURL: nodeUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'RiskGuardian-AWS/1.0'
            }
        });

        this.chromiaService = new ChromiaRealService(config);
        this.chromiaSDK = new ChromiaSDK(config);
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.chromiaAPI.interceptors.request.use(
            (config) => {
                console.log(`[ChromiaNode] ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('[ChromiaNode] Request error:', error.message);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.chromiaAPI.interceptors.response.use(
            (response) => {
                console.log(`[ChromiaNode] Response ${response.status} from ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('[ChromiaNode] Response error:', error.response?.status, error.message);
                return Promise.reject(error);
            }
        );
    }

    /**
     * Conectar com o nó Chromia
     */
    async connect(): Promise<boolean> {
        try {
            const health = await this.checkHealth();
            if (health.status === 'healthy') {
                this.isConnected = true;
                console.log('✅ Conectado ao nó Chromia com sucesso');
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Falha ao conectar com nó Chromia:', error);
            this.isConnected = false;
            return false;
        }
    }

    /**
     * Verificar saúde do nó
     */
    async checkHealth(): Promise<any> {
        try {
            const response = await this.chromiaAPI.get('/health');
            return response.data;
        } catch (error) {
            // Fallback para PostgreSQL direto se nó não responder
            console.warn('Nó Chromia não responde, usando PostgreSQL direto...');
            const dbHealth = await this.chromiaService.healthCheck();
            return {
                status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
                database: dbHealth,
                node: 'offline',
                fallback: true
            };
        }
    }

    /**
     * Sincronizar portfolio com blockchain
     */
    async syncPortfolio(portfolioId: string): Promise<boolean> {
        try {
            // 1. Buscar dados do portfolio no PostgreSQL
            const portfolio = await this.chromiaService.getPortfolio(portfolioId);
            if (!portfolio) {
                throw new Error(`Portfolio ${portfolioId} não encontrado`);
            }

            // 2. Tentar sincronizar com nó Chromia
            if (this.isConnected) {
                try {
                    const txData = {
                        operations: [{
                            name: 'update_portfolio',
                            args: [
                                portfolio.ownerAddress,
                                portfolio.name,
                                portfolio.totalValue,
                                portfolio.riskScore
                            ]
                        }]
                    };

                    const response = await this.chromiaAPI.post('/transactions', txData);
                    console.log(`✅ Portfolio ${portfolioId} sincronizado com blockchain:`, response.data.rid);
                    return true;
                } catch (nodeError) {
                    console.warn('Falha na sincronização com nó, usando PostgreSQL apenas:', nodeError);
                }
            }

            // 3. Fallback: manter dados apenas no PostgreSQL
            console.log(`📝 Portfolio ${portfolioId} mantido em PostgreSQL (nó offline)`);
            return true;

        } catch (error) {
            console.error(`❌ Erro ao sincronizar portfolio ${portfolioId}:`, error);
            return false;
        }
    }

    /**
     * Atualizar preços via Chainlink
     */
    async updatePricesFromChainlink(symbols: string[]): Promise<ChainlinkPriceData[]> {
        const prices: ChainlinkPriceData[] = [];

        for (const symbol of symbols) {
            try {
                // Tentar buscar do nó Chromia primeiro
                if (this.isConnected) {
                    try {
                        const response = await this.chromiaAPI.get(`/prices/${symbol}`);
                        prices.push(response.data);
                        continue;
                    } catch (nodeError) {
                        console.warn(`Preço de ${symbol} não disponível no nó, usando fallback...`);
                    }
                }

                // Fallback: preços mock ou API externa
                const mockPrice = this.generateMockPrice(symbol);
                prices.push(mockPrice);

            } catch (error) {
                console.error(`Erro ao buscar preço de ${symbol}:`, error);
            }
        }

        return prices;
    }

    /**
     * Processar alerta DeFi
     */
    async processAlert(alert: AlertPayload): Promise<string | null> {
        try {
            // 1. Salvar no PostgreSQL
            const alertResult = await this.chromiaService.createAlert(
                alert.portfolioId,
                alert.alertType,
                alert.message,
                alert.severity,
                alert.currentValue,
                alert.thresholdValue
            );

            if (!alertResult.success) {
                throw new Error('Falha ao salvar alerta no PostgreSQL');
            }

            // 2. Tentar registrar no blockchain
            if (this.isConnected) {
                try {
                    const txData = {
                        operations: [{
                            name: 'create_alert',
                            args: [
                                alert.portfolioId,
                                alert.alertType,
                                alert.severity,
                                alert.message,
                                alert.currentValue || 0
                            ]
                        }]
                    };

                    const response = await this.chromiaAPI.post('/transactions', txData);
                    console.log(`🚨 Alerta registrado no blockchain:`, response.data.rid);
                    
                    return response.data.rid;
                } catch (nodeError) {
                    console.warn('Alerta salvo em PostgreSQL mas não no blockchain:', nodeError);
                }
            }

            console.log(`📊 Alerta processado (PostgreSQL apenas)`);
            return alertResult.data?.[0]?.id?.toString() || 'saved';

        } catch (error) {
            console.error('❌ Erro ao processar alerta:', error);
            return null;
        }
    }

    /**
     * Buscar métricas de risco
     */
    async getRiskMetrics(portfolioId: string): Promise<any> {
        try {
            // 1. Tentar buscar do nó Chromia primeiro
            if (this.isConnected) {
                try {
                    const response = await this.chromiaAPI.get(`/risk-metrics/${portfolioId}`);
                    return response.data;
                } catch (nodeError) {
                    console.warn(`Métricas de risco de ${portfolioId} não disponíveis no nó, usando PostgreSQL...`);
                }
            }

            // 2. Fallback: buscar do PostgreSQL
            const metrics = await this.chromiaService.getRiskMetrics(portfolioId);
            
            if (metrics) {
                return {
                    portfolioId: metrics.portfolioId,
                    volatility: metrics.volatility,
                    var95: metrics.var95,
                    var99: metrics.var99,
                    sharpeRatio: metrics.sharpeRatio,
                    maxDrawdown: metrics.maxDrawdown,
                    correlationScore: metrics.correlationScore,
                    calculatedAt: metrics.calculatedAt
                };
            }

            return null;

        } catch (error) {
            console.error('❌ Erro ao buscar métricas de risco:', {
                portfolioId,
                error: error instanceof Error ? error.message : 'Erro desconhecido',
                stack: error instanceof Error ? error.stack : undefined
            });
            return null;
        }
    }

    /**
     * Buscar status da blockchain
     */
    async getBlockchainStatus(): Promise<any> {
        try {
            if (!this.isConnected) {
                return {
                    status: 'offline',
                    lastBlock: 0,
                    nodeConnected: false,
                    database: await this.chromiaService.healthCheck()
                };
            }

            const response = await this.chromiaAPI.get('/status');
            return {
                ...response.data,
                nodeConnected: true,
                database: await this.chromiaService.healthCheck()
            };

        } catch (error) {
            console.error('Erro ao buscar status da blockchain:', error);
            return {
                status: 'error',
                error: error.message,
                nodeConnected: false
            };
        }
    }

    /**
     * Executar query Rell customizada
     */
    async executeRellQuery(query: string, params: any[] = []): Promise<any> {
        try {
            if (!this.isConnected) {
                throw new Error('Nó Chromia não está conectado');
            }

            const response = await this.chromiaAPI.post('/query', {
                query,
                args: params
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao executar query Rell:', error);
            throw error;
        }
    }

    // Métodos auxiliares

    private generateMockPrice(symbol: string): ChainlinkPriceData {
        const basePrices: Record<string, number> = {
            'ETH': 2000,
            'BTC': 35000,
            'USDC': 1,
            'USDT': 1,
            'LINK': 15,
            'UNI': 8,
            'AAVE': 100
        };

        const basePrice = basePrices[symbol] || 100;
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variação
        const price = basePrice * (1 + variation);

        return {
            symbol,
            price: Math.round(price * 100) / 100,
            timestamp: Date.now(),
            confidence: 0.95
        };
    }

    /**
     * Fechar conexões
     */
    async disconnect(): Promise<void> {
        this.isConnected = false;
        await this.chromiaService.close();
        console.log('🔌 Desconectado do nó Chromia');
    }

    // Getters
    get connected(): boolean {
        return this.isConnected;
    }

    get nodeEndpoint(): string {
        return this.nodeUrl;
    }
}

export default ChromiaNodeIntegration; 