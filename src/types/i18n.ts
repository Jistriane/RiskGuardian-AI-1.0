export type Language = 'pt-BR' | 'en';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    clear: string;
    refresh: string;
    connect: string;
    disconnect: string;
    online: string;
    offline: string;
    active: string;
    inactive: string;
    enabled: string;
    disabled: string;
  };

  // Navigation
  navigation: {
    dashboard: string;
    trading: string;
    portfolio: string;
    riskAnalysis: string;
    automation: string;
    insurance: string;
    aiInsights: string;
    monitoring: string;
    settings: string;
  };

  // Wallet
  wallet: {
    connect: string;
    disconnect: string;
    connecting: string;
    notDetected: string;
    installWeb3Wallet: string;
    connectionCanceled: string;
    connectionError: string;
    unsupportedNetwork: string;
    walletNotConnected: string;
    connectToViewPortfolio: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    totalPortfolioValue: string;
    riskScore: string;
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    ethVariation24h: string;
    activeAutomations: string;
    assets: string;
    hedge: string;
    rebalancing: string;
    marketRealTime: string;
    live: string;
    portfolioOverview: string;
    riskMetrics: string;
    automationStatus: string;
    aiInsights: string;
    systemStatus: string;
    blockchain: string;
    priceOracle: string;
    aiAnalytics: string;
    realTimeAnalysis: string;
    volume24h: string;
    high24h: string;
    low24h: string;
    loadingData: string;
    lastSync: string;
    version: string;
  };

  // Trading
  trading: {
    title: string;
    subtitle: string;
    priceChart: string;
    volume: string;
    marketDepth: string;
    orderBook: string;
    buy: string;
    sell: string;
    price: string;
    amount: string;
    total: string;
    high: string;
    low: string;
    change: string;
    lastUpdate: string;
  };

  // Portfolio
  portfolio: {
    title: string;
    subtitle: string;
    totalValue: string;
    allocation: string;
    performance: string;
    transactions: string;
    balance: string;
    value: string;
    change24h: string;
  };

  // AI Insights
  aiInsights: {
    title: string;
    subtitle: string;
    marketAnalysis: string;
    riskAssessment: string;
    recommendations: string;
    predictions: string;
    confidence: string;
    trend: string;
    bullish: string;
    bearish: string;
    neutral: string;
  };

  // Settings
  settings: {
    title: string;
    subtitle: string;
    notifications: string;
    priceAlerts: string;
    riskAlerts: string;
    portfolioUpdates: string;
    systemUpdates: string;
    emailNotifications: string;
    pushNotifications: string;
    security: string;
    twoFactorAuth: string;
    biometricLogin: string;
    autoLogout: string;
    sessionTimeout: string;
    tradingAutomation: string;
    autoHedging: string;
    autoStopLoss: string;
    autoRebalancing: string;
    gasOptimization: string;
    maxSlippage: string;
    appearance: string;
    darkMode: string;
    lightMode: string;
    systemSounds: string;
    language: string;
    defaultCurrency: string;
    timeFormat: string;
    account: string;
    exportData: string;
    backupWallet: string;
    clearCache: string;
    resetSettings: string;
    minutes: string;
    hours: string;
  };

  // Languages
  languages: {
    'pt-BR': string;
    'en': string;
  };

  // Time periods
  timePeriods: {
    '1h': string;
    '24h': string;
    '7d': string;
    '30d': string;
  };
}

export interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  isLoading: boolean;
} 