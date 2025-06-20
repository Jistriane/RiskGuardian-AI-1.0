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
    lending: string;
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
    connectWallet: string;
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
    activeAlerts: string;
    noActiveAlerts: string;
    allMetricsNormal: string;
    highRiskDetected: string;
    considerDiversifying: string;
    concentratedPortfolio: string;
    addMoreAssets: string;
    emptyPortfolio: string;
    addAssetsToStart: string;
    portfolioRealTime: string;
    lastUpdate: string;
    totalValue: string;
    diversification: string;
    wellDiversified: string;
    concentrated: string;
    ofPortfolio: string;
    noAssetsFound: string;
    noAssetsInWallet: string;
    ensureWalletHasAssets: string;
    // Métricas de risco
    volatility: string;
    volatilityPortfolio: string;
    correlation: string;
    correlationAssets: string;
    var1Day: string;
    varDescription: string;
    sharpeRatio: string;
    sharpeDescription: string;
    riskMetricsTitle: string;
    // Tendências
    up: string;
    down: string;
    stable: string;
    // Status da automação
    stopLossEth: string;
    stopLossDescription: string;
    rebalancing: string;
    rebalancingDescription: string;
    volatilityAlert: string;
    volatilityAlertDescription: string;
    defiInsurance: string;
    defiInsuranceDescription: string;
    executed: string;
    lastExecution: string;
    nextExecution: string;
    systemOperational: string;
    rulesActive: string;
    // Performance
    performance24h: string;
    initialValue: string;
    currentValue: string;
    variation: string;
    pnl24h: string;
    portfolioSummary: string;
    currentPrice: string;
    // Insights AI
    dcaOpportunity: string;
    dcaDescription: string;
    highCorrelationDetected: string;
    correlationDescription: string;
    rebalancingSuggested: string;
    increasingVolatility: string;
    yieldFarmingOpportunity: string;
    highPriority: string;
    mediumPriority: string;
    lowPriority: string;
    confidence: string;
    elizaosAiActive: string;
    analyzingInsights: string;
    insightsRealTime: string;
    seconds: string;
    minutes: string;
    analysisBy: string;
    assets: string;
    hedge: string;
    rebalanceamento: string;
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
    priceChart: string;
    walletDiagnostic: string;
    walletConnectionTest: string;
    clickTestConnection: string;
    connectWalletTest: string;
    ethereumProvider: string;
    detected: string;
    metaMask: string;
    accounts: string;
    chainId: string;
    browser: string;
    generalStatus: string;
    portfolioRiskModerate: string;
    today: string;
    vol: string;
    error: string;
    // Novas traduções específicas
    accountsCount: string;
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
    portfolioOverview: string;
    walletNotConnected: string;
    connectToViewPortfolio: string;
    connectWallet: string;
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    assets: string;
    riskScore: string;
    lastUpdate: string;
  };

  // Lending
  lending: {
    title: string;
    subtitle: string;
    overview: string;
    myLoans: string;
    availableOffers: string;
    lendingPools: string;
    borrowingPools: string;
    
    // Lending Overview
    totalLent: string;
    totalBorrowed: string;
    netPosition: string;
    avgLendingAPY: string;
    avgBorrowingAPR: string;
    healthFactor: string;
    liquidationRisk: string;
    
    // Actions
    lend: string;
    borrow: string;
    repay: string;
    withdraw: string;
    supply: string;
    claim: string;
    
    // Pool Information
    asset: string;
    apy: string;
    apr: string;
    totalSupply: string;
    totalBorrow: string;
    utilization: string;
    liquidity: string;
    collateralFactor: string;
    liquidationThreshold: string;
    
    // Loan Details
    principal: string;
    interest: string;
    collateral: string;
    dueDate: string;
    status: string;
    loanToValue: string;
    
    // Status
    active: string;
    pending: string;
    completed: string;
    defaulted: string;
    liquidated: string;
    
    // Risk Assessment
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    veryHighRisk: string;
    
    // AI Insights
    aiRecommendation: string;
    marketTrend: string;
    optimalRate: string;
    riskScore: string;
    
    // Protocols
    aave: string;
    compound: string;
    makerdao: string;
    cream: string;
    venus: string;
    
    // Modals
    lendModal: string;
    borrowModal: string;
    repayModal: string;
    withdrawModal: string;
    
    // Form Labels
    amount: string;
    duration: string;
    interestRate: string;
    collateralRequired: string;
    estimatedEarnings: string;
    estimatedCost: string;
    
    // Messages
    insufficientBalance: string;
    insufficientCollateral: string;
    exceedsLimit: string;
    transactionPending: string;
    transactionSuccess: string;
    transactionFailed: string;
    
    // Time periods
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
    
    // Notifications
    liquidationWarning: string;
    healthFactorLow: string;
    newLendingOpportunity: string;
    rateChange: string;
    
    // Analytics
    performance: string;
    history: string;
    earnings: string;
    fees: string;
    rewards: string;
    
    // ElizaOS Integration
    aiAnalysis: string;
    marketPrediction: string;
    riskAssessment: string;
    optimizationSuggestion: string;
    autoLendingEnabled: string;
    smartRebalancing: string;
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