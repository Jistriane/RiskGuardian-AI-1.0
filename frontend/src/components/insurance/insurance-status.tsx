/**
 * @title RiskGuardian AI - Sistema Avançado de Proteção DeFi
 * @author Jistriane (jistriane@live.com)
 * @description Componente de status dos dados de seguros
 * @github https://github.com/Jistriane/RiskGuardian-AI-1.0
 * @linkedin https://www.linkedin.com/in/jibso
 * @twitter @jistriane
 * @license MIT
 * @version 1.0.0
 * @created 2025
 */

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Shield } from 'lucide-react';
import { useState } from 'react';

interface InsuranceStatusProps {
  totalCoverage: number;
  totalPremiums: number;
  coverageRatio: number;
  riskScore: number;
  activePolicies: number;
  lastUpdated?: Date;
  onRefresh?: () => void;
}

export function InsuranceStatus({
  totalCoverage,
  totalPremiums,
  coverageRatio,
  riskScore,
  activePolicies,
  lastUpdated,
  onRefresh
}: InsuranceStatusProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const getCoverageStatus = () => {
    if (coverageRatio >= 0.8) return { color: 'text-green-400', status: 'Excelente' };
    if (coverageRatio >= 0.5) return { color: 'text-yellow-400', status: 'Adequada' };
    return { color: 'text-red-400', status: 'Insuficiente' };
  };

  const getRiskStatus = () => {
    if (riskScore <= 30) return { color: 'text-green-400', status: 'Baixo' };
    if (riskScore <= 70) return { color: 'text-yellow-400', status: 'Moderado' };
    return { color: 'text-red-400', status: 'Alto' };
  };

  const coverageStatus = getCoverageStatus();
  const riskStatus = getRiskStatus();

  return (
    <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-blue-400">Status dos Seguros</span>
            <Badge className="bg-green-900/20 border-green-800/30 text-green-400 text-xs">
              🟢 Dados Reais
            </Badge>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-blue-800/30 text-blue-400 hover:bg-blue-900/20"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Cobertura Total</div>
            <div className="text-sm font-bold text-white">
              ${totalCoverage.toLocaleString()}
            </div>
            <div className={`text-xs ${coverageStatus.color}`}>
              {coverageStatus.status}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Prêmio Mensal</div>
            <div className="text-sm font-bold text-white">
              ${totalPremiums.toLocaleString()}
            </div>
            <div className="text-xs text-blue-400">
              {activePolicies} apólice{activePolicies !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">% Portfolio Coberto</div>
            <div className="text-sm font-bold text-white">
              {Math.round(coverageRatio * 100)}%
            </div>
            <div className={`text-xs ${coverageStatus.color}`}>
              {coverageRatio >= 0.8 ? '✅' : coverageRatio >= 0.5 ? '⚠️' : '❌'}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Score de Risco</div>
            <div className="text-sm font-bold text-white">
              {riskScore}/100
            </div>
            <div className={`text-xs ${riskStatus.color}`}>
              {riskStatus.status}
            </div>
          </div>
        </div>

        {lastUpdated && (
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 