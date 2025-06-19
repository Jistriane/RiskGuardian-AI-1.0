import { config } from '@/config/env';
import type { 
  ApiResponse, 
  Portfolio, 
  RiskMetrics, 
  DashboardData, 
  AIAnalysis,
  MultiChainPortfolio 
} from '@/types';

class ApiService {
  private baseUrl: string;
  private elizaosUrl: string;

  constructor() {
    this.baseUrl = config.api.backend;
    this.elizaosUrl = config.api.elizaos;
  }

  private async request<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Backend API Methods
  async getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
    return this.request<Portfolio[]>(`${this.baseUrl}/portfolio`);
  }

  async getPortfolio(id: string): Promise<ApiResponse<Portfolio>> {
    return this.request<Portfolio>(`${this.baseUrl}/portfolio/${id}`);
  }

  async getMultiChainPortfolio(address: string): Promise<ApiResponse<MultiChainPortfolio>> {
    return this.request<MultiChainPortfolio>(`${this.baseUrl}/portfolio/multichain/${address}`);
  }

  async createPortfolio(portfolio: Partial<Portfolio>): Promise<ApiResponse<Portfolio>> {
    return this.request<Portfolio>(`${this.baseUrl}/portfolio`, {
      method: 'POST',
      body: JSON.stringify(portfolio),
    });
  }

  async getRiskMetrics(): Promise<ApiResponse<RiskMetrics[]>> {
    return this.request<RiskMetrics[]>(`${this.baseUrl}/monitoring/risk-metrics`);
  }

  async getPortfolioRisk(portfolioId: string): Promise<ApiResponse<RiskMetrics>> {
    return this.request<RiskMetrics>(`${this.baseUrl}/portfolio/${portfolioId}/risk`);
  }

  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return this.request<DashboardData>(`${this.baseUrl}/monitoring/performance-dashboard`);
  }

  async getSystemStatus(): Promise<ApiResponse<any>> {
    return this.request<any>(`${this.baseUrl}/monitoring/system-status`);
  }

  // ElizaOS AI Methods
  async analyzeContract(contractAddress: string): Promise<ApiResponse<AIAnalysis>> {
    return this.request<AIAnalysis>(`${this.elizaosUrl}/analyze-contract`, {
      method: 'POST',
      body: JSON.stringify({ contractAddress }),
    });
  }

  async monitorMarket(assets: string[]): Promise<ApiResponse<any>> {
    return this.request<any>(`${this.elizaosUrl}/monitor-market`, {
      method: 'POST',
      body: JSON.stringify({ assets }),
    });
  }

  async getBalances(address: string): Promise<ApiResponse<any>> {
    return this.request<any>(`${this.elizaosUrl}/balances/${address}`);
  }

  // Health Checks
  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await this.request<any>(`${this.baseUrl}/health`);
      return response.success;
    } catch {
      return false;
    }
  }

  async checkElizaosHealth(): Promise<boolean> {
    try {
      const response = await this.request<any>(`${this.elizaosUrl}/health`);
      return response.data?.status === 'ok';
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService(); 