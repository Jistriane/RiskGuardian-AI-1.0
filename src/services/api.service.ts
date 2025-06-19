import axios, { AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { 
  ApiResponse, 
  AuthNonceRequest, 
  AuthNonceResponse, 
  AuthLoginRequest, 
  AuthLoginResponse,
  Portfolio,
  CreatePortfolioRequest,
  PortfolioRisk,
  InsurancePolicy,
  CreateInsuranceRequest,
  MonitoringAlert,
  ElizaOSAnalysisRequest,
  ElizaOSAnalysisResponse,
  ElizaOSInsight,
  ApiError
} from '@/types/api'

// Configuração dos endpoints
const API_CONFIG = {
  BACKEND: {
    url: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001',
    timeout: 10000
  },
  ELIZAOS: {
    url: process.env.NEXT_PUBLIC_ELIZAOS_URL || 'http://localhost:3003',
    timeout: 15000
  },
  CHROMIA: {
    url: process.env.NEXT_PUBLIC_CHROMIA_URL || 'http://localhost:3002',
    timeout: 10000
  }
}

class APIService {
  private backendClient: AxiosInstance
  private elizaosClient: AxiosInstance
  private chromiaClient: AxiosInstance
  private authToken: string | null = null

  constructor() {
    // Cliente do Backend Principal (porta 8001)
    this.backendClient = axios.create({
      baseURL: `${API_CONFIG.BACKEND.url}/api`,
      timeout: API_CONFIG.BACKEND.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Cliente do ElizaOS Agent (porta 3003)
    this.elizaosClient = axios.create({
      baseURL: `${API_CONFIG.ELIZAOS.url}/api`,
      timeout: API_CONFIG.ELIZAOS.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Cliente do Chromia AWS (porta 3002)
    this.chromiaClient = axios.create({
      baseURL: API_CONFIG.CHROMIA.url,
      timeout: API_CONFIG.CHROMIA.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
    this.loadStoredToken()
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token de autenticação
    this.backendClient.interceptors.request.use(
      (config) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor para tratamento de erros
    const handleResponseError = (error: AxiosError) => {
      if (error.response?.status === 401) {
        this.clearAuth()
        toast.error('Sessão expirada. Faça login novamente.')
      } else if (error.response?.status === 429) {
        toast.error('Muitas requisições. Tente novamente em alguns segundos.')
      } else if (error.response?.status >= 500) {
        toast.error('Erro no servidor. Tente novamente mais tarde.')
      }
      return Promise.reject(error)
    }

    this.backendClient.interceptors.response.use(
      (response) => response,
      handleResponseError
    )

    this.elizaosClient.interceptors.response.use(
      (response) => response,
      handleResponseError
    )

    this.chromiaClient.interceptors.response.use(
      (response) => response,
      handleResponseError
    )
  }

  private loadStoredToken() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('riskguardian_auth_token')
      if (stored) {
        this.authToken = stored
      }
    }
  }

  private storeToken(token: string) {
    this.authToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('riskguardian_auth_token', token)
    }
  }

  private clearAuth() {
    this.authToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('riskguardian_auth_token')
    }
  }

  // =============================================================================
  // BACKEND API METHODS (porta 8001)
  // =============================================================================

  // Health Check
  async checkHealth(): Promise<{ status: string; version: string }> {
    const response = await this.backendClient.get('/health')
    return response.data
  }

  // Authentication Methods
  async getNonce(address: string): Promise<AuthNonceResponse> {
    const response = await this.backendClient.post<ApiResponse<AuthNonceResponse>>(
      '/auth/nonce',
      { address } as AuthNonceRequest
    )
    return response.data.data
  }

  async login(address: string, signature: string, message: string): Promise<AuthLoginResponse> {
    const response = await this.backendClient.post<ApiResponse<AuthLoginResponse>>(
      '/auth/login',
      { address, signature, message } as AuthLoginRequest
    )
    
    const loginData = response.data.data
    this.storeToken(loginData.token)
    
    return loginData
  }

  async logout(): Promise<void> {
    try {
      await this.backendClient.post('/auth/logout')
    } finally {
      this.clearAuth()
    }
  }

  async getProfile(): Promise<any> {
    const response = await this.backendClient.get<ApiResponse<any>>('/auth/profile')
    return response.data.data
  }

  // Portfolio Methods
  async getPortfolios(): Promise<Portfolio[]> {
    const response = await this.backendClient.get<ApiResponse<Portfolio[]>>('/portfolio')
    return response.data.data
  }

  async createPortfolio(data: CreatePortfolioRequest): Promise<Portfolio> {
    const response = await this.backendClient.post<ApiResponse<Portfolio>>('/portfolio', data)
    return response.data.data
  }

  async getPortfolio(portfolioId: string): Promise<Portfolio> {
    const response = await this.backendClient.get<ApiResponse<Portfolio>>(`/portfolio/${portfolioId}`)
    return response.data.data
  }

  async updatePortfolio(portfolioId: string, data: Partial<CreatePortfolioRequest>): Promise<Portfolio> {
    const response = await this.backendClient.put<ApiResponse<Portfolio>>(`/portfolio/${portfolioId}`, data)
    return response.data.data
  }

  async deletePortfolio(portfolioId: string): Promise<void> {
    await this.backendClient.delete(`/portfolio/${portfolioId}`)
  }

  async getPortfolioRisk(portfolioId: string): Promise<PortfolioRisk> {
    const response = await this.backendClient.get<ApiResponse<PortfolioRisk>>(`/portfolio/${portfolioId}/risk`)
    return response.data.data
  }

  // Insurance Methods
  async getInsurancePolicies(): Promise<InsurancePolicy[]> {
    const response = await this.backendClient.get<ApiResponse<InsurancePolicy[]>>('/insurance')
    return response.data.data
  }

  async createInsurancePolicy(data: CreateInsuranceRequest): Promise<InsurancePolicy> {
    const response = await this.backendClient.post<ApiResponse<InsurancePolicy>>('/insurance', data)
    return response.data.data
  }

  async getInsuranceStats(): Promise<any> {
    const response = await this.backendClient.get<ApiResponse<any>>('/insurance/stats')
    return response.data.data
  }

  // Monitoring Methods
  async getMonitoringAlerts(): Promise<MonitoringAlert[]> {
    const response = await this.backendClient.get<ApiResponse<MonitoringAlert[]>>('/monitoring/alerts')
    return response.data.data
  }

  async getContractHealth(): Promise<any> {
    const response = await this.backendClient.get<ApiResponse<any>>('/monitoring/contracts')
    return response.data.data
  }

  // =============================================================================
  // ELIZAOS METHODS (porta 3003)
  // =============================================================================

  async checkElizaOSHealth(): Promise<{ status: string }> {
    const response = await this.elizaosClient.get('/health')
    return response.data
  }

  async analyzePortfolio(address: string, context?: string): Promise<ElizaOSAnalysisResponse> {
    const response = await this.elizaosClient.post<ElizaOSAnalysisResponse>(
      '/analyze-portfolio',
      { address, context } as ElizaOSAnalysisRequest
    )
    return response.data
  }

  async getAIInsights(): Promise<ElizaOSInsight[]> {
    const response = await this.elizaosClient.get<ApiResponse<ElizaOSInsight[]>>('/insights')
    return response.data.data
  }

  // =============================================================================
  // CHROMIA AWS METHODS (porta 3002)
  // =============================================================================

  async checkChromiaHealth(): Promise<{ status: string }> {
    const response = await this.chromiaClient.get('/health')
    return response.data
  }

  async getAlerts(): Promise<any[]> {
    const response = await this.chromiaClient.get('/alerts')
    return response.data.data || response.data
  }

  async subscribeToAlerts(portfolioId: string): Promise<void> {
    await this.chromiaClient.post('/alerts/subscribe', { portfolioId })
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  isAuthenticated(): boolean {
    return !!this.authToken
  }

  getAuthToken(): string | null {
    return this.authToken
  }

  // Método para testar conectividade de todos os serviços
  async testConnectivity(): Promise<{
    backend: boolean
    elizaos: boolean
    chromia: boolean
    errors: string[]
  }> {
    const results = {
      backend: false,
      elizaos: false,
      chromia: false,
      errors: [] as string[]
    }

    // Test Backend
    try {
      await this.checkHealth()
      results.backend = true
    } catch (error) {
      results.errors.push(`Backend (8001): ${error instanceof Error ? error.message : 'Connection failed'}`)
    }

    // Test ElizaOS
    try {
      await this.checkElizaOSHealth()
      results.elizaos = true
    } catch (error) {
      results.errors.push(`ElizaOS (3003): ${error instanceof Error ? error.message : 'Connection failed'}`)
    }

    // Test Chromia
    try {
      await this.checkChromiaHealth()
      results.chromia = true
    } catch (error) {
      results.errors.push(`Chromia (3002): ${error instanceof Error ? error.message : 'Connection failed'}`)
    }

    return results
  }
}

// Singleton instance
export const apiService = new APIService()
export default apiService 