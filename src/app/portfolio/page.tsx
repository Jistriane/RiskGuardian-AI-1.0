'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePortfolio } from '@/hooks/usePortfolio'
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Percent,
  Plus,
  BarChart3,
  Target,
  Activity
} from 'lucide-react'

export default function PortfolioPage() {
  const { portfolios, selectedPortfolio, isLoading } = usePortfolio()

  const portfolioPositions = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: '15.5',
      value: '$42,350.00',
      allocation: 33.8,
      change24h: 2.4,
      protocol: 'Compound'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      amount: '35,000',
      value: '$35,000.00',
      allocation: 27.9,
      change24h: 0.0,
      protocol: 'Aave'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: '0.8',
      value: '$28,800.00',
      allocation: 23.0,
      change24h: 1.8,
      protocol: 'Direct'
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      amount: '2,150',
      value: '$12,900.00',
      allocation: 10.3,
      change24h: -0.5,
      protocol: 'Uniswap V3'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      amount: '420',
      value: '$6,300.00',
      allocation: 5.0,
      change24h: 3.2,
      protocol: 'Staking'
    }
  ]

  const protocolDistribution = [
    { name: 'Compound', value: 42.3, color: '#10B981' },
    { name: 'Aave', value: 27.9, color: '#3B82F6' },
    { name: 'Uniswap V3', value: 15.8, color: '#8B5CF6' },
    { name: 'Direct Holdings', value: 14.0, color: '#F59E0B' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Análise de Portfólio
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Gerencie e analise seus investimentos DeFi
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Portfólio
          </Button>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,350.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.4%</span> últimas 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Posições
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Em 4 protocolos diferentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Maior Posição
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33.8%</div>
              <p className="text-xs text-muted-foreground">
                ETH (Ethereum)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance 30d
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12.7%</div>
              <p className="text-xs text-muted-foreground">
                Acima do mercado (+8.2%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <div className="lg:col-span-2">
            <PortfolioOverview />
          </div>

          {/* Protocol Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Distribuição por Protocolo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {protocolDistribution.map((protocol, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: protocol.color }}
                      ></div>
                      <span className="text-sm font-medium">{protocol.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {protocol.value}%
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Diversificação de Protocolo
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Boa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Posições Detalhadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Ativo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Quantidade
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Valor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Alocação
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      24h
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      Protocolo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioPositions.map((position, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">{position.symbol}</span>
                          </div>
                          <div>
                            <p className="font-medium">{position.symbol}</p>
                            <p className="text-sm text-gray-500">{position.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{position.amount}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{position.value}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[60px]">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${position.allocation}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{position.allocation}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          position.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {position.change24h >= 0 ? '+' : ''}{position.change24h}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                          {position.protocol}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Correlação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">ETH - BTC</span>
                  <span className="text-sm font-medium">0.85</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ETH - UNI</span>
                  <span className="text-sm font-medium">0.72</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">BTC - LINK</span>
                  <span className="text-sm font-medium">0.68</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">USDC - ETH</span>
                  <span className="text-sm font-medium">-0.12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sharpe Ratio</span>
                  <span className="text-sm font-medium text-green-600">1.24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Volatilidade (30d)</span>
                  <span className="text-sm font-medium">18.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Max Drawdown</span>
                  <span className="text-sm font-medium text-red-600">-12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Beta (vs ETH)</span>
                  <span className="text-sm font-medium">0.89</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 