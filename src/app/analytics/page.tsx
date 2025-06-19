'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Calendar,
  Filter,
  LineChart,
  DollarSign,
  Percent,
  Activity,
  Target,
  Users,
  Clock
} from 'lucide-react'

export default function AnalyticsPage() {
  const performanceMetrics = [
    {
      period: 'Último Mês',
      totalReturn: 8.42,
      sharpeRatio: 1.23,
      volatility: 18.5,
      maxDrawdown: -5.2,
      winRate: 67.3,
      avgTrade: 2.1
    },
    {
      period: 'Últimos 3 Meses',
      totalReturn: 24.67,
      sharpeRatio: 1.45,
      volatility: 21.2,
      maxDrawdown: -8.7,
      winRate: 63.8,
      avgTrade: 1.9
    },
    {
      period: 'Último Ano',
      totalReturn: 156.89,
      sharpeRatio: 1.67,
      volatility: 25.1,
      maxDrawdown: -15.3,
      winRate: 59.2,
      avgTrade: 2.3
    }
  ]

  const topProtocols = [
    {
      name: 'Aave',
      allocation: 28.5,
      return: '+12.3%',
      risk: 'Baixo',
      volume: '$45,230'
    },
    {
      name: 'Compound',
      allocation: 22.1,
      return: '+8.7%',
      risk: 'Baixo',
      volume: '$32,840'
    },
    {
      name: 'Uniswap V3',
      allocation: 18.9,
      return: '+15.2%',
      risk: 'Médio',
      volume: '$28,560'
    },
    {
      name: 'Curve',
      allocation: 15.3,
      return: '+6.4%',
      risk: 'Baixo',
      volume: '$23,120'
    },
    {
      name: 'Balancer',
      allocation: 15.2,
      return: '+11.8%',
      risk: 'Médio',
      volume: '$22,980'
    }
  ]

  const monthlyReturns = [
    { month: 'Jan', return: 4.2, benchmark: 2.8 },
    { month: 'Fev', return: 6.8, benchmark: 3.1 },
    { month: 'Mar', return: -2.1, benchmark: -1.5 },
    { month: 'Abr', return: 8.9, benchmark: 4.2 },
    { month: 'Mai', return: 12.3, benchmark: 6.7 },
    { month: 'Jun', return: 5.7, benchmark: 3.9 }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return 'text-green-600'
      case 'Médio':
        return 'text-yellow-600'
      case 'Alto':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Relatórios detalhados e análise de performance do portfólio
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retorno Total (YTD)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+156.89%</div>
              <p className="text-xs text-muted-foreground">vs benchmark: +87.23%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.67</div>
              <p className="text-xs text-muted-foreground">Acima do target (1.5)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">59.2%</div>
              <p className="text-xs text-muted-foreground">142 trades positivos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-15.3%</div>
              <p className="text-xs text-muted-foreground">Recuperado em 28 dias</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Performance por Período</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="font-medium mb-3">{metric.period}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Retorno</div>
                        <div className="font-bold text-green-600">+{metric.totalReturn}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Sharpe</div>
                        <div className="font-medium">{metric.sharpeRatio}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Volatilidade</div>
                        <div className="font-medium">{metric.volatility}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Drawdown</div>
                        <div className="font-medium text-red-600">{metric.maxDrawdown}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Win Rate</div>
                        <div className="font-medium">{metric.winRate}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg Trade</div>
                        <div className="font-medium">+{metric.avgTrade}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Top Protocolos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProtocols.map((protocol, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600" style={{
                        backgroundColor: `hsl(${220 + index * 40}, 70%, 50%)`
                      }}></div>
                      <div>
                        <div className="font-medium">{protocol.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {protocol.allocation}% • {protocol.volume}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{protocol.return}</div>
                      <div className={`text-sm ${getRiskColor(protocol.risk)}`}>
                        {protocol.risk}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="w-5 h-5" />
              <span>Retornos Mensais vs Benchmark</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-2 justify-center">
              {monthlyReturns.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-1">
                    <div 
                      className="w-6 bg-blue-600 rounded-t"
                      style={{ 
                        height: `${Math.max(Math.abs(data.return) * 8, 4)}px`,
                        backgroundColor: data.return >= 0 ? '#3b82f6' : '#ef4444'
                      }}
                    ></div>
                    <div 
                      className="w-6 bg-gray-400 rounded-t opacity-60"
                      style={{ 
                        height: `${Math.max(Math.abs(data.benchmark) * 8, 4)}px`,
                        backgroundColor: data.benchmark >= 0 ? '#6b7280' : '#9ca3af'
                      }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium">{data.month}</div>
                  <div className="text-xs text-muted-foreground">
                    {data.return > 0 ? '+' : ''}{data.return}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span>Portfolio</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span>Benchmark</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Horários de Trading</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>00:00 - 06:00</span>
                  <span className="font-medium">12 trades</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>06:00 - 12:00</span>
                  <span className="font-medium">34 trades</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>12:00 - 18:00</span>
                  <span className="font-medium">67 trades</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>18:00 - 24:00</span>
                  <span className="font-medium">45 trades</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Correlações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>vs ETH</span>
                  <span className="font-medium">0.89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs BTC</span>
                  <span className="font-medium">0.72</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs DeFi Index</span>
                  <span className="font-medium">0.94</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs S&P 500</span>
                  <span className="font-medium">0.23</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Custos Operacionais</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Gas Fees</span>
                  <span className="font-medium">$1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Slippage</span>
                  <span className="font-medium">$234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>MEV Lost</span>
                  <span className="font-medium">$89</span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">$1,570</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
