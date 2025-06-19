import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { 
  Portfolio, 
  RiskMetrics, 
  Alert, 
  AIAnalysis, 
  DashboardData, 
  SystemStatus,
  MultiChainPortfolio,
  Scenario
} from '@/types';

interface AppState {
  // Portfolio State
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  multiChainData: MultiChainPortfolio | null;
  
  // Risk & Analytics
  riskMetrics: RiskMetrics[];
  aiAnalysis: AIAnalysis | null;
  dashboardData: DashboardData | null;
  
  // Alerts & Notifications
  alerts: Alert[];
  unreadAlerts: number;
  
  // System Status
  systemStatus: SystemStatus;
  
  // Scenarios
  scenarios: Scenario[];
  activeScenario: Scenario | null;
  
  // WebSocket Connection
  wsConnected: boolean;
  wsReconnectAttempts: number;
  
  // Loading States
  loading: {
    portfolios: boolean;
    riskMetrics: boolean;
    aiAnalysis: boolean;
    dashboard: boolean;
  };
}

interface AppActions {
  // Portfolio Actions
  setPortfolios: (portfolios: Portfolio[]) => void;
  selectPortfolio: (portfolio: Portfolio | null) => void;
  setMultiChainData: (data: MultiChainPortfolio | null) => void;
  
  // Risk & Analytics Actions
  setRiskMetrics: (metrics: RiskMetrics[]) => void;
  setAIAnalysis: (analysis: AIAnalysis | null) => void;
  setDashboardData: (data: DashboardData | null) => void;
  
  // Alert Actions
  addAlert: (alert: Alert) => void;
  markAlertAsRead: (alertId: string) => void;
  clearAlerts: () => void;
  
  // System Actions
  setSystemStatus: (status: SystemStatus) => void;
  
  // Scenario Actions
  setScenarios: (scenarios: Scenario[]) => void;
  setActiveScenario: (scenario: Scenario | null) => void;
  
  // WebSocket Actions
  setWsConnected: (connected: boolean) => void;
  incrementReconnectAttempts: () => void;
  resetReconnectAttempts: () => void;
  
  // Loading Actions
  setLoading: (key: keyof AppState['loading'], loading: boolean) => void;
}

type Store = AppState & AppActions;

export const useAppStore = create<Store>()(
  devtools(
    (set, get) => ({
      // Initial State
      portfolios: [],
      selectedPortfolio: null,
      multiChainData: null,
      riskMetrics: [],
      aiAnalysis: null,
      dashboardData: null,
      alerts: [],
      unreadAlerts: 0,
      systemStatus: {
        status: 'healthy',
        services: {
          backend: false,
          elizaos: false,
          chromia: false,
          websocket: false,
        },
        timestamp: new Date(),
      },
      scenarios: [],
      activeScenario: null,
      wsConnected: false,
      wsReconnectAttempts: 0,
      loading: {
        portfolios: false,
        riskMetrics: false,
        aiAnalysis: false,
        dashboard: false,
      },

      // Actions
      setPortfolios: (portfolios) => set({ portfolios }),
      
      selectPortfolio: (portfolio) => set({ selectedPortfolio: portfolio }),
      
      setMultiChainData: (data) => set({ multiChainData: data }),
      
      setRiskMetrics: (metrics) => set({ riskMetrics: metrics }),
      
      setAIAnalysis: (analysis) => set({ aiAnalysis: analysis }),
      
      setDashboardData: (data) => set({ dashboardData: data }),
      
      addAlert: (alert) => {
        const { alerts } = get();
        set({ 
          alerts: [alert, ...alerts].slice(0, 100), // Keep last 100 alerts
          unreadAlerts: get().unreadAlerts + 1
        });
      },
      
      markAlertAsRead: (alertId) => {
        const { alerts, unreadAlerts } = get();
        const alert = alerts.find(a => a.id === alertId);
        if (alert) {
          set({ unreadAlerts: Math.max(0, unreadAlerts - 1) });
        }
      },
      
      clearAlerts: () => set({ alerts: [], unreadAlerts: 0 }),
      
      setSystemStatus: (status) => set({ systemStatus: status }),
      
      setScenarios: (scenarios) => set({ scenarios }),
      
      setActiveScenario: (scenario) => set({ activeScenario: scenario }),
      
      setWsConnected: (connected) => set({ wsConnected: connected }),
      
      incrementReconnectAttempts: () => {
        set({ wsReconnectAttempts: get().wsReconnectAttempts + 1 });
      },
      
      resetReconnectAttempts: () => set({ wsReconnectAttempts: 0 }),
      
      setLoading: (key, loading) => {
        set(state => ({
          loading: { ...state.loading, [key]: loading }
        }));
      },
    }),
    { name: 'riskguardian-store' }
  )
); 