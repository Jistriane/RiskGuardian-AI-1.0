'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview'
import { RiskMetrics } from '@/components/dashboard/risk-metrics'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield,
  Activity,
  Zap
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard - Visão Geral
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Acompanhe o status geral dos seus investimentos e do sistema
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Total do Portfólio
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,430.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Score de Risco Médio
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">6.8/10</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+0.3</span> desde a última análise
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Retorno 24h
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$2,847.23</div>
              <p className="text-xs text-muted-foreground">
                +2.32% de performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Alertas Ativos
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">
                2 de risco alto, 1 médio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PortfolioOverview />
          </div>

          {/* Risk Metrics - Takes 1 column */}
          <div className="lg:col-span-1">
            <RiskMetrics />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Status do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Backend API</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">ElizaOS Agent</span>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">Conectando</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Chromia Alerts</span>
                  </div>
                  <span className="text-sm text-red-600 font-medium">Offline</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Blockchain RPC</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Price Feeds</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Depósito USDC</p>
                    <p className="text-xs text-gray-500">Compound Finance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+$5,000</p>
                    <p className="text-xs text-gray-500">2h atrás</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Swap ETH → USDT</p>
                    <p className="text-xs text-gray-500">Uniswap V3</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">1.5 ETH</p>
                    <p className="text-xs text-gray-500">5h atrás</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Resgate DAI</p>
                    <p className="text-xs text-gray-500">Aave Protocol</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">-$2,500</p>
                    <p className="text-xs text-gray-500">1d atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8">
          <AIInsights />
        </div>
      </div>
    </DashboardLayout>
  )
} 