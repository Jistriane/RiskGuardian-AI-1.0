'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Wallet,
  Bot,
  Zap,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Users,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercentage } from '@/lib/format';
import WalletButton from '@/components/wallet/WalletButton';

// Componente do Header
const Header = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header 
      className="glass border-b border-border/50 p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-aurora-purple aurora-glow" />
            <div className="absolute inset-0 bg-aurora-purple/20 rounded-full blur-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold aurora-text font-orbitron">
              RiskGuardian AI
            </h1>
            <p className="text-xs text-muted-foreground">v2.0.0</p>
          </div>
        </div>

        {/* Clock & Status */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            {mounted && currentTime ? (
              <>
                <p className="text-sm font-mono">
                  {currentTime.toLocaleTimeString('pt-BR')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentTime.toLocaleDateString('pt-BR')}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-mono">--:--:--</p>
                <p className="text-xs text-muted-foreground">--/--/----</p>
              </>
            )}
          </div>

          {/* Wallet Button */}
          <WalletButton />
        </div>
      </div>
    </motion.header>
  );
};

// Status dos Sistemas
const SystemStatus = () => {
  const systems = [
    { name: 'Backend API', status: 'online', port: '3001', latency: 45 },
    { name: 'ElizaOS Agent', status: 'online', port: '3000', latency: 23 },
    { name: 'Chromia AWS', status: 'offline', port: '3002', latency: null },
    { name: 'Blockchain RPC', status: 'online', port: 'Sepolia', latency: 120 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-aurora-green" />;
      case 'offline': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'degraded': return <AlertCircle className="h-4 w-4 text-aurora-yellow" />;
      default: return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.div 
      className="glass rounded-xl p-6 border border-border/50 aurora-border"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-aurora-pink" />
        <h3 className="font-semibold">Status dos Sistemas</h3>
      </div>
      
      <div className="space-y-3">
        {systems.map((system, index) => (
          <motion.div 
            key={system.name}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(system.status)}
              <div>
                <p className="font-medium text-sm">{system.name}</p>
                <p className="text-xs text-muted-foreground">Porta: {system.port}</p>
              </div>
            </div>
            {system.latency && (
              <span className="text-xs px-2 py-1 bg-aurora-purple/20 rounded text-aurora-purple">
                {system.latency}ms
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Portfolio Overview
const PortfolioOverview = () => {
  const portfolioData = {
    totalValue: 45678.90,
    dailyChange: 2.34,
    riskScore: 7.2,
    activePositions: 8,
    totalPnL: 12540.89,
    winRate: 73.2
  };

  return (
    <motion.div 
      className="glass rounded-xl p-6 border border-border/50 aurora-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <PieChart className="h-5 w-5 text-aurora-orange" />
          <h3 className="font-semibold">Visão Geral do Portfólio</h3>
        </div>
        <button 
          className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
          title="Atualizar dados do portfólio"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Valor Total</p>
          <p className="text-2xl font-bold aurora-text">
            {formatCurrency(portfolioData.totalValue)}
          </p>
          <div className="flex items-center space-x-1">
            {portfolioData.dailyChange >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-aurora-green" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
            <span className={cn(
              "text-sm font-medium",
              portfolioData.dailyChange >= 0 ? "text-aurora-green" : "text-destructive"
            )}>
              {formatPercentage(portfolioData.dailyChange)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Score de Risco</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted/20 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-aurora-green via-aurora-yellow to-aurora-pink"
                style={{ width: `${(portfolioData.riskScore / 10) * 100}%` }}
              />
            </div>
            <span className="text-lg font-bold aurora-text">
              {portfolioData.riskScore}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">P&L Total</p>
          <p className="text-xl font-bold text-aurora-green">
            +{formatCurrency(portfolioData.totalPnL)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Alertas em Tempo Real
const RealTimeAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Volatilidade Alta Detectada',
      message: 'WETH apresentando volatilidade acima de 15%',
      timestamp: '2 min atrás',
      icon: TrendingUp
    },
    {
      id: 2,
      type: 'info',
      title: 'Estratégia Executada',
      message: 'Stop-loss ativado para LINK em $12.50',
      timestamp: '5 min atrás',
      icon: Shield
    },
    {
      id: 3,
      type: 'success',
      title: 'Análise AI Concluída',
      message: 'Nova recomendação de rebalanceamento disponível',
      timestamp: '10 min atrás',
      icon: Bot
    }
  ];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning': return 'border-aurora-yellow/50 bg-aurora-yellow/10 text-aurora-yellow';
      case 'error': return 'border-destructive/50 bg-destructive/10 text-destructive';
      case 'success': return 'border-aurora-green/50 bg-aurora-green/10 text-aurora-green';
      default: return 'border-aurora-blue/50 bg-aurora-blue/10 text-aurora-blue';
    }
  };

  return (
    <motion.div 
      className="glass rounded-xl p-6 border border-border/50 aurora-border"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Bell className="h-5 w-5 text-aurora-pink" />
        <h3 className="font-semibold">Alertas em Tempo Real</h3>
        <div className="ml-auto">
          <span className="inline-flex h-2 w-2 rounded-full bg-aurora-green animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            className={cn(
              "p-3 rounded-lg border transition-all cursor-pointer hover:scale-105",
              getAlertStyles(alert.type)
            )}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-start space-x-3">
              <alert.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-xs opacity-80 mt-1">{alert.message}</p>
                <p className="text-xs opacity-60 mt-2">{alert.timestamp}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Quick Actions
const QuickActions = () => {
  const actions = [
    { icon: BarChart3, label: 'Análise AI', href: '/analysis' },
    { icon: LineChart, label: 'Gráficos', href: '/charts' },
    { icon: Shield, label: 'Estratégias', href: '/strategies' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
  ];

  return (
    <motion.div 
      className="glass rounded-xl p-6 border border-border/50 aurora-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="font-semibold mb-4 aurora-text">Ações Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20 border border-border/30 hover:bg-aurora-purple/20 hover:border-aurora-purple/50 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <action.icon className="h-4 w-4 group-hover:text-aurora-purple transition-colors" />
            <span className="text-sm font-medium group-hover:text-aurora-purple transition-colors">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Página Principal
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda */}
          <div className="space-y-6">
            <SystemStatus />
            <QuickActions />
          </div>
          
          {/* Coluna Central */}
          <div className="space-y-6">
            <PortfolioOverview />
            
            {/* Métricas de Risco */}
            <motion.div 
              className="glass rounded-xl p-6 border border-border/50 aurora-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold mb-4 aurora-text">Métricas de Risco</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-aurora-purple/10 to-aurora-pink/10 border border-aurora-purple/20">
                  <p className="text-xs text-muted-foreground">VaR (24h)</p>
                  <p className="font-bold text-lg text-aurora-orange">$2,890</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-aurora-pink/10 to-aurora-orange/10 border border-aurora-pink/20">
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                  <p className="font-bold text-lg text-aurora-yellow">1.84</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-aurora-orange/10 to-aurora-yellow/10 border border-aurora-orange/20">
                  <p className="text-xs text-muted-foreground">Max Drawdown</p>
                  <p className="font-bold text-lg text-aurora-pink">12.4%</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-aurora-yellow/10 to-aurora-blue/10 border border-aurora-yellow/20">
                  <p className="text-xs text-muted-foreground">Beta</p>
                  <p className="font-bold text-lg text-aurora-blue">0.92</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Coluna Direita */}
          <div className="space-y-6">
            <RealTimeAlerts />
            
            {/* Performance Chart */}
            <motion.div 
              className="glass rounded-xl p-6 border border-border/50 aurora-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="font-semibold mb-4 aurora-text">Performance (24h)</h3>
              <div className="h-32 bg-gradient-to-r from-aurora-purple/20 via-aurora-pink/20 to-aurora-orange/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 