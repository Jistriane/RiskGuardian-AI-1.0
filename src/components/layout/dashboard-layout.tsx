'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  PieChart, 
  Shield, 
  AlertTriangle, 
  Bot, 
  Settings, 
  Menu, 
  X,
  Activity,
  BarChart3,
  Bell,
  Zap,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WalletButton } from '@/components/wallet/wallet-button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { NotificationBell } from '@/components/ui/notification-bell'
import { useAuth } from '@/hooks/useAuth'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useElizaOSStatus } from '@/stores/websocket.store'
import { webSocketService } from '@/services/websocket.service'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Visão geral do sistema'
  },
  {
    title: 'Portfólio',
    href: '/portfolio',
    icon: PieChart,
    description: 'Análise do portfólio'
  },
  {
    title: 'Análise de Risco',
    href: '/risk-analysis',
    icon: Shield,
    description: 'Métricas de risco em tempo real'
  },
  {
    title: 'Seguros DeFi',
    href: '/insurance',
    icon: AlertTriangle,
    description: 'Proteção de protocolos'
  },
  {
    title: 'IA Insights',
    href: '/ai-insights',
    icon: Bot,
    description: 'Análises inteligentes'
  },
  {
    title: 'Automação',
    href: '/automation',
    icon: Zap,
    description: 'Upkeeps Chainlink'
  },
  {
    title: 'Monitoramento',
    href: '/monitoring',
    icon: Activity,
    description: 'Status do sistema'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'Relatórios detalhados'
  },
  {
    title: 'Configurações',
    href: '/settings',
    icon: Settings,
    description: 'Preferências do usuário'
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  
  const { isAuthenticated, logout, address } = useAuth()
  const { portfolioStats } = usePortfolio()
  const elizaosStatus = useElizaOSStatus()

  // Initialize WebSocket connection when authenticated
  useEffect(() => {
    if (isAuthenticated && address) {
      webSocketService.initializeConnections()
      
      return () => {
        webSocketService.disconnect()
      }
    }
  }, [isAuthenticated, address])

  const handleNavigation = (href: string) => {
    setCurrentPath(href)
    // Em produção, usar router.push(href) do Next.js
    console.log(`Navegando para: ${href}`)
  }

  return (
    <div className="h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:translate-x-0 lg:static lg:inset-auto',
          'lg:flex lg:flex-col lg:h-screen'
        )}
      >
        {/* Header da sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">RiskGuardian</span>
              <span className="text-xs text-muted-foreground">AI Platform</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{item.title}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </span>
                </div>
              </Button>
            )
          })}
        </nav>

        {/* Footer da sidebar */}
        <div className="p-4 border-t border-border space-y-3">
          {/* User info */}
          {isAuthenticated && (
            <div className="text-xs space-y-1">
              <div className="font-medium text-foreground">
                {address?.slice(0, 8)}...{address?.slice(-6)}
              </div>
              <div className="text-muted-foreground">
                {portfolioStats.total} portfólios • ${portfolioStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}
          
          {/* Status indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">IA Agent</span>
              <div className={cn(
                "flex items-center",
                elizaosStatus.connected ? "text-green-600" : "text-red-600"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full mr-1",
                  elizaosStatus.connected ? "bg-green-500" : "bg-red-500"
                )} />
                {elizaosStatus.connected ? 'Online' : 'Offline'}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Real-time</span>
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                Ativo
              </div>
            </div>
          </div>

          {/* Logout button */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-xs h-8"
            >
              <LogOut className="mr-2 h-3 w-3" />
              Desconectar
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Dados em tempo real
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <NotificationBell />
              <ThemeToggle />
              <WalletButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 