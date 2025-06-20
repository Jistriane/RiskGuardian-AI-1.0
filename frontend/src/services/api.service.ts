import { 
  Portfolio, 
  Asset, 
  RiskMetrics, 
  MarketData, 
  AIInsight, 
  AutomationRule,
  ApiResponse,
  PaginatedResponse
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  private async fetch<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API call failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Portfolio API
  async getPortfolio(walletAddress: string): Promise<Portfolio> {
    return this.fetch<Portfolio>(`/portfolio/${walletAddress}`);
  }

  async refreshPortfolio(walletAddress: string): Promise<ApiResponse<Portfolio>> {
    return this.fetch<ApiResponse<Portfolio>>(`/portfolio/${walletAddress}/refresh`, {
      method: 'POST',
    });
  }

  async addAsset(walletAddress: string, asset: Partial<Asset>): Promise<ApiResponse<Asset>> {
    return this.fetch<ApiResponse<Asset>>(`/portfolio/${walletAddress}/assets`, {
      method: 'POST',
      body: JSON.stringify(asset),
    });
  }

  async removeAsset(walletAddress: string, assetId: string): Promise<ApiResponse<void>> {
    return this.fetch<ApiResponse<void>>(`/portfolio/${walletAddress}/assets/${assetId}`, {
      method: 'DELETE',
    });
  }

  // Risk API
  async getRiskMetrics(walletAddress: string): Promise<RiskMetrics> {
    return this.fetch<RiskMetrics>(`/risk/${walletAddress}/metrics`);
  }

  async getRiskAlerts(walletAddress: string): Promise<PaginatedResponse<any>> {
    return this.fetch<PaginatedResponse<any>>(`/risk/${walletAddress}/alerts`);
  }

  // Market Data API
  async getMarketData(symbols: string[]): Promise<MarketData[]> {
    const symbolsParam = symbols.join(',');
    return this.fetch<MarketData[]>(`/market/data?symbols=${symbolsParam}`);
  }

  async getHistoricalData(symbol: string, timeframe: string): Promise<any[]> {
    return this.fetch<any[]>(`/market/historical/${symbol}?timeframe=${timeframe}`);
  }

  // AI Insights API
  async getAIInsights(walletAddress: string): Promise<AIInsight[]> {
    return this.fetch<AIInsight[]>(`/ai/insights/${walletAddress}`);
  }

  async generateScenarioAnalysis(walletAddress: string, parameters: any): Promise<any> {
    return this.fetch<any>(`/ai/scenario/${walletAddress}`, {
      method: 'POST',
      body: JSON.stringify(parameters),
    });
  }

  // Automation API
  async getAutomationRules(walletAddress: string): Promise<AutomationRule[]> {
    return this.fetch<AutomationRule[]>(`/automation/${walletAddress}/rules`);
  }

  async createAutomationRule(walletAddress: string, rule: Partial<AutomationRule>): Promise<ApiResponse<AutomationRule>> {
    return this.fetch<ApiResponse<AutomationRule>>(`/automation/${walletAddress}/rules`, {
      method: 'POST',
      body: JSON.stringify(rule),
    });
  }

  async updateAutomationRule(walletAddress: string, ruleId: string, updates: Partial<AutomationRule>): Promise<ApiResponse<AutomationRule>> {
    return this.fetch<ApiResponse<AutomationRule>>(`/automation/${walletAddress}/rules/${ruleId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAutomationRule(walletAddress: string, ruleId: string): Promise<ApiResponse<void>> {
    return this.fetch<ApiResponse<void>>(`/automation/${walletAddress}/rules/${ruleId}`, {
      method: 'DELETE',
    });
  }
}

// Create and export service instances
export const apiService = new ApiService();

// Export individual API modules for better organization
export const portfolioApi = {
  getPortfolio: (walletAddress: string) => apiService.getPortfolio(walletAddress),
  refreshPortfolio: (walletAddress: string) => apiService.refreshPortfolio(walletAddress),
  addAsset: (walletAddress: string, asset: Partial<Asset>) => apiService.addAsset(walletAddress, asset),
  removeAsset: (walletAddress: string, assetId: string) => apiService.removeAsset(walletAddress, assetId),
};

export const riskApi = {
  getRiskMetrics: (walletAddress: string) => apiService.getRiskMetrics(walletAddress),
  getRiskAlerts: (walletAddress: string) => apiService.getRiskAlerts(walletAddress),
};

export const marketApi = {
  getMarketData: (symbols: string[]) => apiService.getMarketData(symbols),
  getHistoricalData: (symbol: string, timeframe: string) => apiService.getHistoricalData(symbol, timeframe),
};

export const aiApi = {
  getAIInsights: (walletAddress: string) => apiService.getAIInsights(walletAddress),
  generateScenarioAnalysis: (walletAddress: string, parameters: any) => apiService.generateScenarioAnalysis(walletAddress, parameters),
};

export const automationApi = {
  getAutomationRules: (walletAddress: string) => apiService.getAutomationRules(walletAddress),
  createAutomationRule: (walletAddress: string, rule: Partial<AutomationRule>) => apiService.createAutomationRule(walletAddress, rule),
  updateAutomationRule: (walletAddress: string, ruleId: string, updates: Partial<AutomationRule>) => apiService.updateAutomationRule(walletAddress, ruleId, updates),
  deleteAutomationRule: (walletAddress: string, ruleId: string) => apiService.deleteAutomationRule(walletAddress, ruleId),
}; 