'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RiskMetrics } from '@/components/dashboard/risk-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Target,
  Activity,
  Zap,
  BarChart3,
  LineChart
} from 'lucide-react'

export default function RiskAnalysisPage() {
  const riskFactors = [
    {
      name: 'Risco de Liquidez',
      current: 7.2,
      threshold: 8.0,
      status: 'medium',
      description: 'Capacidade de converter posições em liquidez'
    },
    {
      name: 'Risco de Smart Contract',
      current: 6.5,
      threshold: 7.0,
      status: 'medium',
      description: 'Exposição a vulnerabilidades de código'
    },
    {
      name: 'Risco de Impermanent Loss',
      current: 9.1,
      threshold: 8.5,
      status: 'high',
      description: 'Perda por volatilidade em pools de liquidez'
    },
    {
      name: 'Risco de Concentração',
      current: 5.8,
      threshold: 7.0,
      status: 'low',
      description: 'Concentração em poucos ativos ou protocolos'
    }
  ]

  const protocolRisks = [
    {
      protocol: 'Compound',
      tvl: '$2.1B',
      riskScore: 6.2,
      factors: ['Smart Contract', 'Governance'],
      auditScore: 9.1
    },
    {
      protocol: 'Aave',
      tvl: '$5.8B',
      riskScore: 5.8,
      factors: ['Oracle Dependency', 'Liquidation Risk'],
      auditScore: 9.3
    },
    {
      protocol: 'Uniswap V3',
      tvl: '$3.2B',
      riskScore: 7.4,
      factors: ['Impermanent Loss', 'MEV'],
      auditScore: 8.9
    }
  ]

  const riskAlerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Alto risco de impermanent loss detectado',
      message: 'Pool ETH/USDC apresenta volatilidade acima do normal',
      timestamp: '2 min atrás',
      action: 'Considere rebalancear'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Concentração de protocolo elevada',
      message: '67% dos ativos estão no Compound Finance',
      timestamp: '15 min atrás',
      action: 'Diversificar protocolos'
    },
    {
      id: 3,
      severity: 'low',
      title: 'Atualização de oracle detectada',
      message: 'Chainlink atualizou feed de preços ETH/USD',
      timestamp: '1h atrás',
      action: 'Monitorar preços'
    }
  ]

  const getRiskColor = (score: number, threshold: number) => {
    if (score >= threshold) return 'text-red-600'
    if (score >= threshold * 0.8) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getRiskBg = (score: number, threshold: number) => {
    if (score >= threshold) return 'bg-red-100 dark:bg-red-900/20'
    if (score >= threshold * 0.8) return 'bg-yellow-100 dark:bg-yellow-900/20'
    return 'bg-green-100 dark:bg-green-900/20'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Análise de Risco
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Monitore e gerencie os riscos do seu portfólio DeFi em tempo real
            </p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Atualizar Análise
          </Button>
        </div>

        {/* Risk Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Score de Risco Geral
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">7.1/10</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+0.3</span> desde ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Alertas Ativos
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">
                1 alto, 1 médio, 1 baixo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                VaR (95%) 24h
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-$3,247</div>
              <p className="text-xs text-muted-foreground">
                2.6% do portfólio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volatilidade (30d)
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.3%</div>
              <p className="text-xs text-muted-foreground">
                Acima da média (15.2%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Risk Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Metrics Component */}
          <div className="lg:col-span-2">
            <RiskMetrics />
          </div>

          {/* Risk Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Alertas de Risco</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <span className="text-xs px-2 py-1 rounded capitalize">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <Button variant="outline" size="sm">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Factors Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Fatores de Risco Detalhados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskFactors.map((factor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{factor.name}</h4>
                    <span className={`text-lg font-bold ${getRiskColor(factor.current, factor.threshold)}`}>
                      {factor.current}/10
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Atual</span>
                      <span>Limite</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          factor.current >= factor.threshold ? 'bg-red-500' :
                          factor.current >= factor.threshold * 0.8 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(factor.current / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protocol Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Análise de Risco por Protocolo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Protocolo</th>
                    <th className="text-left py-3 px-4 font-medium">TVL</th>
                    <th className="text-left py-3 px-4 font-medium">Score de Risco</th>
                    <th className="text-left py-3 px-4 font-medium">Fatores Principais</th>
                    <th className="text-left py-3 px-4 font-medium">Score de Auditoria</th>
                  </tr>
                </thead>
                <tbody>
                  {protocolRisks.map((protocol, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4 font-medium">{protocol.protocol}</td>
                      <td className="py-3 px-4">{protocol.tvl}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getRiskColor(protocol.riskScore, 7)}`}>
                            {protocol.riskScore}/10
                          </span>
                          <div className={`w-2 h-2 rounded-full ${getRiskBg(protocol.riskScore, 7)}`}></div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {protocol.factors.map((factor, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-green-600">
                          {protocol.auditScore}/10
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Risk Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="w-5 h-5" />
                <span>Tendência de Risco (7 dias)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <p className="text-gray-500">Gráfico de tendência de risco</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Correlação de Riscos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risco de Mercado vs Liquidez</span>
                  <span className="text-sm font-medium">0.73</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Smart Contract vs TVL</span>
                  <span className="text-sm font-medium">-0.45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Impermanent Loss vs Volatilidade</span>
                  <span className="text-sm font-medium">0.89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Concentração vs Diversificação</span>
                  <span className="text-sm font-medium">-0.92</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 