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

import { AlertSystemConfig } from '../config/alert-system.config';
import { ChromiaRealService } from './ChromiaRealService';

export interface Alert {
    portfolioId: string;
    type: 'warning' | 'critical' | 'info';
    message: string;
    timestamp: string;
    data: any;
}

/**
 * Classe legada mantida por compatibilidade
 * Nova implementação usa ChromiaRealService
 */
export class ChromiaStorageService {
    private config: AlertSystemConfig;
    private chromiaReal: ChromiaRealService;
    private readonly TABLE_NAME = 'portfolio_alerts';

    constructor(config: AlertSystemConfig) {
        this.config = config;
        this.chromiaReal = new ChromiaRealService(config);
        this.initializeDatabase();
    }

    private async initializeDatabase(): Promise<void> {
        try {
            // Delegue inicialização para ChromiaRealService
            const initialized = await this.chromiaReal.initialize();
            
            if (initialized) {
                console.log('✅ ChromiaStorageService: Banco de dados inicializado via ChromiaRealService');
            } else {
                console.error('❌ ChromiaStorageService: Falha na inicialização');
                throw new Error('Falha ao inicializar ChromiaRealService');
            }
        } catch (error) {
            console.error('❌ Erro ao inicializar banco de dados:', error);
            throw error;
        }
    }

    public async saveAlert(portfolioId: string, alert: Omit<Alert, 'portfolioId'>): Promise<void> {
        try {
            const result = await this.chromiaReal.saveAlert(portfolioId, alert);
            
            if (!result.success) {
                throw new Error(result.error || 'Erro ao salvar alerta');
            }
            
            console.log('✅ ChromiaStorageService: Alerta salvo via ChromiaRealService');
        } catch (error) {
            console.error('❌ Erro ao salvar alerta:', error);
            throw error;
        }
    }

    public async getAlertHistory(
        portfolioId: string,
        startDate?: string,
        endDate?: string,
        limit: number = 100
    ): Promise<Alert[]> {
        try {
            const alerts = await this.chromiaReal.getAlertHistory(portfolioId, startDate, endDate, limit);
            console.log(`✅ ChromiaStorageService: ${alerts.length} alertas encontrados para ${portfolioId}`);
            return alerts;
        } catch (error) {
            console.error('❌ Erro ao buscar histórico de alertas:', error);
            throw error;
        }
    }

    public async deleteOldAlerts(daysToKeep: number = 30): Promise<void> {
        try {
            const result = await this.chromiaReal.deleteOldAlerts(daysToKeep);
            
            if (!result.success) {
                throw new Error(result.error || 'Erro ao remover alertas antigos');
            }
            
            console.log('✅ ChromiaStorageService: Alertas antigos removidos via ChromiaRealService');
        } catch (error) {
            console.error('❌ Erro ao remover alertas antigos:', error);
            throw error;
        }
    }
} 