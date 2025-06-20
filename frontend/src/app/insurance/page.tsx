'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useClientTime } from '@/hooks/useClientTime';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  Calendar,
  Activity,
  Target
} from 'lucide-react';

interface InsurancePolicy {
  id: string;
  type: string;
  coverage: number;
  premium: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  autoRenewal: boolean;
}

interface ClaimHistory {
  id: string;
  policyId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'denied';
  description: string;
}

export default function InsurancePage() {
  const { t } = useTranslation();
  const { formatDate } = useClientTime();
  
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  // Mock data - em produção viria da API
  const policies: InsurancePolicy[] = [
    {
      id: '1',
      type: 'Smart Contract Risk',
      coverage: 50000,
      premium: 250,
      startDate: '2024-01-15T00:00:00Z',
      endDate: '2024-07-15T00:00:00Z',
      status: 'active',
      autoRenewal: true
    },
    {
      id: '2',
      type: 'Price Protection',
      coverage: 25000,
      premium: 125,
      startDate: '2024-02-01T00:00:00Z',
      endDate: '2024-08-01T00:00:00Z',
      status: 'active',
      autoRenewal: false
    },
    {
      id: '3',
      type: 'Exchange Hack',
      coverage: 100000,
      premium: 500,
      startDate: '2023-12-01T00:00:00Z',
      endDate: '2024-06-01T00:00:00Z',
      status: 'expired',
      autoRenewal: false
    }
  ];

  const claims: ClaimHistory[] = [
    {
      id: '1',
      policyId: '1',
      amount: 5000,
      date: '2024-03-15T00:00:00Z',
      status: 'paid',
      description: 'Smart contract exploit compensation'
    },
    {
      id: '2',
      policyId: '2',
      amount: 2500,
      date: '2024-04-01T00:00:00Z',
      status: 'pending',
      description: 'Price protection claim'
    }
  ];

  const totalCoverage = policies
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.coverage, 0);

  const totalPremiums = policies
    .filter(p => p.status === 'active')
    .reduce((sum, p) => sum + p.premium, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-900/20 border-green-800/30 text-green-400">Ativo</Badge>;
      case 'expired':
        return <Badge className="bg-red-900/20 border-red-800/30 text-red-400">Expirado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-900/20 border-yellow-800/30 text-yellow-400">Pendente</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-900/20 border-green-800/30 text-green-400">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-900/20 border-yellow-800/30 text-yellow-400">Pendente</Badge>;
      case 'denied':
        return <Badge className="bg-red-900/20 border-red-800/30 text-red-400">Negado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🛡️ {t('insuranceTitle')}</h1>
          <p className="text-muted-foreground">
            {t('insuranceSubtitle')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-300">
                <Shield className="h-5 w-5" />
                {t('coverage')} Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">${totalCoverage.toLocaleString()}</div>
              <p className="text-sm text-gray-300 mt-1">
                {policies.filter(p => p.status === 'active').length} apólices ativas
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <DollarSign className="h-5 w-5" />
                {t('premium')} Mensal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">${totalPremiums.toLocaleString()}</div>
              <p className="text-sm text-gray-300 mt-1">
                Próximo pagamento em 15 dias
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-300">
                <Activity className="h-5 w-5" />
                Claims Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {claims.filter(c => c.status === 'pending').length}
              </div>
              <p className="text-sm text-gray-300 mt-1">
                ${claims.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0).toLocaleString()} em análise
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Apólices Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div 
                    key={policy.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPolicy === policy.id 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedPolicy(policy.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{policy.type}</span>
                      </div>
                      {getStatusBadge(policy.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Cobertura</div>
                        <div className="font-semibold">${policy.coverage.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Prêmio Mensal</div>
                        <div className="font-semibold">${policy.premium}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                      <div>
                        <div className="text-gray-400">Início</div>
                        <div className="text-sm">{formatDate(policy.startDate)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Vencimento</div>
                        <div className="text-sm">{formatDate(policy.endDate)}</div>
                      </div>
                    </div>
                    
                    {policy.autoRenewal && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        Renovação Automática
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Tipos de Seguro Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{t('smartContractRisk')}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Proteção contra bugs e exploits em contratos inteligentes
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa: 0.5% ao mês</span>
                    <Button size="sm" variant="outline">Contratar</Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{t('priceProtection')}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Proteção contra quedas bruscas de preço dos ativos
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa: 0.3% ao mês</span>
                    <Button size="sm" variant="outline">Contratar</Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">{t('exchangeHack')}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Cobertura em caso de hack ou falência de exchanges
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa: 0.2% ao mês</span>
                    <Button size="sm" variant="outline">Contratar</Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{t('liquidationProtection')}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Proteção contra liquidação forçada em posições alavancadas
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxa: 0.4% ao mês</span>
                    <Button size="sm" variant="outline">Contratar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t('claimsHistory')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claims.map((claim) => (
                <div key={claim.id} className="p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Claim #{claim.id}</span>
                    </div>
                    {getClaimStatusBadge(claim.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Valor</div>
                      <div className="font-semibold">${claim.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Data</div>
                      <div>{formatDate(claim.date)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Apólice</div>
                      <div>#{claim.policyId}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-gray-400 text-xs">Descrição</div>
                    <div className="text-sm">{claim.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Avaliação de Risco Inteligente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Análise Atual do Portfolio</h3>
                
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Baixo Risco de Smart Contract
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Protocolos auditados e com histórico sólido
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    Exposição Moderada a Volatilidade
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Portfolio concentrado em ativos voláteis
                  </p>
                </div>
                
                <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    Cobertura Adequada
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Seguros atuais cobrem 75% do portfolio
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Recomendações da IA</h3>
                
                <div className="space-y-2">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">🎯 Aumentar Proteção de Preço</div>
                    <p className="text-xs text-gray-400 mt-1">
                      Considere adicionar proteção para ETH (+$10k cobertura)
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">⚡ Otimizar Prêmios</div>
                    <p className="text-xs text-gray-400 mt-1">
                      Renegociar apólice #2 pode reduzir custos em 15%
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">🔄 Renovação Automática</div>
                    <p className="text-xs text-gray-400 mt-1">
                      Ativar renovação automática para evitar lapsos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 