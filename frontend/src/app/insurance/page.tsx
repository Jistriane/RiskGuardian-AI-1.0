/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Sistema completo de gestão de riscos para portfolios DeFi
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useClientTime } from '@/hooks/useClientTime';
import { useInsuranceData } from '@/hooks/useInsuranceData';
import { useAccount } from 'wagmi';
import { InsuranceStatus } from '@/components/insurance/insurance-status';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  FileText,
  Calendar,
  Activity,
  Target
} from 'lucide-react';

interface PolicyWithAsset {
  id: string;
  type: string;
  coverage: number;
  premium: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  autoRenewal: boolean;
  assetBased?: string;
}

export default function InsurancePage() {
  const { t } = useTranslation();
  const { formatDate } = useClientTime();
  const { isConnected } = useAccount();
  const { data: insuranceData, isLoading: insuranceLoading } = useInsuranceData();
  
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  // Usar dados reais da carteira ou dados padrão se não conectada
  const policies = insuranceData?.policies || [];
  const claims = insuranceData?.claims || [];
  const totalCoverage = insuranceData?.totalCoverage || 0;
  const totalPremiums = insuranceData?.totalPremiums || 0;

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

  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🛡️ {t('insuranceTitle')}</h1>
            <p className="text-muted-foreground">
              {t('insuranceSubtitle')}
            </p>
          </div>
          
          <Card className="bg-yellow-900/20 border-yellow-800/30">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                Carteira Não Conectada
              </h3>
              <p className="text-gray-300">
                Conecte sua carteira para visualizar apólices de seguro baseadas no seu portfolio real.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (insuranceLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">🛡️ {t('insuranceTitle')}</h1>
            <p className="text-muted-foreground">
              {t('insuranceSubtitle')}
            </p>
          </div>
          
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-300">Carregando dados de seguro baseados no seu portfolio...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🛡️ {t('insuranceTitle')}</h1>
          <p className="text-muted-foreground">
            {t('insuranceSubtitle')} - <span className="text-green-400">📊 Dados baseados no seu portfolio real</span>
          </p>
        </div>

        <InsuranceStatus
          totalCoverage={totalCoverage}
          totalPremiums={totalPremiums}
          coverageRatio={insuranceData?.coverageRatio || 0}
          riskScore={insuranceData?.riskScore || 0}
          activePolicies={policies.filter(p => p.status === 'active').length}
          lastUpdated={new Date()}
          onRefresh={() => window.location.reload()}
        />

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
                        <Badge className="bg-green-900/20 border-green-800/30 text-green-400 text-xs">
                          🟢 Dados Reais
                        </Badge>
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
                    
                    <div className="flex items-center justify-between mt-2">
                      {policy.autoRenewal && (
                        <div className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          Renovação Automática
                        </div>
                      )}
                      {(policy as PolicyWithAsset).assetBased && (
                        <div className="text-xs text-blue-400">
                          Baseado em: {(policy as PolicyWithAsset).assetBased}
                        </div>
                      )}
                    </div>
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
                    Cobertura {(insuranceData?.coverageRatio || 0) > 0.7 ? 'Adequada' : 'Insuficiente'}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Seguros atuais cobrem {Math.round((insuranceData?.coverageRatio || 0) * 100)}% do portfolio
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Recomendações da IA</h3>
                  <Badge className="bg-blue-900/20 border-blue-800/30 text-blue-400 text-xs">
                    🤖 Baseado no Portfolio Real
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {insuranceData?.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-sm font-medium">
                        {index === 0 && '🎯'} {index === 1 && '⚡'} {index === 2 && '🔄'} {recommendation}
                      </div>
                    </div>
                  )) || (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 