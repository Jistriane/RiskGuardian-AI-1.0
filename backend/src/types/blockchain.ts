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

export interface Protocol {
  address: string;
  name: string;
  category: string;
  tvl: string;
  riskMetrics: {
    volatilityScore: number;
    liquidityScore: number;
    smartContractScore: number;
    governanceScore: number;
    overallRisk: number;
    lastUpdated: number;
    isActive: boolean;
  };
  isWhitelisted: boolean;
}

export interface Position {
  protocol: string;
  token: string;
  amount: string;
  value: string;
}

export interface PortfolioAnalysis {
  totalValue: string;
  overallRisk: number;
  diversificationScore: number;
  timestamp: number;
  isValid: boolean;
}

export interface NetworkInfo {
  name: string;
  chainId: number;
  blockNumber: number;
}

export interface RiskData {
  protocol: string;
  riskScore: number;
  timestamp: number;
  provider: string;
  data: any;
}

export interface InsurancePolicy {
  id: number;
  protocol: string;
  holder: string;
  amount: string;
  premium: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  isClaimed: boolean;
}

export interface InsurancePool {
  protocol: string;
  totalFunds: string;
  availableFunds: string;
  totalPolicies: number;
  riskFactor: number;
}

export interface Alert {
  id: number;
  user: string;
  protocol: string;
  threshold: number;
  condition: string;
  isActive: boolean;
  lastTriggered: number;
}
