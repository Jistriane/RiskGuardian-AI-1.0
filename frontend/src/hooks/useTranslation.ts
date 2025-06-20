'use client';

import { useState, useEffect } from 'react';

type Language = 'pt-BR' | 'en';

const translations = {
  'pt-BR': {
    // Navigation & Common
    dashboard: 'Dashboard',
    trading: 'Trading',
    portfolio: 'Portfolio',
    riskAnalysis: 'Análise de Risco',
    automation: 'Automação',
    insurance: 'Seguros',
    aiInsights: 'ElizaOS IA',
    monitoring: 'Monitoramento',
    settings: 'Configurações',
    
    // Dashboard page
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Visão geral do seu portfólio e mercado',
    totalPortfolioValue: 'Valor Total do Portfólio',
    riskScore: 'Score de Risco',
    lowRisk: 'Baixo risco',
    moderateRisk: 'Risco moderado',
    mediumRisk: 'Risco médio',
    highRisk: 'Alto risco',
    ethVariation24h: 'Variação ETH 24h',
    activeAutomations: 'Automações Ativas',
    assets: 'ativos',
    hedge: 'hedge',
    rebalancing: 'rebalanceamento',
    marketRealTime: 'Mercado em Tempo Real',
    live: 'Live',
    portfolioOverview: 'Visão Geral do Portfolio',
    riskMetrics: 'Métricas de Risco',
    automationStatus: 'Status da Automação',
    aiInsightsCard: 'Insights AI',
    systemStatus: 'Status do Sistema',
    blockchain: 'Blockchain',
    priceOracle: 'Oracle de Preços',
    aiAnalytics: 'IA Analytics',
    realTimeAnalysis: 'Análise em tempo real',
    volume24h: 'Volume 24h',
    high24h: 'Máxima 24h',
    low24h: 'Mínima 24h',
    loadingData: 'Carregando dados...',
    lastSync: 'Última Sincronização',
    version: 'Versão',
    online: 'Online',
    offline: 'Offline',
    
    // Trading page
    tradingTitle: 'Trading',
    tradingSubtitle: 'Plataforma de trading avançada com gráficos em tempo real',
    priceChart: 'Gráfico de Preços',
    volume: 'Volume',
    marketDepth: 'Profundidade de Mercado',
    orderBook: 'Livro de Ordens',
    buy: 'Comprar',
    sell: 'Vender',
    price: 'Preço',
    amount: 'Quantidade',
    total: 'Total',
    high: 'Máxima',
    low: 'Mínima',
    change: 'Variação',
    lastUpdate: 'Última Atualização',
    
    // Portfolio page
    portfolioTitle: 'Portfolio',
    portfolioSubtitle: 'Análise detalhada do seu portfólio de criptomoedas',
    totalValue: 'Valor Total',
    allocation: 'Alocação',
    performance: 'Performance',
    transactions: 'Transações',
    balance: 'Saldo',
    value: 'Valor',
    change24h: 'Variação 24h',
    
    // AI Insights page
    aiInsightsTitle: 'ElizaOS IA',
    aiInsightsSubtitle: 'Insights inteligentes e análises preditivas para seu portfólio',
    marketAnalysis: 'Análise de Mercado',
    riskAssessment: 'Avaliação de Risco',
    recommendations: 'Recomendações',
    predictions: 'Previsões',
    confidence: 'Confiança',
    trend: 'Tendência',
    bullish: 'Alta',
    bearish: 'Baixa',
    neutral: 'Neutro',
    
    // Risk Analysis page
    riskAnalysisTitle: 'Análise de Risco',
    riskAnalysisSubtitle: 'Análise abrangente dos riscos do seu portfólio',
    volatility: 'Volatilidade',
    liquidity: 'Liquidez',
    concentration: 'Concentração',
    smartContract: 'Smart Contract',
    riskDistribution: 'Distribuição de Risco por Ativo',
    assetCorrelation: 'Correlação Entre Ativos',
    scenarioAnalysis: 'Análise de Cenários',
    riskRecommendations: 'Recomendações de Gestão de Risco',
    bearMarket: 'Bear Market',
    normalCorrection: 'Correção Normal',
    bullMarket: 'Bull Market',
    impact: 'Impacto',
    probability: 'Probabilidade',
    diversifyExposure: 'Diversificar Exposição a Altcoins',
    increaseStablecoins: 'Aumentar Posição em Stablecoins',
    implementStopLoss: 'Implementar Stop Loss Dinâmico',
    priority: 'Prioridade',
    
    // Automation page
    automationTitle: 'Automação',
    automationSubtitle: 'Configure estratégias automatizadas de hedging e rebalanceamento',
    
    // Insurance page
    insuranceTitle: 'Seguros',
    insuranceSubtitle: 'Proteja seus ativos com seguros DeFi inteligentes',
    coverage: 'Cobertura',
    premium: 'Prêmio',
    expiration: 'Vencimento',
    renewal: 'Renovação',
    automatic: 'Automática',
    priceProtection: 'Proteção de Preço',
    smartContractRisk: 'Smart Contract Risk',
    exchangeHack: 'Exchange Hack',
    liquidationProtection: 'Liquidation Protection',
    contractInsurance: 'Contratar Seguro',
    claimsHistory: 'Histórico de Sinistros',
    paid: 'Pago',
    underReview: 'Em análise',
    denied: 'Negado',
    
    // Monitoring page
    monitoringTitle: 'Monitoramento',
    monitoringSubtitle: 'Monitore métricas e alertas em tempo real',
    
    // Settings page
    settingsTitle: 'Configurações',
    settingsSubtitle: 'Personalize sua experiência no RiskGuardian AI',
    notifications: 'Notificações',
    priceAlerts: 'Alertas de Preço',
    priceAlertsDesc: 'Receba notificações quando os preços atingirem seus limites',
    riskAlerts: 'Alertas de Risco',
    riskAlertsDesc: 'Notificações sobre mudanças no nível de risco do portfólio',
    portfolioUpdates: 'Atualizações do Portfólio',
    portfolioUpdatesDesc: 'Resumos diários do desempenho do seu portfólio',
    systemUpdates: 'Atualizações do Sistema',
    systemUpdatesDesc: 'Notificações sobre novas funcionalidades e manutenções',
    emailNotifications: 'Notificações por Email',
    emailNotificationsDesc: 'Receber notificações importantes por email',
    pushNotifications: 'Notificações Push',
    pushNotificationsDesc: 'Notificações em tempo real no navegador',
    security: 'Segurança',
    twoFactorAuth: 'Autenticação de Dois Fatores',
    biometricLogin: 'Login Biométrico',
    autoLogout: 'Logout Automático',
    sessionTimeout: 'Timeout da Sessão',
    tradingAutomation: 'Trading Automático',
    autoHedging: 'Auto Hedging',
    autoStopLoss: 'Stop Loss Automático',
    autoRebalancing: 'Rebalanceamento Automático',
    gasOptimization: 'Otimização de Gas',
    maxSlippage: 'Slippage Máximo',
    appearance: 'Aparência & Display',
    darkMode: 'Modo Escuro',
    systemSounds: 'Sons do Sistema',
    language: 'Idioma',
    defaultCurrency: 'Moeda Padrão',
    timeFormat: 'Formato de Hora',
    account: 'Conta & Dados',
    exportData: 'Exportar Dados',
    backupWallet: 'Backup da Carteira',
    clearCache: 'Limpar Cache',
    resetSettings: 'Resetar Configurações',
    
    // ElizaOS/AI specific
    aiAgent: 'Agente IA',
    chatWithAI: 'Conversar com IA',
    aiRecommendations: 'Recomendações da IA',
    aiAnalysis: 'Análise da IA',
    askQuestion: 'Fazer Pergunta',
    aiResponse: 'Resposta da IA',
    thinking: 'Pensando...',
    
    // Wallet
    connectWallet: 'Connect Wallet',
    walletConnected: 'Carteira Conectada',
    walletNotConnected: 'Carteira Não Conectada',
    connectToViewPortfolio: 'Conecte sua carteira para ver seu portfolio em tempo real',
    
    // Common actions
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    search: 'Pesquisar',
    filter: 'Filtrar',
    clear: 'Limpar',
    refresh: 'Atualizar',
    apply: 'Aplicar',
    
    // Time periods
    oneHour: '1h',
    twentyFourHours: '24h',
    sevenDays: '7d',
    thirtyDays: '30d',
    
    // Status
    active: 'Ativo',
    inactive: 'Inativo',
    enabled: 'Habilitado',
    disabled: 'Desabilitado',
    connected: 'Conectado',
    disconnected: 'Desconectado',
  },
  'en': {
    // Navigation & Common
    dashboard: 'Dashboard',
    trading: 'Trading',
    portfolio: 'Portfolio',
    riskAnalysis: 'Risk Analysis',
    automation: 'Automation',
    insurance: 'Insurance',
    aiInsights: 'ElizaOS AI',
    monitoring: 'Monitoring',
    settings: 'Settings',
    
    // Dashboard page
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Overview of your portfolio and market',
    totalPortfolioValue: 'Total Portfolio Value',
    riskScore: 'Risk Score',
    lowRisk: 'Low risk',
    moderateRisk: 'Moderate risk',
    mediumRisk: 'Medium risk',
    highRisk: 'High risk',
    ethVariation24h: 'ETH 24h Change',
    activeAutomations: 'Active Automations',
    assets: 'assets',
    hedge: 'hedge',
    rebalancing: 'rebalancing',
    marketRealTime: 'Real-Time Market',
    live: 'Live',
    portfolioOverview: 'Portfolio Overview',
    riskMetrics: 'Risk Metrics',
    automationStatus: 'Automation Status',
    aiInsightsCard: 'AI Insights',
    systemStatus: 'System Status',
    blockchain: 'Blockchain',
    priceOracle: 'Price Oracle',
    aiAnalytics: 'AI Analytics',
    realTimeAnalysis: 'Real-time analysis',
    volume24h: '24h Volume',
    high24h: '24h High',
    low24h: '24h Low',
    loadingData: 'Loading data...',
    lastSync: 'Last Sync',
    version: 'Version',
    online: 'Online',
    offline: 'Offline',
    
    // Trading page
    tradingTitle: 'Trading',
    tradingSubtitle: 'Advanced trading platform with real-time charts',
    priceChart: 'Price Chart',
    volume: 'Volume',
    marketDepth: 'Market Depth',
    orderBook: 'Order Book',
    buy: 'Buy',
    sell: 'Sell',
    price: 'Price',
    amount: 'Amount',
    total: 'Total',
    high: 'High',
    low: 'Low',
    change: 'Change',
    lastUpdate: 'Last Update',
    
    // Portfolio page
    portfolioTitle: 'Portfolio',
    portfolioSubtitle: 'Detailed analysis of your cryptocurrency portfolio',
    totalValue: 'Total Value',
    allocation: 'Allocation',
    performance: 'Performance',
    transactions: 'Transactions',
    balance: 'Balance',
    value: 'Value',
    change24h: '24h Change',
    
    // AI Insights page
    aiInsightsTitle: 'ElizaOS AI',
    aiInsightsSubtitle: 'Intelligent insights and predictive analytics for your portfolio',
    marketAnalysis: 'Market Analysis',
    riskAssessment: 'Risk Assessment',
    recommendations: 'Recommendations',
    predictions: 'Predictions',
    confidence: 'Confidence',
    trend: 'Trend',
    bullish: 'Bullish',
    bearish: 'Bearish',
    neutral: 'Neutral',
    
    // Risk Analysis page
    riskAnalysisTitle: 'Risk Analysis',
    riskAnalysisSubtitle: 'Comprehensive analysis of your portfolio risks',
    volatility: 'Volatility',
    liquidity: 'Liquidity',
    concentration: 'Concentration',
    smartContract: 'Smart Contract',
    riskDistribution: 'Risk Distribution by Asset',
    assetCorrelation: 'Asset Correlation',
    scenarioAnalysis: 'Scenario Analysis',
    riskRecommendations: 'Risk Management Recommendations',
    bearMarket: 'Bear Market',
    normalCorrection: 'Normal Correction',
    bullMarket: 'Bull Market',
    impact: 'Impact',
    probability: 'Probability',
    diversifyExposure: 'Diversify Altcoin Exposure',
    increaseStablecoins: 'Increase Stablecoin Position',
    implementStopLoss: 'Implement Dynamic Stop Loss',
    priority: 'Priority',
    
    // Automation page
    automationTitle: 'Automation',
    automationSubtitle: 'Configure automated hedging and rebalancing strategies',
    
    // Insurance page
    insuranceTitle: 'Insurance',
    insuranceSubtitle: 'Protect your assets with intelligent DeFi insurance',
    coverage: 'Coverage',
    premium: 'Premium',
    expiration: 'Expiration',
    renewal: 'Renewal',
    automatic: 'Automatic',
    priceProtection: 'Price Protection',
    smartContractRisk: 'Smart Contract Risk',
    exchangeHack: 'Exchange Hack',
    liquidationProtection: 'Liquidation Protection',
    contractInsurance: 'Contract Insurance',
    claimsHistory: 'Claims History',
    paid: 'Paid',
    underReview: 'Under Review',
    denied: 'Denied',
    
    // Monitoring page
    monitoringTitle: 'Monitoring',
    monitoringSubtitle: 'Monitor real-time metrics and alerts',
    
    // Settings page
    settingsTitle: 'Settings',
    settingsSubtitle: 'Customize your RiskGuardian AI experience',
    notifications: 'Notifications',
    priceAlerts: 'Price Alerts',
    priceAlertsDesc: 'Get notified when prices reach your set limits',
    riskAlerts: 'Risk Alerts',
    riskAlertsDesc: 'Notifications about portfolio risk level changes',
    portfolioUpdates: 'Portfolio Updates',
    portfolioUpdatesDesc: 'Daily summaries of your portfolio performance',
    systemUpdates: 'System Updates',
    systemUpdatesDesc: 'Notifications about new features and maintenance',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive important notifications via email',
    pushNotifications: 'Push Notifications',
    pushNotificationsDesc: 'Real-time notifications in browser',
    security: 'Security',
    twoFactorAuth: 'Two-Factor Authentication',
    biometricLogin: 'Biometric Login',
    autoLogout: 'Auto Logout',
    sessionTimeout: 'Session Timeout',
    tradingAutomation: 'Trading Automation',
    autoHedging: 'Auto Hedging',
    autoStopLoss: 'Auto Stop Loss',
    autoRebalancing: 'Auto Rebalancing',
    gasOptimization: 'Gas Optimization',
    maxSlippage: 'Max Slippage',
    appearance: 'Appearance & Display',
    darkMode: 'Dark Mode',
    systemSounds: 'System Sounds',
    language: 'Language',
    defaultCurrency: 'Default Currency',
    timeFormat: 'Time Format',
    account: 'Account & Data',
    exportData: 'Export Data',
    backupWallet: 'Backup Wallet',
    clearCache: 'Clear Cache',
    resetSettings: 'Reset Settings',
    
    // ElizaOS/AI specific
    aiAgent: 'AI Agent',
    chatWithAI: 'Chat with AI',
    aiRecommendations: 'AI Recommendations',
    aiAnalysis: 'AI Analysis',
    askQuestion: 'Ask Question',
    aiResponse: 'AI Response',
    thinking: 'Thinking...',
    
    // Wallet
    connectWallet: 'Connect Wallet',
    walletConnected: 'Wallet Connected',
    walletNotConnected: 'Wallet Not Connected',
    connectToViewPortfolio: 'Connect your wallet to view your portfolio in real time',
    
    // Common actions
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    refresh: 'Refresh',
    apply: 'Apply',
    
    // Time periods
    oneHour: '1h',
    twentyFourHours: '24h',
    sevenDays: '7d',
    thirtyDays: '30d',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    enabled: 'Enabled',
    disabled: 'Disabled',
    connected: 'Connected',
    disconnected: 'Disconnected',
  }
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('pt-BR');

  useEffect(() => {
    const saved = localStorage.getItem('riskguardian-language') as Language;
    if (saved && (saved === 'pt-BR' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const t = (key: keyof typeof translations['pt-BR']): string => {
    return translations[language][key] || translations['pt-BR'][key] || key;
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'pt-BR' ? 'en' : 'pt-BR';
    setLanguage(newLanguage);
    localStorage.setItem('riskguardian-language', newLanguage);
    document.documentElement.lang = newLanguage;
  };

  return {
    language,
    t,
    toggleLanguage,
    isEnglish: language === 'en'
  };
} 