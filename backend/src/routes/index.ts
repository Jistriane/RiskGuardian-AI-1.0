import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { portfolioRoutes } from './portfolio.routes';
import { insuranceRoutes } from './insurance.routes';
import { registryRoutes } from './registry.routes';
import monitoringRoutes from './monitoring.routes';

const router = Router();

// Health check geral
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
router.use('/auth', authRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/insurance', insuranceRoutes);
router.use('/registry', registryRoutes);
router.use('/monitoring', monitoringRoutes);

export default router;
