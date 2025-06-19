'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Activity,
  RefreshCw,
  Target,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { usePortfolio } from '@/hooks/usePortfolio'
import { cn } from '@/lib/utils'

interface RiskLevelIndicatorProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

function RiskLevelIndicator({ score, size = 'md' }: RiskLevelIndicatorProps) {
  const getRiskConfig = (score: number) => {
    if (score < 3000) return {
      level: 'Baixo',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      description: 'Risco baixo - Portfólio estável'
    }
    if (score < 5000) return {
      level: 'Médio',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      description: 'Risco moderado - Monitoramento recomendado'
    }
    if (score < 7000) return {
      level: 'Alto',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      description: 'Risco alto - Atenção necessária'
    }
    return {
      level: 'Crítico',
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      description: 'Risco crítico - Ação imediata recomendada'
    }
  }

  const risk = getRiskConfig(score)
  const percentage = Math.min((score / 10000) * 100, 100)

  const sizeClasses = {
    sm: 'h-2 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base'
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={cn("font-medium", risk.textColor)}>{risk.level}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{score.toLocaleString()}</span>
      </div>
      
      <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full", sizeClasses[size])}>
        <motion.div
          className={cn("rounded-full", risk.color, sizeClasses[size])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-xs text-gray-600 dark:text-gray-400">{risk.description}</p>
    </div>
  )
}

function RiskFactorCard({ title, score, change, icon: Icon, description }: {
  title: string
  score: number
  change?: number
  icon: React.ElementType
  description: string
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon size={20} className="text-blue-600" />
            <h4 className="font-medium text-sm">{title}</h4>
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-xs",
              change >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="ml-1">{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold">{score.toLocaleString()}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function RiskMetrics() {
  const {
    selectedPortfolio,
    portfolioRisk,
    selectedPortfolioRealtimeData,
    refreshPortfolioRisk,
    isLoading
  } = usePortfolio()

  // Use realtime data if available, otherwise fall back to stored data
  const currentRiskScore = selectedPortfolioRealtimeData?.riskMetrics?.score || portfolioRisk?.riskScore || 0
  const volatility = selectedPortfolioRealtimeData?.riskMetrics?.volatility || 0

  const handleRefresh = () => {
    if (selectedPortfolio) {
      refreshPortfolioRisk(selectedPortfolio.id)
    }
  }

  if (!selectedPortfolio) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Target size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Selecione um Portfólio</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Escolha um portfólio para visualizar a análise de risco detalhada
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="text-blue-600" size={24} />
                <span>Análise de Risco</span>
                {selectedPortfolioRealtimeData && (
                  <span className="flex items-center text-sm text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                    <Activity size={12} className="mr-1" />
                    Tempo Real
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Portfólio: {selectedPortfolio.name}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={cn("mr-2", isLoading && "animate-spin")} />
              Atualizar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
              <span className="ml-2">Analisando risco...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <RiskLevelIndicator score={currentRiskScore} size="lg" />
              
              {portfolioRisk?.topRisks && portfolioRisk.topRisks.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Principais Fatores de Risco</h4>
                  <div className="space-y-2">
                    {portfolioRisk.topRisks.map((risk, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{risk.type}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{risk.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{risk.score.toLocaleString()}</p>
                          <RiskLevelIndicator score={risk.score} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risk Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RiskFactorCard
          title="Score de Risco"
          score={currentRiskScore}
          icon={AlertTriangle}
          description="Score geral de risco do portfólio"
        />
        
        <RiskFactorCard
          title="Diversificação"
          score={portfolioRisk?.diversificationScore || 0}
          icon={BarChart3}
          description="Nível de diversificação dos ativos"
        />
        
        <RiskFactorCard
          title="Volatilidade"
          score={Math.round(volatility * 100)}
          icon={Activity}
          description="Volatilidade dos preços em 24h"
        />
        
        <RiskFactorCard
          title="Posições"
          score={selectedPortfolio.positionCount || 0}
          icon={Target}
          description="Número total de posições"
        />
      </div>

      {/* Recommendations */}
      {portfolioRisk?.recommendations && portfolioRisk.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-green-600" size={20} />
              <span>Recomendações</span>
            </CardTitle>
            <CardDescription>
              Sugestões para otimizar o risco do seu portfólio
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {portfolioRisk.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk History Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Risco</CardTitle>
          <CardDescription>
            Evolução do score de risco nas últimas 24 horas
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">
                Gráfico de histórico será implementado em breve
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 