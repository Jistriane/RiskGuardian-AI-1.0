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

import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const portfolioController = new PortfolioController();

// All portfolio routes require authentication
router.get('/', authMiddleware, portfolioController.getUserPortfolios.bind(portfolioController));
router.post('/', authMiddleware, portfolioController.createPortfolio.bind(portfolioController));
router.get('/multi-chain/:address', portfolioController.getMultiChainPortfolio.bind(portfolioController));
router.get('/:portfolioId', authMiddleware, portfolioController.getPortfolio.bind(portfolioController));
router.put('/:portfolioId', authMiddleware, portfolioController.updatePortfolio.bind(portfolioController));
router.delete('/:portfolioId', authMiddleware, portfolioController.deletePortfolio.bind(portfolioController));
router.get('/:portfolioId/risk', authMiddleware, portfolioController.getPortfolioRisk.bind(portfolioController));

export { router as portfolioRoutes };
