'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Zap,
  Activity,
  Target
} from 'lucide-react'

export default function InsurancePage() {
  const activeInsurances = [
    {
      id: 1,
      protocol: 'Compound Finance',
      coverage: '$50,000',
      premium: '$125/mês',
      expires: '2024-08-15',
      status: 'active',
      riskLevel: 'low'
    },
    {
      id: 2,
      protocol: 'Aave V3',
      coverage: '$30,000',
      premium: '$89/mês',
      expires: '2024-07-20',
      status: 'active',
      riskLevel: 'medium'
    },
    {
      id: 3,
      protocol: 'Uniswap V3 LP',
      coverage: '$25,000',
      premium: '$156/mês',
      expires: '2024-06-30',
      status: 'expiring',
      riskLevel: 'high'
    }
  ]

  const availableInsurances = [
    {
      protocol: 'Curve Finance',
      maxCoverage: '$100,000',
      premiumRate: '0.8%',
      minDuration: '30 dias',
      riskScore: 6.2
    },
    {
      protocol: 'Balancer V2',
      maxCoverage: '$75,000',
      premiumRate: '1.2%',
      minDuration: '30 dias',
      riskScore: 7.1
    },
    {
      protocol: 'Yearn Finance',
      maxCoverage: '$60,000',
      premiumRate: '1.5%',
      minDuration: '30 dias',
      riskScore: 7.8
    }
  ]

  const claims = [
    {
      id: 'CLM-001',
      protocol: 'Alpha Finance',
      amount: '$15,000',
      reason: 'Smart Contract Exploit',
      status: 'approved',
      submittedAt: '2024-05-15',
      paidAt: '2024-05-22'
    },
    {
      id: 'CLM-002',
      protocol: 'BadgerDAO',
      amount: '$8,500',
      reason: 'Protocol Hack',
      status: 'pending',
      submittedAt: '2024-06-10',
      paidAt: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'expiring': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'denied': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Seguros DeFi
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Proteja seus investimentos contra riscos de smart contracts e protocolos
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Apólice
          </Button>
        </div>

        {/* Insurance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cobertura Total
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$105,000</div>
              <p className="text-xs text-muted-foreground">
                3 apólices ativas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prêmio Mensal
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$370</div>
              <p className="text-xs text-muted-foreground">
                2.95% do portfólio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Claims Aprovados
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$15,000</div>
              <p className="text-xs text-muted-foreground">
                1 claim processado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próximo Vencimento
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">11 dias</div>
              <p className="text-xs text-muted-foreground">
                Uniswap V3 LP
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Insurance Policies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Apólices Ativas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Protocolo</th>
                    <th className="text-left py-3 px-4 font-medium">Cobertura</th>
                    <th className="text-left py-3 px-4 font-medium">Prêmio</th>
                    <th className="text-left py-3 px-4 font-medium">Vencimento</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Risco</th>
                    <th className="text-left py-3 px-4 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInsurances.map((insurance) => (
                    <tr key={insurance.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4 font-medium">{insurance.protocol}</td>
                      <td className="py-3 px-4">{insurance.coverage}</td>
                      <td className="py-3 px-4">{insurance.premium}</td>
                      <td className="py-3 px-4">
                        {new Date(insurance.expires).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(insurance.status)}`}>
                          {insurance.status === 'active' ? 'Ativa' : 
                           insurance.status === 'expiring' ? 'Vencendo' : 'Expirada'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium capitalize ${getRiskColor(insurance.riskLevel)}`}>
                          {insurance.riskLevel === 'low' ? 'Baixo' :
                           insurance.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Renovar
                          </Button>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Seguros Disponíveis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableInsurances.map((insurance, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{insurance.protocol}</h4>
                      <span className="text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {insurance.premiumRate} ao ano
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Cobertura Máxima</p>
                        <p className="font-medium">{insurance.maxCoverage}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Duração Mínima</p>
                        <p className="font-medium">{insurance.minDuration}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Risco:</span>
                        <span className={`text-sm font-medium ${getRiskColor(
                          insurance.riskScore >= 8 ? 'high' : 
                          insurance.riskScore >= 6 ? 'medium' : 'low'
                        )}`}>
                          {insurance.riskScore}/10
                        </span>
                      </div>
                      <Button size="sm">
                        Contratar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Histórico de Claims</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{claim.id}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{claim.protocol}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(claim.status)}`}>
                        {claim.status === 'approved' ? 'Aprovado' : 
                         claim.status === 'pending' ? 'Pendente' : 'Negado'}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm mb-1">
                        <span className="font-medium">Valor:</span> {claim.amount}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Motivo:</span> {claim.reason}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Submetido:</span> {new Date(claim.submittedAt).toLocaleDateString('pt-BR')}
                      </p>
                      {claim.paidAt && (
                        <p className="text-sm">
                          <span className="font-medium">Pago em:</span> {new Date(claim.paidAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>

                    {claim.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Acompanhar
                      </Button>
                    )}
                  </div>
                ))}
                
                {claims.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhum claim submetido ainda
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Coverage Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Análise de Cobertura de Risco</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">Cobertura Adequada</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  84% do seu portfólio está coberto por seguros
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-medium mb-2">Atenção Necessária</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  16% do portfólio sem cobertura adequada
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium mb-2">Recomendação</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Considere seguro para posições em Curve Finance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 