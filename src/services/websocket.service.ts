'use client'

import { io, Socket } from 'socket.io-client'
import { 
  ElizaOSWSMessage, 
  ChromiaAlert, 
  ChromiaSocketEvents,
  WSConnectionStatus,
  RealtimePortfolioData 
} from '@/types/api'
import toast from 'react-hot-toast'
import { env, devSettings } from '@/config/env'

// Configurações atualizadas
const ELIZAOS_CONFIG = {
  endpoint: env.ELIZAOS_WS,
  maxReconnectAttempts: env.DEV_MODE ? 1 : 3,
  reconnectInterval: 10000,
  enabled: env.ELIZAOS_ENABLED,
} as const

const CHROMIA_CONFIG = {
  endpoint: env.CHROMIA_WS,
  maxReconnectAttempts: env.DEV_MODE ? 1 : 3,
  reconnectInterval: 10000,
  enabled: env.CHROMIA_ENABLED,
} as const

export type ElizaOSEventHandler = (message: ElizaOSWSMessage) => void
export type ChromiaEventHandler = (alert: ChromiaAlert) => void
export type PortfolioUpdateHandler = (data: RealtimePortfolioData) => void

class WebSocketService {
  // ElizaOS WebSocket (para IA Agent)
  private elizaosWS: WebSocket | null = null
  private elizaosStatus: WSConnectionStatus = {
    connected: false,
    connecting: false,
    reconnectAttempts: 0
  }

  // Chromia Socket.IO (para alertas)
  private chromiaSocket: Socket | null = null
  private chromiaStatus: WSConnectionStatus = {
    connected: false,
    connecting: false,
    reconnectAttempts: 0
  }

  // Event handlers
  private elizaosHandlers: Map<string, ElizaOSEventHandler[]> = new Map()
  private chromiaHandlers: Map<string, ChromiaEventHandler[]> = new Map()
  private portfolioHandlers: PortfolioUpdateHandler[] = []

  // Status change callbacks
  private statusChangeCallbacks: Array<(service: 'elizaos' | 'chromia', status: WSConnectionStatus) => void> = []

  // Connection timeouts
  private elizaosReconnectTimeout: NodeJS.Timeout | null = null
  private chromiaReconnectTimeout: NodeJS.Timeout | null = null

  // Flag para verificar se está no lado cliente
  private isClient: boolean = false

  constructor() {
    // Verificar se está no lado cliente
    this.isClient = typeof window !== 'undefined'
    
    if (this.isClient && !devSettings.skipWebSocketConnections) {
      // Inicializar com delay para evitar tentativas excessivas
      setTimeout(() => {
        this.initializeConnections()
      }, 2000)
    } else if (devSettings.skipWebSocketConnections) {
      console.log('🔇 WebSocket connections disabled in development mode')
      this.setupMockConnections()
    }
  }

  // Configurar conexões mock para desenvolvimento
  private setupMockConnections() {
    // Simular status conectado
    this.elizaosStatus = {
      connected: true,
      connecting: false,
      reconnectAttempts: 0
    }
    
    this.chromiaStatus = {
      connected: true,
      connecting: false,
      reconnectAttempts: 0
    }

    // Notificar status
    this.notifyStatusChange('elizaos', this.elizaosStatus)
    this.notifyStatusChange('chromia', this.chromiaStatus)

    console.log('🎭 Mock WebSocket connections established')
  }

  // =============================================================================
  // ELIZAOS WEBSOCKET METHODS
  // =============================================================================

  private initializeElizaOSConnection() {
    // Só tentar conectar no cliente e se habilitado
    if (!this.isClient || !ELIZAOS_CONFIG.enabled) {
      console.log('⚠️ ElizaOS: Não é possível conectar no servidor ou não habilitado')
      return
    }

    if (this.elizaosStatus.connecting || this.elizaosStatus.connected) {
      return
    }

    // Verificar se já excedeu o limite de tentativas
    if (this.elizaosStatus.reconnectAttempts >= ELIZAOS_CONFIG.maxReconnectAttempts) {
      console.log('🚫 ElizaOS: Limite de tentativas de reconexão atingido')
      this.elizaosStatus.error = 'Max reconnection attempts reached'
      this.notifyStatusChange('elizaos', this.elizaosStatus)
      return
    }

    this.elizaosStatus.connecting = true
    this.notifyStatusChange('elizaos', this.elizaosStatus)

    try {
      console.log('🚀 Conectando ao ElizaOS WebSocket...', ELIZAOS_CONFIG.endpoint)
      this.elizaosWS = new WebSocket(ELIZAOS_CONFIG.endpoint)

      // Timeout para conexão
      const connectionTimeout = setTimeout(() => {
        if (this.elizaosWS && this.elizaosWS.readyState === WebSocket.CONNECTING) {
          console.log('⏱️ ElizaOS connection timeout')
          this.elizaosWS.close()
        }
      }, 10000)

      this.elizaosWS.onopen = () => {
        clearTimeout(connectionTimeout)
        this.elizaosStatus = {
          connected: true,
          connecting: false,
          lastConnected: new Date(),
          reconnectAttempts: 0
        }
        this.notifyStatusChange('elizaos', this.elizaosStatus)
        console.log('✅ ElizaOS WebSocket connected')
        toast.success('IA Agent conectado')
      }

      this.elizaosWS.onmessage = (event) => {
        try {
          const message: ElizaOSWSMessage = JSON.parse(event.data)
          this.handleElizaOSMessage(message)
        } catch (error) {
          console.error('❌ Error parsing ElizaOS message:', error)
        }
      }

      this.elizaosWS.onclose = () => {
        clearTimeout(connectionTimeout)
        this.elizaosStatus = {
          connected: false,
          connecting: false,
          reconnectAttempts: this.elizaosStatus.reconnectAttempts
        }
        this.notifyStatusChange('elizaos', this.elizaosStatus)
        console.log('🔌 ElizaOS WebSocket disconnected')
        
        if (this.elizaosStatus.reconnectAttempts < ELIZAOS_CONFIG.maxReconnectAttempts) {
          this.scheduleElizaOSReconnect()
        } else {
          console.log('🚫 ElizaOS: Máximo de tentativas de reconexão atingido')
          toast.error('IA Agent não disponível no momento')
        }
      }

      this.elizaosWS.onerror = (error) => {
        clearTimeout(connectionTimeout)
        console.error('❌ ElizaOS WebSocket error:', error)
        this.elizaosStatus.error = 'Connection error'
        this.notifyStatusChange('elizaos', this.elizaosStatus)
      }

    } catch (error) {
      this.elizaosStatus = {
        connected: false,
        connecting: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        reconnectAttempts: this.elizaosStatus.reconnectAttempts
      }
      this.notifyStatusChange('elizaos', this.elizaosStatus)
    }
  }

  private scheduleElizaOSReconnect() {
    if (this.elizaosReconnectTimeout) {
      clearTimeout(this.elizaosReconnectTimeout)
    }

    this.elizaosStatus.reconnectAttempts += 1
    this.notifyStatusChange('elizaos', this.elizaosStatus)

    this.elizaosReconnectTimeout = setTimeout(() => {
      console.log(`🔄 Tentando reconectar ElizaOS (tentativa ${this.elizaosStatus.reconnectAttempts})`)
      this.initializeElizaOSConnection()
    }, ELIZAOS_CONFIG.reconnectInterval)
  }

  private handleElizaOSMessage(message: ElizaOSWSMessage) {
    const handlers = this.elizaosHandlers.get(message.type) || []
    handlers.forEach(handler => {
      try {
        handler(message)
      } catch (error) {
        console.error('❌ Error in ElizaOS handler:', error)
      }
    })
  }

  // =============================================================================
  // CHROMIA SOCKET.IO METHODS
  // =============================================================================

  private initializeChromiaConnection() {
    // Só tentar conectar no cliente e se habilitado
    if (!this.isClient || !CHROMIA_CONFIG.enabled) {
      console.log('⚠️ Chromia: Não é possível conectar no servidor ou não habilitado')
      return
    }

    if (this.chromiaStatus.connecting || this.chromiaStatus.connected) {
      return
    }

    // Verificar se já excedeu o limite de tentativas
    if (this.chromiaStatus.reconnectAttempts >= CHROMIA_CONFIG.maxReconnectAttempts) {
      console.log('🚫 Chromia: Limite de tentativas de reconexão atingido')
      this.chromiaStatus.error = 'Max reconnection attempts reached'
      this.notifyStatusChange('chromia', this.chromiaStatus)
      return
    }

    this.chromiaStatus.connecting = true
    this.notifyStatusChange('chromia', this.chromiaStatus)

    try {
      console.log('🚀 Conectando ao Chromia Socket.IO...', CHROMIA_CONFIG.endpoint)
      
      this.chromiaSocket = io(CHROMIA_CONFIG.endpoint, {
        path: '/alerts',
        transports: ['websocket', 'polling'],
        timeout: 10000,
        autoConnect: true,
        forceNew: true
      })

      this.chromiaSocket.on('connect', () => {
        this.chromiaStatus = {
          connected: true,
          connecting: false,
          lastConnected: new Date(),
          reconnectAttempts: 0
        }
        this.notifyStatusChange('chromia', this.chromiaStatus)
        console.log('✅ Chromia Socket.IO connected')
        toast.success('Sistema de alertas conectado')
      })

      this.chromiaSocket.on('disconnect', (reason) => {
        this.chromiaStatus = {
          connected: false,
          connecting: false,
          error: reason,
          reconnectAttempts: this.chromiaStatus.reconnectAttempts
        }
        this.notifyStatusChange('chromia', this.chromiaStatus)
        console.log('🔌 Chromia Socket.IO disconnected:', reason)
      })

      this.chromiaSocket.on('connect_error', (error) => {
        console.error('❌ Chromia Socket.IO error:', error)
        this.chromiaStatus.error = error.message
        this.chromiaStatus.reconnectAttempts += 1
        this.notifyStatusChange('chromia', this.chromiaStatus)

        // Se excedeu tentativas, não tentar mais
        if (this.chromiaStatus.reconnectAttempts >= CHROMIA_CONFIG.maxReconnectAttempts) {
          console.log('🚫 Chromia: Máximo de tentativas de reconexão atingido')
          this.chromiaSocket?.disconnect()
          toast.error('Sistema de alertas não disponível')
        }
      })

      // Event listeners para eventos específicos do Chromia
      this.chromiaSocket.on('portfolio_update', (data) => this.handlePortfolioUpdate(data))
      this.chromiaSocket.on('risk_alert', (alert) => this.handleChromiaAlert('risk_alert', alert))
      this.chromiaSocket.on('price_alert', (alert) => this.handleChromiaAlert('price_alert', alert))
      this.chromiaSocket.on('anomaly_detected', (alert) => this.handleChromiaAlert('anomaly_detected', alert))

    } catch (error) {
      this.chromiaStatus = {
        connected: false,
        connecting: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        reconnectAttempts: this.chromiaStatus.reconnectAttempts
      }
      this.notifyStatusChange('chromia', this.chromiaStatus)
    }
  }

  private handleChromiaAlert(eventType: string, alert: ChromiaAlert) {
    const handlers = this.chromiaHandlers.get(eventType) || []
    handlers.forEach(handler => {
      try {
        handler(alert)
      } catch (error) {
        console.error('❌ Error in Chromia handler:', error)
      }
    })

    // Mostrar notificação para alertas importantes
    if (alert.severity === 'high' || alert.severity === 'critical') {
      toast.error(`⚠️ ${alert.title}`, {
        description: alert.message,
        duration: 10000
      })
    }
  }

  private handlePortfolioUpdate(data: any) {
    this.portfolioHandlers.forEach(handler => {
      try {
        handler(data)
      } catch (error) {
        console.error('❌ Error in portfolio update handler:', error)
      }
    })
  }

  // =============================================================================
  // PUBLIC METHODS
  // =============================================================================

  initializeConnections() {
    console.log('🚀 Inicializando conexões WebSocket...')
    this.initializeElizaOSConnection()
    this.initializeChromiaConnection()
  }

  sendElizaOSMessage(message: Omit<ElizaOSWSMessage, 'timestamp'>) {
    if (this.elizaosWS && this.elizaosWS.readyState === WebSocket.OPEN) {
      const fullMessage: ElizaOSWSMessage = {
        ...message,
        timestamp: new Date().toISOString()
      }
      this.elizaosWS.send(JSON.stringify(fullMessage))
      return true
    }
    console.warn('⚠️ ElizaOS WebSocket not connected')
    return false
  }

  analyzePortfolio(address: string, context?: string) {
    return this.sendElizaOSMessage({
      type: 'analyze_portfolio',
      data: { address, context }
    })
  }

  requestHistory() {
    return this.sendElizaOSMessage({
      type: 'request_history',
      data: {}
    })
  }

  subscribeToPortfolio(portfolioId: string) {
    if (this.chromiaSocket && this.chromiaSocket.connected) {
      this.chromiaSocket.emit('subscribe_portfolio', { portfolioId })
      return true
    }
    return false
  }

  unsubscribeFromPortfolio(portfolioId: string) {
    if (this.chromiaSocket && this.chromiaSocket.connected) {
      this.chromiaSocket.emit('unsubscribe_portfolio', { portfolioId })
      return true
    }
    return false
  }

  // Event subscription methods
  onElizaOSEvent(eventType: string, handler: ElizaOSEventHandler) {
    if (!this.elizaosHandlers.has(eventType)) {
      this.elizaosHandlers.set(eventType, [])
    }
    this.elizaosHandlers.get(eventType)!.push(handler)
  }

  onChromiaEvent(eventType: string, handler: ChromiaEventHandler) {
    if (!this.chromiaHandlers.has(eventType)) {
      this.chromiaHandlers.set(eventType, [])
    }
    this.chromiaHandlers.get(eventType)!.push(handler)
  }

  onPortfolioUpdate(handler: PortfolioUpdateHandler) {
    this.portfolioHandlers.push(handler)
  }

  onStatusChange(callback: (service: 'elizaos' | 'chromia', status: WSConnectionStatus) => void) {
    this.statusChangeCallbacks.push(callback)
  }

  private notifyStatusChange(service: 'elizaos' | 'chromia', status: WSConnectionStatus) {
    this.statusChangeCallbacks.forEach(callback => {
      try {
        callback(service, status)
      } catch (error) {
        console.error('❌ Error in status change callback:', error)
      }
    })
  }

  // Status getters
  getElizaOSStatus(): WSConnectionStatus {
    return { ...this.elizaosStatus }
  }

  getChromiaStatus(): WSConnectionStatus {
    return { ...this.chromiaStatus }
  }

  isConnected(): boolean {
    return this.elizaosStatus.connected || this.chromiaStatus.connected
  }

  // Cleanup
  disconnect() {
    console.log('🔌 Desconectando WebSockets...')
    
    // Limpar timeouts
    if (this.elizaosReconnectTimeout) {
      clearTimeout(this.elizaosReconnectTimeout)
      this.elizaosReconnectTimeout = null
    }
    
    if (this.chromiaReconnectTimeout) {
      clearTimeout(this.chromiaReconnectTimeout)
      this.chromiaReconnectTimeout = null
    }

    // Desconectar WebSockets
    if (this.elizaosWS) {
      this.elizaosWS.close()
      this.elizaosWS = null
    }

    if (this.chromiaSocket) {
      this.chromiaSocket.disconnect()
      this.chromiaSocket = null
    }

    // Reset status
    this.elizaosStatus = { connected: false, connecting: false, reconnectAttempts: 0 }
    this.chromiaStatus = { connected: false, connecting: false, reconnectAttempts: 0 }
  }

  // Retry connections manually
  retryConnections() {
    console.log('🔄 Tentando reconectar manualmente...')
    
    // Reset attempt counters
    this.elizaosStatus.reconnectAttempts = 0
    this.chromiaStatus.reconnectAttempts = 0
    
    // Disconnect current connections
    this.disconnect()
    
    // Reinitialize after a short delay
    setTimeout(() => {
      this.initializeConnections()
    }, 1000)
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService()
export default webSocketService 