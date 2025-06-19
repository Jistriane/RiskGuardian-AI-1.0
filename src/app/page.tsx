'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import DashboardLayout from '@/components/layout/DashboardLayout'
import PortfolioOverview from '@/components/dashboard/PortfolioOverview'
import RiskMetrics from '@/components/dashboard/RiskMetrics'
import AlertsPanel from '@/components/dashboard/AlertsPanel'
import AIInsights from '@/components/dashboard/AIInsights'
import TradingViewChart from '@/components/charts/TradingViewChart'
import SystemStatus from '@/components/dashboard/SystemStatus'
import WalletButton from '@/components/wallet/WalletButton'
import { useAppStore } from '@/store'
import { webSocketService } from '@/services/websocket'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Shield, Zap, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const { address, isConnected } = useAccount()
  const [selectedAsset, setSelectedAsset] = useState('ETH/USD')
  const { 
    alerts, 
    wsConnected, 
    systemStatus,
    addAlert,
    setWsConnected,
    setSystemStatus 
  } = useAppStore()

  useEffect(() => {
    // Configurar callbacks do WebSocket
    webSocketService.setCallbacks({
      onConnect: () => {
        setWsConnected(true)
        setSystemStatus({
          ...systemStatus,
          services: { ...systemStatus.services, websocket: true }
        })
      },
      onDisconnect: () => {
        setWsConnected(false)
        setSystemStatus({
          ...systemStatus,
          services: { ...systemStatus.services, websocket: false }
        })
      },
      onAlert: (alert) => {
        addAlert(alert)
      },
      onError: (error) => {
        console.error('WebSocket Error:', error)
      }
    })

    // Subscrever a alertas globais
    if (wsConnected) {
      webSocketService.subscribeToGlobalAlerts()
    }

    return () => {
      // Cleanup se necessário
    }
  }, [wsConnected])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <Shield className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'default'
      default:
        return 'default'
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🛡️ RiskGuardian AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Dashboard Analítico de Risco DeFi com IA em Tempo Real
            </p>
            <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Análise em tempo real com IA</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Multi-chain: Sepolia, Mumbai, Fuji</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Hedging automático de riscos</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Conecte sua carteira para começar
            </h2>
            <div className="flex justify-center">
              <WalletButton />
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-400">
            Suporte para testnet apenas • Sepolia • Polygon Mumbai • Avalanche Fuji
          </div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header com informações da carteira */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard RiskGuardian
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Análise completa do seu portfólio DeFi
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <WalletButton />
          </div>
        </div>

        {/* Status do sistema */}
        <SystemStatus />

        {/* Recent Alerts */}
        {alerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Alertas Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimas notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <Alert key={alert.id} variant={getAlertVariant(alert.type) as any}>
                  <div className="flex items-start space-x-2">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <AlertDescription className="text-sm">
                        {alert.message}
                      </AlertDescription>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Grid principal do dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Portfolio e Métricas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <PortfolioOverview address={address} />
            
            {/* Gráfico TradingView */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Análise de Mercado
                </h2>
                <select 
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                >
                  <option value="ETH/USD">ETH/USD</option>
                  <option value="BTC/USD">BTC/USD</option>
                  <option value="AVAX/USD">AVAX/USD</option>
                  <option value="MATIC/USD">MATIC/USD</option>
                </select>
              </div>
              <TradingViewChart symbol={selectedAsset} />
            </div>
          </div>

          {/* Coluna direita - Alertas e IA */}
          <div className="space-y-6">
            {/* Métricas de Risco */}
            <RiskMetrics address={address} />
            
            {/* Alertas */}
            <AlertsPanel />
            
            {/* Insights de IA */}
            <AIInsights address={address} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-600">Ver relatórios detalhados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gestão de Risco</h3>
                  <p className="text-sm text-gray-600">Configurar proteções</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Insights</h3>
                  <p className="text-sm text-gray-600">Análises personalizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automação</h3>
                  <p className="text-sm text-gray-600">Configurar triggers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development Info */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">🚧 Ambiente de Desenvolvimento</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Backend: localhost:3001</p>
                <p>• ElizaOS: localhost:3000</p>
                <p>• Chromia: localhost:8080</p>
                <p>• WebSocket: {wsConnected ? '✅ Conectado' : '❌ Desconectado'}</p>
                <p>• Rede: Sepolia Testnet</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
} 