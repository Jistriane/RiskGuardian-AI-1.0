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

import { Request } from 'express';

export interface User {
  id: string;
  address: string;
  nonce: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    address: string;
  };
}

export interface LoginRequest {
  address: string;
  signature: string;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    address: string;
    nonce: string;
  };
  expiresIn?: string;
  error?: string;
}
