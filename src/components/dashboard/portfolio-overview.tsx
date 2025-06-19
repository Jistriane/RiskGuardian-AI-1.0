'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus,
  RefreshCw,
  Activity,
  Shield,
  DollarSign,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

interface CreatePortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description: string }) => void
  isLoading: boolean
}

function CreatePortfolioModal({ isOpen, onClose, onSubmit, isLoading }: CreatePortfolioModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({ name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-lg font-semibold mb-4">Criar Novo Portfólio</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome do Portfólio *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-800 text-black dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Portfólio Principal"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-800 text-black dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva seu portfólio..."
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Criando...
                </>
              ) : (
                'Criar Portfólio'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function PortfolioCard({ portfolio, isSelected, onSelect, realtimeData }: {
  portfolio: any
  isSelected: boolean
  onSelect: () => void
  realtimeData?: any
}) {
  const totalValue = realtimeData?.totalValue || parseFloat(portfolio.totalValue || '0')
  const change24h = realtimeData?.change24h || 0
  const riskScore = realtimeData?.riskMetrics?.score || portfolio.riskScore

  const getRiskLevel = (score: number) => {
    if (score < 3000) return { label: 'Baixo', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' }
    if (score < 5000) return { label: 'Médio', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' }
    if (score < 7000) return { label: 'Alto', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' }
    return { label: 'Crítico', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' }
  }

  const risk = getRiskLevel(riskScore)

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg",
        isSelected ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : ""
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{portfolio.name}</CardTitle>
          {realtimeData && (
            <div className="flex items-center text-xs text-green-600">
              <Activity size={12} className="mr-1" />
              Live
            </div>
          )}
        </div>
        {portfolio.description && (
          <CardDescription className="text-xs">{portfolio.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Valor Total */}
          <div>
            <div className="text-2xl font-bold">
              ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            {change24h !== 0 && (
              <div className={cn(
                "flex items-center text-sm",
                change24h >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1">
                  {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}% (24h)
                </span>
              </div>
            )}
          </div>

          {/* Risk Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Risco:</span>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", risk.bg, risk.color)}>
              {risk.label}
            </div>
          </div>

          {/* Posições */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Posições:</span>
            <span className="font-medium">{portfolio.positionCount || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PortfolioOverview() {
  const { isAuthenticated } = useAuth()
  const {
    portfolios,
    selectedPortfolio,
    portfolioStats,
    isLoading,
    isCreating,
    createPortfolio,
    selectPortfolio,
    refreshPortfolios,
    getRealtimeData,
    error
  } = usePortfolio()

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCreatePortfolio = async (data: { name: string; description: string }) => {
    const result = await createPortfolio(data)
    if (result) {
      setShowCreateModal(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Wallet size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Conecte sua carteira</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Para visualizar seus portfólios, conecte sua carteira Web3
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total de Portfólios</p>
                <p className="text-2xl font-bold">{portfolioStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign size={20} className="text-green-600" />
              <div>
                <p className="text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold">
                  ${portfolioStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield size={20} className="text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Risco Médio</p>
                <p className="text-2xl font-bold">{portfolioStats.averageRiskScore.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} className="text-red-600" />
              <div>
                <p className="text-sm font-medium">Alto Risco</p>
                <p className="text-2xl font-bold">{portfolioStats.highRiskCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meus Portfólios</CardTitle>
              <CardDescription>
                Gerencie e monitore seus portfólios DeFi em tempo real
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshPortfolios}
                disabled={isLoading}
              >
                <RefreshCw size={16} className={cn("mr-2", isLoading && "animate-spin")} />
                Atualizar
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCreateModal(true)}
                disabled={isCreating}
              >
                <Plus size={16} className="mr-2" />
                Novo Portfólio
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && portfolios.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
              <span className="ml-2">Carregando portfólios...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle size={48} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-lg font-medium mb-2">Erro ao carregar portfólios</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={refreshPortfolios}>
                Tentar Novamente
              </Button>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-12">
              <Wallet size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Nenhum portfólio encontrado</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Crie seu primeiro portfólio para começar a monitorar seus investimentos DeFi
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus size={16} className="mr-2" />
                Criar Primeiro Portfólio
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  isSelected={selectedPortfolio?.id === portfolio.id}
                  onSelect={() => selectPortfolio(portfolio)}
                  realtimeData={getRealtimeData(portfolio.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Portfolio Modal */}
      <CreatePortfolioModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePortfolio}
        isLoading={isCreating}
      />
    </div>
  )
} 