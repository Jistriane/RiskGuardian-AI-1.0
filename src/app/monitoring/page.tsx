'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Server, 
  Database, 
  Wifi,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Shield,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react'

export default function MonitoringPage() {
  const systemComponents = [
    {
      name: 'Backend API',
      status: 'online',
      uptime: '99.8%',
      lastCheck: '30s ago',
      responseTime: '45ms',
      description: 'Servidor principal da aplicação'
    },
    {
      name: 'ElizaOS Agent',
      status: 'online',
      uptime: '97.2%',
      lastCheck: '1m ago',
      responseTime: '120ms',
      description: 'Agente de IA para análises'
    },
    {
      name: 'Chromia Database',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '2m ago',
      responseTime: '89ms',
      description: 'Base de dados principal'
    },
    {
      name: 'WebSocket Server',
      status: 'online',
      uptime: '99.9%',
      lastCheck: '15s ago',
      responseTime: '12ms',
      description: 'Conexões em tempo real'
    },
    {
      name: 'Chainlink Upkeeps',
      status: 'online',
      uptime: '96.1%',
      lastCheck: '5m ago',
      responseTime: '2.3s',
      description: 'Automação on-chain'
    },
    {
      name: 'Market Data API',
      status: 'offline',
      uptime: '94.8%',
      lastCheck: '30m ago',
      responseTime: 'N/A',
      description: 'Dados de mercado em tempo real'
    }
  ]

  const activeAlerts = [
    {
      id: '1',
      severity: 'high',
      message: 'Market Data API não responsivo há 30 minutos',
      timestamp: '2024-01-15 17:45:00',
      component: 'Market Data API'
    },
    {
      id: '2',
      severity: 'medium',
      message: 'Chromia Database latência acima do normal (89ms)',
      timestamp: '2024-01-15 17:30:00',
      component: 'Chromia Database'
    },
    {
      id: '3',
      severity: 'low',
      message: 'Optimism network congestionamento detectado',
      timestamp: '2024-01-15 17:15:00',
      component: 'Optimism'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'offline':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Monitoramento
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Status em tempo real de todos os componentes do sistema
            </p>
          </div>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Atualizar Status
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sistema Geral</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operacional</div>
              <p className="text-xs text-muted-foreground">5/6 serviços online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime Médio</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">97.8%</div>
              <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <p className="text-xs text-muted-foreground">1 alto, 1 médio, 1 baixo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latência Média</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65ms</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-12ms</span> vs ontem
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Status dos Componentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemComponents.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(component.status)}
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-sm text-muted-foreground">{component.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right text-sm">
                      <div className="font-medium">Uptime: {component.uptime}</div>
                      <div className="text-muted-foreground">
                        {component.responseTime} • {component.lastCheck}
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(component.status)}`}>
                      {component.status === 'online' ? 'Online' : 
                       component.status === 'warning' ? 'Atenção' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Alertas Ativos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity === 'high' ? 'Alto' : 
                           alert.severity === 'medium' ? 'Médio' : 'Baixo'}
                        </span>
                        <span className="text-sm text-muted-foreground">{alert.component}</span>
                      </div>
                      
                      <div className="text-sm font-medium mb-1">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.timestamp}</div>
                    </div>
                    
                    <Button variant="outline" size="sm">Resolver</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
