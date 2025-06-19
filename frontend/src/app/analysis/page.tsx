'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Shield,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  ArrowLeft,
  RefreshCw,
  Download,
  Play,
  Pause
} from 'lucide-react';
import Link from 'next/link';

const AnalysisPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 hover:bg-muted/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-2xl font-bold cyber-text">Análise AI</h1>
                <p className="text-sm text-muted-foreground">
                  Análise avançada de portfólio com inteligência artificial
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 px-4 py-2 bg-primary/20 border border-primary/50 text-primary rounded-lg hover:bg-primary/30 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Analisando...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Iniciar Análise</span>
                </>
              )}
            </button>
            
            <button className="p-2 hover:bg-muted/20 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button className="p-2 hover:bg-muted/20 rounded-lg transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {isAnalyzing && (
          <motion.div 
            className="glass rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso da Análise AI</span>
              <span className="text-sm text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio AI Analysis */}
          <motion.div 
            className="lg:col-span-2 glass rounded-xl p-6 border border-border/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Análise AI do Portfólio</h3>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">ATIVO</span>
            </div>

            <div className="space-y-6">
              {/* AI Insights */}
              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span>Insights Principais</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-green-400">
                    ✓ Diversificação adequada com 8 ativos diferentes
                  </p>
                  <p className="text-yellow-400">
                    ⚠ Concentração alta em WETH (35% do portfólio)
                  </p>
                  <p className="text-blue-400">
                    ℹ Correlação baixa entre ativos (-0.12)
                  </p>
                  <p className="text-red-400">
                    ⚠ Volatilidade acima da média (18.5%)
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Recomendações AI</span>
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded bg-primary/10 border border-primary/30">
                    <p className="font-medium text-sm mb-1">Rebalanceamento Sugerido</p>
                    <p className="text-xs text-muted-foreground">
                      Reduzir exposição WETH para 25% e aumentar LINK para 20%
                    </p>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                    <p className="font-medium text-sm mb-1">Hedge Protection</p>
                    <p className="text-xs text-muted-foreground">
                      Implementar stop-loss em 15% para posições voláteis
                    </p>
                  </div>
                  <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/30">
                    <p className="font-medium text-sm mb-1">Oportunidade</p>
                    <p className="text-xs text-muted-foreground">
                      Adicionar stablecoins (5-10%) para reduzir volatilidade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Metrics */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Risk Score */}
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Score de Risco</span>
              </h3>
              
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#374151"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={226}
                      strokeDashoffset={226 - (226 * 72) / 100}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">72</span>
                  </div>
                </div>
                <p className="text-yellow-400 font-medium">Risco Alto</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Baseado em 15 fatores de análise
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Métricas de Performance</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ROI (30d)</span>
                  <span className="font-bold text-green-400">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                  <span className="font-bold">1.84</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Max Drawdown</span>
                  <span className="font-bold text-red-400">-18.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-bold text-green-400">73.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Volatilidade</span>
                  <span className="font-bold text-yellow-400">18.5%</span>
                </div>
              </div>
            </div>

            {/* Market Sentiment */}
            <div className="glass rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Sentimento do Mercado</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fear & Greed Index</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                    28 - Medo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Momentum</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    Bullish
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volume</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                    Alto
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Model Status */}
        <motion.div 
          className="glass rounded-xl p-6 border border-border/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4">Status dos Modelos AI</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">GPT-4 Portfolio</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">
                Análise ativa • Última atualização: 2min
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Claude Risk</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">
                Monitoramento ativo • Última atualização: 1min
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Custom ML</span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">
                Treinamento • ETA: 5min
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisPage; 