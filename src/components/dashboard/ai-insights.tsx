'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  Bot, 
  RefreshCw, 
  AlertTriangle,
  Send,
  Brain
} from 'lucide-react'
import { useElizaOSStatus, useElizaOSMessages, useWebSocketConnection } from '@/stores/websocket.store'
import { usePortfolio } from '@/hooks/usePortfolio'

export function AIInsights() {
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  // WebSocket connection data
  const elizaosStatus = useElizaOSStatus()
  const messages = useElizaOSMessages()
  const { isElizaOSConnected, isConnecting, connect, retry } = useWebSocketConnection()
  
  // Portfolio data
  const { selectedPortfolio } = usePortfolio()

  // Auto-connect when component mounts
  useEffect(() => {
    if (!isElizaOSConnected && !isConnecting) {
      connect()
    }
  }, [isElizaOSConnected, isConnecting, connect])

  const handleSendMessage = async () => {
    if (!input.trim()) return
    if (!isElizaOSConnected) {
      retry()
      return
    }

    setIsAnalyzing(true)
    // TODO: Implement sendElizaOSMessage when needed
    setInput('')
    
    // Simulate delay
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const handleAnalyzePortfolio = async () => {
    if (!selectedPortfolio) return
    if (!isElizaOSConnected) {
      retry()
      return
    }

    setIsAnalyzing(true)
    // TODO: Call webSocketService.analyzePortfolio when needed
    
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  const getStatusColor = () => {
    if (isElizaOSConnected) return 'bg-green-100 text-green-700 dark:bg-green-900/20'
    if (isConnecting) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
    return 'bg-red-100 text-red-700 dark:bg-red-900/20'
  }

  const getStatusText = () => {
    if (isElizaOSConnected) return 'Conectado'
    if (isConnecting) return 'Conectando...'
    return 'Desconectado'
  }

  const recentInsights = [
    {
      id: '1',
      type: 'risk' as const,
      title: 'Exposição em USDC detectada',
      content: 'Seu portfólio tem 45% de exposição em USDC. Considere diversificar para reduzir riscos de despegging.',
      confidence: 87,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'opportunity' as const,
      title: 'Oportunidade de yield farming',
      content: 'Pool WETH/USDC no Uniswap V3 oferece APY de 12.3% com baixo risco impermanente.',
      confidence: 76,
      timestamp: new Date().toISOString()
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="text-purple-600" />
              <span>IA Insights</span>
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  isElizaOSConnected ? 'bg-green-500' : 
                  isConnecting ? 'bg-yellow-500 animate-pulse' : 
                  'bg-red-500'
                }`} />
                {getStatusText()}
              </div>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              {!isElizaOSConnected && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={retry}
                  disabled={isConnecting}
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${isConnecting ? 'animate-spin' : ''}`} />
                  Reconectar
                </Button>
              )}
              
              <Button 
                onClick={handleAnalyzePortfolio}
                disabled={!selectedPortfolio || !isElizaOSConnected || isAnalyzing}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isAnalyzing ? 'Analisando...' : 'Analisar Portfólio'}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Análises e recomendações inteligentes baseadas em IA
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Chat com IA</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Converse com o agente de IA sobre seus investimentos
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    {!isElizaOSConnected ? (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          IA Agent desconectado
                        </p>
                        <Button variant="outline" size="sm" onClick={retry}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Tentar conectar
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        Inicie uma conversa com o agente de IA
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm">{message.content || 'Mensagem recebida'}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp || '').toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder={isElizaOSConnected ? "Digite sua pergunta..." : "IA Agent desconectado..."}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-800 text-black dark:text-white 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!isElizaOSConnected || isAnalyzing}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || !isElizaOSConnected || isAnalyzing}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5" />
              <span>Insights Recentes</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Recomendações e análises automáticas
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {recentInsights.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhum insight disponível ainda
                  </p>
                </div>
              ) : (
                recentInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {insight.confidence}% confiança
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insight.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(insight.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Warning */}
      {!isElizaOSConnected && !isConnecting && elizaosStatus.reconnectAttempts > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Agente de IA Desconectado
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Tentando reconectar ao ElizaOS Agent... 
                  ({elizaosStatus.reconnectAttempts} tentativas)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 