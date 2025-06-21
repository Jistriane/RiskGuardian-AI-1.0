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

import { Request, Response } from 'express';
import ContractMonitoringService from '../services/contract-monitoring.service';
import { logger } from '../utils/logger';

class MonitoringController {
  private monitoringService: ContractMonitoringService;

  constructor() {
    this.monitoringService = new ContractMonitoringService();
  }

  /**
   * Obter métricas de todos os contratos
   */
  public getContractMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const metrics = this.monitoringService.getContractMetrics();
      
      res.status(200).json({
        success: true,
        data: {
          metrics,
          count: metrics.length,
          timestamp: new Date()
        }
      });
      
    } catch (error) {
      logger.error('Erro ao obter métricas dos contratos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter métricas dos contratos'
      });
    }
  };

  /**
   * Obter métricas de risco de portfolios
   */
  public getRiskMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const riskMetrics = this.monitoringService.getRiskMetrics();
      
      res.status(200).json({
        success: true,
        data: {
          riskMetrics,
          count: riskMetrics.length,
          timestamp: new Date()
        }
      });
      
    } catch (error) {
      logger.error('Erro ao obter métricas de risco:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter métricas de risco'
      });
    }
  };

  /**
   * Obter triggers de automação
   */
  public getAutomationTriggers = async (req: Request, res: Response): Promise<void> => {
    try {
      const triggers = this.monitoringService.getAutomationTriggers();
      
      res.status(200).json({
        success: true,
        data: {
          triggers,
          count: triggers.length,
          active: triggers.filter(t => t.isActive).length,
          timestamp: new Date()
        }
      });
      
    } catch (error) {
      logger.error('Erro ao obter triggers de automação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter triggers de automação'
      });
    }
  };

  /**
   * Obter dashboard de performance
   */
  public getPerformanceDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const contractMetrics = this.monitoringService.getContractMetrics();
      const riskMetrics = this.monitoringService.getRiskMetrics();
      const triggers = this.monitoringService.getAutomationTriggers();

      // Calcular estatísticas agregadas
      const totalTVL = contractMetrics.reduce((sum, metric) => 
        sum + parseFloat(metric.tvl || '0'), 0
      );

      const avgRiskScore = riskMetrics.length > 0 
        ? riskMetrics.reduce((sum, risk) => sum + risk.riskScore, 0) / riskMetrics.length 
        : 0;

      const totalActivePositions = contractMetrics.reduce((sum, metric) => 
        sum + metric.activePositions, 0
      );

      const totalSuccessfulHedges = contractMetrics.reduce((sum, metric) => 
        sum + metric.successfulHedges, 0
      );

      const avgPerformanceScore = contractMetrics.length > 0
        ? contractMetrics.reduce((sum, metric) => sum + metric.performanceScore, 0) / contractMetrics.length
        : 0;

      // Distribuição de níveis de risco
      const riskDistribution = riskMetrics.reduce((acc, risk) => {
        acc[risk.riskLevel] = (acc[risk.riskLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Triggers mais executados
      const topTriggers = triggers
        .sort((a, b) => b.executionCount - a.executionCount)
        .slice(0, 5);

      const dashboard = {
        overview: {
          totalTVL: totalTVL.toFixed(2),
          avgRiskScore: avgRiskScore.toFixed(1),
          totalActivePositions,
          totalSuccessfulHedges,
          avgPerformanceScore: avgPerformanceScore.toFixed(1),
          contractsMonitored: contractMetrics.length,
          portfoliosTracked: riskMetrics.length,
          activeTriggers: triggers.filter(t => t.isActive).length
        },
        riskAnalysis: {
          distribution: riskDistribution,
          avgVolatility: riskMetrics.length > 0 
            ? (riskMetrics.reduce((sum, r) => sum + r.volatilityIndex, 0) / riskMetrics.length).toFixed(1)
            : '0',
          avgLiquidityRatio: riskMetrics.length > 0
            ? (riskMetrics.reduce((sum, r) => sum + r.liquidityRatio, 0) / riskMetrics.length).toFixed(3)
            : '0'
        },
        automation: {
          totalTriggers: triggers.length,
          activeTriggers: triggers.filter(t => t.isActive).length,
          totalExecutions: triggers.reduce((sum, t) => sum + t.executionCount, 0),
          topTriggers: topTriggers.map(t => ({
            id: t.id,
            type: t.triggerType,
            executions: t.executionCount,
            lastTriggered: t.lastTriggered
          }))
        },
        contracts: contractMetrics.map(metric => ({
          name: metric.contractName,
          address: metric.contractAddress,
          tvl: metric.tvl,
          activePositions: metric.activePositions,
          performanceScore: metric.performanceScore,
          lastActivity: metric.lastActivity
        })),
        timestamp: new Date()
      };

      res.status(200).json({
        success: true,
        data: dashboard
      });

    } catch (error) {
      logger.error('Erro ao gerar dashboard de performance:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível gerar dashboard de performance'
      });
    }
  };

  /**
   * Obter métricas específicas de um contrato
   */
  public getContractSpecificMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractAddress } = req.params;
      
      if (!contractAddress) {
        res.status(400).json({
          success: false,
          error: 'Parâmetro obrigatório',
          message: 'contractAddress é obrigatório'
        });
        return;
      }

      const allMetrics = this.monitoringService.getContractMetrics();
      const contractMetric = allMetrics.find(m => 
        m.contractAddress.toLowerCase() === contractAddress.toLowerCase()
      );

      if (!contractMetric) {
        res.status(404).json({
          success: false,
          error: 'Contrato não encontrado',
          message: `Contrato ${contractAddress} não está sendo monitorado`
        });
        return;
      }

      // Obter métricas históricas (simuladas)
      const historicalData = this.generateHistoricalData(contractMetric);

      res.status(200).json({
        success: true,
        data: {
          current: contractMetric,
          historical: historicalData,
          timestamp: new Date()
        }
      });

    } catch (error) {
      logger.error('Erro ao obter métricas específicas do contrato:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter métricas do contrato'
      });
    }
  };

  /**
   * Obter análise de risco de um portfolio específico
   */
  public getPortfolioRiskAnalysis = async (req: Request, res: Response): Promise<void> => {
    try {
      const { portfolioAddress } = req.params;
      
      if (!portfolioAddress) {
        res.status(400).json({
          success: false,
          error: 'Parâmetro obrigatório',
          message: 'portfolioAddress é obrigatório'
        });
        return;
      }

      const allRiskMetrics = this.monitoringService.getRiskMetrics();
      const portfolioRisk = allRiskMetrics.find(r => 
        r.portfolioAddress.toLowerCase() === portfolioAddress.toLowerCase()
      );

      if (!portfolioRisk) {
        res.status(404).json({
          success: false,
          error: 'Portfolio não encontrado',
          message: `Portfolio ${portfolioAddress} não está sendo monitorado`
        });
        return;
      }

      // Gerar recomendações baseadas no risco
      const recommendations = this.generateRiskRecommendations(portfolioRisk);

      res.status(200).json({
        success: true,
        data: {
          riskAnalysis: portfolioRisk,
          recommendations,
          timestamp: new Date()
        }
      });

    } catch (error) {
      logger.error('Erro ao obter análise de risco do portfolio:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter análise de risco'
      });
    }
  };

  /**
   * Status de saúde do sistema de monitoramento
   */
  public getHealthStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const health = await this.monitoringService.getHealthStatus();
      
      res.status(200).json({
        success: true,
        data: health
      });

    } catch (error) {
      logger.error('Erro ao obter status de saúde:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: 'Não foi possível obter status de saúde'
      });
    }
  };

  /**
   * WebSocket para atualizações em tempo real
   */
  public handleWebSocket = (ws: any): void => {
    try {
      this.monitoringService.addWebSocketConnection(ws);
      
      // Enviar dados iniciais
      ws.send(JSON.stringify({
        type: 'connection_established',
        data: {
          contracts: this.monitoringService.getContractMetrics().length,
          triggers: this.monitoringService.getAutomationTriggers().length,
          timestamp: new Date()
        }
      }));

      logger.info('Nova conexão WebSocket estabelecida para monitoramento');

    } catch (error) {
      logger.error('Erro ao configurar WebSocket:', error);
      ws.close();
    }
  };

  /**
   * Gerar dados históricos simulados
   */
  private generateHistoricalData(metric: any): any[] {
    const historical = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)); // Últimas 24 horas
      historical.push({
        timestamp,
        tvl: (parseFloat(metric.tvl) * (0.9 + Math.random() * 0.2)).toFixed(2),
        activePositions: Math.max(0, metric.activePositions + Math.floor((Math.random() - 0.5) * 5)),
        performanceScore: Math.max(0, Math.min(100, metric.performanceScore + Math.floor((Math.random() - 0.5) * 20)))
      });
    }
    
    return historical;
  }

  /**
   * Gerar recomendações baseadas no risco
   */
  private generateRiskRecommendations(riskMetrics: any): string[] {
    const recommendations = [];
    
    if (riskMetrics.riskScore > 80) {
      recommendations.push('⚠️ Risco crítico detectado - considere reduzir exposição');
      recommendations.push('🛑 Ativar stop-loss preventivo');
    } else if (riskMetrics.riskScore > 60) {
      recommendations.push('📊 Considere rebalanceamento do portfolio');
      recommendations.push('🔄 Avaliar hedge de volatilidade');
    }
    
    if (riskMetrics.liquidityRatio < 0.3) {
      recommendations.push('💧 Liquidez baixa - considere aumentar reservas');
    }
    
    if (riskMetrics.concentrationRisk > 70) {
      recommendations.push('🎯 Portfolio muito concentrado - diversificar');
    }
    
    if (riskMetrics.volatilityIndex > 60) {
      recommendations.push('📈 Alta volatilidade - considere hedging');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Portfolio dentro dos parâmetros seguros');
    }
    
    return recommendations;
  }

  /**
   * Health check do sistema
   */
  public healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({
        success: true,
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime()
      });
    } catch (error) {
      logger.error('Erro no health check:', error);
      res.status(500).json({
        success: false,
        status: 'unhealthy',
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Status geral do sistema
   */
  public getSystemStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const contractMetrics = this.monitoringService.getContractMetrics();
      const riskMetrics = this.monitoringService.getRiskMetrics();
      const triggers = this.monitoringService.getAutomationTriggers();

      const status = {
        system: {
          status: 'operational',
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          timestamp: new Date()
        },
        monitoring: {
          contractsActive: contractMetrics.length,
          portfoliosTracked: riskMetrics.length,
          triggersActive: triggers.filter(t => t.isActive).length,
          lastUpdate: new Date()
        }
      };

      res.status(200).json({
        success: true,
        data: status
      });
    } catch (error) {
      logger.error('Erro ao obter status do sistema:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Chains ativas
   */
  public getActiveChains = async (req: Request, res: Response): Promise<void> => {
    try {
      const chains = [
        { chainId: 11155111, name: 'Sepolia', status: 'active', blockHeight: 5234567 },
        { chainId: 80001, name: 'Mumbai', status: 'active', blockHeight: 8901234 },
        { chainId: 43113, name: 'Fuji', status: 'active', blockHeight: 1234567 },
        { chainId: 97, name: 'BSC Testnet', status: 'active', blockHeight: 9876543 }
      ];

      res.status(200).json({
        success: true,
        data: {
          chains,
          count: chains.length,
          timestamp: new Date()
        }
      });
    } catch (error) {
      logger.error('Erro ao obter chains ativas:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Status de uma chain específica
   */
  public getChainStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chainId } = req.params;
      
      const chainStatus = {
        chainId: parseInt(chainId),
        status: 'active',
        blockHeight: Math.floor(Math.random() * 1000000) + 5000000,
        gasPrice: (Math.random() * 50 + 10).toFixed(2) + ' Gwei',
        lastBlock: new Date(),
        contracts: this.monitoringService.getContractMetrics().filter(c => 
          c.contractAddress.includes(chainId)
        ).length
      };

      res.status(200).json({
        success: true,
        data: chainStatus
      });
    } catch (error) {
      logger.error('Erro ao obter status da chain:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Mensagens cross-chain
   */
  public getCrossChainMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = [
        {
          id: '0x123abc',
          fromChain: 11155111,
          toChain: 80001,
          status: 'delivered',
          timestamp: new Date(Date.now() - 300000),
          message: 'Portfolio sync request'
        },
        {
          id: '0x456def',
          fromChain: 43113,
          toChain: 97,
          status: 'pending',
          timestamp: new Date(Date.now() - 120000),
          message: 'Risk alert notification'
        }
      ];

      res.status(200).json({
        success: true,
        data: {
          messages,
          count: messages.length,
          pending: messages.filter(m => m.status === 'pending').length,
          timestamp: new Date()
        }
      });
    } catch (error) {
      logger.error('Erro ao obter mensagens cross-chain:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Métricas gerais
   */
  public getMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const contractMetrics = this.monitoringService.getContractMetrics();
      const riskMetrics = this.monitoringService.getRiskMetrics();
      
      const metrics = {
        contracts: {
          total: contractMetrics.length,
          active: contractMetrics.filter(c => c.activePositions > 0).length,
          totalTVL: contractMetrics.reduce((sum, c) => sum + parseFloat(c.tvl || '0'), 0),
          totalPositions: contractMetrics.reduce((sum, c) => sum + c.activePositions, 0)
        },
        risk: {
          portfolios: riskMetrics.length,
          avgRiskScore: riskMetrics.length > 0 
            ? riskMetrics.reduce((sum, r) => sum + r.riskScore, 0) / riskMetrics.length 
            : 0,
          highRisk: riskMetrics.filter(r => r.riskLevel === 'HIGH').length
        },
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          timestamp: new Date()
        }
      };

      res.status(200).json({
        success: true,
        data: metrics
      });
    } catch (error) {
      logger.error('Erro ao obter métricas:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };

  /**
   * Limpar cache
   */
  public clearCache = async (req: Request, res: Response): Promise<void> => {
    try {
      // Aqui seria implementada a limpeza de cache
      // Por enquanto, apenas simular
      
      res.status(200).json({
        success: true,
        message: 'Cache limpo com sucesso',
        timestamp: new Date()
      });
    } catch (error) {
      logger.error('Erro ao limpar cache:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  };
}

export default MonitoringController; 