import { Router } from 'express';
import MonitoringController from '../controllers/monitoring.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const monitoringController = new MonitoringController();

// Rotas públicas (health check)
router.get('/health', monitoringController.healthCheck);

// Rotas protegidas (requerem autenticação)
router.use(authMiddleware);

// Status geral do sistema
router.get('/status', monitoringController.getSystemStatus);

// Status das chains
router.get('/chains', monitoringController.getActiveChains);
router.get('/chains/:chainId', monitoringController.getChainStatus);

// Mensagens cross-chain
router.get('/cross-chain-messages', monitoringController.getCrossChainMessages);

// Métricas e performance
router.get('/metrics', monitoringController.getMetrics);

// Operações administrativas
router.delete('/cache', monitoringController.clearCache);

export default router; 