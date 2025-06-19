'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Zap,
  BarChart3,
  Activity,
  Users,
  Clock
} from 'lucide-react'

export default function AIInsightsPage() {
  const aiRecommendations = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Oportunidade de Yield Farming',
      description: 'Pool USDC/USDT na Curve oferece 12.3% APY com baixo risco de IL',
      confidence: 89,
      action: 'Investir $5,000',
      timeframe: '24h',
      impact: 'high'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Risco de Concentração Detectado',
      description: '68% do portfólio está em protocolos Ethereum. Considere diversificar para outras chains.',
      confidence: 94,
      action: 'Diversificar 15%',
      timeframe: '7 dias',
      impact: 'medium'
    },
    {
      id: 3,
      type: 'optimization',
      title: 'Otimização de Gas Fees',
      description: 'Executar transações entre 2-6h UTC pode economizar até 40% em gas fees',
      confidence: 76,
      action: 'Reagendar transações',
      timeframe: 'Contínuo',
      impact: 'low'
    }
  ]

  const marketInsights = [
    {
      category: 'DeFi TVL',
      trend: 'up',
      value: '+12.4%',
      description: 'TVL cresceu significativamente nas últimas 7 dias',
      prediction: 'Tendência de alta deve continuar'
    },
    {
      category: 'Stablecoin Yield',
      trend: 'down',
      value: '-2.1%',
      description: 'Yields de stablecoins em declínio gradual',
      prediction: 'Estabilização esperada em 2 semanas'
    },
    {
      category: 'L2 Adoption',
      trend: 'up',
      value: '+45.6%',
      description: 'Forte migração para soluções Layer 2',
      prediction: 'Crescimento acelerado previsto'
    }
  ]

  const performanceAnalysis = [
    {
      metric: 'Risk-Adjusted Return',
      current: 1.67,
      benchmark: 1.23,
      percentile: 84,
      insight: 'Performance superior ao mercado'
    },
    {
      metric: 'Portfolio Diversification',
      current: 7.2,
      benchmark: 8.5,
      percentile: 62,
      insight: 'Diversificação pode ser melhorada'
    },
    {
      metric: 'Cost Efficiency',
      current: 0.89,
      benchmark: 0.75,
      percentile: 91,
      insight: 'Custos bem controlados'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Lightbulb className="w-4 h-4 text-green-600" />
      case 'risk':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'optimization':
        return <Target className="w-4 h-4 text-blue-600" />
      default:
        return <Brain className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'optimization':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-600" /> : 
      <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              IA Insights
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Análises inteligentes e recomendações personalizadas para seus investimentos DeFi
            </p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Atualizar Análise
          </Button>
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insights Ativos</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 oportunidades, 4 riscos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confiança Média</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">86%</div>
              <p className="text-xs text-muted-foreground">Alta precisão das análises</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ações Implementadas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Gerada</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$2,847</div>
              <p className="text-xs text-muted-foreground">Através de otimizações</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Recomendações da IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1">
                    {getTypeIcon(rec.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(rec.type)}`}>
                          {rec.type === 'opportunity' ? 'Oportunidade' : 
                           rec.type === 'risk' ? 'Risco' : 'Otimização'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Confiança: {rec.confidence}%</span>
                        <span>Prazo: {rec.timeframe}</span>
                        <span>Impacto: {rec.impact}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <div className="font-medium">{rec.action}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Aplicar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Insights & Performance Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Insights de Mercado</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(insight.trend)}
                        <span className="font-medium">{insight.category}</span>
                      </div>
                      <span className={`font-bold ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.value}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    <p className="text-xs font-medium">{insight.prediction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Análise de Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceAnalysis.map((analysis, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{analysis.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        Percentil {analysis.percentile}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Atual</div>
                        <div className="font-bold">{analysis.current}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Benchmark</div>
                        <div className="font-medium">{analysis.benchmark}</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${analysis.percentile}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{analysis.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Original AI Insights Component */}
        <AIInsights />
      </div>
    </DashboardLayout>
  )
} 