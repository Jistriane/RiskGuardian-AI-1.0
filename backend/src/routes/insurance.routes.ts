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
import { InsuranceController } from '../controllers/insurance.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const insuranceController = new InsuranceController();

// Public routes
router.get('/stats', insuranceController.getInsuranceStats.bind(insuranceController));

// Protected routes
router.get('/', authMiddleware, insuranceController.getUserPolicies.bind(insuranceController));
router.post('/', authMiddleware, insuranceController.createPolicy.bind(insuranceController));

export { router as insuranceRoutes };
