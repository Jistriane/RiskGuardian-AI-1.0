'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Code,
  Database,
  Cpu
} from 'lucide-react'

export default function AutomationPage() {
  const upkeeps = [
    {
      id: '1',
      name: 'Rebalanceamento de Portfólio',
      description: 'Rebalanceia automaticamente o portfólio quando a alocação desvia 5%',
      status: 'active',
      lastRun: '2024-01-15 14:30:00',
      nextRun: '2024-01-16 14:30:00',
      frequency: '24h',
      gasUsed: '0.0045 ETH',
      successRate: 98.5
    },
    {
      id: '2',
      name: 'Stop Loss Dinâmico',
      description: 'Executa stop loss quando perdas excedem 10% em posições específicas',
      status: 'active',
      lastRun: '2024-01-15 16:15:00',
      nextRun: 'Condicional',
      frequency: 'On-demand',
      gasUsed: '0.0032 ETH',
      successRate: 100.0
    },
    {
      id: '3',
      name: 'Harvest de Rewards',
      description: 'Coleta e reinveste rewards de farming automaticamente',
      status: 'paused',
      lastRun: '2024-01-14 12:00:00',
      nextRun: 'Pausado',
      frequency: '12h',
      gasUsed: '0.0067 ETH',
      successRate: 95.2
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
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
              Automação
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Gerencie Chainlink Upkeeps e estratégias automatizadas
            </p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Nova Automação
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upkeeps Ativos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-xs text-muted-foreground">1 pausado, 0 com erro</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gás Usado (30d)</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.127 ETH</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-15%</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98.3%</div>
              <p className="text-xs text-muted-foreground">421 execuções bem-sucedidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Estimada</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$2,847</div>
              <p className="text-xs text-muted-foreground">Devido à automação vs manual</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Chainlink Upkeeps Ativos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upkeeps.map((upkeep) => (
                <div
                  key={upkeep.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(upkeep.status)}
                    <div>
                      <div className="font-medium">{upkeep.name}</div>
                      <div className="text-sm text-muted-foreground">{upkeep.description}</div>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span>Último: {upkeep.lastRun}</span>
                        <span>Próximo: {upkeep.nextRun}</span>
                        <span>Frequência: {upkeep.frequency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <div className="font-medium">{upkeep.successRate}%</div>
                      <div className="text-muted-foreground">{upkeep.gasUsed}</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(upkeep.status)}`}>
                        {upkeep.status === 'active' ? 'Ativo' : 
                         upkeep.status === 'paused' ? 'Pausado' : 'Erro'}
                      </span>
                      
                      <div className="flex space-x-1">
                        {upkeep.status === 'active' ? (
                          <Button variant="outline" size="sm">
                            <Pause className="w-3 h-3" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="w-3 h-3" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
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
