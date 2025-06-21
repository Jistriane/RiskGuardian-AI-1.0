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
import { RegistryController } from '../controllers/registry.controller';

const router = Router();
const registryController = new RegistryController();

// Fix: Use async wrapper functions instead of bind
router.get('/protocols', async (req, res) => {
  await registryController.getAllProtocols(req, res);
});

router.get('/protocols/:address', async (req, res) => {
  await registryController.getProtocol(req, res);
});

router.get('/protocols/:address/risk', async (req, res) => {
  await registryController.getProtocolRisk(req, res);
});

router.get('/health', async (req, res) => {
  await registryController.getSystemHealth(req, res);
});

export { router as registryRoutes };
