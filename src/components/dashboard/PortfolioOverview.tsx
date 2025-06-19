'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  Wallet, 
  DollarSign,
  Activity,
  RefreshCw
} from 'lucide-react';
import { useAppStore } from '@/store';
import { apiService } from '@/services/api';

export function PortfolioOverview() {
  const { 
    portfolios, 
    selectedPortfolio, 
    multiChainData,
    dashboardData,
    setPortfolios,
    setMultiChainData,
    setDashboardData,
    setLoading
  } = useAppStore();
  
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    setRefreshing(true);
    setLoading('dashboard', true);
    
    try {
      const [portfoliosRes, dashboardRes] = await Promise.all([
        apiService.getPortfolios(),
        apiService.getDashboardData()
      ]);

      if (portfoliosRes.success && portfoliosRes.data) {
        setPortfolios(portfoliosRes.data);
      }

      if (dashboardRes.success && dashboardRes.data) {
        setDashboardData(dashboardRes.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading('dashboard', false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalValue = multiChainData?.totalValue || '0';
  const riskScore = multiChainData?.riskScore || 0;
  const chainsCount = multiChainData ? Object.keys(multiChainData.chains).length : 0;

  const getRiskLevel = (score: number) => {
    if (score < 3000) return { level: 'Low', color: 'bg-green-500' };
    if (score < 6000) return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'High', color: 'bg-red-500' };
  };

  const riskInfo = getRiskLevel(riskScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visão Geral do Portfólio</h2>
          <p className="text-gray-600">Acompanhe seus investimentos em tempo real</p>
        </div>
        <Button 
          onClick={loadDashboardData} 
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Valor Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              ${parseFloat(totalValue).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600">
              +2.5% hoje
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Score de Risco
            </CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {riskScore}
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${riskInfo.color}`} />
              <p className="text-xs text-purple-600">{riskInfo.level} Risk</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Redes Ativas
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {chainsCount}
            </div>
            <p className="text-xs text-green-600">
              Multi-chain ativo
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              Portfólios
            </CardTitle>
            <Wallet className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {portfolios.length}
            </div>
            <p className="text-xs text-orange-600">
              Gerenciados pela AI
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed View */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Portfolio Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Rede</CardTitle>
            <CardDescription>
              Visualização da alocação multi-chain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {multiChainData && Object.entries(multiChainData.chains).map(([chainId, data]) => (
              <div key={chainId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {chainId === '11155111' ? 'Sepolia' : `Chain ${chainId}`}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${parseFloat(data.portfolioValue).toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(parseFloat(data.portfolioValue) / parseFloat(totalValue)) * 100} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{data.assets} ativos</span>
                  <span>Risk: {data.riskScore}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas do Sistema</CardTitle>
            <CardDescription>
              Status geral das operações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardData && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">TVL Total</span>
                  <span className="text-lg font-bold">
                    ${parseFloat(dashboardData.overview.totalTVL).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Score Médio de Risco</span>
                  <Badge variant="outline">
                    {dashboardData.overview.avgRiskScore}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Posições Ativas</span>
                  <span className="text-sm">
                    {dashboardData.overview.totalActivePositions}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automações Ativas</span>
                  <span className="text-sm">
                    {dashboardData.overview.activeTriggers}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance Score</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {dashboardData.overview.avgPerformanceScore}
                    </span>
                    {parseFloat(dashboardData.overview.avgPerformanceScore) > 70 ? 
                      <TrendingUp className="h-4 w-4 text-green-500" /> :
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    }
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 